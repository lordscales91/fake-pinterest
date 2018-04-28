var express = require('express');
var router = express.Router();
var db = require('../db/models');
var utils = require('../utils');

router.get('/', function(req, res) {
	var fields = ['id', 'username', 'first_name', 'last_name'];
	var options = {};
	var addCounts = false;
	var addImage = false;
	if(req.query.fields) {
		if(typeof req.query.fields !== 'string') {
			// Bad request
			res.status(400).json({status: 400, message: 'Invalid fields parameter'}).end();
			return;
		}
		var fields_param = req.query.fields.split(',');
		fields = [];
		for(let i=0;i<fields_param.length;i++) {
			if(db.User.inputFields.indexOf(fields_param[i]) > -1) {
				fields.push(fields_param[i]);
			} else {
				// Bad request
				res.status(400).json({status: 400, message: 'Invalid field specified: '+fields_param[i]}).end();
				return;
			}
		}
	}
	var index = fields.indexOf('counts');
	if(index > -1) {
		addCounts = true;
		fields.splice(index, 1);
	}
	
	index = fields.indexOf('image');
	if(index > -1) {
		addImage = true;
		options.include = [db.Image];
		fields.splice(index, 1);
	}
	options.attributes = fields;
	// TODO: Implement OAuth
	db.User.findById(1, options).then(user => {
		var result = utils.wrapInData(user.get({plain: true}), fields);
		if(addCounts) {
			// TODO: Determine how to fetch the counts
			result.data.counts = {
					pins: 0,
		            following: 0,
		            followers: 0,
		            boards: 0
			};
		}
		if(addImage) {
			var imageMap = {};
			user.Images.forEach(image => {
					imageMap[image.scale] = {
							url: image.source,
							width: image.width,
							height: image.height
					};
				});
			result.data.image = imageMap;
		}
		res.json(result);
	});
});

module.exports = router;
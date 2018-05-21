var express = require('express');
var router = express.Router();
var db = require('../db/models');
var utils = require('../utils');
const Promise = require('bluebird');

const PORT = process.env.PORT || 3000;

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
	if(addCounts) {
		var queryUtil = db.sequelize.getQueryInterface();
		var getUser = db.User.findById(1, options);
		var getCounts = db.User.findOne({
			attributes: [
				[db.sequelize.literal('count(DISTINCT '+queryUtil.quoteIdentifiers('boards.id')+')'), 'board_count'],
				[db.sequelize.literal('count(DISTINCT '+queryUtil.quoteIdentifiers('boards->pins.id')+')'), 'pin_count'],
				[db.sequelize.literal('count(DISTINCT '+queryUtil.quoteIdentifiers('Following->FollowRelation.id')+')'), 'following_count'],
				[db.sequelize.literal('count(DISTINCT '+queryUtil.quoteIdentifiers('Followers->FollowRelation.id')+')'), 'follower_count']
			],
			includeIgnoreAttributes: false,
			include: [{association: 'boards', attributes: [], include:[{model: db.Pin, as:'pins', attributes:[]}]},
				{association: 'Following', through: {attributes: []}, attributes:[]},
				{association: 'Followers', through: {attributes: []}, attributes:[]}
			],
			where: {id: 1},
			group: ['User.id', 'User.username']
		});
		Promise.join(getUser, getCounts, 
			function(user, all_counts) {
				var result = utils.wrapInData(user.get({plain: true}), fields, {formatId:'id'});
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
				result.data.counts = {
					pins: all_counts.pin_count,
					following: all_counts.following_count,
					followers: all_counts.follower_count,
					boards: all_counts.board_count
				};
				res.json(result);
			});
	} else {
		// TODO: Implement OAuth
		db.User.findById(1, options).then(user => {
			var result = utils.wrapInData(user.get({plain: true}), fields);
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
	}
});

router.get('/boards', function(req, res) {
	var fields = ['id', 'url', 'name'];
	var options = {};
	var addCounts = false;
	var addImage = false;
	var addUrl = false;

	if(req.query.fields) {
		if(typeof req.query.fields !== 'string') {
			// Bad request
			res.status(400).json({status: 400, message: 'Invalid fields parameter'}).end();
			return;
		}
		var fields_param = req.query.fields.split(',');
		fields = [];
		for(let i=0;i<fields_param.length;i++) {
			if(db.Board.inputFields.indexOf(fields_param[i]) > -1) {
				fields.push(fields_param[i]);
			} else {
				// Bad request
				res.status(400).json({status: 400, message: 'Invalid field specified: '+fields_param[i]}).end();
				return;
			}
		}
	}
	var wrap_fields = fields; // Store the original fields requested
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

	index = fields.indexOf('url');
	if(index > -1) {
		addUrl = true;
		fields.splice(index, 1);
	}
	options.attributes = fields;
	// TODO: Implement OAuth
	var username = 'john_doe';
	options.where = {user_id: 1};
	db.Board.findAll(options).then(boards => {
		var boards_param = [];
		boards.forEach(item => {
			var board = item.get({ plain: true });
			if(addCounts) {
				board.counts = {
					pins: 0,
					collaborators: 0,
					followers: 0
				}
			}
			if(addImage) {
				var imageMap = {};
				item.Images.forEach(image => {
					imageMap[image.scale] = {
						url: image.source,
						width: image.width,
						height: image.height
					};
				});
				board.image = imageMap;
			}

			if(addUrl) {
				var url = req.protocol+'://'+req.hostname;
				if(PORT != 80 && PORT != 443) {
					url += ':'+PORT;
				}
				url +='/'+username+'/'+item.machine_name;
			}
			
			boards_param.push(board);
		});
		var result = utils.wrapInData(boards_param, wrap_fields, { isCollection: true, formatId:'id' });
		res.json(result);
	});
});

module.exports = router;
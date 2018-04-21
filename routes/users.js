var express = require('express');
var router = express.Router();

router.get('/me', function(req, res) {
	res.json({name: "John"});
});

module.exports = router;
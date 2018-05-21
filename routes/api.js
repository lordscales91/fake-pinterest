var express = require('express');
var router = express.Router();

var me = require('./me');
var oauth = require('./oauth');

router.use('/me', me);
router.use('/oauth', oauth);

module.exports = router;
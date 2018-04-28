var express = require('express');
var router = express.Router();

var me = require('./me');

router.use('/me', me);

module.exports = router;
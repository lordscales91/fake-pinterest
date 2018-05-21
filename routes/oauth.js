var express = require('express');
var router = express.Router();

// Contains endpoints for verifying and obtaining an oauth access token

router.get('/inspect', function(req, res) {
    // TODO: Implement OAuth
    res.json({
        data: {
            scopes: ['read_public', 'write_public'],
            app: {id: '4962550585667630627'}
        }
    });
});

module.exports = router;
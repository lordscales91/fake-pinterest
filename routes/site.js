var express = require('express');
var router = express.Router();

router.get('/oauth', function(req, res) {
    // TODO: Sanitize user input
    var scopes = ['read_public'];
    if(req.query.scope) {
        scopes = req.query.scope.split(',');
    }
    res.render('authorize', {
        requested_scopes: scopes, 
        client_id: req.query.client_id,
        response_type: req.query.response_type
    });
});

router.post('/oauth', function(req, res) {
    var client_id = req.body.client_id;
    var response_type = req.body.response_type;
    var app_allowed = req.body.allowed === 'true';
    console.log('clientid: '+client_id);
    console.log('response_type: '+response_type);
    if (response_type === 'token') {
        var appScheme = 'pdk'+client_id+'://';
        var accessToken = 'frgehghmnvmDSGjMxfdbhg_thyh';
        var redirectUri = null;
        if(app_allowed) {
            redirectUri = appScheme+'?access_token='+accessToken;
        } else {
            redirectUri = appScheme+'?state=None';
        }
        console.log(redirectUri);
        res.redirect(redirectUri);
    } else {
        // TODO: Implement OAuth authorization code
        res.json({code: '213456'});
    }
});

router.get('/:username', function(req, res) {
    res.send(req.params.username+' profile');
});

router.get('/:username/pins', function(req, res) {
    res.send(req.params.username+' Pins');
});

router.get('/:username/boards', function(req, res) {
    res.send(req.params.username+' Boards');
});

router.get('/:username/:board', function(req, res) {
    res.send(req.params.username+' Board: '+req.params.board);
});

module.exports = router;
var express = require('express');
var router = express.Router();

var request = require('request');
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express', fhs : req.f });
});

router.get('/login', function(req, res) {
    var options = {
        url:     "https://accounts.google.com/o/oauth2/auth?scope=https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email&client_id=286733531718-83lkc2890i5h40k9bmfglttm8m4f6frb.apps.googleusercontent.com&redirect_uri=http://www.cursosclic.webatu.com/oauth.php&response_type=token",
        method:  'GET'
    };
    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            //res.send(body);
            res.render('google/login', { body: body });
        }
    });
});

module.exports = router;

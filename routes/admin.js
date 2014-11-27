var express = require('express');
var router = express.Router();
var mongo = require('mongoskin');

var curl = require('../lib/curl');

var db = mongo.db('mongodb://localhost:27017/showcase');
var ObjectID = require('mongoskin').ObjectID;

/* GET home page. */
router.get('/', function(req, res) {
    db.collection('oauth').find().toArray( function (err, oauth){
        if (err) {
            res.send(err);
        }
        //res.json(users);
        res.render('admin/admin', { title: 'List user permissions',oauths: oauth });
    });

    //res.render('admin', { title: 'List User' });
});

router.get('/add', function(req, res) {
    res.render('admin/add', { title: 'add user permissions' });

});

router.post('/add', function(req, res) {
    db.collection('oauth').insert({
        user : req.body.user,
        password : req.body.password,
        clientId : req.body.clientId,
        clientSecret : req.body.clientSecret
    }, function ( err , result ) {
        if ( err ) {
            res.send(err);
        }
        if ( result ) {
            //res.send(' Document added ');
            res.redirect('/admin');
        }
    });

});

router.post('/test', function(req, res) {
    db.collection('oauth').findOne({_id:new ObjectID(req.body.id)}, function(err, result) {
        //console.log('Band members of Road Crew');
        if (err) {
            res.send(err);
        }
        var base64 = new Buffer(result.clientId + ':' + result.clientSecret).toString('base64');
        //var base64 = btoa(result.clientId + ':' + result.clientSecret);
        var data = {
                'grant_type': 'password',
                'scope': '*',
                'username': result.user,
                'password': result.password
            },
            authorization = 'Basic '+base64;

        curl.post('http://192.168.0.249:8080', '/workflow/oauth2/token', authorization, data, function(response, body){
            if (response.statusCode == 200) {
                result = JSON.parse(body);
                db.collection('oauth').update({_id: new ObjectID(req.body.id)}, {$set:result}, {safe:true, multi:false},
                    function(err, result){}
                );
            } else {

            }
        });
        res.send();
    });
});

router.get('/google', function(req, res) {
//    var OAUTHURL    =   'https://accounts.google.com/o/oauth2/auth?';
//    var VALIDURL    =   'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=';
//    var SCOPE       =   'https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email';
//    var CLIENTID    =   '716569014051.apps.googleusercontent.com';
//    var REDIRECT    =   'http://www.gethugames.in/proto/googleapi/oauth/'
//    var LOGOUT      =   'http://accounts.google.com/Logout';
//    var TYPE        =   'token';
//    var _url        =   OAUTHURL + 'scope=' + SCOPE + '&client_id=' + CLIENTID + '&redirect_uri=' + REDIRECT + '&response_type=' + TYPE;
//    var acToken;
//    var tokenType;
//    var expiresIn;
//    var user;
//    var loggedIn    =   false;
//
//
//    function login() {
//        var win         =   window.open(_url, "windowname1", 'width=800, height=600');
//
//        var pollTimer   =   window.setInterval(function() {
//            try {
//                console.log(win.document.URL);
//                if (win.document.URL.indexOf(REDIRECT) != -1) {
//                    window.clearInterval(pollTimer);
//                    var url =   win.document.URL;
//                    acToken =   gup(url, 'access_token');
//                    tokenType = gup(url, 'token_type');
//                    expiresIn = gup(url, 'expires_in');
//                    win.close();
//
//                    validateToken(acToken);
//                }
//            } catch(e) {
//            }
//        }, 500);
//    }
//
//    function validateToken(token) {
//        $.ajax({
//            url: VALIDURL + token,
//            data: null,
//            success: function(responseText){
//                getUserInfo();
//                loggedIn = true;
//                $('#loginText').hide();
//                $('#logoutText').show();
//            },
//            dataType: "jsonp"
//        });
//    }
//
//    function getUserInfo() {
//        $.ajax({
//            url: 'https://www.googleapis.com/oauth2/v1/userinfo?access_token=' + acToken,
//            data: null,
//            success: function(resp) {
//                user    =   resp;
//                console.log(user);
//                $('#uName').text('Welcome ' + user.name);
//                $('#imgHolder').attr('src', user.picture);
//            },
//            dataType: "jsonp"
//        });
//    }
//
////credits: http://www.netlobo.com/url_query_string_javascript.html
//    function gup(url, name) {
//        name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
//        var regexS = "[\\#&]"+name+"=([^&#]*)";
//        var regex = new RegExp( regexS );
//        var results = regex.exec( url );
//        if( results == null )
//            return "";
//        else
//            return results[1];
//    }
//
//    function startLogoutPolling() {
//        $('#loginText').show();
//        $('#logoutText').hide();
//        loggedIn = false;
//        $('#uName').text('Welcome ');
//        $('#imgHolder').attr('src', 'none.jpg');
//    }

});

module.exports = router;

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
        console.log('Band members of Road Crew');
        if (err) {
            res.send(err);
        }
        var base64 = new Buffer(result.clientId + ':' + result.clientSecret).toString('base64');
        var data = {
                'grant_type': 'password',
                'scope': '*',
                'username': result.user,
                'password': result.password
            },
            authorization = 'Basic '+base64;

        curl.post('http://pmr2.local', '/workflow/oauth2/token', authorization, data, function(response, body){
            if (response.statusCode == 200) {
                result.processmaker = JSON.parse(body);
                db.collection('oauth').update({_id: new ObjectID(req.body.id)}, {$set:result}, {safe:true, multi:false},
                    function(err, result){}
                );
            }
        });
        res.send();
    });
});

module.exports = router;

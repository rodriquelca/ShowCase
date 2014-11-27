/**
 * Created by ronald on 27-11-14.
 */
var curl = require('../lib/curl');
var mongo = require('mongoskin');
var db = mongo.db('mongodb://localhost:27017/showcase');

var oauth = {};

oauth.token = function(token, callback){
    db.collection('oauth').findOne({ access_token : token}, function(err, result) {
        if (err) {
            res.send(err);
        }
        //console.log(result);
        callback(result.access_token, result.refresh_token);
    });
};

oauth.refresh = function(authorization, callback){
    var base64 = new Buffer(authorization, 'base64').toString('ascii').split(':');
    db.collection('oauth').findOne({ clientId : base64[0]}, function(err, result) {
        if (err) {
            res.send(err);
        }
        console.log(result);
        var base64 = new Buffer(result.clientId + ':' + result.clientSecret).toString('base64');
        var data = {
                'grant_type': 'refresh_token',
                'refresh_token': result.refresh_token
            },
            authorization = 'Basic '+base64;

        curl.post('http://192.168.0.249:8080', '/workflow/oauth2/token', authorization, data, function(response, body){
            if (response.statusCode == 200) {
                var newToken = JSON.parse(body);
                result.access_token = newToken.access_token;
                db.collection('oauth').update({_id: new ObjectID(result.id)}, {$set:result}, {safe:true, multi:false},
                    function(err, result){}
                );
            }
        });
        res.send();
    });
};
module.exports = oauth;
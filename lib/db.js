/**
 * Created by ronald on 27-11-14.
 */
var mongo = require('mongoskin');
var database = mongo.db('mongodb://localhost:27017/showcase');

var db = {};
db.collections = null;
db.setCollections = function(collection){
    db.collections = database.collection(collection);
};

db.findOne = function(data, callback){
    db.collections.findOne(data, function(err, result) {
        if (err) {
            res.send(err);
        }
        //console.log(result);
        callback(result);
    });
};

db.find = function(data, callback){
    db.collections.findOne(data, function(err, result) {
        if (err) {
            res.send(err);
        }
        callback(result);
    });
};

models.exports = db;
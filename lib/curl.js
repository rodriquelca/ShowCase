/**
 * Created by ronald on 26-11-14.
 */

var request = require('request');
var curl = {};

curl.get = function(host, endpoint, authorization, data, callback){
    // Set the headers
    var headers = {
        'Authorization': authorization,
        'Content-Type':  'application/x-www-form-urlencoded'
    };
    // Configure the request
    var options = {
        url:     host + endpoint,
        method:  'GET',
        headers: headers,
        qs:      data
    };
    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(body);
            callback(response, body);
        }
        //if (!error && response.statusCode == 401) {
        //    // Print out the response body
        //    //console.log(body);
        //    //oauth.refresh(authorization);
        //
        //    request(options, function (error, response, body) {
        //        if (!error && response.statusCode == 200) {
        //            // Print out the response body
        //            console.log(body);
        //            callback(response, body);
        //        }
        //    });
        //}
    });
};

curl.post = function(host, endpoint, authorization, data, callback){
    var headers = {
        'Authorization': authorization,
        'Content-Type': 'application/x-www-form-urlencoded'
    };
    // Configure the request
    var options = {
        url: host + endpoint,
        method: 'POST',
        headers: headers,
        form: data
    };
    // Start the request
    request(options, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            // Print out the response body
            console.log(body);
        }
        callback(response, body);
    });
};

module.exports = curl;
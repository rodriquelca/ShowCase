/**
 * Created by ronald on 26-11-14.
 */

//var querystring = require('querystring');
var https = require('https');

function curl(host, endpoint, method, authorization, data, success) {
    var dataString = JSON.stringify(data);
    var headers = {};

    if (method == 'GET') {
        endpoint += '?' + querystring.stringify(data);
    }
    else {
        headers = {
            'Authorization': authorization,
            'Content-Type': 'application/json',
            'Content-Length': dataString.length
        };
    }
    var options = {
        host: host,
        path: endpoint,
        method: method,
        headers: headers
    };

    var req = https.request(options, function(res) {
        res.setEncoding('utf-8');

        var responseString = '';

        res.on('data', function(data) {
            responseString += data;
        });

        res.on('end', function() {
            console.log(responseString);
            var responseObject = JSON.parse(responseString);
            success(responseObject);
        });
    });

    req.write(dataString);
    req.end();
}

//function curl(host, endpoint, method, authorization, data, success) {
//    var dataString = JSON.stringify(data);
//
//    var options = {
//        host: host,
//        port: '80',
//        path: endpoint,
//        method: method,
//        headers: {
//            'Authorization': authorization,
//            'Content-Type': 'application/json; charset=utf-8',
//            'Content-Length': dataString.length
//        }
//    };
//
//    var req = https.request(options, function (res) {
//        var msg = '';
//        console.log(res.statusCode);
//        //res.setEncoding('utf8');
//        //res.on('data', function (chunk) {
//        //    msg += chunk;
//        //});
//        //res.on('end', function () {
//        //    console.log(JSON.parse(msg));
//        //});
//    });
//
//    //req.write(data);
//    req.end();
//
//}

module.exports = curl;
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var admin = require('./routes/admin');
var api = require('./routes/api');

var mongo = require('mongoskin');
var db = mongo.db('mongodb://localhost:27017/showcase');

var app = express();

var http = require('http').Server(app);
var io = require('socket.io')(http);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, X-Auth-Token, Origin, Authorization");
    if (req.method === 'OPTIONS') {
        res.statusCode = 204;
        return res.end();
    } else {
        return next();
    }
});

app.use('/', function(req, res, next) {
    //console.log(req.headers.authorization);

    var clientId = 'FKIZYOFHJWJJNXMMUTUOFZAXFTKJUQQH';
    //var auth = req.headers.authorization.split(" ");
    io.on('connection', function(socket){
        socket.on(clientId, function(msg){
            io.emit(clientId, msg);
        });
        socket.broadcast.emit(clientId);

        socket.on('disconnect', function () {
            io.sockets.emit('user disconnected');
        });
    });
    req.io = io;
    req.f = clientId;
    next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/admin', admin);
app.use('/api/1.0', api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

module.exports = app;

http.listen(9000, function(){
    console.log('listening on *:1313');
});
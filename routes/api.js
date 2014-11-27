var express = require('express');
var router = express.Router();

var curl = require('../lib/curl');
var mongo = require('mongoskin');
var db = mongo.db('mongodb://localhost:27017/showcase');

var hostEndpoint = 'http://173.244.64.117:8080';

/* GET home page. */
router.get('/', function(req, res) {
    var auth = req.headers.authorization.split(" "),
        authorization;
    db.collection('oauth').findOne({ access_token : auth[1]}, function(err, result) {
        if (err) {
            res.send(err);
        }
        var data = {};
        authorization = 'Bearer ' + result.access_token;

        curl.get(hostEndpoint, '/api/1.0/workflow/cases', authorization, data, function(response, body){
            if (response.statusCode == 200) {
                var content =JSON.parse(body);
                res.json(content);
            } else {
                res.status(response.statusCode).json({ error: 'error' })
                //res.send('error' + response.statusCode);
            }
        });
    });

});

router.get('/:workspace/projects', function(req, res) {
    var auth = req.headers.authorization.split(" "),
        authorization;
    db.collection('oauth').findOne({ access_token : auth[1]}, function(err, result) {
        if (err) {
            res.send(err);
        }
        var data = {};
            authorization = 'Bearer ' + result.access_token;

        curl.get(hostEndpoint, '/api/1.0/workflow/projects', authorization, data, function(response, body){
            if (response.statusCode == 200) {
                var content =JSON.parse(body);
                res.json(content);
            } else {
                res.status(response.statusCode).json({ error: 'error' })
                //res.send('error' + response.statusCode);
            }
        });
    });

});

router.get('/:workspace/project/:prj_uid/starting-tasks', function(req, res) {
    var auth = req.headers.authorization.split(" "),
        prj_uid = req.params.prj_uid,
        authorization;
    db.collection('oauth').findOne({ access_token : auth[1]}, function(err, result) {
        if (err) {
            res.send(err);
        }
        var data = {};
        authorization = 'Bearer ' + result.access_token;

        curl.get(hostEndpoint, '/api/1.0/workflow/project/'+prj_uid+'/starting-tasks', authorization, data, function(response, body){
            if (response.statusCode == 200) {
                var content =JSON.parse(body);
                res.json(content);
            } else {
                res.status(response.statusCode).json({ error: 'error' })
                //res.send('error' + response.statusCode);
            }
        });
    });

});

router.get('/:workspace/cases', function(req, res) {

    var auth = req.headers.authorization.split(" "),
        worksapce = req.params.workspace,
        authorization;
    db.collection('oauth').findOne({ access_token : auth[1]}, function(err, result) {
        if (err) {
            res.send(err);
        }
        var data = {};
        authorization = 'Bearer ' + result.access_token;

        curl.get(hostEndpoint, '/api/1.0/'+worksapce+'/cases', authorization, data, function(response, body){
            if (response.statusCode == 200) {
                var content =JSON.parse(body);
                res.json(content);
            } else {
                res.status(response.statusCode).json({ error: 'error' })
            }
        });
    });
});

router.get('/:workspace/cases/draft', function(req, res) {

    var auth = req.headers.authorization.split(" "),
        worksapce = req.params.workspace,
        authorization;
    db.collection('oauth').findOne({ access_token : auth[1]}, function(err, result) {
        if (err) {
            res.send(err);
        }
        var data = {};
        authorization = 'Bearer ' + result.access_token;

        curl.get(hostEndpoint, '/api/1.0/'+worksapce+'/cases/draft', authorization, data, function(response, body){
            if (response.statusCode == 200) {
                var content =JSON.parse(body);
                res.json(content);
            } else {
                res.status(response.statusCode).json({ error: 'error' })
            }
        });
    });
});

router.get('/:workspace/cases/participated', function(req, res) {

    var auth = req.headers.authorization.split(" "),
        worksapce = req.params.workspace,
        authorization;
    db.collection('oauth').findOne({ access_token : auth[1]}, function(err, result) {
        if (err) {
            res.send(err);
        }
        var data = {};
        authorization = 'Bearer ' + result.access_token;

        curl.get(hostEndpoint, '/api/1.0/'+worksapce+'/cases/participated', authorization, data, function(response, body){
            if (response.statusCode == 200) {
                var content =JSON.parse(body);
                res.json(content);
            } else {
                res.status(response.statusCode).json({ error: 'error' })
            }
        });
    });
});

router.get('/:workspace/cases/unassigned', function(req, res) {
    var auth = req.headers.authorization.split(" "),
        worksapce = req.params.workspace,
        authorization;
    db.collection('oauth').findOne({ access_token : auth[1]}, function(err, result) {
        if (err) {
            res.send(err);
        }
        var data = {};
        authorization = 'Bearer ' + result.access_token;

        curl.get(hostEndpoint, '/api/1.0/'+worksapce+'/cases/unassigned', authorization, data, function(response, body){
            if (response.statusCode == 200) {
                var content =JSON.parse(body);
                res.json(content);
            } else {
                res.status(response.statusCode).json({ error: 'error' })
            }
        });
    });
});

router.get('/:workspace/cases/paused', function(req, res) {

    var auth = req.headers.authorization.split(" "),
        worksapce = req.params.workspace,
        authorization;
    db.collection('oauth').findOne({ access_token : auth[1]}, function(err, result) {
        if (err) {
            res.send(err);
        }
        var data = {};
        authorization = 'Bearer ' + result.access_token;

        curl.get(hostEndpoint, '/api/1.0/'+worksapce+'/cases/paused', authorization, data, function(response, body){
            if (response.statusCode == 200) {
                var content =JSON.parse(body);
                res.json(content);
            } else {
                res.status(response.statusCode).json({ error: 'error' })
            }
        });
    });
});

router.get('/:workspace/cases/advanced-search', function(req, res) {

    var auth = req.headers.authorization.split(" "),
        worksapce = req.params.workspace,
        authorization;
    db.collection('oauth').findOne({ access_token : auth[1]}, function(err, result) {
        if (err) {
            res.send(err);
        }
        var data = {};
        authorization = 'Bearer ' + result.access_token;

        curl.get(hostEndpoint, '/api/1.0/'+worksapce+'/cases/advanced-search', authorization, data, function(response, body){
            if (response.statusCode == 200) {
                var content =JSON.parse(body);
                res.json(content);
            } else {
                res.status(response.statusCode).json({ error: 'error' })
            }
        });
    });
});

router.get('/:workspace/cases/:app_uid', function(req, res) {

    var auth = req.headers.authorization.split(" "),
        worksapce = req.params.workspace,
        app_uid = req.params.app_uid,
        authorization;
    db.collection('oauth').findOne({ access_token : auth[1]}, function(err, result) {
        if (err) {
            res.send(err);
        }
        var data = {};
        authorization = 'Bearer ' + result.access_token;

        curl.get(hostEndpoint, '/api/1.0/'+worksapce+'/cases/'+app_uid, authorization, data, function(response, body){
            if (response.statusCode == 200) {
                var content =JSON.parse(body);
                res.json(content);
            } else {
                res.status(response.statusCode).json({ error: 'error' })
            }
        });
    });
});

router.get('/:workspace/cases/:app_uid/current-task', function(req, res) {
    var auth = req.headers.authorization.split(" "),
        worksapce = req.params.workspace,
        app_uid = req.params.app_uid,
        authorization;
    db.collection('oauth').findOne({ access_token : auth[1]}, function(err, result) {
        if (err) {
            res.send(err);
        }
        var data = {};
        authorization = 'Bearer ' + result.access_token;

        curl.get(hostEndpoint, '/api/1.0/'+worksapce+'/cases/'+app_uid+'/current-task', authorization, data, function(response, body){
            if (response.statusCode == 200) {
                var content =JSON.parse(body);
                res.json(content);
            } else {
                res.status(response.statusCode).json({ error: 'error' })
            }
        });
    });
});

router.get('/:workspace/project/:prj_uid/dynaforms', function(req, res) {
    var auth = req.headers.authorization.split(" "),
        worksapce = req.params.workspace,
        prj_uid = req.params.prj_uid,
        authorization;
    db.collection('oauth').findOne({ access_token : auth[1]}, function(err, result) {
        if (err) {
            res.send(err);
        }
        var data = {};
        authorization = 'Bearer ' + result.access_token;

        curl.get(hostEndpoint, '/api/1.0/'+worksapce+'/project/'+prj_uid+'/dynaforms', authorization, data, function(response, body){
            if (response.statusCode == 200) {
                var content =JSON.parse(body);
                res.json(content);
            } else {
                res.status(response.statusCode).json({ error: 'error' })
            }
        });
    });
    //res.send('hola');
});

router.get('/:workspace/project/:prj_uid/dynaform/:dyn_uid', function(req, res) {
    var auth = req.headers.authorization.split(" "),
        worksapce = req.params.workspace,
        prj_uid = req.params.prj_uid,
        dyn_uid = req.params.dyn_uid,
        authorization;
    db.collection('oauth').findOne({ access_token : auth[1]}, function(err, result) {
        if (err) {
            res.send(err);
        }
        var data = {};
        authorization = 'Bearer ' + result.access_token;

        curl.get(hostEndpoint, '/api/1.0/'+worksapce+'/project/'+prj_uid+'/dynaform/'+dyn_uid, authorization, data, function(response, body){
            if (response.statusCode == 200) {
                var content =JSON.parse(body);
                res.json(content);
            } else {
                res.status(response.statusCode).json({ error: 'error' })
            }
        });
    });
    //res.send('hola');
});

router.get('/:workspace/cases/:app_uid/variables', function(req, res) {
    var auth = req.headers.authorization.split(" "),
        worksapce = req.params.workspace,
        app_uid = req.params.app_uid,
        authorization;
    db.collection('oauth').findOne({ access_token : auth[1]}, function(err, result) {
        if (err) {
            res.send(err);
        }
        var data = {};
        authorization = 'Bearer ' + result.access_token;

        curl.get(hostEndpoint, '/api/1.0/'+worksapce+'/cases/'+app_uid+'/variables', authorization, data, function(response, body){
            if (response.statusCode == 200) {
                var content =JSON.parse(body);
                res.json(content);
            } else {
                res.status(response.statusCode).json({ error: 'error' })
            }
        });
    });
    //res.send('hola');
});

router.put('/:workspace/cases/:app_uid/variable', function(req, res) {
    var auth = req.headers.authorization.split(" "),
        worksapce = req.params.workspace,
        app_uid = req.params.app_uid,
        authorization;
    db.collection('oauth').findOne({ access_token : auth[1]}, function(err, result) {
        if (err) {
            res.send(err);
        }
        var data = req.body;
        authorization = 'Bearer ' + result.access_token;

        curl.put(hostEndpoint, '/api/1.0/'+worksapce+'/cases/'+app_uid+'/variable', authorization, data, function(response, body){
            if (response.statusCode == 200) {
                //var content =JSON.parse(body);
                res.json(body);
            } else {
                res.status(response.statusCode).json({ error: 'error' })
            }
        });
    });
    //res.send('hola');
});

router.put('/:workspace/cases/:app_uid/route-case', function(req, res) {
    var auth = req.headers.authorization.split(" "),
        worksapce = req.params.workspace,
        app_uid = req.params.app_uid,
        authorization;
    db.collection('oauth').findOne({ access_token : auth[1]}, function(err, result) {
        if (err) {
            res.send(err);
        }
        var data = req.body;
        authorization = 'Bearer ' + result.access_token;

        curl.put(hostEndpoint, '/api/1.0/'+worksapce+'/cases/'+app_uid+'/route-case', authorization, data, function(response, body){
            if (response.statusCode == 200) {
                //var content =JSON.parse(body);
                res.json(body);
            } else {
                res.status(response.statusCode).json({ error: 'error' })
            }
        });
    });
    //res.send('hola');
});

module.exports = router;

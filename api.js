/*
	GUIDELINES:
	response .data is always array of objects, even if only one item requested or queried
	post request consists of one or more objects, named corresponding to the object type they are modifying
	get request consists of one or more strings, referencing the url or id of the aptly named object type
*/
var pro = process;
process.inc = {};
process.inc.express = require('express');
process.inc.express_parser = require('body-parser');
// modules
process.moment = require('moment-timezone'); // process.moment(new Date(2011, 9, 16)).
process.moment.now = process.moment();
process.request = require('request');
process.fs = require('fs');
process.http = require('http');
process.https = require('https');
process.q = require('q');
process.url = require('url');
process.mkdirp = require('mkdirp');
// env
process.env.PORT = 1080;
process.env.PATH = __dirname;
// app
process.app = process.inc.express();
process.app.use(process.inc.express_parser.json({
    limit: '50mb',
    parameterLimit: 10000,
    extended: true
}));
process.app.use(process.inc.express_parser.urlencoded({
    limit: '50mb',
    parameterLimit: 10000,
    extended: true
}));
process.app.use(process.inc.express.static('public'));
process.app.disable('trust proxy');
process.app.use(function(request, response, next) {
    var referrer = process.url.parse(request.headers.referer || '', true, true).hostname;
    response.setHeader('Access-Control-Allow-Origin', '*'); // header contains the invalid value 'app.allevents.nyc'. Origin 'http://app.allevents.nyc' is therefore not allowed access <-- don't know if browser will include http:// or not
    response.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Cache-Control, Pragma, Authorization, Content-Length, X-Requested-With, X-Host');
    if ('OPTIONS' == request.method) {
        response.writeHead(200);
        response.end();
        return;
    } else {
        next();
        return;
    }
});
// custom
process.fun = require("./node_custom/fun.js");
process.console = require("./node_custom/console.js").console; // depends on process.app
process.response = require("./node_custom/response.js");
// process.console ... require("colors");
// process.console ... require("tracer");
// secret
process.secret = require('../secret-nyc/all.js');


////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
// MODEL
var model = {};


////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
// VIEW
var view = {};
// time
process.timestamp = function() {
    var timestamp = function() {
        var timezone = 'America/New_York';
        var moment = process.moment(new Date()).tz(timezone);
        var DD = moment.format('DD');
        var MM = moment.format('MM');
        var YYYY = moment.format('YYYY');
        return Date.parse(new Date(YYYY, MM - 1, DD));
    };
    this.now = function() {
        return Date.now();
    };
    this.today_start = function() {
        return timestamp() + 0;
    };
    this.today_end = function() {
        return timestamp() + 1 * (24 * 60 * 60 * 1000) - 1;
    };
    this.tomorrow_start = function() {
        return timestamp() + 1 * (24 * 60 * 60 * 1000);
    };
    this.tomorrow_end = function() {
        return timestamp() + 2 * (24 * 60 * 60 * 1000) - 1;
    };
    this.thisweek_start = function() {
        return timestamp() + 1 * (24 * 60 * 60 * 1000) - 1;
    };
    this.thisweek_end = function() {
        return timestamp() + 7 * (24 * 60 * 60 * 1000) - 1;
    };
    this.thismonth_end = function() {
        return timestamp() + 31 * (24 * 60 * 60 * 1000) - 1;
    };
}();


////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
// HOOK
process.app.all('/_hook', function(request, response) {});


////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
// API :: put
process.app.put('/api/0', function(request, response) {
    process.console.log('put /0 '+request.body.action);
    // vars
    var domain = request.get('host');
    var appname = domain.split('.')[0]; // subdomain, or domain
    response.setHeader('Content-Type', 'application/json');
    // default dev app
    if (appname=='localhost:'+process.env.PORT || appname.substr(0,3)=='127') {
        appname = 'luxul';
    }
    // switch apps
    switch(appname) {

    /*
        put :: luxul
    */
    case 'luxul':
        switch (request.body.action) {

        /*
            put :: luxul :: json
            -
            write file in /api/{appname}/json/{POST->jsonKey}.json
            content is {POST->jsonValue}
        */
        case 'json':
            var filename = './api/'+appname+'/json/'+request.body.jsonKey+'.json';
            process.mkdirp(process.fun.dirname(filename), function (err) {
                if (!err) {
                    process.fs.writeFile(
                        filename,
                        JSON.stringify(request.body.jsonValue),
                        'utf8',
                        function(error) {
                            if (!error) {
                                // success
                                var message = "Successfully written to \""+filename+"\"";
                                response.writeHead(200);
                                response.write(JSON.stringify({
                                    data: [
                                        {}
                                    ],
                                    message: [
                                        message
                                    ],
                                    error: 0
                                }, null, "\t"));
                                response.end();
                            } else {
                                // error
                                var message = "Couldn't write file "+request.body.jsonKey+".json";
                                response.writeHead(500);
                                response.write(JSON.stringify({
                                    message: [
                                        message
                                    ],
                                    error: 1
                                }, null, "\t"));
                                response.end();
                                process.console.error(message);
                            }
                        }
                    );
                } else {
                    var errorValue = 'could not make dir "'+filepath+'"';
                    process.console.error(errorValue);
                }
            });

        break;
        default:
            var errorValue = 'action "'+request.body.action+'" not found';
            response.writeHead(500);
            response.write(JSON.stringify({
                message: [
                    errorValue
                ],
                error: 1
            }, null, "\t"));
            response.end();
        }

    break;

    /*
        put :: fail
    */
    default:
        var errorValue = 'app "'+appname+'" not found - use app url as the subdomain';
        response.writeHead(500);
        response.write(JSON.stringify({
            message: [
                errorValue
            ],
            error: 1
        }, null, "\t"));
        response.end();
    }
});


////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////
// API :: get
process.app.get('/api/0', function(request, response) {
    process.console.log('get /0 '+request.query.action);
    // vars
    var domain = request.get('host');
    var appname = domain.split('.')[0]; // subdomain, or domain
    response.setHeader('Content-Type', 'application/json');

    // default dev app
    if (appname=='localhost:'+process.env.PORT || appname.substr(0,3)=='127') {
        appname = 'luxul';
    }
    // switch apps
    switch(appname) {

    /*
        get :: luxul
    */
    case 'luxul':
        switch (request.query.action) {

        /*
            get :: luxul :: json
            -
            read file from /api/{appname}/json/{POST->jsonKey}.json
        */
        case 'json':
            var filename = './api/'+appname+'/json/'+request.query.jsonKey+'.json';
            process.fs.readFile(
                filename,
                'utf8',
                function(error,jsonValue) {
                    if (!error) {
                        // success
                        response.writeHead(200);
                        response.write(JSON.stringify({
                            data: [
                                jsonValue
                            ],
                            error: 0
                        }, null, "\t"));
                        response.end();
                    } else {
                        // error
                        var errorValue = "Couldn't read file "+request.query.jsonKey+".json";
                        response.writeHead(500);
                        response.write(JSON.stringify({
                            message: [
                                errorValue
                            ],
                            error: 1
                        }, null, "\t"));
                        response.end();
                        process.console.error(errorValue);
                    }
                }
            );

        break;
        default:
            var errorValue = 'action "'+request.query.action+'" not found';
            response.writeHead(500);
            response.write(JSON.stringify({
                message: [
                    errorValue
                ],
                error: 1
            }, null, "\t"));
            response.end();
        }

    break;

    /*
        get :: fail
    */
    default:
        var errorValue = 'app "'+appname+'" not found - use app url as the subdomain';
        response.writeHead(500);
        response.write(JSON.stringify({
            message: [
                errorValue
            ],
            error: 1
        }, null, "\t"));
        response.end();
    }
});


////////////////////////////////////////////////////////////////////////////////////////////////////
// start
var httpServer = process.http.createServer(process.app);
httpServer.listen(process.env.PORT);

// var httpsServer = process.https.createServer({key: process.fs.readFileSync('/etc/letsencrypt/live/api.allevents.nyc/privkey.pem', 'utf8'), cert: process.fs.readFileSync('/etc/letsencrypt/live/api.allevents.nyc/fullchain.pem', 'utf8')}, process.app);
// httpsServer.listen(443);
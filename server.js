var app = {};

var express = require('express');
var http = require('http');
var MapboxClient = require('mapbox');

app.Q = require('q');
app.passport = require("passport");
app.TwitterStrategy = require('passport-twitter').Strategy;
app.MongoClient = require('mongodb').MongoClient;
app.mongoose = require('mongoose');
app.mapboxClient = new MapboxClient('pk.eyJ1IjoiYmVuamFtaW53dGhvcm50b24iLCJhIjoiUEpaRDAwdyJ9.LvHOBMyZRTqugCDQOhBZBw');
app.turf = require('turf');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var bodyParser = require('body-parser');

app.auth = require('./auth.js')(app);
app.tracking = require('./tracking.js')(app);
app.explore = require('./explore.js')(app);
app.geo = require('./geo.js')(app);
app.models = require('./models.js')(app);

app.url = 'mongodb://localhost:27017/explore';

var port = 8080;

/**
 * Setup Express
 */
var e = app.e = express();
app.server = app.server = http.createServer(e);

// set headers
	var allowCrossDomain = function(req, res, next) {
		console.log('--- HEADER ORIGIN:  ' + req.get('origin'));
	    res.header('Access-Control-Allow-Origin', '*');
	    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
	    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');

	    // intercept OPTIONS method
	    if ('OPTIONS' == req.method) {
	      res.sendStatus(200);
	    }
	    else {
	      next();
	    }
	};

e.use(allowCrossDomain);
e.use(cookieParser()); // read cookies (needed for auth)
e.use(bodyParser.urlencoded({ parameterLimit: 10000, limit: '50mb', extended: true }));
e.use(bodyParser.json({parameterLimit: 10000, limit: '50mb'})); // get information from html forms
// required for passport
e.use(session({ secret: 'mangohacks' })); // session secret
e.use(app.passport.initialize());
e.use(app.passport.session()); // persistent login sessions

app.mongoose.connect(app.url);

e.use('/static', express.static(__dirname + '/public'));

app.server.listen(port, function() {
	console.log('Listening on port ' + port + '\n');
});


/**
  * Routes
  */

// POST request to store points of a trip
e.post('/tracking', app.tracking.storeTrip);

// GET request to send data within tile to client
e.post('/tracking/data', app.tracking.giveData);

// GET request to send loop/route to client
e.get('/explore/loop', app.explore.createLoop);

// POST request to find/create user and pass them through auth
e.post('/newUser', app.auth.upsertUser);



// Ben's special file
e.get('/map', function(req, res){
	res.sendFile(__dirname + '/public/map.html');
});

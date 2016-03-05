var app = {};

var express = require('express');
var http = require('http');

app.auth = require('./auth.js')(app);
app.tracking = require('./tracking.js')(app);
app.explore = require('./explore.js')(app);
app.geo = require('./geo.js')(app);

var port = 8080;

/**
 * Setup Express
 */
var e = app.e = express();
app.server = app.server = http.createServer(e);

e.use(express.static(__dirname + '/public'));

app.server.listen(port, function() {
	console.log('Listening on port ' + port + '\n');
});


/**
  * Routes
  */
// GET request to send data within tile to client
e.get('/tracking/tile', app.tracking.createTile);

// POST request to store points of a trip
e.post('/tracking', app.tracking.createTrip);

// GET request to send loop/route to client
e.get('/explore/loop', app.explore.createLoop);

// POST request to find/create user and pass them through auth
e.post('/auth', app.auth.upsertUser);

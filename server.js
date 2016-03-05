var app = {};

var express = require('express');
var http = require('http');

app.passport = require("passport");
app.TwitterStrategy = require('passport-twitter').Strategy;
app.MongoClient = require('mongodb').MongoClient;
app.mongoose = require('mongoose');
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


e.use(cookieParser()); // read cookies (needed for auth)
e.use(bodyParser.urlencoded({ extended: true }));
e.use(bodyParser.json()); // get information from html forms
// required for passport
e.use(session({ secret: 'mangohacks' })); // session secret
e.use(app.passport.initialize());
e.use(app.passport.session()); // persistent login sessions

app.mongoose.connect(app.url);

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
e.post('/newUser', app.auth.upsertUser);

//--------------------TWITTER--------------------
e.get('/auth/twitter', function(req, res, next){
  console.log('yo /auth/twitter')
    app.passport.authenticate('twitter')(req, res, next)
  }
  );

// handle the callback after twitter has authenticated the user
e.get('/auth/twitter/callback',function(req, res, next){
  console.log('yo /auth/twitter/callback')
  app.passport.authenticate('twitter', {
      successRedirect : '/profile',
      failureRedirect : '/'
  })(req, res, next)
}
);

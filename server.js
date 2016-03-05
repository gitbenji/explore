var express = require('express');
var http = require('http');

var app = {};
var port = 8000;

/**
 * Setup Express
 */
var e = app.e = express();
app.server = app.server = http.createServer(e);

e.use(express.static(__dirname + '/public'));

app.server.listen(port, function() {
	console.log('Listening on port ' + port + '\n');
});


module.exports = function(app) {

  // called by server.js to handle all info about storing and displaying user data
  var tracking = {

    // called to handle data of bounds to send to geo for tile
    createTile: function(req, res) {

      // call geo with data
      var tile = app.geo.tileShit('crap');

      // response with all data in tiles
      res.send(tile);
    },

    // called to store data received from client tracking into database
    createTrip: function(req, res) {
      // array of all points sent by
      var pointsArr = req.points;

      // run through each point in array and do append it to the user object
      pointsArr.forEach(function (point) {

      });

      // response with success or fail of data storing
      res.send('createTrip');
    }

  };

  return tracking;
};

//app.geo.functionName;

// function helperStuff(){
//
// }

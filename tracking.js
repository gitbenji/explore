
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
      var pointsArr = req.body.points;
      var username = req.body.username;

      findUser(username)
      .then(function(user) {
        console.log(pointsArr);
        var newUser = appendPoints(user, pointsArr);
        console.log(newUser);
      }, function(err) {
        console.log(err);
      })


      // res.send('createTrip');
    }

  }

  return tracking;



  function appendPoints(userObject, newPoints) {
    var pointsArr = userObject.points.concat(newPoints);

    var query = { username: userObject.username };

    app.models.User.findOneAndUpdate(query, {points: pointsArr}, function(err, doc) {
      if (err) {
        console.log(err);
      }
      if (doc) {
        console.log(doc);
        console.log('update');
      }
    });
  }

  // query user based on username, return userObject
  function findUser(username) {
    var dfd = app.Q.defer();
    var userObject = new Object();

    app.models.User.findOne({ username: username }, function(err, doc) {
      if (err) {
        console.log(err);
        dfd.reject(err);
      }
      console.log(doc);
      userObject = doc;
      dfd.resolve(userObject);
    });
    return dfd.promise;
  }
}

//app.geo.functionName;

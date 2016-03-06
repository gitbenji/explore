
module.exports = function(app) {

  // called to create an exploration route avoiding common routes for specified time
  var explore = {

    // called to handle request for new loop --- call geo.js
    // get pass current location (lat & long) + time for stroll
    createLoop: function(req, res) {
      var duration = req.body.duration = 60;
      var startingCoords = req.body.coordinates = {
        lon: -80.37584781646729,
        lat: 25.761633861594447
      };
      var transMethod = req.body.transMethod = 'bike';

      var total_distance = establishDistance(duration, transMethod);

      var coords = startingCoords;

      var quadrants = ['q1', 'q2', 'q3', 'q4'];
      var invQuadrants = ['q3', 'q4', 'q1', 'q2'];
      var startingQuadrant = quadrants[Math.floor(Math.random()*quadrants.length)];
      quadrants.forEach(function(quadrant) {
        if (startingQuadrant == quadrant) {
          var index = quadrants.indexOf(quadrant);
          invQuadrants.splice(index, 1);
        }
      });
      console.log(startingQuadrant, invQuadrants);
      round1(startingQuadrant, invQuadrants, startingCoords, coords)


      // var bbox = generateBbox(coords);
      // var cellWidth = 3000;
      // var units = 'kilometers';
      // var hexgrid = app.turf.hexGrid(bbox, cellWidth, units);
      //
      // console.log(hexgrid.features.length, bbox);
      // // response with loop route starting and ending at current location
      // res.send(hexgrid);
    }

  };

  function round1(startingQuadrant, invQuadrants, startingCoords, coords) {
    var max = 0.12;
    var min = 0.06;
    console.log(coords)
    if (startingQuadrant == 'q1') {
      coords.lat = coords.lat + 1;
      coords.lon = coords.lon + 1;
    } else if (startingQuadrant == 'q2') {
      coords.lat = coords.lat + (Math.random() * (max - min) + min);
      coords.lon = coords.lon - (Math.random() * (max - min) + min);
    } else if (startingQuadrant == 'q3') {
      coords.lat = coords.lat - (Math.random() * (max - min) + min);
      coords.lon = coords.lon - (Math.random() * (max - min) + min);
    } else {
      coords.lat = coords.lat - (Math.random() * (max - min) + min);
      coords.lon = coords.lon + (Math.random() * (max - min) + min);
    }

    console.log(coords, startingCoords);

    app.mapboxClient.getDirections([
      { latitude: startingCoords.lat, longitude: startingCoords.lon },
      { latitude: coords.lat, longitude: coords.lon }],
      function(err, res) {
        console.log(res);
      });
    }

  return explore;
};


function establishDistance(duration, transMethod) {
  var distance = duration * 0.083;
  if (transMethod == 'walk') {
    distance = distance/3;
  }
  return distance;
}

// function generateBbox(coords) {
//   var longitude = coords.lon;
//   var latitude = coords.lat;
//
//   var fromCenter = 1;
//   var minX = latitude - fromCenter;
//   var maxX = latitude + fromCenter;
//   var minY = longitude - fromCenter;
//   var maxY = longitude + fromCenter;
//   var bbox = [minX, maxX, minY, maxY];
//
//   return bbox;
// }

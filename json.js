var coordinateArr = [];
Object.features.forEach(function (omega) {
  omega.geometry.coordinates.forEach(function(beta) {
    beta.forEach(function (alpha) {
      alpha.forEach(function (coordinatePlotsArr) {
        var coordinateObj = new Object();
        coordinateObj.lat = coordinatePlotsArr[0];
        coordinateObj.lon = coordinatePlotsArr[1];
        coordinateArr.push(coordinateObj);
      });
    });
  });
});

var userObj = new Object();

userObj.points = coordinateArr;

console.log(coordinateArr);

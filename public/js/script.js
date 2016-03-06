L.mapbox.accessToken = 'pk.eyJ1IjoiYmVuamFtaW53dGhvcm50b24iLCJhIjoiUEpaRDAwdyJ9.LvHOBMyZRTqugCDQOhBZBw';
var geojson = [

];

L.mapbox.map('map', 'mapbox.streets')
  .setView([37.8, -96], 4)
  .featureLayer.setGeoJSON(geojson);

$.getJSON("static/data.json", function(json) {
      console.log(json);
      handle(json); // this will show the info it in firebug console
  });

console.log('hello');

function handle(json){
  var coordinateArr = [];
  var coordinatePlotsArr = [];
  json.features.forEach(function (omega) {
    omega.geometry.coordinates.forEach(function(beta) {
      beta.forEach(function (alpha) {
        //coordinatePlotsArr.push(alpha);
        console.log(alpha, coordinateArr.length);
        var coordinateObj = new Object();
        coordinateObj.lat = alpha[0];
        coordinateObj.lon = alpha[1];
        coordinateArr.push(coordinateObj);
      });
    });
  });

var userObj = new Object();

userObj.points = coordinateArr;

// end result with an array of 1900 objects with .lat and .lon
console.log(coordinateArr);

var data = {
    username: "persian_cam",
    points: coordinateArr
};

$.post('http://d5c866b1.ngrok.io/tracking', data, "json");

}

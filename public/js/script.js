L.mapbox.accessToken = 'pk.eyJ1IjoiYmVuamFtaW53dGhvcm50b24iLCJhIjoiUEpaRDAwdyJ9.LvHOBMyZRTqugCDQOhBZBw';
var geojson = [

];

L.mapbox.map('map', 'mapbox.streets')
  .setView([37.8, -96], 4)
  .featureLayer.setGeoJSON(geojson);

$.getJSON("static/data.json", function(json) {
      console.log(json); // this will show the info it in firebug console
  });

console.log('hello');

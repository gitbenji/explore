L.mapbox.accessToken = 'pk.eyJ1IjoiYmVuamFtaW53dGhvcm50b24iLCJhIjoiUEpaRDAwdyJ9.LvHOBMyZRTqugCDQOhBZBw';

var map = L.mapbox.map('map', 'mapbox.light');


//// Code below plots the base geojson points to the map
  // var featureLayer = L.mapbox.featureLayer()
  //     .addTo(map);
  //
  // featureLayer.loadURL('http://d5c866b1.ngrok.io/static/points.json');

//Used to create LineString
  var dirtyArr = [];
  var heat;


  $.getJSON("http://d5c866b1.ngrok.io/static/points.json", function(json) {
    //console.log(json);
    json.features.forEach(function (omega) {
      var coordArr = omega.geometry.coordinates
      dirtyArr.push(coordArr);
    });

    console.log(dirtyArr);
    heat = L.heatLayer(dirtyArr, { maxZoom: 12 }).addTo(map);
  });


  var layer = L.mapbox.featureLayer('http://d5c866b1.ngrok.io/static/points.json').on('ready', function() {
      // Zoom the map to the bounds of the markers.
      map.fitBounds(layer.getBounds());
      // Add each marker point to the heatmap.
      layer.eachLayer(function(l) {
          heat.addLatLng(l.getLatLng());
      });
  });

console.log("here");

var data = new Object();
data.username = "persian_cam";

  $.ajax ({
      url: 'http://d5c866b1.ngrok.io/tracking/data',
      type: "POST",
      data:JSON.stringify(data),
      contentType: "application/json",
      success: function(res) {
        plotMap(res);
      },
      error: function() {
        console.log("fuck it");
      }
    });

function plotMap(geoArray) {
  geoArray.forEach(function(geojson) {

  });
};

function matt(param) {
  document.getElementById("call").innerHTML = param;
};

L.mapbox.accessToken = 'pk.eyJ1IjoiYmVuamFtaW53dGhvcm50b24iLCJhIjoiUEpaRDAwdyJ9.LvHOBMyZRTqugCDQOhBZBw';

var map = L.mapbox.map('map', 'mapbox.streets')
  .setView([37.8, -96], 4)

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
}

function matt(param) {
  document.getElementById("call").innerHTML = param;
}

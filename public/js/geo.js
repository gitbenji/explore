L.mapbox.accessToken = 'pk.eyJ1IjoiYmVuamFtaW53dGhvcm50b24iLCJhIjoiUEpaRDAwdyJ9.LvHOBMyZRTqugCDQOhBZBw';

L.mapbox.map('map', 'mapbox.streets')
  .setView([37.8, -96], 4)

var data = new Object();
data.username = "persian_cam";

  $.ajax ({
      url: 'http://d5c866b1.ngrok.io/tracking/data',
      type: "POST",
      data:JSON.stringify(data),
      contentType: "application/json",
      success: function(res) {
        console.log(res);
      },
      error: function() {
        console.log("fuck it");
      }
    });

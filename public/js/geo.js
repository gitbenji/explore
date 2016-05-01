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

var data = new Object();
data.username = "persian_cam";

  $.ajax ({
      url: 'http://d5c866b1.ngrok.io/tracking/data',
      type: "POST",
      data:JSON.stringify(data),
      contentType: "application/json",
      success: function(res) {
        console.log(res);
        plotMapBackwards(res);
      },
      error: function() {
        console.log("oh no it");
      }
    });


function plotMapBackwards(geoArray) {
  console.log(geoArray);

    //var json = JSON.parse(geoArray);
    var correctArray = [];
    for(var i = 0; i < 1; i++){
      //console.log(geoArray[i])
      var arr = [geoArray[i].lon, geoArray[i].lat];
      correctArray.push(arr);
    }

    console.log(correctArray)

    correctArray = [
      ['-80.37865877151489', '25.764377979061884'],
      ['-80.37820547819138', '25.764361070081556']
    ]

    //heat = L.heatLayer(correctArray, { maxZoom: 12 }).addTo(map);

    //plotBoth(correctArray);
};

function plotBoth(flippedArr){

    var newArr = saveArray.concat(flippedArr);
    heat = L.heatLayer(newArr, { maxZoom: 12 }).addTo(map);
}

var saveArray;

function plotMap(geoArray) {
  console.log(geoArray);

    var json = JSON.parse(geoArray);
    console.log(json)

    saveArray = geoArray;
    heat = L.heatLayer(geoArray, { maxZoom: 12 }).addTo(map);

};

function matt(param) {
  document.getElementById("call").innerHTML = param;
};

// This example displays a marker at the center of Australia.
// When the user clicks the marker, an info window opens.
      var map;
      var marker;
      var markers = [];
      var infowindow;
      var messagewindow;
      var inputwindow;


function initMap() {
  var campus = {lat: 33.212, lng: -87.54594};
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: campus
  });
  
  infowindow = new google.maps.InfoWindow();
  
	initializeMarkers();
	
  inputwindow = new google.maps.InfoWindow({
          content: document.getElementById('form')
        })

        messagewindow = new google.maps.InfoWindow({
          content: document.getElementById('message')
        });

        google.maps.event.addListener(map, 'click', function(event) {
          marker = new google.maps.Marker({
            position: event.latLng,
            map: map
          });


          //google.maps.event.addListener(marker, 'click', function() {
            infowindow.close(); inputwindow.open(map, marker);
          //});
        });
 }
 
 function addMarker(name, notes, location) {
  var marker = new google.maps.Marker({
    position: location,
    map: map
  });
  var contentString = '<div id="content">'+
      '<div id="siteNotice">'+
      '</div>'+
      '<h1 id="firstHeading" class="firstHeading">'+name+'</h1>'+
      '<div id="bodyContent">'+
      '<p>Location: '+notes+'</p>'+
      '</div>'+
      '</div>';

  //var infowindow = new google.maps.InfoWindow({
    //content: contentString
  //});
  marker.addListener('click', function() {
    infowindow.setContent(contentString);
    messagewindow.close();
    infowindow.open(map, marker);
  });
  markers.push(marker);
}

// Sets the map on all markers in the array.
function setMapOnAll(map) {
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(map);
  }
}

function initializeMarkers() {
  var location = {lat: 33.214295, lng: -87.545510 };
  addMarker('Ferg food court', 'in the union market', location);
  location = {lat: 33.21429, lng: -87.5458 };
  addMarker('Third floor ferg', 'in a small breakroom attached to the anderson room', location);
  location = {lat: 33.213275, lng: -87.544688 };
  addMarker('Hardaway', 'breakroom by cordes office', location);
  location = {lat: 33.211839, lng: -87.545860 };
  addMarker('Gorgas', 'Across from the coffee shop on the bottom floor', location);
  location = {lat: 33.214298, lng: -87.546 };
  addMarker('Ferg safezone', 'in the Safe Zone student lounge (might have to be affiliated with Safe Zone - sponsored student group)', location);
}

function saveData() {
        var name = document.getElementById('name').value;
        document.getElementById('name').value = '';
        var notes = document.getElementById('notes').value;
        document.getElementById('notes').value = '';
        var latlng = marker.getPosition();
        addMarker(name, notes, latlng);
        inputwindow.close();
        messagewindow.open(map, marker);
}
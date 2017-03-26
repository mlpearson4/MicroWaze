var map;
var marker;
var markers = [];
var infowindow;
var messagewindow;
var inputwindow;
var counter;
var deletewindow;
var tempMarker;


function initMap() {
  var campus = {
    lat: 33.212,
    lng: -87.54594
  };
  map = new google.maps.Map(document.getElementById('map'), {
    zoom: 16,
    center: campus
  });

  infowindow = new google.maps.InfoWindow();
  deletewindow = new google.maps.InfoWindow();
  counter = 0;
  tempMarker = null;

  initializeMarkers();

  inputwindow = new google.maps.InfoWindow({
    content: document.getElementById('form')
  })

  messagewindow = new google.maps.InfoWindow({
    content: document.getElementById('message')
  });

  google.maps.event.addListener(map, 'click', function(event) {
  	if (tempMarker != null) tempMarker.setMap(null);
    marker = new google.maps.Marker({
      position: event.latLng,
      map: map
    });
    tempMarker = marker;
    infowindow.close();
    inputwindow.open(map, marker);
  });

  google.maps.event.addListener(deletewindow, 'domready', function() {
    var button = document.getElementById('deleteButton');
    var id = parseInt(button.getAttribute('data-id'));
    button.onclick = function() {
      deleteMarker(id);
    };
  });
}

function addMarker(name, notes, location) {

  tempMarker = null;

  counter++;

  var marker = new google.maps.Marker({
    position: location,
    map: map,
    id: counter
  });
  var contentString = '<div id="content">' +
    '<div id="siteNotice">' +
    '</div>' +
    '<h1 id="firstHeading" class="firstHeading">' + name + '</h1>';
   if (notes != '') {
    contentString += '<div id="bodyContent">' +
    '<p><b>Notes: </b>' + notes + '</p>' +
    '</div>' +
    '</div>';
 }

  marker.addListener('click', function() {
    infowindow.setContent(contentString);
    deletewindow.close();
    messagewindow.close();
    infowindow.open(map, marker);
  });
  markers.push(marker);

  var deleteButton = '<button id="deleteButton" data-id="' + counter + '">Delete</button>';

  google.maps.event.addListener(marker, 'rightclick', function() {
    infowindow.close();
    messagewindow.close();
    deletewindow.setContent(deleteButton);
    deletewindow.open(map, marker);
  });

}

function deleteMarker(markerId) {

  for (var i = 0; i < markers.length; i++) {

    if (markers[i].id === markerId) {

      markers[i].setMap(null);
    }
  }
}

function initializeMarkers() {
  var location = {
    lat: 33.214295,
    lng: -87.545510
  };
  addMarker('Ferg food court', 'in the union market', location);
  location = {
    lat: 33.21429,
    lng: -87.5458
  };
  addMarker('Third floor ferg', 'in a small breakroom attached to the anderson room', location);
  location = {
    lat: 33.213275,
    lng: -87.544688
  };
  addMarker('Hardaway', 'breakroom by cordes office', location);
  location = {
    lat: 33.211839,
    lng: -87.545860
  };
  addMarker('Gorgas', 'Across from the coffee shop on the bottom floor', location);
  location = {
    lat: 33.214298,
    lng: -87.546
  };
  addMarker('Ferg safezone', 'in the Safe Zone student lounge (might have to be affiliated with Safe Zone - sponsored student group)', location);
}

function saveData() {
  var name = document.getElementById('name').value;
  var notes = document.getElementById('notes').value;
  var latlng = marker.getPosition();
  if (name == '') {
        alert("Building field must be filled out");
        return false;
    }
  else addMarker(name, notes, latlng);
  document.getElementById('name').value = '';
  document.getElementById('notes').value = '';
  inputwindow.close();
  messagewindow.open(map, marker);
}
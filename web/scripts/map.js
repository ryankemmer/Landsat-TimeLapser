//Initialize vars
var lat, lon;
let map = false, infoWindow;
var bbox;
var points;
var mapBbox;

//function to init map
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: lat, lng: lon },
    zoom: 15,
    minZoom: 10,
    maxZoom: 15,
    mapTypeId: "satellite",
    disableDoubleClickZoom: true,
    scaleControl: true,
    fullscreenControl: false,
    streetViewControl: false,
    panControl: false,
    rotateControl: false,
    mapTypeControl: false
  });

  //event listener for manual coordinates
  updateButton = document.getElementById("update_pos")

  updateButton.addEventListener("click", () => {

    $('#error_latlong').attr('hidden', true);
    var newlat = document.getElementById("lat_input").value
    var newlong = document.getElementById("long_input").value

    var newlat_float = parseFloat(newlat)
    var newlong_float = parseFloat(newlong)

    if (newlat_float < -85 || newlat_float > 85){

      $('#error_latlong').attr('hidden', false);

    }

    else if (newlong_float < -180 || newlong_float > 180){

      $('#error_latlong').attr('hidden', false);
      
    }

    else {

      //update map
      map.setCenter(new google.maps.LatLng(newlat_float,newlong_float));

    }


  });



  //Event listener for gmaps
  google.maps.event.addListener(map, "bounds_changed", function () {

    points = [
      [
        map.getBounds().getNorthEast().lng(),
        map.getBounds().getSouthWest().lat(),
      ],
      [
        map.getBounds().getNorthEast().lng(),
        map.getBounds().getNorthEast().lat(),
      ],
      [
        map.getBounds().getSouthWest().lng(),
        map.getBounds().getNorthEast().lat(),
      ],
      [
        map.getBounds().getSouthWest().lng(),
        map.getBounds().getSouthWest().lat(),
      ],
    ];

    mapBbox = [
      map.getBounds().getSouthWest().lng(),
      map.getBounds().getSouthWest().lat(),
      map.getBounds().getNorthEast().lng(),
      map.getBounds().getNorthEast().lat(),
    ];

    $("#coordinates").html(mapBbox.map(e => e.toFixed(4)).join(", "))

  });

  //Set map to current location
  infoWindow = new google.maps.InfoWindow();
  const locationButton = document.createElement("button");
  locationButton.textContent = "Pan to Current Location";
  locationButton.classList.add("custom-map-control-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(
    locationButton
  );

  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      const pos = {
        lat: lat,
        lng: lon
      }
      infoWindow.setPosition(pos);
      infoWindow.setContent("Location found.");
      infoWindow.open(map);
      map.setCenter(pos);
    } else {
      // Browser doesn't support Geolocation
      handleLocationError(false, infoWindow, map.getCenter());
    }
  });
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

function loadMap(l1, l2) {
  lat = l1;
  lon = l2;
  if(!map) initMap();
}

function success(position) {
  loadMap(position.coords.latitude, position.coords.longitude);
}

function error() {
  alert("Sorry!, no position available.");
}

const options = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
};

const watchID = navigator.geolocation.watchPosition(
  success,
  error,
  options
);
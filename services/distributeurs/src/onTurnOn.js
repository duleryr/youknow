console.log('Hello from onTurnOn.js DISTRIB =) =) =) !!!');


var directionsService = new google.maps.DirectionsService;
var directionsDisplay = new google.maps.DirectionsRenderer({
    markerOptions:{opacity:0.0},
    preserveViewport: true
});
var infowindow = new google.maps.InfoWindow();

directionsDisplay.setMap(yk.map.repr);

var request = {
  bounds: yk.map.repr.getBounds(),
  types: ['atm']
};

var service = new google.maps.places.PlacesService(yk.map.repr);
service.nearbySearch(request, function(results, status) {
  if (status == google.maps.places.PlacesServiceStatus.OK) {
    for (var i = 0; i < results.length; i++) {
      place_marker(results[i], service)
    }
  }
  else if (status == google.maps.places.PlacesServiceStatus.ZERO_RESULTS) {
    console.log('distrib no atm');
  }
});


function place_marker(result, service) {
    var marker = new google.maps.Marker({
      map: yk.map.repr,
      position: result.geometry.location,
      place_id: result.place_id
    });

    marker.addListener('click', function() {
      service.getDetails({placeId: this.place_id}, function (place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
            place.formatted_address + '</div>');
          infowindow.open(yk.map.repr, marker);
        }
      });
      directionsService.route({
        origin: new google.maps.LatLng(yk.latitude,yk.longitude),
        destination: marker.position,
        travelMode: google.maps.TravelMode.WALKING
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    });
}

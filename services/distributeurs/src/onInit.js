console.log('INIT DISTRIB');

yk.data['directionsService'] = new google.maps.DirectionsService;
yk.data['directionsDisplay'] = new google.maps.DirectionsRenderer({
    markerOptions:{opacity:0.0},
    preserveViewport: true
});
yk.data['directionsDisplay'].setMap(yk.map.repr);

yk.data['infowindow'] = new google.maps.InfoWindow();
yk.data['service'] = new google.maps.places.PlacesService(yk.map.repr);

yk.data['place_marker'] = function (result, service) {
    var marker = new google.maps.Marker({
      map: yk.map.repr,
      position: result.geometry.location,
      place_id: result.place_id
    });

    marker.addListener('click', function() {
      service.getDetails({placeId: this.place_id}, function (place, status) {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          yk.data['infowindow'].setContent('<div><strong>' + place.name + '</strong><br>' +
            place.formatted_address + '</div>');
          yk.data['infowindow'].open(yk.map.repr, marker);
        }
      });
      yk.data['directionsService'].route({
        origin: new google.maps.LatLng(yk.latitude,yk.longitude),
        destination: marker.position,
        travelMode: google.maps.TravelMode.WALKING
      }, function(response, status) {
        if (status === google.maps.DirectionsStatus.OK) {
          yk.data['directionsDisplay'].setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
    });
}

yk.data['search'] = function(request) {
  yk.data['service'].nearbySearch(request, function(results, status) {
    if (status == google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        yk.data['place_marker'](results[i], yk.data['service']);
      }
    }
  });
}
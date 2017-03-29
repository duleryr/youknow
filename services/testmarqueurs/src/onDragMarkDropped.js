// Create a marker and set its position.
let marker = new google.maps.Marker({
  map: yk.map.repr,
  position: {lat : yk.params.lat, lng: yk.params.lng},
  title: 'Hello World!'
});

console.log("in poseMarks");
console.log(yk.params.lat);
console.log(yk.params.lng);

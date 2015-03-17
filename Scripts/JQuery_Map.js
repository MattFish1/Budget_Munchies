 

$(function () {
    alert("dsaf");
   
    $('#map').gmap().bind('init', function (evt, map) {
        $('#map').gmap('getCurrentPosition', function (position, status) {
            if (status === 'OK') {
                var clientPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                $('#map_canvas').gmap('addMarker', { 'position': clientPosition, 'bounds': true });
                $('#map_canvas').gmap('addShape', 'Circle', {
                    'strokeWeight': 0,
                    'fillColor': "#008595",
                    'fillOpacity': 0.25,
                    'center': clientPosition,
                    'radius': 15,
                    'clickable': false
                });
            }
        });
    });
});

//google.maps.event.addDomListener(window, 'load', initialize)
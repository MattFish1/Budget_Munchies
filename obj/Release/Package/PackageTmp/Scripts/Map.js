//API Key: AIzaSyCe6PoFCK1nlcSgcZ3FZZuJ058-TLmzrQ8
// Note: This example requires that you consent to location sharing when
// prompted by your browser. If you see a blank space instead of the map, this
// is probably because you have denied permission for location sharing.
var map;
var userLocation;
var pos;
function initialize() {

    // Try HTML5 geolocation
    if (navigator.geolocation) {

        navigator.geolocation.getCurrentPosition(function (position) {
            $("#start").hide();
            $("#altStart").hide();
            $("#map-canvas").show();

            pos = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);
            userLocation = position.coords.latitude + "," + position.coords.longitude;
            
                $.ajax({
                    url: "http://budgetmunchiesbeta.azurewebsites.net/Home/AppStart",
                    type: "POST",
                    data: { location: userLocation, format: "json" },
                    success: function (data) {
                        
                        createMap(data);
                    }
                });
            

        }, function () {
            handleNoGeolocation(true);
        });

    } else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
    }
}



function handleNoGeolocation(errorFlag) {
    

    if (errorFlag) {
        var content = 'Error: The Geolocation service failed.';
    } else {
        var content = 'Error: Your browser doesn\'t support geolocation.';
    }

    var options = {
        map: map,
        position: new google.maps.LatLng(60, 105),
        content: content
    };

    var infowindow = new google.maps.InfoWindow(options);
    map.setCenter(options.position);

    
}
function zcLocation(zipCode) {
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'address': zipCode }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            //Got result, center the map and put it out there
            /*
            map.setCenter(results[0].geometry.location);
            var marker = new google.maps.Marker({
                map: map,
                position: results[0].geometry.location
            });
            */
            pos = results[0].geometry.location;
            
        } else {
            alert("Geocode was not successful for the following reason: " + status);
        }
    });
}


function createMap(jResponse) {
    
    var mapOptions = {
        zoom: 11
    };
    map = new google.maps.Map(document.getElementById('map-canvas'),
        mapOptions);

    var infowindow = new google.maps.InfoWindow({
        map: map,
        position: pos,
        content: "<p>You</p>"
    });

    map.setCenter(pos);

    
    var coupons = JSON.parse(jResponse);

    //add Markers
    //marker loop
    var infowindow = new google.maps.InfoWindow();

    function createMarker(latlon, title, iwContent) {
        var marker = new google.maps.Marker({
            position: latlon,
            title: title,
            map: map
        });


        google.maps.event.addListener(marker, 'click', function () {
            infowindow.setContent(iwContent);
            infowindow.open(map, marker);
        });

    }
  /* Test Marker
    var markerLatlng = new google.maps.LatLng(39.710914, -105.10069);
    var title = coupons[0].Title;
    var iwContent = "My marker";
  
    var marker = new google.maps.Marker({
        position: markerLatlng,
        title: "",
        map: map
    });
    */
    for (var i = 0; i < coupons.length; i++) {

        var markerLatlng = new google.maps.LatLng(coupons[i].Latitude, coupons[i].Longitude);
        var title = coupons[i].Title;
        var iwContent = "<p>" + coupons[i].Title + "</p>" + "<p>Restruant: " + coupons[i].Merchant + "</p><p>Details: " + coupons[i].Description
            + "</p><p>Address: " + coupons[i].Address + "</p><p><a target='blank' href='" + coupons[i].Url + "'>Click for Coupon</a><p>Expires at: "
            + coupons[i].Expiration + "</p>";

        createMarker(markerLatlng, title, iwContent);
    }
}

//Ajax

    $(function () {
        /*
        $("#start").on("click", function (e) {
            e.preventDefault();
            $("#start").hide();
            $("#altStart").hide();
            $("#map-canvas").show();
        $.ajax({
            url: "http://localhost:50948/Home/AppStart",
            type: "POST",
            data: { location: userLocation, format: "json" },
            success: function (data) {
                createMap(data);
            }
             });
        });*/

        $("#zcForm").on("submit", function (e) {
            e.preventDefault();

            $("#geolocate").hide();
            $("#altStart").hide();
            $("#map-canvas").show();
            var zipCode = $(this).serialize().substr(9, 5);
            
            zcLocation(zipCode);
            $.ajax({
                url: this.action,
                type: this.method,
                data: $(this).serialize(),
                success: function (data) {

                    createMap(data);
                }
            });


        });


    });

google.maps.event.addDomListener(window, 'load', initialize)
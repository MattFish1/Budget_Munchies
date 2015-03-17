var userLocation;
var map;
var userLocation;
var pos;
var restruantList;

function initialize() {

    // Try HTML5 geolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            pos = new google.maps.LatLng(position.coords.latitude,
                                             position.coords.longitude);
            userLocation = position.coords.latitude + "," + position.coords.longitude;
            
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



   restruantList = JSON.parse(jResponse);
   
    //add Markers w/ loop
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
  

   
  
    
   for (i in restruantList)
   {

        var markerLatlng = new google.maps.LatLng(restruantList[i].latitude, restruantList[i].longitude);
        var title = restruantList[i].na;
        var iwContent = "<p>" + restruantList[i].na + "</p>" + "<p>Cuisine: " + restruantList[i].cu + "</p>" + "<p>Delivery Time: "
            + restruantList[i].services.deliver.time + "</p>" + "<p>Address: " + restruantList[i].addr + "</p>"
            + "<a href='@Url.Action('Menu', 'Home')'>Menu</a>";

        createMarker(markerLatlng, title, iwContent);
   }
  
    
}

function orderInRequestDL(deliveryTime, zipCode, city, streetAddress)
{
    var url = "https://r-test.ordr.in/" + "dl/" + deliveryTime + "/" + zipCode + "/" + city + "/" + streetAddress + "/?_auth=1,vPhd3KpKHAZpW_o5Icc4uyXoQBhaln9PBV0V0jhMNjU";
    return url;
}

$(function(){
    $('#orderInForm').on('submit', function (e) {
        e.preventDefault();
        $('#orderInForm').hide();
        $('#map-canvas').show();
        /*
        var $inputs = $('#orderInForm : input');
        var values = {};

        $inputs.each(function () {
            alert($(this).val().toString());
            values[this.name] = $(this).val();
        }); 
        */

        var delivery_time = $("#delivery_time").val();
        var zipCode = $('#zipCode').val();
        var city = $('#city').val();
        var streetAddress = $('#streetAddress').val();
        //not working
        var requestUrl = orderInRequestDL(delivery_time, zipCode, city, streetAddress)
        
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
/*
function Location()
{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function position() {
            pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude)
        });

        userLocation = position.coords.latitude + "," + position.coords.longitude;
        HandleNoGeolocation(false);
    }
    else {
        HandleNoGeolocation(true);
    }
   
}

function HandleNoGeolocation(errorFlag)
{
    if(errorFlag)
    {
        var options = {
            map: map,
            position: new google.maps.LatLng(60, 105),
            content: content
        };

        var infowindow = new google.maps.InfoWindow(options);
        map.setCenter(options.position);
    }
}*/

google.maps.event.addDomListener(window, 'load', initialize)
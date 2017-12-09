var map;
var locationMarker;

function initMap() {
    var uluru = {lat: 46.774241, lng: 23.594072};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru,
        mapTypeControl: false
    });

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (data) {
                console.log(data);
                var userPosition = {lat: data.coords.latitude, lng: data.coords.longitude};
                locationMarker = new google.maps.Marker(
                    {
                        position: userPosition,
                        map: map
                    }
                );
                map.panTo(locationMarker.getPosition());

                var placesService = new google.maps.places.PlacesService(map);
                placesService.nearbySearch(
                    {
                        location: userPosition,
                        radius: 5000,
                        rankBy: google.maps.places.RankBy.PROMINENCE
                    },
                    function (results) {
                        console.log(results);
                        for (var i = 0; i < 5; ++i) {
                            addPlaceOnMap(results[i]);
                        }
                    });
            },

            function (error) {
                console.log('error error');
            },

            {
                enableHighAccuracy: true
            });
    } else {
        alert('better luck next time')
    }
}

function refreshLocation() {
    navigator.geolocation.getCurrentPosition(function (data) {
            var userPosition = {lat: data.coords.latitude, lng: data.coords.longitude};
            locationMarker = new google.maps.Marker(
                {
                    position: userPosition,
                    map: map
                }
            )
        },

        function (error) {
            console.log(error);
        },

        {
            enableHighAccuracy: true
        })
}

function addPlaceOnMap(place) {
    var placeMarker = new google.maps.Marker(
        {
            position: place.geometry.location,
            map: map
        }
    );
}

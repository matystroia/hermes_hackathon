var map;
var locationMarker;
var userPosition;
var placesMarkers = [];

function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru
    });

    handlePermission();

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (data) {
                console.log(data);
                var userPosition = {lat: data.coords.latitude, lng: data.coords.longitude};
                locationMarker = new google.maps.Marker(
                    {
                        position: userPosition,
                        map: map,
                        draggable: true
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

    setInterval(refreshLocation, 5000);
}

function refreshLocation() {
    navigator.geolocation.getCurrentPosition(function (data) {
            // userPosition = {lat: data.coords.latitude, lng: data.coords.longitude};
            // locationMarker.setPosition(userPosition);
        },

        function (error) {
            console.log(error);
        },

        {
            enableHighAccuracy: true
        });

    placesMarkers.forEach(function (marker) {
        if (distanceBetween(
                {lat: marker.getPosition().lat(), lng: marker.getPosition().lng()},
                {lat: locationMarker.getPosition().lat(), lng: locationMarker.getPosition().lng()}
            ) <= 30) {
            console.log('well done!');
            marker.setMap(null);
        }
    })
}

function toRadians(angle) {
    return angle * (Math.PI / 180);
}

function distanceBetween(posA, posB) {
    var R = 6371e3;
    var phi1 = toRadians(posA.lat);
    var phi2 = toRadians(posB.lat);
    var deltaPhi = toRadians(posB.lat - posA.lat);
    var deltaLambda = toRadians(posB.lng - posA.lng);

    var a = Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
        Math.cos(phi1) * Math.cos(phi2) *
        Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    console.log(c);
    return R * c;
}

function addPlaceOnMap(place) {
    var placeMarker = new google.maps.Marker(
        {
            position: place.geometry.location,
            map: map
        }
    );

    var infoWindow = new google.maps.InfoWindow(
        {
            content: 'Distance: ' + Math.round(distanceBetween(
                {lat: placeMarker.getPosition().lat(), lng: placeMarker.getPosition().lng()},
                {lat: locationMarker.getPosition().lat(), lng: locationMarker.getPosition().lng()})) + 'm'
        }
    );

    placeMarker.addListener('click', function () {
        infoWindow.open(map, placeMarker);
    });

    placesMarkers.push(placeMarker);
}

function handlePermission() {
    navigator.permissions.query({name: 'geolocation'}).then(function (result) {
        if (result.state === 'granted') {
            report(result.state);
            geoBtn.style.display = 'none';
        } else if (result.state === 'prompt') {
            report(result.state);
            geoBtn.style.display = 'none';
            navigator.geolocation.getCurrentPosition(revealPosition, positionDenied, geoSettings);
        } else if (result.state === 'denied') {
            report(result.state);
            geoBtn.style.display = 'inline';
        }
        result.onchange = function () {
            report(result.state);
        }
    });
}

function report(state) {
    console.log('Permission ' + state);
}

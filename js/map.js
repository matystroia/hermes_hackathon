var map;
var locationMarker;
var userPosition;
var placesMarkers = [];
var zones = [
    {
        // CENTRU
        polygonPoints: [
            {lat: 46.764663, lng: 23.571461},
            {lat: 46.769699, lng: 23.568119},
            {lat: 46.778047, lng: 23.593182},
            {lat: 46.778370, lng: 23.598375},
            {lat: 46.768230, lng: 23.603010},
            {lat: 46.763379, lng: 23.589878}],
        strokeColor: '#ffffff',
        fillColor: '#ffffff'
    },
    {
        // GRUIA
        polygonPoints: [
            {lat: 46.769699, lng: 23.568119},
            {lat: 46.778047, lng: 23.593182},
            {lat: 46.784865, lng: 23.588290},
            {lat: 46.783806, lng: 23.571810},
            {lat: 46.776694, lng: 23.560308}],
        strokeColor: '#ffffff',
        fillColor: '#ff0000'
    },
    {
        // ZORILOR
        polygonPoints: [
            {lat: 46.763379, lng: 23.589878},
            {lat: 46.764663, lng: 23.571461},
            {lat: 46.755961, lng: 23.567169},
            {lat: 46.735258, lng: 23.588541},
            {lat: 46.757490, lng: 23.620041},
            {lat: 46.768230, lng: 23.603010}],
        strokeColor: '#ffffff',
        fillColor: '#0000ff'
    },
    {
        // GHEORGHENI
        polygonPoints: [
            {lat: 46.778370, lng: 23.598375},
            {lat: 46.768230, lng: 23.603010},
            {lat: 46.757490, lng: 23.620041},
            {lat: 46.779634, lng: 23.644895}],
        strokeColor: '#ffffff',
        fillColor: '#00ff00'
    },
    {
        // MARASTI
        polygonPoints: [
            {lat: 46.778370, lng: 23.598375},
            {lat: 46.779634, lng: 23.644895},
            {lat: 46.792152, lng: 23.623437},
            {lat: 46.784865, lng: 23.588290},
            {lat: 46.778047, lng: 23.593182}],
        strokeColor: '#ffffff',
        fillColor: '#ffff00'
    },
    {
        // MANASTUR +-
        polygonPoints: [
            {lat: 46.764663, lng: 23.571461},
            {lat: 46.755961, lng: 23.567169},
            {lat: 46.735258, lng: 23.588541},
            {lat: 46.751021, lng: 23.542879},
            {lat: 46.769954, lng: 23.546141},
            {lat: 46.776694, lng: 23.560308},
            {lat: 46.769699, lng: 23.568119}
        ],
        strokeColor: '#ffffff',
        fillColor: '#00ffff'
    }
];

function initMap() {
    var uluru = {lat: -25.363, lng: 131.044};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: uluru,
        mapTypeControl: false,
        streetViewControl: false
    });

    drawZones(zones);

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (data) {
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
                zones.forEach(function (zone) {
                    placesService.nearbySearch(
                        {
                            location: averagePoint(zone.polygonPoints),
                            radius: 100,
                            rankBy: google.maps.places.RankBy.PROMINENCE
                        },
                        function (results) {
                            console.log(results[1]);
                            addPlaceOnMap(results[1]);
                        }
                    );
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

    setInterval(refreshLocation, 1000);
}

function refreshLocation() {
    //navigator.geolocation.getCurrentPosition(function (data) {
    //        userPosition = {lat: data.coords.latitude, lng: data.coords.longitude};
    //        locationMarker.setPosition(userPosition);
    //   },

    //      function (error) {
    //          console.log(error);
    //       },
//
    //       {
    //          enableHighAccuracy: true
    //      });

    placesMarkers.forEach(function (marker) {
        if (distanceBetween(
                {lat: marker.getPosition().lat(), lng: marker.getPosition().lng()},
                {lat: locationMarker.getPosition().lat(), lng: locationMarker.getPosition().lng()}
            ) <= 30 && marker.getMap() === map) {
            console.log('well done!');
            marker.setMap(null);
            user.experience += 100;
            zones[0].setOptions({fillOpacity: zones[0].fill + 0.1});
            zones[0].fill += 0.1;
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

function drawZones(zones) {
    zones.forEach(function (zone) {
        var zonePolygon = new google.maps.Polygon({
            paths: zone.polygonPoints,
            strokeColor: zone.strokeColor,
            strokeOpacity: 0.2,
            strokeWeight: 2,
            fillColor: zone.fillColor,
            fillOpacity: 0.5
        });

        zone.polygon = zonePolygon;
        zonePolygon.setMap(map);
    })
}

function averagePoint(points) {
    var totalLat = 0;
    var totalLng = 0;
    points.forEach(function (point) {
        totalLat += point.lat;
        totalLng += point.lng;
    });
    return {lat: totalLat / points.length, lng: totalLng / points.length}
}

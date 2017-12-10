var map;
var locationMarker;
var userPosition;
var placesMarkers = [];
var placesService;
var zones = [
    {
        // CENTRU
        polygonPoints: [
            {lat: 46.769615704797275, lng: 23.574514389038086}, {
                lat: 46.764736053113346,
                lng: 23.576488494873047
            }, {lat: 46.76579432836515, lng: 23.582754135131836}, {
                lat: 46.76632345819484,
                lng: 23.590736389160156
            }, {lat: 46.76761686478674, lng: 23.596744537353516}, {
                lat: 46.767264120614385,
                lng: 23.599491119384766
            }, {lat: 46.767675655257555, lng: 23.601722717285156}, {
                lat: 46.77067388418502,
                lng: 23.600778579711914
            }, {lat: 46.773965864884744, lng: 23.598976135253906}, {
                lat: 46.777551543459325,
                lng: 23.595714569091797
            }, {lat: 46.77766910264887, lng: 23.593482971191406}, {
                lat: 46.774906393839764,
                lng: 23.589706420898438
            }, {lat: 46.77302531950345, lng: 23.586101531982422}, {
                lat: 46.77214354329005,
                lng: 23.583011627197266
            }, {lat: 46.771026606027654, lng: 23.57863426208496}
        ],
        strokeColor: '#ffffff',
        fillColor: '#1AB568'
    },
    {
        // GRUIA
        polygonPoints: [
            {lat: 46.767499283652626, lng: 23.601465225219727}, {
                lat: 46.76285462355475,
                lng: 23.600435256958008
            }, {lat: 46.75985595938674, lng: 23.600435256958008}, {
                lat: 46.75691593053337,
                lng: 23.600177764892578
            }, {lat: 46.75421096230638, lng: 23.598546981811523}, {
                lat: 46.75132943375726,
                lng: 23.5971736907959
            }, {lat: 46.74721269714014, lng: 23.594255447387695}, {
                lat: 46.74574235786222,
                lng: 23.589191436767578
            }, {lat: 46.74644812572081, lng: 23.583269119262695}, {
                lat: 46.74927110475196,
                lng: 23.58112335205078
            }, {lat: 46.75244677944176, lng: 23.577604293823242}, {
                lat: 46.759150367092055,
                lng: 23.574256896972656
            }, {lat: 46.76408931911381, lng: 23.574085235595703}, {
                lat: 46.76555915788364,
                lng: 23.581809997558594
            }, {lat: 46.76602949782, lng: 23.59013557434082}, {lat: 46.76755807425176, lng: 23.59665870666504}
        ],
        strokeColor: '#ffffff',
        fillColor: '#1DAAAB'
    },
    {
        // ZORILOR
        polygonPoints: [
            {lat: 46.76976267539989, lng: 23.57417106628418}, {
                lat: 46.764618465690916,
                lng: 23.576102256774902
            }, {lat: 46.76408931911381, lng: 23.57391357421875}, {
                lat: 46.759062167405546,
                lng: 23.573999404907227
            }, {lat: 46.752593796886266, lng: 23.577260971069336}, {
                lat: 46.751682282265456,
                lng: 23.572239875793457
            }, {lat: 46.751711686203514, lng: 23.56593132019043}, {
                lat: 46.74815369323064,
                lng: 23.56121063232422
            }, {lat: 46.75038849310842, lng: 23.549365997314453}, {
                lat: 46.75185870565326,
                lng: 23.54318618774414
            }, {lat: 46.757092336788375, lng: 23.541383743286133}, {
                lat: 46.7618550873763,
                lng: 23.544044494628906
            }, {lat: 46.763501372376766, lng: 23.546533584594727}, {
                lat: 46.764618465690916,
                lng: 23.551855087280273
            }, {lat: 46.76532398637544, lng: 23.55571746826172}, {
                lat: 46.76738170226184,
                lng: 23.55794906616211
            }, {lat: 46.76644104189563, lng: 23.563013076782227}, {
                lat: 46.7670289565495,
                lng: 23.56842041015625
            }, {lat: 46.76891024032229, lng: 23.571596145629883}
        ],
        strokeColor: '#ffffff',
        fillColor: '#F6AD38'
    },
    {
        // GHEORGHENI
        polygonPoints: [
            {lat: 46.768792662011464, lng: 23.54842185974121}, {
                lat: 46.767028956549474,
                lng: 23.54945182800293
            }, {lat: 46.76544157225787, lng: 23.550567626953125}, {
                lat: 46.76602949782,
                lng: 23.554859161376953
            }, {lat: 46.76843992553902, lng: 23.55717658996582}, {
                lat: 46.767910816499146,
                lng: 23.56266975402832
            }, {lat: 46.76802839673497, lng: 23.567733764648438}, {
                lat: 46.770027221474,
                lng: 23.5711669921875
            }, {lat: 46.77137932556038, lng: 23.57794761657715}, {
                lat: 46.77326045738874,
                lng: 23.58344078063965
            }, {lat: 46.77496517635405, lng: 23.586788177490234}, {
                lat: 46.77661106070305,
                lng: 23.590736389160156
            }, {lat: 46.778550788389644, lng: 23.5931396484375}, {
                lat: 46.781724737518104,
                lng: 23.592538833618164
            }, {lat: 46.78589760812567, lng: 23.596229553222656}, {
                lat: 46.78442832438336,
                lng: 23.588075637817383
            }, {lat: 46.78301777426252, lng: 23.580608367919922}, {
                lat: 46.782018612232434,
                lng: 23.572711944580078
            }, {lat: 46.78113698327708, lng: 23.56790542602539}, {
                lat: 46.781959837417894,
                lng: 23.56146812438965
            }, {lat: 46.777904220258044, lng: 23.56069564819336}, {
                lat: 46.77326045738876,
                lng: 23.560609817504883
            }, {lat: 46.77226111428598, lng: 23.554515838623047}
        ],
        strokeColor: '#ffffff',
        fillColor: '#E56A23'
    },
    {
        // MARASTI
        polygonPoints: [
            {lat: 46.784810342014204, lng: 23.596959114074707}, {
                lat: 46.783781826832346,
                lng: 23.594727516174316
            }, {lat: 46.78178351258928, lng: 23.59365463256836}, {
                lat: 46.7799614555459,
                lng: 23.594040870666504
            }, {lat: 46.777845440952014, lng: 23.593783378601074}, {
                lat: 46.777639712875555,
                lng: 23.59584331512451
            }, {lat: 46.77584690636852, lng: 23.597517013549805}, {
                lat: 46.77390708127966,
                lng: 23.59940528869629
            }, {lat: 46.77143811192456, lng: 23.600778579711914}, {
                lat: 46.773142888574434,
                lng: 23.607172966003418
            }, {lat: 46.775993859967336, lng: 23.612194061279297}, {
                lat: 46.7770225239301,
                lng: 23.61790180206299
            }, {lat: 46.77766910264887, lng: 23.620691299438477}, {
                lat: 46.779314904353704,
                lng: 23.62232208251953
            }, {lat: 46.780314116560184, lng: 23.62687110900879}, {
                lat: 46.78087249177531,
                lng: 23.630990982055664
            }, {lat: 46.781313310223126, lng: 23.635153770446777}, {
                lat: 46.78190106253917,
                lng: 23.638672828674316
            }, {lat: 46.78240064696293, lng: 23.640947341918945}, {
                lat: 46.78360550797099,
                lng: 23.63987445831299
            }, {lat: 46.784604640549844, lng: 23.63382339477539}, {
                lat: 46.78501604269253,
                lng: 23.62687110900879
            }, {lat: 46.78539805615275, lng: 23.620176315307617}, {
                lat: 46.78569191081588,
                lng: 23.613696098327637
            }, {lat: 46.78592699339146, lng: 23.608288764953613}, {
                lat: 46.786162074940414,
                lng: 23.601679801940918
            }, {lat: 46.786367770453595, lng: 23.598933219909668}
        ],
        strokeColor: '#ffffff',
        fillColor: '#DC3B53'
    },
    {
        // MANASTUR +-
        polygonPoints: [
            {lat: 46.78213616166901, lng: 23.64086151123047}, {
                lat: 46.778550788389644,
                lng: 23.64232063293457
            }, {lat: 46.77772788214744, lng: 23.63858699798584}, {
                lat: 46.77587629712037,
                lng: 23.638458251953125
            }, {lat: 46.77525908796299, lng: 23.635926246643066}, {
                lat: 46.77417160699728,
                lng: 23.6370849609375
            }, {lat: 46.77279018059154, lng: 23.638243675231934}, {
                lat: 46.771408718750514,
                lng: 23.63978862762451
            }, {lat: 46.76911600174863, lng: 23.6370849609375}, {
                lat: 46.768351741059995,
                lng: 23.634166717529297
            }, {lat: 46.767675655257555, lng: 23.629660606384277}, {
                lat: 46.767499283652626,
                lng: 23.624897003173828
            }, {lat: 46.76579432836515, lng: 23.62459659576416}, {
                lat: 46.76405992192936,
                lng: 23.624038696289062
            }, {lat: 46.76244305208004, lng: 23.623480796813965}, {
                lat: 46.761590501166154,
                lng: 23.61863136291504
            }, {lat: 46.760238151354955, lng: 23.614768981933594}, {
                lat: 46.75726874246587,
                lng: 23.61931800842285
            }, {lat: 46.755210640294564, lng: 23.6191463470459}, {
                lat: 46.754975423612784,
                lng: 23.61614227294922
            }, {lat: 46.75391693583945, lng: 23.61232280731201}, {
                lat: 46.7507413477768,
                lng: 23.60910415649414
            }, {lat: 46.74968277684154, lng: 23.60515594482422}, {
                lat: 46.74741854143864,
                lng: 23.594770431518555
            }, {lat: 46.751388242002385, lng: 23.59738826751709}, {
                lat: 46.75493132037063,
                lng: 23.599083423614502
            }, {lat: 46.75684242775666, lng: 23.600263595581055}, {
                lat: 46.761796290553,
                lng: 23.600585460662842
            }, {lat: 46.76298691371816, lng: 23.600542545318604}, {
                lat: 46.76494183048497,
                lng: 23.600993156433105
            }, {lat: 46.76771974806858, lng: 23.60187292098999}, {
                lat: 46.77130584251488,
                lng: 23.60060691833496
            }, {lat: 46.77308410407103, lng: 23.607237339019775}, {
                lat: 46.775949773929796,
                lng: 23.612279891967773
            }, {lat: 46.77758093328076, lng: 23.62082004547119}, {
                lat: 46.77927082103513,
                lng: 23.62236499786377
            }, {lat: 46.78047575208639, lng: 23.628416061401367}, {
                lat: 46.78110759539663,
                lng: 23.633694648742676
            }, {lat: 46.781680656172576, lng: 23.6380934715271}
        ],
        strokeColor: '#ffffff',
        fillColor: '#064384'
    }
];
var markers = [];

function logLatLng(markers) {
    var s = '';
    markers.forEach(function (marker) {
        s += '{lat: ' + marker.position.lat().toString() + ', lng: ' + marker.position.lng().toString() + '},';
    });
    console.log(s);
}

function initMap() {
    var uluru = {lat: 46.774241, lng: 23.594072};
    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: uluru,
        mapTypeControl: false,
        streetViewControl: false
    });

    placesService = new google.maps.places.PlacesService(map);

    // map.addListener('click', function (args) {
    //     var newmarker = new google.maps.Marker(
    //         {
    //             position: {lat: args.latLng.lat(), lng: args.latLng.lng()},
    //             draggable: true,
    //             map: map
    //         }
    //     );
    //
    //     newmarker.addListener('click', function (args) {
    //         this.setMap(null);
    //     });
    //
    //     markers.push(newmarker);
    //
    //     if (polygon !== undefined)
    //         polygon.setMap(null);
    //
    //     var points = [];
    //     markers.forEach(function (marker) {
    //         points.push({lat: marker.position.lat(), lng: marker.position.lng()});
    //     });
    //
    //     polygon = new google.maps.Polygon({
    //         paths: points,
    //         strokeColor: '#ffffff',
    //         strokeOpacity: 0,
    //         strokeWeight: 2,
    //         fillColor: '#ff8568',
    //         fillOpacity: 0.5
    //     });
    //
    //     polygon.setMap(map);
    // });

    drawZones(zones);

    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (data) {
                var userPosition = {lat: data.coords.latitude, lng: data.coords.longitude};

                var icon = {
                    url: "img/user.png",
                    scaledSize: new google.maps.Size(32, 32),
                    origin: new google.maps.Point(0, 0),
                    anchor: new google.maps.Point(16, 16)
                };

                locationMarker = new google.maps.Marker(
                    {
                        icon: icon,
                        position: userPosition,
                        map: map,
                        draggable: true
                    }
                );

                map.panTo(locationMarker.getPosition());


                for (var zoneIndex = 0; zoneIndex < zones.length; ++zoneIndex) {
                    putPlace(averagePoint(zones[zoneIndex].polygonPoints), 500, zoneIndex, 1);
                    zones[zoneIndex].fill = 0;
                    zones[zoneIndex].unlocked = false;
                }
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
            ) <= 50 && marker.getMap() === map) {
            console.log('well done!');
            marker.setMap(null);
            addExp(100);
            zones[marker.zoneIndex].polygon.setOptions({fillOpacity: zones[marker.zoneIndex].fill + 0.1});
            zones[marker.zoneIndex].fill += 0.1;

            if (zones[marker.zoneIndex].fill === 0.5)
                unlockBadge(marker.zoneIndex);

            if (zones[marker.zoneIndex].unlocked === false) {
                zones[marker.zoneIndex].unlocked = true;
                putPlace(averagePoint(zones[marker.zoneIndex].polygonPoints), 500, marker.zoneIndex, 4);
            }
        }
    })
}

function putPlace(location, radius, zoneIndex, nPlaces) {
    placesService.nearbySearch(
        {
            location: location,
            radius: radius,
            rankBy: google.maps.places.RankBy.PROMINENCE
        },
        function (results) {
            for (var i = 1; i <= nPlaces; ++i)
                addPlaceOnMap(results[i], zoneIndex);
        }
    );
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

function addPlaceOnMap(place, zoneIndex) {

    var icon = {
        url: "img/sign.png",
        scaledSize: new google.maps.Size(32, 32),
        origin: new google.maps.Point(0, 0),
        anchor: new google.maps.Point(16, 16)
    };

    var placeMarker = new google.maps.Marker(
        {
            icon: icon,
            position: place.geometry.location,
            map: map
        }
    );
    placeMarker.zoneIndex = zoneIndex;

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
            strokeColor: zone.fillColor,
            strokeOpacity: 0.5,
            strokeWeight: 2,
            fillColor: zone.fillColor,
            fillOpacity: 0
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

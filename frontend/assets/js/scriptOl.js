var vectorLayer = new ol.layer.Vector({
    source: new ol.source.Vector({
        format: new ol.format.GeoJSON(),
        projection: 'EPSG:4326',
        url: "http://localhost:4000/coordinates" //ini adalah path JSON kamu
    }),
    style: new ol.style.Style({
        image: new ol.style.Icon(({
            scale: .1,
            anchor: [0.5, 0.5],
            src: 'assets/images/map-marker.png' //ini adalah path icon kamu
        }))
    })
});

var m = document.getElementById("map");

var map = new ol.Map({
    target: m,
    layers: [
        new ol.layer.Tile({
            source: new ol.source.OSM()
        }), vectorLayer
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([101.447777, 0.507068]),
        zoom: 15
    })
});

map.on('click', e => {
    // console.log(e.map)
    var _x = e.coordinate[0] / 100000 - 11.483311;
    var _y = e.coordinate[1] / 100000 - 0.064597;
    var x = document.getElementById("x")
    var y = document.getElementById("y")

    y.value = _y
    x.value = _x
})
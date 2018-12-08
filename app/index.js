/*global $*/
/*global ready*/
$(document).ready(function(){
    $(".scrolla").scrolla({
        mobile:true
    });
})

var comp = document.getElementById("comp");



var url = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?community_board=06%20BRONX&complaint_type=HEAT/HOT%20WATER";
var geourl = "https://data.cityofnewyork.us/resource/fhrw-4uyv.geojson?community_board=06%20BRONX&complaint_type=HEAT/HOT%20WATER";

var data, geodata;

var length = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?community_board=06%20BRONX&complaint_type=HEAT/HOT%20WATER";

fetch(url, { method: "get" })
    .then(response => response.json())
    .then(jsonData => {
        data = jsonData
        dataLoaded();
    })
    .catch(err => {
        //error block
    });
    
var map;

function createMap() {
    map = new Microsoft.Maps.Map('#myMap', {
        credentials: 'AuyI2iuaBDhptSUphEnSVX6LR6_S5ha9WQGz2XjcMqHRkFoz8P5K_F_g83nrNel0',
        center: new Microsoft.Maps.Location(40.847535, -73.887739),
        zoom: 14
    });
    
    var center = map.getCenter();

    //Create custom Pushpin
    var pin = new Microsoft.Maps.Pushpin(center, {
        title: 'Community Board 6',
        text: '6'
    });

    //Add the pushpin to the map
    map.entities.push(pin);
    
    getGeoJSON();
}

function getGeoJSON() { 
    fetch(geourl, { method: "get" })
        .then(response => response.json())
        .then(jsonData => {
            geodata = jsonData
            geodataLoaded();
        })
        .catch(err => {
            //error block
        });
}

function dataLoaded() {
    comp.innerHTML = "&#8805; 24,720"//data.length
}

function geodataLoaded() {
    Microsoft.Maps.loadModule('Microsoft.Maps.GeoJson', function () {

        //Parse the GeoJson object into a Bing Maps shape.
        var shape = Microsoft.Maps.GeoJson.read(geodata);

        //Add the shape to the map.
        map.entities.push(shape);
    });
}

window.onload = createMap;
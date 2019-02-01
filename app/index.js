/*  global $ Microsoft fetch */

$(document).ready(function(){
    $(".scrolla").scrolla({
        mobile:true
    });
})

var comp = document.getElementById("comp");

var cbh = document.getElementById("cbh");
var cbbh = document.getElementById("cbbh");

var cbi = document.getElementById("cbi");
var cbl = document.getElementById("cbl");
var issue = document.getElementById("issue");


var data, map;

var communityBoard = 6;
var communityDistrict = "BRONX";
var communityIssue = "HEAT/HOT%20WATER";


function createMap() {
    getGeoJSON(function (geodata) {
        var center = getCenter(geodata);
        
        map = new Microsoft.Maps.Map('#myMap', {
            credentials: 'AuyI2iuaBDhptSUphEnSVX6LR6_S5ha9WQGz2XjcMqHRkFoz8P5K_F_g83nrNel0',
            center: new Microsoft.Maps.Location(center.latitude , center.longitude),
            zoom: 14
        });
    
        //Create custom Pushpin
        var pin = new Microsoft.Maps.Pushpin(center, {
            title: 'Community Board ' + communityBoard,
            text: communityBoard
        });
    
        //Add the pushpin to the map
        map.entities.push(pin);
        
        Microsoft.Maps.loadModule('Microsoft.Maps.GeoJson', function () {
            //Parse the GeoJson object into a Bing Maps shape.
            var shape = Microsoft.Maps.GeoJson.read(geodata);
    
            //Add the shape to the map.
            map.entities.push(shape);
        });
    });
}


function getURL() {
    return "https://data.cityofnewyork.us/resource/fhrw-4uyv.geojson?" +
        "community_board=" + (communityBoard < 10 ? "0" + communityBoard : communityBoard) +
        "%20" + communityDistrict + "&complaint_type=" + communityIssue;
}

function getGeoJSON(callback) { 
    fetch(getURL(), { method: "get" })
        .then(response => response.json())
        .then(geodata => {
            callback(geodata);
        })
        .catch(err => {
            console.log(err); //error block
        });
}

function getCenter(geodata) {
    var ratio1 = 0.025 / 500;
    var ratio2 = 500 / 0.025;
    
    var farthestLeft =   undefined;
    var farthestRight =  undefined;
    var farthestTop =    undefined;
    var farthestBottom = undefined;
    
    geodata.features[0].geometry.coordinates
    geodata.features.forEach(function (feature) {
        var point = feature.geometry.coordinates;
        
        if (farthestLeft == undefined || point[0] < farthestLeft)
            farthestLeft = point[0];
        if (farthestRight == undefined || point[0] > farthestRight)
            farthestRight = point[0];
        if (farthestTop == undefined || point[1] < farthestTop)
            farthestTop = point[1];
        if (farthestBottom == undefined || point[1] > farthestBottom)
            farthestBottom = point[1];
    });
    
    console.log( (farthestRight - farthestLeft) * ratio2 )
    
    console.log(farthestRight - farthestLeft)
    console.log(farthestBottom - farthestTop)
    
    return {
        altitude: 0,
        altitudeReference: -1,
        longitude: (farthestLeft + farthestRight) / 2,
        latitude: (farthestTop + farthestBottom) / 2
    };
}

comp.innerHTML = "&#8805; 24,720" //data.length



window.onload = createMap;

// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal 
btn.onclick = function() {
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    communityBoard = parseInt( cbh.value );
    communityDistrict = ( cbbh.value ).toUpperCase();
    communityIssue = issue.value;
    
    
    cbl.innerHTML = "Community Board: " + communityDistrict + " " + communityBoard;
    cbi.innerHTML = "Issue: " + issue.options[issue.selectedIndex].innerText;
    
    console.log(issue.value)
    
    createMap();
    
    console.log(communityBoard,communityDistrict);
    
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}

function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
}
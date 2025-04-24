let map; // gebruik dit om de map gemakkelijk aan te spreken doorheen de applicatie

function init() {
    // initialise de kaart
    var map = L.map('map').setView([51.505, -0.09], 13);
    // voeg een tile layer toe, met URL https://a.tile.openstreetmap.org/{z}/{x}/{y}.png
    // vergeet openstreetmap attributie niet
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    // gebruik de functie "loadMarkers" om de markers toe te voegen
}

function loadMarkers() {
    // fetch de data van opendata.brussels.be
    // als er coordinaten beschikbaar zijn, kan je de addMarker functie gebruiken om een marker toe te voegen op de kaart

}

function addMarker(lat, lon) {
    // voeg een marker toe op lat, lon

}

init();
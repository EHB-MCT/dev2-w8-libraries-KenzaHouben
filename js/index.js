import WC_Brussel from "./WC_Brussel.js";

// een lege lijst, want we gaan telkens loopen
const items = [];

let map = L.map('map').setView([50.84294259584643, 4.324465582871228], 13); // gebruik dit om de map gemakkelijk aan te spreken doorheen de applicatie

// let popup = L.popup()
//     .setLatLng([50.84345464295743, 4.325409130456444])
//     .setContent("I am a standalone popup.")
//     .openOn(map);

function init() {
    // initialise de kaart
    // voeg een tile layer toe, met URL https://a.tile.openstreetmap.org/{z}/{x}/{y}.png
    // vergeet openstreetmap attributie niet
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    // gebruik de functie "loadMarkers" om de markers toe te voegen
    loadMarkers();
}

function loadMarkers() {
    const URL = 'https://opendata.bruxelles.be/api/explore/v2.1/catalog/datasets/toilettes_publiques_vbx/records?limit=20';
    // fetch de data van opendata.brussels.be
    fetch(URL)
        .then(function (response) {
            console.log(response);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(function (data) {
            console.log(data);
            data.results.forEach(function (wc) {
                console.log(wc);
                const WC = new WC_Brussel(wc.geo_point_2d.lat, wc.geo_point_2d.lon);
                console.log(wc.geo_point_2d.lat, wc.geo_point_2d.lon);
                items.push(WC);
                // als er coordinaten beschikbaar zijn, kan je de addMarker functie gebruiken om een marker toe te voegen op de kaart
                addMarker(WC.lat, WC.lon);
            })
        })
        .catch(function (error) {
            console.log('Error fetching data:', error);
        })
}


function addMarker(lat, lon) {
    // voeg een marker toe op lat, lon
    let marker = L.marker([lat, lon]).addTo(map);
    // Popups for markers
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
}

init();
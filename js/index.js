import WC_Brussel from "./WC_Brussel.js";

// een lege lijst, want we gaan telkens loopen
const items = [];

let map = L.map('map').setView([50.84294259584643, 4.324465582871228], 13); // 13 is de zoomwaarde

function init() {
    // initialise de kaart
    // tile layer -> allemaal vierkantjes, geplakt aan elkaar om een kaart te vormen. Die gaat bepalen wat jij grafisch wilt
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
                const WC = new WC_Brussel(wc.geo_point_2d.lat, wc.geo_point_2d.lon, wc.location);
                console.log(wc.geo_point_2d.lat, wc.geo_point_2d.lon, wc.location);
                items.push(WC);
                // als er coordinaten beschikbaar zijn, kan je de addMarker functie gebruiken om een marker toe te voegen op de kaart
                addMarker(WC.lon, WC.lat, WC.location);
            })
        })
        .catch(function (error) {
            console.log('Error fetching data:', error);
        })
}

function addMarker(lon, lat, location) {
    // voeg een marker toe op lat, lon
    let marker = L.marker([lon, lat]).addTo(map);
    // Popups for markers
    // bindPopup -> betekenis online opzoeken
    marker.bindPopup(location).openPopup();

    let marker_2 = L.marker([50.84244901855835, 4.325050326798233]).addTo(map);
    marker_2.bindPopup("MCT bij EhB").openPopup();
}

init();
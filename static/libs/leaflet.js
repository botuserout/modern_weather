// Minimal custom Leaflet map script
// Assumes Leaflet CSS and JS are already loaded in the HTML

function initMap(lat = 51.505, lng = -0.09, zoom = 13) {
    var map = L.map('map').setView([lat, lng], zoom);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
    var marker = L.marker([lat, lng]).addTo(map);
    marker.bindPopup('Default Location').openPopup();
    return map;
}
// Usage: Call initMap() after the page loads and #map div is present.

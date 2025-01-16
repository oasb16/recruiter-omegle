const map = L.map('map-container').setView([37.7749, -122.4194], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

fetch('/map_data')
    .then(response => response.json())
    .then(data => {
        data.forEach(user => {
            L.marker(user.location).addTo(map)
                .bindPopup(`<b>${user.name}</b> (${user.role})`);
        });
    });

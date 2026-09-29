// Leaflet page used to pick a delivery point. It shows the delivery area as a
// circle, lets the customer tap or drag the pin, and talks to the app with
// messages: it posts { type: 'pick', latitude, longitude } and listens for
// { type: 'moveTo', latitude, longitude }.

const LEAFLET = 'https://unpkg.com/leaflet@1.9.4/dist';
const TILES = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

export const buildLocationPickerHtml = ({ area, initial }) => `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <link rel="stylesheet" href="${LEAFLET}/leaflet.css" />
  <script src="${LEAFLET}/leaflet.js"></script>
  <style>
    html, body, #map { height: 100%; margin: 0; }
    .pin { width: 34px; height: 34px; border-radius: 50% 50% 50% 0; background: #6C4CE0;
      transform: rotate(-45deg); border: 3px solid #fff; box-shadow: 0 4px 10px rgba(0,0,0,.3); }
  </style>
</head>
<body>
  <div id="map"></div>
  <script>
    const area = ${JSON.stringify(area)};
    const start = ${JSON.stringify(initial)};
    const send = (message) => {
      const payload = JSON.stringify(message);
      if (window.ReactNativeWebView) window.ReactNativeWebView.postMessage(payload);
      else window.parent.postMessage(payload, '*');
    };

    const map = L.map('map', { zoomControl: false }).setView([start.latitude, start.longitude], 15);
    L.tileLayer('${TILES}', { maxZoom: 19, attribution: '${ATTRIBUTION}' }).addTo(map);
    L.circle([area.center.latitude, area.center.longitude], {
      radius: area.radiusKm * 1000,
      color: '#6C4CE0',
      weight: 2,
      fillColor: '#9C7CFE',
      fillOpacity: 0.08,
      interactive: false,
    }).addTo(map);

    const icon = L.divIcon({ className: '', html: '<div class="pin"></div>', iconSize: [34, 34], iconAnchor: [4, 34] });
    const marker = L.marker([start.latitude, start.longitude], { draggable: true, icon }).addTo(map);
    const pick = (latlng) => send({ type: 'pick', latitude: latlng.lat, longitude: latlng.lng });

    marker.on('dragend', () => pick(marker.getLatLng()));
    map.on('click', (event) => {
      marker.setLatLng(event.latlng);
      pick(event.latlng);
    });

    window.__moveTo = (latitude, longitude) => {
      marker.setLatLng([latitude, longitude]);
      map.flyTo([latitude, longitude], 16, { duration: 0.6 });
    };
    window.addEventListener('message', (event) => {
      let data = event.data;
      try { if (typeof data === 'string') data = JSON.parse(data); } catch (e) { return; }
      if (data && data.type === 'moveTo') window.__moveTo(data.latitude, data.longitude);
    });

    send({ type: 'ready' });
  </script>
</body>
</html>`;

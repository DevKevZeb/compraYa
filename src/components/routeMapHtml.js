// Leaflet page with OpenStreetMap tiles shared by the native (WebView) and web
// (iframe) versions of RouteMap, so the delivery map never needs an API key.

const LEAFLET = 'https://unpkg.com/leaflet@1.9.4/dist';
const TILES = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>';

const toLatLng = (point) => (point ? [point.latitude, point.longitude] : null);

const buildHtml = ({ store, destination, route, bottomInset }) => `<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
  <link rel="stylesheet" href="${LEAFLET}/leaflet.css" />
  <script src="${LEAFLET}/leaflet.js"></script>
  <style>html, body, #map { height: 100%; margin: 0; }</style>
</head>
<body>
  <div id="map"></div>
  <script>
    const data = ${JSON.stringify({ store, destination, route, bottomInset })};
    const map = L.map('map', { zoomControl: false }).setView(data.store, 14);
    L.tileLayer('${TILES}', { maxZoom: 19, attribution: '${ATTRIBUTION}' }).addTo(map);

    const pin = (latLng, color, label) =>
      L.circleMarker(latLng, { radius: 10, color: '#fff', weight: 3, fillColor: color, fillOpacity: 1 })
        .addTo(map)
        .bindPopup(label);

    pin(data.store, '#2E7D32', 'Tienda');
    const bounds = [data.store];
    if (data.destination) {
      pin(data.destination, '#C62828', 'Destino');
      bounds.push(data.destination);
    }
    if (data.route.length > 1) {
      L.polyline(data.route, { color: '#9C7CFE', weight: 6, opacity: 0.9 }).addTo(map);
      bounds.push(...data.route);
    }
    if (bounds.length > 1) {
      map.fitBounds(bounds, { paddingTopLeft: [40, 40], paddingBottomRight: [40, data.bottomInset] });
    }
  </script>
</body>
</html>`;

// Builds the map page from { latitude, longitude } points.
export const buildRouteMapHtml = ({ store, destination, route = [], bottomInset = 160 }) =>
  buildHtml({
    store: toLatLng(store),
    destination: toLatLng(destination),
    route: route.map(toLatLng),
    bottomInset,
  });

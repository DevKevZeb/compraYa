import * as Location from 'expo-location';
import { DELIVERY_AREA, DELIVERY_COUNTRY_CODE } from '../config/store';

// Keyless map services: the device's native geocoder with an OpenStreetMap
// (Nominatim) fallback, and routes from the public OSRM server.
// Swapping providers only requires changes in this file.

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const OSRM_URL = 'https://router.project-osrm.org/route/v1/driving';
const USER_AGENT = 'CompraYa/1.0 (Expo portfolio demo)';

const withArea = (address) =>
  address.toLowerCase().includes('bolivia') ? address : `${address}, ${DELIVERY_AREA}`;

const geocodeWithDevice = async (query) => {
  try {
    const [result] = await Location.geocodeAsync(query);
    return result ? { latitude: result.latitude, longitude: result.longitude } : null;
  } catch {
    // Not available on every platform (e.g. some emulators); fall back to Nominatim.
    return null;
  }
};

const geocodeWithNominatim = async (query) => {
  const params = new URLSearchParams({
    q: query,
    format: 'json',
    limit: '1',
    countrycodes: DELIVERY_COUNTRY_CODE,
  });
  const response = await fetch(`${NOMINATIM_URL}?${params}`, {
    headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Geocoding failed (${response.status})`);
  }

  const [result] = await response.json();
  return result ? { latitude: Number(result.lat), longitude: Number(result.lon) } : null;
};

/** Resolves an address to coordinates, or null when nothing matches. */
export const geocodeAddress = async (address) => {
  const query = withArea(address.trim());
  return (await geocodeWithDevice(query)) ?? (await geocodeWithNominatim(query));
};

/** Driving route between two points, or null when no route exists. */
export const getRoute = async (origin, destination) => {
  const path = `${origin.longitude},${origin.latitude};${destination.longitude},${destination.latitude}`;
  const response = await fetch(`${OSRM_URL}/${path}?overview=full&geometries=geojson`);
  if (!response.ok) {
    throw new Error(`Routing failed (${response.status})`);
  }

  const data = await response.json();
  const [route] = data.routes ?? [];
  if (data.code !== 'Ok' || !route) {
    return null;
  }

  return {
    coordinates: route.geometry.coordinates.map(([longitude, latitude]) => ({
      latitude,
      longitude,
    })),
    distanceKm: route.distance / 1000,
    durationMin: route.duration / 60,
  };
};

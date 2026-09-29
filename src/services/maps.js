import * as Location from 'expo-location';
import { DELIVERY_CITY, DELIVERY_COUNTRY_CODE } from '../config/store';

// Keyless map services: the device's native geocoder with an OpenStreetMap
// (Nominatim) fallback, and routes from the public OSRM server.
// Swapping providers only requires changes in this file.

const NOMINATIM_URL = 'https://nominatim.openstreetmap.org/search';
const OSRM_URL = 'https://router.project-osrm.org/route/v1/driving';
const USER_AGENT = 'CompraYa/1.0 (Expo portfolio demo)';

const withArea = (address) =>
  address.toLowerCase().includes('bolivia') ? address : `${address}, ${DELIVERY_CITY}`;

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

const NOMINATIM_REVERSE_URL = 'https://nominatim.openstreetmap.org/reverse';

// "Avenida Heroínas 500, Centro" from a Nominatim address. Search results prefer
// the place's own name ("Edificio Las Heroínas, San Pedro").
export const formatPlaceLabel = (place, { preferName = false } = {}) => {
  const a = place?.address ?? {};
  const street = [a.road ?? a.pedestrian ?? a.footway, a.house_number].filter(Boolean).join(' ');
  const area = a.neighbourhood ?? a.suburb ?? a.quarter ?? a.city_district;
  const primary = preferName ? place?.name || street : street || place?.name;
  const label = [primary, area].filter(Boolean).join(', ');
  return label || place?.display_name?.split(',').slice(0, 2).join(',').trim() || '';
};

/** Street-level description of a point, or null when nothing is found. */
export const reverseGeocode = async ({ latitude, longitude }) => {
  const params = new URLSearchParams({
    lat: String(latitude),
    lon: String(longitude),
    format: 'jsonv2',
    zoom: '18',
    addressdetails: '1',
  });
  const response = await fetch(`${NOMINATIM_REVERSE_URL}?${params}`, {
    headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Reverse geocoding failed (${response.status})`);
  }
  const place = await response.json();
  return place?.error ? null : formatPlaceLabel(place) || null;
};

/** Places matching a search, limited to the given [west, north, east, south] box. */
export const searchPlaces = async (query, viewbox) => {
  const params = new URLSearchParams({
    q: query,
    format: 'jsonv2',
    addressdetails: '1',
    limit: '6',
    countrycodes: DELIVERY_COUNTRY_CODE,
    viewbox: viewbox.join(','),
    bounded: '1',
  });
  const response = await fetch(`${NOMINATIM_URL}?${params}`, {
    headers: { 'User-Agent': USER_AGENT, Accept: 'application/json' },
  });
  if (!response.ok) {
    throw new Error(`Search failed (${response.status})`);
  }
  const places = await response.json();
  return places.map((place) => ({
    id: String(place.place_id),
    label: formatPlaceLabel(place, { preferName: true }),
    description: place.display_name,
    latitude: Number(place.lat),
    longitude: Number(place.lon),
  }));
};

import { DELIVERY_AREA } from '../config/store';

const EARTH_RADIUS_KM = 6371;
const toRadians = (degrees) => (degrees * Math.PI) / 180;

// Great-circle distance between two { latitude, longitude } points (haversine).
export const distanceKm = (a, b) => {
  const dLat = toRadians(b.latitude - a.latitude);
  const dLng = toRadians(b.longitude - a.longitude);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRadians(a.latitude)) * Math.cos(toRadians(b.latitude)) * Math.sin(dLng / 2) ** 2;
  return 2 * EARTH_RADIUS_KM * Math.asin(Math.sqrt(h));
};

export const isWithinDeliveryArea = (point, area = DELIVERY_AREA) =>
  Boolean(point) && distanceKm(point, area.center) <= area.radiusKm;

// Box that contains the delivery circle: [west, north, east, south] for Nominatim's viewbox.
export const deliveryViewbox = (area = DELIVERY_AREA) => {
  const latDelta = area.radiusKm / 111.32;
  const lngDelta = area.radiusKm / (111.32 * Math.cos(toRadians(area.center.latitude)));
  return [
    area.center.longitude - lngDelta,
    area.center.latitude + latDelta,
    area.center.longitude + lngDelta,
    area.center.latitude - latDelta,
  ];
};

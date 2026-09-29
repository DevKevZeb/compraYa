import { DELIVERY_AREA } from '../../config/store';
import { deliveryViewbox, distanceKm, isWithinDeliveryArea } from '../geo';

const plaza = DELIVERY_AREA.center;

describe('geo utils', () => {
  it('measures distances in kilometers', () => {
    expect(distanceKm(plaza, plaza)).toBe(0);
    // Plaza 14 de Septiembre to UMSS is a bit under 1 km.
    expect(distanceKm(plaza, { latitude: -17.3939, longitude: -66.1473 })).toBeCloseTo(1.03, 1);
    // Cochabamba to Santa Cruz de la Sierra is roughly 310 km in a straight line.
    expect(distanceKm(plaza, { latitude: -17.7833, longitude: -63.1821 })).toBeGreaterThan(300);
  });

  it('only accepts points inside the Cochabamba delivery area', () => {
    expect(isWithinDeliveryArea({ latitude: -17.3903, longitude: -66.1471 })).toBe(true);
    expect(isWithinDeliveryArea({ latitude: -17.398, longitude: -66.28 })).toBe(false); // Quillacollo
    expect(isWithinDeliveryArea({ latitude: -16.5, longitude: -68.15 })).toBe(false); // La Paz
    expect(isWithinDeliveryArea(null)).toBe(false);
  });

  it('builds a viewbox around the delivery circle', () => {
    const [west, north, east, south] = deliveryViewbox();
    expect(west).toBeLessThan(plaza.longitude);
    expect(east).toBeGreaterThan(plaza.longitude);
    expect(north).toBeGreaterThan(plaza.latitude);
    expect(south).toBeLessThan(plaza.latitude);
    expect(north - plaza.latitude).toBeCloseTo(DELIVERY_AREA.radiusKm / 111.32, 5);
  });
});

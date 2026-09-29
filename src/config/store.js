// Physical store the deliveries leave from (UMSS campus, Cochabamba, Bolivia).
export const STORE_LOCATION = {
  latitude: -17.393862717524335,
  longitude: -66.14728339607203,
};

// Orders are only delivered inside this circle around Plaza 14 de Septiembre.
// The create_order database function enforces the same values.
export const DELIVERY_AREA = {
  name: 'Cochabamba',
  center: { latitude: -17.3935, longitude: -66.157 },
  radiusKm: 10,
};

// Appended to searches so geocoding favors results in the delivery city.
export const DELIVERY_CITY = 'Cochabamba, Bolivia';
export const DELIVERY_COUNTRY_CODE = 'bo';

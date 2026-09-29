import { formatPlaceLabel } from '../maps';

jest.mock('expo-location', () => ({ geocodeAsync: jest.fn() }));

const place = {
  name: 'Edificio Las Heroínas',
  display_name: 'Edificio Las Heroínas, San Pedro, Adela Zamudio, Cochabamba, Bolivia',
  address: { road: 'Avenida Heroínas', house_number: '500', neighbourhood: 'San Pedro' },
};

describe('formatPlaceLabel', () => {
  it('describes a point by street, number and neighbourhood', () => {
    expect(formatPlaceLabel(place)).toBe('Avenida Heroínas 500, San Pedro');
  });

  it('prefers the place name for search results', () => {
    expect(formatPlaceLabel(place, { preferName: true })).toBe('Edificio Las Heroínas, San Pedro');
  });

  it('falls back to the display name', () => {
    expect(formatPlaceLabel({ display_name: 'Cochabamba, Cercado, Bolivia' })).toBe(
      'Cochabamba, Cercado'
    );
    expect(formatPlaceLabel(null)).toBe('');
  });
});

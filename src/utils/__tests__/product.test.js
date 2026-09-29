import { getProductImages, getStockStatus, popularityToRating } from '../product';

describe('product utils', () => {
  it('maps popularity (0-100) to a 0-5 rating with one decimal', () => {
    expect(popularityToRating(100)).toBe(5);
    expect(popularityToRating(57)).toBe(2.9);
    expect(popularityToRating(0)).toBe(0);
    expect(popularityToRating(140)).toBe(5);
  });

  it('describes stock availability', () => {
    expect(getStockStatus(0)).toEqual({ key: 'out', label: 'Out of stock' });
    expect(getStockStatus(3)).toEqual({ key: 'low', label: 'Only 3 left' });
    expect(getStockStatus(50)).toEqual({ key: 'in', label: 'In stock' });
  });

  it('prefers the gallery and falls back to the thumbnail', () => {
    expect(getProductImages({ imagenes: ['a.webp', 'b.webp'], url_imagen: 't.webp' })).toEqual([
      'a.webp',
      'b.webp',
    ]);
    expect(getProductImages({ imagenes: [], url_imagen: 't.webp' })).toEqual(['t.webp']);
    expect(getProductImages({})).toEqual([]);
  });
});

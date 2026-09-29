import {
  SHIPPING_COST,
  calculateOrderTotals,
  calculateSubtotal,
  formatCurrency,
  toOrderItems,
} from '../order';

const items = [
  { producto_id: 1, nombre_producto: 'iPhone 5s', precio: 1391.9, cantidad: 2 },
  { producto_id: 2, nombre_producto: 'Mascara', precio: 69.5, cantidad: 1 },
];

describe('order utils', () => {
  it('sums price times quantity', () => {
    expect(calculateSubtotal(items)).toBe(2853.3);
  });

  it('avoids floating point drift', () => {
    expect(calculateSubtotal([{ precio: 0.1, cantidad: 3 }])).toBe(0.3);
  });

  it('adds shipping only when the cart has items', () => {
    expect(calculateOrderTotals(items)).toEqual({
      subtotal: 2853.3,
      shipping: SHIPPING_COST,
      total: 2853.3 + SHIPPING_COST,
    });
    expect(calculateOrderTotals([])).toEqual({ subtotal: 0, shipping: 0, total: 0 });
  });

  it('sends only product ids and quantities to the backend', () => {
    expect(toOrderItems(items)).toEqual([
      { producto_id: 1, cantidad: 2 },
      { producto_id: 2, cantidad: 1 },
    ]);
  });

  it('formats amounts in bolivianos', () => {
    expect(formatCurrency(20)).toBe('Bs 20.00');
  });
});

import { supabase } from '../../lib/supabase';
import { useCartStore } from '../cart.store';

jest.mock('../../lib/supabase', () => ({
  supabase: { rpc: jest.fn() },
}));

const phone = { producto_id: 1, nombre_producto: 'iPhone 5s', precio: 1391.9, stock: 25 };
const mascara = { producto_id: 2, nombre_producto: 'Mascara', precio: 69.5, stock: 99 };

const cart = () => useCartStore.getState();

describe('cart store', () => {
  beforeEach(() => {
    useCartStore.setState({ cartItems: [] });
    supabase.rpc.mockReset();
  });

  it('adds products and increments quantities', () => {
    cart().addToCart(phone);
    cart().addToCart(phone);
    cart().addToCart(mascara);

    expect(cart().cartItems).toEqual([
      { producto_id: 1, nombre_producto: 'iPhone 5s', precio: 1391.9, cantidad: 2 },
      { producto_id: 2, nombre_producto: 'Mascara', precio: 69.5, cantidad: 1 },
    ]);
    expect(cart().totalItemsInCart()).toBe(3);
    expect(cart().isInCart(2)).toBe(true);
  });

  it('removes a product when its quantity drops below one', () => {
    cart().addToCart(phone);
    cart().setQuantity(1, 5);
    expect(cart().cartItems[0].cantidad).toBe(5);

    cart().setQuantity(1, 0);
    expect(cart().cartItems).toEqual([]);
  });

  it('places the order with ids and quantities only, then empties the cart', async () => {
    const order = { orden_id: 7, numero_seguimiento: 'CY-ABC123' };
    supabase.rpc.mockResolvedValue({ data: order, error: null });
    cart().addToCart(phone);
    cart().addToCart(phone);

    const result = await cart().saveOrder('Av. Heroínas 123', 42);

    expect(supabase.rpc).toHaveBeenCalledWith('create_order', {
      p_direccion_envio: 'Av. Heroínas 123',
      p_metodo_pago: 42,
      p_items: [{ producto_id: 1, cantidad: 2 }],
    });
    expect(result).toEqual({ order });
    expect(cart().cartItems).toEqual([]);
  });

  it('keeps the cart when the order fails', async () => {
    const error = new Error('Insufficient stock for product 1');
    supabase.rpc.mockResolvedValue({ data: null, error });
    cart().addToCart(phone);

    await expect(cart().saveOrder('Av. Heroínas 123', 42)).resolves.toEqual({ error });
    expect(cart().cartItems).toHaveLength(1);
  });
});

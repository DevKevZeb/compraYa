import { fireEvent, render, screen } from '@testing-library/react-native';
import { PaperProvider } from 'react-native-paper';
import { useCartStore } from '../../stores/cart.store';
import { ProductCard } from '../ProductCard';

jest.mock('../../lib/supabase', () => ({ supabase: {} }));

const product = {
  producto_id: 1,
  nombre_producto: 'iPhone 5s',
  precio: 1391.9,
  stock: 25,
  popularidad: 57,
  url_imagen: 'https://example.com/iphone.webp',
};

const renderCard = (item = product, onPress = jest.fn()) =>
  render(
    <PaperProvider>
      <ProductCard item={item} onPress={onPress} />
    </PaperProvider>
  );

describe('ProductCard', () => {
  beforeEach(() => {
    useCartStore.setState({ cartItems: [] });
  });

  it('shows the name, rating and price', async () => {
    await renderCard();
    expect(screen.getByText('iPhone 5s')).toBeOnTheScreen();
    expect(screen.getByText('2.9')).toBeOnTheScreen();
    expect(screen.getByText('Bs 1391.90')).toBeOnTheScreen();
  });

  it('adds the product to the cart and shows the quantity', async () => {
    await renderCard();

    await fireEvent.press(screen.getByLabelText('Add iPhone 5s to cart'));
    await fireEvent.press(screen.getByLabelText('Add iPhone 5s to cart'));

    expect(useCartStore.getState().cartItems).toEqual([
      expect.objectContaining({ producto_id: 1, cantidad: 2 }),
    ]);
    expect(screen.getByText('2')).toBeOnTheScreen();
  });

  it('flags low stock and blocks out-of-stock products', async () => {
    const { rerender } = await renderCard({ ...product, stock: 3 });
    expect(screen.getByText('Only 3 left')).toBeOnTheScreen();

    await rerender(
      <PaperProvider>
        <ProductCard item={{ ...product, stock: 0 }} onPress={jest.fn()} />
      </PaperProvider>
    );
    expect(screen.getByText('Out of stock')).toBeOnTheScreen();
    await fireEvent.press(screen.getByLabelText('Add iPhone 5s to cart'));
    expect(useCartStore.getState().cartItems).toHaveLength(0);
  });

  it('opens the product when pressed', async () => {
    const onPress = jest.fn();
    await renderCard(product, onPress);

    await fireEvent.press(screen.getByText('iPhone 5s'));
    expect(onPress).toHaveBeenCalledWith(product);
  });
});

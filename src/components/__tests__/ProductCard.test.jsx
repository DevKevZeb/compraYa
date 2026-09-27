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

  it('shows the product details', async () => {
    await renderCard();
    expect(screen.getByText('iPhone 5s')).toBeOnTheScreen();
    expect(screen.getByText('Stock: 25 unidades')).toBeOnTheScreen();
  });

  it('adds the product to the cart and allows cancelling it', async () => {
    await renderCard();

    await fireEvent.press(screen.getByText('Añadir'));
    expect(useCartStore.getState().cartItems).toHaveLength(1);

    await fireEvent.press(screen.getByText('Cancelar'));
    expect(useCartStore.getState().cartItems).toHaveLength(0);
    expect(screen.queryByText('Cancelar')).not.toBeOnTheScreen();
  });

  it('does not allow adding out-of-stock products', async () => {
    await renderCard({ ...product, stock: 0 });

    expect(screen.getByText('Agotado')).toBeOnTheScreen();
    await fireEvent.press(screen.getByText('Añadir'));
    expect(useCartStore.getState().cartItems).toHaveLength(0);
  });

  it('opens the product details when pressed', async () => {
    const onPress = jest.fn();
    await renderCard(product, onPress);

    await fireEvent.press(screen.getByText('iPhone 5s'));
    expect(onPress).toHaveBeenCalledWith(product);
  });
});

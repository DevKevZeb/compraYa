import { addFavorite, getFavorites, removeFavorite } from '../../services/api';
import { useFavoritesStore } from '../favorites.store';

jest.mock('../../services/api', () => ({
  getFavorites: jest.fn(),
  addFavorite: jest.fn(),
  removeFavorite: jest.fn(),
}));

const phone = { producto_id: 1, nombre_producto: 'iPhone 5s' };
const laptop = { producto_id: 2, nombre_producto: 'MacBook Pro' };
const favorites = () => useFavoritesStore.getState();

describe('favorites store', () => {
  beforeEach(() => {
    useFavoritesStore.setState({ products: [], loaded: false });
    jest.clearAllMocks();
  });

  it('loads favorite products from the backend', async () => {
    getFavorites.mockResolvedValue({
      data: [
        { producto_id: 2, productos: laptop },
        { producto_id: 1, productos: phone },
      ],
      error: null,
    });

    await favorites().load();

    expect(favorites().products).toEqual([laptop, phone]);
    expect(favorites().loaded).toBe(true);
    expect(favorites().isFavorite(1)).toBe(true);
  });

  it('adds and removes favorites', async () => {
    addFavorite.mockResolvedValue({ error: null });
    removeFavorite.mockResolvedValue({ error: null });

    await expect(favorites().toggle(phone)).resolves.toEqual({ favorite: true });
    expect(addFavorite).toHaveBeenCalledWith(1);
    expect(favorites().isFavorite(1)).toBe(true);

    await expect(favorites().toggle(phone)).resolves.toEqual({ favorite: false });
    expect(removeFavorite).toHaveBeenCalledWith(1);
    expect(favorites().isFavorite(1)).toBe(false);
  });

  it('rolls back the optimistic update when the backend fails', async () => {
    const error = new Error('offline');
    addFavorite.mockResolvedValue({ error });

    const pending = favorites().toggle(phone);
    expect(favorites().isFavorite(1)).toBe(true);

    await expect(pending).resolves.toEqual({ error });
    expect(favorites().isFavorite(1)).toBe(false);
  });
});

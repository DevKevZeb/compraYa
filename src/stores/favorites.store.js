import { create } from 'zustand';
import { addFavorite, getFavorites, removeFavorite } from '../services/api';
import { withRetry } from '../utils/retry';

// Favorite products of the signed-in user. Toggles update the UI immediately
// and roll back if the backend rejects the change.
export const useFavoritesStore = create((set, get) => ({
  products: [],
  loaded: false,

  isFavorite: (productId) => get().products.some((p) => p.producto_id === productId),

  load: async () => {
    const { data, error } = await withRetry(getFavorites);
    if (error) {
      console.error('Error loading favorites:', error.message || error);
      set({ loaded: true });
      return;
    }
    set({ products: data.map((row) => row.productos).filter(Boolean), loaded: true });
  },

  toggle: async (product) => {
    const previous = get().products;
    const wasFavorite = previous.some((p) => p.producto_id === product.producto_id);

    set({
      products: wasFavorite
        ? previous.filter((p) => p.producto_id !== product.producto_id)
        : [product, ...previous],
    });

    const { error } = wasFavorite
      ? await removeFavorite(product.producto_id)
      : await addFavorite(product.producto_id);

    if (error) {
      set({ products: previous });
      return { error };
    }
    return { favorite: !wasFavorite };
  },

  reset: () => set({ products: [], loaded: false }),
}));

import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { supabase } from '../../lib/initSupaBase';
import { toOrderItems } from '../utils/order';

// The cart lives on the device (persisted across restarts). The backend only
// sees it when the order is placed through the create_order RPC.
export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],

      totalItemsInCart: () => get().cartItems.reduce((total, item) => total + item.cantidad, 0),

      addToCart: (product) => {
        const cartItems = get().cartItems;
        const existing = cartItems.find((item) => item.producto_id === product.producto_id);

        set({
          cartItems: existing
            ? cartItems.map((item) =>
                item.producto_id === product.producto_id
                  ? { ...item, cantidad: item.cantidad + 1 }
                  : item
              )
            : [
                ...cartItems,
                {
                  producto_id: product.producto_id,
                  nombre_producto: product.nombre_producto,
                  precio: product.precio,
                  cantidad: 1,
                },
              ],
        });
      },

      setQuantity: (productId, quantity) => {
        if (quantity < 1) {
          get().removeFromCart(productId);
          return;
        }
        set({
          cartItems: get().cartItems.map((item) =>
            item.producto_id === productId ? { ...item, cantidad: quantity } : item
          ),
        });
      },

      removeFromCart: (productId) => {
        set({ cartItems: get().cartItems.filter((item) => item.producto_id !== productId) });
      },

      clearCart: () => set({ cartItems: [] }),

      isInCart: (productId) => get().cartItems.some((item) => item.producto_id === productId),

      // Places the order through the create_order RPC, which prices the items,
      // stores them and updates stock in a single transaction.
      saveOrder: async (address, paymentMethodId) => {
        const { data, error } = await supabase.rpc('create_order', {
          p_direccion_envio: address,
          p_metodo_pago: paymentMethodId,
          p_items: toOrderItems(get().cartItems),
        });

        if (error) {
          return { error };
        }

        set({ cartItems: [] });
        return { order: data };
      },
    }),
    {
      name: 'compraya-cart',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ cartItems: state.cartItems }),
    }
  )
);

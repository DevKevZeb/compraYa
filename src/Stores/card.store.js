import { create } from 'zustand';
import { supabase } from '../../lib/initSupaBase';
import { useUserStore } from './user.store';

export const useCartStore = create((set, get) => ({
  cartItems: [],
  cartId: null,

  totalItemsInCart: () => {
    const cartItems = get().cartItems;
    return cartItems.reduce((total, item) => total + item.cantidad, 0);
  },

  // Funcion para agregar producto al carrito
  addToCart: async (product) => {
    const cartItems = get().cartItems;
    const existingProduct = cartItems.find(item => item.producto_id === product.producto_id);
    const userId = useUserStore.getState().user?.userId;
    let cartId = get().cartId;

    if (!userId) {
      console.error('User not logged in');
      return;
    }

    if (!cartId) {
      // Crear un nuevo carrito
      const { data: newCart, error: createError } = await supabase
        .from('carrito_compras')
        .insert([{ usuario_id: userId, creado_en: new Date().toISOString() }])
        .select()
        .single();

      if (createError) {
        console.error('Error creating cart:', createError.message || createError);
        return;
      }

      cartId = newCart.carrito_id;
      set({ cartId });
      console.log('Cart created with ID:', cartId);
    }

    if (existingProduct) {
      set({
        cartItems: cartItems.map(item =>
          item.producto_id === product.producto_id ? { ...item, cantidad: item.cantidad + 1 } : item
        ),
      });
    } else {
      set({
        cartItems: [...cartItems, { ...product, cantidad: 1 }],
      });
    }
  },

  // Funcion para guardar los productos en items_carrito
  saveCartItems: async () => {
    const cartItems = get().cartItems;
    const cartId = get().cartId;

    if (!cartId) {
      console.error('No cart found');
      return;
    }

    try {
      for (const item of cartItems) {
        const { data: existingItem, error: fetchError } = await supabase
          .from('items_carrito')
          .select('item_carrito_id')
          .eq('carrito_id', cartId)
          .eq('producto_id', item.producto_id)
          .single();

        if (fetchError && fetchError.code !== 'PGRST116') {
          console.error('Error fetching cart item:', fetchError.message || fetchError);
          continue;
        }

        if (existingItem) {
          // Actualizar el producto existente
          const { error: updateError } = await supabase
            .from('items_carrito')
            .update({
              cantidad: item.cantidad,
              precio_en_el_momento: item.precio,
              subtotal: item.precio * item.cantidad,
            })
            .eq('item_carrito_id', existingItem.item_carrito_id);

          if (updateError) {
            console.error('Error updating cart item:', updateError.message || updateError);
          } else {
            console.log('Cart item updated:', existingItem.item_carrito_id);
          }
        } else {
          // Insertar un nuevo producto
          const { data, error } = await supabase
            .from('items_carrito')
            .insert([{
              carrito_id: cartId,
              producto_id: item.producto_id,
              cantidad: item.cantidad,
              precio_en_el_momento: item.precio,
              subtotal: item.precio * item.cantidad,
            }]);

          if (error) {
            console.error('Error saving cart item:', error.message || error);
          } else {
            console.log('Cart item saved:', data);
          }
        }
      }
    } catch (error) {
      console.error('Error saving cart items:', error.message || error);
    }
  },

  // Funcion para establecer la cantidad de un producto existente directamente
  setQuantity: (productId, newQuantity) => {
    const cartItems = get().cartItems;
    set({
      cartItems: cartItems.map(item =>
        item.producto_id === productId ? { ...item, cantidad: newQuantity } : item
      )
    });
  },

  // Funcion para eliminar producto del carrito
  removeFromCart: async (productId) => {
    const cartItems = get().cartItems;
    const cartId = get().cartId;

    if (!cartId) {
      console.error('No cart found');
      return;
    }

    set({
      cartItems: cartItems.filter(item => item.producto_id !== productId),
    });

    try {
      const { data, error } = await supabase
        .from('items_carrito')
        .delete()
        .eq('carrito_id', cartId)
        .eq('producto_id', productId);

      if (error) {
        console.error('Error removing from cart:', error.message || error);
      } else {
        console.log('Product removed from cart:', data);

        // Verificar si el carrito está vacío y eliminarlo si es necesario
        const remainingItems = get().cartItems;
        if (remainingItems.length === 0) {
          const { error: deleteCartError } = await supabase
            .from('carrito_compras')
            .delete()
            .eq('carrito_id', cartId);

          if (deleteCartError) {
            console.error('Error deleting cart:', deleteCartError.message || deleteCartError);
          } else {
            set({ cartId: null });
            console.log('Cart deleted');
          }
        }
      }
    } catch (error) {
      console.error('Error removing from cart:', error.message || error);
    }
  },

  // Funcion para eliminar el carrito completo
  clearCart: async () => {
    const cartId = get().cartId;

    if (!cartId) {
      console.error('No cart found');
      return;
    }

    try {
      // Eliminar todos los productos del carrito
      const { error: deleteItemsError } = await supabase
        .from('items_carrito')
        .delete()
        .eq('carrito_id', cartId);

      if (deleteItemsError) {
        console.error('Error deleting cart items:', deleteItemsError.message || deleteItemsError);
        return;
      }

      // Eliminar el carrito
      const { error: deleteCartError } = await supabase
        .from('carrito_compras')
        .delete()
        .eq('carrito_id', cartId);

      if (deleteCartError) {
        console.error('Error deleting cart:', deleteCartError.message || deleteCartError);
      } else {
        set({ cartItems: [], cartId: null });
        console.log('Cart cleared');
      }
    } catch (error) {
      console.error('Error clearing cart:', error.message || error);
    }
  },

  isInCart: (productId) => {
    const cartItems = get().cartItems;
    return cartItems.some(item => item.producto_id === productId);
  },

  saveOrder: async (address, paymentMethodId, totalAmount) => {
    const userId = useUserStore.getState().user?.userId;
    const shippingCost = 20;
    const orderStatus = 'pendiente';
    const trackingNumber = Math.floor(1000 + Math.random() * 9000).toString();
    const currentDate = new Date().toISOString();

    if (!userId) {
      console.error('User not logged in');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('ordenes')
        .insert([{
          usuario_id: userId,
          direccion_envio: address,
          metodo_pago: paymentMethodId,
          monto_total: totalAmount,
          costo_envio: shippingCost,
          estado: orderStatus,
          numero_seguimiento: trackingNumber,
          fecha: currentDate,
        }]);

      if (error) {
        console.error('Error saving order:', error.message || error);
        return;
      }

      console.log('Order saved:', data);

      // Vaciar el carrito
      const cartId = get().cartId;
      if (cartId) {
        await supabase
          .from('items_carrito')
          .delete()
          .eq('carrito_id', cartId);

        await supabase
          .from('carrito_compras')
          .delete()
          .eq('carrito_id', cartId);

        set({ cartItems: [], cartId: null });
        console.log('Cart cleared');
      }
    } catch (error) {
      console.error('Error saving order:', error.message || error);
    }
  },
}));

import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  cartItems: [],

  totalItemsInCart: () => {
    const cartItems = get().cartItems;
    return cartItems.reduce((total, item) => total + item.cantidad, 0);
  },

  // Funcion para agregar producto al carrito
  addToCart: (product) => {
    const cartItems = get().cartItems;
    const existingProduct = cartItems.find(item => item.producto_id === product.producto_id);

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
  removeFromCart: (productId) => {
    const cartItems = get().cartItems;
    set({
      cartItems: cartItems.filter(item => item.producto_id !== productId),
    });
  },

  isInCart: (productId) => {
    const cartItems = get().cartItems;
    return cartItems.some(item => item.producto_id === productId);
  },
}));

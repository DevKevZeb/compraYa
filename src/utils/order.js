// Mirrors the shipping cost charged by the create_order database function.
export const SHIPPING_COST = 20;

const roundCurrency = (value) => Math.round(value * 100) / 100;

export const calculateSubtotal = (items) =>
  roundCurrency(items.reduce((total, item) => total + item.precio * item.cantidad, 0));

export const calculateOrderTotals = (items) => {
  const subtotal = calculateSubtotal(items);
  const shipping = items.length > 0 ? SHIPPING_COST : 0;
  return { subtotal, shipping, total: roundCurrency(subtotal + shipping) };
};

// Payload for the create_order RPC: prices are always resolved server-side.
export const toOrderItems = (items) =>
  items.map(({ producto_id, cantidad }) => ({ producto_id, cantidad }));

export const formatCurrency = (value) => `Bs ${Number(value).toFixed(2)}`;

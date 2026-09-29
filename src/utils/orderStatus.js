// Customer-facing order status derived from the `estado` column.

export const ORDER_STEPS = [
  { key: 'placed', label: 'Order placed', icon: 'receipt-text-check-outline' },
  { key: 'preparing', label: 'Preparing', icon: 'package-variant-closed' },
  { key: 'on_the_way', label: 'On the way', icon: 'truck-fast-outline' },
  { key: 'delivered', label: 'Delivered', icon: 'package-variant-closed-check' },
];

const STATUSES = {
  pendiente: { label: 'On the way', tone: 'warning', step: 2, active: true },
  en_camino: { label: 'On the way', tone: 'warning', step: 2, active: true },
  entregado: { label: 'Delivered', tone: 'success', step: 3, active: false },
  cancelado: { label: 'Cancelled', tone: 'error', step: 0, active: false, cancelled: true },
};

export const getOrderStatus = (estado) =>
  STATUSES[estado] ?? { label: 'Processing', tone: 'neutral', step: 0, active: true };

export const isActiveOrder = (estado) => getOrderStatus(estado).active;

// Timeline steps marked done / current / upcoming. A delivered order has every
// step done; a cancelled order stops after "Order placed".
export const getOrderTimeline = (estado) => {
  const status = getOrderStatus(estado);
  return ORDER_STEPS.map((step, index) => {
    let state = 'upcoming';
    if (index < status.step || (!status.active && !status.cancelled)) state = 'done';
    else if (index === status.step) state = status.cancelled ? 'done' : 'current';
    return { ...step, state };
  });
};

export const formatOrderDate = (date) =>
  new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });

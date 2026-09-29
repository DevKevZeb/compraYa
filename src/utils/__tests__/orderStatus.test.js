import { getOrderStatus, getOrderTimeline, isActiveOrder } from '../orderStatus';

const states = (estado) => getOrderTimeline(estado).map((step) => step.state);

describe('order status', () => {
  it('maps database states to customer-facing labels', () => {
    expect(getOrderStatus('pendiente')).toMatchObject({ label: 'On the way', tone: 'warning' });
    expect(getOrderStatus('entregado')).toMatchObject({ label: 'Delivered', tone: 'success' });
    expect(getOrderStatus('cancelado')).toMatchObject({ label: 'Cancelled', tone: 'error' });
    expect(getOrderStatus('unknown').label).toBe('Processing');
  });

  it('knows which orders are still active', () => {
    expect(isActiveOrder('pendiente')).toBe(true);
    expect(isActiveOrder('en_camino')).toBe(true);
    expect(isActiveOrder('entregado')).toBe(false);
    expect(isActiveOrder('cancelado')).toBe(false);
  });

  it('builds the timeline for each state', () => {
    expect(states('pendiente')).toEqual(['done', 'done', 'current', 'upcoming']);
    expect(states('entregado')).toEqual(['done', 'done', 'done', 'done']);
    expect(states('cancelado')).toEqual(['done', 'upcoming', 'upcoming', 'upcoming']);
  });
});

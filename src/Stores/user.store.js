import { create } from 'zustand';
import { supabase } from '../../lib/initSupaBase';

export const useUserStore = create((set, get) => ({
  // Supabase auth session; the navigation tree is derived from it.
  session: null,
  authReady: false,
  // True while the user is setting a new password from a reset link.
  passwordRecovery: false,
  setPasswordRecovery: (passwordRecovery) => set({ passwordRecovery }),
  user: null,
  setUser: (userData) => set(() => ({ user: userData })),
  clearUser: () => set(() => ({ user: null })),
  handleSession: (session) => {
    set({ session, authReady: true });
    if (session) {
      // Defer Supabase calls out of the auth callback to avoid deadlocks.
      setTimeout(() => get().loadProfile(session.user), 0);
    } else {
      set({ user: null, orders: [], orderHistory: [] });
    }
  },
  loadProfile: async (authUser) => {
    const { data, error } = await supabase
      .from('usuarios')
      .select('usuario_id, nombre_usuario')
      .eq('usuario_id', authUser.id)
      .maybeSingle();

    if (error) {
      console.error('Error loading profile:', error.message || error);
    }

    set({
      user: {
        userId: authUser.id,
        email: authUser.email,
        nombre_usuario: data?.nombre_usuario ?? '',
      },
    });
  },
  orders: [],
  orderHistory: [],
  setOrders: (orders) => set(() => ({ orders })),
  setOrderHistory: (orderHistory) => set(() => ({ orderHistory })),
  fetchUserOrders: () => get().fetchOrders(['pendiente', 'en_camino'], 'orders'),
  fetchOrderHistory: () => get().fetchOrders(['entregado', 'cancelado'], 'orderHistory'),
  fetchOrders: async (statuses, key) => {
    const userId = get().user?.userId;
    if (!userId) {
      return;
    }

    const { data, error } = await supabase
      .from('ordenes')
      .select('*, items_orden (item_orden_id, nombre_producto, cantidad, subtotal)')
      .eq('usuario_id', userId)
      .in('estado', statuses)
      .order('fecha', { ascending: false });

    if (error) {
      console.error('Error fetching orders:', error.message || error);
      return;
    }

    set({ [key]: data });
  },
  // Marks an order as delivered once the customer confirms receipt.
  updateOrderStatus: async (orderId, estado = 'entregado') => {
    const { error } = await supabase.from('ordenes').update({ estado }).eq('orden_id', orderId);

    if (error) {
      return { error };
    }

    await Promise.all([get().fetchUserOrders(), get().fetchOrderHistory()]);
    return {};
  },
}));

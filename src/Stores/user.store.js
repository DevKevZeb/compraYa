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
  fetchUserOrders: async () => {
    const userId = useUserStore.getState().user?.userId;

    if (!userId) {
      console.error('User not logged in');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('ordenes')
        .select('*')
        .eq('usuario_id', userId)
        .eq('estado', 'pendiente');

      if (error) {
        console.error('Error fetching orders:', error.message || error);
      } else {
        set({ orders: data });
      }
    } catch (error) {
      console.error('Error fetching orders:', error.message || error);
    }
  },
  fetchOrderHistory: async () => {
    const userId = useUserStore.getState().user?.userId;

    if (!userId) {
      console.error('User not logged in');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('ordenes')
        .select('*')
        .eq('usuario_id', userId)
        .eq('estado', 'entregado');

      if (error) {
        console.error('Error fetching order history:', error.message || error);
      } else {
        set({ orderHistory: data });
      }
    } catch (error) {
      console.error('Error fetching order history:', error.message || error);
    }
  },
  updateOrderStatus: async (orderId) => {
    try {
      const { error } = await supabase
        .from('ordenes')
        .update({ estado: 'entregado' })
        .eq('orden_id', orderId);

      if (error) {
        console.error('Error updating order status:', error.message || error);
      } else {
        // Fetch updated orders and order history
        useUserStore.getState().fetchUserOrders();
        useUserStore.getState().fetchOrderHistory();
      }
    } catch (error) {
      console.error('Error updating order status:', error.message || error);
    }
  },
}));

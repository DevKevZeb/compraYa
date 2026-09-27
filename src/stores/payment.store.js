import { create } from 'zustand';
import { supabase } from '../lib/supabase';

// Flattens a metodos_pago row with its (one-to-one) tarjetas_pago record.
const toCard = ({ tarjetas_pago: card, ...method }) => {
  const details = Array.isArray(card) ? card[0] : card;
  return {
    metodo_pago_id: method.metodo_pago_id,
    activo: method.activo,
    last4: details?.last4 ?? '',
    marca: details?.marca ?? 'unknown',
    fecha_expiracion: details?.fecha_expiracion ?? '',
  };
};

export const usePaymentStore = create((set) => ({
  debitCards: [],
  loading: false,
  error: null,
  isEditing: false,
  cardDetails: null,
  selectedMethod: null,

  setLoading: (isLoading) => set(() => ({ loading: isLoading })),
  setEditing: (editing) => set(() => ({ isEditing: editing })),
  setCardDetails: (details) => set(() => ({ cardDetails: details })),
  setSelectedMethod: (methodId) => set(() => ({ selectedMethod: methodId })),
  refreshDebitCards: async (userId) => {
    set(() => ({ loading: true }));
    const { data, error } = await supabase
      .from('metodos_pago')
      .select('metodo_pago_id, activo, tarjetas_pago (last4, marca, fecha_expiracion)')
      .eq('usuario_id', userId)
      .eq('tipo_metodo', 'card')
      .order('creado_en', { ascending: true });

    if (error) {
      console.error('Error fetching cards:', error.message || error);
      set(() => ({ error, loading: false }));
      return;
    }

    set(() => ({ debitCards: data.map(toCard), loading: false, error: null }));
  },
}));

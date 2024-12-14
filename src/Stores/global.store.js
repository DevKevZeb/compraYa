import { create } from 'zustand';
import { supabase } from '../../lib/initSupaBase';

export const useCategory = create((set) => ({
	categorys: [],
	setData: (newData) => set(() => ({ categorys: newData })),
}));

export const useProduct = create((set) => ({
	//stores
	allProducts: [],
	productsCategory: [],
	productAtribute: [],
	productSearchBar: [],
	noProductsFound: false,
	//funciones para actualizar los stores
	setAllProducts: (newData) => set(() => ({ allProducts: newData })),
	setDataProductsCategory: (newData) =>
		set(() => ({ productsCategory: newData })),
	setDataAtributeProduct: (newData) =>
		set(() => ({ productAtribute: newData })),
	setDataProductsSearch: (newData) =>
		set(() => ({ productSearchBar: newData })),
	setNoProductsFound: (flag) => set(() => ({ noProductsFound: flag })),
	//funciones para resetear stores
	resetProductSearch: () => set(() => ({ productSearchBar: [] })),
	resetProductCategory: () => set(() => ({ productsCategory: [] })),
}));

export const useDebitCards = create((set) => ({
	// States for debit cards
	debitCards: [],
	loading: false,
	error: null,
	isEditing: false,
	cardDetails: null,
	selectedMethod: null,

	// Set debit cards data
	setDebitCards: (newData) =>
		set(() => ({
			debitCards: newData,
			loading: false,
			error: null,
		})),
	// Add a new debit card
	addDebitCard: (newCard) =>
		set((state) => ({
			debitCards: [...state.debitCards, newCard],
		})),
	// Remove a debit card
	removeDebitCard: (cardId) =>
		set((state) => ({
			debitCards: state.debitCards.filter(
				(card) => card.metodo_pago_id !== cardId
			),
		})),
	// Set loading state
	setLoading: (isLoading) => set(() => ({ loading: isLoading })),
	// Set error state
	setError: (error) => set(() => ({ error })),
	// Reset debit cards
	resetDebitCards: () =>
		set(() => ({
			debitCards: [],
			loading: false,
			error: null,
		})),
	setEditing: (editing) => set(() => ({ isEditing: editing })),
	setCardDetails: (details) => set(() => ({ cardDetails: details })),
	setSelectedMethod: (methodId) => set(() => ({ selectedMethod: methodId })),
	refreshDebitCards: async (userId) => {
		set(() => ({ loading: true }));
		try {
			/**To do: Agregar sesison de usarios */
			// const userId = supabase.auth.user()?.id;
			//  const userId = '32';
			const { data: debitCards, error } = await supabase
				.from('metodos_pago')
				.select(
					`
          metodo_pago_id,
          tipo_metodo,
          activo,
          tarjetas_pago (
            last3,
            marca,
            fecha_expiracion
          )
        `
				)
				.eq('usuario_id', userId)
				.eq('tipo_metodo', 'card');

			if (error) {
				set(() => ({ error }));
				console.error('Error fetching debit cards:', error);
			} else {
				set(() => ({ debitCards, loading: false, error: null }));
			}
		} catch (error) {
			set(() => ({ error, loading: false }));
			console.error('Error refreshing debit cards:', error);
		}
	},
}));

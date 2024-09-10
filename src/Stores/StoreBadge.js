import { create } from 'zustand';

export const useBadgeStore = create((set) => ({
	badge: 0,
	incrementBadge: () => set((state) => ({ badge: state.badge + 1 })),
	decrementBadge: () => set((state) => ({ badge: state.badge - 1 })),
}));

export const useCategory = create((set) => ({
	categorys: [],
	setData: (newData) => set(() => ({ categorys: newData })),
}));
export const useProduct = create((set) => ({
	//estados
	productsCategory: [],
	productAtribute: [],
	productSearchBar: [],
	//funciones para actualizar estados
	setDataProductsCategory: (newData) =>
		set(() => ({ productsCategory: newData })),
	setDataAtributeProduct: (newData) =>
		set(() => ({ productAtribute: newData })),
	setDataProductsSearch: (newData) =>
		set(() => ({ productSearchBar: newData })),
	//funciones para resetear estados
	resetProductSearch: () => set(() => ({ productSearchBar: [] })),
	resetProductCategory: () => set(() => ({ productsCategory: [] })),
}));

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
	//stores
	productsCategory: [],
	productAtribute: [],
	productSearchBar: [],
	productSelected: [],
	//funcion para anadir un producto Seleccionado
	setAddProduct: (newProduct) =>
		set(() => ({ productSelected: [...state.productSelected, newProduct] })),
	//funciones para actualizar los stores
	setDataProductsCategory: (newData) =>
		set(() => ({ productsCategory: newData })),
	setDataAtributeProduct: (newData) =>
		set(() => ({ productAtribute: newData })),
	setDataProductsSearch: (newData) =>
		set(() => ({ productSearchBar: newData })),
	//funciones para resetear stores
	resetProductSearch: () => set(() => ({ productSearchBar: [] })),
	resetProductCategory: () => set(() => ({ productsCategory: [] })),
}));

import { create } from 'zustand';

export const useCategory = create((set) => ({
	categorys: [],
	setData: (newData) => set(() => ({ categorys: newData })),
}));
export const useProduct = create((set) => ({
	//stores
	productsCategory: [],
	productAtribute: [],
	productSearchBar: [],
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

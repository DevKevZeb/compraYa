import { create } from 'zustand';

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

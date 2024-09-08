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
	products: [],
	setDataProducts: (newData) => set(() => ({ products: newData })),
}));
export const useProductAtributeID = create((set) => ({
	productAtribute: [],
	setDataAtributeProduct: (newData) =>
		set(() => ({ productAtribute: newData })),
}));

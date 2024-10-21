import { create } from 'zustand';

export const useBadgeStore = create((set) => ({
	badge: 0,
	incrementBadge: () => set((state) => ({ badge: state.badge + 1 })),
	decrementBadge: () => set((state) => ({ badge: state.badge - 1 })),
	updateBadge: (num) => {
		console.log('en badge storage:', num);
		set((state) => ({ badge:num-1}));
	},
}));
export const useDialog = create((set) => ({
	isVisible: false,
	showDialog: () => set((state) => ({ isVisible: (state.isVisible = true) })),
	hideDialog: () => set((state) => ({ isVisible: (state.isVisible = false) })),
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
		set((state) => {
		  // Verifica si el producto ya está en la lista usando `some()`
		  const productExists = state.productSelected.some(
			(product) => product.producto_id === newProduct.producto_id
		  );
		  
		  // Si el producto no existe, lo agregamos
		  if (!productExists) {
			return {
			  productSelected: [...state.productSelected, newProduct],
			};
		  }
		  
		  // Si ya existe, retornamos el estado sin cambios
		  return state;
		}),
	  
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
	removeProductSelected: (nameProduct) =>
		set((state) => ({
			productSelected: state.productSelected.filter(
				(product) => product['nombre_producto'] !== nameProduct
			),
		})),
	removeCheckProduct: () =>
		set((state) => ({
			productSelected: state.productSelected.filter(
				(product) => !product['itemCheked']
			),
		})),
	updateQuantityProduct: (id, quantityProduct) =>
		set((state) => ({
			productSelected: state.productSelected.map((product) =>
				product['producto_id'] === id
					? { ...product, cantidad: quantityProduct }
					: product
			),
		})),
	updateCheckedProduct: (id) =>
		set((state) => ({
			productSelected: state.productSelected.map((product) =>
				product['producto_id'] === id
					? { ...product, itemCheked: !product['itemCheked'] }
					: product
			),
		})),
}));

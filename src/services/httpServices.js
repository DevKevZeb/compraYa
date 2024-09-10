import { supabase } from '../../lib/initSupaBase';
import {
	useCategory,
	useProduct,
} from '../Stores/StoreBadge';
export const getNameCategory = async () => {
	try {
		const { data: categorías, error } = await supabase
			.from('categorías')
			.select('*');
		if (error) {
			console.error('Error al obtener los datos:', error);
			return { error };
		}
		useCategory.getState().setData(categorías);
	} catch (error) {
		console.error('Error en la solicitud:', error);
		return { error };
	}
};
export const getProductsBySearch = async (valueSearch) => {
	try {
		const { data: productos, error } = await supabase
			.from('productos')
			.select('*')
			.ilike('nombre_producto', `%${valueSearch}%`);
		if (error) {
			console.error('Error al obtener los datos:', error);
			return { error };
		}
		useProduct.getState().setDataProductsSearch(productos);
	} catch (error) {
		console.error('Error en la solicitud:', error);
		return { error };
	}
};
export const getProductId = async (categoryId) => {
	try {
		const { data, error } = await supabase
			.from('productos')
			.select('*')
			.eq('categoria_id', categoryId);
		if (error) {
			console.error('Error al obtener los datos:', error);
			return { error };
		}
		useProduct.getState().setDataProductsCategory(data);
	} catch (error) {
		console.error('Error en la solicitud:', error);
		return { error };
	}
};
export const getProductAtributeId = async () => {
	try {
		const { data: productos, error } = await supabase.from('productos').select(`
    		nombre_producto	,
			url_imagen ,
    		atributos_producto (
     		 nombre_atributo,
			 valor_atributo
    		)
 		 `);
		if (error) {
			console.error('Error al obtener los datos:', error);
			return { error };
		}
		useProduct.getState().setDataAtributeProduct(productos);
	} catch (error) {
		console.error('Error en la solicitud:', error);
		return { error };
	}
};

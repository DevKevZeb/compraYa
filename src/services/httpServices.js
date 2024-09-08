import { supabase } from '../../lib/initSupaBase';
import {
	useCategory,
	useProduct,
	useProductAtributeID,
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
		useProduct.getState().setDataProducts(data);
	} catch (error) {
		console.error('Error en la solicitud:', error);
		return { error };
	}
};
export const getProductAtributeId = async () => {
	try {
		const { data:productos, error } = await supabase.from('productos').select(`
			producto_id,
			nombre_producto,
			atributos_producto (
			  producto_id
			)
		  `);
		if (error) {
			console.error('Error al obtener los datos:', error);
			return { error };
		}
		useProductAtributeID.getState().setDataAtributeProduct(productos);
	} catch (error) {
		console.error('Error en la solicitud:', error);
		return { error };
	}
};

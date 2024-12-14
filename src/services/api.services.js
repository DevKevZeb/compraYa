import { supabase } from '../../lib/initSupaBase';
import { useCategory, useProduct, useDebitCards } from '../Stores/global.store';

export const getNameCategory = async () => {
	try {
		const { data: categorías, error } = await supabase
			.from('categorías')
			.select('*')
			.order('categoria_id', { ascending: true });
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
		if (productos.length === 0) {
			useProduct.getState().setNoProductsFound(true);
		} else {
			useProduct.getState().setNoProductsFound(false);
			useProduct.getState().setDataProductsSearch(productos);
		}
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
			producto_id,
    		nombre_producto,
			url_imagen,
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

export const getPopularProducts = async () => {
	try {
		const { data: productos, error } = await supabase
			.from('productos')
			.select('*')
			.order('popularidad', { ascending: false })
			.limit(10);
		if (error) {
			console.error('Error al obtener los datos:', error);
			return { error };
		}
		useProduct.getState().setDataProductsCategory(productos);
	} catch (error) {
		console.error('Error en la solicitud:', error);
		return { error };
	}
};

export const getAllProducts = async () => {
	try {
		const { data: productos, error } = await supabase
			.from('productos')
			.select('*')
			.order('producto_id', { ascending: false });
		if (error) {
			console.error('Error al obtener los datos:', error);
			return { error };
		}
		useProduct.getState().setDataProductsCategory(productos);
	} catch (error) {
		console.error('Error en la solicitud:', error);
		return { error };
	}
};
export const getProducts = async () => {
	try {
		let { data: productos, error } = await supabase
			.from('productos')
			.select('*')
			.order('producto_id', { ascending: false });
		if (error) {
			console.error('Error al obtener los datos:', error);
			return { error };
		}
		useProduct.getState().setAllProducts(productos);
	} catch (error) {
		console.error('Error en la solicitud:', error);
		return { error };
	}
};

export const getDebitCardsByUser = async (userId) => {
	try {
		useDebitCards.getState().setLoading(true);

		const { data: debitCards, error } = await supabase
			.from('metodos_pago')
			.select(
				`
                metodo_pago_id,
    		          tipo_metodo,
			          activo,
    		          tarjetas_pago (
     		           last3,
			           fecha_expiracion
    		      )
            `
			)
			.eq('usuario_id', userId)
			.eq('tipo_metodo', 'card');
		if (error) {
			console.error('Error al obtener las tarjetas de débito:', error);
			// Estado de error.
			useDebitCards.getState().setError(error);
			return { error };
		}

		if (debitCards.length === 0) {
			console.warn('No se encontraron tarjetas de débito para este usuario.');
		}

		useDebitCards.getState().setDebitCards(debitCards);

		return { data: debitCards };
	} catch (error) {
		console.error('Error en la solicitud:', error);
		useDebitCards.getState().setError(error);
		return { error };
	}
};

export const saveDebitCard = async (data, isEditing, cardDetails, userData) => {
	const { userId } = userData;
	try {
		if (!userId) {
			throw new Error('No user is authenticated.');
		}

		if (isEditing) {
			// Update existing card
			const { error } = await supabase
				.from('tarjetas_pago')
				.update({
					last3: data.cardNumber,
					fecha_expiracion: data.expiryDate,
				})
				.eq('metodo_pago_id', cardDetails.metodo_pago_id);

			if (error) {
				console.error('Error updating card:', error);
				return { success: false, error };
			}

			return { success: true, message: 'Tarjeta actualizada con éxito!' };
		} else {
			// Add new card
			const { data: metodoPago, error: metodoError } = await supabase
				.from('metodos_pago')
				.insert({
					tipo_metodo: 'card',
					usuario_id: userId,
					activo: true,
				})
				.select('metodo_pago_id')
				.single();

			if (metodoError) {
				console.error('Error adding payment method:', metodoError);
				return { success: false, error: metodoError };
			}

			const { error } = await supabase.from('tarjetas_pago').insert({
				metodo_pago_id: metodoPago.metodo_pago_id,
				last3: data.cardNumber,
				fecha_expiracion: data.expiryDate,
			});
			if (error) {
				console.error('Error saving card details:', error);
				return { success: false, error };
			}
			return { success: true, message: 'Tarjeta guardada con éxito!' };
		}
	} catch (error) {
		console.error('Error handling card submission:', error);
		return { success: false, error };
	}
};

export const addDebitCard = async (cardData) => {
	try {
		useDebitCards.getState().setLoading(true);

		const { data, error } = await supabase
			.from('metodos_pago')
			.insert(cardData)
			.select();

		if (error) {
			console.error('Error al agregar la tarjeta: ', error);
			useDebitCards.getState().setError(error);
			return { error };
		}

		useDebitCards.getState().addDebitCard(data[0]);

		return { data: data[0] };
	} catch (error) {
		console.error('Error en la solicitud: ', error);
		useDebitCards.getState().setError(error);
		return { error };
	}
};

export const deleteDebitCard = async (cardId) => {
	try {
		const { error } = await supabase
			.from('metodos_pago')
			.delete()
			.eq('metodo_pago_id', cardId);

		if (error) {
			console.error('Error deleting card:', error);
			return { success: false, error };
		}

		return { success: true, message: 'Tarjeta eliminada con éxito!' };
	} catch (error) {
		console.error('Error handling card deletion:', error);
		return { success: false, error };
	}
};

export const removeDebitCard = async (cardId) => {
	try {
		// Set loading state
		useDebitCards.getState().setLoading(true);

		const { error } = await supabase
			.from('metodos_pago')
			.delete()
			.eq('metodo_pago_id', cardId);

		if (error) {
			console.error('Error al eliminar la tarjeta:', error);
			useDebitCards.getState().setError(error);
			return { error };
		}

		// Remove card from local state
		useDebitCards.getState().removeDebitCard(cardId);

		return { success: true };
	} catch (error) {
		console.error('Error en la solicitud:', error);
		useDebitCards.getState().setError(error);
		return { error };
	}
};

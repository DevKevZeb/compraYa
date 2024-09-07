import { supabase } from '../../lib/initSupaBase';

export const getNameCategory = async () => {
	try {
		const { data: categorías, error } = await supabase
			.from('categorías')
			.select('nombre_categoria');
		if (error) {
			console.error('Error al obtener los datos:', error);
			return { error };
		}
		return { categorías };
	} catch (error) {
		console.error('Error en la solicitud:', error);
		return { error };
	}
};

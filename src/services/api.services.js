import { supabase } from '../../lib/initSupaBase';
import { useCategory, useProduct } from '../Stores/global.store';

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

// Stores a card as a payment method. Only the brand, last four digits and expiry
// date are persisted; editing a card can only change its expiry date.
export const saveDebitCard = async ({ userId, card, metodoPagoId }) => {
  if (metodoPagoId) {
    const { error } = await supabase
      .from('tarjetas_pago')
      .update({ fecha_expiracion: card.fecha_expiracion })
      .eq('metodo_pago_id', metodoPagoId);

    return error
      ? { success: false, error }
      : { success: true, message: 'Tarjeta actualizada con éxito.' };
  }

  const { data: metodoPago, error: metodoError } = await supabase
    .from('metodos_pago')
    .insert({ tipo_metodo: 'card', usuario_id: userId, activo: true })
    .select('metodo_pago_id')
    .single();

  if (metodoError) {
    return { success: false, error: metodoError };
  }

  const { error } = await supabase.from('tarjetas_pago').insert({
    metodo_pago_id: metodoPago.metodo_pago_id,
    last4: card.last4,
    marca: card.marca,
    fecha_expiracion: card.fecha_expiracion,
  });

  if (error) {
    // Do not leave an empty payment method behind.
    await supabase.from('metodos_pago').delete().eq('metodo_pago_id', metodoPago.metodo_pago_id);
    return { success: false, error };
  }

  return { success: true, message: 'Tarjeta guardada con éxito.' };
};

export const deleteDebitCard = async (metodoPagoId) => {
  const { error } = await supabase.from('metodos_pago').delete().eq('metodo_pago_id', metodoPagoId);

  return error
    ? { success: false, error }
    : { success: true, message: 'Tarjeta eliminada con éxito.' };
};

// Each user has a single QR payment method, created the first time they pay by QR.
export const getOrCreateQrPaymentMethod = async (userId) => {
  const { data: existing, error: fetchError } = await supabase
    .from('metodos_pago')
    .select('metodo_pago_id')
    .eq('usuario_id', userId)
    .eq('tipo_metodo', 'qr')
    .limit(1)
    .maybeSingle();

  if (fetchError) {
    return { error: fetchError };
  }
  if (existing) {
    return { metodoPagoId: existing.metodo_pago_id };
  }

  const { data, error } = await supabase
    .from('metodos_pago')
    .insert({ tipo_metodo: 'qr', usuario_id: userId, activo: true })
    .select('metodo_pago_id')
    .single();

  return error ? { error } : { metodoPagoId: data.metodo_pago_id };
};

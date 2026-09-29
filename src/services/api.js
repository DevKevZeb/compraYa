import { supabase } from '../lib/supabase';

const PRODUCT_FIELDS = `
  producto_id,
  categoria_id,
  nombre_producto,
  descripcion,
  precio,
  stock,
  popularidad,
  url_imagen,
  imagenes,
  atributos_producto (nombre_atributo, valor_atributo)
`;

// Orders with their line items (and product thumbnails) and payment method.
export const ORDER_FIELDS = `
  *,
  items_orden (item_orden_id, nombre_producto, cantidad, precio_unitario, subtotal, productos (url_imagen)),
  metodos_pago (tipo_metodo, tarjetas_pago (last4, marca))
`;

export const getOrder = (orderId) =>
  supabase.from('ordenes').select(ORDER_FIELDS).eq('orden_id', orderId).single();

export const getCategories = () =>
  supabase
    .from('categorias')
    .select('categoria_id, nombre_categoria')
    .order('categoria_id', { ascending: true });

// Most popular first; optionally filtered by category and/or name.
export const getProducts = ({ categoryId = null, search = '' } = {}) => {
  let query = supabase
    .from('productos')
    .select(PRODUCT_FIELDS)
    .order('popularidad', { ascending: false });

  if (categoryId) {
    query = query.eq('categoria_id', categoryId);
  }
  if (search) {
    query = query.ilike('nombre_producto', `%${search}%`);
  }
  return query;
};

// Favorites, newest first, with the full product for rendering.
export const getFavorites = () =>
  supabase
    .from('favoritos')
    .select(`producto_id, creado_en, productos (${PRODUCT_FIELDS})`)
    .order('creado_en', { ascending: false });

export const addFavorite = (productId) =>
  supabase.from('favoritos').insert({ producto_id: productId });

export const removeFavorite = (productId) =>
  supabase.from('favoritos').delete().eq('producto_id', productId);

// Stores a card as a payment method. Only the brand, last four digits and expiry
// date are persisted; editing a card can only change its expiry date.
export const saveDebitCard = async ({ userId, card, metodoPagoId }) => {
  if (metodoPagoId) {
    const { error } = await supabase
      .from('tarjetas_pago')
      .update({ fecha_expiracion: card.fecha_expiracion })
      .eq('metodo_pago_id', metodoPagoId);

    return error ? { success: false, error } : { success: true, message: 'Card updated' };
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

  return { success: true, message: 'Card saved' };
};

export const deleteDebitCard = async (metodoPagoId) => {
  const { error } = await supabase.from('metodos_pago').delete().eq('metodo_pago_id', metodoPagoId);

  return error ? { success: false, error } : { success: true, message: 'Card removed' };
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

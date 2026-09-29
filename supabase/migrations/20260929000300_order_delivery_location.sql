-- Orders keep the exact delivery point picked on the map, and create_order only
-- accepts points inside the delivery area.

alter table public.ordenes
  add column latitud double precision check (latitud between -90 and 90),
  add column longitud double precision check (longitud between -180 and 180);

-- Great-circle distance between two points in kilometers (haversine).
create function public.distance_km(
  lat1 double precision,
  lng1 double precision,
  lat2 double precision,
  lng2 double precision
)
returns double precision
language sql
immutable
set search_path = ''
as $$
  select 2 * 6371 * asin(sqrt(
    power(sin(radians(lat2 - lat1) / 2), 2)
    + cos(radians(lat1)) * cos(radians(lat2)) * power(sin(radians(lng2 - lng1) / 2), 2)
  ));
$$;

drop function public.create_order(text, bigint, jsonb);

create function public.create_order(
  p_direccion_envio text,
  p_latitud double precision,
  p_longitud double precision,
  p_metodo_pago bigint,
  p_items jsonb
)
returns public.ordenes
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_user_id uuid := auth.uid();
  v_costo_envio constant numeric(10, 2) := 20;
  v_subtotal numeric(10, 2);
  v_orden public.ordenes;
  v_missing bigint;
  -- Delivery area: Cochabamba, within this radius of Plaza 14 de Septiembre.
  -- Keep in sync with DELIVERY_AREA in src/config/store.js.
  v_centro_lat constant double precision := -17.3935;
  v_centro_lng constant double precision := -66.1570;
  v_radio_km constant double precision := 10;
begin
  if v_user_id is null then
    raise exception 'Not authenticated' using errcode = '28000';
  end if;

  if coalesce(trim(p_direccion_envio), '') = '' then
    raise exception 'Shipping address is required' using errcode = '22023';
  end if;

  if p_latitud is null or p_longitud is null then
    raise exception 'Delivery location is required' using errcode = '22023';
  end if;

  if public.distance_km(p_latitud, p_longitud, v_centro_lat, v_centro_lng) > v_radio_km then
    raise exception 'The delivery location is outside our delivery area' using errcode = '22023';
  end if;

  if p_items is null or jsonb_typeof(p_items) <> 'array' or jsonb_array_length(p_items) = 0 then
    raise exception 'Order must contain at least one item' using errcode = '22023';
  end if;

  if p_metodo_pago is not null and not exists (
    select 1 from public.metodos_pago
    where metodo_pago_id = p_metodo_pago and usuario_id = v_user_id
  ) then
    raise exception 'Invalid payment method' using errcode = '22023';
  end if;

  -- Normalize the requested items (merging duplicated products).
  drop table if exists pg_temp.requested_items;
  create temporary table requested_items on commit drop as
  select (item ->> 'producto_id')::bigint as producto_id,
         sum((item ->> 'cantidad')::integer) as cantidad
  from jsonb_array_elements(p_items) as item
  group by 1;

  if exists (select 1 from pg_temp.requested_items where cantidad is null or cantidad <= 0) then
    raise exception 'Item quantities must be positive' using errcode = '22023';
  end if;

  select r.producto_id into v_missing
  from pg_temp.requested_items r
  left join public.productos p on p.producto_id = r.producto_id
  where p.producto_id is null
  limit 1;

  if v_missing is not null then
    raise exception 'Product % does not exist', v_missing using errcode = '22023';
  end if;

  -- Lock the products and check stock before touching anything.
  perform 1 from public.productos p
  join pg_temp.requested_items r using (producto_id)
  for update of p;

  select r.producto_id into v_missing
  from pg_temp.requested_items r
  join public.productos p using (producto_id)
  where p.stock < r.cantidad
  limit 1;

  if v_missing is not null then
    raise exception 'Insufficient stock for product %', v_missing using errcode = '22023';
  end if;

  select sum(p.precio * r.cantidad) into v_subtotal
  from pg_temp.requested_items r
  join public.productos p using (producto_id);

  insert into public.ordenes (
    usuario_id, direccion_envio, latitud, longitud, metodo_pago, monto_total, costo_envio,
    numero_seguimiento
  )
  values (
    v_user_id,
    trim(p_direccion_envio),
    p_latitud,
    p_longitud,
    p_metodo_pago,
    v_subtotal + v_costo_envio,
    v_costo_envio,
    'CY-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 10))
  )
  returning * into v_orden;

  insert into public.items_orden (orden_id, producto_id, nombre_producto, cantidad, precio_unitario, subtotal)
  select v_orden.orden_id, p.producto_id, p.nombre_producto, r.cantidad, p.precio, p.precio * r.cantidad
  from pg_temp.requested_items r
  join public.productos p using (producto_id);

  update public.productos p
  set stock = p.stock - r.cantidad
  from pg_temp.requested_items r
  where p.producto_id = r.producto_id;

  return v_orden;
end;
$$;

revoke execute on function public.create_order(text, double precision, double precision, bigint, jsonb) from public, anon;
grant execute on function public.create_order(text, double precision, double precision, bigint, jsonb) to authenticated;

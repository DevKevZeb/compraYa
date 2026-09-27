-- Initial schema for CompraYa.
-- Domain names are kept in Spanish to match the app's data layer.

-- Catalog ---------------------------------------------------------------

create table public.categorias (
  categoria_id bigint generated always as identity primary key,
  nombre_categoria text not null unique
);

create table public.productos (
  producto_id bigint generated always as identity primary key,
  categoria_id bigint not null references public.categorias (categoria_id),
  nombre_producto text not null,
  descripcion text,
  precio numeric(10, 2) not null check (precio >= 0),
  stock integer not null default 0 check (stock >= 0),
  popularidad smallint not null default 0 check (popularidad between 0 and 100),
  url_imagen text,
  creado_en timestamptz not null default now()
);

create index productos_categoria_id_idx on public.productos (categoria_id);
create index productos_popularidad_idx on public.productos (popularidad desc);

create table public.atributos_producto (
  atributo_id bigint generated always as identity primary key,
  producto_id bigint not null references public.productos (producto_id) on delete cascade,
  nombre_atributo text not null,
  valor_atributo text not null
);

create index atributos_producto_producto_id_idx on public.atributos_producto (producto_id);

-- Users -----------------------------------------------------------------

-- Profile data only. Credentials live exclusively in auth.users.
create table public.usuarios (
  usuario_id uuid primary key references auth.users (id) on delete cascade,
  nombre_usuario text not null,
  correo_electronico text not null unique,
  creado_en timestamptz not null default now()
);

-- Payment methods -------------------------------------------------------

create table public.metodos_pago (
  metodo_pago_id bigint generated always as identity primary key,
  usuario_id uuid not null default auth.uid() references public.usuarios (usuario_id) on delete cascade,
  tipo_metodo text not null check (tipo_metodo in ('card', 'qr')),
  activo boolean not null default true,
  creado_en timestamptz not null default now()
);

create index metodos_pago_usuario_id_idx on public.metodos_pago (usuario_id);

-- Only non-sensitive card data is stored: never the full PAN or CVV.
create table public.tarjetas_pago (
  tarjeta_id bigint generated always as identity primary key,
  metodo_pago_id bigint not null unique references public.metodos_pago (metodo_pago_id) on delete cascade,
  last4 char(4) not null check (last4 ~ '^[0-9]{4}$'),
  marca text not null default 'unknown',
  fecha_expiracion date not null
);

-- Shopping cart ---------------------------------------------------------

create table public.carrito_compras (
  carrito_id bigint generated always as identity primary key,
  usuario_id uuid not null default auth.uid() references public.usuarios (usuario_id) on delete cascade,
  creado_en timestamptz not null default now()
);

create index carrito_compras_usuario_id_idx on public.carrito_compras (usuario_id);

create table public.items_carrito (
  item_carrito_id bigint generated always as identity primary key,
  carrito_id bigint not null references public.carrito_compras (carrito_id) on delete cascade,
  producto_id bigint not null references public.productos (producto_id),
  cantidad integer not null check (cantidad > 0),
  precio_en_el_momento numeric(10, 2) not null check (precio_en_el_momento >= 0),
  subtotal numeric(10, 2) not null check (subtotal >= 0),
  unique (carrito_id, producto_id)
);

-- Orders ----------------------------------------------------------------

create table public.ordenes (
  orden_id bigint generated always as identity primary key,
  usuario_id uuid not null default auth.uid() references public.usuarios (usuario_id) on delete cascade,
  direccion_envio text not null,
  metodo_pago bigint references public.metodos_pago (metodo_pago_id) on delete set null,
  monto_total numeric(10, 2) not null check (monto_total >= 0),
  costo_envio numeric(10, 2) not null default 0 check (costo_envio >= 0),
  estado text not null default 'pendiente'
    check (estado in ('pendiente', 'en_camino', 'entregado', 'cancelado')),
  numero_seguimiento text not null unique,
  fecha timestamptz not null default now()
);

create index ordenes_usuario_id_idx on public.ordenes (usuario_id, estado);

-- Snapshot of each purchased product so order history survives catalog changes.
create table public.items_orden (
  item_orden_id bigint generated always as identity primary key,
  orden_id bigint not null references public.ordenes (orden_id) on delete cascade,
  producto_id bigint references public.productos (producto_id) on delete set null,
  nombre_producto text not null,
  cantidad integer not null check (cantidad > 0),
  precio_unitario numeric(10, 2) not null check (precio_unitario >= 0),
  subtotal numeric(10, 2) not null check (subtotal >= 0)
);

create index items_orden_orden_id_idx on public.items_orden (orden_id);

-- Profile bootstrap -----------------------------------------------------

-- Creates the public profile when someone signs up through Supabase Auth.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.usuarios (usuario_id, nombre_usuario, correo_electronico)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'nombre_usuario', split_part(new.email, '@', 1)),
    new.email
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

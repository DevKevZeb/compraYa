-- Products each customer saved as favorites.
create table public.favoritos (
  usuario_id uuid not null default auth.uid() references public.usuarios (usuario_id) on delete cascade,
  producto_id bigint not null references public.productos (producto_id) on delete cascade,
  creado_en timestamptz not null default now(),
  primary key (usuario_id, producto_id)
);

create index favoritos_producto_id_idx on public.favoritos (producto_id);

alter table public.favoritos enable row level security;

create policy "Users can read their own favorites"
  on public.favoritos for select
  to authenticated
  using ((select auth.uid()) = usuario_id);

create policy "Users can add their own favorites"
  on public.favoritos for insert
  to authenticated
  with check ((select auth.uid()) = usuario_id);

create policy "Users can remove their own favorites"
  on public.favoritos for delete
  to authenticated
  using ((select auth.uid()) = usuario_id);

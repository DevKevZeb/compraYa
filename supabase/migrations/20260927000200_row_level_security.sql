-- Row level security: the anon key is public, so every table must be locked down.

alter table public.categorias enable row level security;
alter table public.productos enable row level security;
alter table public.atributos_producto enable row level security;
alter table public.usuarios enable row level security;
alter table public.metodos_pago enable row level security;
alter table public.tarjetas_pago enable row level security;
alter table public.carrito_compras enable row level security;
alter table public.items_carrito enable row level security;
alter table public.ordenes enable row level security;
alter table public.items_orden enable row level security;

-- Catalog: readable by everyone, writable only through the dashboard/service role.

create policy "Catalog categories are public"
  on public.categorias for select
  to anon, authenticated
  using (true);

create policy "Catalog products are public"
  on public.productos for select
  to anon, authenticated
  using (true);

create policy "Catalog product attributes are public"
  on public.atributos_producto for select
  to anon, authenticated
  using (true);

-- Profiles: inserted by the signup trigger, then owned by the user.

create policy "Users can read their own profile"
  on public.usuarios for select
  to authenticated
  using ((select auth.uid()) = usuario_id);

create policy "Users can update their own profile"
  on public.usuarios for update
  to authenticated
  using ((select auth.uid()) = usuario_id)
  with check ((select auth.uid()) = usuario_id);

-- Payment methods.

create policy "Users manage their own payment methods"
  on public.metodos_pago for all
  to authenticated
  using ((select auth.uid()) = usuario_id)
  with check ((select auth.uid()) = usuario_id);

create policy "Users manage cards of their own payment methods"
  on public.tarjetas_pago for all
  to authenticated
  using (
    exists (
      select 1 from public.metodos_pago mp
      where mp.metodo_pago_id = tarjetas_pago.metodo_pago_id
        and mp.usuario_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.metodos_pago mp
      where mp.metodo_pago_id = tarjetas_pago.metodo_pago_id
        and mp.usuario_id = (select auth.uid())
    )
  );

-- Shopping cart.

create policy "Users manage their own carts"
  on public.carrito_compras for all
  to authenticated
  using ((select auth.uid()) = usuario_id)
  with check ((select auth.uid()) = usuario_id);

create policy "Users manage items of their own carts"
  on public.items_carrito for all
  to authenticated
  using (
    exists (
      select 1 from public.carrito_compras c
      where c.carrito_id = items_carrito.carrito_id
        and c.usuario_id = (select auth.uid())
    )
  )
  with check (
    exists (
      select 1 from public.carrito_compras c
      where c.carrito_id = items_carrito.carrito_id
        and c.usuario_id = (select auth.uid())
    )
  );

-- Orders: created only through the create_order function; users can read
-- them and move their own order forward (e.g. confirm delivery).

create policy "Users can read their own orders"
  on public.ordenes for select
  to authenticated
  using ((select auth.uid()) = usuario_id);

create policy "Users can confirm or cancel their own orders"
  on public.ordenes for update
  to authenticated
  using ((select auth.uid()) = usuario_id)
  with check (
    (select auth.uid()) = usuario_id
    and estado in ('entregado', 'cancelado')
  );

-- Amounts and addresses are immutable from the client: only the status can change.
revoke update on public.ordenes from anon, authenticated;
grant update (estado) on public.ordenes to authenticated;

create policy "Users can read items of their own orders"
  on public.items_orden for select
  to authenticated
  using (
    exists (
      select 1 from public.ordenes o
      where o.orden_id = items_orden.orden_id
        and o.usuario_id = (select auth.uid())
    )
  );

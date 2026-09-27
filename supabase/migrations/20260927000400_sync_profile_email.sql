-- Keeps the profile email in sync once a user confirms an email change.
create function public.handle_user_email_change()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  update public.usuarios
  set correo_electronico = new.email
  where usuario_id = new.id;
  return new;
end;
$$;

create trigger on_auth_user_email_changed
  after update of email on auth.users
  for each row
  when (old.email is distinct from new.email)
  execute function public.handle_user_email_change();

-- The email column is managed by Supabase Auth; clients may only edit the name.
revoke update on public.usuarios from anon, authenticated;
grant update (nombre_usuario) on public.usuarios to authenticated;

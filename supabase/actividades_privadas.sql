-- Ejecutar en Supabase SQL Editor, NO desde la app.
create table if not exists public.actividades_privadas (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references auth.users(id),
  titulo text not null,
  creado_en timestamptz not null default now()
);
alter table public.actividades_privadas enable row level security;
drop policy if exists "usuarios leen sus actividades" on public.actividades_privadas;
create policy "usuarios leen sus actividades" on public.actividades_privadas for select to authenticated using ((select auth.uid()) = user_id);
drop policy if exists "usuarios crean sus actividades" on public.actividades_privadas;
create policy "usuarios crean sus actividades" on public.actividades_privadas for insert to authenticated with check ((select auth.uid()) = user_id);

-- ============================================================
-- OPCIONES PARA ESCOGER
--
-- Antes el cliente escribía en una caja de texto lo que quería, a ciegas.
-- Ahora tú le pones las opciones con foto, link y precio, y ella escoge una.
-- Si ninguna le gusta, puede proponer la suya con su propia foto y link.
--
-- Se corre DESPUÉS de cliente.sql. Se puede correr dos veces.
-- ============================================================

create table if not exists public.selection_options (
  id           uuid primary key default gen_random_uuid(),
  selection_id uuid not null references public.selections(id) on delete cascade,
  title        text not null,
  title_en     text not null default '',
  note         text not null default '',        -- 'llega en 3 semanas', 'el que vimos'
  link         text not null default '',        -- dónde se ve o se compra
  photo_path   text,                            -- vive en el bucket project-files
  price        numeric(10,2),                   -- lo que cuesta ESTA opción
  from_client  boolean not null default false,  -- la propuso el cliente, no Proven
  sort         int not null default 0,
  created_at   timestamptz not null default now()
);
create index if not exists selection_options_idx on public.selection_options (selection_id, sort);

-- cuál opción quedó escogida
alter table public.selections
  add column if not exists chosen_option_id uuid references public.selection_options(id) on delete set null;

alter table public.selection_options enable row level security;

-- ---------- quién ve y toca las opciones ----------
-- La oficina las carga y las edita.
drop policy if exists so_staff on public.selection_options;
create policy so_staff on public.selection_options for all
  using (public.is_staff()) with check (public.is_staff());

-- Finanzas y la obra las ven si ven el proyecto.
drop policy if exists so_team on public.selection_options;
create policy so_team on public.selection_options for select using (
  exists (select 1 from public.selections s
           where s.id = selection_id
             and (public.is_viewer() or (public.has_perm('projects') and public.is_member(s.project_id)))));

-- El cliente ve las de SUS selecciones. No puede escribir directo: usa las funciones.
drop policy if exists so_client on public.selection_options;
create policy so_client on public.selection_options for select using (
  exists (select 1 from public.selections s
           where s.id = selection_id and public.client_of(s.project_id)));

-- ---------- el cliente escoge una de las opciones ----------
create or replace function public.client_pick_option(p_option uuid)
returns void language plpgsql security definer set search_path = public as $$
declare v_sel uuid; v_project uuid; v_title text;
begin
  select o.selection_id into v_sel from public.selection_options o where o.id = p_option;
  if v_sel is null then raise exception 'no_existe'; end if;

  select s.project_id into v_project from public.selections s where s.id = v_sel;
  if not public.client_of(v_project) then raise exception 'no_access'; end if;

  select coalesce(nullif(o.title, ''), '') into v_title from public.selection_options o where o.id = p_option;

  update public.selections
     set chosen_option_id = p_option,
         choice           = v_title,
         status           = case when status = 'ordered' then status else 'chosen' end,
         decided_on       = current_date,
         decided_by       = auth.uid()
   where id = v_sel;
end $$;

-- ---------- el cliente propone la suya ----------
-- Crea una opción marcada como suya y la deja escogida. El precio lo pone
-- Proven después: el cliente no fija plata.
create or replace function public.client_suggest_option(
  p_sel uuid, p_title text, p_link text default '', p_photo text default '')
returns uuid language plpgsql security definer set search_path = public as $$
declare v_project uuid; v_id uuid; v_n int;
begin
  select s.project_id into v_project from public.selections s where s.id = p_sel;
  if v_project is null then raise exception 'no_existe'; end if;
  if not public.client_of(v_project) then raise exception 'no_access'; end if;
  if coalesce(trim(p_title), '') = '' then raise exception 'vacio'; end if;

  -- que no inunde: máximo 10 propuestas suyas por selección
  select count(*) into v_n from public.selection_options
   where selection_id = p_sel and from_client;
  if v_n >= 10 then raise exception 'demasiadas'; end if;

  insert into public.selection_options (selection_id, title, link, photo_path, from_client, sort)
  values (p_sel, left(trim(p_title), 200), left(coalesce(p_link, ''), 500),
          nullif(trim(coalesce(p_photo, '')), ''), true, 900 + v_n)
  returning id into v_id;

  update public.selections
     set chosen_option_id = v_id,
         choice           = left(trim(p_title), 200),
         status           = case when status = 'ordered' then status else 'chosen' end,
         decided_on       = current_date,
         decided_by       = auth.uid()
   where id = p_sel;

  return v_id;
end $$;

-- ============================================================
-- ARCHIVOS: el cliente ahora sube fotos, pero solo a su rincón
-- ============================================================

-- Puede subir SOLO dentro de  <su proyecto>/client/...
drop policy if exists pf_client_ins on storage.objects;
create policy pf_client_ins on storage.objects for insert with check (
  bucket_id = 'project-files'
  and public.is_client()
  and public.client_of(((storage.foldername(name))[1])::uuid)
  and (storage.foldername(name))[2] = 'client');

-- Y puede VER: lo que se le marcó en el chat, más las fotos de las opciones
-- de sus propias selecciones.
drop policy if exists pf_client on storage.objects;
create policy pf_client on storage.objects for select using (
  bucket_id = 'project-files'
  and public.is_client()
  and (
    exists (select 1 from public.messages m
             where m.file_path = name and m.for_client and public.client_of(m.project_id))
    or
    exists (select 1 from public.selection_options o
              join public.selections s on s.id = o.selection_id
             where o.photo_path = name and public.client_of(s.project_id))
  ));

-- La obra y la oficina también tienen que ver esas fotos de opciones.
drop policy if exists pf_opt_team on storage.objects;
create policy pf_opt_team on storage.objects for select using (
  bucket_id = 'project-files'
  and exists (select 1 from public.selection_options o
                join public.selections s on s.id = o.selection_id
               where o.photo_path = name
                 and (public.is_viewer() or (public.has_perm('projects') and public.is_member(s.project_id)))));

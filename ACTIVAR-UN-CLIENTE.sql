-- ============================================================
-- ACTIVAR UN CLIENTE
--
-- ANTES de correr esto, crea su cuenta en el panel de Supabase:
--   Authentication -> Users -> Add user -> Create new user
--   · correo del cliente
--   · una contraseña provisional
--   · MARCA la casilla "Auto Confirm User"
--
-- Después cambia las DOS líneas de abajo y dale Run.
-- ============================================================

-- 1) cambia estos dos valores -------------------------------
--    el correo con el que creaste su cuenta, y el proyecto que va a ver
\set cliente_email '''michele@ejemplo.com'''
\set proyecto      '''Apartment Renovation D37 (Estimate #045)'''
-- ------------------------------------------------------------
-- Si tu editor no acepta \set (el de Supabase a veces no),
-- borra las dos líneas de arriba y reemplaza a mano
-- :cliente_email y :proyecto en el bloque de abajo.

-- 2) marcarlo como cliente aprobado
update public.profiles
   set is_client = true,
       status    = 'approved',
       perms     = '{"projects":false,"clock":false,"shifts":false,"docs":false,"pay":false}'::jsonb
 where email = :cliente_email;

-- 3) darle acceso SOLO a su proyecto
insert into public.project_clients (project_id, client_id)
select p.id, pr.id
  from public.projects p, public.profiles pr
 where p.name = :proyecto
   and pr.email = :cliente_email
on conflict do nothing;

-- 4) comprobar que quedó bien
select pr.email,
       pr.status,
       pr.is_client,
       p.name as ve_este_proyecto
  from public.profiles pr
  left join public.project_clients pc on pc.client_id = pr.id
  left join public.projects p on p.id = pc.project_id
 where pr.email = :cliente_email;

-- Debe salir: status 'approved', is_client true, y el nombre del proyecto.
-- Si 've_este_proyecto' sale vacío, el nombre del proyecto no coincide:
-- míralo exacto con  select name from public.projects;

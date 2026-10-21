-- ============================================================
-- LO QUE EL CLIENTE LEE, TAMBIÉN EN INGLÉS
--
-- El portal se traduce solo, pero los nombres de las etapas, las selecciones
-- y los hitos salen de la base, y ahí estaban solo en español.
-- Esto agrega la versión en inglés de cada uno.
--
-- La cuadrilla sigue viendo el español. Solo se traduce lo que ve el cliente.
-- Si una traducción está vacía, el portal muestra el español.
--
-- Se puede correr dos veces sin problema.
-- ============================================================

alter table public.scope_items
  add column if not exists title_en text not null default '';
alter table public.selections
  add column if not exists title_en text not null default '',
  add column if not exists room_en  text not null default '';
alter table public.client_payments
  add column if not exists label_en text not null default '';

-- ---------- las 10 fases del D37 ----------
update public.scope_items s set title_en = v.en
  from (values
    ('1 · Demolición y abatement de plomo',                 '1 · Demolition and lead abatement'),
    ('1b · Clearance de plomo independiente',               '1b · Independent lead clearance'),
    ('2 · Sacar escombro, proteger y subir material',       '2 · Haul out debris, protect, and bring materials up'),
    ('3 · Sheetrock en todo el apartamento',                '3 · Sheetrock throughout the apartment'),
    ('4 · Tape y mud',                                      '4 · Tape and mud'),
    ('5 · Lijado: paredes y piso de madera al mismo tiempo','5 · Sanding: walls and wood floor at the same time'),
    ('6 · Primer',                                          '6 · Primer'),
    ('7 · Instalación en varias áreas al mismo tiempo',     '7 · Installation across several areas at once'),
    ('8 · Acabados',                                        '8 · Finishes'),
    ('9 · Cierre y walkthrough',                            '9 · Closeout and walkthrough')
  ) as v(es, en)
 where s.title = v.es;

-- ---------- las 7 selecciones ----------
update public.selections s set title_en = v.en
  from (values
    ('Gabinetes de cocina',                                      'Kitchen cabinets'),
    ('Quartz del countertop',                                    'Quartz countertop'),
    ('Puertas (10, con la bifold de entrada y la del balcón)',   'Doors (10, including the entry bifold and the balcony door)'),
    ('Lavamanos del baño',                                       'Bathroom vanity'),
    ('Sistemas de closet (6)',                                   'Closet systems (6)'),
    ('Lámparas',                                                 'Light fixtures'),
    ('Carpet',                                                   'Carpet')
  ) as v(es, en)
 where s.title = v.es;

update public.selections s set room_en = v.en
  from (values
    ('Cocina',                 'Kitchen'),
    ('Todo el apartamento',    'Whole apartment'),
    ('Baño',                   'Bathroom'),
    ('Closets',                'Closets'),
    ('Sala y patio',           'Living room and balcony'),
    ('Cuarto de niños y sala', 'Kids'' room and living room')
  ) as v(es, en)
 where s.room = v.es;

-- ---------- los hitos de pago ----------
update public.client_payments c set label_en = v.en
  from (values
    ('Firma del contrato (30%)', 'Contract signing (30%)'),
    ('Hito 1',                   'Milestone 1'),
    ('Hito 2',                   'Milestone 2'),
    ('Pago final',               'Final payment'),
    ('Saldo pendiente',          'Outstanding balance'),
    ('Cobrado a la fecha',       'Collected to date'),
    ('Facturado sin cobrar',     'Invoiced, not collected'),
    ('Del contrato, sin facturar','Contract amount not yet invoiced'),
    ('Pago 1 · cheque',          'Payment 1 · check'),
    ('Pago 2 · efectivo',        'Payment 2 · cash'),
    ('Pago 3 · Apple Pay',       'Payment 3 · Apple Pay'),
    ('Pago 4 · Zelle',           'Payment 4 · Zelle')
  ) as v(es, en)
 where c.label = v.es;

-- ---------- qué quedó sin traducir ----------
select 'etapas'      as que, count(*) filter (where title_en = '') as sin_traducir from public.scope_items where kind = 'phase'
union all
select 'selecciones', count(*) filter (where title_en = '') from public.selections
union all
select 'hitos',       count(*) filter (where label_en = '') from public.client_payments;

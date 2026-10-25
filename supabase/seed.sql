
insert into public.incidents (
  title,
  description,
  type,
  severity,
  trust_status,
  latitude,
  longitude,
  location_name,
  source,
  report_count,
  expires_at
)
values
(
  'Demo road obstruction',
  'Illustrative sample report; not a real verified obstruction.',
  'ROAD_BLOCKAGE',
  'MEDIUM',
  'UNKNOWN',
  null,
  null,
  'Demo location - replace before launch',
  'SYSTEM',
  1,
  now() + interval '2 hours'
),
(
  'Demo transport disruption',
  'Illustrative sample report; confirm with the transport operator.',
  'TRANSPORT_ISSUE',
  'LOW',
  'UNKNOWN',
  null,
  null,
  'Demo transit stop',
  'SYSTEM',
  1,
  now() + interval '1 hour'
);


create extension if not exists pgcrypto;

create table if not exists public.incidents (
  id uuid primary key default gen_random_uuid(),
  title text not null check (char_length(title) between 4 and 120),
  description text not null check (char_length(description) between 5 and 2000),
  type text not null check (
    type in (
      'ROAD_BLOCKAGE', 'FLOODING', 'ACCIDENT', 'UNSAFE_AREA',
      'TRANSPORT_ISSUE', 'LIGHTING_ISSUE', 'OTHER'
    )
  ),
  severity text not null check (
    severity in ('LOW', 'MEDIUM', 'HIGH', 'CRITICAL')
  ),
  trust_status text not null default 'PROBABLE' check (
    trust_status in ('KNOWN', 'PROBABLE', 'OUTDATED', 'UNKNOWN')
  ),
  latitude double precision,
  longitude double precision,
  location_name text not null,
  reported_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  expires_at timestamptz,
  report_count integer not null default 1 check (report_count >= 1),
  source text not null default 'COMMUNITY' check (
    source in ('COMMUNITY', 'OFFICIAL', 'SYSTEM')
  ),
  image_url text,
  check (
    (latitude is null and longitude is null)
    or
    (latitude between -90 and 90 and longitude between -180 and 180)
  )
);

create index if not exists incidents_reported_at_idx
  on public.incidents (reported_at desc);

create index if not exists incidents_location_idx
  on public.incidents (latitude, longitude);

create index if not exists incidents_trust_status_idx
  on public.incidents (trust_status);

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  category text not null check (
    category in (
      'ROUTE_SAFETY', 'TRANSPORT', 'MAP_ACCURACY',
      'INCIDENT_REPORT', 'APP_EXPERIENCE', 'OTHER'
    )
  ),
  rating integer not null check (rating between 1 and 5),
  message text not null default '',
  journey_id text,
  anonymous boolean not null default true,
  status text not null default 'RECEIVED' check (
    status in ('RECEIVED', 'REVIEWING', 'RESOLVED')
  ),
  created_at timestamptz not null default now()
);

-- Browser clients cannot read or write these tables directly.
-- The backend uses a server-only service role key.
alter table public.incidents enable row level security;
alter table public.feedback enable row level security;

revoke all on public.incidents from anon, authenticated;
revoke all on public.feedback from anon, authenticated;

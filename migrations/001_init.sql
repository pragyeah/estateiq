-- EstateIQ initial schema: uploads, properties, analyses, analytics_logs, billing

create extension if not exists "pgcrypto";

create table if not exists public.uploads (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  file_url text not null,
  file_type text,
  created_at timestamp with time zone default now()
);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  address text,
  price numeric,
  beds int,
  baths int,
  sqft int,
  latitude double precision,
  longitude double precision,
  last_valuation numeric,
  previous_valuation numeric,
  appreciation_rate numeric,
  notes text,
  created_at timestamp with time zone default now()
);

create table if not exists public.analyses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  upload_id uuid references public.uploads(id) on delete cascade,
  property_id uuid references public.properties(id),
  ai_output jsonb not null,
  created_at timestamp with time zone default now()
);

create table if not exists public.analytics_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  action text,
  metadata jsonb,
  created_at timestamp with time zone default now()
);

create table if not exists public.billing (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id),
  plan text,
  credits int default 20,
  renewal_date date,
  created_at timestamp with time zone default now()
);



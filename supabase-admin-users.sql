-- Run this in Supabase SQL Editor (Dashboard → SQL Editor) to create the admin_users table.
-- Then call POST /api/admin/seed once to insert the super admin (or run the seed script).

create table if not exists public.admin_users (
  id uuid primary key default gen_random_uuid(),
  email text unique not null,
  password_hash text not null,
  created_at timestamptz default now()
);

-- RLS: no policies = anon/authenticated cannot access. Service role (API key) bypasses RLS.
alter table public.admin_users enable row level security;

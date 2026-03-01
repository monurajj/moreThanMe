-- Run in Supabase SQL Editor. Media assets (images/videos) for gallery and main page.

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  url text not null,
  public_id text,
  type text not null check (type in ('image', 'video')),
  title text,
  alt text,
  category text default 'General',
  description text,
  tags jsonb default '[]',
  show_on_home boolean not null default true,
  sort_order int not null default 0,
  created_at timestamptz default now()
);

alter table public.media_assets enable row level security;

create policy "media_assets public read" on public.media_assets for select using (true);

create index if not exists idx_media_assets_show_on_home on public.media_assets(show_on_home);
create index if not exists idx_media_assets_sort on public.media_assets(sort_order asc);
create index if not exists idx_media_assets_created_at on public.media_assets(created_at desc);

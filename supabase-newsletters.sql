-- Run this in Supabase SQL Editor (Dashboard → SQL Editor) to create newsletter tables.
-- Newsletters: stores all newsletter metadata (title, description, file path).
-- newsletter_sends: logs each email send for history.

-- Newsletters table: all past and current newsletters
create table if not exists public.newsletters (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  category text not null,
  file_path text not null,
  created_at timestamptz default now()
);

-- Newsletter send history: log when we send emails
create table if not exists public.newsletter_sends (
  id uuid primary key default gen_random_uuid(),
  newsletter_id uuid references public.newsletters(id) on delete set null,
  subject text not null,
  recipient_count int not null default 0,
  recipient_emails jsonb,
  sent_at timestamptz default now(),
  sent_by text
);

-- Index for faster lookups
create index if not exists idx_newsletters_created_at on public.newsletters(created_at desc);
create index if not exists idx_newsletter_sends_sent_at on public.newsletter_sends(sent_at desc);

-- Code Vault: run this ONCE in Supabase > SQL Editor > New query > Run.

create table if not exists public.entries (
  id         text primary key,
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  data       jsonb not null,            -- title, question, language, tags, code, images, created time
  updated_at bigint not null,           -- milliseconds, used to decide which copy is newer
  deleted    boolean not null default false
);

create index if not exists entries_user_updated_idx on public.entries (user_id, updated_at);

-- Only the logged-in owner can see or change their own rows.
alter table public.entries enable row level security;

drop policy if exists "own entries" on public.entries;
create policy "own entries" on public.entries
  for all to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

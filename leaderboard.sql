-- Турнірна таблиця для «Мовних ігор».
-- Виконати один раз у Supabase: SQL Editor → New query → вставити → Run.

create table if not exists public.scores (
  id bigint generated always as identity primary key,
  name text not null,
  game text not null,
  score integer not null,
  created_at timestamptz not null default now(),

  constraint name_length check (char_length(name) between 2 and 20),
  constraint game_known check (game in ('naholosy', 'leksychna', 'klychnyi')),
  constraint score_range check (score between 1 and 100000),
  -- без посилань і реклами в імені
  constraint name_no_links check (
    name !~* '(https?:|www\.|t\.me|@|\.(com|net|org|ua|ru|io|me|site|online|shop)(\s|$))'
  )
);

create index if not exists scores_game_score_idx on public.scores (game, score desc, created_at);

alter table public.scores enable row level security;

-- Усі можуть дивитися таблицю
drop policy if exists "scores are public" on public.scores;
create policy "scores are public"
  on public.scores for select
  to anon
  using (true);

-- Усі можуть додати свій результат, але не змінювати й не видаляти чужі
drop policy if exists "anyone can add a score" on public.scores;
create policy "anyone can add a score"
  on public.scores for insert
  to anon
  with check (true);

-- Права саме на ці дії (оновлення й видалення — лише через панель Supabase)
revoke all on public.scores from anon;
grant select, insert on public.scores to anon;

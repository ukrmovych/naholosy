-- Результати ігор для класу: хто скільки набрав, дата й час гри.
-- Виконати ОДИН РАЗ у Supabase: SQL Editor → New query → вставити → Run.
-- Повторний запуск нічого не зламає. Пароль — той самий, що для статистики (stats.sql).

create table if not exists public.class_results (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),   -- коли гру завершено
  started_at timestamptz,                           -- коли почали
  room text not null,
  game text not null,                               -- naholosy | frazeolohizmy | klychnyi …
  rounds integer not null default 0,                -- скільки питань зіграли
  rounds_planned integer not null default 0,        -- скільки планували
  early boolean not null default false,             -- завершено достроково
  players jsonb not null default '[]'::jsonb,       -- [{place, name, score, correct, answered}]
  constraint room_format check (room ~ '^[A-Z0-9]{5}$'),
  constraint game_short check (char_length(game) <= 30),
  constraint players_small check (pg_column_size(players) <= 20000)
);

create index if not exists class_results_created_idx on public.class_results (created_at desc);

-- Гра може лише ДОДАВАТИ результати; читати — тільки ти (Supabase або сторінка статистики)
alter table public.class_results enable row level security;
drop policy if exists "game can add class results" on public.class_results;
create policy "game can add class results" on public.class_results for insert to anon with check (true);
revoke all on public.class_results from anon, authenticated;
grant insert on public.class_results to anon;

-- Пароль (якщо stats.sql ще не запускали — створиться тут)
create table if not exists public.stats_access (
  id integer primary key default 1 check (id = 1),
  password text not null check (char_length(password) >= 8)
);
alter table public.stats_access enable row level security;
revoke all on public.stats_access from anon, authenticated;
insert into public.stats_access (password)
values (substr(md5(random()::text || clock_timestamp()::text), 1, 12))
on conflict (id) do nothing;

-- Усі ігри для класу для сторінки статистики (найновіші зверху)
create or replace function public.get_class_results(p_password text)
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
begin
  if not exists (select 1 from stats_access where password = p_password) then
    perform pg_sleep(1);
    raise exception 'wrong password';
  end if;
  return (
    select coalesce(jsonb_agg(jsonb_build_object(
      'id', id, 'ended_at', created_at, 'started_at', started_at, 'room', room, 'game', game,
      'rounds', rounds, 'rounds_planned', rounds_planned, 'early', early, 'players', players
    ) order by created_at desc), '[]'::jsonb)
    from (select * from class_results order by created_at desc limit 500) r
  );
end;
$$;

revoke all on function public.get_class_results(text) from public;
grant execute on function public.get_class_results(text) to anon;

-- Пароль для сторінки …/naholosy/stats/ (той самий, що й для статистики):
select password as "пароль для …/naholosy/stats/" from public.stats_access;

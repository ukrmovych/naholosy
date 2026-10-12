-- Онлайн-режими: таблиця для статистики.
-- Виконати ОДИН РАЗ у Supabase: SQL Editor → New query → вставити → Run.

create table if not exists public.online_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  room text not null,
  mode text not null,          -- duel | sprint | class
  event text not null,         -- create | start | finish
  players integer not null default 0,
  details jsonb not null default '{}'::jsonb,
  constraint event_known check (event in ('create', 'start', 'finish')),
  constraint mode_known check (mode in ('duel', 'sprint', 'class')),
  constraint room_format check (room ~ '^[A-Z0-9]{5}$')
);

create index if not exists online_events_created_idx on public.online_events (created_at);

-- Гра може лише ДОДАВАТИ записи; читати статистику — тільки ти в Supabase
alter table public.online_events enable row level security;
drop policy if exists "game can log events" on public.online_events;
create policy "game can log events" on public.online_events for insert to anon with check (true);
revoke all on public.online_events from anon;
grant insert on public.online_events to anon;


-- =====================================================================
-- Готові запити для статистики (запускай будь-який окремо в SQL Editor)
-- =====================================================================

-- 1) Скільки кімнат створили, почали й дограли — по режимах, за 30 днів
-- select mode,
--        count(*) filter (where event = 'create') as "створено кімнат",
--        count(*) filter (where event = 'start')  as "почато ігор",
--        count(*) filter (where event = 'finish') as "дограно ігор",
--        round(avg(players) filter (where event = 'start'), 1) as "гравців у середньому"
-- from public.online_events
-- where created_at > now() - interval '30 days'
-- group by mode;

-- 2) Активність по днях
-- select date(created_at) as "день", mode, count(*) filter (where event = 'start') as "ігор"
-- from public.online_events
-- group by 1, 2 order by 1 desc, 2;

-- 3) У яку годину грають найчастіше (за київським часом)
-- select extract(hour from created_at at time zone 'Europe/Kyiv') as "година", count(*) as "ігор"
-- from public.online_events where event = 'start'
-- group by 1 order by 1;

-- 4) Найбільші ігри для класу
-- select created_at at time zone 'Europe/Kyiv' as "коли", room, players as "учнів", details
-- from public.online_events where mode = 'class' and event = 'start'
-- order by players desc limit 20;

-- Статистика гри: таблиця подій + функція для сторінки …/stats/
-- Виконати ОДИН РАЗ у Supabase: SQL Editor → New query → вставити → Run.
-- Унизу з'явиться пароль для сторінки статистики. Повторний запуск нічого не зламає
-- (пароль лишиться той самий).

-- 1) Події з гри: відвідування, початок і кінець ігор, тренування, дуелі тощо
create table if not exists public.game_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  player uuid,                -- випадковий ідентифікатор пристрою (без імен і особистих даних)
  event text not null,
  game text,
  details jsonb not null default '{}'::jsonb,
  constraint event_known check (event in (
    'visit', 'game_start', 'game_over', 'all_words_done', 'training_start', 'training_done',
    'duel_start', 'duel_end', 'soon_click', 'leaderboard_submit',
    'online_join', 'online_share', 'online_invite_open'
  )),
  constraint game_short check (game is null or char_length(game) <= 20),
  constraint details_small check (pg_column_size(details) <= 1000)
);

create index if not exists game_events_created_idx on public.game_events (created_at);

-- Гра може лише ДОДАВАТИ записи; читати — тільки сторінка статистики з паролем
alter table public.game_events enable row level security;
drop policy if exists "game can log events" on public.game_events;
create policy "game can log events" on public.game_events for insert to anon with check (true);
revoke all on public.game_events from anon, authenticated;
grant insert on public.game_events to anon;

-- 2) Пароль для сторінки статистики (ніхто, крім тебе в Supabase, його не бачить)
create table if not exists public.stats_access (
  id integer primary key default 1 check (id = 1),
  password text not null check (char_length(password) >= 8)
);
alter table public.stats_access enable row level security;
revoke all on public.stats_access from anon, authenticated;
insert into public.stats_access (password)
values (substr(md5(random()::text || clock_timestamp()::text), 1, 12))
on conflict (id) do nothing;

-- 3) Усі цифри для сторінки статистики одним запитом.
-- p_days: 1 = сьогодні, 7 = останні 7 днів (включно з сьогодні) тощо. Дні — за київським часом.
create or replace function public.get_stats(p_password text, p_days integer default 7)
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  tz constant text := 'Europe/Kyiv';
  today date := (now() at time zone tz)::date;
  days integer := least(greatest(coalesce(p_days, 7), 1), 366);
  since timestamptz;
  result jsonb;
begin
  if not exists (select 1 from stats_access where password = p_password) then
    perform pg_sleep(1); -- щоб пароль не можна було швидко підбирати
    raise exception 'wrong password';
  end if;

  since := ((today - (days - 1))::timestamp) at time zone tz;

  with ev as (
    select *, (created_at at time zone tz)::date as day
    from game_events where created_at >= since
  ),
  first_seen as (
    select player, min(created_at) as first_at from game_events where player is not null group by player
  ),
  play as (
    select * from ev where event in ('game_start', 'training_start', 'duel_start')
  )
  select jsonb_build_object(
    'days', days,
    'since', today - (days - 1),
    'players', jsonb_build_object(
      'today', (select count(distinct player) from game_events
                where created_at >= (today::timestamp at time zone tz)),
      'period', (select count(distinct player) from ev),
      'new', (select count(*) from first_seen where first_at >= since),
      'all_time', (select count(*) from first_seen),
      'played', (select count(distinct player) from play),
      'returning', (select count(*) from (
          select player from ev where player is not null group by player having count(distinct day) >= 2
        ) r)
    ),
    'visits', jsonb_build_object(
      'total', (select count(*) from ev where event = 'visit'),
      'telegram', (select count(*) from ev where event = 'visit' and details->>'tg' = 'true')
    ),
    'daily', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'day', d.day,
        'players', (select count(distinct player) from ev where ev.day = d.day),
        'games', (select count(*) from play where play.day = d.day)
      ) order by d.day), '[]'::jsonb)
      from (select generate_series(today - (days - 1), today, interval '1 day')::date as day) d
    ),
    'hours', (
      select coalesce(jsonb_agg(jsonb_build_object('hour', h, 'games', n) order by h), '[]'::jsonb)
      from (
        select g.h, (select count(*) from play where extract(hour from play.created_at at time zone tz) = g.h) as n
        from generate_series(0, 23) g(h)
      ) x
    ),
    'games', (
      select coalesce(jsonb_object_agg(game, data), '{}'::jsonb) from (
        select game, jsonb_build_object(
          'players', count(distinct player) filter (where event in ('game_start', 'training_start', 'duel_start')),
          'marathons', count(*) filter (where event = 'game_start'),
          'finished', count(*) filter (where event = 'game_over'),
          'avg_score', round(avg((details->>'final_score')::numeric) filter (where event = 'game_over'), 1),
          'max_score', max((details->>'final_score')::numeric) filter (where event = 'game_over'),
          'all_words', count(*) filter (where event = 'all_words_done'),
          'trainings', count(*) filter (where event = 'training_start'),
          'trainings_done', count(*) filter (where event = 'training_done'),
          'duels', count(*) filter (where event = 'duel_start'),
          'duels_done', count(*) filter (where event = 'duel_end'),
          'leaderboard', count(*) filter (where event = 'leaderboard_submit'),
          'soon_clicks', count(*) filter (where event = 'soon_click')
        ) as data
        from ev where game is not null
        group by game
      ) g
    ),
    'groups', (
      select coalesce(jsonb_agg(jsonb_build_object('group', grp, 'count', n) order by n desc, grp), '[]'::jsonb)
      from (
        select details->>'group' as grp, count(*) as n
        from ev where event = 'training_start' and details ? 'group'
        group by 1 order by 2 desc limit 12
      ) t
    ),
    'duel_players', (
      select coalesce(jsonb_object_agg(players, n), '{}'::jsonb)
      from (select details->>'players' as players, count(*) as n from ev
            where event = 'duel_start' group by 1) t where players is not null
    ),
    'online', (
      select coalesce(jsonb_object_agg(mode, data), '{}'::jsonb) from (
        select mode, jsonb_build_object(
          'created', count(*) filter (where event = 'create'),
          'started', count(*) filter (where event = 'start'),
          'finished', count(*) filter (where event = 'finish'),
          'avg_players', round(avg(players) filter (where event = 'start'), 1),
          'max_players', max(players) filter (where event = 'start')
        ) as data
        from online_events where created_at >= since
        group by mode
      ) o
    ),
    'online_extra', jsonb_build_object(
      'joins', (select count(*) from ev where event = 'online_join'),
      'shares', (select count(*) from ev where event = 'online_share'),
      'invites', (select count(*) from ev where event = 'online_invite_open')
    ),
    'leaderboard', (
      select coalesce(jsonb_object_agg(game, data), '{}'::jsonb) from (
        select game, jsonb_build_object(
          'players', count(*),
          'new', count(*) filter (where created_at >= since),
          'best', max(score)
        ) as data
        from scores group by game
      ) l
    )
  ) into result;

  return result;
end;
$$;

revoke all on function public.get_stats(text, integer) from public;
grant execute on function public.get_stats(text, integer) to anon;

-- Пароль для сторінки статистики (скопіюй його звідси, з результату внизу):
select password as "пароль для …/naholosy/stats/" from public.stats_access;

-- Змінити пароль (за бажанням): розкоментуй, впиши свій і запусти окремо
-- update public.stats_access set password = 'мій-новий-пароль';

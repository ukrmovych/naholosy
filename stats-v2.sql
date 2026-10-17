-- Розширена статистика (будь-який діапазон дат) + таблиця результатів ігор для класу.
-- Виконати ОДИН РАЗ у Supabase: SQL Editor → New query → вставити ВЕСЬ файл → Run.
-- Повторний запуск нічого не зламає. Потрібен уже запущений stats.sql (таблиця game_events і пароль).

-- ================== 1. Результати ігор для класу (якщо ще не створено) ==================

create table if not exists public.class_results (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  started_at timestamptz,
  room text not null,
  game text not null,
  rounds integer not null default 0,
  rounds_planned integer not null default 0,
  early boolean not null default false,
  players jsonb not null default '[]'::jsonb,
  constraint room_format check (room ~ '^[A-Z0-9]{5}$'),
  constraint game_short check (char_length(game) <= 30),
  constraint players_small check (pg_column_size(players) <= 20000)
);
create index if not exists class_results_created_idx on public.class_results (created_at desc);
alter table public.class_results enable row level security;
drop policy if exists "game can add class results" on public.class_results;
create policy "game can add class results" on public.class_results for insert to anon with check (true);
revoke all on public.class_results from anon, authenticated;
grant insert on public.class_results to anon;

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

-- Якщо таблиць відгуків чи онлайн-подій ще немає — створимо порожні, щоб статистика працювала
create table if not exists public.online_events (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  room text not null, mode text not null, event text not null,
  players integer not null default 0, details jsonb not null default '{}'::jsonb
);
create table if not exists public.feedback (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  player uuid, message text not null, rating smallint, role text, name text, contact text,
  can_publish boolean not null default false, source text
);

-- ================== 2. Статистика за будь-який період ==================
-- p_from, p_to — дати (включно) за київським часом. Без пароля нічого не віддає.

create or replace function public.get_stats_range(p_password text, p_from date, p_to date)
returns jsonb
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  tz constant text := 'Europe/Kyiv';
  d_from date := least(coalesce(p_from, (now() at time zone tz)::date), coalesce(p_to, (now() at time zone tz)::date));
  d_to date := greatest(coalesce(p_from, (now() at time zone tz)::date), coalesce(p_to, (now() at time zone tz)::date));
  t_from timestamptz;
  t_to timestamptz;
  result jsonb;
begin
  if not exists (select 1 from stats_access where password = p_password) then
    perform pg_sleep(1);
    raise exception 'wrong password';
  end if;
  if d_to - d_from > 3660 then d_from := d_to - 3660; end if;
  t_from := (d_from::timestamp) at time zone tz;
  t_to := ((d_to + 1)::timestamp) at time zone tz;

  with ev as (
    select *, (created_at at time zone tz)::date as day,
           extract(hour from created_at at time zone tz)::int as hour,
           extract(isodow from created_at at time zone tz)::int as dow
    from game_events where created_at >= t_from and created_at < t_to
  ),
  first_seen as (
    select player, min(created_at) as first_at from game_events where player is not null group by player
  ),
  play as (select * from ev where event in ('game_start', 'training_start', 'duel_start')),
  per_player as (select player, count(*) as games from play where player is not null group by player),
  newbies as (select player from first_seen where first_at >= t_from and first_at < t_to),
  oe as (select * from online_events where created_at >= t_from and created_at < t_to),
  cr as (select * from class_results where created_at >= t_from and created_at < t_to),
  fb as (select * from feedback where created_at >= t_from and created_at < t_to)
  select jsonb_build_object(
    'from', d_from, 'to', d_to, 'days', d_to - d_from + 1,

    -- Люди
    'players', jsonb_build_object(
      'active', (select count(distinct player) from ev),
      'new', (select count(*) from newbies),
      'returning', (select count(distinct player) from ev where player is not null
                      and player not in (select player from newbies)),
      'multi_day', (select count(*) from (select player from ev where player is not null
                      group by player having count(distinct day) >= 2) x),
      -- з нових: скільки повернулися в інший день (будь-коли пізніше)
      'new_came_back', (select count(*) from newbies n where exists (
                          select 1 from game_events g where g.player = n.player
                          and (g.created_at at time zone tz)::date >
                              ((select first_at from first_seen f where f.player = n.player) at time zone tz)::date)),
      'all_time', (select count(*) from first_seen),
      'played', (select count(distinct player) from play)
    ),

    -- Відвідування
    'visits', jsonb_build_object(
      'total', (select count(*) from ev where event = 'visit'),
      'telegram', (select count(*) from ev where event = 'visit' and details->>'tg' = 'true'),
      'beta', (select count(*) from ev where event = 'visit' and details->>'beta' = 'true')
    ),

    -- Воронка: зайшли → почали гру → дограли марафон → у турнірну таблицю
    'funnel', jsonb_build_object(
      'visited', (select count(distinct player) from ev where event = 'visit'),
      'played', (select count(distinct player) from play),
      'finished', (select count(distinct player) from ev where event = 'game_over'),
      'leaderboard', (select count(distinct player) from ev where event = 'leaderboard_submit')
    ),

    -- Наскільки активні: скільки ігор на гравця
    'engagement', jsonb_build_object(
      'games', (select count(*) from play),
      'avg_per_player', (select round(avg(games), 1) from per_player),
      'g1', (select count(*) from per_player where games = 1),
      'g2_5', (select count(*) from per_player where games between 2 and 5),
      'g6_20', (select count(*) from per_player where games between 6 and 20),
      'g21', (select count(*) from per_player where games > 20)
    ),

    -- По днях
    'daily', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'day', d.day,
        'players', (select count(distinct player) from ev where ev.day = d.day),
        'new', (select count(*) from newbies n join first_seen f using (player)
                where (f.first_at at time zone tz)::date = d.day),
        'games', (select count(*) from play where play.day = d.day),
        'visits', (select count(*) from ev where ev.day = d.day and event = 'visit')
      ) order by d.day), '[]'::jsonb)
      from (select generate_series(d_from, d_to, interval '1 day')::date as day) d
    ),

    -- Коли грають
    'hours', (
      select coalesce(jsonb_agg(jsonb_build_object('hour', h, 'games',
        (select count(*) from play where play.hour = h)) order by h), '[]'::jsonb)
      from generate_series(0, 23) h
    ),
    'weekdays', (
      select coalesce(jsonb_agg(jsonb_build_object('dow', w, 'games',
        (select count(*) from play where play.dow = w)) order by w), '[]'::jsonb)
      from generate_series(1, 7) w
    ),

    -- По іграх
    'games', (
      select coalesce(jsonb_object_agg(game, data), '{}'::jsonb) from (
        select game, jsonb_build_object(
          'players', count(distinct player) filter (where event in ('game_start', 'training_start', 'duel_start')),
          'marathons', count(*) filter (where event = 'game_start'),
          'finished', count(*) filter (where event = 'game_over'),
          'avg_score', round(avg((details->>'final_score')::numeric) filter (where event = 'game_over'), 1),
          'median_score', percentile_cont(0.5) within group (order by (details->>'final_score')::numeric)
                            filter (where event = 'game_over'),
          'max_score', max((details->>'final_score')::numeric) filter (where event = 'game_over'),
          'all_words', count(*) filter (where event = 'all_words_done'),
          'trainings', count(*) filter (where event = 'training_start'),
          'trainings_done', count(*) filter (where event = 'training_done'),
          'duels', count(*) filter (where event = 'duel_start'),
          'duels_done', count(*) filter (where event = 'duel_end'),
          'leaderboard', count(*) filter (where event = 'leaderboard_submit'),
          'soon_clicks', count(*) filter (where event = 'soon_click')
        ) as data
        from ev where game is not null group by game
      ) g
    ),

    -- Розподіл результатів марафону (кошики по 10)
    'scores', (
      select coalesce(jsonb_object_agg(game, buckets), '{}'::jsonb) from (
        select game, jsonb_agg(jsonb_build_object('from', b * 10, 'n', n) order by b) as buckets
        from (
          select game, least(floor((details->>'final_score')::numeric / 10), 30)::int as b, count(*) as n
          from ev where event = 'game_over' and details ? 'final_score' and game is not null
          group by 1, 2
        ) x group by game
      ) y
    ),

    'groups', (
      select coalesce(jsonb_agg(jsonb_build_object('group', grp, 'count', n, 'done', d) order by n desc, grp), '[]'::jsonb)
      from (
        select details->>'group' as grp,
               count(*) filter (where event = 'training_start') as n,
               count(*) filter (where event = 'training_done') as d
        from ev where event in ('training_start', 'training_done') and details ? 'group'
        group by 1 order by 2 desc limit 15
      ) t
    ),

    'duel_setup', jsonb_build_object(
      'players', (select coalesce(jsonb_object_agg(k, n), '{}'::jsonb) from (
                    select details->>'players' as k, count(*) as n from ev where event = 'duel_start' group by 1) t where k is not null),
      'layout', (select coalesce(jsonb_object_agg(k, n), '{}'::jsonb) from (
                    select details->>'layout' as k, count(*) as n from ev where event = 'duel_start' group by 1) t where k is not null),
      'teams', (select count(*) from ev where event = 'duel_start' and details->>'teams' in ('1', 'true')),
      'target', (select coalesce(jsonb_object_agg(k, n), '{}'::jsonb) from (
                    select details->>'target' as k, count(*) as n from ev where event = 'duel_start' group by 1) t where k is not null)
    ),

    'online', (
      select coalesce(jsonb_agg(jsonb_build_object(
        'game', g, 'mode', mode, 'created', c, 'started', s, 'finished', f, 'avg_players', ap, 'max_players', mp
      ) order by s desc), '[]'::jsonb) from (
        select coalesce(details->>'game', 'naholosy') as g, mode,
               count(*) filter (where event = 'create') as c,
               count(*) filter (where event = 'start') as s,
               count(*) filter (where event = 'finish') as f,
               round(avg(players) filter (where event = 'start'), 1) as ap,
               max(players) filter (where event = 'start') as mp
        from oe group by 1, 2
      ) o
    ),
    'online_extra', jsonb_build_object(
      'joins', (select count(*) from ev where event = 'online_join'),
      'shares', (select count(*) from ev where event = 'online_share'),
      'invites', (select count(*) from ev where event = 'online_invite_open')
    ),

    'classes', jsonb_build_object(
      'games', (select count(*) from cr),
      'students', (select coalesce(sum(jsonb_array_length(players)), 0) from cr),
      'avg_students', (select round(avg(jsonb_array_length(players)), 1) from cr),
      'avg_rounds', (select round(avg(rounds), 1) from cr),
      'early', (select count(*) from cr where early),
      'by_game', (select coalesce(jsonb_object_agg(game, n), '{}'::jsonb) from (
                    select game, count(*) as n from cr group by game) t)
    ),

    'feedback', jsonb_build_object(
      'count', (select count(*) from fb),
      'avg_rating', (select round(avg(rating), 2) from fb where rating is not null),
      'publishable', (select count(*) from fb where can_publish)
    ),

    'leaderboard', (
      select coalesce(jsonb_object_agg(game, data), '{}'::jsonb) from (
        select game, jsonb_build_object(
          'players', count(*),
          'new', count(*) filter (where created_at >= t_from and created_at < t_to),
          'best', max(score)
        ) as data
        from scores group by game
      ) l
    )
  ) into result;

  return result;
end;
$$;

revoke all on function public.get_stats_range(text, date, date) from public;
grant execute on function public.get_stats_range(text, date, date) to anon;

-- Готово. Пароль для сторінки статистики:
select password as "пароль для …/gym/stats/" from public.stats_access;

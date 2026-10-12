-- Турнірна таблиця: один рядок на гравця — лише його найкращий результат.
-- Виконати ОДИН РАЗ у Supabase: SQL Editor → New query → вставити → Run.
-- (Після leaderboard.sql. Повторний запуск нічого не зламає.)

-- Прихований ідентифікатор гравця (генерується на його пристрої).
-- Двоє різних людей з однаковим іменем мають різні ідентифікатори.
alter table public.scores add column if not exists player_id uuid;

-- Для кожного гравця в кожній грі — не більше одного рядка
create unique index if not exists scores_game_player_uniq
  on public.scores (game, player_id)
  where player_id is not null;

-- Записати результат: якщо гравець уже є — лишається кращий з двох.
-- Повертає результат, який тепер стоїть у таблиці.
create or replace function public.submit_score(p_player uuid, p_name text, p_game text, p_score integer)
returns integer
language plpgsql
volatile
security definer
set search_path = public
as $$
declare
  result integer;
begin
  if p_player is null then
    raise exception 'player id is required';
  end if;

  insert into public.scores (player_id, name, game, score)
  values (p_player, p_name, p_game, p_score)
  on conflict (game, player_id) where player_id is not null
  do update set
    name = excluded.name,
    score = greatest(public.scores.score, excluded.score),
    created_at = case
      when excluded.score > public.scores.score then now()
      else public.scores.created_at
    end
  returning score into result;

  return result;
end;
$$;

revoke all on function public.submit_score(uuid, text, text, integer) from public;
grant execute on function public.submit_score(uuid, text, text, integer) to anon, authenticated;

-- Додавати результати тепер можна лише через submit_score,
-- а ідентифікатори гравців назовні не видно
revoke insert on public.scores from anon;
revoke select on public.scores from anon;
grant select (id, name, game, score, created_at) on public.scores to anon;

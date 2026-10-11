-- «Лексична помилка»: закрита таблиця речень.
-- Виконати один раз у Supabase: SQL Editor → New query → вставити → Run.
-- Самі речення завантажуються окремими файлами (sentences-part1.sql, sentences-part2.sql),
-- які НЕ лежать у репозиторії.

create table if not exists public.sentences (
  id bigint generated always as identity primary key,
  text text not null,
  constraint has_ok_option check (text like '%✅-помилок-немає-✅%')
);

-- Таблицю не можна прочитати напряму: RLS увімкнено, політик для читання немає
alter table public.sentences enable row level security;
revoke all on public.sentences from anon, authenticated;

-- Єдиний спосіб отримати речення — по одному, випадково.
-- exclude: id речень, які гравець уже бачив у цій грі.
create or replace function public.random_sentence(exclude bigint[] default '{}')
returns table (id bigint, text text)
language sql
volatile
security definer
set search_path = public
as $$
  select s.id, s.text
  from public.sentences s
  where not (s.id = any (coalesce(exclude, '{}')))
  order by random()
  limit 1;
$$;

revoke all on function public.random_sentence(bigint[]) from public;
grant execute on function public.random_sentence(bigint[]) to anon, authenticated;

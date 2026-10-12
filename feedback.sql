-- Відгуки про тренажер: таблиця + функція для сторінки …/stats/
-- Виконати ОДИН РАЗ у Supabase: SQL Editor → New query → вставити → Run.
-- Повторний запуск нічого не зламає. Пароль — той самий, що для статистики (stats.sql).

create table if not exists public.feedback (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  player uuid,
  message text not null,
  rating smallint,
  role text,
  name text,
  contact text,               -- нік у Telegram, лише якщо людина поставила галочку
  can_publish boolean not null default false,
  source text,
  constraint message_length check (char_length(message) between 3 and 2000),
  constraint rating_range check (rating is null or rating between 1 and 5),
  constraint role_known check (role is null or role in ('student', 'teacher', 'parent', 'other')),
  constraint name_length check (name is null or char_length(name) <= 40),
  constraint contact_format check (contact is null or contact ~ '^@[A-Za-z0-9_]{3,40}$'),
  constraint source_known check (source is null or source in ('telegram', 'web'))
);

create index if not exists feedback_created_idx on public.feedback (created_at desc);

-- Гра може лише ДОДАВАТИ відгуки; читати — тільки ти (Supabase або сторінка статистики)
alter table public.feedback enable row level security;
drop policy if exists "game can add feedback" on public.feedback;
create policy "game can add feedback" on public.feedback for insert to anon with check (true);
revoke all on public.feedback from anon, authenticated;
grant insert on public.feedback to anon;

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

-- Усі відгуки для сторінки статистики (найновіші зверху)
create or replace function public.get_feedback(p_password text)
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
      'id', id, 'created_at', created_at, 'message', message, 'rating', rating, 'role', role,
      'name', name, 'contact', contact, 'can_publish', can_publish, 'source', source
    ) order by created_at desc), '[]'::jsonb)
    from (select * from feedback order by created_at desc limit 1000) f
  );
end;
$$;

revoke all on function public.get_feedback(text) from public;
grant execute on function public.get_feedback(text) to anon;

-- Пароль для сторінки …/naholosy/stats/ (той самий, що й для статистики):
select password as "пароль для …/naholosy/stats/" from public.stats_access;

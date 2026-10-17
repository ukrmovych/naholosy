-- Звернення «Підписка є, а доступу до PRO немає».
-- Записує їх функція Supabase pro-check (з ключем service role), читає сторінка …/stats/ (вкладка «PRO»).
-- Повторний запуск нічого не зламає. Пароль — той самий, що для статистики.

create table if not exists public.pro_issues (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  tg_user_id bigint not null,
  username text,
  name text,
  message text,
  invite_link text,                       -- посилання-заявка, яке отримав учень
  resolved boolean not null default false,
  constraint message_short check (char_length(coalesce(message, '')) <= 1000)
);
create index if not exists pro_issues_created_idx on public.pro_issues (created_at desc);

-- Гра напряму сюди не пише й не читає — лише функція pro-check і сторінка статистики
alter table public.pro_issues enable row level security;
revoke all on public.pro_issues from anon, authenticated;

create or replace function public.get_pro_issues(p_password text)
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
    select coalesce(jsonb_agg(to_jsonb(r) order by r.created_at desc), '[]'::jsonb)
    from (select * from pro_issues order by created_at desc limit 300) r
  );
end;
$$;

create or replace function public.set_pro_issue_resolved(p_password text, p_id bigint, p_resolved boolean)
returns void
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
  update pro_issues set resolved = p_resolved where id = p_id;
end;
$$;

revoke all on function public.get_pro_issues(text) from public;
revoke all on function public.set_pro_issue_resolved(text, bigint, boolean) from public;
grant execute on function public.get_pro_issues(text) to anon;
grant execute on function public.set_pro_issue_resolved(text, bigint, boolean) to anon;

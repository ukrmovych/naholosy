-- Спецтеми за посиланням (вебінари): хто перейшов за посиланням до дедлайну — має доступ до теми назавжди.
-- access_links — посилання (код, тема, дедлайн, скасовано); access_grants — хто отримав доступ (Telegram).
-- Записує доступи функція Supabase topic-access (ключ service role), керує сторінка …/stats/ (вкладка «Доступи»).
-- Повторний запуск нічого не зламає. Пароль — той самий, що для статистики.

create table if not exists public.access_links (
  code text primary key check (code ~ '^[A-Za-z0-9]{6,16}$'),
  topic text not null check (char_length(topic) <= 40),
  title text not null default '' check (char_length(title) <= 120),
  created_at timestamptz not null default now(),
  expires_at timestamptz not null,           -- до цього часу за посиланням можна отримати доступ
  revoked boolean not null default false     -- скасовано: доступ зникає в усіх, хто прийшов за посиланням
);

create table if not exists public.access_grants (
  id bigint generated always as identity primary key,
  code text not null references public.access_links(code) on delete cascade,
  tg_user_id bigint not null,
  username text,
  name text,
  created_at timestamptz not null default now(),
  revoked boolean not null default false,
  unique (code, tg_user_id)
);
create index if not exists access_grants_user_idx on public.access_grants (tg_user_id);

alter table public.access_links enable row level security;
alter table public.access_grants enable row level security;
revoke all on public.access_links, public.access_grants from anon, authenticated;

create or replace function public.stats_password_ok(p_password text)
returns boolean language plpgsql security definer set search_path = public as $$
begin
  if exists (select 1 from stats_access where password = p_password) then return true; end if;
  perform pg_sleep(1);
  return false;
end;
$$;
revoke all on function public.stats_password_ok(text) from public, anon;

-- Усі посилання з тими, хто отримав доступ
create or replace function public.get_access_links(p_password text)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
begin
  if not stats_password_ok(p_password) then raise exception 'wrong password'; end if;
  return (
    select coalesce(jsonb_agg(jsonb_build_object(
      'code', l.code, 'topic', l.topic, 'title', l.title, 'created_at', l.created_at,
      'expires_at', l.expires_at, 'revoked', l.revoked,
      'grants', (select coalesce(jsonb_agg(jsonb_build_object(
          'id', g.id, 'tg_user_id', g.tg_user_id, 'username', g.username, 'name', g.name,
          'created_at', g.created_at, 'revoked', g.revoked) order by g.created_at), '[]'::jsonb)
        from access_grants g where g.code = l.code)
    ) order by l.created_at desc), '[]'::jsonb)
    from access_links l
  );
end;
$$;

create or replace function public.create_access_link(p_password text, p_topic text, p_title text, p_expires timestamptz)
returns text language plpgsql volatile security definer set search_path = public as $$
declare c text;
begin
  if not stats_password_ok(p_password) then raise exception 'wrong password'; end if;
  c := substr(md5(random()::text || clock_timestamp()::text), 1, 8);
  insert into access_links (code, topic, title, expires_at) values (c, p_topic, coalesce(p_title, ''), p_expires);
  return c;
end;
$$;

-- Продовжити / закрити посилання (p_expires) і скасувати / відновити доступ усім (p_revoked); null — не змінювати
create or replace function public.update_access_link(p_password text, p_code text, p_expires timestamptz, p_revoked boolean)
returns void language plpgsql volatile security definer set search_path = public as $$
begin
  if not stats_password_ok(p_password) then raise exception 'wrong password'; end if;
  update access_links set expires_at = coalesce(p_expires, expires_at), revoked = coalesce(p_revoked, revoked)
  where code = p_code;
end;
$$;

-- Забрати / повернути доступ одній людині
create or replace function public.set_access_grant(p_password text, p_id bigint, p_revoked boolean)
returns void language plpgsql volatile security definer set search_path = public as $$
begin
  if not stats_password_ok(p_password) then raise exception 'wrong password'; end if;
  update access_grants set revoked = p_revoked where id = p_id;
end;
$$;

revoke all on function public.get_access_links(text) from public;
revoke all on function public.create_access_link(text, text, text, timestamptz) from public;
revoke all on function public.update_access_link(text, text, timestamptz, boolean) from public;
revoke all on function public.set_access_grant(text, bigint, boolean) from public;
grant execute on function public.get_access_links(text) to anon;
grant execute on function public.create_access_link(text, text, text, timestamptz) to anon;
grant execute on function public.update_access_link(text, text, timestamptz, boolean) to anon;
grant execute on function public.set_access_grant(text, bigint, boolean) to anon;

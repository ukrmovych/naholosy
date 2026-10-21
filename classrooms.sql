-- «Мій клас»: учні об'єднуються в клас (6-значний код / посилання / QR) і мають свою турнірну таблицю.
-- classrooms — класи; classroom_members — хто в класі (ідентифікатор пристрою + ім'я);
-- classroom_scores — найкращий результат учня в кожній грі. Усе — через функції нижче (гра ходить з anon-ключем).
-- Для сторінки статистики (вкладка «Класи») — get_classrooms_admin з паролем статистики.
-- Вихід / виключення учня — позначка active = false (не видалення: Supabase-конектор не дає запускати delete без підтвердження).
-- Повторний запуск нічого не зламає.

create table if not exists public.classrooms (
  code text primary key check (code ~ '^[0-9]{6}$'),
  name text not null check (char_length(name) between 2 and 40),
  owner_player uuid not null,
  created_at timestamptz not null default now()
);

create table if not exists public.classroom_members (
  id bigint generated always as identity unique,   -- номер учасника (не секрет, на відміну від player_id)
  code text not null references public.classrooms(code) on delete cascade,
  player_id uuid not null,
  name text not null check (char_length(name) between 2 and 20),
  joined_at timestamptz not null default now(),
  primary key (code, player_id)
);
create index if not exists classroom_members_player_idx on public.classroom_members (player_id);
alter table public.classroom_members add column if not exists active boolean not null default true;

create table if not exists public.classroom_scores (
  code text not null,
  player_id uuid not null,
  game text not null check (char_length(game) <= 30),
  score integer not null check (score between 1 and 100000),
  updated_at timestamptz not null default now(),
  primary key (code, player_id, game),
  foreign key (code, player_id) references public.classroom_members(code, player_id) on delete cascade
);

alter table public.classrooms enable row level security;
alter table public.classroom_members enable row level security;
alter table public.classroom_scores enable row level security;
revoke all on public.classrooms, public.classroom_members, public.classroom_scores from anon, authenticated;

-- Ім'я без посилань і реклами (як у загальній таблиці)
create or replace function public.classroom_name_ok(p text, p_min int, p_max int)
returns boolean language sql immutable as $$
  select char_length(trim(coalesce(p, ''))) between p_min and p_max
     and trim(p) !~* '(https?:|www\.|t\.me|@|\.(com|net|org|ua|ru|io|me|site|online|shop)(\s|$))'
$$;

-- Створити клас: повертає 6-значний код
create or replace function public.create_classroom(p_player uuid, p_class text, p_name text)
returns text language plpgsql volatile security definer set search_path = public as $$
declare c text; tries int := 0;
begin
  if p_player is null or not classroom_name_ok(p_class, 2, 40) or not classroom_name_ok(p_name, 2, 20) then
    raise exception 'bad input';
  end if;
  if (select count(*) from classrooms where owner_player = p_player and created_at > now() - interval '1 day') >= 10 then
    raise exception 'too many';
  end if;
  loop
    c := lpad((floor(random() * 900000) + 100000)::int::text, 6, '0');
    exit when not exists (select 1 from classrooms where code = c);
    tries := tries + 1;
    if tries > 20 then raise exception 'no code'; end if;
  end loop;
  insert into classrooms (code, name, owner_player) values (c, trim(p_class), p_player);
  insert into classroom_members (code, player_id, name) values (c, p_player, trim(p_name));
  return c;
end;
$$;

-- Назва класу за кодом (щоб показати «Приєднатися до класу …?»)
create or replace function public.classroom_info(p_code text)
returns jsonb language sql stable security definer set search_path = public as $$
  select jsonb_build_object('code', code, 'name', name,
    'members', (select count(*) from classroom_members m where m.code = c.code and m.active))
  from classrooms c where code = p_code
$$;

-- Приєднатися (або змінити своє ім'я в класі; повертає учасника, який виходив)
create or replace function public.join_classroom(p_player uuid, p_code text, p_name text)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
begin
  if p_player is null or not classroom_name_ok(p_name, 2, 20) then raise exception 'bad input'; end if;
  if not exists (select 1 from classrooms where code = p_code) then raise exception 'notfound'; end if;
  if (select count(*) from classroom_members where code = p_code and active) >= 200
     and not exists (select 1 from classroom_members where code = p_code and player_id = p_player and active) then
    raise exception 'full';
  end if;
  insert into classroom_members (code, player_id, name) values (p_code, p_player, trim(p_name))
  on conflict (code, player_id) do update set name = excluded.name, active = true;
  return classroom_info(p_code);
end;
$$;

-- Вийти з класу (учень зникає з таблиці; якщо приєднається знову — результати повернуться)
create or replace function public.leave_classroom(p_player uuid, p_code text)
returns void language sql volatile security definer set search_path = public as $$
  update classroom_members set active = false where code = p_code and player_id = p_player
$$;

-- Творець класу прибирає учня (за номером учасника)
create or replace function public.kick_classroom_member(p_owner uuid, p_code text, p_member bigint)
returns void language plpgsql volatile security definer set search_path = public as $$
begin
  if not exists (select 1 from classrooms where code = p_code and owner_player = p_owner) then raise exception 'not owner'; end if;
  update classroom_members set active = false where code = p_code and id = p_member and player_id <> p_owner;
end;
$$;

-- Мої класи
create or replace function public.my_classrooms(p_player uuid)
returns jsonb language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'code', c.code, 'name', c.name, 'my_name', m.name, 'owner', c.owner_player = p_player,
    'members', (select count(*) from classroom_members x where x.code = c.code and x.active)
  ) order by m.joined_at), '[]'::jsonb)
  from classroom_members m join classrooms c using (code)
  where m.player_id = p_player and m.active
$$;

-- Таблиця класу в одній грі: усі учні (хто ще не грав — з null); лише для учасників класу
create or replace function public.classroom_table(p_player uuid, p_code text, p_game text)
returns jsonb language sql stable security definer set search_path = public as $$
  select coalesce(jsonb_agg(jsonb_build_object(
    'name', m.name, 'score', s.score, 'me', m.player_id = p_player
  ) order by s.score desc nulls last, s.updated_at, m.name), '[]'::jsonb)
  from classroom_members m
  left join classroom_scores s on s.code = m.code and s.player_id = m.player_id and s.game = p_game
  where m.code = p_code and m.active
    and exists (select 1 from classroom_members me where me.code = p_code and me.player_id = p_player and me.active)
$$;

-- Записати результат у всі класи гравця (лишається кращий)
create or replace function public.submit_classroom_score(p_player uuid, p_game text, p_score integer)
returns integer language plpgsql volatile security definer set search_path = public as $$
declare n integer;
begin
  if p_player is null or p_score is null or p_score < 1 or p_score > 100000 or char_length(p_game) > 30 then return 0; end if;
  insert into classroom_scores (code, player_id, game, score)
  select code, p_player, p_game, p_score from classroom_members where player_id = p_player and active
  on conflict (code, player_id, game) do update set
    score = greatest(classroom_scores.score, excluded.score),
    updated_at = case when excluded.score > classroom_scores.score then now() else classroom_scores.updated_at end;
  get diagnostics n = row_count;
  return n;
end;
$$;

-- Для сторінки статистики: усі класи, учасники й їхні результати
create or replace function public.get_classrooms_admin(p_password text)
returns jsonb language plpgsql volatile security definer set search_path = public as $$
begin
  if not stats_password_ok(p_password) then raise exception 'wrong password'; end if;
  return (
    select coalesce(jsonb_agg(jsonb_build_object(
      'code', c.code, 'name', c.name, 'created_at', c.created_at,
      'members', (select coalesce(jsonb_agg(jsonb_build_object(
          'id', m.id, 'name', m.name, 'joined_at', m.joined_at, 'owner', m.player_id = c.owner_player, 'active', m.active,
          'scores', (select coalesce(jsonb_object_agg(s.game, s.score), '{}'::jsonb)
                     from classroom_scores s where s.code = m.code and s.player_id = m.player_id)
        ) order by m.joined_at), '[]'::jsonb) from classroom_members m where m.code = c.code)
    ) order by c.created_at desc), '[]'::jsonb)
    from classrooms c
  );
end;
$$;

revoke all on function public.create_classroom(uuid, text, text) from public;
revoke all on function public.classroom_info(text) from public;
revoke all on function public.join_classroom(uuid, text, text) from public;
revoke all on function public.leave_classroom(uuid, text) from public;
revoke all on function public.kick_classroom_member(uuid, text, bigint) from public;
revoke all on function public.my_classrooms(uuid) from public;
revoke all on function public.classroom_table(uuid, text, text) from public;
revoke all on function public.submit_classroom_score(uuid, text, integer) from public;
revoke all on function public.get_classrooms_admin(text) from public;
grant execute on function public.create_classroom(uuid, text, text) to anon;
grant execute on function public.classroom_info(text) to anon;
grant execute on function public.join_classroom(uuid, text, text) to anon;
grant execute on function public.leave_classroom(uuid, text) to anon;
grant execute on function public.my_classrooms(uuid) to anon;
grant execute on function public.classroom_table(uuid, text, text) to anon;
grant execute on function public.submit_classroom_score(uuid, text, integer) to anon;
grant execute on function public.get_classrooms_admin(text) to anon;

-- Творці класів учнів НЕ прибирають (власник так вирішив): kick_classroom_member закрито для гри.
revoke execute on function public.kick_classroom_member(uuid, text, bigint) from anon, public;

-- Власник (сторінка статистики): прибрати / повернути будь-якого учасника будь-якого класу
create or replace function public.set_classroom_member_admin(p_password text, p_member bigint, p_active boolean)
returns void language plpgsql volatile security definer set search_path = public as $$
begin
  if not stats_password_ok(p_password) then raise exception 'wrong password'; end if;
  update classroom_members set active = p_active where id = p_member;
end;
$$;
revoke all on function public.set_classroom_member_admin(text, bigint, boolean) from public;
grant execute on function public.set_classroom_member_admin(text, bigint, boolean) to anon;

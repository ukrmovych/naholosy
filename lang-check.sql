-- Заборона російської в назвах класів та іменах учнів класу (власник: «українською або латиницею»).
-- Те саме правило, що й у грі (script.js → russianProblem): букви ы э ъ ё або типові російські слова («и», «его», «что»…).
-- is_russian_text(текст) → true, якщо текст схожий на російський.
-- create_classroom / join_classroom — як у classrooms.sql, плюс перевірка мови (помилка 'lang').
-- Повторний запуск нічого не ламає.

create or replace function public.is_russian_text(p text)
returns boolean language sql immutable set search_path = public as $$
  select coalesce(p, '') ~* '[ыэъё]'
    or regexp_split_to_array(lower(coalesce(p, '')), '[^а-яіїєґa-z''’ʼ]+') && array[
      'и','его','ее','что','чтобы','кто','как','или','этот','эта','эти','они','она','оно','мой','мои','твой','твои','свой','свои','наши','ваши','лучший','лучшая','лучшие','самый','самая','самые','класс','друзья','привет','пока','спасибо','очень','тоже','только','нет','где','здесь','сейчас','хорошо','игра','ученики','ребята','сегодня','всем','какой','еще','меня','тебя','себя']
$$;

create or replace function public.create_classroom(p_player uuid, p_class text, p_name text)
 returns text language plpgsql security definer set search_path to 'public' as $function$
declare c text; tries int := 0;
begin
  if p_player is null or not classroom_name_ok(p_class, 2, 40) or not classroom_name_ok(p_name, 2, 20) then
    raise exception 'bad input';
  end if;
  if is_russian_text(p_class) or is_russian_text(p_name) then raise exception 'lang'; end if;
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
$function$;

create or replace function public.join_classroom(p_player uuid, p_code text, p_name text)
 returns jsonb language plpgsql security definer set search_path to 'public' as $function$
begin
  if p_player is null or not classroom_name_ok(p_name, 2, 20) then raise exception 'bad input'; end if;
  if is_russian_text(p_name) then raise exception 'lang'; end if;
  if not exists (select 1 from classrooms where code = p_code) then raise exception 'notfound'; end if;
  if (select count(*) from classroom_members where code = p_code and active) >= 200
     and not exists (select 1 from classroom_members where code = p_code and player_id = p_player and active) then
    raise exception 'full';
  end if;
  insert into classroom_members (code, player_id, name) values (p_code, p_player, trim(p_name))
  on conflict (code, player_id) do update set name = excluded.name, active = true;
  return classroom_info(p_code);
end;
$function$;

-- Турнірна таблиця: дозволити результати гри «Кличний відмінок».
-- Виконати ОДИН РАЗ у Supabase: SQL Editor → New query → вставити → Run.
-- Повторний запуск нічого не зламає.

alter table public.scores drop constraint if exists game_known;
alter table public.scores
  add constraint game_known check (game in ('naholosy', 'leksychna', 'klychnyi'));

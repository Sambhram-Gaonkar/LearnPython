create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  created_at timestamp with time zone default now()
);

create table if not exists public.roadmap_days (
  id uuid primary key default gen_random_uuid(),
  day_number int not null unique,
  title text not null,
  description text not null,
  learning_objectives text[],
  estimated_time text,
  created_at timestamp with time zone default now()
);

create table if not exists public.exercises (
  id uuid primary key default gen_random_uuid(),
  day_id uuid references public.roadmap_days(id) on delete cascade,
  title text not null,
  problem_statement text not null,
  starter_code text,
  expected_output text,
  difficulty text default 'Easy' check (difficulty in ('Easy', 'Medium', 'Hard')),
  hints text[],
  created_at timestamp with time zone default now()
);

create table if not exists public.user_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  day_id uuid references public.roadmap_days(id) on delete cascade,
  exercise_id uuid references public.exercises(id) on delete cascade,
  code text,
  output text,
  is_completed boolean default false,
  updated_at timestamp with time zone default now(),
  constraint user_progress_user_exercise_unique unique (user_id, exercise_id)
);

create or replace function public.update_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_user_progress_updated_at on public.user_progress;
create trigger set_user_progress_updated_at
before update on public.user_progress
for each row execute function public.update_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name')
  on conflict (id) do update
  set email = excluded.email,
      full_name = excluded.full_name;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

alter table public.profiles enable row level security;
alter table public.roadmap_days enable row level security;
alter table public.exercises enable row level security;
alter table public.user_progress enable row level security;

grant usage on schema public to authenticated;
grant select on public.roadmap_days to authenticated;
grant select on public.exercises to authenticated;
grant select, insert, update on public.user_progress to authenticated;
grant select, update on public.profiles to authenticated;

drop policy if exists "Profiles are readable by owner" on public.profiles;
create policy "Profiles are readable by owner"
on public.profiles for select
to authenticated
using (auth.uid() = id);

drop policy if exists "Profiles are updatable by owner" on public.profiles;
create policy "Profiles are updatable by owner"
on public.profiles for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);

drop policy if exists "Authenticated users can read roadmap days" on public.roadmap_days;
create policy "Authenticated users can read roadmap days"
on public.roadmap_days for select
to authenticated
using (true);

drop policy if exists "Authenticated users can read exercises" on public.exercises;
create policy "Authenticated users can read exercises"
on public.exercises for select
to authenticated
using (true);

drop policy if exists "Users can read own progress" on public.user_progress;
create policy "Users can read own progress"
on public.user_progress for select
to authenticated
using (auth.uid() = user_id);

drop policy if exists "Users can insert own progress" on public.user_progress;
create policy "Users can insert own progress"
on public.user_progress for insert
to authenticated
with check (auth.uid() = user_id);

drop policy if exists "Users can update own progress" on public.user_progress;
create policy "Users can update own progress"
on public.user_progress for update
to authenticated
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create index if not exists exercises_day_id_idx on public.exercises(day_id);
create index if not exists user_progress_user_id_idx on public.user_progress(user_id);
create index if not exists user_progress_day_id_idx on public.user_progress(day_id);

update public.exercises
set starter_code = replace(starter_code, '\n', chr(10))
where starter_code like '%\n%';

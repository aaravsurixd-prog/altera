-- ==============================================================================
-- ALTERA DATABASE SCHEMA
-- "Become more than one possibility."
-- High-performance relational schema with strict Row Level Security (RLS)
-- ==============================================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ------------------------------------------------------------------------------
-- 1. PROFILES TABLE
-- ------------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text,
  avatar_url text,
  headline text default 'Explorer of Possibilities',
  bio text,
  current_role text,
  location text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- ------------------------------------------------------------------------------
-- 2. ONBOARDING PROFILES TABLE
-- ------------------------------------------------------------------------------
create table if not exists public.onboarding_profiles (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade unique not null,
  core_values text[] default '{}',
  primary_interests text[] default '{}',
  top_skills text[] default '{}',
  life_aspirations text[] default '{}',
  risk_tolerance text default 'balanced',
  horizon_years integer default 5,
  decision_style text default 'analytical-intuitive',
  completed boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.onboarding_profiles enable row level security;

create policy "Users can manage own onboarding profile"
  on public.onboarding_profiles for all
  using (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 3. SECOND SELF MEMORIES TABLE
-- ------------------------------------------------------------------------------
create table if not exists public.second_self_memories (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  category text not null check (category in ('values', 'beliefs', 'work_style', 'relationships', 'experiences', 'ambitions')),
  title text not null,
  content text not null,
  confidence_score numeric(3, 2) default 0.95,
  privacy_level text default 'active' check (privacy_level in ('active', 'locked', 'quarantined')),
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.second_self_memories enable row level security;

create policy "Users can manage own memories"
  on public.second_self_memories for all
  using (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 4. SECOND SELF CHATS & MESSAGES
-- ------------------------------------------------------------------------------
create table if not exists public.second_self_chats (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  title text not null default 'New Inquiry',
  model_used text default 'altera-synthesis-v2',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.second_self_chats enable row level security;

create policy "Users can manage own chats"
  on public.second_self_chats for all
  using (auth.uid() = user_id);

create table if not exists public.second_self_messages (
  id uuid default uuid_generate_v4() primary key,
  chat_id uuid references public.second_self_chats on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  role text not null check (role in ('user', 'assistant', 'system')),
  content text not null,
  reflection_notes text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.second_self_messages enable row level security;

create policy "Users can manage own chat messages"
  on public.second_self_messages for all
  using (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 5. FUTURE DECISIONS & SCENARIOS
-- ------------------------------------------------------------------------------
create table if not exists public.future_decisions (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  dilemma_title text not null,
  context_description text not null,
  time_horizon text default '3-5 years',
  core_tradeoff text,
  tags text[] default '{}',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.future_decisions enable row level security;

create policy "Users can manage own future decisions"
  on public.future_decisions for all
  using (auth.uid() = user_id);

create table if not exists public.future_scenarios (
  id uuid default uuid_generate_v4() primary key,
  decision_id uuid references public.future_decisions on delete cascade not null,
  user_id uuid references auth.users on delete cascade not null,
  scenario_code text not null,
  title text not null,
  description text not null,
  possibility_archetype text not null,
  opportunities text[] default '{}',
  tradeoffs text[] default '{}',
  systemic_challenges text[] default '{}',
  critical_skills text[] default '{}',
  milestones jsonb default '[]'::jsonb,
  metrics jsonb default '{"growth": 75, "risk": 40, "autonomy": 85, "balance": 65, "impact": 80}'::jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.future_scenarios enable row level security;

create policy "Users can manage own future scenarios"
  on public.future_scenarios for all
  using (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 6. TIMELINE MILESTONES
-- ------------------------------------------------------------------------------
create table if not exists public.timeline_milestones (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users on delete cascade not null,
  scenario_id uuid references public.future_scenarios on delete set null,
  title text not null,
  description text,
  target_timeframe text not null,
  category text not null default 'career',
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'achieved')),
  progress_pct integer default 0,
  due_date date,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

alter table public.timeline_milestones enable row level security;

create policy "Users can manage own timeline milestones"
  on public.timeline_milestones for all
  using (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 7. AUTOMATIC USER CREATION TRIGGER
-- ------------------------------------------------------------------------------
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', 'Explorer'),
    coalesce(new.raw_user_meta_data->>'avatar_url', '')
  );

  insert into public.onboarding_profiles (user_id)
  values (new.id);

  return new;
end;
$$ language plpgsql security definer;

-- Trigger execution on auth.users insert
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

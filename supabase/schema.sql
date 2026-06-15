-- Run this once in your shared Supabase project.
-- Each client gets a row in `clients` and all other tables
-- are scoped to that client via client_id + RLS.

create table if not exists clients (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  user_id uuid references auth.users(id) on delete cascade,
  created_at timestamptz default now()
);

create table if not exists hours (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade not null,
  days text not null,
  open text not null,
  close text not null,
  sort_order integer default 0
);

create table if not exists menu_categories (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade not null,
  name text not null,
  sort_order integer default 0
);

create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade not null,
  category_id uuid references menu_categories(id) on delete cascade not null,
  name text not null,
  price text not null,
  dietary text[] default '{}',
  sort_order integer default 0
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade not null,
  slug text not null,
  title text not null,
  excerpt text not null,
  content text not null,
  published_at date not null default now(),
  created_at timestamptz default now(),
  unique(client_id, slug)
);

create table if not exists faq_items (
  id uuid primary key default gen_random_uuid(),
  client_id uuid references clients(id) on delete cascade not null,
  question text not null,
  answer text not null,
  sort_order integer default 0
);

-- Row level security: each client's user can only access their own data
alter table clients enable row level security;
alter table hours enable row level security;
alter table menu_categories enable row level security;
alter table menu_items enable row level security;
alter table blog_posts enable row level security;
alter table faq_items enable row level security;

create policy "clients: own row" on clients
  for all using (user_id = auth.uid());

create policy "hours: own client" on hours
  for all using (
    client_id in (select id from clients where user_id = auth.uid())
  );

create policy "menu_categories: own client" on menu_categories
  for all using (
    client_id in (select id from clients where user_id = auth.uid())
  );

create policy "menu_items: own client" on menu_items
  for all using (
    client_id in (select id from clients where user_id = auth.uid())
  );

create policy "blog_posts: own client" on blog_posts
  for all using (
    client_id in (select id from clients where user_id = auth.uid())
  );

create policy "faq_items: own client" on faq_items
  for all using (
    client_id in (select id from clients where user_id = auth.uid())
  );

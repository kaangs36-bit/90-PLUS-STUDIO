create table if not exists public.studio_youtube_connections (
  workspace_id uuid primary key references public.studio_workspaces(id) on delete cascade,
  connected_by uuid not null references auth.users(id) on delete cascade,
  channel_id text not null,
  channel_title text,
  channel_avatar_url text,
  subscriber_count bigint not null default 0,
  refresh_token_cipher text not null,
  scope text,
  connected_at timestamptz not null default now(),
  last_synced_at timestamptz,
  last_error text,
  updated_at timestamptz not null default now()
);

alter table public.studio_youtube_connections enable row level security;

revoke all on table public.studio_youtube_connections from public, anon, authenticated;
grant all on table public.studio_youtube_connections to service_role;

comment on table public.studio_youtube_connections is
  'Encrypted YouTube OAuth refresh tokens; accessible only by the service-role Edge Function.';

create extension if not exists pgcrypto;

create table if not exists public.studio_workspaces (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  join_code text not null unique check (char_length(join_code)=6),
  owner_id uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);
create table if not exists public.studio_members (
  workspace_id uuid not null references public.studio_workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  display_name text not null default 'Üye',
  role text not null default 'editor' check(role in ('owner','editor')),
  created_at timestamptz not null default now(),
  primary key(workspace_id,user_id)
);
create table if not exists public.studio_workspace_state (
  workspace_id uuid primary key references public.studio_workspaces(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_by uuid not null references auth.users(id),
  updated_at timestamptz not null default now()
);
create table if not exists public.studio_ai_usage (
  id bigint generated always as identity primary key,
  workspace_id uuid not null references public.studio_workspaces(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  operation text not null default 'chat',
  created_at timestamptz not null default now()
);

alter table public.studio_workspaces enable row level security;
alter table public.studio_members enable row level security;
alter table public.studio_workspace_state enable row level security;
alter table public.studio_ai_usage enable row level security;

create policy "studio owners create workspaces" on public.studio_workspaces for insert to authenticated with check(owner_id=(select auth.uid()));
create policy "studio members view workspaces" on public.studio_workspaces for select to authenticated using(owner_id=(select auth.uid()) or exists(select 1 from public.studio_members m where m.workspace_id=id and m.user_id=(select auth.uid())));
create policy "studio owners update workspaces" on public.studio_workspaces for update to authenticated using(owner_id=(select auth.uid())) with check(owner_id=(select auth.uid()));
create policy "studio owners delete workspaces" on public.studio_workspaces for delete to authenticated using(owner_id=(select auth.uid()));
create policy "studio users view memberships" on public.studio_members for select to authenticated using(user_id=(select auth.uid()));
create policy "studio owner creates first membership" on public.studio_members for insert to authenticated with check(user_id=(select auth.uid()) and exists(select 1 from public.studio_workspaces w where w.id=workspace_id and w.owner_id=(select auth.uid())));
create policy "studio workspace state select" on public.studio_workspace_state for select to authenticated using(exists(select 1 from public.studio_members m where m.workspace_id=studio_workspace_state.workspace_id and m.user_id=(select auth.uid())));
create policy "studio workspace state insert" on public.studio_workspace_state for insert to authenticated with check(exists(select 1 from public.studio_members m where m.workspace_id=studio_workspace_state.workspace_id and m.user_id=(select auth.uid())) and updated_by=(select auth.uid()));
create policy "studio workspace state update" on public.studio_workspace_state for update to authenticated using(exists(select 1 from public.studio_members m where m.workspace_id=studio_workspace_state.workspace_id and m.user_id=(select auth.uid()))) with check(exists(select 1 from public.studio_members m where m.workspace_id=studio_workspace_state.workspace_id and m.user_id=(select auth.uid())) and updated_by=(select auth.uid()));
create policy "studio usage own workspace" on public.studio_ai_usage for select to authenticated using(exists(select 1 from public.studio_members m where m.workspace_id=studio_ai_usage.workspace_id and m.user_id=(select auth.uid())));
create policy "studio usage insert own" on public.studio_ai_usage for insert to authenticated with check(user_id=(select auth.uid()) and exists(select 1 from public.studio_members m where m.workspace_id=studio_ai_usage.workspace_id and m.user_id=(select auth.uid())));

create or replace function public.studio_join_workspace(invite_code text, member_name text)
returns uuid language plpgsql security definer set search_path='' as $$
declare wid uuid;
begin
  if (select auth.uid()) is null then raise exception 'Giriş gerekli'; end if;
  select id into wid from public.studio_workspaces where join_code=upper(trim(invite_code));
  if wid is null then raise exception 'Ekip kodu bulunamadı'; end if;
  insert into public.studio_members(workspace_id,user_id,display_name,role)
  values(wid,(select auth.uid()),left(coalesce(nullif(trim(member_name),''),'Üye'),60),'editor')
  on conflict(workspace_id,user_id) do nothing;
  return wid;
end;$$;
revoke all on function public.studio_join_workspace(text,text) from public,anon;
grant execute on function public.studio_join_workspace(text,text) to authenticated;

insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values('studio-media','studio-media',false,104857600,array['image/jpeg','image/png','image/webp','video/mp4','video/webm','audio/mpeg','audio/mp4','audio/wav'])
on conflict(id) do nothing;
create policy "studio media read" on storage.objects for select to authenticated using(bucket_id='studio-media' and exists(select 1 from public.studio_members m where m.workspace_id=((storage.foldername(name))[1])::uuid and m.user_id=(select auth.uid())));
create policy "studio media insert" on storage.objects for insert to authenticated with check(bucket_id='studio-media' and exists(select 1 from public.studio_members m where m.workspace_id=((storage.foldername(name))[1])::uuid and m.user_id=(select auth.uid())));
create policy "studio media update" on storage.objects for update to authenticated using(bucket_id='studio-media' and exists(select 1 from public.studio_members m where m.workspace_id=((storage.foldername(name))[1])::uuid and m.user_id=(select auth.uid()))) with check(bucket_id='studio-media' and exists(select 1 from public.studio_members m where m.workspace_id=((storage.foldername(name))[1])::uuid and m.user_id=(select auth.uid())));
create policy "studio media delete" on storage.objects for delete to authenticated using(bucket_id='studio-media' and exists(select 1 from public.studio_members m where m.workspace_id=((storage.foldername(name))[1])::uuid and m.user_id=(select auth.uid())));

grant select,insert,update,delete on public.studio_workspaces,public.studio_members,public.studio_workspace_state,public.studio_ai_usage to authenticated;
grant usage,select on sequence public.studio_ai_usage_id_seq to authenticated;
alter publication supabase_realtime add table public.studio_workspace_state;

-- 90+ Studio v2: workspace creation and media security repair.
insert into public.studio_members(workspace_id,user_id,display_name,role)
select w.id,w.owner_id,coalesce(nullif(u.raw_user_meta_data->>'name',''),split_part(u.email,'@',1),'Kullanıcı'),'owner'
from public.studio_workspaces w join auth.users u on u.id=w.owner_id
where not exists(select 1 from public.studio_members m where m.workspace_id=w.id and m.user_id=w.owner_id)
on conflict do nothing;

create or replace function public.studio_is_workspace_member(target_workspace_id uuid)
returns boolean language sql stable security definer set search_path=''
as $$
  select exists(select 1 from public.studio_members m where m.workspace_id=target_workspace_id and m.user_id=auth.uid())
      or exists(select 1 from public.studio_workspaces w where w.id=target_workspace_id and w.owner_id=auth.uid());
$$;
revoke all on function public.studio_is_workspace_member(uuid) from public;
grant execute on function public.studio_is_workspace_member(uuid) to authenticated;

create or replace function public.studio_create_workspace(workspace_name text default '90+ Futbol')
returns public.studio_workspaces language plpgsql security definer set search_path=''
as $$
declare created public.studio_workspaces; user_name text; new_code text;
begin
  if auth.uid() is null then raise exception 'Oturum gerekli'; end if;
  select coalesce(nullif(raw_user_meta_data->>'name',''),split_part(email,'@',1),'Kullanıcı') into user_name from auth.users where id=auth.uid();
  loop
    new_code := upper(substr(replace(gen_random_uuid()::text,'-',''),1,6));
    exit when not exists(select 1 from public.studio_workspaces where join_code=new_code);
  end loop;
  insert into public.studio_workspaces(name,join_code,owner_id) values(coalesce(nullif(trim(workspace_name),''),'90+ Futbol'),new_code,auth.uid()) returning * into created;
  insert into public.studio_members(workspace_id,user_id,display_name,role) values(created.id,auth.uid(),user_name,'owner') on conflict do nothing;
  insert into public.studio_workspace_state(workspace_id,data,updated_by) values(created.id,'{}'::jsonb,auth.uid()) on conflict do nothing;
  return created;
end;
$$;
revoke all on function public.studio_create_workspace(text) from public;
grant execute on function public.studio_create_workspace(text) to authenticated;

drop policy if exists "studio media read" on storage.objects;
drop policy if exists "studio media insert" on storage.objects;
drop policy if exists "studio media update" on storage.objects;
drop policy if exists "studio media delete" on storage.objects;
create policy "studio media read" on storage.objects for select to authenticated using (bucket_id='studio-media' and public.studio_is_workspace_member(((storage.foldername(name))[1])::uuid));
create policy "studio media insert" on storage.objects for insert to authenticated with check (bucket_id='studio-media' and public.studio_is_workspace_member(((storage.foldername(name))[1])::uuid));
create policy "studio media update" on storage.objects for update to authenticated using (bucket_id='studio-media' and public.studio_is_workspace_member(((storage.foldername(name))[1])::uuid)) with check (bucket_id='studio-media' and public.studio_is_workspace_member(((storage.foldername(name))[1])::uuid));
create policy "studio media delete" on storage.objects for delete to authenticated using (bucket_id='studio-media' and public.studio_is_workspace_member(((storage.foldername(name))[1])::uuid));

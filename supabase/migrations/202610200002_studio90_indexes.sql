create index if not exists studio_workspaces_owner_idx on public.studio_workspaces(owner_id);
create index if not exists studio_members_user_idx on public.studio_members(user_id);
create index if not exists studio_state_updated_by_idx on public.studio_workspace_state(updated_by);
create index if not exists studio_usage_workspace_idx on public.studio_ai_usage(workspace_id,created_at desc);
create index if not exists studio_usage_user_idx on public.studio_ai_usage(user_id);

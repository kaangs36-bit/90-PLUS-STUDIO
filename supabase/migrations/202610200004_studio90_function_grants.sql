-- Remove anonymous access accidentally retained by Supabase's default function grants.
revoke all on function public.studio_create_workspace(text) from public, anon;
revoke all on function public.studio_is_workspace_member(uuid) from public, anon;
grant execute on function public.studio_create_workspace(text) to authenticated;
grant execute on function public.studio_is_workspace_member(uuid) to authenticated;

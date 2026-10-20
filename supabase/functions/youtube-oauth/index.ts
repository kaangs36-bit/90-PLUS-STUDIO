import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.78.0";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Content-Type": "application/json",
};
const encoder = new TextEncoder();
const decoder = new TextDecoder();
const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const SERVICE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID") || "";
const CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET") || "";
const STATE_SECRET = Deno.env.get("YOUTUBE_OAUTH_STATE_SECRET") || "";
const CALLBACK_URL = SUPABASE_URL + "/functions/v1/youtube-oauth";
const APP_REDIRECT = "studio90://youtube-connected";
const SCOPES = [
  "https://www.googleapis.com/auth/youtube.readonly",
  "https://www.googleapis.com/auth/yt-analytics.readonly",
];

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: cors });
const b64url = (bytes: Uint8Array) =>
  btoa(String.fromCharCode(...bytes)).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
const fromB64url = (value: string) => {
  const normalized = value.replaceAll("-", "+").replaceAll("_", "/");
  const padded = normalized + "=".repeat((4 - normalized.length % 4) % 4);
  return Uint8Array.from(atob(padded), (c) => c.charCodeAt(0));
};
async function hmac(value: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(STATE_SECRET), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return b64url(new Uint8Array(await crypto.subtle.sign("HMAC", key, encoder.encode(value))));
}
async function makeState(payload: Record<string, unknown>) {
  const data = b64url(encoder.encode(JSON.stringify(payload)));
  return data + "." + await hmac(data);
}
async function readState(value: string) {
  const [data, signature] = value.split(".");
  if (!data || !signature) throw new Error("OAuth doğrulaması geçersiz.");
  const expected = encoder.encode(await hmac(data));
  const received = encoder.encode(signature);
  if (expected.length !== received.length) throw new Error("OAuth doğrulaması geçersiz.");
  let mismatch = 0;
  for (let index = 0; index < expected.length; index += 1) mismatch |= expected[index] ^ received[index];
  if (mismatch !== 0) throw new Error("OAuth doğrulaması geçersiz.");
  const payload = JSON.parse(decoder.decode(fromB64url(data)));
  if (!payload.exp || Date.now() > payload.exp) throw new Error("OAuth bağlantısının süresi doldu.");
  return payload;
}
async function cipherKey() {
  const raw = await crypto.subtle.digest("SHA-256", encoder.encode(STATE_SECRET + CLIENT_SECRET));
  return crypto.subtle.importKey("raw", raw, "AES-GCM", false, ["encrypt", "decrypt"]);
}
async function encryptToken(value: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encrypted = new Uint8Array(await crypto.subtle.encrypt({ name: "AES-GCM", iv }, await cipherKey(), encoder.encode(value)));
  return b64url(iv) + "." + b64url(encrypted);
}
async function decryptToken(value: string) {
  const [iv, encrypted] = value.split(".");
  const clear = await crypto.subtle.decrypt({ name: "AES-GCM", iv: fromB64url(iv) }, await cipherKey(), fromB64url(encrypted));
  return decoder.decode(clear);
}
function configured() {
  return Boolean(CLIENT_ID && CLIENT_SECRET && STATE_SECRET);
}
async function currentUser(req: Request) {
  const auth = req.headers.get("Authorization");
  if (!auth) throw new Error("Oturum gerekli.");
  const client = createClient(SUPABASE_URL, ANON_KEY, { global: { headers: { Authorization: auth } } });
  const { data: { user }, error } = await client.auth.getUser(auth.replace("Bearer ", ""));
  if (error || !user) throw new Error("Oturum geçersiz.");
  return { user, client };
}
async function assertMember(client: ReturnType<typeof createClient>, workspaceId: string, userId: string) {
  const { data } = await client.from("studio_members").select("role").eq("workspace_id", workspaceId).eq("user_id", userId).maybeSingle();
  if (!data) throw new Error("Bu çalışma alanına erişiminiz yok.");
}
async function refreshAccessToken(refreshToken: string) {
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: CLIENT_ID, client_secret: CLIENT_SECRET, refresh_token: refreshToken, grant_type: "refresh_token" }),
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) throw new Error(data.error_description || data.error || "Google erişim anahtarı yenilenemedi.");
  return data.access_token as string;
}
async function googleJson(url: string, accessToken: string) {
  const response = await fetch(url, { headers: { Authorization: "Bearer " + accessToken } });
  const data = await response.json();
  if (!response.ok) throw new Error(data?.error?.message || "YouTube verisi alınamadı.");
  return data;
}
function dateBefore(days: number) {
  const date = new Date();
  date.setUTCDate(date.getUTCDate() - days);
  return date.toISOString().slice(0, 10);
}
async function report(accessToken: string, days: number, subscribers: number) {
  const params = new URLSearchParams({
    ids: "channel==MINE",
    startDate: dateBefore(days),
    endDate: new Date().toISOString().slice(0, 10),
    metrics: "views,estimatedMinutesWatched,averageViewPercentage,subscribersGained,subscribersLost",
  });
  const data = await googleJson("https://youtubeanalytics.googleapis.com/v2/reports?" + params, accessToken);
  const values = data.rows?.[0] || [0, 0, 0, 0, 0];
  return {
    period: days === 365 ? "Son 1 yıl" : `Son ${days} gün`,
    days,
    views: Number(values[0] || 0),
    hours: Math.round(Number(values[1] || 0) / 6) / 10,
    retention: Math.round(Number(values[2] || 0) * 10) / 10,
    subscribers,
    subs: subscribers,
    subscribersGained: Number(values[3] || 0),
    subscribersLost: Number(values[4] || 0),
    ctr: 0,
    source: "youtube",
    updatedAt: new Date().toISOString(),
  };
}
function callbackHtml(status: "success" | "error", message: string) {
  const safeMessage = message.replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
  const deepLink = APP_REDIRECT + "?status=" + status + "&message=" + encodeURIComponent(message);
  return new Response(`<!doctype html><html lang="tr"><meta name="viewport" content="width=device-width"><style>body{font-family:system-ui;background:#071a2e;color:#fff;display:grid;place-items:center;min-height:100vh;margin:0;text-align:center}.c{padding:28px;max-width:420px}.logo{font-size:64px;font-weight:900}.g{color:#24e37a}a{display:block;background:#24e37a;color:#042116;padding:15px 22px;border-radius:14px;text-decoration:none;font-weight:800;margin-top:22px}</style><div class="c"><div class="logo">90<span class="g">+</span></div><h1>${status === "success" ? "YouTube bağlandı" : "Bağlantı kurulamadı"}</h1><p>${safeMessage}</p><a href="${deepLink}">90+ Studio’ya dön</a></div><script>location.href=${JSON.stringify(deepLink)}</script></html>`, { headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" } });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  try {
    const url = new URL(req.url);
    if (req.method === "GET" && url.searchParams.has("error")) {
      return callbackHtml("error", url.searchParams.get("error_description") || "Google erişim izni verilmedi.");
    }
    if (req.method === "GET" && url.searchParams.has("code")) {
      if (!configured()) return callbackHtml("error", "Google OAuth bilgileri henüz eklenmedi.");
      const payload = await readState(url.searchParams.get("state") || "");
      const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ code: url.searchParams.get("code")!, client_id: CLIENT_ID, client_secret: CLIENT_SECRET, redirect_uri: CALLBACK_URL, grant_type: "authorization_code" }),
      });
      const tokens = await tokenResponse.json();
      if (!tokenResponse.ok || !tokens.refresh_token) throw new Error(tokens.error_description || "Google yenileme anahtarı alınamadı. Erişimi kaldırıp tekrar deneyin.");
      const channelData = await googleJson("https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true", tokens.access_token);
      const channel = channelData.items?.[0];
      if (!channel) throw new Error("Bu Google hesabında bir YouTube kanalı bulunamadı.");
      const admin = createClient(SUPABASE_URL, SERVICE_KEY);
      const { data: membership } = await admin.from("studio_members").select("user_id").eq("workspace_id", payload.workspaceId).eq("user_id", payload.userId).maybeSingle();
      if (!membership) throw new Error("Çalışma alanı üyeliği artık geçerli değil.");
      const { error } = await admin.from("studio_youtube_connections").upsert({
        workspace_id: payload.workspaceId,
        connected_by: payload.userId,
        channel_id: channel.id,
        channel_title: channel.snippet?.title,
        channel_avatar_url: channel.snippet?.thumbnails?.default?.url,
        subscriber_count: Number(channel.statistics?.subscriberCount || 0),
        refresh_token_cipher: await encryptToken(tokens.refresh_token),
        scope: tokens.scope,
        connected_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
        last_error: null,
      }, { onConflict: "workspace_id" });
      if (error) throw error;
      return callbackHtml("success", channel.snippet?.title + " kanalı başarıyla bağlandı.");
    }
    if (req.method !== "POST") return json({ error: "Desteklenmeyen istek." }, 405);
    const { user, client } = await currentUser(req);
    const body = await req.json();
    const workspaceId = String(body.workspaceId || "");
    if (!workspaceId) throw new Error("Çalışma alanı gerekli.");
    await assertMember(client, workspaceId, user.id);
    const admin = createClient(SUPABASE_URL, SERVICE_KEY);
    if (body.action === "start") {
      if (!configured()) throw new Error("Google OAuth kurulumu için Client ID ve Client Secret eklenmeli.");
      const state = await makeState({ workspaceId, userId: user.id, exp: Date.now() + 10 * 60_000, nonce: crypto.randomUUID() });
      const params = new URLSearchParams({ client_id: CLIENT_ID, redirect_uri: CALLBACK_URL, response_type: "code", scope: SCOPES.join(" "), access_type: "offline", prompt: "consent", include_granted_scopes: "true", state });
      return json({ url: "https://accounts.google.com/o/oauth2/v2/auth?" + params, callbackUrl: CALLBACK_URL });
    }
    const { data: connection } = await admin.from("studio_youtube_connections").select("*").eq("workspace_id", workspaceId).maybeSingle();
    if (body.action === "status") return json({ connected: Boolean(connection), channel: connection ? { id: connection.channel_id, title: connection.channel_title, avatar: connection.channel_avatar_url, subscribers: connection.subscriber_count, lastSyncedAt: connection.last_synced_at } : null });
    if (body.action === "disconnect") {
      await admin.from("studio_youtube_connections").delete().eq("workspace_id", workspaceId);
      return json({ connected: false });
    }
    if (body.action === "sync") {
      if (!configured() || !connection) throw new Error("Önce YouTube kanalını bağlayın.");
      try {
        const accessToken = await refreshAccessToken(await decryptToken(connection.refresh_token_cipher));
        const channelData = await googleJson("https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&mine=true", accessToken);
        const channel = channelData.items?.[0];
        const subscribers = Number(channel?.statistics?.subscriberCount || connection.subscriber_count || 0);
        const records = await Promise.all([7, 28, 90, 365].map((days) => report(accessToken, days, subscribers)));
        const now = new Date().toISOString();
        await admin.from("studio_youtube_connections").update({ subscriber_count: subscribers, channel_title: channel?.snippet?.title || connection.channel_title, channel_avatar_url: channel?.snippet?.thumbnails?.default?.url || connection.channel_avatar_url, last_synced_at: now, last_error: null, updated_at: now }).eq("workspace_id", workspaceId);
        return json({ connected: true, records, channel: { id: channel?.id || connection.channel_id, title: channel?.snippet?.title || connection.channel_title, avatar: channel?.snippet?.thumbnails?.default?.url || connection.channel_avatar_url, subscribers, lastSyncedAt: now } });
      } catch (error) {
        await admin.from("studio_youtube_connections").update({ last_error: error instanceof Error ? error.message : String(error), updated_at: new Date().toISOString() }).eq("workspace_id", workspaceId);
        throw error;
      }
    }
    return json({ error: "Geçersiz işlem." }, 400);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    const url = new URL(req.url);
    if (req.method === "GET") return callbackHtml("error", message);
    return json({ error: message }, 400);
  }
});


import "./style.css";
import { createClient } from "@supabase/supabase-js";
import { App as CapacitorApp } from "@capacitor/app";
import {
  createIcons,
  Home,
  LayoutDashboard,
  CalendarDays,
  Images,
  ChartNoAxesCombined,
  Bell,
  Plus,
  ArrowLeft,
  Search,
  Upload,
  Check,
  Clock3,
  Sparkles,
  Send,
  Lightbulb,
  FileVideo,
  MessageCircle,
  Settings,
  LogOut,
  Trash2,
  Users,
  WifiOff,
  Mail,
  LockKeyhole,
  Eye,
  RotateCcw,
  Link,
  Target,
  Camera,
  MoreVertical,
  Youtube,
  Copy,
} from "lucide";
import { SUPABASE_URL, SUPABASE_KEY } from "./config.js";

const sb = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: true, autoRefreshToken: true },
});
const $ = (s) => document.querySelector(s),
  app = $("#app");
const today = new Date();
const iso = (d) => new Date(d).toISOString().slice(0, 10);
const uid = () => crypto.randomUUID();
const escape = (s) =>
  String(s ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
      })[c],
  );
const baseState = () => ({
  version: 1,
  channel: {
    name: "90+ Futbol",
    style:
      "Sinematik çizgi roman estetiği, koyu lacivert, canlı yeşil vurgu, dramatik stadyum ışığı, güçlü kontrast",
    weeklyLong: 1,
    weeklyShorts: 6,
  },
  ideas: [
    {
      id: uid(),
      title: "Ramak kala Süper Lig transferleri",
      series: "Ramak Kala Transferler",
      score: 8,
      note: "Son anda bozulan transferlerin kısa hikâyeleri",
    },
    {
      id: uid(),
      title: "Prime Neymar mı Prime Hazard mı?",
      series: "90+ Karşılaştırma",
      score: 9,
      note: "5 kriterli 90+ skoru",
    },
  ],
  contents: [
    {
      id: uid(),
      title: "Adriano: İmparator’u Kim Bitirdi?",
      type: "Uzun Video",
      series: "Ne Oldu Bu Adama?",
      status: "Üretimde",
      progress: 65,
      due: iso(new Date(today.getTime() + 3 * 864e5)),
      owner: "Kaan",
      hook: "2004’te dünyanın en korkulan forvetiydi. Birkaç yıl sonra her şeyini kaybetti.",
      script:
        "Adriano’nun yükselişi yalnızca güçlü sol ayağının değil, zorlu bir çocukluktan çıkan olağanüstü iradenin hikâyesiydi…",
      checks: {
        research: true,
        sources: true,
        script: true,
        voice: false,
        visuals: true,
        edit: true,
        cover: false,
        publish: false,
      },
      scenes: [
        {
          id: uid(),
          no: 1,
          time: "00:00–00:12",
          title: "Giriş: Bir İmparatorun Doğuşu",
          narration: "Rio’nun sokaklarından dünyanın zirvesine…",
          prompt:
            "Brezilya futbolunun sokak kültürü, sinematik gün batımı, dramatik ışık",
          status: "Hazır",
        },
        {
          id: uid(),
          no: 2,
          time: "00:12–01:20",
          title: "Avrupa’ya Yükseliş",
          narration: "Inter’de patlama yapan bir yetenek…",
          prompt:
            "Avrupa stadyum tüneli, arkadan futbolcu silüeti, mavi tonlar",
          status: "Hazır",
        },
        {
          id: uid(),
          no: 3,
          time: "01:20–03:10",
          title: "Zirve ve Düşüş",
          narration: "Her şey çok hızlı değişti…",
          prompt:
            "Yalnız futbolcu, karanlık oda, tek ışık, melankolik atmosfer",
          status: "Eksik",
        },
      ],
    },
    {
      id: uid(),
      title: "10 Unutulmaz Frikik Anı",
      type: "Shorts",
      series: "90+ Karşılaştırma",
      status: "Kontrol",
      progress: 80,
      due: iso(new Date(today.getTime() + 2 * 864e5)),
      owner: "Kuzen",
      hook: "Bu frikik açısı imkânsız görünüyordu.",
      script: "",
      checks: {
        research: true,
        sources: true,
        script: true,
        voice: true,
        visuals: true,
        edit: true,
        cover: false,
        publish: false,
      },
      scenes: [],
    },
  ],
  tasks: [
    {
      id: uid(),
      title: "Adriano ses kaydı",
      day: 2,
      time: "11:00",
      owner: "Kaan",
      done: false,
    },
    {
      id: uid(),
      title: "Shorts görsel üretimi",
      day: 3,
      time: "10:00",
      owner: "Kuzen",
      done: false,
    },
    {
      id: uid(),
      title: "Uzun video montajı",
      day: 4,
      time: "15:00",
      owner: "Kaan",
      done: false,
    },
    {
      id: uid(),
      title: "Adriano yayını",
      day: 5,
      time: "19:00",
      owner: "Ortak",
      done: false,
      publish: true,
    },
  ],
  media: [],
  trash: [],
  comments: [],
  sources: [],
  goals: { subscribers: 10000, views: 500000, longVideos: 4, shorts: 24 },
  analyticsHistory: [
    {
      period: "Önceki 28 gün",
      views: 106300,
      subs: 3740,
      hours: 9840,
      ctr: 5.7,
      retention: 41,
    },
    {
      period: "Son 28 gün",
      views: 125400,
      subs: 4200,
      hours: 12600,
      ctr: 6.4,
      retention: 47,
    },
  ],
  analytics: [
    { label: "İzlenme", value: "125.4K", delta: "+%18" },
    { label: "Abone", value: "4.2K", delta: "+%12" },
    { label: "İzlenme Süresi", value: "12.6K saat", delta: "+%28" },
    { label: "En İyi Short", value: "428.1K", delta: "+%46" },
  ],
  chat: [
    {
      role: "ai",
      text: "Merhaba! Ben 90+ AI. Fikir, senaryo, sahne planı ve Grok komutlarında yanınızdayım.",
    },
  ],
  activity: [],
});
let session = null,
  workspace = null,
  state = baseState(),
  page = "home",
  sub = null,
  online = navigator.onLine,
  syncTimer,
  recoveryMode = false,
  youtubeSyncing = false;
const RESET_REDIRECT = "studio90://reset-password";
const YOUTUBE_REDIRECT = "studio90://youtube-connected";

const toast = (m) => {
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="toast">${escape(m)}</div>`,
  );
  setTimeout(() => $(".toast")?.remove(), 2600);
};
const saveLocal=()=>localStorage.setItem("studio90_state",JSON.stringify(state));
const loadLocal=()=>{try{const d=JSON.parse(localStorage.getItem("studio90_state"));if(d)state=d}catch{}};
function mergeList(remote=[],local=[],preferLocal=true){
  const map=new Map();
  [...remote,...local].forEach((item,index)=>{
    if(!item?.id)return;
    const old=map.get(item.id);
    if(!old){map.set(item.id,item);return}
    const oldTime=Date.parse(old.updatedAt||old.at||old.created_at||0),newTime=Date.parse(item.updatedAt||item.at||item.created_at||0);
    if(newTime>oldTime||(newTime===oldTime&&((preferLocal&&index>=remote.length)||(!preferLocal&&index<remote.length))))map.set(item.id,item);
  });
  return [...map.values()];
}
function mergeStates(remote,local,preferLocal=true){
  remote=remote&&Object.keys(remote).length?normalizeState(structuredClone(remote)):{ideas:[],contents:[],tasks:[],media:[],trash:[],comments:[],sources:[],activity:[],chat:[],deletedMedia:[],analyticsHistory:[],goals:{}};local=normalizeState(structuredClone(local||{}));
  const merged={...remote,...local};
  ["ideas","contents","tasks","media","trash","comments","sources","activity"].forEach(k=>merged[k]=mergeList(remote[k],local[k],preferLocal));
  merged.chat=(preferLocal?local.chat:remote.chat)||[];
  merged.analyticsHistory=mergeList(remote.analyticsHistory?.map((x,i)=>({...x,id:String(x.days||x.period||i)})),local.analyticsHistory?.map((x,i)=>({...x,id:String(x.days||x.period||i)})),preferLocal).map(({id,...x})=>x);
  merged.goals={...remote.goals,...local.goals};merged.youtube={...remote.youtube,...local.youtube};
  merged.deletedMedia=mergeList(remote.deletedMedia||[],local.deletedMedia||[],preferLocal);
  const trashed=new Set(merged.trash.map(x=>x.id)),deletedMedia=new Set(merged.deletedMedia.map(x=>x.id));
  merged.contents=merged.contents.filter(x=>!trashed.has(x.id));merged.media=merged.media.filter(x=>!deletedMedia.has(x.id));
  merged.updatedAt=new Date(Math.max(Date.parse(remote.updatedAt||0),Date.parse(local.updatedAt||0),Date.now())).toISOString();
  return normalizeState(merged);
}
async function sync(){
  saveLocal();if(!session||!workspace||!online)return;clearTimeout(syncTimer);
  syncTimer=setTimeout(async()=>{
    const local=structuredClone(state);
    const {data:row}=await sb.from("studio_workspace_state").select("data").eq("workspace_id",workspace.id).maybeSingle();
    state=mergeStates(row?.data,local,true);saveLocal();
    const {error}=await sb.from("studio_workspace_state").upsert({workspace_id:workspace.id,data:state,updated_by:session.user.id,updated_at:new Date().toISOString()},{onConflict:"workspace_id"});
    if(error){console.warn(error);toast("Senkronizasyon başarısız: "+error.message)}
  },600);
}
function normalizeState(s){
  const d=baseState();s=s&&Object.keys(s).length?s:d;
  ["ideas","contents","tasks","media","trash","comments","sources","activity","chat","deletedMedia"].forEach(k=>s[k]=Array.isArray(s[k])?s[k]:(d[k]||[]));
  s.goals={...d.goals,...(s.goals||{})};s.analyticsHistory=Array.isArray(s.analyticsHistory)&&s.analyticsHistory.length?s.analyticsHistory:d.analyticsHistory;
  s.contents.forEach(c=>{c.checks={research:false,sources:false,script:false,voice:false,visuals:false,edit:false,cover:false,publish:false,...c.checks};c.scenes=Array.isArray(c.scenes)?c.scenes:[];c.status=c.status==="Yayınlandı"?"Paylaşıldı":c.status});
  s.version=3;return s;
}
function actorName(){return session?.user?.user_metadata?.name||session?.user?.email?.split("@")[0]||"Kullanıcı"}
function mutate(fn,msg,refId){
  fn();const now=new Date().toISOString();state.updatedAt=now;
  if(refId){const item=state.contents.find(x=>x.id===refId);if(item)item.updatedAt=now}
  state.activity.unshift({id:uid(),text:msg||"İçerik güncellendi",actor:actorName(),actorId:session?.user?.id,refId,at:now,updatedAt:now});
  state.activity=state.activity.slice(0,60);sync();render();
}

window.addEventListener("online", () => {
  online = true;
  sync();
  render();
});
window.addEventListener("offline", () => {
  online = false;
  render();
});
function icons() {
  createIcons({
    icons: {
      Home,
      LayoutDashboard,
      CalendarDays,
      Images,
      ChartNoAxesCombined,
      Bell,
      Plus,
      ArrowLeft,
      Search,
      Upload,
      Check,
      Clock3,
      Sparkles,
      Send,
      Lightbulb,
      FileVideo,
      MessageCircle,
      Settings,
      LogOut,
      Trash2,
      Users,
      WifiOff,
      Mail,
      LockKeyhole,
      Eye,
      RotateCcw,
      Link,
      Target,
      Camera,
      MoreVertical,
      Youtube,
      Copy,
    },
  });
}
const nav = () =>
  `<button class="nav ${page === "home" ? "active" : ""}" data-page="home"><i data-lucide="home"></i>Ana Sayfa</button><button class="nav ${page === "content" ? "active" : ""}" data-page="content"><i data-lucide="layout-dashboard"></i>İçerikler</button><button class="nav ${page === "calendar" ? "active" : ""}" data-page="calendar"><i data-lucide="calendar-days"></i>Takvim</button><button class="nav ${page === "media" ? "active" : ""}" data-page="media"><i data-lucide="images"></i>Arşiv</button><button class="nav ${page === "analytics" ? "active" : ""}" data-page="analytics"><i data-lucide="chart-no-axes-combined"></i>Kanal</button>`;
const header = (title = "Merhaba Kaan", back = false) =>
  `<header class="top"><div class="topline"><div class="brand">${back ? '<button class="iconbtn" id="back"><i data-lucide="arrow-left"></i></button>' : '<div class="avatar">90</div>'}<div><b>${escape(title)}</b><div class="sub">${online ? "Birlikte üret, birlikte büyüt" : "Çevrimdışı • Değişiklikler saklanıyor"}</div></div></div><div class="row">${!online ? '<i data-lucide="wifi-off"></i>' : ""}<button class="iconbtn" id="aiTop"><i data-lucide="sparkles"></i></button><button class="iconbtn" id="settingsTop"><i data-lucide="settings"></i></button><button class="iconbtn" id="notify"><i data-lucide="bell"></i></button></div></div></header>`;
function shell(body, title, back = false) {
  app.innerHTML = `<main class="app">${header(title, back)}<section class="content">${body}</section><button class="fab" id="fab">+</button><nav class="bottom">${nav()}</nav></main>`;
  bindBase();
  icons();
}
function bindBase() {
  document.querySelectorAll("[data-page]").forEach(
    (x) =>
      (x.onclick = () => {
        page = x.dataset.page;
        sub = null;
        render();
      }),
  );
  $("#fab")?.addEventListener("click", quickSheet);
  $("#aiTop")?.addEventListener("click", () => openAI());
  $("#settingsTop")?.addEventListener("click", settingsSheet);
  $("#notify")?.addEventListener("click", () =>
    toast(
      `${state.contents.filter((c) => c.progress < 100).length} içerik üretimde`,
    ),
  );
  $("#back")?.addEventListener("click", () => {
    sub = null;
    page = "content";
    render();
  });
}

function home() {
  const active =
      state.contents.find((c) => !["Paylaşıldı"].includes(c.status)) ||
      state.contents[0],
    missing = active
      ? Object.values(active.checks).filter((x) => !x).length
      : 0;
  const pending = state.tasks.filter((t) => !t.done).length;
  const body = `<div class="hero"><div class="row between"><div><div class="sub">BU HAFTAKİ İLERLEME</div><h1>%${active?.progress || 0} tamamlandı</h1></div><div style="font-size:42px">⚽</div></div><div class="progress"><i style="width:${active?.progress || 0}%"></i></div><p class="sub">${state.contents.filter((c) => c.type === "Uzun Video").length} uzun video • ${state.contents.filter((c) => c.type === "Shorts").length} Shorts • ${pending} görev</p></div><div class="grid3"><div class="metric green"><b>${pending}</b><small>Bekleyen görevler</small></div><div class="metric blue"><b>${state.contents.filter((c) => c.status === "Planlandı").length}</b><small>Planlanan</small></div><div class="metric red"><b>${missing}</b><small>Eksik parça</small></div></div><div class="sectionhead"><h2>Öne çıkan içerik</h2><button class="link" data-page="content">Tümünü gör</button></div>${active ? feature(active) : '<div class="empty">Henüz içerik yok</div>'}<div class="sectionhead"><h2>Son aktiviteler</h2></div><div class="card">${(state
    .activity.length
    ? state.activity
    : [
        {
          text: "90+ Studio çalışma alanı hazırlandı",
          actor: "Sistem",
          at: new Date().toISOString(),
        },
      ]
  )
    .slice(0, 6)
    .map(
      (a) =>
        `<div class="row checkrow"><div class="avatar" style="width:32px;height:32px;font-size:11px">${escape((a.actor || "90").slice(0, 2).toUpperCase())}</div><div><b>${escape(a.text)}</b><div class="muted">${escape(a.actor || "Sistem")} • ${new Date(a.at).toLocaleString("tr-TR")}</div></div></div>`,
    )
    .join("")}</div>`;
  shell(body, "Merhaba " + actorName());
  document
    .querySelectorAll("[data-open]")
    .forEach((x) => (x.onclick = () => openContent(x.dataset.open)));
  document.querySelectorAll("[data-page]").forEach(
    (x) =>
      (x.onclick = () => {
        page = x.dataset.page;
        render();
      }),
  );
  icons();
}
function feature(c) {
  return `<article class="card feature" data-open="${c.id}"><div class="cover"><span class="badge ${c.type === "Shorts" ? "short" : ""}">${escape(c.type)}</span><h3>${escape(c.title)}</h3></div><div class="cardbody"><div class="row between"><span class="muted">${escape(c.series)} • ${escape(c.owner)}</span><b>%${c.progress}</b></div><div class="progress"><i style="width:${c.progress}%"></i></div></div></article>`;
}

let filter = "Üretimde";
function contents() {
  const filters = [
    "Fikirler",
    "Planlandı",
    "Üretimde",
    "Kontrol",
    "Hazır",
    "Paylaşıldı",
  ];
  const count = (f) =>
    f === "Fikirler"
      ? state.ideas.length
      : state.contents.filter((c) => c.status === f).length;
  const list =
    filter === "Fikirler"
      ? state.ideas
      : state.contents.filter((c) => c.status === filter);
  const body = `<div class="tabs">${filters.map((f) => `<button class="tab ${filter === f ? "active" : ""}" data-filter="${f}">${f} <small>${count(f)}</small></button>`).join("")}</div><div style="height:12px"></div>${filter === "Fikirler" ? list.map((i) => `<article class="card"><div class="row between"><span class="badge">${escape(i.series)}</span><b>${i.score}/10</b></div><h3>${escape(i.title)}</h3><p class="muted">${escape(i.note)}</p><div class="row"><button class="secondary ideaConvert" data-id="${i.id}">Planla</button><button class="link ideaDelete" data-id="${i.id}">Sil</button></div></article>`).join("") : list.map((c) => `<article class="card listcard" data-open="${c.id}"><div class="thumb" style="${c.coverUrl ? `background-image:url('${c.coverUrl}');background-size:cover` : ""}">${c.coverUrl ? "" : c.type === "Shorts" ? "▯" : "▶"}</div><div><span class="badge ${c.type === "Shorts" ? "short" : ""}">${escape(c.type)}</span><h3>${escape(c.title)}</h3><div class="progress"><i style="width:${c.progress}%"></i></div><div class="muted">${escape(c.owner)} • ${escape(c.due)}</div></div><b>%${c.progress}</b></article>`).join("") || '<div class="empty">Bu aşamada içerik yok.</div>'}`;
  shell(body, "İçerik Panosu");
  document.querySelectorAll("[data-filter]").forEach(
    (x) =>
      (x.onclick = () => {
        filter = x.dataset.filter;
        render();
      }),
  );
  document
    .querySelectorAll("[data-open]")
    .forEach((x) => (x.onclick = () => openContent(x.dataset.open)));
  document
    .querySelectorAll(".ideaConvert")
    .forEach((x) => (x.onclick = () => convertIdea(x.dataset.id)));
  document
    .querySelectorAll(".ideaDelete")
    .forEach(
      (x) =>
        (x.onclick = () =>
          mutate(
            () =>
              (state.ideas = state.ideas.filter((i) => i.id !== x.dataset.id)),
            "Fikir silindi",
          )),
    );
  icons();
}
function convertIdea(id) {
  const i = state.ideas.find((x) => x.id === id);
  if (!i) return;
  const contentId = uid();
  mutate(
    () => {
      state.contents.unshift({
        id: contentId,
        sourceIdea: { ...i },
        title: i.title,
        type: "Shorts",
        series: i.series,
        status: "Planlandı",
        progress: 0,
        due: iso(new Date(today.getTime() + 7 * 864e5)),
        owner: "Ortak",
        priority: "Orta",
        hook: "",
        script: "",
        description: i.note,
        checks: {
          research: false,
          sources: false,
          script: false,
          voice: false,
          visuals: false,
          edit: false,
          cover: false,
          publish: false,
        },
        scenes: [],
      });
      state.ideas = state.ideas.filter((x) => x.id !== id);
    },
    `${i.title} planlandı`,
    contentId,
  );
}
function openContent(id) {
  sub = id;
  page = "detail";
  render();
}
const checkLabels = {
  research: "Araştırma",
  sources: "Kaynak doğrulama",
  script: "Senaryo",
  voice: "Seslendirme",
  visuals: "Görseller",
  edit: "Montaj",
  cover: "Kapak",
  publish: "Yayın",
};
function detail() {
  const c = state.contents.find((x) => x.id === sub);
  if (!c) {
    page = "content";
    return render();
  }
  const completed = Object.values(c.checks).filter(Boolean).length,
    progress = Math.round((completed / Object.keys(c.checks).length) * 100);
  c.progress = progress;
  const contentMedia = state.media.filter((m) => m.contentId === c.id),
    comments = state.comments.filter((x) => x.contentId === c.id),
    sources = state.sources.filter((x) => x.contentId === c.id);
  const body = `<article class="card feature"><div class="cover" style="${c.coverUrl ? `background-image:linear-gradient(0deg,#061523bb,#092b4855),url('${c.coverUrl}');background-size:cover` : ""}"><span class="badge ${c.type === "Shorts" ? "short" : ""}">${escape(c.type)}</span><h3>${escape(c.title)}</h3></div><div class="cardbody"><div class="row between"><span class="muted">${escape(c.status)} • ${escape(c.owner)} • ${escape(c.priority || "Orta")}</span><b>%${progress}</b></div><div class="progress"><i style="width:${progress}%"></i></div></div></article><div class="card"><div class="row stageActions"><button class="secondary" id="prevStage">← Geri</button><button class="secondary" id="nextStage">İleri →</button><button class="iconbtn danger" id="trashContent"><i data-lucide="trash-2"></i></button></div><div class="sectionhead"><h2>Proje özeti</h2><button class="link" id="editContent">Düzenle</button></div><p>${escape(c.description || c.hook || "Açıklama eklenmedi.")}</p><div class="muted">Hedef: ${escape(c.target || "Belirlenmedi")} • Süre: ${escape(c.duration || "Belirlenmedi")}</div></div><div class="card"><div class="sectionhead"><h2>Genel ilerleme</h2><button class="link" id="aiContent">✨ AI ile tamamla</button></div>${Object.entries(
    c.checks,
  )
    .map(
      ([k, v]) =>
        `<div class="row between checkrow" data-check="${k}"><div class="row"><span class="check ${v ? "done" : "missing"}">${v ? "✓" : "!"}</span><b>${checkLabels[k]}</b></div><span class="muted">${v ? "Tamamlandı" : "Eksik"}</span></div>`,
    )
    .join(
      "",
    )}</div><div class="sectionhead"><h2>Sahne planı</h2><button class="link" id="addScene">+ Sahne</button></div>${c.scenes.map((s) => `<article class="card scene"><div class="sceneNo">${String(s.no).padStart(2, "0")}</div><div class="thumb" style="${s.imageUrl ? `background-image:url('${s.imageUrl}');background-size:cover` : ""}">${s.imageUrl ? "" : "🎬"}</div><div><div class="row between"><b>${escape(s.title)}</b><span class="badge ${s.status === "Eksik" ? "short" : ""}">${escape(s.status)}</span></div><p class="muted">${escape(s.time)} • ${escape(s.narration)}</p><div class="prompt"><b>Grok Promptu</b><br>${escape(s.prompt)}</div><div class="row"><button class="link scenePhoto" data-scene="${s.id}">📷 Fotoğraf</button><button class="link sceneDelete" data-scene="${s.id}">Sil</button></div></div></article>`).join("") || '<div class="empty">Sahne eklenmedi.</div>'}<div class="card"><div class="sectionhead"><h2>Proje medyası</h2><button class="link" id="addContentMedia">+ Fotoğraf / video</button></div><div class="mediaGrid">${contentMedia.map(m=>`<div class="media">${mediaPreview(m)}<span class="mediaName">${escape(m.name)}</span></div>`).join("")}</div></div><div class="card"><div class="sectionhead"><h2>Kaynaklar</h2><button class="link" id="addSource">+ Kaynak</button></div>${sources.map((s) => `<div class="row between checkrow"><div><b>${escape(s.title)}</b><div class="muted">${escape(s.url)}</div></div><span class="badge">${s.verified ? "Doğrulandı" : "Kontrol"}</span></div>`).join("") || '<div class="muted">Henüz kaynak eklenmedi.</div>'}</div><div class="card"><div class="sectionhead"><h2>Ekip yorumları</h2></div>${comments.map((x) => `<div class="comment"><b>${escape(x.actor)}</b><p>${escape(x.text)}</p><span class="muted">${new Date(x.at).toLocaleString("tr-TR")}</span></div>`).join("")}<form id="commentForm" class="aiInput"><input name="text" placeholder="Yorum veya kontrol notu…" required><button class="iconbtn" style="background:var(--green);color:#052417"><i data-lucide="send"></i></button></form></div><input hidden type="file" id="detailFile" accept="image/*,video/*" multiple>`;
  shell(body, "İçerik Detayı", true);
  document
    .querySelectorAll("[data-check]")
    .forEach(
      (x) =>
        (x.onclick = () =>
          mutate(
            () => (c.checks[x.dataset.check] = !c.checks[x.dataset.check]),
            `${checkLabels[x.dataset.check]} güncellendi`,
            c.id,
          )),
    );
  $("#editContent").onclick = () => contentForm(c);
  $("#addScene").onclick = () => sceneForm(c);
  $("#aiContent").onclick = () => openAI(c.id);
  $("#prevStage").onclick = () => moveStage(c, -1);
  $("#nextStage").onclick = () => moveStage(c, 1);
  $("#trashContent").onclick = () => trashContent(c);
  $("#addSource").onclick = () => sourceForm(c);
  $("#addContentMedia").onclick = () => {
    $("#detailFile").dataset.content = c.id;
    $("#detailFile").click();
  };
  $("#detailFile").onchange = (e) => {
    uploadFiles([...e.target.files], {
      contentId: c.id,
      sceneId: e.target.dataset.scene || undefined,
    });
    delete e.target.dataset.scene;
  };
  document.querySelectorAll(".scenePhoto").forEach(
    (x) =>
      (x.onclick = () => {
        $("#detailFile").dataset.scene = x.dataset.scene;
        $("#detailFile").click();
      }),
  );
  document
    .querySelectorAll(".sceneDelete")
    .forEach(
      (x) =>
        (x.onclick = () =>
          mutate(
            () => (c.scenes = c.scenes.filter((s) => s.id !== x.dataset.scene)),
            "Sahne silindi",
            c.id,
          )),
    );
  $("#commentForm").onsubmit = (e) => {
    e.preventDefault();
    const text = new FormData(e.target).get("text");
    mutate(
      () =>
        state.comments.push({
          id: uid(),
          contentId: c.id,
          text,
          actor: actorName(),
          at: new Date().toISOString(),
        }),
      `${c.title} içeriğine yorum eklendi`,
      c.id,
    );
  };
  icons();
}

const stages = ["Planlandı", "Üretimde", "Kontrol", "Hazır", "Paylaşıldı"];
function moveStage(c, dir) {
  const i = Math.max(0, stages.indexOf(c.status)),
    next = Math.min(stages.length - 1, Math.max(0, i + dir));
  mutate(
    () => (c.status = stages[next]),
    `${c.title}: ${stages[next]} aşamasına taşındı`,
    c.id,
  );
}
function trashContent(c) {
  mutate(
    () => {
      state.trash.unshift({ ...c, deletedAt: new Date().toISOString() });
      state.contents = state.contents.filter((x) => x.id !== c.id);
      sub = null;
      page = "content";
    },
    `${c.title} çöp kutusuna taşındı`,
    c.id,
  );
}

function calendar() {
  const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cmt", "Paz"];
  const body = `<div class="card"><div class="row between"><h2>Haftalık Takvim</h2><span class="badge">Bu Hafta</span></div><div class="week">${days.map((d, i) => `<div class="day ${i === 4 ? "active" : ""}"><b>${d}</b><br>${14 + i}</div>`).join("")}</div></div><div class="sectionhead"><h2>Üretim programı</h2><button class="link" id="newTask">+ Görev</button></div>${state.tasks
    .sort((a, b) => a.day - b.day || a.time.localeCompare(b.time))
    .map(
      (t) =>
        `<article class="agenda ${t.publish ? "publish" : ""}" data-task="${t.id}"><div class="row between"><div><b>${days[t.day - 1] || "Gün"} ${escape(t.time)} • ${escape(t.title)}</b><div class="muted">${escape(t.owner)}</div></div><span class="check ${t.done ? "done" : ""}">${t.done ? "✓" : ""}</span></div></article>`,
    )
    .join(
      "",
    )}<div class="card row between"><div><b>🏆 Bu hafta</b><div class="muted">1 Uzun Video • 6 Shorts</div></div><b>${state.tasks.filter((t) => t.done).length}/${state.tasks.length}</b></div>`;
  shell(body, "Haftalık Takvim");
  document.querySelectorAll("[data-task]").forEach(
    (x) =>
      (x.onclick = () =>
        mutate(() => {
          const t = state.tasks.find((a) => a.id === x.dataset.task);
          t.done = !t.done;
        }, "Görev durumu güncellendi")),
  );
  $("#newTask").onclick = taskForm;
  icons();
}
function mediaPreview(m){
  if(m.type?.startsWith("video"))return `<video src="${m.url}" controls preload="metadata"></video>`;
  if(m.type?.startsWith("audio"))return `<div class="audioTile">🎙️<audio src="${m.url}" controls></audio></div>`;
  return m.url?`<img src="${m.url}" alt="${escape(m.name)}" loading="lazy">`:"📁";
}
function media(){
  const body=`<div class="row"><div class="field" style="flex:1;margin:0"><input id="mediaSearch" placeholder="Medya ara..."></div><button class="iconbtn" style="background:var(--navy)" id="upload"><i data-lucide="upload"></i></button></div><div class="tabs mediaKinds" style="margin-top:12px"><button class="tab active" data-kind="all">Tümü</button><button class="tab" data-kind="image">Görsel</button><button class="tab" data-kind="video">Video</button><button class="tab" data-kind="audio">Ses</button></div><div class="sectionhead"><h2>Medya Arşivi</h2><span class="muted">${state.media.length} dosya</span></div><div class="mediaGrid" id="mediaGrid">${state.media.map(m=>`<div class="media ${m.type?.startsWith("video")?"video":""}" data-media="${m.id}" data-type="${escape(m.type)}"><button class="mediaDelete" data-delete="${m.id}">×</button>${mediaPreview(m)}<span class="mediaName">${escape(m.name)}</span></div>`).join("")||'<div class="empty">İlk dosyanı yükle.</div>'}</div><div class="card" style="margin-top:15px"><div class="row between"><b>Bulut arşivi</b><span class="muted">${state.media.length} dosya • cihazlar arası ortak</span></div><div class="progress"><i style="width:${Math.min(90,state.media.length)}%"></i></div></div><input hidden type="file" id="fileInput" accept="image/*,video/*,audio/*,.heic,.heif" multiple>`;
  shell(body,"Medya Arşivi");$("#upload").onclick=()=>$("#fileInput").click();$("#fileInput").onchange=e=>uploadFiles([...e.target.files]);
  $("#mediaSearch").oninput=e=>document.querySelectorAll("[data-media]").forEach(x=>x.style.display=state.media.find(m=>m.id===x.dataset.media)?.name.toLowerCase().includes(e.target.value.toLowerCase())?"":"none");
  document.querySelectorAll("[data-kind]").forEach(x=>x.onclick=()=>{document.querySelectorAll("[data-kind]").forEach(t=>t.classList.toggle("active",t===x));document.querySelectorAll("[data-media]").forEach(m=>m.style.display=x.dataset.kind==="all"||m.dataset.type.startsWith(x.dataset.kind)?"":"none")});
  document.querySelectorAll("[data-delete]").forEach(x=>x.onclick=e=>{e.stopPropagation();deleteMedia(x.dataset.delete)});icons();
}

async function uploadFiles(files, meta = {}) {
  if (!files?.length || !session || !workspace)
    return toast("Önce çalışma alanına giriş yapmalısın");
  let ok = 0;
  for (const file of files) {
    toast(`${ok + 1}/${files.length} yükleniyor…`);
    const path = `${workspace.id}/${Date.now()}-${uid()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
    const { error } = await sb.storage
      .from("studio-media")
      .upload(path, file, { contentType: file.type, upsert: false });
    if (error) {
      toast("Yüklenemedi: " + error.message);
      continue;
    }
    const { data: signed } = await sb.storage
      .from("studio-media")
      .createSignedUrl(path, 60 * 60 * 24 * 7);
    const item = {
      id: uid(),
      name: file.name,
      type: file.type,
      path,
      url: signed?.signedUrl || "",
      owner: session.user.id,
      created_at: new Date().toISOString(),
      ...meta,
    };
    state.media.unshift(item);
    if (meta.sceneId) {
      const c = state.contents.find((x) => x.id === meta.contentId);
      const s = c?.scenes.find((x) => x.id === meta.sceneId);
      if (s) { s.imageMediaId = item.id; s.imageUrl = item.url; }
    } else if (
      meta.contentId &&
      file.type.startsWith("image") &&
      !state.contents.find((x) => x.id === meta.contentId)?.coverUrl
    ) {
      const target=state.contents.find((x) => x.id === meta.contentId); target.coverMediaId=item.id; target.coverUrl=item.url;
    }
    ok++;
  }
  mutate(() => {}, `${ok} dosya arşive eklendi`, meta.contentId);
  toast(`${ok} dosya başarıyla yüklendi`);
}
async function deleteMedia(id){
  const m=state.media.find(x=>x.id===id);if(!m)return;
  const {error}=await sb.storage.from("studio-media").remove([m.path]);if(error)return toast(error.message);
  mutate(()=>{
    state.deletedMedia=state.deletedMedia||[];state.deletedMedia.push({id:m.id,path:m.path,deletedAt:new Date().toISOString(),updatedAt:new Date().toISOString()});
    state.media=state.media.filter(x=>x.id!==id);
    state.contents.forEach(c=>{if(c.coverMediaId===id){delete c.coverMediaId;delete c.coverUrl}(c.scenes||[]).forEach(s=>{if(s.imageMediaId===id){delete s.imageMediaId;delete s.imageUrl}})});
  },`${m.name} arşivden ve bağlı içeriklerden silindi`);
}

let analyticsPeriod=28;
function periodLabel(days){return days===7?"Son 7 gün":days===28?"Son 28 gün":days===90?"Son 90 gün":"Son 1 yıl"}
function analyticsRecord(days){
  const found=state.analyticsHistory.find(x=>Number(x.days)===days||x.period===periodLabel(days));
  if(found)return found;
  const base=state.analyticsHistory[state.analyticsHistory.length-1]||{views:0,subs:0,hours:0,ctr:0,retention:0};
  const scale=days/28;
  return {period:periodLabel(days),days,views:Math.round((+base.views||0)*scale),subs:Math.round((+base.subs||0)*scale),hours:Math.round((+base.hours||0)*scale),ctr:+base.ctr||0,retention:+base.retention||0};
}
function analytics(){
  const cur=analyticsRecord(analyticsPeriod),prev=analyticsRecord(analyticsPeriod===7?28:analyticsPeriod===28?7:28),pct=(a,b)=>b?Math.round((a-b)/b*100):0;
  const metrics=[["İzlenme",cur.views,pct(cur.views,prev.views)],["Abone",cur.subs,pct(cur.subs,prev.subs)],["İzlenme süresi",cur.hours+" sa",pct(cur.hours,prev.hours)],["CTR","%"+cur.ctr,pct(cur.ctr,prev.ctr)]];
  const publishedLong=state.contents.filter(c=>c.type==="Uzun Video"&&c.status==="Paylaşıldı").length,publishedShorts=state.contents.filter(c=>c.type==="Shorts"&&c.status==="Paylaşıldı").length;
  const yt=state.youtube||{},connected=Boolean(yt.connected);
  const youtubeCard=`<div class="card youtubeCard"><div class="row between"><div class="row">${yt.avatar?`<img class="channelAvatar" src="${escape(yt.avatar)}">`:'<div class="youtubeIcon"><i data-lucide="youtube"></i></div>'}<div><h2 style="margin:0">${connected?escape(yt.title||"YouTube kanalı"):"YouTube kanalını bağla"}</h2><div class="muted">${connected?`${Number(yt.subscribers||0).toLocaleString("tr-TR")} abone • ${yt.lastSyncedAt?"Son güncelleme "+new Date(yt.lastSyncedAt).toLocaleString("tr-TR"):"Henüz güncellenmedi"}`:"Veriler otomatik olarak 7/28/90/365 günlük çekilsin"}</div></div></div><span class="badge ${connected?"connected":""}">${connected?"BAĞLI":"BAĞLI DEĞİL"}</span></div><div class="row youtubeActions">${connected?'<button class="primary" id="youtubeSync">Şimdi Güncelle</button><button class="secondary" id="youtubeDisconnect">Bağlantıyı Kes</button>':'<button class="primary" id="youtubeConnect"><i data-lucide="youtube"></i> Google ile Bağla</button>'}<button class="secondary" id="youtubeImport">Elle Veri Gir</button></div><p class="muted oauthNote">Salt okunur izin kullanılır. Uygulama kanalında video yayımlayamaz veya silemez.</p></div>`;
  const body=`${youtubeCard}<div class="tabs periodTabs">${[7,28,90,365].map(d=>`<button class="tab ${analyticsPeriod===d?"active":""}" data-period="${d}">${d===365?"1 Yıl":d+" Gün"}</button>`).join("")}</div><div class="grid3" style="grid-template-columns:repeat(2,1fr)">${metrics.map(a=>`<div class="metric"><small>${a[0]}</small><b>${Number.isFinite(a[1])?Number(a[1]).toLocaleString("tr-TR"):a[1]}</b><span class="trend ${a[2]<0?"down":""}">${a[2]>=0?"↑":"↓"} %${Math.abs(a[2])}</span></div>`).join("")}</div><div class="card"><div class="row between"><h2>Dönem kıyası</h2><span class="badge">${escape(cur.period)}</span></div><div class="chart"><svg viewBox="0 0 400 150" preserveAspectRatio="none"><polyline points="0,125 45,110 85,116 125,80 170,96 210,62 255,75 300,40 345,55 400,18" fill="none" stroke="#24e37a" stroke-width="6"/></svg></div><div class="compare"><span>İzleyici tutma <b>%${cur.retention}</b></span><span>Önceki dönem <b>%${prev.retention}</b></span></div></div><div class="card"><div class="sectionhead"><h2>Aylık hedefler</h2><button class="link" id="editGoals">Düzenle</button></div>${[["Abone",cur.subs,state.goals.subscribers],["İzlenme",cur.views,state.goals.views],["Uzun video",publishedLong,state.goals.longVideos],["Shorts",publishedShorts,state.goals.shorts]].map(g=>`<div class="goal"><div class="row between"><b>${g[0]}</b><span>${(+g[1]).toLocaleString("tr-TR")} / ${(+g[2]).toLocaleString("tr-TR")}</span></div><div class="progress"><i style="width:${Math.min(100,(+g[1])/(+g[2]||1)*100)}%"></i></div></div>`).join("")}</div><div class="card insight"><span class="badge">✨ AI YORUMU</span><h2>${pct(cur.hours,prev.hours)>=0?"Büyüme devam ediyor":"Yeni format denemesi gerekli"}</h2><p>İzlenme süresi karşılaştırılan döneme göre %${Math.abs(pct(cur.hours,prev.hours))} ${pct(cur.hours,prev.hours)>=0?"arttı":"azaldı"}. Uzun videodan en az 3 Shorts üret.</p><div class="row"><button class="secondary" id="addStats">Veri gir</button></div></div>`;
  shell(body,"Kanal Analizi");
  document.querySelectorAll("[data-period]").forEach(x=>x.onclick=()=>{analyticsPeriod=+x.dataset.period;render()});
  $("#addStats").onclick=statsForm;$("#editGoals").onclick=goalsForm;$("#youtubeImport").onclick=youtubeImportForm;
  if($("#youtubeConnect"))$("#youtubeConnect").onclick=connectYouTube;
  if($("#youtubeSync"))$("#youtubeSync").onclick=()=>syncYouTube(true);
  if($("#youtubeDisconnect"))$("#youtubeDisconnect").onclick=disconnectYouTube;
  icons();
}

async function youtubeCall(action){
  const {data,error}=await sb.functions.invoke("youtube-oauth",{body:{action,workspaceId:workspace.id}});
  if(error){
    let message=error.message;
    try{const detail=await error.context?.json();message=detail?.error||message}catch{}
    throw new Error(message);
  }
  if(data?.error)throw new Error(data.error);
  return data;
}
async function connectYouTube(){
  const btn=$("#youtubeConnect");if(btn){btn.disabled=true;btn.textContent="Google açılıyor…"}
  try{const data=await youtubeCall("start");window.open(data.url,"_blank","noopener,noreferrer")}
  catch(error){toast("YouTube bağlantısı: "+error.message)}
  finally{if(btn){btn.disabled=false;btn.textContent="Google ile Bağla"}}
}
async function refreshYouTubeStatus(autoSync=false){
  if(!workspace||!session)return;
  try{
    const data=await youtubeCall("status");
    state.youtube={...(state.youtube||{}),connected:data.connected,...(data.channel||{})};
    saveLocal();
    if(autoSync&&data.connected&&(!data.channel?.lastSyncedAt||Date.now()-Date.parse(data.channel.lastSyncedAt)>6*60*60*1000))await syncYouTube(false);
  }catch(error){console.warn("YouTube durum kontrolü:",error)}
}
async function syncYouTube(notify=true){
  if(youtubeSyncing)return;youtubeSyncing=true;
  const btn=$("#youtubeSync");if(btn){btn.disabled=true;btn.textContent="Güncelleniyor…"}
  try{
    const data=await youtubeCall("sync");
    mutate(()=>{
      for(const record of data.records||[]){const i=state.analyticsHistory.findIndex(x=>Number(x.days)===Number(record.days));if(i>=0)state.analyticsHistory[i]={...state.analyticsHistory[i],...record};else state.analyticsHistory.push(record)}
      state.youtube={...(state.youtube||{}),connected:true,...data.channel,lastImport:new Date().toISOString()};
    },"YouTube verileri otomatik güncellendi");
    if(notify)toast("YouTube Analytics güncellendi");
  }catch(error){toast("YouTube güncelleme hatası: "+error.message)}
  finally{youtubeSyncing=false;if(btn){btn.disabled=false;btn.textContent="Şimdi Güncelle"}}
}
async function disconnectYouTube(){
  if(!confirm("YouTube kanal bağlantısı kesilsin mi?"))return;
  try{await youtubeCall("disconnect");mutate(()=>{state.youtube={connected:false}},"YouTube kanal bağlantısı kesildi");toast("YouTube bağlantısı kesildi")}
  catch(error){toast(error.message)}
}

function quickSheet() {
  sheet(
    `<h2>Hızlı Oluştur</h2><div class="grid3" style="grid-template-columns:repeat(2,1fr)"><button class="metric" data-quick="content"><b>🎬</b><small>Yeni içerik</small></button><button class="metric" data-quick="idea"><b>💡</b><small>Yeni fikir</small></button><button class="metric" data-quick="task"><b>✅</b><small>Yeni görev</small></button><button class="metric green" data-quick="aiProject"><b>✨</b><small>AI ile proje</small></button><button class="metric blue" data-quick="ai"><b>💬</b><small>90+ AI sohbet</small></button></div>`,
  );
  document.querySelectorAll("[data-quick]").forEach(
    (x) =>
      (x.onclick = () => {
        closeSheet();
        ({ content: contentForm, idea: ideaForm, task: taskForm, ai: openAI, aiProject: aiProjectForm })[
          x.dataset.quick
        ]();
      }),
  );
}
function sheet(html) {
  document.body.insertAdjacentHTML(
    "beforeend",
    `<div class="overlay" id="overlay"><div class="sheet"><div class="handle"></div>${html}</div></div>`,
  );
  $("#overlay").onclick = (e) => {
    if (e.target.id === "overlay") closeSheet();
  };
  icons();
}
const closeSheet = () => $("#overlay")?.remove();
function contentForm(c) {
  sheet(
    `<h2>${c ? "İçeriği Düzenle" : "Yeni İçerik"}</h2><form id="contentForm"><div class="field"><label>Başlık</label><input name="title" required value="${escape(c?.title || "")}"></div><div class="form2"><div class="field"><label>Tür</label><select name="type"><option>Uzun Video</option><option ${c?.type === "Shorts" ? "selected" : ""}>Shorts</option></select></div><div class="field"><label>Öncelik</label><select name="priority">${['Düşük','Orta','Yüksek','Acil'].map(x=>`<option ${c?.priority===x?'selected':''}>${x}</option>`).join('')}</select></div></div><div class="field"><label>Seri</label><select name="series">${["Ne Oldu Bu Adama?", "Parasını Hak Etti mi?", "90+ Karşılaştırma", "Ramak Kala Transferler", "Son Dakika Hikâyeleri"].map((x) => `<option ${c?.series === x ? "selected" : ""}>${x}</option>`).join("")}</select></div><div class="form2"><div class="field"><label>Sorumlu</label><input name="owner" value="${escape(c?.owner||actorName())}"></div><div class="field"><label>Yayın tarihi</label><input name="due" type="date" value="${escape(c?.due||iso(new Date(today.getTime()+7*864e5)))}"></div></div><div class="form2"><div class="field"><label>Hedef</label><input name="target" value="${escape(c?.target||'İzlenme ve abone')}"></div><div class="field"><label>Hedef süre</label><input name="duration" value="${escape(c?.duration||'6-8 dakika')}"></div></div><div class="field"><label>Açıklama</label><textarea name="description">${escape(c?.description||'')}</textarea></div><div class="field"><label>Kanca</label><textarea name="hook">${escape(c?.hook || "")}</textarea></div><div class="field"><label>Senaryo</label><textarea name="script">${escape(c?.script || "")}</textarea></div><button class="primary">Kaydet</button></form>`,
  );
  $("#contentForm").onsubmit = (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    mutate(
      () => {
        if (c) Object.assign(c, d);
        else
          state.contents.unshift({
            id: uid(),
            ...d,
            status: "Planlandı",
            progress: 0,
            due: iso(new Date(today.getTime() + 7 * 864e5)),
            checks: {
              research: false,
              sources: false,
              script: false,
              voice: false,
              visuals: false,
              edit: false,
              cover: false,
              publish: false,
            },
            scenes: [],
          });
      },
      c ? "İçerik güncellendi" : "Yeni içerik oluşturuldu",
    );
    closeSheet();
  };
}
function ideaForm() {
  sheet(
    `<h2>Fikir Havuzuna Ekle</h2><form id="ideaForm"><div class="field"><label>Fikir başlığı</label><input name="title" required></div><div class="field"><label>Seri</label><input name="series" value="Ne Oldu Bu Adama?"></div><div class="field"><label>Not</label><textarea name="note"></textarea></div><div class="field"><label>Puan (1-10)</label><input name="score" type="number" min="1" max="10" value="8"></div><button class="primary">Fikri Kaydet</button></form>`,
  );
  $("#ideaForm").onsubmit = (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    mutate(
      () => state.ideas.unshift({ id: uid(), ...d, score: +d.score }),
      "Yeni fikir eklendi",
    );
    closeSheet();
  };
}
function taskForm() {
  sheet(
    `<h2>Yeni Görev</h2><form id="taskForm"><div class="field"><label>Görev</label><input name="title" required></div><div class="field"><label>Gün</label><select name="day">${["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"].map((x, i) => `<option value="${i + 1}">${x}</option>`).join("")}</select></div><div class="field"><label>Saat</label><input name="time" type="time" value="19:00"></div><div class="field"><label>Sorumlu</label><select name="owner"><option>Kaan</option><option>Kuzen</option><option>Ortak</option></select></div><button class="primary">Görevi Ekle</button></form>`,
  );
  $("#taskForm").onsubmit = (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    mutate(
      () => state.tasks.push({ id: uid(), ...d, day: +d.day, done: false }),
      "Yeni görev eklendi",
    );
    closeSheet();
  };
}
function sceneForm(c) {
  sheet(
    `<h2>Yeni Sahne</h2><form id="sceneForm"><div class="field"><label>Sahne başlığı</label><input name="title" required></div><div class="field"><label>Süre</label><input name="time" placeholder="00:00–00:15"></div><div class="field"><label>Seslendirme</label><textarea name="narration"></textarea></div><div class="field"><label>Grok promptu</label><textarea name="prompt"></textarea></div><button class="primary">Sahneyi Ekle</button></form>`,
  );
  $("#sceneForm").onsubmit = (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(e.target));
    mutate(
      () =>
        c.scenes.push({
          id: uid(),
          no: c.scenes.length + 1,
          status: "Eksik",
          ...d,
        }),
      "Yeni sahne eklendi",
    );
    closeSheet();
  };
}
function statsForm(){
  const cur=analyticsRecord(analyticsPeriod);
  sheet(`<h2>${periodLabel(analyticsPeriod)} verileri</h2><form id="statsForm"><div class="form2"><div class="field"><label>İzlenme</label><input name="views" type="number" min="0" value="${cur.views}"></div><div class="field"><label>Abone</label><input name="subs" type="number" min="0" value="${cur.subs}"></div></div><div class="form2"><div class="field"><label>İzlenme saati</label><input name="hours" type="number" step="0.1" min="0" value="${cur.hours}"></div><div class="field"><label>CTR (%)</label><input name="ctr" type="number" step="0.1" min="0" value="${cur.ctr}"></div></div><div class="field"><label>Ortalama izleyici tutma (%)</label><input name="retention" type="number" step="0.1" min="0" max="100" value="${cur.retention}"></div><button class="primary">Analize Kaydet</button></form>`);
  $("#statsForm").onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target)),record={period:periodLabel(analyticsPeriod),days:analyticsPeriod,views:+d.views,subs:+d.subs,hours:+d.hours,ctr:+d.ctr,retention:+d.retention,updatedAt:new Date().toISOString()};mutate(()=>{const i=state.analyticsHistory.findIndex(x=>Number(x.days)===analyticsPeriod||x.period===record.period);if(i>=0)state.analyticsHistory[i]=record;else state.analyticsHistory.push(record)},"Kanal analizi güncellendi");closeSheet()};
}
function youtubeImportForm(){
  const cur=analyticsRecord(analyticsPeriod);
  sheet(`<div class="row between"><div><h2 style="margin:0">YouTube Studio Verisi</h2><div class="muted">YouTube Studio → Analytics ekranındaki değerleri gir</div></div><span class="badge">İÇE AKTAR</span></div><div class="notice">Google OAuth bağlanana kadar en güvenli yöntem budur. Kaydettiğin değerler dönem kartlarına ve kıyaslamaya anında yansır.</div><form id="youtubeForm"><div class="field"><label>Kanal / video bağlantısı</label><input name="channelUrl" type="url" value="${escape(state.youtube?.channelUrl||"")}" placeholder="https://youtube.com/@..."></div><div class="form2"><div class="field"><label>İzlenme</label><input name="views" type="number" value="${cur.views}"></div><div class="field"><label>Abone</label><input name="subs" type="number" value="${cur.subs}"></div></div><div class="form2"><div class="field"><label>İzlenme saati</label><input name="hours" type="number" step="0.1" value="${cur.hours}"></div><div class="field"><label>CTR (%)</label><input name="ctr" type="number" step="0.1" value="${cur.ctr}"></div></div><div class="field"><label>İzleyici tutma (%)</label><input name="retention" type="number" step="0.1" value="${cur.retention}"></div><button class="primary">YouTube Verisini Kaydet</button></form>`);
  $("#youtubeForm").onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target)),record={period:periodLabel(analyticsPeriod),days:analyticsPeriod,views:+d.views,subs:+d.subs,hours:+d.hours,ctr:+d.ctr,retention:+d.retention,updatedAt:new Date().toISOString()};mutate(()=>{state.youtube={...(state.youtube||{}),channelUrl:d.channelUrl,lastImport:new Date().toISOString()};const i=state.analyticsHistory.findIndex(x=>Number(x.days)===analyticsPeriod||x.period===record.period);if(i>=0)state.analyticsHistory[i]=record;else state.analyticsHistory.push(record)},"YouTube Studio verileri içe aktarıldı");closeSheet()};
}

function sourceForm(c){sheet(`<h2>Kaynak Ekle</h2><form id="sourceForm"><div class="field"><label>Kaynak başlığı</label><input name="title" required></div><div class="field"><label>Bağlantı</label><input name="url" type="url" placeholder="https://" required></div><label class="row"><input name="verified" type="checkbox"> Bilgiler doğrulandı</label><button class="primary">Kaydet</button></form>`);$('#sourceForm').onsubmit=e=>{e.preventDefault();const f=new FormData(e.target);mutate(()=>state.sources.push({id:uid(),contentId:c.id,title:f.get('title'),url:f.get('url'),verified:f.has('verified'),actor:actorName(),at:new Date().toISOString()}),`${c.title} için kaynak eklendi`,c.id);closeSheet()}}
function goalsForm(){sheet(`<h2>Aylık Hedefler</h2><form id="goalsForm"><div class="field"><label>Abone hedefi</label><input name="subscribers" type="number" value="${state.goals.subscribers}"></div><div class="field"><label>İzlenme hedefi</label><input name="views" type="number" value="${state.goals.views}"></div><div class="form2"><div class="field"><label>Uzun video</label><input name="longVideos" type="number" value="${state.goals.longVideos}"></div><div class="field"><label>Shorts</label><input name="shorts" type="number" value="${state.goals.shorts}"></div></div><button class="primary">Hedefleri Kaydet</button></form>`);$('#goalsForm').onsubmit=e=>{e.preventDefault();const d=Object.fromEntries(new FormData(e.target));mutate(()=>Object.keys(d).forEach(k=>state.goals[k]=+d[k]),'Kanal hedefleri güncellendi');closeSheet()}}
function settingsSheet(){sheet(`<div class="row between"><div><h2 style="margin:0">Ayarlar</h2><div class="muted">${escape(session?.user?.email||'')}</div></div><span class="badge">Ekip</span></div><div class="card"><b>Çalışma alanı kodu</b><div class="row between"><code>${escape(workspace?.join_code||'—')}</code><button class="link" id="copyCode"><i data-lucide="copy"></i> Kopyala</button></div></div><div class="sectionhead"><h2>Çöp kutusu</h2><span class="muted">${state.trash.length} içerik</span></div>${state.trash.map(c=>`<div class="card row between"><div><b>${escape(c.title)}</b><div class="muted">${new Date(c.deletedAt).toLocaleDateString('tr-TR')}</div></div><div class="row"><button class="iconbtn restore" data-restore="${c.id}" style="background:#e7f8ee;color:#076a34"><i data-lucide="rotate-ccw"></i></button><button class="iconbtn permanent" data-permanent="${c.id}" style="background:#ffe9e5;color:#b52b1e"><i data-lucide="trash-2"></i></button></div></div>`).join('')||'<div class="empty">Çöp kutusu boş.</div>'}<button class="secondary" style="width:100%;margin-bottom:8px" id="changePassword">Şifre yenileme bağlantısı gönder</button><button class="secondary danger" style="width:100%" id="logoutSettings">Çıkış Yap</button>`);$('#copyCode').onclick=()=>navigator.clipboard?.writeText(workspace?.join_code||'').then(()=>toast('Ekip kodu kopyalandı'));document.querySelectorAll('[data-restore]').forEach(x=>x.onclick=()=>{const c=state.trash.find(t=>t.id===x.dataset.restore);mutate(()=>{state.contents.unshift({...c,status:'Planlandı'});state.trash=state.trash.filter(t=>t.id!==c.id)},`${c.title} geri yüklendi`,c.id);closeSheet()});document.querySelectorAll('[data-permanent]').forEach(x=>x.onclick=()=>{mutate(()=>state.trash=state.trash.filter(t=>t.id!==x.dataset.permanent),'İçerik kalıcı silindi');closeSheet()});$('#changePassword').onclick=async()=>{const {error}=await sb.auth.resetPasswordForEmail(session.user.email,{redirectTo:RESET_REDIRECT});toast(error?error.message:'Yenileme e-postası gönderildi')};$('#logoutSettings').onclick=()=>sb.auth.signOut();icons()}
function aiProjectForm(){sheet(`<div class="row between"><div><h2 style="margin:0">✨ AI Proje Sihirbazı</h2><div class="muted">Tek konudan tam üretim paketi</div></div><span class="badge">GROK</span></div><form id="aiProjectForm"><div class="field"><label>Video konusu</label><input name="topic" placeholder="Örn. Adriano'nun yükselişi ve düşüşü" required></div><div class="form2"><div class="field"><label>Tür</label><select name="type"><option>Uzun Video</option><option>Shorts</option></select></div><div class="field"><label>Ton</label><select name="tone"><option>Sinematik</option><option>Hızlı ve vurucu</option><option>Belgesel</option><option>Tartışmalı</option></select></div></div><label class="row"><input name="shorts" type="checkbox" checked> Uzun videodan 3 Shorts fikri üret</label><button class="primary" id="generateProject">Projeyi Oluştur</button><p id="projectMsg" class="muted"></p></form>`);$('#aiProjectForm').onsubmit=async e=>{e.preventDefault();const f=new FormData(e.target),topic=f.get('topic'),type=f.get('type');$('#projectMsg').textContent='Senaryo, sahneler ve Grok komutları hazırlanıyor…';const prompt=`${topic} konusunda ${type} için Türkçe bir üretim paketi oluştur. Yalnız geçerli JSON döndür: {"title":"","hook":"","description":"","script":"","scenes":[{"title":"","time":"","narration":"","prompt":""}],"shorts":[{"title":"","hook":""}],"descriptionText":"","hashtags":""}. Ton: ${f.get('tone')}. Bilgi uydurma, doğrulanması gereken yerleri belirt.`;try{const {data,error}=await sb.functions.invoke('studio-ai',{body:{workspaceId:workspace.id,message:prompt,history:[],context:{channel:state.channel}}});if(error)throw error;const raw=data?.text||'',json=JSON.parse(raw.match(/\{[\s\S]*\}/)?.[0]||raw),id=uid();mutate(()=>{state.contents.unshift({id,title:json.title||topic,type,series:'Ne Oldu Bu Adama?',status:'Planlandı',progress:0,due:iso(new Date(today.getTime()+7*864e5)),owner:'Ortak',priority:'Yüksek',hook:json.hook||'',description:json.description||'',script:json.script||'',youtubeDescription:json.descriptionText||'',hashtags:json.hashtags||'',checks:{research:false,sources:false,script:!!json.script,voice:false,visuals:false,edit:false,cover:false,publish:false},scenes:(json.scenes||[]).map((s,i)=>({id:uid(),no:i+1,status:'Eksik',...s}))});(json.shorts||[]).forEach(s=>state.ideas.unshift({id:uid(),title:s.title,series:'Uzun Videodan Shorts',score:9,note:s.hook}))},`${topic} AI ile projelendirildi`,id);closeSheet();sub=id;page='detail';render()}catch(err){$('#projectMsg').textContent='AI hatası: '+(err?.message||'Yanıt işlenemedi. API anahtarını kontrol et.')}}}
async function testAIConnection(){
  const btn=$("#testAI");if(btn){btn.disabled=true;btn.textContent="Test ediliyor…"}
  try{const {data,error}=await sb.functions.invoke("studio-ai",{body:{workspaceId:workspace.id,message:"Yalnızca TAMAM yaz.",history:[],context:{test:true}}});if(error)throw error;toast(data?.text?"AI bağlantısı çalışıyor.":"AI boş yanıt verdi.");}
  catch(err){toast("AI bağlantı hatası: "+(err?.message||"Bilinmeyen hata"))}
  finally{if(btn){btn.disabled=false;btn.textContent="Bağlantıyı test et"}}
}
function openAI(contextId) {
  const c = contextId ? state.contents.find((x) => x.id === contextId) : null;
  sheet(
    `<div class="row between"><div><h2 style="margin:0">✨ 90+ AI</h2><div class="muted">Grok destekli içerik asistanı</div></div><span class="badge">${c ? "İçerik" : "Genel"}</span></div><div id="chat" style="min-height:280px;max-height:55vh;overflow:auto">${state.chat
      .slice(-20)
      .map((m) => `<div class="aiBubble ${m.role}">${escape(m.text)}</div>`)
      .join(
        "",
      )}</div><div class="tabs"><button class="tab aiPrompt">Senaryo yaz</button><button class="tab aiPrompt">Shorts çıkar</button><button class="tab aiPrompt">Grok promptu</button><button class="tab" id="testAI">Bağlantıyı test et</button></div><form class="aiInput" id="aiForm"><input name="message" placeholder="90+ AI’a bir şey sor…" required><button class="iconbtn" style="background:var(--green);color:#062719"><i data-lucide="send"></i></button></form>`,
  );
  $(".aiPrompt") &&
    document.querySelectorAll(".aiPrompt").forEach(
      (x) =>
        (x.onclick = () => {
          $("#aiForm input").value = x.textContent + (c ? " — " + c.title : "");
        }),
    );
  $("#testAI").onclick=testAIConnection;
  $("#aiForm").onsubmit = async (e) => {
    e.preventDefault();
    const input = e.target.message,
      msg = input.value.trim();
    if (!msg) return;
    state.chat.push({ role: "user", text: msg });
    input.value = "";
    $("#chat").insertAdjacentHTML(
      "beforeend",
      `<div class="aiBubble user">${escape(msg)}</div><div class="aiBubble ai" id="thinking">Düşünüyorum…</div>`,
    );
    $("#chat").scrollTop = $("#chat").scrollHeight;
    try {
      const { data, error } = await sb.functions.invoke("studio-ai", {
        body: {
          workspaceId: workspace.id,
          message: msg,
          history: state.chat.slice(-10),
          context: c || {
            channel: state.channel,
            contents: state.contents.map((x) => ({
              title: x.title,
              status: x.status,
              progress: x.progress,
            })),
          },
        },
      });
      if (error) throw error;
      const answer = data?.text || "Yanıt alınamadı.";
      state.chat.push({ role: "ai", text: answer });
      $("#thinking").textContent = answer;
      sync();
    } catch (err) {
      $("#thinking").textContent =
        "AI bağlantı hatası: "+(err?.message||"Edge Function veya Grok anahtarı kontrol edilmeli.");
    }
  };
  icons();
}

async function authScreen() {
  app.innerHTML = `<main class="auth"><div class="stadiumPitch"></div><div class="authLogo"><img class="authAppLogo" src="/icon-512.png" alt="90+ Studio"><h1>90+ STUDIO</h1><p>Fikirden yayına, birlikte üret.</p></div><div class="authPanel"><form id="authForm"><div class="field" id="nameField" style="display:none"><label>Adınız</label><i class="authFieldIcon" data-lucide="users"></i><input name="name" placeholder="Adınız"></div><div class="field"><label>E-posta</label><i class="authFieldIcon" data-lucide="mail"></i><input name="email" type="email" autocomplete="email" placeholder="E-posta" required></div><div class="field"><label>Şifre</label><i class="authFieldIcon" data-lucide="lock-keyhole"></i><input name="password" type="password" autocomplete="current-password" placeholder="Şifre" minlength="6" required></div><button type="button" class="forgot" id="forgot">Şifremi unuttum?</button><div class="authActions"><button class="primary" id="submitAuth">Giriş Yap →</button></div></form><div class="authDivider">veya</div><div class="authSwitch"><span id="switchText">Hesabın yok mu?</span> <button id="switchMode">Kayıt Ol</button></div><p id="authMsg" class="authMessage"></p></div></main>`;
  let mode = "login";
  const paint = () => {
    const signup = mode === "signup";
    $("#nameField").style.display = signup ? "block" : "none";
    $("#forgot").style.display = signup ? "none" : "block";
    $("#submitAuth").textContent = signup ? "Hesap Oluştur →" : "Giriş Yap →";
    $("#switchText").textContent = signup
      ? "Zaten hesabın var mı?"
      : "Hesabın yok mu?";
    $("#switchMode").textContent = signup ? "Giriş Yap" : "Kayıt Ol";
  };
  $("#switchMode").onclick = () => {
    mode = mode === "login" ? "signup" : "login";
    $("#authMsg").textContent = "";
    paint();
  };
  $("#forgot").onclick = forgotPassword;
  $("#authForm").onsubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target),
      email = String(f.get("email")).trim(),
      password = f.get("password"),
      name = f.get("name") || email.split("@")[0];
    $("#authMsg").textContent = "İşlem yapılıyor…";
    const res =
      mode === "signup"
        ? await sb.auth.signUp({
            email,
            password,
            options: { data: { name }, emailRedirectTo: RESET_REDIRECT },
          })
        : await sb.auth.signInWithPassword({ email, password });
    if (res.error)
      return ($("#authMsg").textContent = authError(res.error.message));
    session = res.data.session;
    if (!session)
      return ($("#authMsg").textContent =
        "Doğrulama bağlantısını e-postana gönderdik.");
    await boot();
  };
  icons();
}

function authError(message) {
  const m = String(message || "");
  if (m.includes("Invalid login credentials"))
    return "E-posta veya şifre hatalı.";
  if (m.includes("Email not confirmed"))
    return "E-posta adresin henüz doğrulanmamış.";
  if (m.includes("already registered"))
    return "Bu e-posta zaten kayıtlı. Giriş yap veya şifreni yenile.";
  return m;
}
function forgotPassword() {
  sheet(
    `<h2>Şifreni yenile</h2><p class="muted">E-posta adresine güvenli bir yenileme bağlantısı göndereceğiz.</p><form id="forgotForm"><div class="field"><label>E-posta</label><input name="email" type="email" value="${escape($("#authForm [name=email]")?.value || "")}" required></div><button class="primary">Yenileme Bağlantısı Gönder</button><p id="forgotMsg" class="muted" style="text-align:center"></p></form>`,
  );
  $("#forgotForm").onsubmit = async (e) => {
    e.preventDefault();
    const email = new FormData(e.target).get("email");
    $("#forgotMsg").textContent = "Gönderiliyor…";
    const { error } = await sb.auth.resetPasswordForEmail(email, {
      redirectTo: RESET_REDIRECT,
    });
    $("#forgotMsg").textContent = error
      ? authError(error.message)
      : "Bağlantı gönderildi. E-postadaki düğmeye dokun.";
  };
}
function resetPasswordScreen() {
  app.innerHTML = `<main class="auth"><div class="stadiumPitch"></div><div class="authLogo"><img class="authAppLogo" src="/icon-512.png" alt="90+ Studio"><h1>Yeni Şifre</h1><p>Hesabını güvenle geri al.</p></div><div class="resetCard"><h2>Yeni şifreni belirle</h2><p class="muted">En az 6 karakterlik yeni şifreni iki kez yaz.</p><form id="resetForm"><div class="field"><label>Yeni şifre</label><input name="password" type="password" minlength="6" required></div><div class="field"><label>Yeni şifre tekrar</label><input name="confirm" type="password" minlength="6" required></div><button class="primary">Şifreyi Kaydet</button><p id="resetMsg" class="muted" style="text-align:center"></p></form></div></main>`;
  $("#resetForm").onsubmit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target),
      password = f.get("password");
    if (password !== f.get("confirm"))
      return ($("#resetMsg").textContent = "Şifreler birbiriyle aynı değil.");
    $("#resetMsg").textContent = "Kaydediliyor…";
    const { error } = await sb.auth.updateUser({ password });
    if (error) return ($("#resetMsg").textContent = authError(error.message));
    recoveryMode = false;
    $("#resetMsg").textContent = "Şifren değiştirildi. Uygulama açılıyor…";
    setTimeout(boot, 700);
  };
}
async function handleAuthLink(url) {
  if (!url) return;
  if (url.startsWith(YOUTUBE_REDIRECT)) {
    const params=new URL(url).searchParams;
    if(params.get("status")==="success"){
      toast("YouTube kanalı bağlandı. Veriler alınıyor…");
      await refreshYouTubeStatus();
      await syncYouTube(true);
    }else toast("YouTube bağlantısı kurulamadı: "+(params.get("message")||"Bilinmeyen hata"));
    page="analytics";render();return;
  }
  if (!url.startsWith(RESET_REDIRECT)) return;
  const hash = url.split("#")[1] || "",
    params = new URLSearchParams(hash),
    access_token = params.get("access_token"),
    refresh_token = params.get("refresh_token"),
    type = params.get("type");
  recoveryMode = type === "recovery";
  if (access_token && refresh_token) {
    const { error } = await sb.auth.setSession({ access_token, refresh_token });
    if (error) {
      recoveryMode = false;
      toast("Bağlantı geçersiz veya süresi dolmuş.");
      return authScreen();
    }
  }
  if (recoveryMode) return resetPasswordScreen();
  toast("E-posta doğrulandı.");
  boot();
}
async function workspaceScreen() {
  app.innerHTML = `<main class="auth"><div class="authLogo"><img class="authAppLogo" src="/icon-512.png" alt="90+ Studio"><h1>Çalışma Alanı</h1><p>Kanalınızı iki telefonda birlikte yönetin.</p></div><div class="card" style="color:var(--navy)"><h2>Yeni alan oluştur</h2><p class="muted">İlk telefonda bunu kullan.</p><button class="primary" id="createWs">90+ Futbol’u Oluştur</button></div><div class="card" style="color:var(--navy)"><h2>Koda katıl</h2><div class="field"><input id="joinCode" placeholder="6 haneli ekip kodu"></div><button class="secondary" style="width:100%" id="joinWs">Katıl</button></div><button class="secondary" id="logout">Çıkış Yap</button></main>`;
  $("#logout").onclick = () => sb.auth.signOut();
  $("#createWs").onclick = async () => {
    const { data, error } = await sb.rpc("studio_create_workspace", {
      workspace_name: "90+ Futbol",
    });
    if (error) return toast(error.message);
    workspace = data;
    state = normalizeState(state);
    await sync();
    toast("Ekip kodun: " + data.join_code);
    render();
  };
  $("#joinWs").onclick = async () => {
    const code = $("#joinCode").value.trim().toUpperCase();
    const { data, error } = await sb.rpc("studio_join_workspace", {
      invite_code: code,
      member_name: session.user.user_metadata?.name || session.user.email,
    });
    if (error) return toast(error.message);
    await loadWorkspace();
    if (workspace) render();
  };
}
async function loadWorkspace() {
  const { data: members } = await sb
    .from("studio_members")
    .select("workspace_id,role,studio_workspaces(*)")
    .eq("user_id", session.user.id)
    .limit(1);
  workspace = members?.[0]?.studio_workspaces || null;
  if (workspace) {
    const { data } = await sb
      .from("studio_workspace_state")
      .select("data")
      .eq("workspace_id", workspace.id)
      .maybeSingle();
    if (data?.data) state = normalizeState(data.data);
    else { loadLocal(); state=normalizeState(state); }
    await refreshMediaUrls();
    await refreshYouTubeStatus(true);
    sb.channel("studio-sync")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "studio_workspace_state",
          filter: `workspace_id=eq.${workspace.id}`,
        },
        (p) => {
          if (p.new.updated_by !== session.user.id) {
            state = mergeStates(state,p.new.data,false);
            saveLocal();
            refreshMediaUrls().then(render);
            toast("Ortak çalışma alanı güncellendi");
          }
        },
      )
      .subscribe();
  }
}
async function refreshMediaUrls(){
  if(!state.media?.length)return;
  const previous=new Map(state.media.map(m=>[m.id,m.url]));
  await Promise.all(state.media.map(async m=>{if(!m.path)return;const {data}=await sb.storage.from("studio-media").createSignedUrl(m.path,60*60*24);if(data?.signedUrl)m.url=data.signedUrl}));
  state.contents.forEach(c=>{
    if(c.coverMediaId){const m=state.media.find(x=>x.id===c.coverMediaId);if(m)c.coverUrl=m.url}
    else if(c.coverUrl){const m=state.media.find(x=>previous.get(x.id)===c.coverUrl);if(m){c.coverMediaId=m.id;c.coverUrl=m.url}}
    (c.scenes||[]).forEach(s=>{if(s.imageMediaId){const m=state.media.find(x=>x.id===s.imageMediaId);if(m)s.imageUrl=m.url}else if(s.imageUrl){const m=state.media.find(x=>previous.get(x.id)===s.imageUrl);if(m){s.imageMediaId=m.id;s.imageUrl=m.url}}});
  });
  saveLocal();
}

async function boot() {
  if (recoveryMode) return resetPasswordScreen();
  const { data } = await sb.auth.getSession();
  session = data.session;
  if (!session) return authScreen();
  await loadWorkspace();
  if (!workspace) return workspaceScreen();
  render();
}
function render() {
  if (recoveryMode) return resetPasswordScreen();
  if (!session) return authScreen();
  if (!workspace) return workspaceScreen();
  (
    ({ home, content: contents, detail, calendar, media, analytics })[page] ||
    home
  )();
}
sb.auth.onAuthStateChange((event, s) => {
  session = s;
  if (event === "PASSWORD_RECOVERY") {
    recoveryMode = true;
    return resetPasswordScreen();
  }
  if (!s && !recoveryMode) {
    workspace = null;
    authScreen();
  }
});
CapacitorApp.addListener("appUrlOpen", ({ url }) => handleAuthLink(url));
CapacitorApp.getLaunchUrl()
  .then((data) => (data?.url ? handleAuthLink(data.url) : boot()))
  .catch(boot);


// Доступ до спецтем за посиланням (Supabase Edge Function «topic-access»).
// Гра в Telegram-мініапці надсилає initData (+ join: код посилання, якщо прийшли за ним).
// Перехід до дедлайну посилання (access_links.expires_at) — запис в access_grants, і доступ назавжди
// (поки посилання чи окремий доступ не скасовано на сторінці статистики). Відповідь — список тем.
// Секрети ті самі, що в pro-check: TELEGRAM_BOT_TOKEN, UKR_MOVYCH_BOT_TOKEN. SQL — topic-access.sql.
// Цей файл — копія того, що викладено в Supabase (викладає Claude через конектор).

const TOKENS = ["TELEGRAM_BOT_TOKEN", "UKR_MOVYCH_BOT_TOKEN"]
  .map(name => Deno.env.get(name) || "").filter(Boolean);
const MAX_AGE = 24 * 60 * 60; // initData старіша за добу не приймається
const DB_URL = Deno.env.get("SUPABASE_URL") || "";
const DB_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS"
};
const reply = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), { status, headers: { ...CORS, "Content-Type": "application/json" } });

async function hmac(key: Uint8Array, text: string): Promise<Uint8Array> {
  const k = await crypto.subtle.importKey("raw", key, { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  return new Uint8Array(await crypto.subtle.sign("HMAC", k, new TextEncoder().encode(text)));
}
const hex = (b: Uint8Array) => [...b].map(x => x.toString(16).padStart(2, "0")).join("");

type TgUser = { id: number; username?: string; first_name?: string; last_name?: string };

// Повертає користувача Telegram, якщо initData справжня, інакше null
async function verifiedUser(initData: string): Promise<TgUser | null> {
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");
  if (!hash) return null;
  params.delete("hash");
  const check = [...params].sort(([a], [b]) => a.localeCompare(b)).map(([k, v]) => `${k}=${v}`).join("\n");
  let valid = false;
  for (const token of TOKENS) {
    const secret = await hmac(new TextEncoder().encode("WebAppData"), token);
    if (hex(await hmac(secret, check)) === hash) { valid = true; break; }
  }
  if (!valid) return null;
  const age = Date.now() / 1000 - Number(params.get("auth_date") || 0);
  if (!(age < MAX_AGE)) return null;
  try {
    const user = JSON.parse(params.get("user") || "{}");
    return user.id ? user : null;
  } catch { return null; }
}

async function db(path: string, init: RequestInit = {}) {
  const res = await fetch(`${DB_URL}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: DB_KEY, Authorization: `Bearer ${DB_KEY}`, "Content-Type": "application/json", ...(init.headers || {}) }
  });
  const text = await res.text();
  return res.ok ? (text ? JSON.parse(text) : true) : null;
}

// Теми, до яких у людини є доступ (не скасований ні окремо, ні для всього посилання)
async function topicsOf(userId: number): Promise<string[]> {
  const rows = await db(`access_grants?select=access_links(topic,revoked)&tg_user_id=eq.${userId}&revoked=eq.false`);
  const topics = new Set<string>();
  for (const r of rows || []) if (r.access_links && !r.access_links.revoked) topics.add(r.access_links.topic);
  return [...topics];
}

Deno.serve(async req => {
  if (req.method === "OPTIONS") return reply("ok");
  if (req.method !== "POST") return reply({ error: "POST only" }, 405);

  let body: { initData?: string; join?: string } = {};
  try { body = await req.json(); } catch { /* порожній запит */ }

  const user = await verifiedUser(body.initData || "");
  if (!user) return reply({ topics: [], reason: "not_telegram" });

  let joined: { topic: string; title: string } | null = null;
  let error = "";
  const code = String(body.join || "").replace(/[^A-Za-z0-9]/g, "").slice(0, 16);
  if (code) {
    const links = await db(`access_links?select=code,topic,title,expires_at,revoked&code=eq.${code}`);
    const link = links && links[0];
    if (!link) error = "notfound";
    else if (link.revoked) error = "closed";
    else {
      const had = await db(`access_grants?select=id&code=eq.${code}&tg_user_id=eq.${user.id}`);
      if (had && had.length) joined = { topic: link.topic, title: link.title };
      else if (Date.now() > Date.parse(link.expires_at)) error = "expired";
      else {
        const name = [user.first_name, user.last_name].filter(Boolean).join(" ") || null;
        const ok = await db("access_grants", {
          method: "POST",
          headers: { Prefer: "return=minimal,resolution=ignore-duplicates" },
          body: JSON.stringify({ code, tg_user_id: user.id, username: user.username || null, name })
        });
        if (ok) joined = { topic: link.topic, title: link.title };
        else error = "failed";
      }
    }
  }

  return reply({ topics: await topicsOf(user.id), joined, error });
});

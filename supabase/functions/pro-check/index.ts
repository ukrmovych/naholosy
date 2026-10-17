// Перевірка PRO-підписки (Supabase Edge Function «pro-check»).
// Гра в Telegram-мініапці надсилає initData → функція перевіряє підпис Telegram
// і питає в бота, чи є гравець у закритому PRO-каналі (туди додає Base by mono).
// Секрети функції (Supabase → Edge Functions → Secrets), у репозиторії їх немає:
//   TELEGRAM_BOT_TOKEN — токен @ukrmovych_bot (через нього відкривається мініапка);
//   UKR_MOVYCH_BOT_TOKEN — токен @ukr_movych_bot; PRO_CHAT_ID — id закритого каналу.
// Підпис initData перевіряється токеном того бота, що відкрив гру, а членство в каналі —
// тим ботом, який є там адміном (підходить будь-який із двох).
// Поки PRO_CHAT_ID немає, запит {setup:true} показує канали, куди бота додали адміном.
// Цей файл — копія того, що викладено в Supabase (викладає Claude через конектор).

const TOKENS = ["TELEGRAM_BOT_TOKEN", "UKR_MOVYCH_BOT_TOKEN"]
  .map(name => Deno.env.get(name) || "").filter(Boolean);
const PRO_CHAT_ID = Deno.env.get("PRO_CHAT_ID") || "";
const MAX_AGE = 24 * 60 * 60; // initData старіша за добу не приймається

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

// Повертає id користувача Telegram, якщо initData справжня, інакше null
async function verifiedUserId(initData: string): Promise<number | null> {
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
  try { return JSON.parse(params.get("user") || "{}").id || null; } catch { return null; }
}

async function tgApi(token: string, method: string, query: Record<string, string> = {}) {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}?${new URLSearchParams(query)}`);
  return res.json();
}

Deno.serve(async req => {
  if (req.method === "OPTIONS") return reply("ok");
  if (req.method !== "POST") return reply({ error: "POST only" }, 405);
  if (!TOKENS.length) return reply({ pro: false, configured: false });

  let body: { initData?: string; setup?: boolean } = {};
  try { body = await req.json(); } catch { /* порожній запит */ }

  if (!PRO_CHAT_ID) {
    if (!body.setup) return reply({ pro: false, configured: false });
    // Налаштування: які канали/чати бачать бота адміністратором
    const chats = new Map<number, string>();
    const errors: string[] = [];
    for (const token of TOKENS) {
      const updates = await tgApi(token, "getUpdates", { allowed_updates: JSON.stringify(["my_chat_member"]) });
      if (!updates.ok) { errors.push(updates.description || "getUpdates failed"); continue; }
      for (const u of updates.result || []) {
        const m = u.my_chat_member;
        if (m && m.new_chat_member && m.new_chat_member.status === "administrator") chats.set(m.chat.id, m.chat.title || "");
      }
    }
    return reply({ bots: TOKENS.length, chats: [...chats].map(([id, title]) => ({ id, title })), errors });
  }

  const userId = await verifiedUserId(body.initData || "");
  if (!userId) return reply({ pro: false, reason: "not_telegram" });

  for (const token of TOKENS) {
    const member = await tgApi(token, "getChatMember", { chat_id: PRO_CHAT_ID, user_id: String(userId) });
    if (!member.ok) continue; // цей бот не адмін у каналі — пробуємо інший
    const s = member.result.status;
    const pro = s === "creator" || s === "administrator" || s === "member" || (s === "restricted" && member.result.is_member);
    return reply({ pro });
  }
  return reply({ pro: false, reason: "check_failed" });
});

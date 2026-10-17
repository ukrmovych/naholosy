// Перевірка PRO-підписки (Supabase Edge Function «pro-check»).
// Гра в Telegram-мініапці надсилає initData → функція перевіряє підпис Telegram
// і питає в бота, чи є гравець у закритому PRO-каналі (туди додає Base by mono).
// Секрети функції (Supabase → Edge Functions → Secrets), у репозиторії їх немає:
//   TELEGRAM_BOT_TOKEN — токен @ukrmovych_bot (через нього відкривається мініапка);
//   UKR_MOVYCH_BOT_TOKEN — токен @ukr_movych_bot.
// PRO_CHAT_ID — id закритого каналу «НМТ-качки» (не секрет: без токена з ним нічого не зробиш).
// Підпис initData перевіряється токеном того бота, що відкрив гру, а членство в каналі —
// тим ботом, який є там адміном (підходить будь-який із двох).
// Запит {setup:true} показує, чи є кожен бот адміном у каналі;
// якщо PRO_CHAT_ID порожній — у яких каналах боти щось бачили.
// Запит {initData, report:"текст"} — «підписка є, а доступу немає»: учень отримує посилання-заявку
// в канал, звернення пишеться в таблицю pro_issues (pro-issues.sql), а власнику каналу приходить
// повідомлення від бота (якщо власник колись писав цьому ботові).
// Цей файл — копія того, що викладено в Supabase (викладає Claude через конектор).

const TOKENS = ["TELEGRAM_BOT_TOKEN", "UKR_MOVYCH_BOT_TOKEN"]
  .map(name => Deno.env.get(name) || "").filter(Boolean);
const PRO_CHAT_ID = Deno.env.get("PRO_CHAT_ID") || "-1003890052902";
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

async function tgApi(token: string, method: string, query: Record<string, string> = {}) {
  const res = await fetch(`https://api.telegram.org/bot${token}/${method}?${new URLSearchParams(query)}`);
  return res.json();
}

Deno.serve(async req => {
  if (req.method === "OPTIONS") return reply("ok");
  if (req.method !== "POST") return reply({ error: "POST only" }, 405);
  if (!TOKENS.length) return reply({ pro: false, configured: false });

  let body: { initData?: string; setup?: boolean; report?: string } = {};
  try { body = await req.json(); } catch { /* порожній запит */ }

  if (!PRO_CHAT_ID) {
    if (!body.setup) return reply({ pro: false, configured: false });
    // Налаштування: у яких каналах/групах бот щось бачив (додавання бота, дописи).
    // allowed_updates = [] — стандартний набір оновлень, щоб не змінити налаштування бота.
    const chats = new Map<number, string>();
    const errors: string[] = [];
    for (const token of TOKENS) {
      const updates = await tgApi(token, "getUpdates", { allowed_updates: "[]" });
      if (!updates.ok) { errors.push(updates.description || "getUpdates failed"); continue; }
      for (const u of updates.result || []) {
        const chat = (u.my_chat_member || u.channel_post || u.edited_channel_post || u.message || {}).chat;
        if (chat && chat.type !== "private") chats.set(chat.id, chat.title || "");
      }
    }
    return reply({ bots: TOKENS.length, chats: [...chats].map(([id, title]) => ({ id, title })), errors });
  }

  if (body.setup) {
    // Перевірка налаштування: хто з ботів адмін у каналі
    const bots = [];
    for (const token of TOKENS) {
      const me = await tgApi(token, "getMe");
      const member = me.ok ? await tgApi(token, "getChatMember", { chat_id: PRO_CHAT_ID, user_id: String(me.result.id) }) : me;
      bots.push({ bot: me.ok ? me.result.username : "?", status: member.ok ? member.result.status : member.description });
    }
    return reply({ chat: PRO_CHAT_ID, bots });
  }

  const user = await verifiedUser(body.initData || "");
  if (!user) return reply({ pro: false, reason: "not_telegram" });

  const pro = await isMember(user.id);
  if (pro === null) return reply({ pro: false, reason: "check_failed" });
  if (pro || typeof body.report !== "string") return reply({ pro });
  return reply(await report(user, body.report.trim().slice(0, 1000)));
});

// true/false — чи є в каналі; null — жоден бот не зміг перевірити
async function isMember(userId: number): Promise<boolean | null> {
  for (const token of TOKENS) {
    const member = await tgApi(token, "getChatMember", { chat_id: PRO_CHAT_ID, user_id: String(userId) });
    if (!member.ok) continue; // цей бот не адмін у каналі — пробуємо інший
    const s = member.result.status;
    return s === "creator" || s === "administrator" || s === "member" || (s === "restricted" && member.result.is_member);
  }
  return null;
}

async function db(path: string, init: RequestInit = {}) {
  const res = await fetch(`${DB_URL}/rest/v1/${path}`, {
    ...init,
    headers: { apikey: DB_KEY, Authorization: `Bearer ${DB_KEY}`, "Content-Type": "application/json", ...(init.headers || {}) }
  });
  const text = await res.text();
  return res.ok ? (text ? JSON.parse(text) : true) : null;
}

const esc = (t: string) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// «Підписка є, а доступу немає»
async function report(user: TgUser, message: string) {
  const name = [user.first_name, user.last_name].filter(Boolean).join(" ") || "Без імені";

  // Повторне натискання протягом 30 хв — те саме посилання, без нового повідомлення власнику
  const since = new Date(Date.now() - 30 * 60 * 1000).toISOString();
  const recent = await db(`pro_issues?select=invite_link&tg_user_id=eq.${user.id}&created_at=gte.${since}&order=created_at.desc&limit=1`);
  if (recent && recent[0] && recent[0].invite_link) return { pro: false, reported: true, invite: recent[0].invite_link };

  // Посилання-заявка: учень просить вступити, власник схвалює, перевіривши підписку
  let invite = "";
  for (const token of TOKENS) {
    const link = await tgApi(token, "createChatInviteLink", {
      chat_id: PRO_CHAT_ID, creates_join_request: "true", name: `Заявка: ${name}`.slice(0, 32)
    });
    if (link.ok) { invite = link.result.invite_link; break; }
  }

  await db("pro_issues", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ tg_user_id: user.id, username: user.username || null, name, message: message || null, invite_link: invite || null })
  });

  // Повідомлення власнику каналу
  let notified = false;
  const who = `<a href="tg://user?id=${user.id}">${esc(name)}</a>${user.username ? ` (@${esc(user.username)})` : ""}`;
  const text = `🆘 <b>Підписка є, а доступу до PRO немає</b>\n\n${who}\nid: <code>${user.id}</code>`
    + (message ? `\n\n💬 ${esc(message)}` : "")
    + `\n\nПеревір підписку в Base. Учень отримав посилання-заявку в канал — схвали заявку в «НМТ-качках» (Учасники → Заявки на вступ).`;
  for (const token of TOKENS) {
    const admins = await tgApi(token, "getChatAdministrators", { chat_id: PRO_CHAT_ID });
    const owner = admins.ok && admins.result.find((a: { status: string }) => a.status === "creator");
    if (!owner) continue;
    const sent = await tgApi(token, "sendMessage", { chat_id: String(owner.user.id), text, parse_mode: "HTML" });
    if (sent.ok) { notified = true; break; }
  }

  return { pro: false, reported: true, invite, notified };
}

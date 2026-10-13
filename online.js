// ================== Онлайн-режими «Наголосів» ==================
// Кожен гравець на своєму пристрої; зв'язок — Supabase Realtime (broadcast).
// Хто створив кімнату (ведучий), той керує грою: обирає слова, рахує бали.
//
//  ⚔️ duel   — удвох: однакове слово, бал отримує той, хто відповів правильно і швидше
//  ⏱ sprint — 2–10 гравців: за 60 секунд якомога більше правильних відповідей
//  🏫 class  — учитель веде гру (не грає), учні відповідають, бали за правильність і швидкість
//
// Гра (online.game): "naholosy" — усі три режими; "frazeolohizmy" — поки лише дуель.

const ONLINE_MODES = {
  duel: { title: "⚔️ Онлайн-дуель", max: 2, hostPlays: true },
  sprint: { title: "⏱ Спринт 60 секунд", max: 10, hostPlays: true },
  class: { title: "🏫 Гра для класу", max: 60, hostPlays: false }
};

const ONLINE_DUEL_TARGET = 10;
const ONLINE_DUEL_LIMIT = 12000;   // мс на слово в дуелі
// «Фразеологізми»: речення довше читати, а після раунду — ще й значення фразеологізму
const ONLINE_FRAZEO_LIMIT = 25000;
const ONLINE_FRAZEO_PAUSE = 6000;
const ONLINE_SPRINT_SECONDS = 60;
const ONLINE_SPRINT_PENALTY = 2;   // секунд за помилку
const SUPABASE_JS = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.js";

screens.online = $("online");
const onlineBody = $("online-body");
// Скрипт Telegram вантажиться асинхронно, тому беремо WebApp щоразу заново
const tgWebApp = () => window.Telegram && window.Telegram.WebApp;
let online = null;
let supabaseClient = null;

// Ідентифікатор гравця в онлайн-грі — свій для кожної вкладки/підключення
const ONLINE_ID = Math.random().toString(36).slice(2, 10) + Date.now().toString(36);

// ---------- Допоміжне ----------

function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  Object.entries(props).forEach(([key, value]) => {
    if (key === "class") node.className = value;
    else if (key === "on") Object.entries(value).forEach(([ev, fn]) => node.addEventListener(ev, fn));
    else if (key in node) node[key] = value;
    else node.setAttribute(key, value);
  });
  children.flat().forEach(child => {
    if (child === null || child === undefined || child === false) return;
    node.append(child instanceof Node ? child : String(child));
  });
  return node;
}

function makeRoomCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 5; i++) code += chars[Math.floor(Math.random() * chars.length)];
  return code;
}

// Однакова «випадковість» для всіх гравців (з одного зерна)
function seededRandom(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function seededShuffle(array, rand) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function correctWords(q) {
  return Array.isArray(q.correct) ? q.correct : [q.correct];
}

function formatSeconds(ms) {
  return `${(ms / 1000).toFixed(1).replace(".", ",")} с`;
}

function defaultName() {
  const tgApp = tgWebApp();
  const tgUser = tgApp && tgApp.initDataUnsafe && tgApp.initDataUnsafe.user;
  return storageGet("player_name") || (tgUser && tgUser.first_name) || "";
}

function webInviteLink(code) {
  return `${location.origin}${location.pathname}?room=${code}`;
}

function inviteLink(code) {
  const app = (window.LEADERBOARD_CONFIG || {}).telegramAppLink;
  if (app) return `${app}?startapp=room_${code}`;
  return webInviteLink(code);
}

// ---------- QR-код запрошення ----------
// Бібліотека лежить у грі (vendor/), вантажиться лише коли потрібен QR

let qrLoading = null;

function loadQrLib() {
  if (window.qrcode) return Promise.resolve();
  if (!qrLoading) {
    qrLoading = new Promise((resolve, reject) => {
      const s = document.createElement("script");
      s.src = "vendor/qrcode.js?v=1.4.4";
      s.onload = resolve;
      s.onerror = () => { qrLoading = null; reject(new Error("qr")); };
      document.head.appendChild(s);
    });
  }
  return qrLoading;
}

// Куди веде QR: у Telegram чи одразу в браузер (для класу зручніше браузер —
// учням не треба мати Telegram). Вибір запам'ятовується окремо для кожного режиму.
function qrTarget() {
  if (!(window.LEADERBOARD_CONFIG || {}).telegramAppLink) return "web";
  return storageGet(`qr_target_${online.mode}`) || (online.mode === "class" ? "web" : "tg");
}

function qrLink() {
  return qrTarget() === "web" ? webInviteLink(online.code) : inviteLink(online.code);
}

function qrImage(link) {
  const box = el("div", { class: "qr-box", role: "img", "aria-label": "QR-код запрошення" });
  loadQrLib().then(() => {
    const qr = qrcode(0, "M");
    qr.addData(link);
    qr.make();
    box.innerHTML = qr.createSvgTag({ cellSize: 4, margin: 4, scalable: true });
  }).catch(() => { box.classList.add("qr-error"); box.textContent = "Не вдалося створити QR-код. Перевір інтернет."; });
  return box;
}

function qrTargetSwitch(onChange) {
  if (!(window.LEADERBOARD_CONFIG || {}).telegramAppLink) return null;
  const current = qrTarget();
  return el("div", { class: "qr-target" },
    el("span", { class: "setup-label" }, "QR відкриває гру"),
    el("div", { class: "seg" }, [["web", "🌐 У браузері"], ["tg", "✈️ У Telegram"]].map(([value, label]) => el("button", {
      class: current === value ? "active" : "",
      on: { click: () => { storageSet(`qr_target_${online.mode}`, value); onChange(); } }
    }, label))));
}

function qrCaption() {
  return qrTarget() === "web"
    ? "Наведи камеру телефона на код — гра відкриється в браузері"
    : "Наведи камеру телефона на код — гра відкриється в Telegram";
}

function closeQrOverlay() {
  const ov = document.querySelector(".qr-overlay");
  if (ov) ov.remove();
}

function openQrOverlay() {
  closeQrOverlay();
  track('online_qr', { mode: online.mode });
  const count = el("p", { class: "qr-count" });
  const ov = el("div", { class: "qr-overlay", role: "dialog", "aria-label": "QR-код кімнати" },
    el("button", { class: "icon-btn qr-close", "aria-label": "Закрити", on: { click: closeQrOverlay } }, "✕ Закрити"),
    el("div", { class: "qr-overlay-body" },
      qrImage(qrLink()),
      el("div", { class: "qr-side" },
        el("p", { class: "qr-caption" }, qrCaption()),
        el("p", { class: "qr-or" }, "або «Маю код — приєднатися» і код:"),
        el("div", { class: "room-code" }, online.code),
        count,
        qrTargetSwitch(() => { renderLobby(); openQrOverlay(); }))));
  ov.addEventListener("click", e => { if (e.target === ov) closeQrOverlay(); });
  document.body.appendChild(ov);
  updateQrCount();
}

function updateQrCount() {
  const count = document.querySelector(".qr-overlay .qr-count");
  if (!count || !online) return;
  const n = online.players.length;
  count.textContent = online.mode === "class" ? `Приєдналося учнів: ${n}` : `Гравців у кімнаті: ${n}`;
}

document.addEventListener("keydown", e => { if (e.key === "Escape") closeQrOverlay(); });

// ---------- Статистика ----------

function logOnline(event, extra = {}) {
  if (!online) return;
  if (online.game !== "naholosy") extra = { game: online.game, ...extra };
  const data = { mode: online.mode, players: online.players.length, ...extra };
  gtag('event', `online_${event}`, data);
  if (!leaderboardEnabled || !online.isHost) return;
  // Таблиця online_events (ONLINE.md). Якщо її ще немає — просто нічого не пишемо.
  lbRequest("online_events", {
    method: "POST",
    headers: { Prefer: "return=minimal" },
    body: JSON.stringify({ room: online.code, mode: online.mode, event, players: data.players, details: extra })
  }).catch(() => {});
}

// ---------- Зв'язок ----------

function loadSupabase() {
  if (window.supabase && window.supabase.createClient) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = SUPABASE_JS;
    s.onload = resolve;
    s.onerror = () => reject(new Error("supabase-js"));
    document.head.appendChild(s);
  });
}

async function connectRoom(code, onMessage) {
  // Для автотестів: зв'язок між вкладками без сервера
  if (window.__RT_FAKE) {
    const bc = new BroadcastChannel(`room-${code}`);
    bc.onmessage = e => onMessage(e.data.event, e.data.data);
    return { send: (event, data) => bc.postMessage({ event, data }), leave: () => bc.close() };
  }

  await loadSupabase();
  if (!supabaseClient) supabaseClient = window.supabase.createClient(LB.url, LB.anonKey);
  const channel = supabaseClient.channel(`naholosy-${code}`, { config: { broadcast: { self: false } } });
  channel.on("broadcast", { event: "msg" }, ({ payload }) => onMessage(payload.event, payload.data));
  await new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error("timeout")), 10000);
    channel.subscribe(status => {
      if (status === "SUBSCRIBED") { clearTimeout(timer); resolve(); }
      if (status === "CHANNEL_ERROR" || status === "TIMED_OUT") { clearTimeout(timer); reject(new Error(status)); }
    });
  });
  return {
    send: (event, data) => channel.send({ type: "broadcast", event: "msg", payload: { event, data } }),
    leave: () => supabaseClient.removeChannel(channel)
  };
}

// Надіслати всім і обробити в себе (broadcast не повертає власні повідомлення)
function emit(event, data = {}) {
  if (!online) return;
  online.rt.send(event, data);
  handleMessage(event, data);
}

// ---------- Екрани ----------

function setOnline(title, ...children) {
  $("online-title").textContent = title;
  onlineBody.innerHTML = "";
  onlineBody.append(...children);
}

function openOnline(mode, joinCode = "") {
  clearTimeout(nextTimer);
  showScreen("online");
  if (!leaderboardEnabled) {
    setOnline("Онлайн", el("section", { class: "card online-card" },
      el("p", { class: "online-note" }, "Онлайн-ігри скоро запрацюють 🙂")));
    return;
  }
  renderOnlineStart(mode, joinCode);
}

function renderOnlineStart(mode, joinCode) {
  const nameInput = el("input", { type: "text", maxLength: 20, placeholder: "Як тебе звати?", value: defaultName(), autocomplete: "nickname" });
  const codeInput = el("input", { type: "text", maxLength: 5, placeholder: "КОД", value: joinCode, class: "code-input", autocapitalize: "characters" });
  const status = el("p", { class: "submit-status" });

  const readName = () => {
    const name = normalizeName(nameInput.value);
    const problem = checkName(name);
    if (problem) { status.textContent = problem; status.className = "submit-status bad"; return null; }
    storageSet("player_name", name);
    return name;
  };

  const nameBlock = el("label", { class: "online-label" }, mode === "class" ? "Твоє ім'я (бачитимуть учні)" : "Твоє ім'я", nameInput);

  if (mode) {
    const m = ONLINE_MODES[mode];
    const create = el("button", { class: "btn-primary", on: { click: async () => {
      const name = readName();
      if (!name) return;
      create.disabled = true;
      status.textContent = "Створюю кімнату…"; status.className = "submit-status";
      try { await createRoom(mode, name); } catch (e) { create.disabled = false; status.textContent = "Не вдалося підключитися. Перевір інтернет"; status.className = "submit-status bad"; }
    } } }, mode === "class" ? "Створити кімнату для класу" : "Створити кімнату");
    setOnline(m.title, el("section", { class: "card online-card" }, nameBlock, create, status));
    nameInput.focus();
    return;
  }

  const join = el("button", { class: "btn-primary", on: { click: async () => {
    const name = readName();
    if (!name) return;
    const code = codeInput.value.trim().toUpperCase();
    if (!/^[A-Z0-9]{5}$/.test(code)) { status.textContent = "Код — це 5 символів, як-от K7Q2M"; status.className = "submit-status bad"; return; }
    join.disabled = true;
    status.textContent = "Шукаю кімнату…"; status.className = "submit-status";
    try { await joinRoom(code, name); } catch (e) {
      join.disabled = false;
      status.textContent = e.message === "notfound" ? "Кімнату не знайдено. Перевір код" : e.message === "full" ? "У кімнаті вже немає місць" : e.message === "started" ? "Гра в цій кімнаті вже почалась" : "Не вдалося підключитися. Перевір інтернет";
      status.className = "submit-status bad";
    }
  } } }, "Приєднатися");
  setOnline("Приєднатися до гри", el("section", { class: "card online-card" },
    el("label", { class: "online-label" }, "Код кімнати", codeInput), nameBlock, join, status));
  (joinCode ? nameInput : codeInput).focus();
}

// ---------- Кімната ----------

async function createRoom(mode, name) {
  const code = makeRoomCode();
  const me = { id: ONLINE_ID, name };
  const game = modesGame === "frazeolohizmy" ? "frazeolohizmy" : "naholosy";
  online = { mode, game, code, me, isHost: true, phase: "lobby", players: [], rt: null };
  if (ONLINE_MODES[mode].hostPlays) online.players.push(me);
  online.rt = await connectRoom(code, handleMessage);
  logOnline("create");
  renderLobby();
}

async function joinRoom(code, name) {
  const me = { id: ONLINE_ID, name };
  online = { mode: null, game: "naholosy", code, me, isHost: false, phase: "joining", players: [], rt: null };
  online.rt = await connectRoom(code, handleMessage);
  await new Promise((resolve, reject) => {
    online.joinWait = { resolve, reject, timer: setTimeout(() => reject(new Error("notfound")), 6000) };
    online.rt.send("join", me);
  }).catch(err => { leaveOnline(true); throw err; });
  track('online_join', { mode: online.mode });
}

function leaveOnline(silent = false) {
  closeQrOverlay();
  if (!online) return;
  clearTimeout(online.timer);
  clearInterval(online.ticker);
  if (!silent) online.rt.send(online.isHost ? "closed" : "leave", { id: online.me.id });
  try { online.rt.leave(); } catch (e) { /* вже відключено */ }
  online = null;
}

function broadcastState() {
  emit("state", { mode: online.mode, game: online.game, phase: online.phase, players: online.players, host: online.me.id });
}

function onlinePlayerName(id) {
  const p = online.players.find(x => x.id === id);
  return p ? p.name : "Гравець";
}

// ---------- Обробка повідомлень ----------

function handleMessage(event, data) {
  if (!online) return;
  const host = online.isHost;

  switch (event) {
    case "join": {
      if (!host) return;
      const m = ONLINE_MODES[online.mode];
      if (online.players.some(p => p.id === data.id)) { broadcastState(); return; }
      if (online.phase !== "lobby") { online.rt.send("reject", { id: data.id, reason: "started" }); return; }
      if (online.players.length >= m.max) { online.rt.send("reject", { id: data.id, reason: "full" }); return; }
      online.players.push({ id: data.id, name: data.name });
      broadcastState();
      return;
    }
    case "reject":
      if (data.id === online.me.id && online.joinWait) {
        clearTimeout(online.joinWait.timer);
        online.joinWait.reject(new Error(data.reason));
        online.joinWait = null;
      }
      return;
    case "state": {
      online.players = data.players;
      if (!host) {
        online.mode = data.mode;
        online.game = data.game || "naholosy";
        online.hostId = data.host;
        const inRoom = data.players.some(p => p.id === online.me.id);
        if (online.joinWait && inRoom) {
          clearTimeout(online.joinWait.timer);
          online.joinWait.resolve();
          online.joinWait = null;
        }
        if (!inRoom) return;
      }
      // Лобі показуємо, коли ведучий у лобі (зокрема після «Ще раз»)
      if (data.phase === "lobby") {
        online.phase = "lobby";
        renderLobby();
      }
      return;
    }
    case "leave": {
      const leaving = online.players.find(p => p.id === data.id);
      online.players = online.players.filter(p => p.id !== data.id);
      if (host) {
        if (online.phase === "lobby") broadcastState();
        else if (online.mode === "duel") endDuel(`${leaving ? leaving.name : "Суперник"} вийшов з гри`);
      }
      if (!host && online.phase === "lobby") renderLobby();
      return;
    }
    case "closed":
      if (host) return;
      leaveOnline(true);
      setOnline("Онлайн", el("section", { class: "card online-card" },
        el("p", { class: "online-note" }, "Ведучий закрив кімнату."),
        el("button", { class: "btn-primary", on: { click: () => showModes(modesGame) } }, "До режимів")));
      return;
    default:
      if (online.mode === "duel") duelMessage(event, data);
      else if (online.mode === "sprint") sprintMessage(event, data);
      else if (online.mode === "class") classMessage(event, data);
  }
}

// ---------- Лобі ----------

function renderLobby() {
  const m = ONLINE_MODES[online.mode];
  const players = el("ul", { class: "online-players" },
    online.players.map(p => el("li", { class: p.id === online.me.id ? "me" : "" }, p.name)));

  const children = [el("p", { class: "online-game" }, online.game === "frazeolohizmy" ? "💬 Гра: Фразеологізми" : "🗣️ Гра: Наголоси")];
  if (online.isHost) {
    const link = inviteLink(online.code);
    const share = el("button", { class: "btn-secondary", on: { click: () => shareInvite(link) } }, "📨 Надіслати");
    const qrBtn = el("button", { class: "btn-secondary", on: { click: openQrOverlay } },
      online.mode === "class" ? "🔍 QR на весь екран" : "▦ QR-код");
    if (online.mode === "class") {
      // Для класу QR одразу на екрані: учні сканують його з проєктора
      children.push(
        el("div", { class: "qr-inline" },
          qrImage(qrLink()),
          el("p", { class: "online-hint" }, qrCaption())),
        el("p", { class: "online-hint" }, "Або учні відкривають гру → «Маю код — приєднатися»:"),
        el("div", { class: "room-code", "aria-label": "Код кімнати" }, online.code),
        el("div", { class: "invite-actions" }, qrBtn, share),
        qrTargetSwitch(renderLobby)
      );
    } else {
      children.push(
        el("p", { class: "online-hint" }, "Друг відкриває гру → «Маю код — приєднатися»"),
        el("div", { class: "room-code", "aria-label": "Код кімнати" }, online.code),
        el("div", { class: "invite-actions" }, share, qrBtn)
      );
    }
  } else {
    children.push(el("p", { class: "online-hint" }, `Кімната ${online.code}. Чекаємо, поки ведучий почне гру…`));
  }

  children.push(el("h3", { class: "online-sub" }, online.mode === "class" ? `Учні (${online.players.length})` : `Гравці (${online.players.length}/${m.max})`), players);

  if (online.isHost) {
    const min = online.mode === "class" ? 1 : 2;
    const enough = online.players.length >= min;
    let settings = null;
    if (online.mode === "class") {
      online.classRounds = online.classRounds || 10;
      settings = el("div", { class: "setup-row" }, el("span", { class: "setup-label" }, "Скільки слів"),
        el("div", { class: "seg" }, [10, 20, 30].map(n => el("button", {
          class: online.classRounds === n ? "active" : "",
          on: { click: () => { online.classRounds = n; renderLobby(); } }
        }, n))));
    }
    const start = el("button", { class: "btn-primary", disabled: !enough, on: { click: startOnlineGame } },
      enough ? "Почати гру" : online.mode === "duel" ? "Чекаємо на суперника…" : online.mode === "class" ? "Чекаємо на учнів…" : "Чекаємо на гравців…");
    if (settings) children.push(settings);
    children.push(start);
  }

  setOnline(m.title, el("section", { class: "card online-card" }, ...children));
  updateQrCount();
}

function shareInvite(link) {
  const what = online.game === "frazeolohizmy" ? "онлайн-дуелі у фразеологізми"
    : online.mode === "class" ? "гри в наголоси для класу" : online.mode === "duel" ? "онлайн-дуелі в наголоси" : "спринту в наголоси";
  const text = `Приєднуйся до ${what}! Код кімнати: ${online.code}`;
  track('online_share', { mode: online.mode });
  const tgApp = tgWebApp();
  if (tgApp && tgApp.initData && typeof tgApp.openTelegramLink === "function") {
    tgApp.openTelegramLink(`https://t.me/share/url?url=${encodeURIComponent(link)}&text=${encodeURIComponent(text)}`);
  } else if (navigator.share) {
    navigator.share({ text, url: link }).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(`${text}\n${link}`).then(() => alert("Запрошення скопійовано — встав його в чат з другом"));
  }
}

function startOnlineGame() {
  closeQrOverlay();
  online.seed = Math.floor(Math.random() * 1e9);
  online.phase = "playing";
  online.startedAt = Date.now();
  broadcastState();
  logOnline("start");
  if (online.mode === "duel") startDuelHost();
  else if (online.mode === "sprint") emit("sprint-start", { seed: online.seed });
  else startClassHost();
}

// Слово з варіантами (спільне для всіх режимів)
function wordButtons(q, order, onPick) {
  const box = el("div", { class: "answers" });
  order.forEach(word => {
    const btn = el("button", { class: "answer" });
    btn.dataset.word = word;
    renderStressWord(btn, word);
    btn.addEventListener("click", () => onPick(word, btn, box));
    box.appendChild(btn);
  });
  return box;
}

function markAnswers(box, q, picked) {
  const correct = correctWords(q);
  Array.from(box.children).forEach(b => {
    b.classList.remove("dim", "picked");
    if (correct.includes(b.dataset.word)) b.classList.add("correct");
    else if (b.dataset.word === picked) b.classList.add("wrong");
    else b.classList.add("dim");
  });
}

function orderFor(idx, round) {
  return seededShuffle(naholosyData[idx].words, seededRandom(online.seed + round * 7919));
}

// ================== ⚔️ Онлайн-дуель ==================

function duelLimit() {
  return online.game === "frazeolohizmy" ? ONLINE_FRAZEO_LIMIT : ONLINE_DUEL_LIMIT;
}

// Фразеологізми: речення з пропуском і варіанти-вирази
function frazeoOnlineQuestion(card, onPick) {
  const [before, after] = card.text.split("___");
  const gap = el("span", { class: "address-gap" }, "…");
  const sentence = el("p", { class: "frazeo-sentence" }, before, gap, after);
  const box = el("div", { class: "answers frazeo-answers" });
  card.options.forEach(phrase => {
    const btn = el("button", { class: "answer frazeo-answer" }, phrase);
    btn.dataset.word = phrase;
    btn.addEventListener("click", () => onPick(phrase, btn, box));
    box.appendChild(btn);
  });
  const meaning = el("div");
  return { sentence, gap, box, meaning };
}

function frazeoOnlineReveal(view, card, picked) {
  view.gap.textContent = card.answer;
  view.gap.classList.add(picked === card.answer ? "filled-ok" : "filled-fix");
  view.meaning.innerHTML = "";
  view.meaning.appendChild(el("p", { class: "frazeo-meaning" }, el("b", {}, card.answer), ` — ${card.meaning}`));
  if (picked && picked !== card.answer) {
    view.meaning.appendChild(el("p", { class: "frazeo-meaning frazeo-meaning-wrong" }, el("b", {}, picked), ` — ${frazeoMeaning(picked)}`));
  }
}

function startDuelHost() {
  const pool = online.game === "frazeolohizmy" ? frazeoSentences : naholosyData;
  online.duel = { order: seededShuffle(pool.map((_, i) => i), seededRandom(online.seed)), round: 0, scores: {}, answers: {} };
  online.players.forEach(p => { online.duel.scores[p.id] = 0; });
  nextDuelQuestion();
}

function nextDuelQuestion() {
  const d = online.duel;
  d.round++;
  d.answers = {};
  const idx = d.order[(d.round - 1) % d.order.length];
  if (online.game === "frazeolohizmy") {
    // Варіанти добирає ведучий і надсилає всім — щоб у гравців були однакові
    const card = makeFrazeoCard(frazeoSentences[idx]);
    emit("q", { round: d.round, card: { text: card.text, answer: card.answer, meaning: card.meaning, options: card.options }, scores: d.scores });
  } else {
    emit("q", { round: d.round, idx, order: orderFor(idx, d.round), scores: d.scores });
  }
  clearTimeout(online.timer);
  online.timer = setTimeout(resolveDuelRound, duelLimit() + 1500);
}

function resolveDuelRound() {
  const d = online.duel;
  if (!d || d.resolved === d.round) return;
  d.resolved = d.round;
  clearTimeout(online.timer);
  const right = Object.entries(d.answers).filter(([, a]) => a.ok).sort((a, b) => a[1].ms - b[1].ms);
  const winner = right.length ? right[0][0] : null;
  if (winner) d.scores[winner]++;
  emit("r", { round: d.round, answers: d.answers, winner, scores: d.scores });
  const done = winner && d.scores[winner] >= ONLINE_DUEL_TARGET;
  online.timer = setTimeout(() => done ? endDuel() : nextDuelQuestion(), online.game === "frazeolohizmy" ? ONLINE_FRAZEO_PAUSE : 2600);
}

function endDuel(reason = "") {
  if (!online) return;
  clearTimeout(online.timer);
  emit("end", { scores: online.duel ? online.duel.scores : {}, reason });
}

function duelScoreLine(scores) {
  return el("div", { class: "online-score" },
    online.players.map(p => el("span", { class: p.id === online.me.id ? "me" : "" }, `${p.name}: ${scores[p.id] || 0}`)));
}

function duelMessage(event, data) {
  if (event === "q") {
    const frazeo = Boolean(data.card);
    const q = frazeo ? { correct: data.card.answer } : naholosyData[data.idx];
    online.current = { round: data.round, q, card: data.card, shownAt: performance.now(), answered: false };
    const status = el("p", { class: "feedback" }, "Хто швидше?");
    const onPick = (word, btn, answers) => {
      if (online.current.answered || online.current.round !== data.round) return;
      online.current.answered = true;
      const ms = Math.round(performance.now() - online.current.shownAt);
      const ok = correctWords(q).includes(word);
      btn.classList.add("picked");
      Array.from(answers.children).forEach(b => { if (b !== btn) b.classList.add("dim"); });
      status.textContent = `Твій час: ${formatSeconds(ms)}. Чекаємо суперника…`;
      emit("a", { round: data.round, id: online.me.id, word, ok, ms });
    };
    if (frazeo) {
      const view = frazeoOnlineQuestion(data.card, onPick);
      online.current.box = view.box;
      online.current.view = view;
      online.current.status = status;
      setOnline(ONLINE_MODES.duel.title, duelScoreLine(data.scores),
        el("section", { class: "card" },
          el("p", { class: "question" }, `Речення ${data.round} · до ${ONLINE_DUEL_TARGET} очок`),
          view.sentence, view.meaning, view.box, status));
      return;
    }
    const box = wordButtons(q, data.order, onPick);
    online.current.box = box;
    online.current.status = status;
    setOnline(ONLINE_MODES.duel.title, duelScoreLine(data.scores),
      el("section", { class: "card" }, el("p", { class: "question" }, `Слово ${data.round} · до ${ONLINE_DUEL_TARGET} очок`), box, status));
    return;
  }
  if (event === "a") {
    if (!online.isHost || !online.duel || data.round !== online.duel.round) return;
    online.duel.answers[data.id] = { ok: data.ok, ms: data.ms, word: data.word };
    if (online.players.every(p => online.duel.answers[p.id])) resolveDuelRound();
    return;
  }
  if (event === "r") {
    const cur = online.current;
    if (!cur || cur.round !== data.round) return;
    const mine = data.answers[online.me.id];
    markAnswers(cur.box, cur.q, mine && mine.word);
    if (cur.card) frazeoOnlineReveal(cur.view, cur.card, mine && mine.word);
    const parts = online.players.map(p => {
      const a = data.answers[p.id];
      const who = p.id === online.me.id ? "Ти" : p.name;
      return a ? `${who}: ${formatSeconds(a.ms)} ${a.ok ? "✅" : "❌"}` : `${who}: не встиг ⌛`;
    });
    const verdict = data.winner
      ? (data.winner === online.me.id ? "+1 тобі! ⚡" : `+1 — ${onlinePlayerName(data.winner)}`)
      : "Ніхто не отримав бал";
    cur.status.textContent = `${parts.join(" · ")} → ${verdict}`;
    cur.status.className = "feedback " + (data.winner === online.me.id ? "good" : data.winner ? "bad" : "");
    const line = onlineBody.querySelector(".online-score");
    if (line) line.replaceWith(duelScoreLine(data.scores));
    return;
  }
  if (event === "end") {
    clearTimeout(online.timer);
    if (online.isHost) logOnline("finish", { rounds: online.duel ? online.duel.round : 0, duration_s: Math.round((Date.now() - online.startedAt) / 1000) });
    const ranking = online.players.map(p => ({ ...p, score: data.scores[p.id] || 0 })).sort((a, b) => b.score - a.score);
    const iWon = ranking[0] && ranking[0].id === online.me.id && (!ranking[1] || ranking[0].score > ranking[1].score);
    if (iWon) launchConfetti();
    showOnlineResults(iWon ? "🏆 Перемога!" : "Наступного разу пощастить 💪", ranking.map(p => [p.name, p.score, p.id]), data.reason);
  }
}

// ================== ⏱ Спринт ==================

function sprintMessage(event, data) {
  if (event === "sprint-start") {
    online.seed = data.seed;
    online.sprint = {
      order: seededShuffle(naholosyData.map((_, i) => i), seededRandom(data.seed)),
      pos: 0, correct: 0, wrong: 0, timeLeft: window.__SPRINT_SECONDS || ONLINE_SPRINT_SECONDS, finished: false,
      progress: {}
    };
    online.players.forEach(p => { online.sprint.progress[p.id] = { correct: 0, wrong: 0, done: false }; });
    sprintCountdown(3);
    return;
  }
  if (event === "p" || event === "f") {
    if (!online.sprint) return;
    online.sprint.progress[data.id] = { correct: data.correct, wrong: data.wrong, done: event === "f" };
    renderSprintRivals();
    if (online.sprint.finished) renderSprintResults();
  }
}

function sprintCountdown(n) {
  setOnline(ONLINE_MODES.sprint.title, el("div", { class: "countdown" }, n > 0 ? n : "Старт!"));
  if (n > 0) online.timer = setTimeout(() => sprintCountdown(n - 1), 1000);
  else online.timer = setTimeout(startSprintPlay, 500);
}

function startSprintPlay() {
  const s = online.sprint;
  s.endsAt = performance.now() + s.timeLeft * 1000;
  s.timerEl = el("span", { class: "sprint-time" });
  s.scoreEl = el("span", { class: "sprint-score" });
  s.rivalsEl = el("div", { class: "sprint-rivals" });
  s.card = el("section", { class: "card" });
  setOnline(ONLINE_MODES.sprint.title, el("div", { class: "sprint-bar" }, s.timerEl, s.scoreEl), s.rivalsEl, s.card);
  renderSprintRivals();
  renderSprintWord();
  online.ticker = setInterval(sprintTick, 100);
  sprintTick();
}

function sprintTick() {
  const s = online.sprint;
  if (!s || s.finished) return;
  const left = Math.max(0, s.endsAt - performance.now());
  s.timerEl.textContent = `⏱ ${Math.ceil(left / 1000)} с`;
  s.timerEl.classList.toggle("low", left < 10000);
  s.scoreEl.textContent = `✅ ${s.correct}  ❌ ${s.wrong}`;
  if (left <= 0) finishSprint();
}

function renderSprintWord() {
  const s = online.sprint;
  const idx = s.order[s.pos % s.order.length];
  const q = naholosyData[idx];
  const box = wordButtons(q, orderFor(idx, s.pos), (word, btn, answers) => {
    if (s.finished || s.locked) return;
    s.locked = true;
    const ok = correctWords(q).includes(word);
    markAnswers(answers, q, word);
    if (ok) s.correct++;
    else { s.wrong++; s.endsAt -= ONLINE_SPRINT_PENALTY * 1000; }
    s.progress[online.me.id] = { correct: s.correct, wrong: s.wrong, done: false };
    online.rt.send("p", { id: online.me.id, correct: s.correct, wrong: s.wrong });
    renderSprintRivals();
    sprintTick();
    setTimeout(() => { s.locked = false; s.pos++; if (!s.finished) renderSprintWord(); }, ok ? 250 : 900);
  });
  s.card.innerHTML = "";
  s.card.append(el("p", { class: "question" }, "Обери правильний наголос"), box);
}

function renderSprintRivals() {
  const s = online.sprint;
  if (!s || !s.rivalsEl) return;
  const max = Math.max(1, ...Object.values(s.progress).map(p => p.correct));
  s.rivalsEl.innerHTML = "";
  online.players.forEach(p => {
    const pr = s.progress[p.id] || { correct: 0 };
    s.rivalsEl.append(el("div", { class: "rival" + (p.id === online.me.id ? " me" : "") },
      el("span", { class: "rival-name" }, p.id === online.me.id ? "Ти" : p.name),
      el("span", { class: "rival-track" }, el("span", { class: "rival-fill", style: `width:${(pr.correct / max) * 100}%` })),
      el("span", { class: "rival-num" }, pr.correct)));
  });
}

function finishSprint() {
  const s = online.sprint;
  if (s.finished) return;
  s.finished = true;
  clearInterval(online.ticker);
  s.progress[online.me.id] = { correct: s.correct, wrong: s.wrong, done: true };
  online.rt.send("f", { id: online.me.id, correct: s.correct, wrong: s.wrong });
  if (online.isHost) {
    // фіксуємо статистику, коли всі закінчать (або через 5 секунд)
    online.timer = setTimeout(() => logOnline("finish", { duration_s: ONLINE_SPRINT_SECONDS }), 5000);
  }
  renderSprintResults();
}

function renderSprintResults() {
  const s = online.sprint;
  const ranking = online.players
    .map(p => ({ ...p, ...(s.progress[p.id] || { correct: 0, wrong: 0 }) }))
    .sort((a, b) => b.correct - a.correct || a.wrong - b.wrong);
  const waiting = ranking.filter(p => !p.done).length;
  const tie = ranking.length > 1 && ranking[0].correct === ranking[1].correct && ranking[0].wrong === ranking[1].wrong;
  const iWon = !waiting && !tie && ranking[0].id === online.me.id;
  if (iWon && !s.celebrated) { s.celebrated = true; launchConfetti(); }
  showOnlineResults(
    waiting ? "Час вийшов!" : iWon ? "🏆 Перемога!" : tie && ranking[0].correct === (s.progress[online.me.id] || {}).correct ? "🤝 Нічия!" : "Фініш!",
    ranking.map(p => [p.name, `${p.correct} ✅ · ${p.wrong} ❌${p.done ? "" : " …"}`, p.id]),
    waiting ? `Чекаємо, поки допишуть: ${waiting}` : ""
  );
}

// ================== 🏫 Гра для класу ==================

function classLimit() {
  return 15000;
}

function startClassHost() {
  online.cls = {
    order: seededShuffle(naholosyData.map((_, i) => i), seededRandom(online.seed)),
    round: 0, total: online.classRounds || 10, scores: {}, answers: {}
  };
  online.players.forEach(p => { online.cls.scores[p.id] = 0; });
  nextClassQuestion();
}

function nextClassQuestion() {
  const c = online.cls;
  c.round++;
  c.answers = {};
  c.resolved = false;
  const idx = c.order[c.round - 1];
  emit("q", { round: c.round, total: c.total, idx, order: orderFor(idx, c.round), limit: classLimit() });
  clearTimeout(online.timer);
  online.timer = setTimeout(resolveClassRound, classLimit() + 1000);
}

function resolveClassRound() {
  const c = online.cls;
  if (!c || c.resolved) return;
  c.resolved = true;
  clearTimeout(online.timer);
  clearInterval(online.ticker);
  const gained = {};
  online.players.forEach(p => {
    const a = c.answers[p.id];
    // правильна відповідь: 500 балів + до 500 за швидкість
    gained[p.id] = a && a.ok ? 500 + Math.round(500 * Math.max(0, 1 - a.ms / classLimit())) : 0;
    c.scores[p.id] += gained[p.id];
  });
  emit("r", { round: c.round, total: c.total, gained, scores: c.scores, answers: c.answers });
}

function classRanking(scores) {
  return online.players.map(p => ({ ...p, score: scores[p.id] || 0 })).sort((a, b) => b.score - a.score);
}

function classMessage(event, data) {
  if (event === "q") {
    const q = naholosyData[data.idx];
    const order = data.order;
    online.current = { round: data.round, q, shownAt: performance.now(), answered: false };
    const head = el("p", { class: "question" }, `Слово ${data.round} з ${data.total}`);
    const timer = el("div", { class: "class-timer" }, el("span", { class: "class-timer-fill" }));

    if (online.isHost) {
      // Учитель: великі варіанти (без натискання), таймер, скільки відповіли
      const answered = el("p", { class: "online-hint" }, `Відповіли: 0 з ${online.players.length}`);
      online.current.answeredEl = answered;
      const words = el("div", { class: "answers class-words" }, order.map(w => {
        const b = el("div", { class: "answer" });
        b.dataset.word = w;
        renderStressWord(b, w);
        return b;
      }));
      online.current.box = words;
      setOnline(ONLINE_MODES.class.title, el("section", { class: "card" }, head, timer, words, answered,
        el("button", { class: "btn-secondary", on: { click: resolveClassRound } }, "Показати відповідь")));
    } else {
      const status = el("p", { class: "feedback" }, "");
      const box = wordButtons(q, order, (word, btn, answers) => {
        if (online.current.answered || online.current.round !== data.round) return;
        online.current.answered = true;
        const ms = Math.round(performance.now() - online.current.shownAt);
        btn.classList.add("picked");
        Array.from(answers.children).forEach(b => { if (b !== btn) b.classList.add("dim"); });
        status.textContent = "Відповідь прийнято! Чекаємо інших…";
        emit("a", { round: data.round, id: online.me.id, word, ok: correctWords(q).includes(word), ms });
      });
      online.current.box = box;
      online.current.status = status;
      setOnline(ONLINE_MODES.class.title, el("section", { class: "card" }, head, timer, box, status));
    }
    // смужка часу
    const fill = timer.firstChild;
    clearInterval(online.ticker);
    online.ticker = setInterval(() => {
      const left = Math.max(0, 1 - (performance.now() - online.current.shownAt) / data.limit);
      fill.style.width = `${left * 100}%`;
      if (left <= 0) clearInterval(online.ticker);
    }, 100);
    return;
  }
  if (event === "a") {
    if (!online.isHost || !online.cls || data.round !== online.cls.round) return;
    online.cls.answers[data.id] = { ok: data.ok, ms: data.ms, word: data.word };
    const n = Object.keys(online.cls.answers).length;
    if (online.current && online.current.answeredEl) online.current.answeredEl.textContent = `Відповіли: ${n} з ${online.players.length}`;
    if (online.players.every(p => online.cls.answers[p.id])) resolveClassRound();
    return;
  }
  if (event === "r") {
    clearInterval(online.ticker);
    const cur = online.current;
    if (!cur || cur.round !== data.round) return;
    const last = data.round >= data.total;
    const ranking = classRanking(data.scores);

    if (online.isHost) {
      markAnswers(cur.box, cur.q, null);
      const okCount = Object.values(data.answers).filter(a => a.ok).length;
      const top = el("ol", { class: "leaders-list class-top" }, ranking.slice(0, 5).map(p =>
        el("li", {}, el("span", { class: "name" }, p.name), el("span", { class: "points" }, p.score))));
      const next = el("button", { class: "btn-primary", on: { click: () => last ? emit("end", { scores: data.scores }) : nextClassQuestion() } },
        last ? "🏁 Підсумки" : "Наступне слово →");
      cur.box.parentNode.append(
        el("p", { class: "online-hint" }, `Правильно відповіли: ${okCount} з ${online.players.length}`),
        el("h3", { class: "online-sub" }, "Топ-5"), top, next);
      Array.from(cur.box.parentNode.querySelectorAll(".btn-secondary")).forEach(b => b.remove());
    } else {
      const a = data.answers[online.me.id];
      markAnswers(cur.box, cur.q, a && a.word);
      const place = ranking.findIndex(p => p.id === online.me.id) + 1;
      const gained = data.gained[online.me.id] || 0;
      cur.status.textContent = `${a && a.ok ? `✅ +${gained}` : a ? "❌ +0" : "⌛ Не встиг"} · Разом: ${data.scores[online.me.id] || 0} · Місце: ${place} з ${ranking.length}`;
      cur.status.className = "feedback " + (a && a.ok ? "good" : "bad");
    }
    return;
  }
  if (event === "end") {
    clearTimeout(online.timer);
    clearInterval(online.ticker);
    if (online.isHost) logOnline("finish", { rounds: online.cls ? online.cls.round : 0, duration_s: Math.round((Date.now() - online.startedAt) / 1000) });
    const ranking = classRanking(data.scores);
    const myPlace = ranking.findIndex(p => p.id === online.me.id) + 1;
    if (myPlace === 1 || online.isHost) launchConfetti();
    showOnlineResults(online.isHost ? "🏆 Переможці" : myPlace ? `Твоє місце: ${myPlace} з ${ranking.length}` : "Гру завершено",
      ranking.map(p => [p.name, p.score, p.id]), "", true);
  }
}

// ---------- Підсумки ----------

function showOnlineResults(title, rows, note = "", podium = false) {
  online.phase = "results";
  const list = el("ol", { class: "leaders-list online-results" + (podium ? " podium" : "") },
    rows.map(([name, value, id]) => el("li", { class: id === online.me.id ? "me" : "" },
      el("span", { class: "name" }, name), el("span", { class: "points" }, value))));
  const again = online.isHost
    ? el("button", { class: "btn-primary", on: { click: () => {
      online.phase = "lobby";
      online.duel = online.sprint = online.cls = null;
      broadcastState();
    } } }, "Ще раз з цими гравцями")
    : el("p", { class: "online-hint" }, "Ведучий може почати нову гру — залишайся в кімнаті");
  setOnline(ONLINE_MODES[online.mode].title, el("section", { class: "card online-card" },
    el("h2", { class: "online-result-title" }, title),
    note ? el("p", { class: "online-hint" }, note) : null,
    list, again,
    el("button", { class: "btn-secondary", on: { click: exitOnline } }, "Вийти")));
}

function exitOnline() {
  const game = online ? online.game : modesGame;
  leaveOnline();
  showModes(game === "frazeolohizmy" ? "frazeolohizmy" : "naholosy");
}

// ---------- Події ----------

document.querySelectorAll(".online-mode-btn").forEach(b => {
  b.addEventListener("click", () => openOnline(b.dataset.mode));
});
$("btn-online-join").addEventListener("click", () => openOnline(null));
$("btn-online-back").addEventListener("click", exitOnline);
window.addEventListener("beforeunload", () => leaveOnline());

// Запрошення: …?room=КОД (сайт) або start_param «room_КОД» (мініапка Telegram).
// Telegram передає start_param і в адресі (tgWebAppStartParam), тож не чекаємо його скрипта.
function telegramStartParam() {
  const tgApp = tgWebApp();
  const fromSdk = tgApp && tgApp.initDataUnsafe && tgApp.initDataUnsafe.start_param;
  if (fromSdk) return fromSdk;
  const fromQuery = new URLSearchParams(location.search).get("tgWebAppStartParam");
  if (fromQuery) return fromQuery;
  const hash = new URLSearchParams(location.hash.slice(1));
  const fromHash = hash.get("tgWebAppStartParam");
  if (fromHash) return fromHash;
  const data = hash.get("tgWebAppData");
  return data ? new URLSearchParams(data).get("start_param") || "" : "";
}

function openInviteFromLink() {
  const fromUrl = new URLSearchParams(location.search).get("room");
  const startParam = telegramStartParam();
  const fromTg = startParam && startParam.startsWith("room_") ? startParam.slice(5) : "";
  const code = (fromUrl || fromTg || "").toUpperCase();
  if (!/^[A-Z0-9]{5}$/.test(code)) return false;
  track('online_invite_open', { source: fromTg ? "telegram" : "link" });
  openOnline(null, code);
  return true;
}

// Якщо код не знайшовся одразу — ще раз, коли довантажиться скрипт Telegram
if (!openInviteFromLink() && document.readyState !== "complete") {
  window.addEventListener("load", openInviteFromLink, { once: true });
}

// ---------- Відгуки ----------
// Відгук пишеться в таблицю feedback у Supabase (feedback.sql),
// читати їх можна на сторінці …/stats/ (з паролем)

screens.feedback = $("feedback");

const feedbackState = { rating: 0, role: "" };

function setFeedbackChoice(groupId, attr, value) {
  $(groupId).querySelectorAll("button").forEach(b => {
    const on = b.dataset[attr] === String(value);
    b.classList.toggle("active", on);
    b.setAttribute("aria-checked", String(on));
  });
}

function renderFeedbackButton() {
  const sent = storageGet("feedback_sent") === "1";
  $("feedback-btn-title").textContent = sent ? "Дякуємо за відгук!" : "Залиш відгук";
  $("feedback-btn-sub").textContent = sent
    ? "Хочеш щось додати? Пиши ще — ми все читаємо 🧡"
    : "Чим тобі допоміг тренажер? Це 1 хвилина, а нам — дуже важливо 🧡";
}

function showFeedback() {
  track("feedback_open");
  $("feedback-form").hidden = false;
  $("feedback-thanks").hidden = true;
  $("feedback-status").textContent = "";
  $("feedback-status").className = "submit-status";
  if (!$("feedback-name").value) {
    const tg = window.Telegram && Telegram.WebApp;
    const tgUser = tg && tg.initDataUnsafe && tg.initDataUnsafe.user;
    $("feedback-name").value = storageGet("player_name") || (tgUser && tgUser.first_name) || "";
  }
  // Нік у Telegram надсилаємо лише з дозволу (галочка, за замовчуванням вимкнена)
  const username = telegramUsername();
  $("feedback-contact-row").hidden = !username;
  $("feedback-username").textContent = username ? `@${username}` : "";
  showScreen("feedback");
}

function telegramUsername() {
  const tg = window.Telegram && Telegram.WebApp;
  const user = tg && tg.initData && tg.initDataUnsafe && tg.initDataUnsafe.user;
  return user && user.username ? user.username : "";
}

function feedbackError(text) {
  $("feedback-status").textContent = text;
  $("feedback-status").className = "submit-status bad";
}

async function sendFeedback(e) {
  e.preventDefault();
  const message = $("feedback-text").value.trim();
  if (message.length < 3) {
    feedbackError("Напиши хоч кілька слів 🙂");
    $("feedback-text").focus();
    return;
  }
  if (!leaderboardEnabled) {
    feedbackError("Не вдалося надіслати. Напиши нам у Telegram @ukr_movych");
    return;
  }
  const tg = window.Telegram && Telegram.WebApp;
  const fromTelegram = Boolean(tg && tg.initData);
  const username = telegramUsername();
  const button = $("btn-feedback-send");
  button.disabled = true;
  $("feedback-status").textContent = "Надсилаю…";
  $("feedback-status").className = "submit-status";
  try {
    await lbRequest("feedback", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({
        player: getPlayerId(),
        message,
        rating: feedbackState.rating || null,
        role: feedbackState.role || null,
        name: $("feedback-name").value.trim().slice(0, 40) || null,
        contact: username && $("feedback-contact").checked ? `@${username}` : null,
        can_publish: $("feedback-publish").checked,
        source: fromTelegram ? "telegram" : "web"
      })
    });
    track("feedback_sent", { rating: feedbackState.rating, role: feedbackState.role });
    storageSet("feedback_sent", "1");
    $("feedback-text").value = "";
    renderFeedbackButton();
    $("feedback-form").hidden = true;
    $("feedback-thanks").hidden = false;
    window.scrollTo(0, 0);
  } catch (err) {
    feedbackError("Не вдалося надіслати. Перевір інтернет і спробуй ще раз");
  } finally {
    button.disabled = false;
  }
}

$("feedback-rating").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  feedbackState.rating = Number(b.dataset.rating);
  setFeedbackChoice("feedback-rating", "rating", feedbackState.rating);
});

$("feedback-role").addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  feedbackState.role = b.dataset.role;
  setFeedbackChoice("feedback-role", "role", feedbackState.role);
});

// Підказки: додають початок речення в текст
document.querySelectorAll(".feedback-chips .chip").forEach(chip => {
  chip.addEventListener("click", () => {
    const area = $("feedback-text");
    const start = chip.textContent.replace(/…$/, " ");
    area.value = area.value.trim() ? `${area.value.trimEnd()}\n${start}` : start;
    area.focus();
    area.setSelectionRange(area.value.length, area.value.length);
  });
});

$("feedback-text").addEventListener("input", () => { $("feedback-status").textContent = ""; });
$("btn-feedback").addEventListener("click", showFeedback);
$("btn-feedback-back").addEventListener("click", showMenu);
$("btn-feedback-done").addEventListener("click", showMenu);
$("feedback-form").addEventListener("submit", sendFeedback);
renderFeedbackButton();

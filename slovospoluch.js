// ================== Лексична помилка (словосполучення) — бета, PRO ==================
// Дані — slovospoluch-data.js. Учень бачить словосполучення й обирає «Правильно» / «Неправильно».
// З кожного рядка — дві картки (помилкова й правильна). Перед грою — вибір груп (галочки),
// вибір пам'ятається в localStorage (slovospoluch_groups). Марафон: 3 життя, рекорд best_slovospoluch.
// Гачки в script.js: GAMES, DELAYS, renderMenu, startGame, nextQuestion, updateUI, gameOver,
// renderMistakes, клавіші 1/2. Підключається після script.js.

const SLOVO_GROUPS_KEY = "slovospoluch_groups";

let slovoGroups = (() => {
  try {
    const saved = JSON.parse(localStorage.getItem(SLOVO_GROUPS_KEY) || "null");
    const ids = Array.isArray(saved) ? saved.filter(id => slovospoluchGroups.some(g => g.id === id)) : [];
    if (ids.length) return ids;
  } catch (e) {
    // немає доступу до сховища — беремо всі групи
  }
  return slovospoluchGroups.map(g => g.id);
})();

function saveSlovoGroups() {
  try {
    localStorage.setItem(SLOVO_GROUPS_KEY, JSON.stringify(slovoGroups));
  } catch (e) {
    // нічого страшного — просто не збережеться
  }
}

function slovoRows() {
  return slovospoluchGroups.filter(g => slovoGroups.includes(g.id)).flatMap(g => g.rows);
}

// Скільки карток у грі (з кожного рядка — дві)
function slovoTotal() {
  return slovoRows().length * 2;
}

function slovoQueue() {
  const cards = [];
  slovoRows().forEach(([wrong, right, rule]) => {
    cards.push({ text: wrong, ok: false, wrong, right, rule });
    cards.push({ text: right, ok: true, wrong, right, rule });
  });
  shuffleArray(cards);
  return cards;
}

function renderSlovospoluch() {
  const q = currentQuestion;
  questionEl.textContent = "Чи правильне це словосполучення?";
  hintEl.textContent = "Підказка: можна відповідати клавішами 1 і 2";

  sentenceEl.hidden = false;
  sentenceEl.innerHTML = "";
  const line = document.createElement("p");
  line.className = "slovo-phrase";
  line.textContent = q.text;
  sentenceEl.appendChild(line);

  [["Правильно", true], ["Неправильно", false]].forEach(([label, saysOk]) => {
    const btn = document.createElement("button");
    btn.className = "answer slovo-answer";
    btn.textContent = label;
    btn.onclick = () => {
      const isCorrect = saysOk === q.ok;
      handleAnswer(isCorrect, () => {
        line.classList.add(q.ok ? "slovo-ok" : "slovo-bad");
        Array.from(answersEl.children).forEach(b => {
          if (b === btn) b.classList.add(isCorrect ? "correct" : "wrong");
          else if (!isCorrect) b.classList.add("correct", "blink");
          else b.classList.add("dim");
        });
        // Правильний варіант і пояснення — щоб запам'ятати, а не лише вгадати
        const pair = document.createElement("p");
        pair.className = "slovo-pair";
        if (q.ok) {
          pair.textContent = `✓ ${q.right} — правильно`;
        } else {
          const was = document.createElement("s");
          was.textContent = q.wrong;
          const right = document.createElement("b");
          right.textContent = q.right;
          pair.append("✗ ", was, " → ✓ ", right);
        }
        sentenceEl.appendChild(pair);
        const note = document.createElement("p");
        note.className = "frazeo-meaning";
        note.textContent = q.rule;
        sentenceEl.appendChild(note);
        const next = document.createElement("button");
        next.className = "btn-secondary frazeo-next";
        next.textContent = "Далі →";
        next.addEventListener("click", skipWait);
        sentenceEl.appendChild(next);
      }, { slovo: true, wrong: q.wrong, right: q.right });
    };
    answersEl.appendChild(btn);
  });
}

// Рядок у списку помилок: «✗ мішає працювати → ✓ заважає працювати»
function slovoMistakeNodes(m) {
  const was = document.createElement("span");
  was.className = "was";
  was.textContent = m.wrong;
  const arrow = document.createElement("span");
  arrow.className = "arrow";
  arrow.textContent = "→";
  const right = document.createElement("span");
  right.className = "right plain-right";
  right.textContent = m.right;
  return [was, arrow, right];
}

// ---------- Екран перед грою: вибір груп ----------
const slovoSetup = document.createElement("main");
slovoSetup.id = "slovospoluch-setup";
slovoSetup.className = "screen";
slovoSetup.hidden = true;
slovoSetup.innerHTML = `
  <header class="top-bar">
    <button class="icon-btn" type="button" data-slovo="back" aria-label="В меню">‹ Меню</button>
    <h2 class="screen-title">Словосполучення</h2>
  </header>
  <p class="modes-lead">Обери групи для гри</p>
  <section class="mode-panel">
    <div class="slovo-groups" data-slovo="groups"></div>
    <p class="mode-desc slovo-desc" data-slovo="desc"></p>
    <button class="btn-primary mode-start" type="button" data-slovo="start">
      Почати марафон
      <span class="mode-best" data-best="slovospoluch"></span>
    </button>
    <button class="btn-secondary mode-start endless-start" type="button" data-slovo="endless" hidden>
      ♾ Без обмеження життів
      <span class="mode-best">PRO · рекорд не зараховується</span>
    </button>
  </section>`;
$("modes").after(slovoSetup);
screens.slovospoluch = slovoSetup;

const slovoEl = name => slovoSetup.querySelector(`[data-slovo="${name}"]`);

function renderSlovoSetup() {
  const box = slovoEl("groups");
  box.innerHTML = "";
  slovospoluchGroups.forEach(g => {
    const label = document.createElement("label");
    label.className = "feedback-check slovo-group";
    const input = document.createElement("input");
    input.type = "checkbox";
    input.checked = slovoGroups.includes(g.id);
    input.addEventListener("change", () => {
      slovoGroups = slovospoluchGroups.map(o => o.id)
        .filter(id => (id === g.id ? input.checked : slovoGroups.includes(id)));
      if (slovoGroups.length) saveSlovoGroups();
      updateSlovoSetup();
    });
    const text = document.createElement("span");
    text.textContent = `${g.name} · ${g.rows.length * 2} ${plural(g.rows.length * 2, "картка", "картки", "карток")}`;
    label.append(input, text);
    box.appendChild(label);
  });
  updateSlovoSetup();
}

function updateSlovoSetup() {
  const n = slovoTotal();
  const none = slovoGroups.length === 0;
  const desc = slovoEl("desc");
  desc.classList.toggle("slovo-warn", none);
  desc.textContent = none
    ? "Відміть хоча б одну групу"
    : `${n} ${plural(n, "словосполучення", "словосполучення", "словосполучень")} · 3 життя`;
  slovoEl("start").disabled = none;
  slovoEl("endless").disabled = none;
}

function showSlovospoluchSetup() {
  clearTimeout(nextTimer);
  training = null;
  questionToken++;
  // PRO-марафон без життів: поки замочки вимкнено — у беті для всіх (як у «Наголосах»)
  slovoEl("endless").hidden = !(PRO_ENABLED ? isPro : BETA);
  renderSlovoSetup();
  renderBestScores();
  showScreen("slovospoluch");
}

slovoEl("back").addEventListener("click", showMenu);
slovoEl("start").addEventListener("click", () => { if (slovoGroups.length) startGame("slovospoluch"); });
slovoEl("endless").addEventListener("click", () => { if (slovoGroups.length) startGame("slovospoluch", { endless: true }); });

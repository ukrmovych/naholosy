// «Рандомний тест НМТ» (PRO): випадкове завдання з офіційних тестів НМТ з однією правильною відповіддю.
// Дані — nmt-test-data.js. Номери вже показаних завдань — у localStorage «nmt_seen»,
// щоб завдання не повторювалися, доки не пройдено всі.

screens.nmttest = $("nmttest");
const NMT_LETTERS = ["А", "Б", "В", "Г", "Д"];
let nmtScore = { right: 0, total: 0 };

function nextNmtIndex() {
  let seen = [];
  try { seen = JSON.parse(storageGet("nmt_seen") || "[]"); } catch (e) { seen = []; }
  let left = nmtTestData.map((_, i) => i).filter(i => !seen.includes(i));
  if (!left.length) {
    seen = [];
    left = nmtTestData.map((_, i) => i);
  }
  const index = left[Math.floor(Math.random() * left.length)];
  seen.push(index);
  storageSet("nmt_seen", JSON.stringify(seen));
  return index;
}

function startNmtTest() {
  nmtScore = { right: 0, total: 0 };
  $("nmt-score").textContent = "0 з 0";
  track("game_start", { game_type: "nmttest" });
  showScreen("nmttest");
  showNmtTask();
}

function showNmtTask() {
  const task = nmtTestData[nextNmtIndex()];
  $("nmt-topic").textContent = task.t;
  $("nmt-question").innerHTML = task.q.replace(/\n/g, "<br>"); // дані наші: лише <b>, <i>, <u>
  $("nmt-feedback").textContent = "";
  $("nmt-feedback").className = "feedback";
  $("btn-nmt-next").hidden = true;
  $("nmt-source").textContent = `Джерело: ${task.s}`;
  $("nmt-source").href = task.u;

  const box = $("nmt-answers");
  box.innerHTML = "";
  task.o.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.className = "answer nmt-answer";
    btn.innerHTML = `<span class="nmt-letter">${NMT_LETTERS[i]}</span><span class="nmt-text">${text.replace(/\n/g, "<br>")}</span>`;
    btn.onclick = () => pickNmtAnswer(task, i, btn);
    box.appendChild(btn);
  });
  window.scrollTo(0, 0);
}

function pickNmtAnswer(task, picked, btn) {
  const buttons = Array.from($("nmt-answers").children);
  if (buttons.some(b => b.disabled)) return;
  const ok = picked === task.a;
  buttons.forEach((b, i) => {
    b.disabled = true;
    if (i === task.a) b.classList.add("correct");
    else if (b !== btn) b.classList.add("dim");
  });
  nmtScore.total++;
  if (ok) {
    nmtScore.right++;
    sparkleAt(btn);
  } else {
    btn.classList.add("wrong");
  }
  $("nmt-score").textContent = `${nmtScore.right} з ${nmtScore.total}`;
  const fb = $("nmt-feedback");
  fb.textContent = ok ? PRAISE[Math.floor(Math.random() * PRAISE.length)] : `Правильна відповідь — ${NMT_LETTERS[task.a]}`;
  fb.className = `feedback ${ok ? "good" : "bad"}`;
  $("btn-nmt-next").hidden = false;
  track("nmttest_answer", { game_type: "nmttest", correct: ok });
}

$("btn-nmt-next").addEventListener("click", showNmtTask);
$("btn-nmt-menu").addEventListener("click", showMenu);
// Посилання на джерело: у Telegram відкриваємо зовнішнім браузером
$("nmt-source").addEventListener("click", e => {
  const tg = window.Telegram && Telegram.WebApp;
  if (tg && tg.initData && typeof tg.openLink === "function") {
    e.preventDefault();
    tg.openLink(e.currentTarget.href);
  }
});

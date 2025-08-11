const container = document.getElementById("container");
const gameTitle = document.getElementById("gameTitle");
const gameSelectButtons = document.getElementById("gameSelectButtons");
const btnNagolosi = document.getElementById("btnNagolosi");
const btnLexicalError = document.getElementById("btnLexicalError");
const scoreLives = document.getElementById("scoreLives");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const wordButtons = document.getElementById("wordButtons");
const btnMenu = document.getElementById("btnMenu");

const orange = "#FF7900";
const green = "#4CAF50";

let currentGame = null;

// --- Наголоси ---
const nagolosiPairs = [
  ["павИч", "пАвич"],
  ["партЕр", "пАртер"],
  ["пЕкарський", "пекАрський"],
  ["перЕкис", "пЕрекис"],
  ["перелЯк", "перЕляк"],
  ["перЕпад", "перепАд"],
  ["перЕпис", "пЕрепис"],
  ["піалА", "піАла"],
  ["пІдданий", "піддАний"],
  ["піддАний", "пІдданий"],
  ["пІдлітковий", "підліткОвий", "підлітковИй"],
  ["пітнИй", "пІтний"], // тут пітнИй правильне!
  ["пОдруга", "подрУга"],
  ["пОзначка", "познАчка"],
  ["помІщик", "поміщИк"],
  ["помОвчати", "помовчАти"],
  ["понЯття", "поняттЯ"],
  ["порядкОвий", "порЯдковий"],
  ["посерЕдині", "посередИні"],
  ["прИморозок", "приморОзок"],
  ["прИчіп", "причІп"],
  ["прОділ", "продІл"],
  ["промІжок", "прОміжок"],
  ["псевдонІм", "псевдОнім"],
];

// --- Лексична помилка ---
const lexicalSentences = [
  { text: "Сьогодні я прийняв участь у змаганнях.", correct: ["прийняв"] },
  { text: "Наш захід відвідали багаточисельні гості.", correct: ["багаточисельні"] },
  { text: "Ми мали шалену виручку після свят!", correct: ["виручку"] },
  { text: "Бажаючих поділитись на пам'ятник було багато.", correct: ["Бажаючих"] },
  { text: "Ми внесли вклад у розвиток мистецтва.", correct: ["внесли", "вклад"] },
];

let score = 0;
let lives = 3;
let nagolosiCurrent = null;
let lexicalCurrent = null;

// --- Утиліти ---
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function updateScoreLives() {
  scoreEl.textContent = `Очки: ${score}`;
  livesEl.textContent = "❤️".repeat(lives);
}

function disableWordButtons() {
  const buttons = wordButtons.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = true));
}

function enableWordButtons() {
  const buttons = wordButtons.querySelectorAll("button");
  buttons.forEach((btn) => (btn.disabled = false));
}

function colorButton(btn, color) {
  btn.style.backgroundColor = color;
  btn.style.color = "#fff";
}

function blinkButton(btn, times = 6, intervalMs = 300) {
  let count = 0;
  const originalColor = btn.style.backgroundColor;
  const blinkColor = green;
  const interval = setInterval(() => {
    btn.style.backgroundColor =
      btn.style.backgroundColor === blinkColor ? originalColor : blinkColor;
    count++;
    if (count >= times) {
      clearInterval(interval);
      btn.style.backgroundColor = originalColor;
    }
  }, intervalMs);
}

// --- Головне меню ---
function showMainMenu() {
  currentGame = null;
  score = 0;
  lives = 3;

  gameTitle.textContent = "Виберіть гру";
  gameSelectButtons.style.display = "flex";
  scoreLives.style.display = "none";
  wordButtons.style.display = "none";
  btnMenu.style.display = "none";

  updateScoreLives();
  wordButtons.innerHTML = "";
}

// --- Гра Наголоси ---
function startNagolosi() {
  currentGame = "nagolosi";
  score = 0;
  lives = 3;
  updateScoreLives();

  gameTitle.textContent = "Наголоси";
  gameSelectButtons.style.display = "none";
  scoreLives.style.display = "flex";
  wordButtons.style.display = "flex";
  btnMenu.style.display = "inline-block";

  showNextNagolosi();
}

function showNextNagolosi() {
  if (lives === 0) {
    alert("Гру завершено! Ваш рахунок: " + score);
    showMainMenu();
    return;
  }
  nagolosiCurrent = nagolosiPairs[Math.floor(Math.random() * nagolosiPairs.length)];

  const correctWord = nagolosiCurrent[0];
  const words = [...nagolosiCurrent];
  shuffle(words);

  wordButtons.innerHTML = "";

  words.forEach((word) => {
    const btn = document.createElement("button");
    btn.textContent = word;
    btn.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
    btn.disabled = false;
    btn.addEventListener("click", () => {
      disableWordButtons();

      if (word === correctWord) {
        score++;
        updateScoreLives();
        colorButton(btn, green);
        setTimeout(() => {
          showNextNagolosi();
        }, 200);
      } else {
        lives--;
        updateScoreLives();
        colorButton(btn, "#cc0000"); // червоний неправильний
        // Показуємо правильний зелений і блимаємо
        const buttons = Array.from(wordButtons.children);
        buttons.forEach((b) => {
          if (b.textContent === correctWord) {
            colorButton(b, green);
            blinkButton(b, 6, 300);
          }
        });

        setTimeout(() => {
          if (lives === 0) {
            alert("Гру завершено! Ваш рахунок: " + score);
            showMainMenu();
          } else {
            showNextNagolosi();
          }
        }, 2000);
      }
    });
    wordButtons.appendChild(btn);
  });
}

// --- Гра Лексична помилка ---
function startLexicalError() {
  currentGame = "lexical";
  score = 0;
  lives = 3;
  updateScoreLives();

  gameTitle.textContent = "Лексична помилка";
  gameSelectButtons.style.display = "none";
  scoreLives.style.display = "flex";
  wordButtons.style.display = "flex";
  btnMenu.style.display = "inline-block";

  showNextLexical();
}

function showNextLexical() {
  if (lives === 0) {
    alert("Гру завершено! Ваш рахунок: " + score);
    showMainMenu();
    return;
  }

  lexicalCurrent = lexicalSentences[Math.floor(Math.random() * lexicalSentences.length)];

  // Очищаємо і формуємо кнопки для слів речення
  const words = lexicalCurrent.text.split(/\s+/);
  wordButtons.innerHTML = "";

  words.forEach((wordText) => {
    const cleanWord = wordText.replace(/[.,!?:;]$/g, "");
    const btn = document.createElement("button");
    btn.textContent = wordText;
    btn.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
    btn.disabled = false;

    btn.addEventListener("click", () => {
      disableWordButtons();

      if (lexicalCurrent.correct.includes(cleanWord)) {
        score++;
        updateScoreLives();
        colorButton(btn, green);
        btn.style.textDecoration = "line-through";
        setTimeout(() => {
          showNextLexical();
        }, 200);
      } else {
        lives--;
        updateScoreLives();

        // Закреслити правильні слова, підсвітити зелено і блимати
        const buttons = Array.from(wordButtons.children);
        buttons.forEach((b) => {
          const btnWord = b.textContent.replace(/[.,!?:;]$/g, "");
          if (lexicalCurrent.correct.includes(btnWord)) {
            colorButton(b, green);
            b.style.textDecoration = "line-through";
            blinkButton(b, 6, 300);
          }
        });

        setTimeout(() => {
          if (lives === 0) {
            alert("Гру завершено! Ваш рахунок: " + score);
            showMainMenu();
          } else {
            showNextLexical();
          }
        }, 2000);
      }
    });

    wordButtons.appendChild(btn);
  });
}

// --- Кнопка меню ---
btnMenu.addEventListener("click", () => {
  showMainMenu();
});

// --- Кнопки вибору гри ---
btnNagolosi.addEventListener("click", () => {
  startNagolosi();
});
btnLexicalError.addEventListener("click", () => {
  startLexicalError();
});

// --- Початок ---
showMainMenu();

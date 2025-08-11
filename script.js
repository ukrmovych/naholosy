const games = {
  nagolosi: {
    title: "Наголоси",
    data: [
      { correct: "пітнИй", wrong: "пІтний" },
      { correct: "павИч", wrong: "пАвич" },
      { correct: "партЕр", wrong: "пАртер" },
      { correct: "пЕкарський", wrong: "пекАрський" },
      { correct: "перЕкис", wrong: "пЕрекис" },
      { correct: "перелЯк", wrong: "перЕляк" },
      { correct: "перЕпад", wrong: "перепАд" },
      { correct: "перЕпис", wrong: "пЕрепис" },
      { correct: "піалА", wrong: "піАла" },
      { correct: "(дієприкметник) пІдданий", wrong: "піддАний" },
      { correct: "(іменник, істота) піддАний", wrong: "пІдданий" },
      { correct: "пІдлітковий", wrong: "підліткОвий" },
      { correct: "пітнИй", wrong: "пІтний" },
      { correct: "пОдруга", wrong: "подрУга" },
      { correct: "пОзначка", wrong: "познАчка" },
      { correct: "помІщик", wrong: "поміщИк" },
      { correct: "помОвчати", wrong: "помовчАти" },
      { correct: "понЯття", wrong: "поняттЯ" },
      { correct: "порядкОвий", wrong: "порЯдковий" },
      { correct: "посерЕдині", wrong: "посередИні" },
      { correct: "прИморозок", wrong: "приморОзок" },
      { correct: "прИчіп", wrong: "причІп" },
      { correct: "прОділ", wrong: "продІл" },
      { correct: "промІжок", wrong: "прОміжок" },
      { correct: "псевдонІм", wrong: "псевдОнім" }
    ],
    infinite: true
  },
  leksychnaPomylka: {
    title: "Лексична помилка",
    data: [
      { text: "Сьогодні я *прийняв* участь у змаганнях." },
      { text: "Наш захід відвідали *багаточисельні* гості." },
      { text: "Ми мали шалену *виручку* після свят!" },
      { text: "*Бажаючих* поділитись на пам'ятник було багато." },
      { text: "Ми *внесли вклад* у розвиток мистецтва." }
    ]
  }
};

let currentGame = null;
let currentIndex = 0;
let score = 0;
let lives = 3;
let waiting = false; // щоб заборонити багато натискань

// --- Допоміжні функції ---
function shuffle(array) {
  let arr = array.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// --- ЗАГАЛЬНИЙ ІНТЕРФЕЙС ---

const container = document.getElementById("container");
const titleElem = document.getElementById("gameTitle");
const wordButtonsDiv = document.getElementById("wordButtons");
const scoreElem = document.getElementById("score");
const livesElem = document.getElementById("lives");
const btnMenu = document.getElementById("btnMenu");

btnMenu.style.display = "none";
btnMenu.addEventListener("click", () => {
  showMainMenu();
});

function updateScoreLives() {
  scoreElem.textContent = `Очки: ${score}`;
  livesElem.textContent = `❤️ `.repeat(lives);
}

function disableButtons(disabled) {
  const btns = wordButtonsDiv.querySelectorAll("button");
  btns.forEach(b => (b.disabled = disabled));
}

// --- ГОЛОВНЕ МЕНЮ ---

function showMainMenu() {
  waiting = false;
  currentGame = null;
  currentIndex = 0;
  score = 0;
  lives = 3;
  updateScoreLives();
  btnMenu.style.display = "none";
  titleElem.textContent = "Виберіть гру";
  wordButtonsDiv.innerHTML = "";

  ["nagolosi", "leksychnaPomylka"].forEach(gameKey => {
    const btn = document.createElement("button");
    btn.textContent = games[gameKey].title;
    btn.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
    btn.addEventListener("click", () => {
      startGame(gameKey);
    });
    wordButtonsDiv.appendChild(btn);
  });
}

// --- ГРА: НАГОЛОСИ ---

function startNagolosi() {
  currentIndex = 0;
  score = 0;
  lives = 3;
  updateScoreLives();
  btnMenu.style.display = "inline-block";
  titleElem.textContent = games.nagolosi.title;
  nextNagolosiTask();
}

function nextNagolosiTask() {
  waiting = false;
  wordButtonsDiv.innerHTML = "";
  updateScoreLives();

  if (lives === 0) {
    alert(`Гру завершено! Ваш рахунок: ${score}`);
    showMainMenu();
    return;
  }

  // Вибираємо наступне слово випадково (infinite)
  const idx = Math.floor(Math.random() * games.nagolosi.data.length);
  currentIndex = idx;
  const pair = games.nagolosi.data[idx];

  // Перемішуємо правильне і неправильне слово
  const options = shuffle([pair.correct, pair.wrong]);

  options.forEach(word => {
    const btn = document.createElement("button");
    btn.textContent = word;
    btn.addEventListener("click", () => nagolosiAnswer(word, pair.correct, btn));
    wordButtonsDiv.appendChild(btn);
  });
}

// --- Обробка відповіді в наголос

const btnNagolosi = document.getElementById("btnNagolosi");
const btnLexicalError = document.getElementById("btnLexicalError");
const gameTitle = document.getElementById("gameTitle");
const gameSelectButtons = document.getElementById("gameSelectButtons");
const gameContainer = document.getElementById("gameContainer");

btnNagolosi.addEventListener("click", () => {
  startNagolosi();
});
btnLexicalError.addEventListener("click", () => {
  startLexicalError();
});

// --- Загальні змінні ---
let score = 0;
let lives = 3;
let currentQuestionIndex = 0;

// --- Дані для Наголосів ---
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
  ["пітнИй", "пІтний"],  // Правильне слово - пітнИй
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

// --- Дані для Лексичної помилки ---
const lexicalSentencesRaw = [
  "Сьогодні я *прийняв* участь у змаганнях.",
  "Наш захід відвідали *багаточисельні* гості.",
  "Ми мали шалену *виручку* після свят!",
  "Бажаючих поділитись на пам'ятник було багато.",
  "Ми *внесли вклад* у розвиток мистецтва.",
];

// Обробка речень для лексичної гри (розбиття і позначення правильних слів)
const lexicalSentences = lexicalSentencesRaw.map(raw => {
  // Знайти фрагмент у зірочках
  const regex = /\*(.+?)\*/g;
  let match;
  let correctPhrases = [];
  let text = raw;
  while ((match = regex.exec(raw)) !== null) {
    correctPhrases.push(match[1]);
  }
  // Видалити зірочки з тексту
  text = raw.replace(/\*/g, "");
  // Повертаємо об'єкт з текстом і правильними фразами
  return { text, correctPhrases };
});

// --- СТИЛІ для зеленого кольору (спільний) ---
const greenColorClass = "correct"; // css клас для зеленого кольору
const blinkClass = "blinkGreen"; // css анімація блиму

// --- Функції для обробки життів і очок ---
function renderScoreLives() {
  gameContainer.innerHTML = `
    <div id="scoreLives">
      Очки: ${score}
      <span id="lives">${"❤️".repeat(lives)}</span>
    </div>
  `;
}

function showBackToMenuButton() {
  const btn = document.createElement("button");
  btn.id = "btnBackToMenu";
  btn.textContent = "В меню";
  btn.style.fontFamily = "'Comic Sans MS', cursive, sans-serif";
  btn.onclick = () => {
    resetGame();
    showMainMenu();
  };
  gameContainer.appendChild(btn);
}

// --- Функція для повернення в головне меню ---
function showMainMenu() {
  gameTitle.textContent = "Виберіть гру";
  gameSelectButtons.style.display = "flex";
  gameContainer.innerHTML = "";
}

// --- Скидання параметрів гри ---
function resetGame() {
  score = 0;
  lives = 3;
  currentQuestionIndex = 0;
}

// --- НАГОЛОСИ ---

function startNagolosi() {
  resetGame();
  gameTitle.textContent = "Гра: Наголоси";
  gameSelectButtons.style.display = "none";
  renderScoreLives();
  showNextNagolosiQuestion();
  showBackToMenuButton();
}

function showNextNagolosiQuestion() {
  if (lives <= 0) {
    gameContainer.innerHTML += `<p>Гра завершена! Ваш результат: ${score} очок.</p>`;
    return;
  }
  if (currentQuestionIndex >= nagolosiPairs.length) {
    currentQuestionIndex = 0; // нескінченний цикл
  }

  renderScoreLives();

  // Отримуємо пару та перемішуємо порядок (щоб правильне слово не було завжди першим)
  let pair = [...nagolosiPairs[currentQuestionIndex]];
  shuffleArray(pair);

  // Очистити попередні кнопки
  gameContainer.innerHTML = `
    <div id="scoreLives">
      Очки: ${score} <span id="lives">${"❤️".repeat(lives)}</span>
    </div>
  `;

  // Створюємо кнопки для слів
  pair.forEach(word => {
    const btn = document.createElement("button");
    btn.className = "word-btn";
    btn.textContent = word;
    btn.disabled = false;
    gameContainer.appendChild(btn);

    btn.onclick = () => {
      // Відключити всі кнопки після натискання, щоб не спамили
      Array.from(gameContainer.querySelectorAll("button.word-btn")).forEach(b => b.disabled = true);

      const correctWord = nagolosiPairs[currentQuestionIndex][0]; // перше слово завжди правильне

      if (word === correctWord) {
        score++;
        btn.classList.add("correct");
        // Не блимаємо, відразу показуємо наступне
        setTimeout(() => {
          currentQuestionIndex++;
          showNextNagolosiQuestion();
        }, 500);
      } else {
        lives--;
        btn.classList.add("incorrect"); // зафарбуємо кнопку зеленою і блиматиме
        // Показати правильне слово зеленим і блимаючим
        const correctBtn = Array.from(gameContainer.querySelectorAll("button.word-btn"))
          .find(b => b.textContent === correctWord);
        if (correctBtn) {
          correctBtn.classList.add("incorrect");
        }
        // Затримка 2.5 с, потім наступне питання
        setTimeout(() => {
          currentQuestionIndex++;
          showNextNagolosiQuestion();
        }, 2500);
      }
      renderScoreLives();
    };
  });
}

// --- ЛЕКСИЧНА ПОМИЛКА ---

funct

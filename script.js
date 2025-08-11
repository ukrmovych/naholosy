const btnNaholosy = document.getElementById("btn-naholosy");
const btnLeksychna = document.getElementById("btn-leksychna");
const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu");
const game = document.getElementById("game");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");

let score = 0;
let lives = 3;
let currentGame = "";
let currentQuestion = null;
let lock = false;

// Дані для наголосів
const naholosyData = [
  { words: ["асиметрІя", "асимЕтрія"], correct: "асиметрІя" },
  { words: ["ярмаркОвий", "Ярмарковий"], correct: "ярмаркОвий" },

  // Перші два слова правильні
  { words: ["алфАвіт", "алфавІт", "Алфавіт"], correct: ["алфАвіт", "алфавІт"] },
  { words: ["веснЯний", "веснянИй", "вЕсняний"], correct: ["веснЯний", "веснянИй"] },
  { words: ["пОмилка", "помИлка", "помилкА"], correct: ["пОмилка", "помИлка"] },
  { words: ["мАбуть", "мабУть"], correct: ["мАбуть", "мабУть"] },
  { words: ["зАвжди", "завждИ"], correct: ["зАвжди", "завждИ"] }
];

// Дані для лексичних помилок
const leksychnaData = [
  "Сьогодні я *прийняв* участь у змаганнях.",
  "Наш захід відвідали *багаточисельні* гості.",
  "Ми мали шалену *виручку* після свят!",
  "*Бажаючих* поділитись на пам'ятник було багато.",
  "Ми *внесли* *вклад* у розвиток мистецтва."
];

function startGame(gameType) {
  currentGame = gameType;
  score = 0;
  lives = 3;
  updateUI();
  menu.style.display = "none";
  game.style.display = "block";
  nextQuestion();
}

function updateUI() {
  scoreEl.textContent = `Очки: ${score}`;
  livesEl.textContent = "❤️".repeat(lives);
}

function loseLife() {
  lives--;
  updateUI();
  if (lives <= 0) {
    alert(`Гру закінчено! Твій рахунок: ${score}`);
    showMenu();
  }
}

function nextQuestion() {
  lock = false;
  answersEl.innerHTML = "";
  if (currentGame === "naholosy") {
    currentQuestion = naholosyData[Math.floor(Math.random() * naholosyData.length)];
    questionEl.textContent = "Обери правильний наголос";
    currentQuestion.words.forEach(word => {
      const btn = document.createElement("button");
      btn.textContent = word;
      btn.onclick = () => {
        if (lock) return;
        lock = true;
        // Перевірка правильності відповіді (якщо correct - масив або рядок)
        let isCorrect = Array.isArray(currentQuestion.correct)
          ? currentQuestion.correct.includes(word)
          : word === currentQuestion.correct;

        if (isCorrect) {
          btn.classList.add("correct");
          score++;
          updateUI();
          setTimeout(nextQuestion, 500);
        } else {
          const correctBtn = Array.from(answersEl.children).find(b => 
            Array.isArray(currentQuestion.correct)
              ? currentQuestion.correct.includes(b.textContent)
              : b.textContent === currentQuestion.correct
          );
          if (correctBtn) {
            correctBtn.classList.add("correct", "blink");
          }
          loseLife();
          setTimeout(nextQuestion, 2000);
        }
      };
      answersEl.appendChild(btn);
    });
  } else if (currentGame === "leksychna") {
    const rawSentence = leksychnaData[Math.floor(Math.random() * leksychnaData.length)];
    const correctWords = rawSentence.match(/\*(.*?)\*/g).map(w => w.replace(/\*/g, ""));

    // Відображаємо речення без *
    const displaySentence = rawSentence.replace(/\*/g, "");

    questionEl.textContent = "";

    displaySentence.split(" ").forEach(word => {
      const btn = document.createElement("button");
      btn.textContent = word;
      btn.onclick = () => {
        if (lock) return;
        lock = true;

        // Очищаємо слово від пунктуації для перевірки
        const cleanWord = word.replace(/^[.,!?:;"'()]+|[.,!?:;"'()]+$/g, "");

        // Перевірка, чи правильне слово
        let isCorrect = correctWords.some(correctWord => {
          return correctWord === cleanWord;
        });

        if (isCorrect) {
          btn.classList.add("correct", "strikethrough");
          score++;
          updateUI();
          setTimeout(nextQuestion, 500);
        } else {
          // Закреслити і підсвітити правильні слова
          Array.from(answersEl.children).forEach(b => {
            const bClean = b.textContent.replace(/^[.,!?:;"'()]+|[.,!?:;"'()]+$/g, "");
            if (correctWords.includes(bClean)) {
              b.classList.add("correct", "blink", "strikethrough");
            }
          });
          loseLife();
          setTimeout(nextQuestion, 2000);
        }
      };
      answersEl.appendChild(btn);
    });
  }
}

function showMenu() {
  game.style.display = "none";
  menu.style.display = "block";
}

btnNaholosy.addEventListener("click", () => startGame("naholosy"));
btnLeksychna.addEventListener("click", () => startGame("leksychna"));
btnMenu.addEventListener("click", showMenu);



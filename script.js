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
  // Перші два слова правильні
  { words: ["алфАвіт", "алфавІт", "Алфавіт"], correct: "алфАвіт", "алфавІт" },
  { words: ["веснЯний", "веснянИй", "вЕсняний"], correct: "веснЯний", "веснянИй" },
  { words: ["пОмилка", "помИлка", "помилкА"], correct: "пОмилка", "помИлка" },
  { words: ["зАвжди", "завждИ"], correct: "зАвжди", "завждИ" }
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

    // Копіюємо і перемішуємо масив варіантів
    const shuffledWords = [...currentQuestion.words];
    shuffleArray(shuffledWords);

    shuffledWords.forEach(word => {
      const btn = document.createElement("button");
      btn.textContent = word;
      btn.onclick = () => {
        if (lock) return;
        lock = true;
        if (word === currentQuestion.correct) {
          btn.classList.add("correct");
          score++;
          updateUI();
          setTimeout(nextQuestion, 500);
        } else {
          const correctBtn = Array.from(answersEl.children).find(b => b.textContent === currentQuestion.correct);
          if (correctBtn) correctBtn.classList.add("correct", "blink");
          loseLife();
          setTimeout(nextQuestion, 2000);
        }
      };
      answersEl.appendChild(btn);
    });

  } else if (currentGame === "leksychna") {
    const rawSentence = leksychnaData[Math.floor(Math.random() * leksychnaData.length)];
    const correctWords = rawSentence.match(/\*(.*?)\*/g).map(w => w.replace(/\*/g, ""));
    const displaySentence = rawSentence.replace(/\*/g, "");
    questionEl.textContent = "";
    displaySentence.split(" ").forEach(word => {
      const btn = document.createElement("button");
      btn.textContent = word;
      btn.onclick = () => {
        if (lock) return;
        lock = true;
        if (correctWords.includes(word)) {
          btn.classList.add("correct", "strikethrough");
          score++;
          updateUI();
          setTimeout(nextQuestion, 500);
        } else {
          Array.from(answersEl.children).forEach(b => {
            if (correctWords.includes(b.textContent)) {
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







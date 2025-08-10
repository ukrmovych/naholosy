// --- Загальні функції для меню ---
function showGame(id) {
  document.getElementById('menu').style.display = 'none';
  document.querySelectorAll('.game').forEach(g => g.style.display = 'none');
  document.getElementById(id).style.display = 'block';

  if(id === 'nagolosy') startNagolosy();
  if(id === 'lexpomylka') startLexpomylka();
}

function backToMenu() {
  document.getElementById('menu').style.display = 'block';
  document.querySelectorAll('.game').forEach(g => g.style.display = 'none');
}

// --------------------
// --- Гра Наголоси ---
// --------------------

const nagolosyData = [
  ["пітнИй", "пІтний"],
  ["павИч", "пАвич"],
  ["партЕр", "пАртер"],
  ["пЕкарський", "пекАрський"],
  ["перЕкис", "пЕрекис"],
  ["перелЯк", "перЕляк"],
  ["перЕпад", "перепАд"],
  ["перЕпис", "пЕрепис"],
  ["піалА", "піАла"],
  ["(дієприкметник) пІдданий", "піддАний"],
  ["(іменник, істота) піддАний", "пІдданий"],
  ["пІдлітковий", "підліткОвий", "підлітковИй"],
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
  ["псевдонІм", "псевдОнім"]
];

let nagolosyScore = 0;
let nagolosyLives = 3;
let currentNagolosy = [];
let correctNagolosy = "";

function shuffleArray(arr) {
  for(let i = arr.length -1; i > 0; i--) {
    const j = Math.floor(Math.random()*(i+1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

function startNagolosy() {
  nagolosyScore = 0;
  nagolosyLives = 3;
  document.getElementById('score-nagolosy').textContent = `Очки: ${nagolosyScore}`;
  document.getElementById('lives-nagolosy').textContent = `Життя: ${nagolosyLives}`;
  document.getElementById('restart-nagolosy').style.display = 'none';
  nextNagolosyRound();
}

function nextNagolosyRound() {
  const idx = Math.floor(Math.random()*nagolosyData.length);
  currentNagolosy = nagolosyData[idx];
  correctNagolosy = currentNagolosy[0];
  let shuffled = currentNagolosy.slice();
  shuffleArray(shuffled);
  displayNagolosy(shuffled);
}

function displayNagolosy(words) {
  const container = document.getElementById('words');
  container.innerHTML = "";
  words.forEach(w => {
    const btn = document.createElement('button');
    btn.textContent = w;
    btn.className = "word-button";
    btn.onclick = () => nagolosyCheck(w);
    container.appendChild(btn);
  });
}

function nagolosyCheck(selected) {
  if(selected === correctNagolosy) {
    nagolosyScore++;
    document.getElementById('score-nagolosy').textContent = `Очки: ${nagolosyScore}`;
    nextNagolosyRound();
  } else {
    nagolosyLives--;
    document.getElementById('lives-nagolosy').textContent = `Життя: ${nagolosyLives}`;
    if(nagolosyLives === 0) {
      endNagolosyGame();
    }
  }
}

function endNagolosyGame() {
  alert("Гра завершена! Ви втратили всі життя.");
  document.getElementById('restart-nagolosy').style.display = "inline-block";
}

document.getElementById('restart-nagolosy').onclick = startNagolosy;

// ------------------------
// --- Гра Лексична помилка ---
// ------------------------

const lexSentencesRaw = [
  "Сьогодні я *прийняв* участь у змаганнях.",
  "Наш захід відвідали *багаточисельні* гості.",
  "Ми мали шалену *виручку* після свят!",
  "*Бажаючих* поділитись на пам'ятник було багато.",
  "Ми *внесли вклад* у розвиток мистецтва."
];

let lexSentences = [];
let lexScore = 0;
let lexLives = 3;
let lexCurrentIndex = -1;

function parseLexSentences() {
  lexSentences = lexSentencesRaw.map(s => {
    // Знаходимо виділений фрагмент між *...*
    const match = s.match(/\*(.+?)\*/);
    if(!match) return null;
    const correct = match[1];
    // Розбиваємо речення на масив частин, розділених на correct слово
    const parts = s.split(/\*(.+?)\*/);
    // parts: [до, correct, після]
    return {
      full: s.replace(/\*/g, ""), // речення без зірочок
      correct,
      before: parts[0],
      after: parts[2]
    };
  }).filter(Boolean);
  shuffleArray(lexSentences);
}

function startLexpomylka() {
  lexScore = 0;
  lexLives = 3;
  lexCurrentIndex = -1;
  document.getElementById('score-lexpomylka').textContent = `Очки: ${lexScore}`;
  document.getElementById('lives-lexpomylka').textContent = `Життя: ${lexLives}`;
  document.getElementById('restart-lexpomylka').style.display = 'none';
  parseLexSentences();
  nextLexSentence();
}

function nextLexSentence() {
  lexCurrentIndex++;
  if(lexCurrentIndex >= lexSentences.length) {
    alert(`Вітаємо! Ви пройшли всі речення. Ваш результат: ${lexScore} очок.`);
    document.getElementById('restart-lexpomylka').style.display = 'inline-block';
    return;
  }
  const data = lexSentences[lexCurrentIndex];
  displayLexSentence(data);
}

function displayLexSentence(data) {
  const container = document.getElementById('sentence-container');
  container.innerHTML = "";

  // before частина
  const beforeSpan = document.createElement("span");
  beforeSpan.textContent = data.before;
  container.appendChild(beforeSpan);

  // correct clickable частина
  const correctSpan = document.createElement("span");
  correctSpan.textContent = data.correct;
  correctSpan.className = "highlight";
  correctSpan.onclick = () => lexCheck(true, correctSpan);
  container.appendChild(correctSpan);

  // after частина
  const afterSpan = document.createElement("span");
  afterSpan.textContent = data.after;
  container.appendChild(afterSpan);
}

function lexCheck(isCorrect, element) {
  if(isCorrect) {
    lexScore++;
    document.getElementById('score-lexpomylka').textContent = `Очки: ${lexScore}`;
  } else {
    lexLives--;
    document.getElementById('lives-lexpomylka').textContent = `Життя: ${lexLives}`;
  }

  // Анімація закреслення
  element.classList.add("strikethrough");

  if(lexLives === 0) {
    alert("Гру завершено! Ви втратили всі життя.");
    document.getElementById('restart-lexpomylka').style.display = "inline-block";
    return;
  }

  setTimeout(() => {
    nextLexSentence();
  }, 800);
}

document.getElementById('restart-lexpomylka').onclick = startLexpomylka;


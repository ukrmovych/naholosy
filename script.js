// --- Звукові ефекти ---
const soundCorrect = new Audio('https://actions.google.com/sounds/v1/cartoon/clang_and_wobble.ogg');
const soundWrong = new Audio('https://actions.google.com/sounds/v1/cartoon/slide_whistle_to_drum_hit.ogg');

// Помірна гучність
soundCorrect.volume = 0.15;
soundWrong.volume = 0.15;

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
  updateNagolosyScoreLives();
  document.getElementById('restart-nagolosy').style.display = 'none';
  nextNagolosyRound();
}

function updateNagolosyScoreLives() {
  document.getElementById('score-nagolosy').textContent = `Очки: ${nagolosyScore}`;
  document.getElementById('lives-nagolosy').innerHTML = `Життя: <span class="hearts">${"❤️".repeat(nagolosyLives)}</span>`;
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
    soundCorrect.play();
    updateNagolosyScoreLives();
    nextNagolosyRound();
  } else {
    nagolosyLives--;
    soundWrong.play();
    updateNagolosyScoreLives();
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
    const match = s.match(/\*(.+?)\*/);
    if(!match) return null;
    const correct = match[1];
    const parts = s.split(/\*(.+?)\*/);
    return {
      full: s.replace(/\*/g


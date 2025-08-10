const sentences = [
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
  ["пітнИй", "пІтний"],
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

let score = 0;
let lives = 3;
let currentSentence = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startGame() {
  score = 0;
  lives = 3;
  document.getElementById('score').textContent = `Очки: ${score}`;
  document.getElementById('lives').textContent = `Життя: ${lives}`;
  document.getElementById('restart').style.display = 'none';
  nextRound();
}

function nextRound() {
  const randomIndex = Math.floor(Math.random() * sentences.length);
  currentSentence = sentences[randomIndex];
  shuffleArray(currentSentence);
  displaySentence();
}

function displaySentence() {
  const sentenceElement = document.getElementById('sentence');
  sentenceElement.innerHTML = currentSentence.join(' ');

  const wordsContainer = document.getElementById('words');
  wordsContainer.innerHTML = '';
  currentSentence.forEach(word => {
    const button = document.createElement('button');
    button.textContent = word;
    button.onclick = () => checkAnswer(word);
    wordsContainer.appendChild(button);
  });
}

function checkAnswer(word) {
  if (word === currentSentence[0]) {
    score++;
    document.getElementById('score').textContent = `Очки: ${score}`;
    nextRound();
  } else {
    lives--;
    document.getElementById('lives').textContent = `Життя: ${lives}`;
    if (lives === 0) {
      endGame();
    }
  }
}

function endGame() {
  alert('Гра завершена! Ви втратили всі життя.');
  document.getElementById('restart').style.display = 'block';
}

document.getElementById('restart').onclick = startGame;

startGame();

const accentPairs = [
    { words: ["пІтний", "пітнИй"], correct: 1 },
    { words: ["зАвжди", "завждИ"], correct: 1 },
    { words: ["фОльга", "фольгА"], correct: 0 }
];

const lexicalSentences = [
    "Сьогодні я *прийняв* участь у змаганнях.",
    "Наш захід відвідали *багаточисельні* гості.",
    "Ми мали шалену *виручку* після свят!",
    "*Бажаючих* поділитись на пам'ятник було багато.",
    "Ми *внесли вклад* у розвиток мистецтва."
];

const menu = document.getElementById("menu");
const game = document.getElementById("game");
const scoreEl = document.getElementById("score");
const livesEl = document.getElementById("lives");
const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const menuBtn = document.getElementById("menuBtn");

let gameType = "";
let score = 0;
let lives = 3;

document.getElementById("accentGameBtn").addEventListener("click", () => startGame("accent"));
document.getElementById("lexicalGameBtn").addEventListener("click", () => startGame("lexical"));
menuBtn.addEventListener("click", backToMenu);

function startGame(type) {
    gameType = type;
    score = 0;
    lives = 3;
    menu.style.display = "none";
    game.style.display = "block";
    updateScore();
    updateLives();
    nextQuestion();
}

function backToMenu() {
    game.style.display = "none";
    menu.style.display = "block";
}

function updateScore() {
    scoreEl.textContent = `Очки: ${score}`;
}

function updateLives() {
    livesEl.innerHTML = "❤️".repeat(lives);
}

function nextQuestion() {
    answersEl.innerHTML = "";
    if (gameType === "accent") {
        let pair = accentPairs[Math.floor(Math.random() * accentPairs.length)];
        questionEl.textContent = "Оберіть правильне слово:";
        pair.words.forEach((w, idx) => {
            let btn = document.createElement("button");
            btn.textContent = w;
            btn.onclick = () => checkAccentAnswer(idx, pair.correct, btn);
            answersEl.appendChild(btn);
        });
    } else if (gameType === "lexical") {
        let sentence = lexicalSentences[Math.floor(Math.random() * lexicalSentences.length)];
        showLexicalSentence(sentence);
    }
}

function checkAccentAnswer(selected, correct, btn) {
    disableButtons();
    if (selected === correct) {
        btn.style.backgroundColor = "#4CAF50";
        score++;
        updateScore();
        setTimeout(nextQuestion, 500);
    } else {
        btn.style.backgroundColor = "#FF4444";
        let correctBtn = answersEl.children[correct];
        blinkGreen(correctBtn);
        lives--;
        updateLives();
        if (lives <= 0) endGame();
        else setTimeout(nextQuestion, 2000);
    }
}

function showLexicalSentence(sentence) {
    questionEl.innerHTML = "";
    let parts = sentence.split(/(\*.*?\*)/);
    parts.forEach(part => {
        if (part.startsWith("*") && part.endsWith("*")) {
            let word = part.slice(1, -1);
            let span = document.createElement("button");
            span.textContent = word;
            span.onclick = () => checkLexicalAnswer(true, span);
            questionEl.appendChild(span);
        } else {
            part.split(" ").forEach(w => {
                if (w.trim()) {
                    let btn = document.createElement("button");
                    btn.textContent = w;
                    btn.onclick = () => checkLexicalAnswer(false, btn, sentence);
                    questionEl.appendChild(btn);
                }
            });
        }
    });
}

function checkLexicalAnswer(isCorrect, btn, sentence) {
    disableButtons();
    if (isCorrect) {
        btn.style.backgroundColor = "#4CAF50";
        btn.style.textDecoration = "line-through";
        score++;
        updateScore();
        setTimeout(nextQuestion, 500);
    } else {
        btn.style.backgroundColor = "#FF4444";
        let correctBtn = [...questionEl.children].find(b => lexicalSentences.some(s => b.textContent === s.match(/\*(.*?)\*/)?.[1]));
        if (correctBtn) {
            blinkGreen(correctBtn);
            correctBtn.style.textDecoration = "line-through";
        }
        lives--;
        updateLives();
        if (lives <= 0) endGame();
        else setTimeout(nextQuestion, 2000);
    }
}

function blinkGreen(btn) {
    let i = 0;
    let blink = setInterval(() => {
        btn.style.backgroundColor = i % 2 ? "#4CAF50" : "";
        i++;
        if (i > 5) clearInterval(blink);
    }, 300);
}

function disableButtons() {
    [...answersEl.children, ...questionEl.children].forEach(b => b.disabled = true);
}

function endGame() {
    alert("Гру завершено!");
    backToMenu();
}

const nagolosiWords = [
    ["павИч", "пАвич"],
    ["партЕр", "пАртер"],
    ["пЕкарський", "пекАрський"],
    ["перЕкис", "пЕрекис"],
    ["пітнИй", "пІтний"]
];

const lexicalSentences = [
    "Ми *внесли* свій *вклад* у розвиток проекту.",
    "Сьогодні я *прийняв* участь у змаганнях.",
    "Наш захід відвідали *багаточисельні* гості.",
    "Ми мали шалену *виручку* після свят!"
];

let score = 0;
let lives = 3;
let currentGame = "";

function startGame(gameType) {
    currentGame = gameType;
    score = 0;
    lives = 3;
    updateHUD();
    document.getElementById("menu").style.display = "none";
    document.getElementById("game").style.display = "block";
    loadQuestion();
}

function updateHUD() {
    document.getElementById("score").innerText = "Очки: " + score;
    document.getElementById("lives").innerText = "❤️".repeat(lives);
}

function loadQuestion() {
    const questionElem = document.getElementById("question");
    const answersElem = document.getElementById("answers");
    answersElem.innerHTML = "";
    questionElem.innerHTML = "";

    if (currentGame === "nagolosi") {
        const pair = nagolosiWords[Math.floor(Math.random() * nagolosiWords.length)];
        const correctWord = pair[0];
        const shuffled = [...pair].sort(() => Math.random() - 0.5);

        questionElem.innerText = "Оберіть правильне слово:";
        shuffled.forEach(word => {
            const btn = document.createElement("button");
            btn.className = "answer-btn";
            btn.innerText = word;
            btn.onclick = () => checkNagolosi(word, correctWord, answersElem);
            answersElem.appendChild(btn);
        });
    }

    if (currentGame === "lexical") {
        const sentence = lexicalSentences[Math.floor(Math.random() * lexicalSentences.length)];
        const correctWords = (sentence.match(/\*(.*?)\*/g) || []).map(w => w.replace(/\*/g, ""));
        const displayed = sentence.replace(/\*/g, "");

        questionElem.innerText = displayed;
        const uniqueWords = [...new Set(correctWords)];
        uniqueWords.forEach(word => {
            const btn = document.createElement("button");
            btn.className = "answer-btn";
            btn.innerText = word;
            btn.onclick = () => checkLexical(word, correctWords, answersElem);
            answersElem.appendChild(btn);
        });
    }
}

function checkNagolosi(selected, correct, container) {
    disableButtons(container);
    if (selected === correct) {
        highlightCorrect(container, correct, false);
        score++;
        updateHUD();
        setTimeout(loadQuestion, 500);
    } else {
        lives--;
        updateHUD();
        highlightCorrect(container, correct, true);
        if (lives <= 0) {
            setTimeout(endGame, 2000);
        } else {
            setTimeout(loadQuestion, 2000);
        }
    }
}

function checkLexical(selected, correctWords, container) {
    disableButtons(container);
    if (correctWords.includes(selected)) {
        highlightCorrect(container, correctWords, false);
        score++;
        updateHUD();
        setTimeout(loadQuestion, 500);
    } else {
        lives--;
        updateHUD();
        highlightCorrect(container, correctWords, true);
        if (lives <= 0) {
            setTimeout(endGame, 2000);
        } else {
            setTimeout(loadQuestion, 2000);
        }
    }
}

function highlightCorrect(container, correct, blink) {
    [...container.children].forEach(btn => {
        if (Array.isArray(correct) ? correct.includes(btn.innerText) : btn.innerText === correct) {
            btn.classList.add("correct");
            if (blink) btn.classList.add("blink");
        }
    });
}

function disableButtons(container) {
    [...container.children].forEach(btn => btn.disabled = true);
}

function endGame() {
    alert("Гру закінчено!");
    goToMenu();
}

function goToMenu() {
    document.getElementById("menu").style.display = "block";
    document.getElementById("game").style.display = "none";
}

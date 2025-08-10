const nagolosiData = [
    ["павИч", "пАвич"],
    ["партЕр", "пАртер"],
    ["пЕкарський", "пекАрський"],
    ["перЕкис", "пЕрекис"],
    ["пІтний", "пітнИй"]
];

const leksychnaData = [
    "Сьогодні я *прийняв* участь у змаганнях.",
    "Наш захід відвідали *багаточисельні* гості.",
    "Ми мали шалену *виручку* після свят!",
    "*Бажаючих* поділитись на пам'ятник було багато.",
    "Ми *внесли вклад* у розвиток мистецтва."
];

let currentGame = "";
let score = 0;
let lives = 3;
let tasks = [];

function startGame(type) {
    currentGame = type;
    score = 0;
    lives = 3;

    document.getElementById("main-menu").style.display = "none";
    document.getElementById("game-over").style.display = "none";
    document.getElementById("game-screen").style.display = "block";

    tasks = [...(type === "nagolosi" ? nagolosiData : leksychnaData)];
    shuffle(tasks);

    updateLives();
    nextTask();
}

function exitToMenu() {
    document.getElementById("main-menu").style.display = "block";
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("game-over").style.display = "none";
}

function updateLives() {
    document.getElementById("lives").innerHTML = "❤️".repeat(lives);
}

function nextTask() {
    if (tasks.length === 0) {
        endGame();
        return;
    }

    const task = tasks.pop();
    const taskEl = document.getElementById("task");
    const answersEl = document.getElementById("answers");

    answersEl.innerHTML = "";
    taskEl.innerHTML = "";

    if (currentGame === "nagolosi") {
        let words = [...task];
        shuffle(words);
        words.forEach(w => {
            const btn = document.createElement("div");
            btn.className = "answer-btn";
            btn.textContent = w;
            btn.onclick = () => checkNagolosi(w, task[0]);
            answersEl.appendChild(btn);
        });
    } else {
        let match = task.match(/\*(.*?)\*/);
        let correct = match[1];
        let sentence = task.replace(/\*/g, "");

        taskEl.innerHTML = sentence.split(" ").map(word => {
            return `<span class="answer-btn">${word}</span>`;
        }).join(" ");

        document.querySelectorAll("#task .answer-btn").forEach(btn => {
            btn.onclick = () => checkLeks(btn.textContent, correct, btn);
        });
    }
}

function checkNagolosi(selected, correct) {
    if (selected === correct) {
        score++;
        document.getElementById("correct-sound").play();
    } else {
        lives--;
        document.getElementById("wrong-sound").play();
    }
    updateLives();
    if (lives <= 0) endGame();
    else nextTask();
}

function checkLeks(selected, correct, element) {
    element.classList.add("strike");
    if (selected === correct) {
        score++;
        document.getElementById("correct-sound").play();
    } else {
        lives--;
        document.getElementById("wrong-sound").play();
    }
    updateLives();
    setTimeout(() => {
        if (lives <= 0) endGame();
        else nextTask();
    }, 800);
}

function endGame() {
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("game-over").style.display = "block";
    document.getElementById("final-score").textContent = score;
}

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

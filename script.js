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

const monkeyGifs = [
    "https://media.giphy.com/media/13borq7Zo2kulO/giphy.gif",
    "https://media.giphy.com/media/GeimqsH0TLDt4tScGw/giphy.gif",
    "https://media.giphy.com/media/3oriO0OEd9QIDdllqo/giphy.gif",
    "https://media.giphy.com/media/5xaOcLT6R2vWC5fKpYA/giphy.gif"
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
    showRandomMonkey();
    nextTask();
}

function exitToMenu() {
    document.getElementById("main-menu").style.display = "block";
    document.getElementById("game-screen").style.display = "none";
    document.getElementById("game-over").style.display = "none";
    document.getElementById("monkey-container").innerHTML = "";
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
        let [correct, wrong] = task;
        let words = [correct, wrong];
        shuffle(words);
        words.forEach(w => {
            const btn = document.createElement("div");
            btn.className = "answer-btn";
            btn.textContent = w;
            btn.onclick = () => checkNagolosi(w, correct, btn, answersEl);
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
            btn.onclick = () => checkLeks(btn.textContent, correct, btn, taskEl);
        });
    }
}

function checkNagolosi(selected, correct, btn, container) {
    if (selected === correct) {
        btn.classList.add("correct");
        document.getElementById("correct-sound").play();
        score++;
        setTimeout(nextTask, 500);
    } else {
        lives--;
        document.getElementById("wrong-sound").play();
        [...container.children].forEach(b => {
            if (b.textContent === correct) {
                b.classList.add("correct", "blink");
            }
        });
        updateLives();
        if (lives <= 0) endGame();
        else setTimeout(nextTask, 2000);
    }
}

function checkLeks(selected, correct, clickedBtn, container) {
    if (selected === correct) {
        clickedBtn.classList.add("correct", "strike");
        document.getElementById("correct-sound").play();
        score++;
        setTimeout(nextTask, 800);
    } else {
        lives--;
        document.getElementById("wrong-sound").play();
        container.querySelectorAll(".answer-btn").forEach(b => {
            if (b.textContent === correct) {
                b.classList.add("correct", "strike", "blink");
            }
        });
        updateLives();
        if (lives <= 0) endGame();
        else setTimeout(nextTask, 2000);
    }
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

function showRandomMonkey() {
    const img = document.createElement("img");
    img.src = monkeyGifs[Math.floor(Math.random() * monkeyGifs.length)];
    document.getElementById("monkey-container").innerHTML = "";
    document.getElementById("monkey-container").appendChild(img);
}

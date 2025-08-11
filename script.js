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
  { words: ["відвезтИ", "відвЕзти"], correct: "відвезтИ" },
 { words: ["відвестИ", "відвЕсти"], correct: "відвестИ" },
  { words: ["віднестИ", "віднЕсти"], correct: "віднестИ" },
  { words: ["децимЕтр", "децИметр"], correct: "децимЕтр" },
  { words: ["довезтИ", "довЕзти"], correct: "довезтИ" },
  { words: ["довестИ", "довЕсти"], correct: "довестИ" },
  { words: ["донестИ", "донЕсти"], correct: "донестИ" },
  { words: ["завдАння", "завданнЯ"], correct: "завдАння" },
  { words: ["завезтИ", "завЕзти"], correct: "завезтИ" },
  { words: ["завестИ", "завЕсти"], correct: "завестИ" },
  { words: ["занестИ", "занЕсти"], correct: "занестИ" },
  { words: ["зібрАння", "зібраннЯ"], correct: "зібрАння" },
  { words: ["зрАння", "зраннЯ"], correct: "зрАння" },
  { words: ["індУстрія", "індустрІя"], correct: "індУстрія" },
  { words: ["кіломЕтр", "кілОметр"], correct: "кіломЕтр" },
  { words: ["кОлія", "коліЯ"], correct: "кОлія" },
  { words: ["кулінАрія", "кулінарІя"], correct: "кулінАрія" },
  { words: ["металУргія", "металургІя"], correct: "металУргія" },
  { words: ["мілімЕтр", "мілІметр"], correct: "мілімЕтр" },
  { words: ["навчАння", "навчаннЯ"], correct: "навчАння" },
  { words: ["нанестИ", "нанЕсти"], correct: "нанестИ" },
  { words: ["нестИ", "нЕсти"], correct: "нестИ" },
  { words: ["обрАння", "обраннЯ"], correct: "обрАння" },
  { words: ["перевезтИ", "перевЕзти"], correct: "перевезтИ" },
  { words: ["перевестИ", "перевЕсти"], correct: "перевестИ" },
  { words: ["перенестИ", "перенЕсти"], correct: "перенестИ" },
  { words: ["пізнАння", "пізнаннЯ"], correct: "пізнАння" },
  { words: ["піцЕрія", "піцерІя"], correct: "піцЕрія" },
  { words: ["привезтИ", "привЕзти"], correct: "привезтИ" },
  { words: ["привестИ", "привЕсти"], correct: "привестИ" },
  { words: ["принестИ", "принЕсти"], correct: "принестИ" },
  { words: ["сантимЕтр", "сантИметр"], correct: "сантимЕтр" },
  { words: ["симетрІя", "симЕтрія"], correct: "симетрІя" },
  { words: ["течіЯ", "тЕчія"], correct: "течіЯ" },
  { words: ["травестІя", "травЕстія", "трАвестія"], correct: "травестІя" },
  { words: ["уподОбання", "уподобАння"], correct: "уподОбання" },
  { words: ["читАння", "читаннЯ", "чИтання"], correct: "читАння" },
  { words: ["Аркушик", "аркУшик"], correct: "Аркушик" },
  { words: ["багаторазОвий", "багаторАзовий"], correct: "багаторазОвий" },
  { words: ["безпринцИпний", "безпрИнципний"], correct: "безпринцИпний" },
  { words: ["бЕшкет", "бешкЕт"], correct: "бЕшкет" },
  { words: ["блАговіст", "благовІст", "благОвіст"], correct: "блАговіст" },
  { words: ["близькИй", "блИзький"], correct: "близькИй" },
  { words: ["болотИстий", "болОтистий"], correct: "болотИстий" },
  { words: ["борОдавка", "бородАвка"], correct: "борОдавка" },
  { words: ["босОніж", "босонІж"], correct: "босОніж" },
  { words: ["боЯзнь", "бОязнь"], correct: "боЯзнь" },
  { words: ["бурштинОвий", "бурштИновий"], correct: "бурштинОвий" },
  { words: ["бюлетЕнь", "бЮлетень"], correct: "бюлетЕнь" },
  { words: ["вантажІвка", "вантАжівка"], correct: "вантажІвка" },
  { words: ["вИгода", "вигОда"], correct: "вИгода" },
  { words: ["вигОда", "вИгода"], correct: "вигОда" },
  { words: ["вимОга", "вИмога"], correct: "вимОга" },
  { words: ["вИпадок", "випАдок", "випAдок"], correct: "вИпадок" },
  { words: ["вирАзний", "вИразний"], correct: "вирАзний" },
  { words: ["вИсіти", "висІти"], correct: "вИсіти" },
  { words: ["вИтрата", "витрАта"], correct: "вИтрата" },
  { words: ["вишИваний", "вишивАний"], correct: "вишИваний" },
  { words: ["вІдгомін", "відгОмін"], correct: "вІдгомін" },
  { words: ["вІдомість", "відОмість"], correct: "вІдомість" },
  { words: ["відОмість", "вІдомість"], correct: "відОмість" },
  { words: ["вІрші", "віршІ"], correct: "вІрші" },
  { words: ["віршовИй", "віршОвий", "вІршовий"], correct: "віршовИй" },
  { words: ["вітчИм", "вІтчим"], correct: "вітчИм" },
  { words: ["глядАч", "глЯдач"], correct: "глядАч" },
  { words: ["горошИна", "горОшина"], correct: "горошИна" },
  { words: ["граблІ", "грАблі"], correct: "граблІ" },
  { words: ["гуртОжиток", "гуртожИток"], correct: "гуртОжиток" },
  { words: ["данИна", "дАнина"], correct: "данИна" },
  { words: ["дАно", "данО"], correct: "дАно" },
  { words: ["дЕщиця", "дещИця"], correct: "дЕщиця" },
  { words: ["де-Юре", "де-юрЕ"], correct: "де-Юре" },
  { words: ["джерелО", "джЕрело"], correct: "джерелО" },
  { words: ["дИвлячись", "дивлячИсь"], correct: "дИвлячись" },
  { words: ["дичАвіти", "дичавІти"], correct: "дичАвіти" },
  { words: ["діалОг", "діАлог"], correct: "діалОг" },
  { words: ["добовИй", "добОвий"], correct: "добовИй" },
  { words: ["добУток", "дОбуток"], correct: "добУток" },
  { words: ["довІдник", "довіднИк"], correct: "довІдник" },
  { words: ["дОгмат", "догмАт"], correct: "дОгмат" },
  { words: ["дОнька", "донькА"], correct: "дОнька" },
  { words: ["дочкА", "дОчка"], correct: "дочкА" },
  { words: ["дрОва", "дровА"], correct: "дрОва" },
  { words: ["експЕрт", "Експерт"], correct: "експЕрт" },
  { words: ["єретИк", "єрЕтик"], correct: "єретИк" },
  { words: ["жалюзІ", "жАлюзі"], correct: "жалюзІ" },
  { words: ["завчасУ", "завчАсу"], correct: "завчасУ" },
  { words: ["заіржАвілий", "заіржавІлий"], correct: "заіржАвілий" },
  { words: ["заіржАвіти", "заіржавІти"], correct: "заіржАвіти" },
  { words: ["закінчИти", "закІнчити"], correct: "закінчИти" },
  { words: ["залишИти", "залИшити"], correct: "залишИти" },
  { words: ["замІжня", "заміжнЯ"], correct: "замІжня" },
  { words: ["заробІток", "зІробіток"], correct: "заробІток" },
  { words: ["застОпорити", "застопорИти"], correct: "застОпорити" },
  { words: ["зобразИти", "зобрАзити"], correct: "зобразИти" },
  { words: ["зрУчний", "зручнИй"], correct: "зрУчний" },
  { words: ["зубОжіння", "зубожІння"], correct: "зубОжіння" },
  { words: ["кАмбала", "камбалА"], correct: "кАмбала" },
  { words: ["каталОг", "катАлог"], correct: "каталОг" },
  { words: ["квартАл", "квАртал"], correct: "квартАл" },
  { words: ["кИшка", "кишкА"], correct: "кИшка" },
  { words: ["кінчИти", "кІнчити"], correct: "кінчИти" },
  { words: ["кОлесо", "колесО"], correct: "кОлесо" },
  { words: ["кОпчений", "копчЕний"], correct: "кОпчений" },
  { words: ["копчЕний", "кОпчений"], correct: "копчЕний" },
  { words: ["корИсний", "кОрисний"], correct: "корИсний" },
  { words: ["кОсий", "косИй"], correct: "кОсий" },
  { words: ["котрИй", "кОтрий"], correct: "котрИй" },
  { words: ["крицЕвий", "крИцевий", "крицевИй"], correct: "крицЕвий" },
  { words: ["крОїти", "кроЇти"], correct: "крОїти" },
  { words: ["кропивА", "кропИва"], correct: "кропивА" },
  { words: ["кУрятина", "курЯтина"], correct: "кУрятина" },
  { words: ["лАте", "латЕ"], correct: "лАте" },
  { words: ["листопАд", "листОпад"], correct: "листопАд" },
  { words: ["літОпис", "лІтопис"], correct: "літОпис" },
  { words: ["лЮстро", "люстрО"], correct: "лЮстро" },
  { words: ["магістЕрський", "магІстерський"], correct: "магістЕрський" },
  { words: ["мАркетинг", "маркЕтинг"], correct: "мАркетинг" },
  { words: ["мерЕжа", "мережА"], correct: "мерЕжа" },
  { words: ["напІй", "нАпій"], correct: "напІй" },
  { words: ["нАскрізний", "наскрІзний"], correct: "нАскрізний" },
  { words: ["нАчинка", "начИнка"], correct: "нАчинка" },
  { words: ["ненАвидіти", "ненавИдіти"], correct: "ненАвидіти" },
  { words: ["ненАвисний", "ненавИсний", "нЕнависний"], correct: "ненАвисний" },
  { words: ["ненАвисть", "нЕнависть"], correct: "ненАвисть" },
  { words: ["нІздря", "ніздрЯ"], correct: "нІздря" },
  { words: ["новИй", "нОвий"], correct: "новИй" },
  { words: ["обіцЯнка", "обІцянка"], correct: "обіцЯнка" },
  { words: ["обрУч", "Обруч"], correct: "обрУч" },
  { words: ["одинАдцять", "одИнадцять"], correct: "одинАдцять" },
  { words: ["одноразОвий", "однорАзовий"], correct: "одноразОвий" },
  { words: ["ознАка", "Ознака"], correct: "ознАка" },
  { words: ["Олень", "олЕнь"], correct: "Олень" },
  { words: ["оптОвий", "Оптовий", "оптовИй"], correct: "оптОвий" },
  { words: ["осетЕр", "осЕтер"], correct: "осетЕр" },
  { words: ["отАман", "отамАн"], correct: "отАман" },
  { words: ["Оцет", "оцЕт"], correct: "Оцет" },
  { words: ["павИч", "пАвич"], correct: "павИч" },
  { words: ["партЕр", "пАртер"], correct: "партЕр" },
  { words: ["пЕкарський", "пекАрський"], correct: "пЕкарський" },
  { words: ["перЕкис", "пЕрекис"], correct: "перЕкис" },
  { words: ["перелЯк", "перЕляк"], correct: "перелЯк" },
  { words: ["перЕпад", "перепАд"], correct: "перЕпад" },
  { words: ["перЕпис", "пЕрепис"], correct: "перЕпис" },
  { words: ["піалА", "піАла"], correct: "піалА" },
  { words: ["пІдданий", "піддАний"], correct: "пІдданий" },
  { words: ["піддАний", "пІдданий"], correct: "піддАний" },
  { words: ["пІдлітковий", "підліткОвий", "підлітковИй"], correct: "пІдлітковий" },
  { words: ["пітнИй", "пІтний"], correct: "пітнИй" },
  { words: ["пОдруга", "подрУга"], correct: "пОдруга" },
  { words: ["пОзначка", "познАчка"], correct: "пОзначка" },
  { words: ["помІщик", "поміщИк"], correct: "помІщик" },
  { words: ["помОвчати", "помовчАти"], correct: "помОвчати" },
  { words: ["понЯття", "поняттЯ"], correct: "понЯття" },
  { words: ["порядкОвий", "порЯдковий"], correct: "порядкОвий" },
  { words: ["посерЕдині", "посередИні"], correct: "посерЕдині" },
  { words: ["прИморозок", "приморОзок"], correct: "прИморозок" },
  { words: ["прИчіп", "причІп"], correct: "прИчіп" },
  { words: ["прОділ", "продІл"], correct: "прОділ" },
  { words: ["промІжок", "прОміжок"], correct: "промІжок" },
  { words: ["псевдонІм", "псевдОнім"], correct: "псевдонІм" },
  { words: ["рАзом", "разОм"], correct: "рАзом" },
  { words: ["рЕмінь", "ремІнь"], correct: "рЕмінь" },
  { words: ["рЕшето", "решетО"], correct: "рЕшето" },
  { words: ["рИнковий", "ринкОвий", "ринковИй"], correct: "рИнковий" },
  { words: ["рівнИна", "рівнинА"], correct: "рівнИна" },
  { words: ["роздрібнИй", "роздрІбний"], correct: "роздрібнИй" },
  { words: ["рОзпірка", "розпІрка"], correct: "рОзпірка" },
  { words: ["рукОпис", "рУкопис"], correct: "рукОпис" },
  { words: ["руслО", "рУсло"], correct: "руслО" },
  { words: ["свЕрдло", "свердлО"], correct: "свЕрдло" },
  { words: ["серЕдина", "середИна"], correct: "серЕдина" },
  { words: ["сЕча", "сечА"], correct: "сЕча" },
  { words: ["сільськогосподАрський", "сільськогоспОдарський"], correct: "сільськогосподАрський" },
  { words: ["сімдесЯт", "сІмдесят"], correct: "сімдесЯт" },
  { words: ["слИна", "слинА"], correct: "слИна" },
  { words: ["соломИнка", "солОминка"], correct: "соломИнка" },
  { words: ["стАтуя", "статУя"], correct: "стАтуя" },
  { words: ["стовідсОтковий", "стовідсоткОвий"], correct: "стовідсОтковий" },
  { words: ["стрибАти", "стрИбати"], correct: "стрибАти" },
  { words: ["текстовИй", "тЕкстовий"], correct: "текстовИй" },
  { words: ["тИгровий", "тигрОвий", "тигровИй"], correct: "тИгровий" },
  { words: ["тисОвий", "тИсовий", "тисовИй"], correct: "тисОвий" },
  { words: ["тім'янИй", "тім’Яний"], correct: "тім'янИй" },
  { words: ["тризУб", "трИзуб"], correct: "тризУб" },
  { words: ["тУлуб", "тулУб"], correct: "тУлуб" },
  { words: ["украЇнський", "укрАїнський"], correct: "украЇнський" },
  { words: ["урочИстий", "урОчистий"], correct: "урочИстий" },
  { words: ["усерЕдині", "усередИні"], correct: "усерЕдині" },
  { words: ["фартУх", "фАртух"], correct: "фартУх" },
  { words: ["фаховИй", "фАховий"], correct: "фаховИй" },
  { words: ["фенОмен", "феномЕн"], correct: "фенОмен" },
  { words: ["фОльга", "фольгА"], correct: "фОльга" },
  { words: ["фОрзац", "форзАц"], correct: "фОрзац" },
  { words: ["хАос", "хаОс"], correct: "хАос" },
  { words: ["хаОс", "хАос"], correct: "хаОс" },
  { words: ["цАрина", "церинА"], correct: "цАрина" },
  { words: ["цемЕнт", "цЕмент"], correct: "цемЕнт" },
  { words: ["цЕнтнер", "центнЕр"], correct: "цЕнтнер" },
  { words: ["ціннИк", "цІнник"], correct: "ціннИк" },
  { words: ["чарівнИй", "чарІвний"], correct: "чарівнИй" },
  { words: ["черговИй", "чергОвий"], correct: "черговИй" },
  { words: ["чорнОзем", "чорнозЕм"], correct: "чорнОзем" },
  { words: ["чорнОслив", "чорнослИв"], correct: "чорнОслив" },
  { words: ["чотирнАдцять", "чотИрнадцять"], correct: "чотирнАдцять" },
  { words: ["шляхопровІд", "шляхопрОвід"], correct: "шляхопровІд" },
  { words: ["шовкОвий", "шовковИй", "шОвковий"], correct: "шовкОвий" },
  { words: ["шофЕр", "шОфер"], correct: "шофЕр" },
  { words: ["щЕлепа", "щелЕпа"], correct: "щЕлепа" },
  { words: ["щИпці", "щипцІ"], correct: "щИпці" },
  { words: ["щодобовИй", "щодобОвий"], correct: "щодобовИй" },
  { words: ["ярмаркОвий", "Ярмарковий"], correct: "ярмаркОвий" },

  // Перші два слова правильні
  { words: ["алфАвіт", "алфавІт", "Алфавіт"], correct: ["алфАвіт", "алфавІт"] },
  { words: ["веснЯний", "веснянИй", "вЕсняний"], correct: ["веснЯний", "веснянИй"] },
  { words: ["пОмилка", "помИлка", "помилкА"], correct: ["пОмилка", "помИлка"] },
  { words: ["зАвжди", "завждИ"], correct: "зАвжди" }
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

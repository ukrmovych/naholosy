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

// Дані для наголосів (скорочений варіант)
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
  { words: ["течіЯ", "тЕчія", "течІя"], correct: "течіЯ" },
  { words: ["травестІя", "травЕстія", "трАвестія"], correct: "травестІя" },
  { words: ["уподОбання", "уподобАння"], correct: "уподОбання" },
  { words: ["читАння", "читаннЯ", "чИтання"], correct: "читАння" },
  { words: ["Аркушик", "аркУшик"], correct: "Аркушик" },
  { words: ["багаторазОвий", "багаторАзовий", "багаторазовИй"], correct: "багаторазОвий" },
  { words: ["безпринцИпний", "безпрИнципний", "безпрнципнИй"], correct: "безпринцИпний" },
  { words: ["бЕшкет", "бешкЕт"], correct: "бЕшкет" },
  { words: ["блАговіст", "благовІст", "благОвіст"], correct: "блАговіст" },
  { words: ["близькИй", "блИзький"], correct: "близькИй" },
  { words: ["болотИстий", "болОтистий", "болотистИй"], correct: "болотИстий" },
  { words: ["борОдавка", "бородАвка"], correct: "борОдавка" },
  { words: ["босОніж", "босонІж", "бОсоніж"], correct: "босОніж" },
  { words: ["боЯзнь", "бОязнь"], correct: "боЯзнь" },
  { words: ["бурштинОвий", "бурштИновий", "бурштиновИй"], correct: "бурштинОвий" },
  { words: ["бюлетЕнь", "бЮлетень"], correct: "бюлетЕнь" },
  { words: ["вантажІвка", "вантАжівка"], correct: "вантажІвка" },
  { words: ["вИгода", "вигОда"], correct: "вИгода" },
  { words: ["вИгода (користь)", "вигОда (користь)"], correct: "вИгода (користь)" },
 { words: ["вигОда (зручність)", "вИгода (зручність)"], correct: "вигОда (зручність)" },
  { words: ["вимОга", "вИмога"], correct: "вимОга" },
  { words: ["вИпадок", "випАдок"], correct: "вИпадок" },
  { words: ["вирАзний", "вИразний", "виразнИй"], correct: "вирАзний" },
  { words: ["вИсіти", "висІти", "висітИ"], correct: "вИсіти" },
  { words: ["вИтрата", "витрАта"], correct: "вИтрата" },
  { words: ["вишИваний", "вишивАний", "вишиванИй"], correct: "вишИваний" },
  { words: ["вІдгомін", "відгОмін"], correct: "вІдгомін" },
  { words: ["вІдомість (список)", "відОмість (список)"], correct: "вІдомість (список)" },
  { words: ["відОмість (дані, популярність)", "вІдомість (дані, популярність)"], correct: "відОмість (дані, популярність)" },
  { words: ["вІрші", "віршІ"], correct: "вІрші" },
  { words: ["віршовИй", "віршОвий", "вІршовий"], correct: "віршовИй" },
  { words: ["вітчИм", "вІтчим"], correct: "вітчИм" },
  { words: ["глядАч", "глЯдач"], correct: "глядАч" },
  { words: ["горошИна", "горОшина", "горошинА"], correct: "горошИна" },
  { words: ["граблІ", "грАблі"], correct: "граблІ" },
  { words: ["гуртОжиток", "гуртожИток"], correct: "гуртОжиток" },
  { words: ["данИна", "дАнина", "данинА"], correct: "данИна" },
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
  { words: ["заіржАвілий", "заіржавІлий", "заіржавілИй"], correct: "заіржАвілий" },
  { words: ["заіржАвіти", "заіржавІти"], correct: "заіржАвіти" },
  { words: ["закінчИти", "закІнчити"], correct: "закінчИти" },
  { words: ["залишИти", "залИшити"], correct: "залишИти" },
  { words: ["замІжня", "заміжнЯ", "зАміжня"], correct: "замІжня" },
  { words: ["заробІток", "зАробіток"], correct: "заробІток" },
  { words: ["застОпорити", "застопорИти"], correct: "застОпорити" },
  { words: ["зобразИти", "зобрАзити"], correct: "зобразИти" },
  { words: ["зрУчний", "зручнИй"], correct: "зрУчний" },
  { words: ["зубОжіння", "зубожІння"], correct: "зубОжіння" },
  { words: ["кАмбала", "камбалА", "камбАла"], correct: "кАмбала" },
  { words: ["каталОг", "катАлог"], correct: "каталОг" },
  { words: ["квартАл", "квАртал"], correct: "квартАл" },
  { words: ["кИшка", "кишкА"], correct: "кИшка" },
  { words: ["кінчИти", "кІнчити"], correct: "кінчИти" },
  { words: ["кОлесо", "колесО"], correct: "кОлесо" },
  { words: ["кОпчений (дієприкметник)", "копчЕний (дієприкметник)"], correct: "кОпчений (дієприкметник)" },
  { words: ["копчЕний (прикметник)", "кОпчений (прикметник)"], correct: "копчЕний (прикметник)" },
  { words: ["корИсний", "кОрисний"], correct: "корИсний" },
  { words: ["кОсий", "косИй"], correct: "кОсий" },
  { words: ["котрИй", "кОтрий"], correct: "котрИй" },
  { words: ["крицЕвий", "крИцевий", "крицевИй"], correct: "крицЕвий" },
  { words: ["крОїти", "кроЇти"], correct: "крОїти" },
  { words: ["кропивА", "кропИва"], correct: "кропивА" },
  { words: ["кУрятина", "курЯтина", "курятинА"], correct: "кУрятина" },
  { words: ["лАте", "латЕ"], correct: "лАте" },
  { words: ["листопАд", "листОпад"], correct: "листопАд" },
  { words: ["літОпис", "лІтопис", "літопИс"], correct: "літОпис" },
  { words: ["лЮстро", "люстрО"], correct: "лЮстро" },
  { words: ["магістЕрський", "магІстерський", "магістерськИй"], correct: "магістЕрський" },
  { words: ["мАркетинг", "маркЕтинг"], correct: "мАркетинг" },
  { words: ["мерЕжа", "мережА"], correct: "мерЕжа" },
  { words: ["напІй", "нАпій"], correct: "напІй" },
  { words: ["нАскрізний", "наскрІзний", "наскрізнИй"], correct: "нАскрізний" },
  { words: ["нАчинка", "начИнка"], correct: "нАчинка" },
  { words: ["ненАвидіти", "ненавИдіти"], correct: "ненАвидіти" },
  { words: ["ненАвисний", "ненавИсний", "нЕнависний", "ненависнИй"], correct: "ненАвисний" },
  { words: ["ненАвисть", "нЕнависть"], correct: "ненАвисть" },
  { words: ["нІздря", "ніздрЯ"], correct: "нІздря" },
  { words: ["новИй", "нОвий"], correct: "новИй" },
  { words: ["обіцЯнка", "обІцянка"], correct: "обіцЯнка" },
  { words: ["обрУч", "Обруч"], correct: "обрУч" },
  { words: ["одинАдцять", "одИнадцять"], correct: "одинАдцять" },
  { words: ["одноразОвий", "однорАзовий", "одноразовИй"], correct: "одноразОвий" },
  { words: ["ознАка", "Ознака"], correct: "ознАка" },
  { words: ["Олень", "олЕнь"], correct: "Олень" },
  { words: ["оптОвий", "Оптовий", "оптовИй"], correct: "оптОвий" },
  { words: ["осетЕр", "осЕтер"], correct: "осетЕр" },
  { words: ["отАман", "отамАн"], correct: "отАман" },
  { words: ["Оцет", "оцЕт"], correct: "Оцет" },
  { words: ["павИч", "пАвич"], correct: "павИч" },
  { words: ["партЕр", "пАртер"], correct: "партЕр" },
  { words: ["пЕкарський", "пекАрський", "пекарськИй"], correct: "пЕкарський" },
  { words: ["перЕкис", "пЕрекис", "перекИс"], correct: "перЕкис" },
  { words: ["перелЯк", "перЕляк"], correct: "перелЯк" },
  { words: ["перЕпад", "перепАд", "пЕрепад"], correct: "перЕпад" },
  { words: ["перЕпис", "пЕрепис", "перепИс"], correct: "перЕпис" },
  { words: ["піалА", "піАла", "пІала"], correct: "піалА" },
  { words: ["пІдданий (дієприкметник)", "піддАний (дієприкметник)"], correct: "пІдданий (дієприкметник)" },
  { words: ["піддАний (іменник, істота)", "пІдданий (іменник, істота)"], correct: "піддАний (іменник, істота)" },
  { words: ["пІдлітковий", "підліткОвий", "підлітковИй"], correct: "пІдлітковий" },
  { words: ["пітнИй", "пІтний"], correct: "пітнИй" },
  { words: ["пОдруга", "подрУга"], correct: "пОдруга" },
  { words: ["пОзначка", "познАчка"], correct: "пОзначка" },
  { words: ["помІщик", "поміщИк"], correct: "помІщик" },
  { words: ["помОвчати", "помовчАти"], correct: "помОвчати" },
  { words: ["понЯття", "поняттЯ"], correct: "понЯття" },
  { words: ["порядкОвий", "порЯдковий", "порядковИй"], correct: "порядкОвий" },
  { words: ["посерЕдині", "посередИні", "посЕредині"], correct: "посерЕдині" },
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
  { words: ["роздрібнИй", "роздрІбний", "рОздрібний"], correct: "роздрібнИй" },
  { words: ["рОзпірка", "розпІрка"], correct: "рОзпірка" },
  { words: ["рукОпис", "рУкопис"], correct: "рукОпис" },
  { words: ["руслО", "рУсло"], correct: "руслО" },
  { words: ["свЕрдло", "свердлО"], correct: "свЕрдло" },
  { words: ["серЕдина", "середИна", "серединА"], correct: "серЕдина" },
  { words: ["сЕча", "сечА"], correct: "сЕча" },
  { words: ["сільськогосподАрський", "сільськогоспОдарський"], correct: "сільськогосподАрський" },
  { words: ["сімдесЯт", "сІмдесят"], correct: "сімдесЯт" },
  { words: ["слИна", "слинА"], correct: "слИна" },
  { words: ["соломИнка", "солОминка"], correct: "соломИнка" },
  { words: ["стАтуя", "статУя"], correct: "стАтуя" },
  { words: ["стовідсОтковий", "стовідсоткОвий", "стовідсотковИй"], correct: "стовідсОтковий" },
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
  { words: ["фаховИй", "фАховий", "фахОвий"], correct: "фаховИй" },
  { words: ["фенОмен", "феномЕн"], correct: "фенОмен" },
  { words: ["фОльга", "фольгА"], correct: "фОльга" },
  { words: ["фОрзац", "форзАц"], correct: "фОрзац" },
  { words: ["хАос (у міфології: стихія)", "хаОс (у міфології: стихія)"], correct: "хАос (у міфології: стихія)" },
  { words: ["хаОс (безлад)", "хАос (безлад)"], correct: "хаОс" },
  { words: ["цАрина", "царинА", "царИна"], correct: "цАрина" },
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
  { words: ["ярмаркОвий", "Ярмарковий", "ярмарковИй"], correct: "ярмаркОвий" },

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
  "*Бажаючих* зробити фото біля пам'ятника було багато.",
  "Ми *внесли* *вклад* у розвиток мистецтва.",
  "Директор *заключив* договір із новим постачальником.",
  "Студенти *здавали* іспит з української мови цього тижня.",
  "*На протязі* року ми працювали над цим проєктом.",
  "Вона завжди *приймає* активну участь у всіх заходах.",
  "Уряд мусить *прийняти міри* щодо покращення екології.",
  "Мій брат вирішив *заказати* новий ноутбук в інтернеті.",
  "Це питання потрібно вирішити *згідно* *закону*.",
  "Ми повинні *підвести* підсумки нашої роботи за рік.",
  "Учитель завжди *приводить* цікаві приклади на уроках."
];

// Питання, що залишились у поточній грі
let remainingQuestions = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startGame(gameType) {
  currentGame = gameType;
  score = 0;
  lives = 3;
  updateUI();
  remainingQuestions = gameType === "naholosy" ? [...naholosyData] : [...leksychnaData];
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

  if (remainingQuestions.length === 0) {
    remainingQuestions = currentGame === "naholosy" ? [...naholosyData] : [...leksychnaData];
  }

  const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
  currentQuestion = remainingQuestions.splice(randomIndex, 1)[0];

  if (currentGame === "naholosy") {
    questionEl.textContent = "Обери правильний наголос";

    const shuffledWords = [...currentQuestion.words];
    shuffleArray(shuffledWords);

    shuffledWords.forEach(word => {
      const btn = document.createElement("button");
      btn.textContent = word;
      btn.onclick = () => {
        if (lock) return;
        lock = true;

        const correctArray = Array.isArray(currentQuestion.correct)
          ? currentQuestion.correct
          : [currentQuestion.correct];
        const isCorrect = correctArray.includes(word);

        if (isCorrect) {
          // Підсвітити всі правильні варіанти
          Array.from(answersEl.children).forEach(b => {
            if (correctArray.includes(b.textContent)) {
              b.classList.add("correct");
            }
          });
          score++;
          updateUI();
          setTimeout(nextQuestion, 500);
        } else {
          // Підсвітити всі правильні варіанти як правильні та блимаючі
          Array.from(answersEl.children).forEach(b => {
            if (correctArray.includes(b.textContent)) {
              b.classList.add("correct", "blink");
            }
          });
          loseLife();
          setTimeout(nextQuestion, 2000);
        }
      };
      answersEl.appendChild(btn);
    });

  } else if (currentGame === "leksychna") {
    const rawSentence = currentQuestion;
    const correctWords = rawSentence.match(/\*(.*?)\*/g).map(w => w.replace(/\*/g, ""));
    const displaySentence = rawSentence.replace(/\*/g, "");

    questionEl.textContent = "";

    // Тут без перемішування — зберігаємо порядок слів у реченні
    displaySentence.split(" ").forEach(word => {
      const btn = document.createElement("button");
      btn.textContent = word;
      btn.onclick = () => {
        if (lock) return;
        lock = true;

        const cleanWord = word.replace(/^[.,!?:;"'()]+|[.,!?:;"'()]+$/g, "");
        const isCorrect = correctWords.includes(cleanWord);

        if (isCorrect) {
          btn.classList.add("correct", "strikethrough");
          score++;
          updateUI();
          setTimeout(nextQuestion, 500);
        } else {
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
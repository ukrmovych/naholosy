// Дані для наголосів (скорочений варіант)
const naholosyData = [
  { words: ["асиметрІя", "асимЕтрія"], correct: "асиметрІя" },
  { words: ["агронОмія", "агрономІя"], correct: "агронОмія" },
  { words: ["видАння", "вИдання", "виданнЯ"], correct: "видАння" },
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
  { words: ["вАги", "вагИ"], correct: "вАги" },
  { words: ["вантажІвка", "вантАжівка"], correct: "вантажІвка" },
  { words: ["вИгода (користь)", "вигОда (користь)"], correct: "вИгода (користь)" },
 { words: ["вигОда (зручність)", "вИгода (зручність)"], correct: "вигОда (зручність)" },
  { words: ["визвОльний", "вИзвольний", "визвольнИй"], correct: "визвОльний" },
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
  { words: ["гальмО", "гАльмо"], correct: "гальмО" },
  { words: ["гАльма (у множині)", "гальмА (у множині)"], correct: "гАльма (у множині)" },
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
  { words: ["зАгадка", "загАдка"], correct: "зАгадка" },
  { words: ["заіржАвілий", "заіржавІлий", "заіржавілИй"], correct: "заіржАвілий" },
  { words: ["заіржАвіти", "заіржавІти"], correct: "заіржАвіти" },
  { words: ["закінчИти", "закІнчити"], correct: "закінчИти" },
  { words: ["зАкладка", "заклАдка"], correct: "зАкладка" },
  { words: ["зАкрутка", "закрУтка"], correct: "зАкрутка" },
  { words: ["залишИти", "залИшити"], correct: "залишИти" },
  { words: ["замІжня", "заміжнЯ", "зАміжня"], correct: "замІжня" },
  { words: ["зАпонка", "запОнка"], correct: "зАпонка" },
  { words: ["зАставка", "застАвка"], correct: "зАставка" },
  { words: ["зАстібка", "застІбка"], correct: "зАстібка" },
  { words: ["заробІток", "зАробіток"], correct: "заробІток" },
  { words: ["застОпорити", "застопорИти"], correct: "застОпорити" },
  { words: ["звИсока", "звисОка", "звисокА"], correct: "звИсока" },
  { words: ["здАлека", "здалЕка", "здалекА"], correct: "здАлека" },
  { words: ["зобразИти", "зобрАзити"], correct: "зобразИти" },
  { words: ["зОзла", "зозлА"], correct: "зОзла" },
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
  { words: ["хаОс (безлад)", "хАос (безлад)"], correct: "хаОс (безлад)" },
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

// Речення для «Лексичної помилки» зберігаються в Supabase (таблиця sentences)
// і приходять по одному через функцію random_sentence — у коді сайту їх немає.


// ================== Логіка гри ==================

const OK_TOKEN = "✅-помилок-немає-✅";
const MAX_LIVES = 3;
const TOTAL_WORDS = naholosyData.length;

// Затримки перед наступним питанням: [правильно, помилка]
const DELAYS = {
  naholosy: [600, 2000],
  leksychna: [1000, 3000]
};

const PRAISE = ["Правильно!", "Так тримати!", "Супер!", "Чудово!", "Влучно!", "Є!"];

// Усі ігри в меню. Нова гра = новий рядок тут.
// status: "live" — працює, "beta" — працює в тестовому режимі, "soon" — ще немає
const GAMES = [
  { id: "naholosy", name: "Наголоси", icon: "🗣️", status: "live", featured: true },
  { id: "leksychna", name: "Лексична помилка", icon: "🔎", status: "beta" },
  { id: "klychnyi", name: "Кличний відмінок", icon: "📣", status: "soon" },
  { id: "chyslivnyky", name: "Числівники", icon: "🔢", status: "soon" },
  { id: "frazeolohizmy", name: "Фразеологізми", icon: "💬", status: "soon" },
  { id: "inshomovni", name: "Іншомовні слова", icon: "🌍", status: "soon" }
];

const $ = id => document.getElementById(id);
const screens = {
  menu: $("menu"), modes: $("modes"), game: $("game"), over: $("over"),
  trainOver: $("train-over"), leaders: $("leaders")
};
const scoreEl = $("score");
const livesEl = $("lives");
const progressEl = $("progress");
const progressFill = $("progress-fill");
const questionEl = $("question");
const sentenceEl = $("sentence");
const answersEl = $("answers");
const feedbackEl = $("feedback");
const hintEl = $("hint");

let score = 0;
let lives = MAX_LIVES;
let streak = 0;
let mistakes = [];
let currentGame = "";
let currentQuestion = null;
let lock = false;
let remainingQuestions = [];
let questionToken = 0;
let seenSentenceIds = [];
let sentencePrefetch = null;
let nextTimer = null;

// Тренування за групами (null — звичайний марафон)
let training = null;

// ---------- Локальне сховище (може бути недоступне) ----------

function storageGet(key) {
  try {
    return localStorage.getItem(key);
  } catch (e) {
    return null;
  }
}

function storageSet(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {
    // нічого страшного — просто не збережеться
  }
}

function getBest(game) {
  return Number(storageGet(`best_${game}`)) || 0;
}

function renderMenu() {
  const list = $("game-list");
  list.innerHTML = "";

  GAMES.forEach(game => {
    const btn = document.createElement("button");
    btn.className = "game-tile"
      + (game.featured ? " featured" : "")
      + (game.status === "soon" ? " is-soon" : "");

    const icon = document.createElement("span");
    icon.className = "tile-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = game.icon;

    const name = document.createElement("span");
    name.className = "tile-name";
    name.textContent = game.name;

    btn.append(icon, name);

    if (game.status !== "live") {
      const badge = document.createElement("span");
      badge.className = `badge badge-${game.status}`;
      badge.textContent = game.status;
      btn.appendChild(badge);
    }

    if (game.status !== "soon") {
      const best = document.createElement("span");
      best.className = "mode-best";
      best.dataset.best = game.id;
      btn.appendChild(best);
    }

    btn.addEventListener("click", () => {
      if (game.status === "soon") {
        showSoon(game);
      } else if (game.id === "naholosy") {
        showModes();
      } else {
        startGame(game.id);
      }
    });
    list.appendChild(btn);
  });

  renderBestScores();
}

function showSoon(game) {
  gtag('event', 'soon_click', { game_type: game.id });
  $("soon-title").textContent = `${game.icon} ${game.name}`;
  $("soon").hidden = false;
  $("btn-soon-ok").focus();
}

function renderBestScores() {
  document.querySelectorAll("[data-best]").forEach(el => {
    const best = getBest(el.dataset.best);
    el.textContent = best > 0 ? `Рекорд: ${best}` : "";
  });
}

// ---------- Допоміжне ----------

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showScreen(name) {
  $("confetti").innerHTML = "";
  Object.entries(screens).forEach(([key, el]) => {
    el.hidden = key !== name;
  });
  window.scrollTo(0, 0);
}

function schedule(fn, delay) {
  clearTimeout(nextTimer);
  nextTimer = setTimeout(fn, delay);
}

function restartAnimation(el, className) {
  el.classList.remove(className);
  void el.offsetWidth;
  el.classList.add(className);
}

function updateUI() {
  livesEl.hidden = Boolean(training);
  if (training) {
    scoreEl.textContent = `${training.done}/${training.total}`;
    progressEl.hidden = false;
    progressFill.style.width = `${(training.done / training.total) * 100}%`;
    progressEl.classList.toggle("done", training.done >= training.total);
    return;
  }

  if (currentGame === "naholosy") {
    scoreEl.textContent = score >= TOTAL_WORDS ? `${score} 🏆` : `${score}/${TOTAL_WORDS}`;
    progressEl.hidden = false;
    progressFill.style.width = `${Math.min(score / TOTAL_WORDS, 1) * 100}%`;
    progressEl.classList.toggle("done", score >= TOTAL_WORDS);
  } else {
    scoreEl.textContent = score;
    progressEl.hidden = true;
  }

  livesEl.innerHTML = "";
  for (let i = 0; i < MAX_LIVES; i++) {
    const heart = document.createElement("span");
    heart.className = "heart" + (i < lives ? "" : " lost");
    heart.textContent = "❤️";
    livesEl.appendChild(heart);
  }
  livesEl.setAttribute("aria-label", `Життя: ${lives} з ${MAX_LIVES}`);
}

function setFeedback(text, kind) {
  feedbackEl.textContent = text;
  feedbackEl.className = "feedback" + (kind ? ` ${kind}` : "");
}

// Слово з великою літерою-наголосом -> елементи з підсвіченою літерою.
// «вИгода (користь)» -> «вИгода» + підпис «користь»
function renderStressWord(container, word) {
  const match = word.match(/^(.*?)\s*\((.+)\)\s*$/);
  const main = match ? match[1] : word;
  const note = match ? match[2] : "";

  const wordEl = document.createElement("span");
  for (const ch of main) {
    if (ch !== ch.toLowerCase()) {
      const s = document.createElement("span");
      s.className = "stress";
      s.textContent = ch;
      wordEl.appendChild(s);
    } else {
      wordEl.appendChild(document.createTextNode(ch));
    }
  }
  container.appendChild(wordEl);

  if (note) {
    const noteEl = document.createElement("span");
    noteEl.className = "note";
    noteEl.textContent = note;
    container.appendChild(noteEl);
  }
}

// ---------- Хід гри ----------

function startGame(gameType) {
  clearTimeout(nextTimer);
  training = null;
  $("btn-menu").textContent = "‹ Меню";
  currentGame = gameType;
  score = 0;
  lives = MAX_LIVES;
  streak = 0;
  mistakes = [];
  updateUI();
  gtag('event', 'game_start', {
    game_type: gameType
  });

  remainingQuestions = gameType === "naholosy" ? [...naholosyData] : [];
  showScreen("game");
  $("test-note").hidden = gameType !== "leksychna";
  hintEl.textContent = gameType === "naholosy" ? "Підказка: можна відповідати клавішами 1, 2, 3" : "";
  nextQuestion();
}

function showMenu() {
  clearTimeout(nextTimer);
  training = null;
  questionToken++;
  $("celebrate").hidden = true;
  renderBestScores();
  showScreen("menu");
}

function handleAnswer(isCorrect, highlight, mistake) {
  if (lock) return;
  lock = true;

  gtag('event', 'answer', {
    game_type: currentGame,
    result: isCorrect ? 'correct' : 'wrong',
    score: isCorrect ? score + 1 : score
  });

  highlight();

  const [okDelay, badDelay] = DELAYS[currentGame];

  if (training) {
    if (isCorrect) {
      training.done++;
      if (training.round === 1) training.firstTry++;
      streak++;
      const praise = PRAISE[Math.floor(Math.random() * PRAISE.length)];
      setFeedback(streak >= 3 ? `${praise} 🔥 ${streak} поспіль` : praise, "good");
    } else {
      // Слово не зараховується: воно піде в роботу над помилками
      training.done++;
      streak = 0;
      training.roundMistakes.push({ ...mistake, question: currentQuestion });
      setFeedback("Запам'ятай правильний варіант 👆 Повторимо наприкінці", "bad");
    }
    updateUI();
    restartAnimation(scoreEl, "bump");
    schedule(nextQuestion, isCorrect ? okDelay : badDelay);
    return;
  }

  if (isCorrect) {
    score++;
    streak++;
    updateUI();
    restartAnimation(scoreEl, "bump");
    const praise = PRAISE[Math.floor(Math.random() * PRAISE.length)];
    setFeedback(streak >= 3 ? `${praise} 🔥 ${streak} поспіль` : praise, "good");

    if (currentGame === "naholosy" && score === TOTAL_WORDS) {
      schedule(celebrate, okDelay);
    } else {
      schedule(nextQuestion, okDelay);
    }
    return;
  }

  streak = 0;
  lives--;
  mistakes.push(mistake);
  updateUI();
  restartAnimation(livesEl, "hit");
  setFeedback(lives > 0 ? "Ой, не так. Запам'ятай правильний варіант 👆" : "Це було останнє життя", "bad");
  schedule(lives > 0 ? nextQuestion : gameOver, badDelay);
}

function nextQuestion() {
  questionToken++;
  lock = false;
  answersEl.innerHTML = "";
  sentenceEl.innerHTML = "";
  setFeedback("");

  if (training) {
    if (training.queue.length === 0) {
      finishTrainingRound();
      return;
    }
    currentQuestion = training.queue.shift();
    renderNaholosy();
  } else if (currentGame === "naholosy") {
    if (remainingQuestions.length === 0) {
      remainingQuestions = [...naholosyData];
    }
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    currentQuestion = remainingQuestions.splice(randomIndex, 1)[0];
    renderNaholosy();
  } else if (currentGame === "leksychna") {
    loadSentence();
  }
}

// ---------- Речення з бази ----------

async function fetchSentence() {
  let rows = await lbRequest("rpc/random_sentence", {
    method: "POST",
    body: JSON.stringify({ exclude: seenSentenceIds })
  });
  if (rows.length === 0 && seenSentenceIds.length > 0) {
    // Усі речення вже були — починаємо коло спочатку
    seenSentenceIds = [];
    rows = await lbRequest("rpc/random_sentence", {
      method: "POST",
      body: JSON.stringify({ exclude: [] })
    });
  }
  if (rows.length === 0) throw new Error("no sentences");
  return rows[0];
}

async function loadSentence() {
  const token = questionToken;
  lock = true;
  questionEl.textContent = "Чи є лексична помилка? Де саме? 👀";
  sentenceEl.hidden = false;

  if (!leaderboardEnabled) {
    sentenceEl.textContent = "Скоро тут з'являться речення 🙂";
    return;
  }

  sentenceEl.innerHTML = '<span class="loading">Завантажую речення…</span>';

  try {
    const row = await (sentencePrefetch || fetchSentence());
    sentencePrefetch = null;
    if (token !== questionToken) return;

    seenSentenceIds.push(row.id);
    currentQuestion = row.text;
    sentenceEl.innerHTML = "";
    lock = false;
    renderLeksychna();

    // Наступне речення завантажуємо заздалегідь, щоб не чекати
    sentencePrefetch = fetchSentence();
    sentencePrefetch.catch(() => { sentencePrefetch = null; });
  } catch (err) {
    sentencePrefetch = null;
    if (token !== questionToken) return;
    sentenceEl.textContent = "Не вдалося завантажити речення. Перевір інтернет.";
    const retry = document.createElement("button");
    retry.className = "ok-btn";
    retry.textContent = "Спробувати ще раз";
    retry.onclick = () => nextQuestion();
    answersEl.appendChild(retry);
  }
}

function renderNaholosy() {
  questionEl.textContent = "Обери правильний наголос";
  sentenceEl.hidden = true;

  const correctArray = Array.isArray(currentQuestion.correct)
    ? currentQuestion.correct
    : [currentQuestion.correct];

  const shuffledWords = [...currentQuestion.words];
  shuffleArray(shuffledWords);

  shuffledWords.forEach(word => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.dataset.word = word;
    renderStressWord(btn, word);

    btn.onclick = () => {
      const isCorrect = correctArray.includes(word);
      handleAnswer(isCorrect, () => {
        Array.from(answersEl.children).forEach(b => {
          if (correctArray.includes(b.dataset.word)) {
            b.classList.add("correct");
            if (!isCorrect) b.classList.add("blink");
          } else if (b !== btn) {
            b.classList.add("dim");
          }
        });
        if (!isCorrect) btn.classList.add("wrong");
      }, { chosen: word, correct: correctArray });
    };
    answersEl.appendChild(btn);
  });
}

function renderLeksychna() {
  questionEl.textContent = "Чи є лексична помилка? Де саме? 👀";
  sentenceEl.hidden = false;

  // Слово правильне, якщо в реченні воно позначене зірочками (*слово*).
  // Так працюють і слова з дефісом (*мас*-*медіа*), і слова біля лапок («*Хватить*).
  // Тут без перемішування — зберігаємо порядок слів у реченні
  const sentence = currentQuestion;
  const buttons = [];

  sentence.split(" ").filter(token => token !== "").forEach(token => {
    const isMarked = token.includes("*");
    const text = token.replace(/\*/g, "");
    const btn = document.createElement("button");

    if (text.includes(OK_TOKEN)) {
      // Кнопка «помилок немає» — окремо під реченням
      btn.className = "ok-btn";
      btn.textContent = "✅ Помилок немає";
      answersEl.appendChild(btn);
    } else {
      btn.className = "chip";
      btn.textContent = text;
      sentenceEl.appendChild(btn);
      sentenceEl.appendChild(document.createTextNode(" "));
    }

    if (isMarked) btn.dataset.correct = "1";
    buttons.push(btn);

    btn.onclick = () => {
      handleAnswer(isMarked, () => {
        buttons.forEach(b => {
          if (b.dataset.correct === "1") {
            b.classList.add("correct");
            if (b.classList.contains("chip")) b.classList.add("strikethrough");
            if (!isMarked) b.classList.add("blink");
          }
        });
        if (!isMarked) btn.classList.add("wrong");
      }, { sentence });
    };
  });
}

// ---------- Святкування ----------

function celebrate() {
  gtag('event', 'all_words_done', {
    game_type: currentGame
  });
  $("celebrate-text").textContent =
    `${TOTAL_WORDS} правильних відповідей — це всі слова зі списку! Можна грати далі й ставити рекорд.`;
  $("celebrate").hidden = false;
  launchConfetti();
}

function launchConfetti() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const box = $("confetti");
  const colors = ["#FF7900", "#4CAF50", "#ffffff", "#e6c200", "#d96700"];
  for (let i = 0; i < 120; i++) {
    const piece = document.createElement("i");
    piece.style.left = `${Math.random() * 100}%`;
    piece.style.background = colors[i % colors.length];
    piece.style.animationDuration = `${2.5 + Math.random() * 2}s`;
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.setProperty("--dx", `${(Math.random() - 0.5) * 200}px`);
    piece.style.setProperty("--rot", `${Math.random() * 720 - 360}deg`);
    box.appendChild(piece);
  }
  setTimeout(() => { box.innerHTML = ""; }, 5500);
}

// ---------- Кінець гри ----------

function gameOver() {
  gtag('event', 'game_over', {
    game_type: currentGame,
    final_score: score
  });

  const best = getBest(currentGame);
  const isRecord = score > best;
  if (isRecord) storageSet(`best_${currentGame}`, String(score));

  $("over-score").textContent = currentGame === "naholosy" ? `${score}/${TOTAL_WORDS}` : score;
  $("over-best").textContent = isRecord && score > 0
    ? "🎉 Новий рекорд!"
    : `Рекорд: ${Math.max(best, score)}`;

  renderMistakes();
  prepareSubmitForm();
  showScreen("over");
}

function renderMistakes(items = mistakes, list = $("mistakes-list"), section = $("mistakes")) {
  list.innerHTML = "";
  section.hidden = items.length === 0;

  items.forEach(m => {
    const li = document.createElement("li");

    if (m.sentence) {
      // Лексична помилка: речення з підсвіченими словами-помилками
      const p = document.createElement("span");
      p.className = "sentence-mistake";
      m.sentence.split(" ").filter(t => t !== "").forEach(token => {
        const text = token.replace(/\*/g, "");
        const isOk = text.includes(OK_TOKEN);
        const node = token.includes("*") ? document.createElement("mark") : document.createElement("span");
        node.textContent = isOk ? (token.includes("*") ? "✅ помилок немає" : "") : text;
        p.appendChild(node);
        p.appendChild(document.createTextNode(" "));
      });
      li.appendChild(p);
    } else {
      // Наголоси: обране слово -> правильне
      const was = document.createElement("span");
      was.className = "was";
      was.textContent = m.chosen.replace(/\s*\(.*\)\s*$/, "");
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.textContent = "→";
      const right = document.createElement("span");
      right.className = "right";
      m.correct.forEach((word, i) => {
        if (i > 0) right.appendChild(document.createTextNode(" / "));
        renderStressWord(right, word);
      });
      li.append(was, arrow, right);
    }
    list.appendChild(li);
  });
}

// ---------- Тренування за групами ----------

const ALPHABET = "абвгґдеєжзиіїйклмнопрстуфхцчшщьюя";

function firstLetter(q) {
  return [].concat(q.correct)[0][0].toLowerCase();
}

// Ділимо слова за абеткою на групи по ~15 так, щоб межі груп
// по можливості збігалися з межами літер
function buildGroups(data, target = 15, min = 10, max = 19) {
  const sorted = data
    .map((q, i) => ({ q, i, letter: firstLetter(q) }))
    .sort((x, y) => ALPHABET.indexOf(x.letter) - ALPHABET.indexOf(y.letter) || x.i - y.i);

  const n = sorted.length;
  const best = new Array(n + 1).fill(Infinity);
  const prev = new Array(n + 1).fill(-1);
  best[0] = 0;
  for (let end = 1; end <= n; end++) {
    for (let size = min; size <= max && size <= end; size++) {
      const start = end - size;
      if (best[start] === Infinity) continue;
      const atBoundary = end === n || sorted[end].letter !== sorted[end - 1].letter;
      const cost = best[start] + (size - target) ** 2 + (atBoundary ? 0 : 12);
      if (cost < best[end]) {
        best[end] = cost;
        prev[end] = start;
      }
    }
  }

  const ranges = [];
  for (let end = n; end > 0; end = prev[end]) ranges.unshift([prev[end], end]);

  const groups = ranges.map(([start, end]) => {
    const items = sorted.slice(start, end);
    const first = items[0].letter.toUpperCase();
    const last = items[items.length - 1].letter.toUpperCase();
    return { label: first === last ? first : `${first}–${last}`, words: items.map(x => x.q) };
  });

  // Однакові назви (наприклад, дві групи на «П») нумеруємо
  const total = {};
  groups.forEach(g => { total[g.label] = (total[g.label] || 0) + 1; });
  const seen = {};
  groups.forEach(g => {
    if (total[g.label] > 1) {
      seen[g.label] = (seen[g.label] || 0) + 1;
      g.label += ` (${seen[g.label]})`;
    }
  });
  return groups;
}

const GROUPS = buildGroups(naholosyData);

function groupKey(i) {
  return `train_naholosy_${GROUPS[i].label}`;
}

function showModes() {
  clearTimeout(nextTimer);
  training = null;
  questionToken++;
  renderGroups();
  renderBestScores();
  showScreen("modes");
}

function renderGroups() {
  const list = $("group-list");
  list.innerHTML = "";
  GROUPS.forEach((group, i) => {
    const best = Number(storageGet(groupKey(i))) || 0;
    const mastered = best >= group.words.length;

    const btn = document.createElement("button");
    btn.className = "group-tile" + (mastered ? " mastered" : "");

    const label = document.createElement("span");
    label.className = "group-label";
    label.textContent = group.label;

    const info = document.createElement("span");
    info.className = "group-info";
    info.textContent = mastered
      ? "✓ вивчено"
      : best > 0 ? `${best}/${group.words.length}` : `${group.words.length} слів`;

    btn.append(label, info);
    btn.addEventListener("click", () => startTraining(i));
    list.appendChild(btn);
  });
}

function startTraining(groupIndex) {
  clearTimeout(nextTimer);
  const group = GROUPS[groupIndex];
  const queue = [...group.words];
  shuffleArray(queue);

  currentGame = "naholosy";
  streak = 0;
  training = {
    groupIndex,
    round: 1,
    queue,
    total: queue.length,
    done: 0,
    firstTry: 0,
    roundMistakes: []
  };
  gtag('event', 'training_start', { game_type: currentGame, group: group.label });

  $("btn-menu").textContent = "‹ Групи";
  $("test-note").hidden = true;
  hintEl.textContent = "Підказка: можна відповідати клавішами 1, 2, 3";
  updateUI();
  showScreen("game");
  nextQuestion();
}

function startMistakesRound() {
  const unique = [];
  training.roundMistakes.forEach(m => {
    if (!unique.includes(m.question)) unique.push(m.question);
  });
  shuffleArray(unique);
  training.round++;
  training.queue = unique;
  training.total = unique.length;
  training.done = 0;
  training.roundMistakes = [];
  streak = 0;
  updateUI();
  showScreen("game");
  nextQuestion();
}

function finishTrainingRound() {
  const group = GROUPS[training.groupIndex];
  const wrong = training.roundMistakes;

  if (training.round === 1) {
    const best = Number(storageGet(groupKey(training.groupIndex))) || 0;
    if (training.firstTry > best) storageSet(groupKey(training.groupIndex), String(training.firstTry));
    gtag('event', 'training_done', {
      game_type: currentGame,
      group: group.label,
      first_try: training.firstTry,
      total: group.words.length
    });
  }

  $("train-title").textContent = training.round === 1
    ? `Група ${group.label}`
    : wrong.length === 0 ? "Помилки виправлено 💪" : "Ще трохи!";

  if (training.round === 1) {
    $("train-score").textContent = `${training.firstTry}/${group.words.length}`;
    $("train-sub").textContent = wrong.length === 0
      ? "Без жодної помилки! 🎉"
      : "правильно з першого разу";
  } else {
    $("train-score").textContent = wrong.length === 0 ? "✓" : `${training.total - wrong.length}/${training.total}`;
    $("train-sub").textContent = wrong.length === 0
      ? "Усі слова групи тепер правильні"
      : "Ці слова ще раз — і готово";
  }

  const fixBtn = $("btn-fix-mistakes");
  const uniqueCount = new Set(wrong.map(m => m.question)).size;
  fixBtn.hidden = wrong.length === 0;
  fixBtn.textContent = `🔁 Робота над помилками (${uniqueCount})`;

  const nextBtn = $("btn-train-next");
  const hasNext = training.groupIndex + 1 < GROUPS.length;
  nextBtn.hidden = wrong.length > 0 || !hasNext;
  if (hasNext) nextBtn.textContent = `Наступна група: ${GROUPS[training.groupIndex + 1].label} →`;

  renderMistakes(wrong, $("train-mistakes-list"), $("train-mistakes"));
  if (wrong.length === 0 && training.round === 1) launchConfetti();
  showScreen("trainOver");
}

// ---------- Турнірна таблиця ----------

const LB = window.LEADERBOARD_CONFIG || {};
const leaderboardEnabled = Boolean(LB.url && LB.anonKey);
let leadersGame = "naholosy";

// Простий фільтр: остаточно прибирає небажані імена модератор у Supabase
const BAD_WORDS = [
  "хуй", "хуя", "хує", "хуї", "хуе", "хуи", "пизд", "пізд", "бляд", "блят", "бля",
  "ебат", "ебан", "ебал", "єбат", "єбан", "єбал", "йобан", "їбат", "ебу", "єбу",
  "сука", "сучк", "мудак", "мудил", "гандон", "гондон", "шлюх", "курв", "підар",
  "пидар", "підор", "пидор", "педик", "залуп", "дроч", "срак",
  "fuck", "shit", "bitch", "dick", "cunt", "porn", "sex", "секс", "порн", "казино", "casino"
];

function normalizeName(name) {
  return name.trim().replace(/\s+/g, " ");
}

function checkName(name) {
  if (name.length < 2) return "Ім'я має бути хоча б з 2 літер";
  if (name.length > 20) return "Ім'я задовге (до 20 символів)";
  const lower = name.toLowerCase();
  if (/https?:|www\.|\.(com|net|org|ua|ru|io|me|site|online|shop)\b|t\.me|@|\d{4,}/.test(lower)) {
    return "Посилання й реклама в імені заборонені";
  }
  const compact = lower.replace(/[^a-zа-яіїєґё]/g, "");
  if (BAD_WORDS.some(w => compact.includes(w))) {
    return "Обери, будь ласка, інше ім'я 🙂";
  }
  return "";
}

async function lbRequest(path, options = {}) {
  const res = await fetch(`${LB.url}/rest/v1/${path}`, {
    ...options,
    headers: {
      apikey: LB.anonKey,
      Authorization: `Bearer ${LB.anonKey}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    }
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.status === 204 || res.status === 201 ? null : res.json();
}

function prepareSubmitForm() {
  const form = $("submit-form");
  form.hidden = !leaderboardEnabled || score <= 0;
  form.querySelector("button").disabled = false;
  $("player-name").disabled = false;
  $("player-name").value = storageGet("player_name") || "";
  setSubmitStatus("");
}

function setSubmitStatus(text, kind) {
  const el = $("submit-status");
  el.textContent = text;
  el.className = "submit-status" + (kind ? ` ${kind}` : "");
}

$("submit-form").addEventListener("submit", async e => {
  e.preventDefault();
  const name = normalizeName($("player-name").value);
  const problem = checkName(name);
  if (problem) {
    setSubmitStatus(problem, "bad");
    return;
  }

  const button = e.target.querySelector("button");
  button.disabled = true;
  setSubmitStatus("Зберігаю…");

  try {
    await lbRequest("scores", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ name, game: currentGame, score })
    });
    storageSet("player_name", name);
    $("player-name").disabled = true;
    setSubmitStatus("Готово! Ти в таблиці 🏆", "good");
    gtag('event', 'leaderboard_submit', { game_type: currentGame, score });
  } catch (err) {
    button.disabled = false;
    setSubmitStatus("Не вдалося зберегти. Спробуй ще раз", "bad");
  }
});

async function showLeaders(game) {
  leadersGame = game;
  document.querySelectorAll(".tab").forEach(t => {
    t.classList.toggle("active", t.dataset.game === game);
  });
  showScreen("leaders");

  const list = $("leaders-list");
  const status = $("leaders-status");
  list.innerHTML = "";

  if (!leaderboardEnabled) {
    status.textContent = "Таблиця скоро запрацює 🙂";
    return;
  }

  status.textContent = "Завантажую…";
  try {
    const rows = await lbRequest(
      `scores?select=name,score&game=eq.${game}&order=score.desc,created_at.asc&limit=50`
    );
    if (leadersGame !== game) return;
    const myName = storageGet("player_name");
    list.innerHTML = "";
    rows.forEach(row => {
      const li = document.createElement("li");
      if (myName && row.name === myName) li.classList.add("me");
      const name = document.createElement("span");
      name.className = "name";
      name.textContent = row.name;
      const points = document.createElement("span");
      points.className = "points";
      points.textContent = row.score;
      li.append(name, points);
      list.appendChild(li);
    });
    status.textContent = rows.length ? "" : "Тут поки порожньо — стань першим!";
  } catch (err) {
    if (leadersGame === game) status.textContent = "Не вдалося завантажити таблицю";
  }
}

// ---------- Події ----------

$("btn-soon-ok").addEventListener("click", () => { $("soon").hidden = true; });
$("soon").addEventListener("click", e => {
  if (e.target === $("soon")) $("soon").hidden = true;
});
$("btn-leaders").addEventListener("click", () => showLeaders("naholosy"));
$("btn-menu").addEventListener("click", () => {
  if (training) showModes();
  else showMenu();
});
$("btn-modes-back").addEventListener("click", showMenu);
$("btn-marathon").addEventListener("click", () => startGame("naholosy"));
$("btn-fix-mistakes").addEventListener("click", startMistakesRound);
$("btn-train-next").addEventListener("click", () => startTraining(training.groupIndex + 1));
$("btn-train-again").addEventListener("click", () => startTraining(training.groupIndex));
$("btn-train-groups").addEventListener("click", showModes);
$("btn-leaders-back").addEventListener("click", showMenu);
$("btn-again").addEventListener("click", () => startGame(currentGame));
$("btn-over-menu").addEventListener("click", showMenu);
$("btn-continue").addEventListener("click", () => {
  $("celebrate").hidden = true;
  nextQuestion();
});
document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => showLeaders(tab.dataset.game));
});

// Клавіші 1–4 для вибору варіанта в «Наголосах»
document.addEventListener("keydown", e => {
  if (screens.game.hidden || currentGame !== "naholosy" || !$("celebrate").hidden) return;
  if (e.target.tagName === "INPUT") return;
  const btn = answersEl.children[Number(e.key) - 1];
  if (btn) btn.click();
});

renderMenu();

// ---------- Заборона копіювання ----------
// Зупиняє звичайне виділення, копіювання й контекстне меню (крім поля для імені)

function isEditable(target) {
  return target instanceof Element && target.closest("input, textarea");
}

["copy", "cut", "contextmenu", "selectstart", "dragstart"].forEach(type => {
  document.addEventListener(type, e => {
    if (!isEditable(e.target)) e.preventDefault();
  });
});

document.addEventListener("keydown", e => {
  if (e.key === "Escape") $("soon").hidden = true;
});

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
  leksychna: [1000, 3000],
  klychnyi: [600, 2200]
};

// Бета-режим: ігри в розробці відкриваються лише за посиланням …/?beta (або …/beta/)
const BETA = new URLSearchParams(location.search).has("beta");
const KLYCHNYI_TOTAL = typeof klychnyiData !== "undefined" ? klychnyiData.length : 0;

const PRAISE = ["Правильно!", "Так тримати!", "Супер!", "Чудово!", "Влучно!", "Є!"];

// Усі ігри в меню. Нова гра = новий рядок тут.
// status: "live" — працює, "beta" — працює в тестовому режимі, "soon" — ще немає
// Підписи на плитках ігор
const STATUS_LABELS = { beta: "бета", soon: "скоро" };

const GAMES = [
  { id: "naholosy", name: "Наголоси", sub: "Усі, що потрібні для НМТ!", icon: "🗣️", status: "live", featured: true },
  { id: "leksychna", name: "Лексична помилка", icon: "🔎", status: "beta" },
  { id: "klychnyi", name: "Кличний відмінок", icon: "📣", status: BETA ? "beta" : "soon" },
  { id: "chyslivnyky", name: "Числівники", icon: "🔢", status: "soon" },
  { id: "frazeolohizmy", name: "Фразеологізми", icon: "💬", status: "soon" },
  { id: "inshomovni", name: "Іншомовні слова", icon: "🌍", status: "soon" }
];

const $ = id => document.getElementById(id);
const screens = {
  menu: $("menu"), modes: $("modes"), game: $("game"), over: $("over"),
  trainOver: $("train-over"), leaders: $("leaders"), duel: $("duel")
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
    if (game.sub) {
      const sub = document.createElement("span");
      sub.className = "tile-sub";
      sub.textContent = game.sub;
      name.appendChild(sub);
    }

    btn.append(icon, name);

    if (game.status !== "live") {
      const badge = document.createElement("span");
      badge.className = `badge badge-${game.status}`;
      badge.textContent = STATUS_LABELS[game.status];
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
      } else if (game.id === "naholosy" || game.id === "klychnyi") {
        showModes(game.id);
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
  document.body.classList.toggle("duel-open", name === "duel");
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
  } else if (currentGame === "klychnyi") {
    scoreEl.textContent = score >= KLYCHNYI_TOTAL ? `${score} 🏆` : `${score}/${KLYCHNYI_TOTAL}`;
    progressEl.hidden = false;
    progressFill.style.width = `${Math.min(score / KLYCHNYI_TOTAL, 1) * 100}%`;
    progressEl.classList.toggle("done", score >= KLYCHNYI_TOTAL);
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

  remainingQuestions = gameType === "naholosy" ? [...naholosyData]
    : gameType === "klychnyi" ? [...klychnyiData]
    : [];
  showScreen("game");
  $("test-note").hidden = gameType === "naholosy";
  $("test-note").textContent = gameType === "klychnyi"
    ? "🧪 Бета-версія тренажера. Помітили неточність — напишіть @ukr_movych."
    : "🧪 Розділ працює в тестовому режимі: деякі речення ще потребують доопрацювання.";
  hintEl.textContent = gameType === "naholosy" || gameType === "klychnyi"
    ? "Підказка: можна відповідати клавішами 1, 2, 3"
    : "";
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
  } else if (currentGame === "klychnyi") {
    if (remainingQuestions.length === 0) {
      remainingQuestions = [...klychnyiData];
    }
    const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
    currentQuestion = remainingQuestions.splice(randomIndex, 1)[0];
    renderKlychnyi();
  }
}

// ---------- Кличний відмінок ----------

// Початок речення залежно від типу слова (див. klychnyi-data.js)
const KLYCHNYI_NAMES = {
  m: ["Іване", "Андрію", "Тарасе", "Олексію", "Петре", "Миколо", "Богдане", "Сергію"],
  f: ["Маріє", "Олено", "Ганно", "Оксано", "Наталіє", "Ірино", "Галино", "Софіє"]
};

function pickOne(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function klychnyiPrefix(frame) {
  switch (frame) {
    case "pf": return "Шановна пані";
    case "sm": return "Шановний";
    case "sf": return "Шановна";
    case "lm": return pickOne(["Любий", "Дорогий"]);
    case "lf": return pickOne(["Люба", "Дорога"]);
    case "bm": return `Любий ${pickOne(KLYCHNYI_NAMES.m)}`;
    case "bf": return `Люба ${pickOne(KLYCHNYI_NAMES.f)}`;
    case "oh": return "О";
    case "ln": return pickOne(["Любе", "Маленьке"]);
    default: return "Шановний пане";
  }
}

// Варіанти відповіді: кличний, називний і неправильні форми (без повторів —
// у IV відміні кличний збігається з називним)
function klychnyiOptions(row) {
  const [, nominative, vocative, ...wrong] = row;
  const options = [...new Set([vocative, nominative, ...wrong])];
  shuffleArray(options);
  return options;
}

function renderKlychnyi() {
  const [frame, , vocative] = currentQuestion;
  const prefix = klychnyiPrefix(frame);
  questionEl.textContent = "Обери правильну форму звертання";

  // «Шановний пане ___!»
  sentenceEl.hidden = false;
  sentenceEl.innerHTML = "";
  const line = document.createElement("p");
  line.className = "address-line";
  line.append(`${prefix} `);
  const gap = document.createElement("span");
  gap.className = "address-gap";
  gap.textContent = "…";
  line.append(gap, "!");
  sentenceEl.appendChild(line);

  klychnyiOptions(currentQuestion).forEach(word => {
    const btn = document.createElement("button");
    btn.className = "answer";
    btn.dataset.word = word;
    btn.textContent = word;

    btn.onclick = () => {
      const isCorrect = word === vocative;
      handleAnswer(isCorrect, () => {
        gap.textContent = vocative;
        gap.classList.add(isCorrect ? "filled-ok" : "filled-fix");
        Array.from(answersEl.children).forEach(b => {
          if (b.dataset.word === vocative) {
            b.classList.add("correct");
            if (!isCorrect) b.classList.add("blink");
          } else if (b !== btn) {
            b.classList.add("dim");
          }
        });
        if (!isCorrect) btn.classList.add("wrong");
      }, { plain: true, prefix, chosen: word, correct: [vocative] });
    };
    answersEl.appendChild(btn);
  });
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

  $("over-score").textContent = currentGame === "naholosy" ? `${score}/${TOTAL_WORDS}`
    : currentGame === "klychnyi" ? `${score}/${KLYCHNYI_TOTAL}`
    : score;
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
    } else if (m.plain) {
      // Кличний відмінок: обрана форма -> правильна
      const was = document.createElement("span");
      was.className = "was";
      was.textContent = m.chosen;
      const arrow = document.createElement("span");
      arrow.className = "arrow";
      arrow.textContent = "→";
      const right = document.createElement("span");
      right.className = "right plain-right";
      right.textContent = `${m.prefix} ${m.correct[0]}!`;
      li.append(was, arrow, right);
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

// 1 звертання, 2 звертання, 5 звертань
function plural(n, one, few, many) {
  const n10 = n % 10, n100 = n % 100;
  if (n10 === 1 && n100 !== 11) return one;
  if (n10 >= 2 && n10 <= 4 && (n100 < 12 || n100 > 14)) return few;
  return many;
}

// Екран режимів (марафон / групи / дуель) для гри з вибором слів
let modesGame = "naholosy";

function showModes(game = modesGame) {
  clearTimeout(nextTimer);
  training = null;
  questionToken++;
  modesGame = game;

  const isNaholosy = game === "naholosy";
  $("modes-title").textContent = isNaholosy ? "Наголоси" : "Кличний відмінок";
  $("marathon-desc").textContent = isNaholosy
    ? `Усі ${TOTAL_WORDS} слова · 3 життя · турнірна таблиця`
    : `Усі ${KLYCHNYI_TOTAL} ${plural(KLYCHNYI_TOTAL, "звертання", "звертання", "звертань")} · 3 життя · турнірна таблиця`;
  $("marathon-best").dataset.best = game;
  $("groups-panel").hidden = !isNaholosy;
  // Онлайн-режими поки що лише в бета-версії (…/?beta)
  $("online-panel").hidden = !isNaholosy || !BETA;
  $("duel-num").textContent = isNaholosy ? "3" : "2";
  $("duel-desc").textContent = `Один екран, 2–4 гравці. Хто перший натисне ${isNaholosy ? "правильний наголос" : "правильну форму звертання"} — отримує бал.`;

  if (isNaholosy) renderGroups();
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
    btn.className = "group-tile" + (mastered ? " mastered" : best > 0 ? " tried" : "");
    if (best > 0 && !mastered) {
      // Колір від жовтого до зеленого: що кращий результат, то зеленіше
      const ratio = best / group.words.length;
      btn.style.setProperty("--p", ratio.toFixed(2));
      btn.style.setProperty("--h", Math.round(45 + 55 * ratio));
    }

    const label = document.createElement("span");
    label.className = "group-label";
    label.textContent = group.label;

    const info = document.createElement("span");
    info.className = "group-info";
    info.textContent = mastered
      ? "✓ вивчено"
      : best > 0 ? `${Math.round((best / group.words.length) * 100)}%` : `${group.words.length} слів`;

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

// ---------- Дуель на одному екрані (2–4 гравці) ----------

const DUEL_TARGETS = [10, 20, 50];
const TG_LINK = "https://t.me/+GkBggS477tlmODQy";

// Командні кольори: команда 1 — помаранчеві відтінки, команда 2 — бірюзові
const TEAM_COLORS = [["#FF7900", "#ffa24d"], ["#2fb8a6", "#74d9cb"]];

const DUEL_PLAYERS = [
  { name: "Гравець 1", color: "#FF7900", keys: ["1", "2", "3"] },
  { name: "Гравець 2", color: "#2fb8a6", keys: ["8", "9", "0"] },
  { name: "Гравець 3", color: "#a77bf3", keys: ["q", "w", "e"] },
  { name: "Гравець 4", color: "#4c9bff", keys: ["i", "o", "p"] }
];

// Налаштування дуелі запам'ятовуються
const coarsePointer = window.matchMedia("(pointer: coarse)").matches;
const duelSetup = {
  n: [2, 3, 4].includes(Number(storageGet("duel_n"))) ? Number(storageGet("duel_n")) : 2,
  layout: ["table", "wall"].includes(storageGet("duel_layout"))
    ? storageGet("duel_layout")
    : (coarsePointer ? "table" : "wall"),
  teams: storageGet("duel_teams") === "1",
  target: DUEL_TARGETS.includes(Number(storageGet("duel_target"))) ? Number(storageGet("duel_target")) : 10
};
let duel = null;

function teamsOn(n = duelSetup.n, teams = duelSetup.teams) {
  return n === 4 && teams;
}

// Команда гравця: на столі — нижня пара проти верхньої, на стіні — ліва проти правої
function teamOf(i) {
  return i < 2 ? 0 : 1;
}

function playerColor(i, teams) {
  return teams ? TEAM_COLORS[teamOf(i)][i % 2] : DUEL_PLAYERS[i].color;
}

function playerName(i, teams) {
  return teams ? `Команда ${teamOf(i) + 1}` : DUEL_PLAYERS[i].name;
}

// Як тримати пристрій для кожної розкладки
function bestOrientation(n, layout) {
  return layout === "table" && n !== 3 ? "portrait" : "landscape";
}

function renderDuelSetup() {
  document.querySelectorAll("#duel-players button").forEach(b => {
    const on = Number(b.dataset.n) === duelSetup.n;
    b.classList.toggle("active", on);
    b.setAttribute("aria-checked", on);
  });
  document.querySelectorAll("#duel-layout button").forEach(b => {
    const on = b.dataset.layout === duelSetup.layout;
    b.classList.toggle("active", on);
    b.setAttribute("aria-checked", on);
  });
  document.querySelectorAll("#duel-target button").forEach(b => {
    const on = Number(b.dataset.target) === duelSetup.target;
    b.classList.toggle("active", on);
    b.setAttribute("aria-checked", on);
  });

  const { n, layout } = duelSetup;
  const teams = teamsOn();
  $("duel-teams-row").hidden = n !== 4;
  document.querySelectorAll("#duel-teams button").forEach(b => {
    const on = (b.dataset.teams === "1") === duelSetup.teams;
    b.classList.toggle("active", on);
    b.setAttribute("aria-checked", on);
  });

  const orientation = bestOrientation(n, layout) === "portrait" ? "вертикально" : "горизонтально";
  let hint = layout === "wall"
    ? `${n} колонки поруч, усі прямо — для дошки, великої сенсорної панелі чи екрана ${orientation}.`
    : n === 2
      ? "Телефон чи планшет лежить між гравцями вертикально: верхня половина перевернута."
      : n === 3
        ? "Телефон чи планшет лежить горизонтально: двоє гравців з одного боку, третій — навпроти (середня частина перевернута)."
        : "«2 на 2»: телефон чи планшет лежить вертикально, верхні дві частини перевернуті.";
  if (teams) {
    hint += layout === "wall"
      ? " Команда 1 — ліві колонки, команда 2 — праві. Бал спільний: хто з пари перший."
      : " Команда 1 — нижня пара, команда 2 — верхня. Бал спільний: хто з пари перший.";
  }
  $("duel-hint").textContent = hint;

  // Мініатюра поділу екрана
  const preview = $("duel-preview");
  preview.className = `duel-preview ${layoutClass(n, layout)} ${bestOrientation(n, layout)}`;
  preview.innerHTML = "";
  for (let i = 0; i < n; i++) {
    const cell = document.createElement("span");
    cell.className = "pv-cell" + (isMirrored(i, n, layout) ? " flipped" : "");
    cell.style.setProperty("--pc", playerColor(i, teams));
    cell.style.gridArea = `p${i}`;
    cell.textContent = i + 1;
    preview.appendChild(cell);
  }
  const bar = document.createElement("span");
  bar.className = "pv-bar";
  bar.style.gridArea = "bar";
  preview.appendChild(bar);
}

function layoutClass(n, layout) {
  return `layout-${layout} n-${n}`;
}

// Хто сидить навпроти й бачить перевернутий екран
function isMirrored(i, n, layout) {
  if (layout !== "table") return false;
  if (n === 2) return i === 1;
  if (n === 3) return i === 1; // середній гравець сидить навпроти двох крайніх
  return i >= 2;
}

function showKeyHints() {
  return duelSetup.layout === "wall" && window.matchMedia("(hover: hover)").matches;
}

function startDuel() {
  clearTimeout(nextTimer);
  training = null;
  const { n, layout } = duelSetup;
  const teams = teamsOn();
  duel = {
    game: modesGame,
    n,
    layout,
    teams,
    target: duelSetup.target,
    // у командній грі рахунок ведеться по командах
    scores: new Array(teams ? 2 : n).fill(0),
    locked: new Array(n).fill(false),
    queue: [],
    resolved: false,
    question: null,
    over: false
  };
  gtag('event', 'duel_start', { game_type: modesGame, players: n, layout, teams, target: duelSetup.target });
  buildDuelBoard();
  showScreen("duel");
  checkDuelOrientation();
  nextDuelRound();
}

function buildDuelBoard() {
  const board = $("duel-board");
  board.className = `duel-board ${layoutClass(duel.n, duel.layout)}`;
  board.innerHTML = "";

  for (let i = 0; i < duel.n; i++) {
    const pane = document.createElement("section");
    pane.className = "duel-pane" + (isMirrored(i, duel.n, duel.layout) ? " flipped" : "");
    pane.dataset.player = i;
    pane.style.gridArea = `p${i}`;
    pane.style.setProperty("--pc", playerColor(i, duel.teams));
    pane.innerHTML = `
      <div class="duel-head">
        <span class="duel-name"></span>
        <span class="duel-score">0</span>
      </div>
      <p class="duel-lead" hidden></p>
      <div class="duel-answers"></div>
      <p class="duel-status"></p>`;
    pane.querySelector(".duel-name").textContent = playerName(i, duel.teams);
    board.appendChild(pane);
  }

  const bar = document.createElement("div");
  bar.className = "duel-bar";
  bar.style.gridArea = "bar";
  bar.innerHTML = `
    <button class="icon-btn duel-exit" aria-label="Вийти з дуелі">✕</button>
    <a class="duel-brand" href="${TG_LINK}" target="_blank" rel="noopener" data-tg-link>
      <img src="logo.png" alt="" width="26" height="26">@ukr_movych
    </a>
    <span class="duel-goal">до ${duel.target}</span>
    <button class="btn-primary btn-small duel-again" hidden>Ще раз</button>`;
  bar.querySelector(".duel-exit").addEventListener("click", exitDuel);
  bar.querySelector(".duel-again").addEventListener("click", startDuel);
  board.appendChild(bar);

  // Підказка повернути пристрій, якщо він тримається не так
  const want = bestOrientation(duel.n, duel.layout);
  const rotate = document.createElement("div");
  rotate.className = `duel-rotate want-${want}`;
  rotate.hidden = true;
  rotate.innerHTML = `
    <div class="rotate-phone" aria-hidden="true"><span>📱</span></div>
    <p class="rotate-title">Поверни пристрій ${want === "portrait" ? "вертикально" : "горизонтально"}</p>
    <p class="rotate-sub">Так усім гравцям буде зручно й нічого не обріжеться</p>
    <button class="btn-secondary btn-small rotate-skip">Грати так</button>`;
  rotate.querySelector(".rotate-skip").addEventListener("click", () => {
    duel.ignoreOrientation = true;
    rotate.hidden = true;
  });
  board.appendChild(rotate);
}

function duelPane(i) {
  return document.querySelector(`.duel-pane[data-player="${i}"]`);
}

function scoreSlot(i) {
  return duel.teams ? teamOf(i) : i;
}

function updateDuelScores() {
  for (let i = 0; i < duel.n; i++) {
    duelPane(i).querySelector(".duel-score").textContent = duel.scores[scoreSlot(i)];
  }
}

function setDuelStatus(i, text, kind) {
  const el = duelPane(i).querySelector(".duel-status");
  el.textContent = text;
  el.className = "duel-status" + (kind ? ` ${kind}` : "");
}

// Питання дуелі: варіанти, правильні відповіді, (для кличного) початок речення
function makeDuelRound(question) {
  if (duel.game === "klychnyi") {
    return {
      lead: klychnyiPrefix(question[0]),
      words: klychnyiOptions(question),
      correct: [question[2]],
      render: (btn, word) => { btn.textContent = word; }
    };
  }
  const words = [...question.words];
  shuffleArray(words);
  return {
    lead: null,
    words,
    correct: Array.isArray(question.correct) ? question.correct : [question.correct],
    render: renderStressWord
  };
}

function nextDuelRound() {
  if (duel.queue.length === 0) {
    duel.queue = duel.game === "klychnyi" ? [...klychnyiData] : [...naholosyData];
    shuffleArray(duel.queue);
  }
  duel.question = duel.queue.shift();
  duel.round = makeDuelRound(duel.question);
  duel.locked.fill(false);
  duel.resolved = false;

  const { words, lead } = duel.round;
  const keys = showKeyHints();

  for (let i = 0; i < duel.n; i++) {
    const pane = duelPane(i);
    pane.classList.remove("won-round", "lost-round", "winner", "loser");
    const box = pane.querySelector(".duel-answers");
    box.innerHTML = "";
    setDuelStatus(i, "Хто швидше?");

    const leadEl = pane.querySelector(".duel-lead");
    leadEl.hidden = !lead;
    if (lead) {
      leadEl.innerHTML = "";
      const gap = document.createElement("span");
      gap.className = "address-gap";
      gap.textContent = "…";
      leadEl.append(`${lead} `, gap, "!");
    }
    words.forEach((word, k) => {
      const btn = document.createElement("button");
      btn.className = "answer duel-answer";
      btn.dataset.word = word;
      duel.round.render(btn, word);
      if (keys) {
        const key = document.createElement("kbd");
        key.textContent = DUEL_PLAYERS[i].keys[k].toUpperCase();
        btn.appendChild(key);
      }
      // pointerdown — щоб усі гравці могли тиснути одночасно і без затримки
      btn.addEventListener("pointerdown", e => {
        e.preventDefault();
        duelTap(i, word, btn);
      });
      box.appendChild(btn);
    });
  }
  updateDuelScores();
  fitDuelText();
}

// Довгі слова у вузьких частинах екрана: зменшуємо шрифт, доки слово не влізе
function fitDuelText() {
  document.querySelectorAll(".duel-answer").forEach(btn => {
    const word = btn.firstElementChild;
    if (!word) return;
    btn.style.fontSize = "";
    let size = parseFloat(getComputedStyle(btn).fontSize);
    const pad = parseFloat(getComputedStyle(btn).paddingLeft) + parseFloat(getComputedStyle(btn).paddingRight);
    const max = btn.clientWidth - pad - 4;
    while (word.scrollWidth > max && size > 11) {
      size -= 1;
      btn.style.fontSize = `${size}px`;
    }
  });
}

// Телефон тримають не так, як треба для розкладки → просимо повернути
function checkDuelOrientation() {
  const rotate = document.querySelector(".duel-rotate");
  if (!duel || !rotate) return;
  const portrait = window.innerHeight >= window.innerWidth;
  const want = bestOrientation(duel.n, duel.layout);
  // Великі екрани (планшети в 2×2, дошки) показують усе й так — лише телефони
  const small = Math.min(window.innerWidth, window.innerHeight) < 600;
  const wrong = want === "portrait" ? !portrait : portrait;
  rotate.hidden = !(small && wrong) || Boolean(duel.ignoreOrientation);
}

window.addEventListener("resize", () => {
  if (duel && !screens.duel.hidden) {
    checkDuelOrientation();
    fitDuelText();
  }
});

function duelCorrectWords() {
  return duel.round.correct;
}

function revealDuelAnswer(blink) {
  const correct = duelCorrectWords();
  document.querySelectorAll(".duel-lead .address-gap").forEach(gap => {
    gap.textContent = correct[0];
    gap.classList.add("filled-fix");
  });
  document.querySelectorAll(".duel-answer").forEach(b => {
    if (correct.includes(b.dataset.word)) {
      b.classList.add("correct");
      if (blink) b.classList.add("blink");
    } else if (!b.classList.contains("wrong")) {
      b.classList.add("dim");
    }
  });
}

function duelTap(i, word, btn) {
  if (!duel || duel.over || duel.resolved || duel.locked[i]) return;

  if (duelCorrectWords().includes(word)) {
    duel.resolved = true;
    const slot = scoreSlot(i);
    duel.scores[slot]++;
    updateDuelScores();
    revealDuelAnswer(false);
    for (let j = 0; j < duel.n; j++) {
      const sameSide = duel.teams && teamOf(j) === teamOf(i);
      if (j === i || sameSide) duelPane(j).classList.add("won-round");
      if (j === i) setDuelStatus(j, duel.teams ? "+1 команді — швидше за всіх! ⚡" : "+1 — швидше за всіх! ⚡", "good");
      else if (sameSide) setDuelStatus(j, "+1 команді — партнер був швидшим ⚡", "good");
      else setDuelStatus(j, duel.teams
        ? `Швидшою була команда ${teamOf(i) + 1}`
        : `Швидше був ${DUEL_PLAYERS[i].name.toLowerCase()}`);
    }
    if (duel.scores[slot] >= duel.target) {
      duel.over = true;
      schedule(() => finishDuel(slot), 1200);
    } else {
      schedule(nextDuelRound, 1200);
    }
    return;
  }

  // Помилка: цей гравець пропускає слово
  duel.locked[i] = true;
  btn.classList.add("wrong");
  duelPane(i).classList.add("lost-round");
  setDuelStatus(i, "Помилка — чекай наступне слово", "bad");

  if (duel.locked.every(Boolean)) {
    duel.resolved = true;
    revealDuelAnswer(true);
    for (let j = 0; j < duel.n; j++) setDuelStatus(j, "Ніхто не вгадав 🙈", "bad");
    schedule(nextDuelRound, 2000);
  }
}

// winner — номер гравця або (у командах) номер команди
function finishDuel(winner) {
  gtag('event', 'duel_end', { game_type: duel.game, players: duel.n, layout: duel.layout, teams: duel.teams, score: duel.scores.join(":") });
  for (let i = 0; i < duel.n; i++) {
    const pane = duelPane(i);
    const won = scoreSlot(i) === winner;
    pane.querySelector(".duel-answers").innerHTML = "";
    pane.classList.remove("won-round", "lost-round");
    pane.classList.add(won ? "winner" : "loser");
    setDuelStatus(i,
      won ? (duel.teams ? "🏆 Команда перемогла!" : "🏆 Перемога!") : "Наступного разу пощастить 💪",
      won ? "good win" : "lose");
  }
  document.querySelector(".duel-again").hidden = false;
  document.querySelector(".duel-goal").hidden = true;
  launchConfetti();
}

function exitDuel() {
  clearTimeout(nextTimer);
  const game = duel ? duel.game : modesGame;
  duel = null;
  showModes(game);
}

// Клавіатура: у кожного гравця свої три клавіші (видно на кнопках)
document.addEventListener("keydown", e => {
  if (!duel || screens.duel.hidden || e.repeat) return;
  const key = e.key.toLowerCase();
  for (let i = 0; i < duel.n; i++) {
    const k = DUEL_PLAYERS[i].keys.indexOf(key);
    if (k === -1) continue;
    const btn = duelPane(i).querySelectorAll(".duel-answer")[k];
    if (btn) duelTap(i, btn.dataset.word, btn);
  }
});

document.querySelectorAll("#duel-players button").forEach(b => {
  b.addEventListener("click", () => {
    duelSetup.n = Number(b.dataset.n);
    storageSet("duel_n", String(duelSetup.n));
    renderDuelSetup();
  });
});
document.querySelectorAll("#duel-layout button").forEach(b => {
  b.addEventListener("click", () => {
    duelSetup.layout = b.dataset.layout;
    storageSet("duel_layout", duelSetup.layout);
    renderDuelSetup();
  });
});
document.querySelectorAll("#duel-target button").forEach(b => {
  b.addEventListener("click", () => {
    duelSetup.target = Number(b.dataset.target);
    storageSet("duel_target", String(duelSetup.target));
    renderDuelSetup();
  });
});
document.querySelectorAll("#duel-teams button").forEach(b => {
  b.addEventListener("click", () => {
    duelSetup.teams = b.dataset.teams === "1";
    storageSet("duel_teams", duelSetup.teams ? "1" : "0");
    renderDuelSetup();
  });
});
renderDuelSetup();

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
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`);
    err.status = res.status;
    throw err;
  }
  const text = await res.text();
  return text ? JSON.parse(text) : null;
}

// Прихований ідентифікатор гравця на цьому пристрої: так таблиця
// відрізняє одного гравця від інших людей з таким самим іменем
function getPlayerId() {
  let id = storageGet("player_id");
  if (!id || !/^[0-9a-f-]{36}$/.test(id)) {
    id = window.crypto && crypto.randomUUID
      ? crypto.randomUUID()
      : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
      });
    storageSet("player_id", id);
  }
  return id;
}

// Записує результат; у таблиці лишається найкращий результат гравця.
// Повертає результат, який стоїть у таблиці (або null для старої бази).
async function submitScore(name, game, value) {
  try {
    return await lbRequest("rpc/submit_score", {
      method: "POST",
      body: JSON.stringify({ p_player: getPlayerId(), p_name: name, p_game: game, p_score: value })
    });
  } catch (err) {
    // База ще без функції submit_score (не запущено leaderboard-best-score.sql)
    if (err.status !== 404) throw err;
    await lbRequest("scores", {
      method: "POST",
      headers: { Prefer: "return=minimal" },
      body: JSON.stringify({ name, game, score: value })
    });
    return null;
  }
}

function prepareSubmitForm() {
  const form = $("submit-form");
  // Турнірна таблиця — лише для ігор, які вже не в бета-версії
  form.hidden = !leaderboardEnabled || score <= 0 || !["naholosy", "leksychna", "klychnyi"].includes(currentGame);
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
    const stored = await submitScore(name, currentGame, score);
    storageSet("player_name", name);
    $("player-name").disabled = true;
    setSubmitStatus(
      stored !== null && stored > score
        ? `У таблиці лишається твій рекорд — ${stored} 🏆`
        : "Готово! Ти в таблиці 🏆",
      "good"
    );
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
$("btn-duel").addEventListener("click", startDuel);
$("btn-marathon").addEventListener("click", () => startGame(modesGame));
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
  if (screens.game.hidden || !["naholosy", "klychnyi"].includes(currentGame) || !$("celebrate").hidden) return;
  if (e.target.tagName === "INPUT") return;
  const btn = answersEl.children[Number(e.key) - 1];
  if (btn) btn.click();
});

renderMenu();

// Вкладка «Кличний» у турнірній таблиці — поки гра в бета-версії, лише за бета-посиланням
document.querySelector('.tab[data-game="klychnyi"]').hidden = !BETA;

// Посилання @ukr_movych: у Telegram відкриваємо через Telegram, на сайті — у новій вкладці
document.addEventListener("click", e => {
  const link = e.target instanceof Element && e.target.closest("[data-tg-link]");
  if (!link) return;
  gtag('event', 'brand_click', { place: link.className });
  const tg = window.Telegram && window.Telegram.WebApp;
  if (tg && tg.initData && typeof tg.openTelegramLink === "function") {
    e.preventDefault();
    tg.openTelegramLink(link.href);
  }
});

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

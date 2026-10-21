// Відео «233/233»: справжній марафон «Наголосів» — знімки екрана (390×844, ×3) → work/m/shots/*.png + координати кнопок → work/m/meta.json
// Гра проходиться автоматично (завжди правильна відповідь); знімаємо лише потрібні моменти.
const { chromium } = require('playwright');
const OUT = __dirname + '/work/m/shots/';
const FIRST = 6, LAST = 4; // скільки слів «наживо» на початку й наприкінці
// рахунки, на яких знімаємо «перемотку» (крок дедалі більший, потім знову менший)
const FF = [7, 8, 9, 11, 13, 16, 19, 23, 28, 34, 41, 49, 58, 68, 79, 91, 104, 117, 130, 143, 156, 168, 179, 189, 198, 206, 213, 219, 224, 227, 228];
const meta = {};
(async () => {
  require('fs').mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });
  const p = await ctx.newPage();
  await p.route('**/rest/v1/**', r => r.fulfill({ body: '[]', contentType: 'application/json' }));
  await p.route('**/functions/v1/**', r => r.fulfill({ body: '{"pro":false,"topics":[]}', contentType: 'application/json' }));
  await p.addInitScript(() => {
    localStorage.setItem('best_naholosy', '187');
    window.addEventListener('DOMContentLoaded', () => { const s = document.createElement('style'); s.textContent = '*{caret-color:transparent!important;transition:none!important;animation:none!important}.sparkle,#confetti{display:none!important}'; document.head.appendChild(s); });
  });
  const rect = async sel => p.locator(sel).first().evaluate(e => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
  const snap = async (name, rects = {}) => {
    await p.waitForTimeout(120);
    const r = {}; for (const k in rects) r[k] = await rect(rects[k]);
    await p.screenshot({ path: OUT + name + '.png' });
    meta[name] = { r };
  };
  await p.goto('http://localhost:8765/', { waitUntil: 'load' }); await p.waitForTimeout(800);
  await p.evaluate(() => { DELAYS.naholosy = [1e9, 1e9]; showModes('naholosy'); });
  await p.waitForTimeout(400);
  await snap('modes', { go: '#btn-marathon' });
  await p.click('#btn-marathon'); await p.mouse.move(2, 840); await p.waitForTimeout(300);
  // правильна кнопка на поточному слові
  const okSel = async () => p.evaluate(() => {
    const ok = [].concat(currentQuestion.correct); const bs = [...document.querySelectorAll('#answers .answer')];
    return '#answers .answer >> nth=' + bs.findIndex(x => ok.includes(x.dataset.word));
  });
  for (let n = 1; n <= 233; n++) {
    const sel = await okSel();
    const live = n <= FIRST || n > 233 - LAST;
    if (live) await snap('q' + n, { ok: sel, score: '#score' });
    await p.click(sel); await p.mouse.move(2, 840); // без «наведення» на кнопки
    if (live || FF.includes(n)) await snap('a' + n, { ok: sel, score: '#score' });
    // довгі слова (напр. «сільськогосподарський») на вузькому екрані не влазять у кнопку — вони йдуть у «перемотку», а не в живі кадри
    if (n < 233) await p.evaluate(drain => {
      const long = q => q.words.some(w => w.length > 15), R = remainingQuestions;
      let i = drain ? R.findIndex(long) : -1;
      if (i < 0) { const ok = R.map((q, j) => j).filter(j => !long(R[j])); i = ok.length ? ok[Math.floor(Math.random() * ok.length)] : Math.floor(Math.random() * R.length); }
      const rnd = Math.random; Math.random = () => (Math.random = rnd, (i + .5) / R.length); nextQuestion();
    }, n >= 233 - LAST - 40);
  }
  await p.evaluate(() => celebrate()); await p.waitForTimeout(300);
  await snap('win', { card: '#celebrate .modal-card', score: '#score' });
  require('fs').writeFileSync(__dirname + '/work/m/meta.json', JSON.stringify({ meta, FIRST, LAST, FF }, null, 1));
  await b.close();
})();

// Знімає повні сторінки (fullPage) усіх станів + координати елементів → v2/shots/*.png, v2/meta.json
const { chromium } = require('playwright');
const { FULL, LEKS } = require('./shots.js');
const OUT = __dirname + '/work/v/shots/';
const CLASS = { code: '482615', name: '11-Б', my_name: 'Оксана', owner: true, members: 1 };
const meta = {};
(async () => {
  require('fs').mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const ctx = await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });
  const p = await ctx.newPage();
  let state = { classes: [], table: [{ name: 'Оксана', score: 164, me: true }] };
  await p.route('**/rest/v1/**', r => r.fulfill({ body: '[]', contentType: 'application/json' }));
  await p.route('**/rest/v1/rpc/**', r => {
    const name = r.request().url().split('/').pop(); const body = r.request().postDataJSON() || {};
    const J = x => r.fulfill({ body: JSON.stringify(x), contentType: 'application/json' });
    if (name === 'my_classrooms') return J(state.classes);
    if (name === 'create_classroom') { state.classes = [{ ...CLASS }]; return J(CLASS.code); }
    if (name === 'classroom_info') return J({ code: CLASS.code, name: CLASS.name, members: 8 });
    if (name === 'join_classroom') return J({ code: CLASS.code, name: CLASS.name, members: 9 });
    if (name === 'classroom_table') return J(body.p_game === 'leksychna' ? state.leks || [] : state.table);
    if (name === 'submit_classroom_score') return J(1);
    return J(null);
  });
  await p.route('**/functions/v1/**', r => r.fulfill({ body: '{"pro":false,"topics":[]}', contentType: 'application/json' }));
  await p.addInitScript(() => {
    localStorage.setItem('best_naholosy', '164');
    window.addEventListener('DOMContentLoaded', () => { const s = document.createElement('style'); s.textContent = '*{caret-color:transparent!important;transition:none!important;animation-duration:0s!important}'; document.head.appendChild(s); });
  });
  const rect = async sel => p.locator(sel).first().evaluate(e => { const r = e.getBoundingClientRect(); return { x: r.x + scrollX, y: r.y + scrollY, w: r.width, h: r.height }; });
  const snap = async (name, rects = {}) => {
    await p.waitForTimeout(250);
    await p.evaluate(() => document.activeElement && document.activeElement.blur && document.activeElement.blur());
    const r = {}; for (const k in rects) r[k] = await rect(rects[k]);
    const h = await p.evaluate(() => document.documentElement.scrollHeight);
    await p.screenshot({ path: OUT + name + '.png', fullPage: true });
    meta[name] = { h, r };
  };
  const typeSeq = async (sel, text, prefix, rects) => {
    await p.fill(sel, '');
    for (let i = 1; i <= text.length; i++) { await p.fill(sel, text.slice(0, i)); await snap(prefix + i, rects); }
  };
  await p.goto('http://localhost:8765/', { waitUntil: 'load' }); await p.waitForTimeout(800);
  await snap('menu', { btn: '#btn-myclass' });
  await p.click('#btn-myclass'); await p.waitForTimeout(800);
  const I1 = '.class-card:nth-child(3) .class-input >> nth=0', I2 = '.class-card:nth-child(3) .class-input >> nth=1';
  const R2 = { i1: I1, i2: I2, go: 'text=Створити клас', card: '.class-card:nth-child(3)' };
  await p.fill(I1, ''); await p.fill(I2, ''); await snap('create0', R2);
  await typeSeq(I1, '11-Б', 'cA', R2);
  await typeSeq(I2, 'Оксана', 'cB', R2);
  await p.click('text=Створити клас'); await p.waitForTimeout(1000);
  const R3 = { code: '.class-code-card, .class-code', inv: '.class-actions .btn-secondary >> nth=0', qr: '.class-actions .btn-secondary >> nth=1' };
  await snap('code', R3);
  await p.click(R3.qr); await p.waitForTimeout(1200);
  await snap('qr', { qrimg: '.class-qr' });
  state.classes = [];
  await p.goto('http://localhost:8765/?class=482615', { waitUntil: 'load' }); await p.waitForTimeout(1000);
  const R5 = { inp: '.class-invite .class-input', go: '.class-invite .btn-primary' };
  await p.fill(R5.inp, ''); await snap('inv0', R5);
  await typeSeq(R5.inp, 'Максим', 'iA', R5);
  state.classes = [{ ...CLASS, members: 9 }]; state.table = FULL; state.leks = LEKS;
  await p.click(R5.go); await p.waitForTimeout(1200);
  const R6 = { tabs: '.class-tabs', tab1: '.class-tabs .tab >> nth=1', list: '.class-tabs' };
  await snap('table', R6);
  await p.click(R6.tab1); await p.waitForTimeout(1200);
  await snap('leks', R6);
  require('fs').writeFileSync(__dirname + '/work/v/meta.json', JSON.stringify(meta, null, 1));
  await b.close();
})();

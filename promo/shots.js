const { chromium } = require('playwright');
const OUT = __dirname + '/work/';
const CLASS = { code: '482615', name: '11-Б', my_name: 'Оксана', owner: true, members: 1 };
const FULL = [
  { name: 'Максим', score: 187 }, { name: 'бос нмт', score: 176 }, { name: 'Оксана', score: 164, me: true },
  { name: '676767', score: 152 }, { name: 'Софія', score: 139 }, { name: 'чаша жиру', score: 121 },
  { name: 'Артем', score: 96 }, { name: 'Даринка', score: 74 }, { name: 'Іван', score: null }
];
const LEKS = [
  { name: 'чаша жиру', score: 23 }, { name: 'Софія', score: 21 }, { name: 'Оксана', score: 19, me: true },
  { name: '676767', score: 17 }, { name: 'Максим', score: 14 }, { name: 'бос нмт', score: 12 },
  { name: 'Артем', score: null }, { name: 'Даринка', score: null }, { name: 'Іван', score: null }
];
module.exports = { FULL, LEKS };
if (require.main === module) (async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const video = process.argv[2] === 'video';
  // відео: вікно 720×1560 зі збільшенням ×1,846 — телефонна верстка 390 px, але чіткий кадр
  const ctx = video
    ? await b.newContext({ viewport: { width: 720, height: 1560 }, deviceScaleFactor: 1, recordVideo: { dir: OUT + 'vid/', size: { width: 720, height: 1560 } } })
    : await b.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3 });
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
  await p.addInitScript(withDots => {
    localStorage.setItem('best_naholosy', '164');
    // кружечок у місці натискання (для відео)
    window.addEventListener('DOMContentLoaded', () => {
      if (withDots) document.documentElement.style.zoom = String(720 / 390);
      const st = document.createElement('style');
      st.textContent = '.tap-dot{position:fixed;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:rgba(255,121,0,.45);border:3px solid #fff;pointer-events:none;z-index:9999;animation:tapd .6s ease-out forwards}@keyframes tapd{from{transform:scale(.4);opacity:1}to{transform:scale(1.4);opacity:0}}.hl{outline:4px solid #ffc46b !important;outline-offset:3px;border-radius:16px}';
      document.head.appendChild(st);
      if (withDots) document.addEventListener('pointerdown', e => { const d = document.createElement('div'); d.className = 'tap-dot'; d.style.left = e.clientX + 'px'; d.style.top = e.clientY + 'px'; document.body.appendChild(d); setTimeout(() => d.remove(), 700); }, true);
    });
  }, video);
  const cap = async text => { if (!video) return; await p.evaluate(t => {
    let c = document.getElementById('vcap');
    if (!c) { c = document.createElement('div'); c.id = 'vcap'; c.style.cssText = 'position:fixed;left:12px;right:12px;bottom:18px;z-index:10000;padding:14px 16px;border-radius:18px;background:#FF7900;color:#fff;font:700 21px/1.25 "Balsamiq Sans",sans-serif;text-align:center;box-shadow:0 6px 0 #b85700;transition:opacity .3s'; document.body.appendChild(c); }
    c.textContent = t; }, text); };
  const shot = async n => { if (!video) await p.screenshot({ path: OUT + n + '.png' }); };
  const pause = ms => p.waitForTimeout(video ? ms : 250);
  const type = async (sel, text) => { await p.click(sel); await p.type(sel, text, { delay: video ? 90 : 0 }); };

  await p.goto('http://localhost:8765/', { waitUntil: 'load' }); await pause(300);
  await cap('👥 НОВЕ: «Мій клас» — своя таблиця для однокласників'); await pause(2500);
  await p.locator('#btn-myclass').scrollIntoViewIfNeeded();
  await p.evaluate(() => { document.getElementById('btn-myclass').classList.add('hl'); window.scrollBy(0, 120); });
  await cap('1. Натисни «👥 Мій клас» на головному екрані'); await pause(2200); await shot('1-menu');
  await p.evaluate(() => document.getElementById('btn-myclass').classList.remove('hl'));
  await p.click('#btn-myclass'); await pause(1000);
  await cap('2. Напиши назву класу й своє ім\'я'); await pause(1200);
  await type('.class-card:nth-child(3) .class-input >> nth=0', '11-Б');
  await p.fill('.class-card:nth-child(3) .class-input >> nth=1', '');
  await type('.class-card:nth-child(3) .class-input >> nth=1', 'Оксана');
  await p.locator('.class-card:nth-child(3)').scrollIntoViewIfNeeded(); await pause(800);
  await shot('2-create');
  await p.click('text=Створити клас'); await pause(400);
  await cap('3. Готово! Ось код твого класу'); await pause(2200);
  await shot('3-code');
  await cap('4. «📨 Запросити» — посилання в чат класу. Або QR 👇'); await pause(1500);
  await p.click('.class-actions .btn-secondary >> nth=1'); await pause(1500);
  await p.locator('.class-qr').scrollIntoViewIfNeeded(); await pause(1200);
  await shot('4-qr');
  // однокласник відкриває посилання
  state.classes = [];
  await p.goto('http://localhost:8765/?class=482615', { waitUntil: 'load' }); await pause(300);
  await cap('5. Однокласник відкриває посилання, пише ім\'я…'); await pause(1500);
  await p.fill('.class-invite .class-input', ''); await type('.class-invite .class-input', 'Максим'); await pause(800);
  await shot('5-invite');
  // через тиждень: повна таблиця
  state.classes = [{ ...CLASS, members: 9 }]; state.table = FULL; state.leks = LEKS;
  await p.click('.class-invite .btn-primary'); await pause(800);
  await cap('6. Грайте як завжди — рекорди самі йдуть у таблицю класу 🔥'); await pause(1200);
  await p.evaluate(() => { const t = document.querySelector('.class-tabs'); t.scrollIntoView({ block: 'start' }); window.scrollBy(0, -20); });
  await pause(1500); await shot('6-table');
  await p.click('.class-tabs .tab >> nth=1'); await pause(1500);
  await p.evaluate(() => { const t = document.querySelector('.class-tabs'); t.scrollIntoView({ block: 'start' }); window.scrollBy(0, -20); });
  await pause(1200); await shot('7-table-leks');
  await cap('Створи свій клас і поклич однокласників! 💪'); await pause(3000);
  await ctx.close(); await b.close();
})();

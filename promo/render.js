const { chromium } = require('playwright');
const fs = require('fs');
const D = __dirname + '/'; const W = D + 'work/v/';
const FPS = 30, ONLY = process.argv[2]; // node render.js 5,11,22 — лише окремі секунди для перевірки
(async () => {
  const html = fs.readFileSync(D + 'compose.html', 'utf8').replace('META_JSON', fs.readFileSync(W + 'meta.json', 'utf8'));
  fs.writeFileSync(D + 'compose.gen.html', html);
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  p.on('console', m => console.log(m.text())); await p.goto('file://' + D + 'compose.gen.html');
  await p.evaluate(async () => { await document.fonts.ready; const bad = []; await Promise.all([...document.images].map(i => i.decode().catch(() => bad.push(i.src)))); if (bad.length) console.log("BAD", bad); });
  fs.writeFileSync(W + 'events.json', JSON.stringify(await p.evaluate(() => EVENTS)));
  const dur = await p.evaluate(() => DURATION);
  fs.writeFileSync(W + 'duration.txt', String(dur));
  fs.mkdirSync(W + 'frames', { recursive: true });
  const times = ONLY ? ONLY.split(',').map(Number) : Array.from({ length: Math.round(dur * FPS) }, (_, i) => i / FPS);
  for (let i = 0; i < times.length; i++) {
    await p.evaluate(t => render(t), times[i]);
    await p.screenshot({ path: ONLY ? `${W}check-${times[i]}.jpg` : `${W}frames/f${String(i).padStart(5, '0')}.jpg`, type: 'jpeg', quality: 92 });
  }
  await b.close();
})();

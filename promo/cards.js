const { chromium } = require('playwright');
const cards = [
  ['0-cover', { cover: 1, step: 'НОВЕ В НМТ-КАЧАЛЦІ', t: '👥 Мій клас', s: 'Своя турнірна таблиця для тебе й однокласників. Хто з вас найкраще знає наголоси?', img: 'work/6-table.png' }],
  ['1', { step: 'Крок 1', t: 'Відкрий «👥 Мій клас»', s: 'Кнопка з позначкою «НОВЕ!» — на головному екрані, одразу під «Наголосами».', img: 'work/1-menu.png' }],
  ['2', { step: 'Крок 2', t: 'Назви свій клас', s: 'Напиши назву (напр. «11-Б») і своє ім\'я → «Створити клас».', img: 'work/2-create.png' }],
  ['3', { step: 'Крок 3', t: 'Поклич однокласників', s: '«📨 Запросити» — надіслати посилання в чат класу. Або покажи QR чи 6 цифр коду.', img: 'work/4-qr.png' }],
  ['4', { step: 'Крок 4', t: 'Однокласник — в один дотик', s: 'Він відкриває посилання, пише ім\'я → «Приєднатися». Готово!', img: 'work/5-invite.png' }],
  ['5', { step: 'Крок 5', t: 'Грайте й змагайтеся 🔥', s: 'Рекорди самі потрапляють у таблицю класу — окремо для кожної гри.', img: 'work/6-table.png' }],
];
(async () => {
  const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
  const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [n, q] of cards) {
    await p.goto('file://' + __dirname + '/card.html?' + new URLSearchParams(q));
    await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(400);
    await p.screenshot({ path: `${__dirname}/out/myclass-guide-${n}.png` });
  }
  await b.close();
})();

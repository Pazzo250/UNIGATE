const puppeteer = require('puppeteer');

async function capture(urls = ['http://localhost:3000/']) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  const messages = [];
  page.on('console', msg => messages.push({ type: msg.type(), text: msg.text() }));
  page.on('pageerror', err => messages.push({ type: 'pageerror', text: err.message }));

  for (const u of urls) {
    try {
      console.log('Visiting', u);
      await page.goto(u, { waitUntil: 'networkidle2', timeout: 30000 });
    } catch (err) {
      messages.push({ type: 'visit-error', text: `${u} - ${err.message}` });
    }
  }

  console.log('Captured messages:');
  if (messages.length === 0) console.log('No client console messages');
  for (const m of messages) console.log(`${m.type}: ${m.text}`);
  await browser.close();
}

(async () => {
  const pages = [
    'http://localhost:3000/',
    'http://localhost:3000/home.html',
    'http://localhost:3000/resources.html',
    'http://localhost:3000/student-dashboard.html'
  ];
  try { await capture(pages); } catch (e) { console.error('capture failed', e.message); process.exit(2); }
})();

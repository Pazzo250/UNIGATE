const http = require('http');

function check(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', c => data += c);
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', reject);
  });
}

(async () => {
  try {
    const res = await check('http://localhost:3000/api/health');
    if (res.statusCode !== 200) {
      console.error('Health check failed:', res.statusCode, res.body);
      process.exit(2);
    }
    console.log('API health OK:', res.body);
  } catch (err) {
    console.error('Health check error', err.message);
    process.exit(2);
  }
})();

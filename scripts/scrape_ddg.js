const https = require('https');

const q = encodeURIComponent('NAF Conference Centre & Suites Abuja hotel exterior');
const options = {
  hostname: 'html.duckduckgo.com',
  path: '/html/?q=' + q,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    const regex = /<img[^>]+src="([^">]+)"/g;
    let match;
    const images = [];
    while ((match = regex.exec(data)) !== null) {
      if (match[1].startsWith('//')) {
         images.push('https:' + match[1]);
      } else if (match[1].startsWith('http')) {
         images.push(match[1]);
      }
    }
    console.log(images.slice(0, 5).join('\n'));
    if(images.length === 0) console.log("no images found. Data snippet:", data.substring(0, 500));
  });
}).on('error', (e) => console.error(e));

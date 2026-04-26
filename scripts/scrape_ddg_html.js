const https = require('https');

const q = encodeURIComponent('NAF Conference Centre & Suites Abuja exterior building');
const options = {
  hostname: 'html.duckduckgo.com',
  path: `/html/?q=${q}`,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
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
      const src = match[1];
      if (src.includes('external-content.duckduckgo.com/iu/')) {
         const uMatch = src.match(/[?&]u=([^&]+)/);
         if (uMatch) {
             const decoded = decodeURIComponent(uMatch[1]);
             images.push(decoded);
         }
      }
    }
    
    if (images.length > 0) {
      console.log('DuckDuckGo HTML Image Matches (decoded):');
      console.log([...new Set(images)].slice(0, 5).join('\n'));
    } else {
      console.log('No images found in DDG html. Data snippet:', data.substring(0, 500));
    }
  });
}).on('error', (e) => console.error(e));

const https = require('https');

const q = encodeURIComponent('NAF Conference Centre & Suites Abuja exterior building');
const options = {
  hostname: 'www.bing.com',
  path: `/images/search?q=${q}&form=HDRSC2`,
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8'
  }
};

https.get(options, (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    const urls = [];
    // Bing embeds image metadata in 'm' attributes as JSON
    const regex = /m="{&quot;murl&quot;:&quot;([^&]+?)&quot;/g;
    let match;
    while ((match = regex.exec(data)) !== null) {
      if (match[1].endsWith('.jpg') || match[1].endsWith('.png')) {
        urls.push(match[1]);
      }
    }
    
    if (urls.length > 0) {
      console.log('Bing Image Matches:');
      console.log([...new Set(urls)].slice(0, 5).join('\n'));
    } else {
      console.log('No Bing image matches found.');
    }
  });
}).on('error', (e) => console.error(e));

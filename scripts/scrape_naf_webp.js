const https = require('https');

https.get('https://nafconsuites.com/', (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    const matches = data.match(/https:\/\/nafconsuites\.com\/[^"'\s>]+?\.(?:jpg|jpeg|png|webp|gif)/gi);
    if (matches) {
      console.log([...new Set(matches)].join('\n'));
    } else {
      console.log('no images');
    }
  });
}).on('error', (e) => {
  console.error(e);
});

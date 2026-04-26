const https = require('https');

https.get('https://bookhotels.ng/hotels/naf-conference-centre-and-suites', (res) => {
  let data = '';
  res.on('data', (c) => data += c);
  res.on('end', () => {
    const matches = data.match(/https:\/\/[^\s"'>]+\.(?:jpg|jpeg|png)/gi);
    if (matches) {
      console.log([...new Set(matches)].join('\n'));
    } else {
      console.log('no images');
    }
  });
}).on('error', (e) => {
  console.error(e);
});

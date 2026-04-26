const urls = [
  'https://nafconsuites.com/'
];

Promise.all(urls.map(u => fetch(u).then(r=>r.text()))).then(texts => { 
  texts.forEach((t, i) => { 
    const matches = t.match(/https?:\/\/[^\s\"\'\>]+?\.(?:jpg|jpeg|png)(?!\w)/gi);
    console.log('Site', i, matches ? [...new Set(matches)].slice(0, 10) : 'No images found'); 
  }); 
});

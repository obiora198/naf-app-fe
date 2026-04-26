const urls = [
  'https://nafconsuites.com/',
  'https://nafconsuites.com/gallery/'
];

Promise.all(urls.map(u => fetch(u).then(r=>r.text()).catch(e => '')))
  .then(texts => { 
    texts.forEach((t, i) => { 
      const matches = t.match(/https?:\/\/[^\s"'>]+?\.(?:jpg|jpeg|png)/gi);
      if (matches) {
        const unique = [...new Set(matches)];
        console.log(`--- Site ${i} (${urls[i]}) ---`);
        unique.forEach(m => console.log(m));
      } else {
        console.log(`Site ${i} (${urls[i]}) No images found`); 
      }
    }); 
  });

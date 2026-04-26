const q = encodeURIComponent('NAF Conference Centre Abuja hotel building exterior');
fetch('https://html.duckduckgo.com/html/?q=' + q)
  .then(r=>r.text())
  .then(t => { 
    const m = t.match(/src=\"(\/\/external-content\.duckduckgo\.com\/iu\/\?u=[^\"]+)\"/g); 
    if(m) {
      const urls = m.map(x=>decodeURIComponent(x.split('u=')[1].split('&')[0]));
      console.log(urls.join('\n'));
    } else {
      console.log('No matches');
    }
  }).catch(console.error);

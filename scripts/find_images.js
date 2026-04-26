const fs = require('fs');

async function searchImages(query) {
  try {
    const response = await fetch(`https://html.duckduckgo.com/html/?q=${encodeURIComponent(query + ' "Nigeria" images')}`);
    const text = await response.text();
    
    // Simple regex to find image source links in DuckDuckGo HTML search results
    // duckduckgo html often links out to external sites
    const matches = [...text.matchAll(/src="(\/\/external-content\.duckduckgo\.com\/iu\/\?u=[^"]+)"/g)];
    
    if (matches.length > 0) {
      // Decode the URL from the duckduckgo proxy
      return matches.map(m => decodeURIComponent(m[1].split('u=')[1].split('&')[0])).slice(0, 3);
    }
    return null;
  } catch (error) {
    console.error(`Error searching for ${query}:`, error);
    return null;
  }
}

async function main() {
  const lodges = [
    "NAF Conference Centre & Suites, Abuja",
    "NAF Club & Guest House, Kaduna",
    "NAFRC Officers' Mess & Suites, Lagos",
    "NAF Transit Quarters, Enugu",
    "NAF Guest House, Port Harcourt",
    "NAF Lodge Makurdi",
    "NAF Guest House Maiduguri",
    "NAF Officers' Mess Yola"
  ];

  const results = {};
  for (const lodge of lodges) {
    console.log(`Searching for: ${lodge}...`);
    const urls = await searchImages(lodge);
    if (urls && urls.length > 0) {
      results[lodge] = urls;
    } else {
      results[lodge] = null;
    }
    // Delay to avoid rate limiting
    await new Promise(r => setTimeout(r, 2000));
  }

  fs.writeFileSync('image_results.json', JSON.stringify(results, null, 2));
  console.log('Done! Results saved to image_results.json');
}

main();

const { chromium } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  try {
    console.log('Navigating to DuckDuckGo Images...');
    await page.goto('https://duckduckgo.com/?q=NAF+Conference+Centre+%26+Suites+Abuja+exterior+building&iax=images&ia=images');
    
    // Wait for image results to load
    await page.waitForSelector('.tile--img__img', { timeout: 10000 });
    
    // Get the first few image URLs
    const imageUrls = await page.evaluate(() => {
      const images = document.querySelectorAll('.tile--img__img');
      return Array.from(images).map(img => {
        const src = img.getAttribute('src');
        if (src && src.startsWith('//external-content.duckduckgo.com/iu/?u=')) {
           return decodeURIComponent(src.split('u=')[1].split('&')[0]);
        }
        return src;
      }).filter(src => src && !src.includes('unsplash') && !src.includes('pixabay'));
    });
    
    console.log('Top 5 exterior images:');
    console.log(imageUrls.slice(0, 5).join('\n'));

  } catch (err) {
    console.error('Error during scraping:', err);
  } finally {
    await browser.close();
  }
})();

const fs = require('fs');

const content = fs.readFileSync('C:\\Users\\emmanuel\\.gemini\\antigravity\\brain\\b8239a03-039b-47b5-92e3-de4116ae96d0\\.system_generated\\steps\\1122\\content.md', 'utf8');

const regex = /https?:\/\/[^\s"'>]+?\.(?:jpg|jpeg)(?!\w)/gi;
const matches = content.match(regex);

if (matches) {
  const uniqueUrls = [...new Set(matches)].filter(m => !m.includes('unsplash') && !m.includes('pixabay') && !m.includes('avatar'));
  console.log('Found Agoda Images:');
  console.log(uniqueUrls.slice(0, 15).join('\n'));
} else {
  console.log('No JPG images found.');
}

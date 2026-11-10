const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Update chapter count in sidebar
if (html.includes('Arithmetic (23 Chapters)')) {
  html = html.replace('Arithmetic (23 Chapters)', 'Arithmetic (24 Chapters)');
  console.log('Updated index.html sidebar to Arithmetic (24 Chapters)');
}

fs.writeFileSync('index.html', html, 'utf8');
console.log('index.html updated successfully.');

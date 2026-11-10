const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');
const ts = Date.now();
html = html.replace(/modern\.css\?v=\d+/, 'modern.css?v=' + ts);
html = html.replace(/app\.js\?v=\d+/, 'app.js?v=' + ts);
fs.writeFileSync('index.html', html, 'utf8');
console.log('Cache busters updated:', ts);

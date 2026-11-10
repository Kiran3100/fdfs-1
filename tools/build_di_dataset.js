// Builder script for DI SVG diagrams and DI question dataset
const fs = require('fs');
const path = require('path');

const imgDir = path.join(__dirname, '..', 'images', 'questions', 'di');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

console.log("Image dir ready:", imgDir);

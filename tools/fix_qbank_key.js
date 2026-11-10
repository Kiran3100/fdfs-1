const fs = require('fs');
const filePath = 'data/arithmetic/data-interpretation-1.js';
let content = fs.readFileSync(filePath, 'utf8');

const target = 'window.QBANK["data-interpretation-1"] =';
const replacement = 'window.QBANK["di-1"] = window.QBANK["data-interpretation-1"] =';

if (content.includes(target)) {
  content = content.replace(target, replacement);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log('Successfully updated QBANK keys to support both di-1 and data-interpretation-1');
} else {
  console.log('Target not found in file');
}

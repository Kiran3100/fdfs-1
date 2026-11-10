const fs = require('fs');
const path = 'js/app.js';
let appJs = fs.readFileSync(path, 'utf8');

// Find PATTERN 0 block and replace just the regex + logic
const oldRegex = `const diMatch = str.match(/^(?:\\\\*\\\\*)?Direction(?:\\\\(([^)]+)\\\\))?:?(?:\\\\*\\\\*)?\\\\s*([\\\\s\\\\S]*?)(?:\\\\n\\\\n|\\\\r\\\\n\\\\r\\\\n)(?:\\\\*\\\\*\\\\[(Set\\\\s+[ABCD]\\\\s*-\\\\s*[^\\\\]]+)\\\\]\\\\*\\\\*\\\\s*(\\\\(\\\\d+\\\\)\\\\s*)?)?([\\\\s\\\\S]*)$/i);
    if (diMatch) {
      const dirFull   = diMatch[2] ? diMatch[2].trim() : '';   // the direction text
      const setLabel  = diMatch[3] ? diMatch[3].trim() : '';   // "Set A - QA-1"
      const qPosTag   = diMatch[5] ? diMatch[5].trim() : '';   // "(1)"
      const qText     = diMatch[6] ? diMatch[6].trim() : '';   // actual question`;

// If old regex present exactly, replace
const checkIdx = appJs.indexOf('const diMatch = str.match');
if (checkIdx === -1) {
  console.log('diMatch not found!');
  process.exit(1);
}

// Replace just the regex + parsing section to use the confirmed working regex
const oldBlock = appJs.slice(checkIdx, checkIdx + 1500);
console.log('Old block first 300:', oldBlock.slice(0, 300));

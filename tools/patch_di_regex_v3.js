const fs = require('fs');
const appJsPath = 'js/app.js';
let appJs = fs.readFileSync(appJsPath, 'utf8');

// Find the diMatch line and replace with a combined regex that handles both:
// 1. With image: Direction(x-y):\n\n[IMAGE:...]\n\n**[Set...]** (pos) question
// 2. Without image (caselet): Direction(x-y):\n\n**[Set...]** (pos) question

const oldRegex = `const diMatch = str.match(/^(?:\\*\\*)?Direction\\(([^)]+)\\):(?:\\*\\*)?\\s*([\\s\\S]*?)(?:\\n\\n|\\r\\n\\r\\n)(?:\\[IMAGE:[^\\]]+\\]\\n\\n)\\*\\*\\[([^\\]]+)\\]\\*\\*\\s*(\\(\\d+\\))\\s+([\\s\\S]*)$/i);`;

const newRegex = `const diMatch = str.match(/^(?:\\*\\*)?Direction\\(([^)]+)\\):(?:\\*\\*)?\\s*([\\s\\S]*?)(?:\\n\\n|\\r\\n\\r\\n)(?:\\[IMAGE:[^\\]]+\\]\\n\\n)?\\*\\*\\[([^\\]]+)\\]\\*\\*\\s*(\\(\\d+\\))\\s+([\\s\\S]*)$/i);`;

if (appJs.includes(oldRegex)) {
  appJs = appJs.replace(oldRegex, newRegex);
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log('SUCCESS: Updated diMatch regex to handle both with-image and caselet questions');
} else {
  console.log('FAIL: Old regex not found');
  const idx = appJs.indexOf('const diMatch = str.match');
  if (idx > -1) console.log(JSON.stringify(appJs.slice(idx, idx + 150)));
}

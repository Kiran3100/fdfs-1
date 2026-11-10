const fs = require('fs');
const appJsPath = 'js/app.js';
let appJs = fs.readFileSync(appJsPath, 'utf8');

const target = `'problems-on-numbers-1': { raw: 140, main: 35 },`;
const replacement = `'problems-on-numbers-1': { raw: 140, main: 35 },\n    'di-1': { raw: 540, main: 135 },`;

if (appJs.includes(target) && !appJs.includes("'di-1':")) {
  appJs = appJs.replace(target, replacement);
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log('Successfully registered di-1 in KNOWN_GROUPED_TESTS');
} else {
  console.log('Already registered or target not found');
}

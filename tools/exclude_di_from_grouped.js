const fs = require('fs');
const appJsPath = 'js/app.js';
let appJs = fs.readFileSync(appJsPath, 'utf8');

const target = 'const isGroupedTest = S.o?.isGrouped || S.qs.some(item => /\\([A-Za-z]\\)/.test(item.n));';
const replacement = 'const isGroupedTest = (S.o?.isGrouped || S.qs.some(item => /\\([A-Za-z]\\)/.test(item.n))) && S.t.id !== "di-1";';

if (appJs.includes(target)) {
  appJs = appJs.replace(target, replacement);
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log('Successfully updated isGroupedTest to exclude di-1');
} else {
  console.log('Target not found');
}

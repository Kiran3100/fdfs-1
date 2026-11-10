const fs = require('fs');
const appJsPath = 'js/app.js';
let appJs = fs.readFileSync(appJsPath, 'utf8');

const target = '    // ── PATTERN 1: Combinations';

const diHandler = `    // ── PATTERN 0: Data Interpretation (PDF Faithful Structured Layout) ──
    const diMatch = str.match(/^(?:\\*\\*)?Direction(?::|\\s*\\([^)]+\\):?)?(?:\\*\\*)?\\s*([\\s\\S]*?)(?:\\n\\n|\\r\\n\\r\\n)(?:\\*\\*\\[(Set\\s+[ABCD]\\s*-\\s*[^\\]]+)\\]\\*\\*\\s*)?([\\s\\S]*)$/i);
    if (diMatch) {
      const dirFull = diMatch[1].trim();
      const setTag = diMatch[2] ? diMatch[2].trim() : (labelPrefix || '');
      const qText = diMatch[3].trim();

      const dirParts = dirFull.split(/(?:\\r?\\n)+/);
      const dirTitle = dirParts[0].trim();
      const dirBody = dirParts.slice(1).join('\\n').trim();

      return \`
        <div class="di-container">
          <div class="di-direction-box">
            <div class="di-direction-header"><strong>Direction:</strong> \${esc(dirTitle)}</div>
            \${dirBody ? \`<div class="di-direction-desc">\${esc(dirBody)}</div>\` : ''}
          </div>
          \${imageHTML ? \`<div class="di-diagram-wrapper">\${imageHTML}</div>\` : ''}
          <div class="di-question-box">
            \${setTag ? \`<div class="di-question-tag">\${esc(setTag)}</div>\` : ''}
            <div class="di-question-text">\${esc(qText)}</div>
          </div>
        </div>\`;
    }

    ` + target;

if (appJs.includes(target)) {
  appJs = appJs.replace(target, diHandler);
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log('Successfully inserted DI layout renderer into js/app.js');
} else {
  console.log('Target string not found in js/app.js');
}

const fs = require('fs');
const appJsPath = 'js/app.js';
let appJs = fs.readFileSync(appJsPath, 'utf8');

// The old PATTERN 0 to replace (uses bad regex)
const oldBlock = `const diMatch = str.match(/^(?:\\*\\*)?Direction(?:\\(([^)]+)\\))?:?(?:\\*\\*)?\\s*([\\s\\S]*?)(?:\\n\\n|\\r\\n\\r\\n)(?:\\*\\*\\[(Set\\s+[ABCD]\\s*-\\s*([^\\]]+))\\]\\*\\*\\s*(\\(\\d+\\)\\s*)?)?([\\s\\S]*)$/i);
    if (diMatch) {
      const dirRange  = diMatch[1] ? diMatch[1].trim() : '';   // e.g. "1-5"
      const dirFull   = diMatch[2] ? diMatch[2].trim() : '';   // the direction text
      const setLabel  = diMatch[3] ? diMatch[3].trim() : '';   // "Set A - QA-1"
      const qPosTag   = diMatch[5] ? diMatch[5].trim() : '';   // "(1)"
      const qText     = diMatch[6] ? diMatch[6].trim() : '';   // actual question

      // Split direction into header line and body
      const dirLines  = dirFull.split(/\\r?\\n/);
      const dirHeader = dirLines[0].trim();   // "Refer to the pie chart..."
      const dirBody   = dirLines.slice(1).join('\\n').trim(); // "Distribution of..."

      // Direction range badge
      const rangeBadge = dirRange
        ? \`<span class="di-range-badge">Direction(\${esc(dirRange)})</span> \`
        : \`<span class="di-range-badge">Direction</span> \`;

      return \`
        <div class="di-container">
          <div class="di-direction-box">
            <div class="di-direction-header">\${rangeBadge}<span class="di-dir-instruction">\${esc(dirHeader)}</span></div>
            \${dirBody ? \`<div class="di-direction-desc">\${esc(dirBody)}</div>\` : ''}
          </div>
          \${imageHTML ? \`<div class="di-diagram-wrapper">\${imageHTML}</div>\` : ''}
          <div class="di-question-box">
            \${setLabel ? \`<div class="di-question-tag">\${esc(setLabel)}</div>\` : ''}
            <div class="di-question-num">\${qPosTag ? \`<span class="di-pos-num">\${esc(qPosTag)}</span>\` : ''}</div>
            <div class="di-question-text">\${esc(qText)}</div>
          </div>
        </div>\`;
    }`;

// The correct working regex (confirmed in testing):
// **Direction(1-5):** <dir>\n\n[IMAGE: ...]\n\n**[Set A - QA-1]** (1) <question>
const newBlock = `const diMatch = str.match(/^(?:\\*\\*)?Direction\\(([^)]+)\\):(?:\\*\\*)?\\s*([\\s\\S]*?)(?:\\n\\n|\\r\\n\\r\\n)(?:\\[IMAGE:[^\\]]+\\]\\n\\n)\\*\\*\\[([^\\]]+)\\]\\*\\*\\s*(\\(\\d+\\))\\s+([\\s\\S]*)$/i);
    if (diMatch) {
      const dirRange  = diMatch[1].trim();   // e.g. "1-5"
      const dirFull   = diMatch[2].trim();   // direction text (instruction + description)
      const setLabel  = diMatch[3].trim();   // "Set A - QA-1"
      const qPosTag   = diMatch[4].trim();   // "(1)"
      const qText     = diMatch[5].trim();   // actual question text

      // Split direction into header (instruction) and body (data description)
      const dirLines  = dirFull.split(/\\r?\\n/);
      const dirHeader = dirLines[0].trim();
      const dirBody   = dirLines.slice(1).join('\\n').trim();

      // Direction(1-5): badge
      const rangeBadge = \`<span class="di-range-badge">Direction(\${esc(dirRange)}):</span> \`;

      return \`
        <div class="di-container">
          <div class="di-direction-box">
            <div class="di-direction-header">\${rangeBadge}<span class="di-dir-instruction">\${esc(dirHeader)}</span></div>
            \${dirBody ? \`<div class="di-direction-desc">\${esc(dirBody)}</div>\` : ''}
          </div>
          \${imageHTML ? \`<div class="di-diagram-wrapper">\${imageHTML}</div>\` : ''}
          <div class="di-question-box">
            <div class="di-question-meta">
              \${setLabel ? \`<span class="di-question-tag">\${esc(setLabel)}</span>\` : ''}
              <span class="di-pos-num">\${esc(qPosTag)}</span>
            </div>
            <div class="di-question-text">\${esc(qText)}</div>
          </div>
        </div>\`;
    }`;

if (appJs.includes(oldBlock)) {
  appJs = appJs.replace(oldBlock, newBlock);
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log('SUCCESS: Updated PATTERN 0 with correct regex in js/app.js');
} else {
  console.log('FAIL: Old block not found. Checking for diMatch...');
  const idx = appJs.indexOf('const diMatch = str.match');
  console.log('diMatch found at:', idx);
  if (idx > -1) {
    console.log(JSON.stringify(appJs.slice(idx, idx + 100)));
  }
}

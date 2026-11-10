const fs = require('fs');
const appJsPath = 'js/app.js';
let appJs = fs.readFileSync(appJsPath, 'utf8');

// The old PATTERN 0 block (uses esc() which escapes HTML but loses formatting)
const oldPattern = `    // ── PATTERN 0: Data Interpretation (PDF Faithful Structured Layout) ──
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
    }`;

// The new improved PATTERN 0 — matches Direction(1-5): format, parses cleanly
const newPattern = `    // ── PATTERN 0: Data Interpretation (PDF Faithful Structured Layout) ──
    // Match: **Direction(1-5):** <direction text>\\n\\n[IMAGE:...]\\n\\n**[Set X - QX-N]** (pos) <question>
    const diMatch = str.match(/^(?:\\*\\*)?Direction(?:\\(([^)]+)\\))?:?(?:\\*\\*)?\\s*([\\s\\S]*?)(?:\\n\\n|\\r\\n\\r\\n)(?:\\*\\*\\[(Set\\s+[ABCD]\\s*-\\s*([^\\]]+))\\]\\*\\*\\s*(\\(\\d+\\)\\s*)?)?([\\s\\S]*)$/i);
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

if (appJs.includes(oldPattern)) {
  appJs = appJs.replace(oldPattern, newPattern);
  fs.writeFileSync(appJsPath, appJs, 'utf8');
  console.log('SUCCESS: Updated PATTERN 0 in js/app.js');
} else {
  console.log('FAIL: Old pattern not found. Checking...');
  const checkIdx = appJs.indexOf('PATTERN 0: Data Interpretation');
  console.log('Pattern 0 idx:', checkIdx);
  if (checkIdx > -1) {
    console.log(appJs.slice(checkIdx, checkIdx + 200));
  }
}

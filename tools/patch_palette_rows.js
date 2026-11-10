const fs = require('fs');
const appJsPath = 'js/app.js';
let appJs = fs.readFileSync(appJsPath, 'utf8');

const target = `<div class="palette-grid \${isGroupedTest ? 'palette-grouped' : ''}"
              style="\${(isGroupedTest && maxSubsPerGroup > 1) ? \`grid-template-columns: repeat(\${maxSubsPerGroup}, 1fr)\` : \`grid-template-columns: repeat(5, 1fr)\`}"">
            \${S.qs.map((item, idx) => {
              // For grouped: "1(a)" -> "1A", for plain: "1" -> "1"
              const rawLabel = String(item.n || (idx + 1));
              const cleanLabel = rawLabel.replace(/\\((\\w+)\\)/g, '$1').toUpperCase();
              return \`
                <button class="palette-btn \${idx === S.cur ? 'current' : ''} \${item.sel != null ? 'answered' : ''} \${item.markedForReview ? 'marked' : ''}" data-idx="\${idx}" title="Question \${esc(item.n)}">
                  \${cleanLabel}
                </button>
              \`;
            }).join('')}
          </div>`;

const replacement = `\${S.t?.id === 'di-1' ? \`
          <div class="palette-di-container">
            \${(() => {
              // Group questions by set rows (contiguous questions with same set letter A, B, C, D)
              let rows = [];
              let curRow = [];
              let curLetter = null;

              S.qs.forEach((item, idx) => {
                const m = String(item.n || '').match(/^[0-9]+([A-Za-z])/);
                const letter = m ? m[1].toUpperCase() : '';
                if (curLetter === null || curLetter === letter) {
                  curRow.push({ item, idx });
                  curLetter = letter;
                } else {
                  rows.push(curRow);
                  curRow = [{ item, idx }];
                  curLetter = letter;
                }
              });
              if (curRow.length) rows.push(curRow);

              return rows.map(row => {
                return \`
                  <div class="palette-set-row" style="grid-template-columns: repeat(\${row.length}, 1fr);">
                    \${row.map(({ item, idx }) => {
                      const cleanLabel = String(item.n || (idx + 1)).replace(/\\((\\w+)\\)/g, '$1').toUpperCase();
                      return \`
                        <button class="palette-btn \${idx === S.cur ? 'current' : ''} \${item.sel != null ? 'answered' : ''} \${item.markedForReview ? 'marked' : ''}" data-idx="\${idx}" title="Question \${esc(item.n)}">
                          \${cleanLabel}
                        </button>
                      \`;
                    }).join('')}
                  </div>
                \`;
              }).join('');
            })()}
          </div>
          \` : \`
          <div class="palette-grid \${isGroupedTest ? 'palette-grouped' : ''}"
              style="\${(isGroupedTest && maxSubsPerGroup > 1) ? \`grid-template-columns: repeat(\${maxSubsPerGroup}, 1fr)\` : \`grid-template-columns: repeat(5, 1fr)\`}">
            \${S.qs.map((item, idx) => {
              const rawLabel = String(item.n || (idx + 1));
              const cleanLabel = rawLabel.replace(/\\((\\w+)\\)/g, '$1').toUpperCase();
              return \`
                <button class="palette-btn \${idx === S.cur ? 'current' : ''} \${item.sel != null ? 'answered' : ''} \${item.markedForReview ? 'marked' : ''}" data-idx="\${idx}" title="Question \${esc(item.n)}">
                  \${cleanLabel}
                </button>
              \`;
            }).join('')}
          </div>
          \`}`;

// Normalize line endings for replacement
const targetNormalized = target.replace(/\r\n/g, '\n');
const appJsNormalized = appJs.replace(/\r\n/g, '\n');

if (appJsNormalized.includes(targetNormalized)) {
  const newAppJs = appJsNormalized.replace(targetNormalized, replacement);
  fs.writeFileSync(appJsPath, newAppJs, 'utf8');
  console.log('SUCCESS: Injected row-by-row palette layout for di-1!');
} else {
  console.log('FAIL: Target normalized not found in app.js');
}

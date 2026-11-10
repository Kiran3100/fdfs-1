const fs = require('fs');
const appJsPath = 'js/app.js';
let appJs = fs.readFileSync(appJsPath, 'utf8');

// 1. Add 'di-1': { raw: 540, main: 135 } to KNOWN_GROUPED_TESTS
const target1 = `'problems-on-numbers-1': { raw: 140, main: 35 },`;
const repl1 = `'problems-on-numbers-1': { raw: 140, main: 35 },\n    'di-1': { raw: 540, main: 135 },`;

if (appJs.includes(target1) && !appJs.includes("'di-1':")) {
  appJs = appJs.replace(target1, repl1);
  console.log('1. Added di-1 to KNOWN_GROUPED_TESTS');
}

// 2. Add "Only Part A & B" pill to subpart-pill-group
const target2 = `<label class="subpart-pill" title="Test only sub-part B in sequential order (1st question, 2nd question...)">
                      <input type="radio" name="subpart_mode_\${esc(t.id)}" value="B">
                      <span class="pill-btn">Only Part B</span>
                    </label>`;

const repl2 = target2 + `\n                    <label class="subpart-pill" title="Test only Part A and Part B (2 variations per question)">
                      <input type="radio" name="subpart_mode_\${esc(t.id)}" value="AB">
                      <span class="pill-btn">Only Part A &amp; B</span>
                    </label>`;

if (appJs.includes(target2) && !appJs.includes('value="AB"')) {
  appJs = appJs.replace(target2, repl2);
  console.log('2. Added Only Part A & B pill');
}

// 3. Update updateFormSummary to handle subMode === 'AB'
const target3 = `} else if (subMode === 'A' || subMode === 'B' || subMode === 'C' || subMode === 'D') {`;
const repl3 = `} else if (subMode === 'AB') {
          totalSelected = qCount * 2;
          infoText = \`Testing Part A & Part B only: Question \${fromVal} to \${toVal} (Total: \${totalSelected} Questions).\`;
          if (fromHint) fromHint.textContent = \`Question \${fromVal} (Parts A & B)\`;
          if (toHint) toHint.textContent = \`Question \${toVal} (Parts A & B)\`;
        } else if (subMode === 'A' || subMode === 'B' || subMode === 'C' || subMode === 'D') {`;

if (appJs.includes(target3) && !appJs.includes("subMode === 'AB'")) {
  appJs = appJs.replace(target3, repl3);
  console.log('3. Added subMode === AB to updateFormSummary');
}

// 4. Update startTest filtering for subMode === 'AB'
const target4 = `if (subMode === 'A' || subMode === 'B' || subMode === 'C' || subMode === 'D') {
          qs = qs.filter(q => q.subPart === subMode);`;

const repl4 = `if (subMode === 'AB') {
          qs = qs.filter(q => q.subPart === 'A' || q.subPart === 'B');
        } else if (subMode === 'A' || subMode === 'B' || subMode === 'C' || subMode === 'D') {
          qs = qs.filter(q => q.subPart === subMode);`;

if (appJs.includes(target4) && !appJs.includes("subMode === 'AB'")) {
  appJs = appJs.replace(target4, repl4);
  console.log('4. Added subMode === AB filter in startTest');
}

// 5. Update startTest mapping of subPart to support 1A as well as 1(A)
const target5 = `const m = String(q.n || '').match(/^(\\d+)(?:\\(([A-Za-z])\\))?/);
        if (m) {
          groupNum = parseInt(m[1], 10);
          subPart = (m[2] || '').toUpperCase();
          displayN = q.n;
        }`;

const repl5 = `const m = String(q.n || '').match(/^(\\d+)(?:\\(([A-Za-z])\\)|([A-Za-z]))/);
        if (m) {
          groupNum = parseInt(m[1], 10);
          subPart = (m[2] || m[3] || '').toUpperCase();
          displayN = q.n;
        }`;

if (appJs.includes(target5)) {
  appJs = appJs.replace(target5, repl5);
  console.log('5. Enhanced subPart regex parser for 1A and 1(A)');
}

// 6. Update history label for subMode === 'AB'
const target6 = `if (sMode === 'jumbled') {`;
const repl6 = `if (sMode === 'AB') {
            return \`Q \${startParsed.main}&ndash;\${endParsed.main} (Parts A & B)\`;
          }
          if (sMode === 'jumbled') {`;

if (appJs.includes(target6) && !appJs.includes("sMode === 'AB'")) {
  appJs = appJs.replace(target6, repl6);
  console.log('6. Added Parts A & B to attempt history formatting');
}

fs.writeFileSync(appJsPath, appJs, 'utf8');
console.log('Done patching app.js for Sub-part Selection Knowledge Test Mode!');

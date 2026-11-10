const fs = require('fs');
const path = require('path');

// Sections 1 to 10
const sec1to10 = [
  require('./di_data_sec1.js'),
  require('./di_data_sec2.js'),
  require('./di_data_sec3.js'),
  require('./di_data_sec4.js'),
  require('./di_data_sec5.js'),
  require('./di_data_sec6.js'),
  require('./di_data_sec7.js'),
  require('./di_data_sec8.js'),
  require('./di_data_sec9.js'),
  require('./di_data_sec10.js')
];

// Sections 11 to 15
const s11_15 = require('./di_data_sec11_15.js');
const sec11to15 = [
  s11_15.sec11,
  s11_15.sec12,
  s11_15.sec13,
  s11_15.sec14,
  s11_15.sec15
];

// Sections 16 to 20
const s16_20 = require('./di_data_sec16_20.js');
const sec16to20 = [
  s16_20.sec16,
  s16_20.sec17,
  s16_20.sec18,
  s16_20.sec19,
  s16_20.sec20
];

// Sections 21 to 25 (Caselets)
const s21_25 = require('./di_data_sec21_25.js');
const sec21to25 = [
  s21_25.sec21,
  s21_25.sec22,
  s21_25.sec23,
  s21_25.sec24,
  s21_25.sec25
];

const allSections = [
  ...sec1to10,
  ...sec11to15,
  ...sec16to20,
  ...sec21to25
];

const sets = [
  { key: 'setA', letter: 'A', name: 'Set A' },
  { key: 'setB', letter: 'B', name: 'Set B' },
  { key: 'setC', letter: 'C', name: 'Set C' },
  { key: 'setD', letter: 'D', name: 'Set D' }
];

const allQuestions = [];

allSections.forEach((sec, secIdx) => {
  const numQuestionsInSec = sec.setA.questions.length;

  for (let qIdx = 0; qIdx < numQuestionsInSec; qIdx++) {
    sets.forEach(({ key, letter, name }) => {
      const setObj = sec[key];
      if (!setObj || !setObj.questions) return;
      const qObj = setObj.questions[qIdx];
      if (!qObj) return;

      const rawNum = qObj.rawNum || '';
      const numMatch = rawNum.match(/\d+/);
      const questionNum = numMatch ? numMatch[0] : (qIdx + 1);

      // Grouped label matching bank standard: "1(A)", "1(B)", etc.
      const groupedLabel = `${questionNum}(${letter})`;

      // Direction range for this section e.g. 1-5, 6-10, 11-16
      const qNums = setObj.questions.map(q => parseInt((q.rawNum || '').match(/\d+/)[0]));
      const qFirst = qNums[0];
      const qLast = qNums[qNums.length - 1];
      const dirRange = `${qFirst}-${qLast}`;

      const svgImgTag = setObj.svgFile ? `[IMAGE: ${setObj.svgFile}]\n\n` : '';
      const dirPrefixWithRange = setObj.direction
        ? `**Direction(${dirRange}):** ${setObj.direction}\n\n`
        : '';

      const posInGroup = qIdx + 1;
      const formattedQuestion = `${dirPrefixWithRange}${svgImgTag}**[${name} - Q${rawNum}]** (${posInGroup}) ${qObj.q}`;

      allQuestions.push({
        n: groupedLabel,
        q: formattedQuestion,
        o: qObj.o,
        a: qObj.a,
        sol: qObj.sol || `Answer: Option (${String.fromCharCode(65 + qObj.a)})`
      });
    });
  }
});

console.log(`Total questions compiled in grouped order: ${allQuestions.length}`);
console.log('First 8 questions labels:', allQuestions.slice(0, 8).map(q => q.n));
console.log('Last 8 questions labels:', allQuestions.slice(-8).map(q => q.n));

const outDir = path.join(__dirname, '..', 'data', 'arithmetic');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const outFile = path.join(outDir, 'data-interpretation-1.js');
const jsContent = `// BankPrep Pro - Data Interpretation Practice Test 1\n` +
  `// Generated strictly from 22.Data_Analysis_Sets_A-B-C-D_Combined.pdf\n` +
  `// Arranged in natural grouped order: 1(A), 1(B), 1(C), 1(D), 2(A)... 135(D)\n` +
  `// Total questions: ${allQuestions.length}\n` +
  `window.QBANK = window.QBANK || {};\n` +
  `window.QBANK["di-1"] = window.QBANK["data-interpretation-1"] = ${JSON.stringify(allQuestions, null, 2)};\n`;

fs.writeFileSync(outFile, jsContent, 'utf8');
console.log(`Saved bundle to: ${outFile} (${(jsContent.length / 1024).toFixed(1)} KB)`);

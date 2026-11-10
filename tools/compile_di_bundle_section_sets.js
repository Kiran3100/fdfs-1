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

// Order by Section, then within each section Set A, then Set B, then Set C, then Set D:
// 1A, 2A, 3A, 4A, 5A -> 1B, 2B, 3B, 4B, 5B -> 1C... -> 1D...
// 6A, 7A, 8A, 9A, 10A -> 6B, 7B, 8B, 9B, 10B -> 6C... -> 6D...
allSections.forEach((sec) => {
  sets.forEach(({ key, letter, name }) => {
    const setObj = sec[key];
    if (!setObj || !setObj.questions) return;

    const qNums = setObj.questions.map(q => parseInt((q.rawNum || '').match(/\d+/)[0]));
    const qFirst = qNums[0];
    const qLast = qNums[qNums.length - 1];
    const dirRange = `${qFirst}-${qLast}`;

    const svgImgTag = setObj.svgFile ? `[IMAGE: ${setObj.svgFile}]\n\n` : '';
    const dirPrefixWithRange = setObj.direction
      ? `**Direction(${dirRange}):** ${setObj.direction}\n\n`
      : '';

    setObj.questions.forEach((qObj, qIdx) => {
      const rawNum = qObj.rawNum || '';
      const numMatch = rawNum.match(/\d+/);
      const questionNum = numMatch ? numMatch[0] : (qIdx + 1);

      // Label: "1A", "2A", "3A" etc.
      const label = `${questionNum}${letter}`;

      const posInGroup = qIdx + 1;
      const formattedQuestion = `${dirPrefixWithRange}${svgImgTag}**[${name} - Q${rawNum}]** (${posInGroup}) ${qObj.q}`;

      allQuestions.push({
        n: label,
        q: formattedQuestion,
        o: qObj.o,
        a: qObj.a,
        sol: qObj.sol || `Answer: Option (${String.fromCharCode(65 + qObj.a)})`
      });
    });
  });
});

console.log(`Total questions compiled in section-set order: ${allQuestions.length}`);
console.log('First 20 labels:');
console.log(allQuestions.slice(0, 20).map(q => q.n).join(', '));
console.log('Next 20 labels:');
console.log(allQuestions.slice(20, 40).map(q => q.n).join(', '));

const outDir = path.join(__dirname, '..', 'data', 'arithmetic');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const outFile = path.join(outDir, 'data-interpretation-1.js');
const jsContent = `// BankPrep Pro - Data Interpretation Practice Test 1\n` +
  `// Generated strictly from 22.Data_Analysis_Sets_A-B-C-D_Combined.pdf\n` +
  `// Section-by-section Set sequence: 1A-5A -> 1B-5B -> 1C-5C -> 1D-5D, then 6A-10A...\n` +
  `// Total questions: ${allQuestions.length}\n` +
  `window.QBANK = window.QBANK || {};\n` +
  `window.QBANK["di-1"] = window.QBANK["data-interpretation-1"] = ${JSON.stringify(allQuestions, null, 2)};\n`;

fs.writeFileSync(outFile, jsContent, 'utf8');
console.log(`Saved bundle to: ${outFile} (${(jsContent.length / 1024).toFixed(1)} KB)`);

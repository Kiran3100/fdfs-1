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
  { key: 'setA', name: 'Set A' },
  { key: 'setB', name: 'Set B' },
  { key: 'setC', name: 'Set C' },
  { key: 'setD', name: 'Set D' }
];

const allQuestions = [];
const setCountMap = { setA: 0, setB: 0, setC: 0, setD: 0 };

sets.forEach(({ key, name }) => {
  allSections.forEach(sec => {
    const setObj = sec[key];
    if (!setObj || !setObj.questions) return;

    const svgImgTag = setObj.svgFile ? `[IMAGE: ${setObj.svgFile}]\n\n` : '';

    // Build direction range label e.g. "Direction(1-5):"
    const qNums = setObj.questions.map(qObj => parseInt((qObj.rawNum || qObj.n).match(/\d+/)[0]));
    const qFirst = qNums[0];
    const qLast  = qNums[qNums.length - 1];
    const dirRange = `${qFirst}-${qLast}`;

    setObj.questions.forEach((qObj, qIdx) => {
      setCountMap[key]++;
      const qNum = qObj.rawNum || qObj.n;
      // Extract just the numeric position within this direction group (1, 2, 3...)
      const posInGroup = qIdx + 1;

      // Direction prefix with range: Direction(1-5):
      const dirPrefixWithRange = setObj.direction
        ? `**Direction(${dirRange}):** ${setObj.direction}\n\n`
        : '';

      const formattedQuestion = `${dirPrefixWithRange}${svgImgTag}**[${name} - Q${qNum}]** (${posInGroup}) ${qObj.q}`;

      allQuestions.push({
        n: qNum,
        q: formattedQuestion,
        o: qObj.o,
        a: qObj.a,
        sol: qObj.sol || `Answer: Option (${String.fromCharCode(65 + qObj.a)})`
      });
    });
  });
});

console.log('Question breakdown by set:');
Object.entries(setCountMap).forEach(([k, cnt]) => console.log(`  ${k}: ${cnt} questions`));
console.log(`Total questions compiled: ${allQuestions.length}`);

const outDir = path.join(__dirname, '..', 'data', 'arithmetic');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const outFile = path.join(outDir, 'data-interpretation-1.js');
const jsContent = `// BankPrep Pro - Data Interpretation Practice Test 1\n` +
  `// Generated strictly from 22.Data_Analysis_Sets_A-B-C-D_Combined.pdf\n` +
  `// Total questions: ${allQuestions.length} (Set A: ${setCountMap.setA}, Set B: ${setCountMap.setB}, Set C: ${setCountMap.setC}, Set D: ${setCountMap.setD})\n` +
  `window.QBANK = window.QBANK || {};\n` +
  `window.QBANK["di-1"] = window.QBANK["data-interpretation-1"] = ${JSON.stringify(allQuestions, null, 2)};\n`;

fs.writeFileSync(outFile, jsContent, 'utf8');
console.log(`Saved bundle to: ${outFile} (${(jsContent.length / 1024).toFixed(1)} KB)`);

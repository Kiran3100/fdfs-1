const fs = require('fs');
let s = fs.readFileSync('data/config.js', 'utf8');

const targetTopic = "{ id: 'probability', num: 23, name: 'Probability', category: 'Modern Math', filePdf: '23.probability.pdf' }";
const newTopic = targetTopic + ",\n        { id: 'data-interpretation', num: 24, name: 'Data Interpretation', category: 'DI & Analytics', filePdf: '22.Data_Analysis_Sets_A-B-C-D_Combined.pdf' }";

if (!s.includes("'data-interpretation'")) {
  s = s.replace(targetTopic, newTopic);
  console.log('Added data-interpretation topic.');
} else {
  console.log('data-interpretation topic already present.');
}

const targetTest = "tests: [";
const newTest = `tests: [
      {
        id: 'di-1',
        topic: 'data-interpretation',
        name: 'Data Interpretation - Practice Test 1',
        source: '22.Data_Analysis_Sets_A-B-C-D_Combined.pdf',
        file: 'data/arithmetic/data-interpretation-1.js',
        count: 216,
        marking: { correct: 1, wrong: 0.25 }
      },`;

if (!s.includes("'di-1'")) {
  s = s.replace(targetTest, newTest);
  console.log('Added di-1 test.');
} else {
  console.log('di-1 test already present.');
}

fs.writeFileSync('data/config.js', s, 'utf8');
console.log('config.js successfully saved.');

const fs = require('fs');
let total = 0;
for (let i = 1; i <= 10; i++) {
  const mod = require('./di_data_sec' + i + '.js');
  ['setA', 'setB', 'setC', 'setD'].forEach(s => {
    if (mod[s] && mod[s].questions) total += mod[s].questions.length;
  });
}
console.log('Sections 1 to 10 total questions:', total);

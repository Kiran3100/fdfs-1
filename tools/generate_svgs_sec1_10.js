const fs = require('fs');
const path = require('path');
const gen = require('./svg_generators.js');

const rootDir = path.join(__dirname, '..');

console.log('Generating vector SVGs for Sections 1 to 10...');

function saveSvg(relPath, svg) {
  const fullPath = path.join(rootDir, relPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, svg, 'utf8');
}

// Sec 1: Single Pie
const s1 = require('./di_data_sec1.js');
['setA', 'setB', 'setC', 'setD'].forEach(k => {
  const c = s1[k].chart;
  const svg = gen.generatePieChartSvg(c.title, c.subtitle, c.totalText, c.slices);
  saveSvg(s1[k].svgFile, svg);
});

// Sec 2: Double Pie (signature: title, chart1, chart2)
const s2 = require('./di_data_sec2.js');
['setA', 'setB', 'setC', 'setD'].forEach(k => {
  const c = s2[k].chart;
  const svg = gen.generateDoublePieSvg(c.title, c.chart1, c.chart2);
  saveSvg(s2[k].svgFile, svg);
});

// Sec 3: Pie + Table (signature: title, pieChart, table)
const s3 = require('./di_data_sec3.js');
['setA', 'setB', 'setC', 'setD'].forEach(k => {
  const c = s3[k].chart;
  const svg = gen.generatePieAndTableSvg(c.title, c.pieChart, c.table);
  saveSvg(s3[k].svgFile, svg);
});

// Sec 4: Degree Pie
const s4 = require('./di_data_sec4.js');
['setA', 'setB', 'setC', 'setD'].forEach(k => {
  const c = s4[k].chart;
  const svg = gen.generatePieChartSvg(c.title, c.subtitle, c.totalText, c.slices);
  saveSvg(s4[k].svgFile, svg);
});

// Sec 5: Total Employees Pie + Male count Table
const s5 = require('./di_data_sec5.js');
['setA', 'setB', 'setC', 'setD'].forEach(k => {
  const c = s5[k].chart;
  const svg = gen.generatePieAndTableSvg(c.title, c.pieChart, c.table);
  saveSvg(s5[k].svgFile, svg);
});

// Sec 6: 5-Year Jackets Table
const s6 = require('./di_data_sec6.js');
['setA', 'setB', 'setC', 'setD'].forEach(k => {
  const c = s6[k].chart;
  const svg = gen.generateTableSvg(c.title, c.headers, c.rows);
  saveSvg(s6[k].svgFile, svg);
});

// Sec 7: Missing Values Wallets / Jerkins Table
const s7 = require('./di_data_sec7.js');
['setA', 'setB', 'setC', 'setD'].forEach(k => {
  const c = s7[k].chart;
  const svg = gen.generateTableSvg(c.title, c.headers, c.rows);
  saveSvg(s7[k].svgFile, svg);
});

// Sec 8: Missing Discounts Table
const s8 = require('./di_data_sec8.js');
['setA', 'setB', 'setC', 'setD'].forEach(k => {
  const c = s8[k].chart;
  const svg = gen.generateTableSvg(c.title, c.headers, c.rows);
  saveSvg(s8[k].svgFile, svg);
});

// Sec 9: Books Pages Read Table
const s9 = require('./di_data_sec9.js');
['setA', 'setB', 'setC', 'setD'].forEach(k => {
  const c = s9[k].chart;
  const svg = gen.generateTableSvg(c.title, c.headers, c.rows);
  saveSvg(s9[k].svgFile, svg);
});

// Sec 10: Organizations Promoted Table
const s10 = require('./di_data_sec10.js');
['setA', 'setB', 'setC', 'setD'].forEach(k => {
  const c = s10[k].chart;
  const svg = gen.generateTableSvg(c.title, c.headers, c.rows);
  saveSvg(s10[k].svgFile, svg);
});

const imgDir = path.join(rootDir, 'images', 'questions', 'di');
const generated = fs.readdirSync(imgDir).filter(f => f.endsWith('.svg'));
console.log(`Successfully generated ${generated.length} vector SVG diagrams in images/questions/di!`);

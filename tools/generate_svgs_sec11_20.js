const fs = require('fs');
const path = require('path');
const gen = require('./svg_generators.js');

const rootDir = path.join(__dirname, '..');

console.log('Generating vector SVGs for Sections 11 to 20...');

function saveSvg(relPath, svg) {
  const fullPath = path.join(rootDir, relPath);
  const dir = path.dirname(fullPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(fullPath, svg, 'utf8');
}

const sec11_15 = require('./di_data_sec11_15.js');
const sec16_20 = require('./di_data_sec16_20.js');
const sets = ['setA', 'setB', 'setC', 'setD'];

// Sec 11 - Grouped Bar (Cinema Halls)
sets.forEach(k => {
  const c = sec11_15.sec11[k].chart;
  const svg = gen.generateGroupedBarSvg(c.title, c.subtitle, c.categories, c.series1, c.series2, c.maxY);
  saveSvg(sec11_15.sec11[k].svgFile, svg);
});

// Sec 12 - Grouped Bar (Import Export)
sets.forEach(k => {
  const c = sec11_15.sec12[k].chart;
  const svg = gen.generateGroupedBarSvg(c.title, c.subtitle, c.categories, c.series1, c.series2, c.maxY);
  saveSvg(sec11_15.sec12[k].svgFile, svg);
});

// Sec 13 - Grouped Bar (Colleges)
sets.forEach(k => {
  const c = sec11_15.sec13[k].chart;
  const svg = gen.generateGroupedBarSvg(c.title, c.subtitle, c.categories, c.series1, c.series2, c.maxY);
  saveSvg(sec11_15.sec13[k].svgFile, svg);
});

// Sec 14 - Grouped Bar (Applications)
sets.forEach(k => {
  const c = sec11_15.sec14[k].chart;
  const svg = gen.generateGroupedBarSvg(c.title, c.subtitle, c.categories, c.series1, c.series2, c.maxY);
  saveSvg(sec11_15.sec14[k].svgFile, svg);
});

// Sec 15 - Table (Classroom Weights)
sets.forEach(k => {
  const c = sec11_15.sec15[k].chart;
  const svg = gen.generateTableSvg(c.title, c.headers, c.rows);
  saveSvg(sec11_15.sec15[k].svgFile, svg);
});

// Sec 16 - Line Chart (Notebooks)
sets.forEach(k => {
  const c = sec16_20.sec16[k].chart;
  const svg = gen.generateLineChartSvg(c.title, c.subtitle, c.xLabels, c.series1, c.series2, c.maxY);
  saveSvg(sec16_20.sec16[k].svgFile, svg);
});

// Sec 17 - Line Chart (MRP / Discount)
sets.forEach(k => {
  const c = sec16_20.sec17[k].chart;
  const svg = gen.generateLineChartSvg(c.title, c.subtitle, c.xLabels, c.series1, c.series2, c.maxY);
  saveSvg(sec16_20.sec17[k].svgFile, svg);
});

// Sec 18 - Line Chart (Exhibitions)
sets.forEach(k => {
  const c = sec16_20.sec18[k].chart;
  const svg = gen.generateLineChartSvg(c.title, c.subtitle, c.xLabels, c.series1, c.series2, c.maxY);
  saveSvg(sec16_20.sec18[k].svgFile, svg);
});

// Sec 19 - Line Chart (Translations)
sets.forEach(k => {
  const c = sec16_20.sec19[k].chart;
  const svg = gen.generateLineChartSvg(c.title, c.subtitle, c.xLabels, c.series1, c.series2, c.maxY);
  saveSvg(sec16_20.sec19[k].svgFile, svg);
});

// Sec 20 - Line Chart (Profit %)
sets.forEach(k => {
  const c = sec16_20.sec20[k].chart;
  const svg = gen.generateLineChartSvg(c.title, c.subtitle, c.xLabels, c.series1, c.series2, c.maxY);
  saveSvg(sec16_20.sec20[k].svgFile, svg);
});

const imgDir = path.join(rootDir, 'images', 'questions', 'di');
const allSvgs = fs.readdirSync(imgDir).filter(f => f.endsWith('.svg'));
console.log(`Generated SVGs successfully! Total SVG diagrams now: ${allSvgs.length}`);

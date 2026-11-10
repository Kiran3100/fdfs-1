// Comprehensive Data Interpretation Generator for 144 Questions
// Generates SVG diagrams and outputs data/arithmetic/data-interpretation-1.js
const fs = require('fs');
const path = require('path');
const {
  generatePieChartSvg,
  generateDoublePieSvg,
  generatePieAndTableSvg,
  generateTableSvg,
  generateGroupedBarSvg,
  generateLineChartSvg
} = require('./svg_generators.js');

const imgDir = path.join(__dirname, '..', 'images', 'questions', 'di');
if (!fs.existsSync(imgDir)) {
  fs.mkdirSync(imgDir, { recursive: true });
}

console.log("Preparing DI datasets...");

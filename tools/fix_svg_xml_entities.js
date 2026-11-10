const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'images', 'questions', 'di');
const files = fs.readdirSync(dir);

let fixedCount = 0;

files.forEach(f => {
  if (!f.endsWith('.svg')) return;
  const filePath = path.join(dir, f);
  let content = fs.readFileSync(filePath, 'utf8');

  // Replace any unescaped & with &amp;
  const regex = /&(?!amp;|lt;|gt;|quot;|apos;|#\d+;)/g;
  if (regex.test(content)) {
    content = content.replace(regex, '&amp;');
    fs.writeFileSync(filePath, content, 'utf8');
    fixedCount++;
  }
});

console.log(`Successfully fixed XML entities in ${fixedCount} SVG files!`);

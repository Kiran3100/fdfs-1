import json, re

with open('data/reasoning/machine-input-output-1.js', 'r', encoding='utf-8') as f:
    txt = f.read()

prefix = 'QBANK["machine-input-output-1"] = '
idx = txt.find(prefix)
arr = json.loads(txt[idx + len(prefix):].rstrip(';\n '))

dirs = []
for q in arr:
    m = re.search(r'Direction\s*\(([^\)]+)\)', q.get('q', ''))
    if m:
        dirs.append(m.group(1))

from collections import Counter
print("Directions in machine-input-output-1:", Counter(dirs).most_common(10))

import json, re

with open('data/reasoning/machine-input-output-1.js', 'r', encoding='utf-8') as f:
    txt = f.read()

prefix = 'QBANK["machine-input-output-1"] = '
idx = txt.find(prefix)
if idx != -1:
    raw = txt[idx + len(prefix):].rstrip(';\n ')
    qs = json.loads(raw)
    print('Total qs in machine-input-output-1.js:', len(qs))
    for i in range(min(15, len(qs))):
        print(f"Index {i+1}: n={qs[i].get('n')} | q={qs[i].get('q')[:60].replace(chr(10), ' ')}")

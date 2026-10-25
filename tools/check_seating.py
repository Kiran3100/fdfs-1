import json, re

with open('data/reasoning/seating-arrangement-1.js', 'r', encoding='utf-8') as f:
    txt = f.read()

prefix = 'QBANK["seating-arrangement-1"] = '
idx = txt.find(prefix)
if idx != -1:
    raw = txt[idx + len(prefix):].rstrip(';\n ')
    qs = json.loads(raw)
    print('Total qs in seating-arrangement-1.js:', len(qs))
    for i in range(min(20, len(qs))):
        print(f"Index {i+1}: n={qs[i].get('n')} | q={qs[i].get('q')[:50].replace(chr(10), ' ')}")

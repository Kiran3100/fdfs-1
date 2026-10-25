import json, re

with open('data/reasoning/seating-arrangement-1.js', 'r', encoding='utf-8') as f:
    txt = f.read()

prefix = 'QBANK["seating-arrangement-1"] = '
arr = json.loads(txt[txt.find(prefix)+len(prefix):].rstrip(';\n '))

print(repr(arr[140]['q'][:160]))

import re

pattern = r'(?<=\S)\s+(Which\b|How\b|Find\b|What\b|If\b|In\b|Calculate\b|The\b(?!\s+following\s+arrangement))'
# Check if any question text in seating-arrangement-1 has questions starting with other words
with open('data/reasoning/seating-arrangement-1.js', 'r', encoding='utf-8') as f:
    txt = f.read()

import json
prefix = 'QBANK["seating-arrangement-1"] = '
arr = json.loads(txt[txt.find(prefix)+len(prefix):].rstrip(';\n '))

unsplit = []
for idx, q in enumerate(arr):
    s = q['q']
    # strip [N(X)]
    s = re.sub(r'^\s*\[\d+\([A-Za-z]\)\]\s*', '', s)
    dirM = re.match(r'^(Directions?\s*(?:\s*\(\d+[-–]\d+\)\s*)?:\s*.+?(?:answer the (?:following|given) questions?|following questions?|illustrated as below:?|given below\s*:?))\s*', s, re.IGNORECASE)
    if dirM:
        afterDir = s[len(dirM.group(0)):].strip()
        qSplit = re.search(r'(?<=\S)\s+(Which\b|How\b|Find\b|What\b|If\b|In\b|Calculate\b|The\b(?!\s+following\s+arrangement)|Who\b|Whom\b|Whose\b|Where\b|When\b|Why\b|Based\b|Four\b|As\b)', afterDir, re.IGNORECASE)
        if not qSplit:
            unsplit.append((idx+1, q['n'], afterDir[-100:]))

print(f"Total unsplit with new regex: {len(unsplit)}")
for item in unsplit[:10]:
    print(item)

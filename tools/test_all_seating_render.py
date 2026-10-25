import json, re

with open('data/reasoning/seating-arrangement-1.js', 'r', encoding='utf-8') as f:
    txt = f.read()

prefix = 'QBANK["seating-arrangement-1"] = '
arr = json.loads(txt[txt.find(prefix)+len(prefix):].rstrip(';\n '))

# Enhanced direction regex that matches "answer the question:" as well as plural "questions:"
dir_pattern = r'^(Directions?\s*(?:\s*\(\d+[-–]\d+\)\s*)?:\s*.+?(?:answer the (?:following|given) questions?|following questions?|illustrated as below:?|given below\s*:?|answer the questions?\s*(?:given\s+below|that\s+follow)?|answer the question\s*:?))\s*'

qSplit_pattern = r'(?<=\S)\s+(Which\b|How\b|Find\b|What\b|If\b|In\b|Calculate\b|The\b(?!\s+following\s+arrangement)|Who\b|Whom\b|Whose\b|Where\b|When\b|Why\b|Based\b|Four\b|As\b|There\b|Choose\b|Identify\b|According\b)'

failures = []
for idx, q in enumerate(arr):
    s = q['q']
    m_p = re.match(r'^\s*(\[\d+\([A-Za-z]\)\])\s*', s)
    if m_p:
        s = s[len(m_p.group(0)):].strip()
    dirM = re.match(dir_pattern, s, re.IGNORECASE)
    if dirM:
        afterDir = s[len(dirM.group(0)):].strip()
        qSplitM = re.search(qSplit_pattern, afterDir, re.IGNORECASE)
        if qSplitM:
            arrText = afterDir[:qSplitM.start()].strip()
            qText = afterDir[qSplitM.start():].strip()
            if not qText or not arrText:
                failures.append((idx+1, q['n'], "EMPTY arr or q", afterDir))
        else:
            failures.append((idx+1, q['n'], "NO SPLIT", afterDir[-80:]))
    else:
        failures.append((idx+1, q['n'], "NO DIR MATCH", s[:80]))

print(f"Failures count with enhanced regex: {len(failures)}")
for f in failures[:10]:
    print(f)

import json, re

with open('data/reasoning/seating-arrangement-1.js', 'r', encoding='utf-8') as f:
    txt = f.read()

prefix = 'QBANK["seating-arrangement-1"] = '
arr = json.loads(txt[txt.find(prefix)+len(prefix):].rstrip(';\n '))

dir_pattern = r'^(Directions?\s*(?:\s*\(\d+[-–]\d+\)\s*)?:\s*.+?(?:answer the (?:following|given) questions?|following questions?|illustrated as below:?|given below\s*:?|answer the questions?\s*(?:given\s+below|that\s+follow)?|answer the question\s*:?))\s*'

# Added "The\s+(?:only|number|one)\b"
pattern = r'(?<=[.!?])\s+(Who\b|Whom\b|Whose\b|Which\b|How\b|What\b|Where\b|When\b|Why\b|If\b|Find\b|Calculate\b|Based\b|Four\s+of\b|As\s+many\b|In\s+which\b|There\b|The\s+(?:only|number|one)\b)'

results = []
for idx, q in enumerate(arr):
    s = q['q']
    m_p = re.match(r'^\s*(\[\d+\([A-Za-z]\)\])\s*', s)
    if m_p:
        s = s[len(m_p.group(0)):].strip()
    dirM = re.match(dir_pattern, s, re.IGNORECASE)
    if not dirM:
        results.append((idx+1, q['n'], "NO DIR", s[:50]))
        continue
    afterDir = s[len(dirM.group(0)):].strip()
    
    matches = list(re.finditer(pattern, afterDir, re.IGNORECASE))
    if not matches:
        results.append((idx+1, q['n'], "NO SPLIT", afterDir[-80:]))
    else:
        last_m = matches[-1]
        arrText = afterDir[:last_m.start()].strip()
        qText = afterDir[last_m.start():].strip()
        results.append((idx+1, q['n'], "OK", f"ARR: {arrText[-40:]} | Q: {qText[:40]}"))

bad = [r for r in results if r[2] != "OK"]
print(f"Total: {len(results)}, Bad: {len(bad)}")

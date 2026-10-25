import glob, json, re

files = glob.glob('data/reasoning/*.js')

total_unsplit = 0
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        txt = fp.read()
    m = re.search(r'QBANK\["([^"]+)"\]\s*=\s*(\[[\s\S]*?\]);', txt)
    if not m: continue
    name = m.group(1)
    arr = json.loads(m.group(2))
    for idx, q in enumerate(arr):
        s = q.get('q', '')
        s = re.sub(r'^\s*\[\d+\([A-Za-z]\)\]\s*', '', s)
        dirM = re.match(r'^(Directions?\s*(?:\s*\(\d+[-–]\d+\)\s*)?:\s*.+?(?:answer the (?:following|given) questions?|following questions?|illustrated as below:?|given below\s*:?))\s*', s, re.IGNORECASE)
        if dirM:
            afterDir = s[len(dirM.group(0)):].strip()
            # test new regex
            qSplit = re.search(r'(?<=\S)\s+(Which\b|How\b|Find\b|What\b|If\b|In\b|Calculate\b|The\b(?!\s+following\s+arrangement)|Who\b|Whom\b|Whose\b|Where\b|When\b|Why\b|Based\b|Four\b|As\b|There\b|Choose\b|Identify\b|According\b)', afterDir, re.IGNORECASE)
            if not qSplit:
                total_unsplit += 1
                if total_unsplit <= 10:
                    print(f"{name} Q{idx+1}: {afterDir[:80]}... END: {afterDir[-60:]}")

print(f"Total unsplit across all reasoning files: {total_unsplit}")

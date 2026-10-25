import glob, json, re

dir_pattern = r'^(Directions?\s*(?:\s*\(\d+[-–]\d+\)\s*)?:\s*.+?(?:answer the (?:following|given) questions?|following questions?|illustrated as below:?|given below\s*:?|answer the questions?\s*(?:given\s+below|that\s+follow)?|answer the question\s*:?))\s*'
pattern = r'(?<=[.!?])\s+(Who\b|Whom\b|Whose\b|Which\b|How\b|What\b|Where\b|When\b|Why\b|If\b|Find\b|Calculate\b|Based\b|Four\s+of\b|As\s+many\b|In\s+which\b|There\b|The\s+(?:only|number|one)\b)'

for f in sorted(glob.glob('data/reasoning/*.js')):
    with open(f, 'r', encoding='utf-8') as fp:
        txt = fp.read()
    m = re.search(r'QBANK\["([^"]+)"\]\s*=\s*(\[[\s\S]*?\]);', txt)
    if not m: continue
    name = m.group(1)
    arr = json.loads(m.group(2))
    
    count_dir = 0
    count_split = 0
    for q in arr:
        s = q.get('q', '')
        s = re.sub(r'^\s*\[\d+\([A-Za-z]\)\]\s*', '', s)
        dirM = re.match(dir_pattern, s, re.IGNORECASE)
        if dirM:
            count_dir += 1
            afterDir = s[len(dirM.group(0)):].strip()
            matches = list(re.finditer(pattern, afterDir, re.IGNORECASE))
            if matches:
                count_split += 1
    if count_dir > 0:
        print(f"{name}: {count_split}/{count_dir} directions cleanly split.")

import glob, json, re

for f in sorted(glob.glob('data/reasoning/*.js')):
    with open(f, 'r', encoding='utf-8') as fp:
        txt = fp.read()
    m = re.search(r'QBANK\["([^"]+)"\]\s*=\s*(\[[\s\S]*?\]);', txt)
    if not m: continue
    name = m.group(1)
    arr = json.loads(m.group(2))
    dirs = set()
    for q in arr:
        md = re.search(r'Direction[s]?\s*\(([^\)]+)\)', q.get('q', ''))
        if md:
            dirs.add(md.group(1))
    if dirs:
        print(f"{name}: has directions: {sorted(list(dirs))[:5]}")

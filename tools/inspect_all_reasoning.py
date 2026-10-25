import json, glob, re

for f in sorted(glob.glob('data/reasoning/*.js')):
    with open(f, 'r', encoding='utf-8') as fp:
        txt = fp.read()
    m = re.search(r'QBANK\["([^"]+)"\]\s*=\s*(\[[\s\S]*?\]);', txt)
    if m:
        name = m.group(1)
        try:
            arr = json.loads(m.group(2))
            samples = [x.get('n') for x in arr[:8]]
            q_samples = [x.get('q')[:20].replace('\n', ' ') for x in arr[:4]]
            has_brackets = any(re.search(r'\[\d+\([A-D]\)\]', x.get('q', '')) for x in arr[:8])
            print(f"{name} ({len(arr)} qs): n_samples={samples} | has_brackets={has_brackets} | q_samples={q_samples}")
        except Exception as e:
            print(f"{name}: error {e}")

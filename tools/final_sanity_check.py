import glob, json, re

print("=== CHECKING REASONING DATASETS ===")
for f in sorted(glob.glob('data/reasoning/*.js')):
    with open(f, 'r', encoding='utf-8') as fp:
        txt = fp.read()
    m = re.search(r'QBANK\["([^"]+)"\]\s*=\s*(\[[\s\S]*?\]);', txt)
    if not m: continue
    name = m.group(1)
    arr = json.loads(m.group(2))
    has_sub = any(re.match(r'^\d+\([a-z]\)$', str(q.get('n', ''))) for q in arr)
    sample_n = [q.get('n') for q in arr[:5]]
    print(f"{name:30}: count={len(arr):3} | sample_n={sample_n} | format={'1a..1e (Grouped)' if has_sub else '1,2,3... (Standard)'}")

print("\n=== CHECKING ARITHMETIC DATASETS ===")
for f in sorted(glob.glob('data/arithmetic/*.js'))[:5]:
    with open(f, 'r', encoding='utf-8') as fp:
        txt = fp.read()
    m = re.search(r'QBANK\["([^"]+)"\]\s*=\s*(\[[\s\S]*?\]);', txt)
    if not m: continue
    name = m.group(1)
    arr = json.loads(m.group(2))
    has_sub = any(re.match(r'^\d+\([A-Z]\)$', str(q.get('n', ''))) for q in arr)
    sample_n = [q.get('n') for q in arr[:5]]
    print(f"{name:30}: count={len(arr):3} | sample_n={sample_n} | format={'1A..1D (Grouped)' if has_sub else '1,2,3... (Standard)'}")

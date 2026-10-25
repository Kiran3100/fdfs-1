import glob, json, re

for f in sorted(glob.glob('data/reasoning/*.js')):
    with open(f, 'r', encoding='utf-8') as fp:
        txt = fp.read()
    m = re.search(r'QBANK\["([^"]+)"\]\s*=\s*(\[[\s\S]*?\]);', txt)
    if not m: continue
    name = m.group(1)
    arr = json.loads(m.group(2))
    
    # check n formats
    sample_n = [q.get('n') for q in arr[:6]]
    has_sub = any(re.match(r'^\d+\([a-z]\)$', str(q.get('n', ''))) for q in arr)
    has_cap_sub = any(re.match(r'^\d+\([A-Z]\)$', str(q.get('n', ''))) for q in arr)
    is_plain = all(str(q.get('n', '')).isdigit() for q in arr)
    
    groups = set()
    for q in arr:
        m2 = re.match(r'^(\d+)\(', str(q.get('n', '')))
        if m2: groups.add(m2.group(1))
        
    print(f"{name:30} | Total: {len(arr):3} | Main Groups: {len(groups):2} | Sample n: {sample_n[:4]} | Format: {'1(a)..1(e)' if has_sub else ('1(A)..1(D)' if has_cap_sub else 'Plain 1,2,3')}")

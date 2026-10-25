import glob, json, re

for f in sorted(glob.glob('data/reasoning/*.js')):
    if 'seating-arrangement-1' in f:
        print("KEEPING seating-arrangement-1.js (it is 1a..1e from the new PDF)")
        continue
    with open(f, 'r', encoding='utf-8') as fp:
        txt = fp.read()
    m = re.search(r'QBANK\["([^"]+)"\]\s*=\s*(\[[\s\S]*?\]);', txt)
    if not m: continue
    name = m.group(1)
    arr = json.loads(m.group(2))
    
    # Reset n to str(idx + 1)
    for idx, q in enumerate(arr):
        q['n'] = str(idx + 1)
        
    prefix = f'QBANK["{name}"] = '
    out = f'window.QBANK = window.QBANK || {{}};\n{prefix}' + json.dumps(arr, ensure_ascii=False, indent=2) + ';\n'
    with open(f, 'w', encoding='utf-8') as fp:
        fp.write(out)
    print(f"Reverted {name} to sequential n: 1..{len(arr)}")

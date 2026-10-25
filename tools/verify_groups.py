"""
Verify the new grouping is correct: for each puzzle group, 
questions should be in sub-letter order a,b,c,d,e...
"""
import glob, json, re

for f in sorted(glob.glob('data/reasoning/*.js')):
    with open(f, 'r', encoding='utf-8') as fp:
        txt = fp.read()
    m = re.search(r'QBANK\["([^"]+)"\]\s*=\s*(\[[\s\S]*?\]);', txt)
    if not m:
        continue
    name = m.group(1)
    arr = json.loads(m.group(2))
    
    # Check if grouped
    has_letter = any(re.match(r'^\d+\([a-z]\)$', str(q.get('n',''))) for q in arr)
    if not has_letter:
        continue
    
    # Find max sub count per puzzle
    from collections import defaultdict
    groups = defaultdict(list)
    for q in arr:
        m2 = re.match(r'^(\d+)\(([a-z])\)$', str(q.get('n', '')))
        if m2:
            groups[int(m2.group(1))].append(m2.group(2))
    
    max_sub = max(len(v) for v in groups.values()) if groups else 0
    min_sub = min(len(v) for v in groups.values()) if groups else 0
    print(f"{name}: {len(arr)} qs, {len(groups)} groups, subs per group: min={min_sub} max={max_sub}")
    print(f"  Sample (group 1): {groups[1]}")

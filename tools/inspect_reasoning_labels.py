import json, glob, re

for f in sorted(glob.glob('data/reasoning/*.js')):
    with open(f, 'r', encoding='utf-8') as fp:
        txt = fp.read()
    m = re.search(r'QBANK\["([^"]+)"\]\s*=\s*(\[[\s\S]*?\]);', txt)
    if not m:
        continue
    name = m.group(1)
    arr = json.loads(m.group(2))
    
    # Check what labels exist in q field
    labels = []
    for q in arr:
        mq = re.match(r'^\s*\[([^\]]+)\]', q.get('q', ''))
        if mq:
            labels.append(mq.group(1))
    print(f"{name}: total={len(arr)}, bracket_labels={len(labels)}, unique_prefixes={len(set(re.sub(r'\(.*', '', l) for l in labels))}")
    if labels:
        print(f"   First 8: {labels[:8]}")

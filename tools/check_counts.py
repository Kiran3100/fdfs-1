import json, re

for fname in ['alphabets-1.js', 'coding-decoding-1.js']:
    with open('data/reasoning/' + fname, 'r', encoding='utf-8') as f:
        txt = f.read()
    prefix = f'QBANK["{fname[:-3]}"] = '
    arr = json.loads(txt[txt.find(prefix)+len(prefix):].rstrip(';\n '))

    groupSubCounts = {}
    for item in arr:
        gm = re.match(r'^(\d+)\(', str(item.get('n', '')))
        if gm:
            k = gm.group(1)
            groupSubCounts[k] = groupSubCounts.get(k, 0) + 1

    print(f"{fname}: total={len(arr)}, groups={len(groupSubCounts)}")
    print(f"groupSubCounts values: {groupSubCounts}")

import json
import re

with open(r'd:\bp\data\arithmetic\percentages-1.js', 'r', encoding='utf-8') as f:
    text = f.read()

m = re.search(r'QBANK\["pct-1"\]\s*=\s*(\[[\s\S]*\]);?', text)
if not m:
    print('Failed to match QBANK array!')
    exit(1)

raw_data = json.loads(m.group(1))
part_a_qs = []
idx = 1
for item in raw_data:
    n = item.get('n', '')
    if n.endswith('(A)') or re.match(r'^\d+\(A\)$', n):
        orig_q = item.get('q', '')
        # Only clean question text in q, and attach solution image in ansImg
        new_item = {
            'n': n,
            'q': orig_q,
            'o': item.get('o', []),
            'a': item.get('a', 0),
            'ansImg': f"images/questions/percentages_part_a/q_{idx}_a.png"
        }
        part_a_qs.append(new_item)
        idx += 1

out_content = 'window.QBANK=window.QBANK||{};QBANK["pct-part-a"]=' + json.dumps(part_a_qs, indent=2) + ';\n'
with open(r'd:\bp\data\arithmetic\percentages-part-a.js', 'w', encoding='utf-8') as f:
    f.write(out_content)

print(f'Done! Successfully saved {len(part_a_qs)} questions to percentages-part-a.js')

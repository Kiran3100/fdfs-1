import json
import re

with open(r"d:\bp\data\arithmetic\pipes-cisterns-1.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r'QBANK\["([^"]+)"\]\s*=\s*(\[[\s\S]*?\]);', text)
key = m.group(1)
data = json.loads(m.group(2))
part_a = [q for q in data if q.get("n", "").endswith("(A)")]
print(f"Key: {key}, total questions: {len(data)}, (A) count: {len(part_a)}")
for i, q in enumerate(part_a):
    print(f"{i+1}. {q['n']}: {q['q']}")

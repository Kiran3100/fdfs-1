import json
import re

with open(r"d:\bp\data\arithmetic\time-work-1.js", "r", encoding="utf-8") as f:
    text = f.read()

m = re.search(r'QBANK\["([^"]+)"\]\s*=\s*(\[[\s\S]*?\]);', text)
data = json.loads(m.group(2))
part_a = [q for q in data if q.get("n", "").endswith("(A)")]

for i, q in enumerate(part_a, 1):
    q["ansImg"] = f"images/questions/time_work_part_a/q_{i}_a.png"

out_js = 'window.QBANK=window.QBANK||{};QBANK["tw-part-a"]=' + json.dumps(part_a, indent=2, ensure_ascii=False) + ';\n'

with open(r"d:\bp\data\arithmetic\time-work-part-a.js", "w", encoding="utf-8") as f:
    f.write(out_js)

print(f"Generated time-work-part-a.js with {len(part_a)} questions!")

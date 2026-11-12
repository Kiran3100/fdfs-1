import json
import re

with open(r"d:\bp\data\arithmetic\ratio-proportion-1.js", "r", encoding="utf-8") as f:
    content = f.read()

# Extract json array
match = re.search(r'QBANK\["rp-1"\]\s*=\s*(\[[\s\S]*?\]);', content)
if not match:
    raise Exception("Could not find QBANK[rp-1]")

data = json.loads(match.group(1))
part_a = [q for q in data if q.get("n", "").endswith("(A)")]
print("Found", len(part_a), "(A) questions")

for i, q in enumerate(part_a, 1):
    q["ansImg"] = f"images/questions/ratio_proportion_part_a/q_{i}_a.png"

out_js = 'window.QBANK=window.QBANK||{};QBANK["rp-part-a"]=' + json.dumps(part_a, indent=2, ensure_ascii=False) + ';\n'

with open(r"d:\bp\data\arithmetic\ratio-proportion-part-a.js", "w", encoding="utf-8") as f:
    f.write(out_js)

print("Saved d:\\bp\\data\\arithmetic\\ratio-proportion-part-a.js successfully!")

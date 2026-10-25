import glob
import re
import os

files = glob.glob('data/arithmetic/*.js')
print("Total arithmetic files found:", len(files))
for f in sorted(files):
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        txt = fp.read()
    matches = re.findall(r'"n":\s*"([^"]+)"', txt)
    models = set()
    for m in matches:
        # Check model extraction
        # e.g. "1(A)" -> "1", "10(C)" -> "10", "12" -> "12"
        match = re.match(r'^(\d+)', m)
        if match:
            models.add(match.group(1))
        else:
            models.add(m)
    print(f"{os.path.basename(f)}: Total Qs={len(matches)}, Unique Models={len(models)}, Samples={matches[:6]}")

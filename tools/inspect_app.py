import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines in js/app.js: {len(lines)}")
for i, line in enumerate(lines):
    if 'router' in line.lower() or 'hashchange' in line.lower() or 'location.hash' in line.lower():
        print(f"L{i+1}: {line.strip()[:100]}")
    if 'loadtest' in line.lower() or 'starttest' in line.lower():
        print(f"L{i+1}: {line.strip()[:100]}")

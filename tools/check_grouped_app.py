import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for idx, line in enumerate(lines):
    if any(k in line for k in ['isGrouped', 'palette-grid', 'palette-btn', 'Sub-parts', 'autoGrouped', 'subLetter']):
        print(f"Line {idx+1}: {line.strip()}")

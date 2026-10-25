with open('js/app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i, l in enumerate(lines):
    if 'renderResult' in l or 'renderHistory' in l:
        print(f"L{i+1}: {l.strip()[:80]}")

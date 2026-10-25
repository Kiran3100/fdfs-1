import re

with open('css/modern.css', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

m = re.findall(r'(\.palette-btn[a-zA-Z0-9\._\-:]*\s*\{[^}]*\})', text)
for rule in m:
    print(rule)

with open('css/modern.css', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

import re
matches = re.findall(r'\[data-theme=["\']dark["\']\]\s*\{[^}]*\}', text)
for m in matches[:3]:
    print(m)

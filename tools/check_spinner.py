with open('css/modern.css', 'r', encoding='utf-8', errors='ignore') as f:
    txt = f.read()

import re

found = re.findall(r'\.spinner[^{]*\{[^}]+\}', txt)
for f in found:
    print(f[:200])
    print('---')

with open('js/app.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = [m.start() for m in re.finditer(r'btn-export-excel', text)]
for idx in matches:
    print(text[idx-50:idx+350].encode('ascii', errors='replace').decode())
    print('---')

import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    txt = f.read()

# Search for loadScript or script loading
for match in re.finditer(r'loadScript|script|file|QBANK', txt):
    idx = match.start()
    snippet = txt[max(0, idx-100):min(len(txt), idx+150)]
    if 'loadScript' in snippet or 'createElement(\'script\')' in snippet:
        print("FOUND:")
        print(snippet)
        print("="*40)

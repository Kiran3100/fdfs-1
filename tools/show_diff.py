import difflib

with open('js/app.js', 'r', encoding='utf-8') as f:
    js_lines = [l.strip() for l in f if l.strip()]

with open('app.js', 'r', encoding='utf-8') as f:
    root_lines = [l.strip() for l in f if l.strip()]

diff = list(difflib.unified_diff(js_lines, root_lines, fromfile='js/app.js', tofile='app.js'))
print("Total diff lines:", len(diff))
print("\n".join(diff[:60]))

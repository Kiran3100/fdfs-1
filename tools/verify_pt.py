
files = ['js/progress-table.js', 'css/progress-table.css', 'index.html']
for f in files:
    with open(f, 'r', encoding='utf-8') as fp:
        text = fp.read()
    d_c = 0; d_p = 0; d_b = 0
    for ch in text:
        if ch == '{': d_c += 1
        elif ch == '}': d_c -= 1
        elif ch == '(': d_p += 1
        elif ch == ')': d_p -= 1
        elif ch == '[': d_b += 1
        elif ch == ']': d_b -= 1
    ok = (d_c == 0 and d_p == 0 and d_b == 0)
    print(f, 'OK' if ok else 'IMBALANCED curly=%d paren=%d bracket=%d' % (d_c, d_p, d_b))

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()
checks = {
    'nav link':           'nav-progress-table' in html,
    'css link':           'progress-table.css' in html,
    'script tag':         'progress-table.js' in html,
    'ibps-coach intact':  'nav-ibps-coach' in html,
}
for k, v in checks.items():
    print(k, 'OK' if v else 'MISSING')

with open('js/app.js', 'r', encoding='utf-8') as f:
    app = f.read()
print('route in app.js:', 'OK' if 'progress-table' in app else 'MISSING')

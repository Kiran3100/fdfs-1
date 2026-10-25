files = [
    'data/progress-config.js',
    'js/progress-engine.js',
    'js/progress-ui.js',
    'css/progress.css',
    'index.html',
    'js/app.js'
]

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

with open('js/app.js', 'r', encoding='utf-8') as f:
    app = f.read()
print('study-progress route:', 'OK' if 'study-progress' in app and 'StudyProgressUI.render' in app else 'MISSING')

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()
print('nav-study-progress:', 'OK' if 'nav-study-progress' in html else 'MISSING')
print('progress.css link:', 'OK' if 'progress.css' in html else 'MISSING')
print('progress-config.js:', 'OK' if 'progress-config.js' in html else 'MISSING')
print('progress-engine.js:', 'OK' if 'progress-engine.js' in html else 'MISSING')
print('progress-ui.js:', 'OK' if 'progress-ui.js' in html else 'MISSING')

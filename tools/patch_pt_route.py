
with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old = """    if (page === 'attempt') {
      return viewAttemptById(h[1]);
    }"""

new = """    if (page === 'progress-table') {
      if (window.ProgressTable && typeof window.ProgressTable.render === 'function') {
        return window.ProgressTable.render(app);
      }
      return;
    }

    if (page === 'attempt') {
      return viewAttemptById(h[1]);
    }"""

if old in content:
    content = content.replace(old, new, 1)
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print('SUCCESS')
else:
    print('ERROR: target not found')

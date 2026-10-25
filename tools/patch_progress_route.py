
# Patch app.js to add study-progress route handler

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old = "    if (page === 'attempt') {\n      return viewAttemptById(h[1]);\n    }"

new = """    if (page === 'study-progress') {
      if (window.StudyProgressUI && typeof window.StudyProgressUI.render === 'function') {
        return window.StudyProgressUI.render(app);
      }
      app.innerHTML = '<div class=\"card\" style=\"padding:40px; text-align:center;\"><h2>Loading Study Progress...</h2><p class=\"text-muted\">If this takes a moment, please refresh.</p></div>';
      return;
    }

    if (page === 'attempt') {
      return viewAttemptById(h[1]);
    }"""

if old in content:
    content = content.replace(old, new, 1)
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print('SUCCESS: study-progress route added to app.js')
else:
    print('ERROR: target string not found')
    # Show what's around the attempt page
    idx = content.find("page === 'attempt'")
    print('Context:', repr(content[max(0,idx-50):idx+100]))

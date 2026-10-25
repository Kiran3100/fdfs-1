
# Revert app.js: remove study-progress route and normalization
with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Remove normalization line
content = content.replace(
    "\n    if (page === 'study progress' || page === 'study_progress') page = 'study-progress';",
    ""
)

# Remove the study-progress route block
old_block = """    if (page === 'study-progress') {
      if (window.StudyProgressUI && typeof window.StudyProgressUI.render === 'function') {
        return window.StudyProgressUI.render(app);
      }
      app.innerHTML = '<div class=\"card\" style=\"padding:40px; text-align:center;\"><h2>Loading Study Progress...</h2><p class=\"text-muted\">If this takes a moment, please refresh.</p></div>';
      return;
    }

    if (page === 'attempt') {
      return viewAttemptById(h[1]);
    }"""

new_block = """    if (page === 'attempt') {
      return viewAttemptById(h[1]);
    }"""

if old_block in content:
    content = content.replace(old_block, new_block, 1)
    print('Route block removed OK')
else:
    print('Route block not found - checking...')
    idx = content.find("study-progress")
    print('Remaining study-progress refs:', content.count('study-progress'))

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print('app.js saved')

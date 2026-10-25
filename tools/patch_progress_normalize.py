
# Patch app.js: also normalize 'study progress' and 'study_progress' to 'study-progress'
with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old = "    if (page === 'ibps coach' || page === 'ibps_coach') page = 'ibps-coach';"

new = """    if (page === 'ibps coach' || page === 'ibps_coach') page = 'ibps-coach';
    if (page === 'study progress' || page === 'study_progress') page = 'study-progress';"""

if old in content:
    content = content.replace(old, new, 1)
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print('SUCCESS: study-progress normalization added')
else:
    print('ERROR: ibps-coach normalization line not found')

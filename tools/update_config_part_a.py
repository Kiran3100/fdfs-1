import re

with open(r'd:\bp\data\config.js', 'r', encoding='utf-8') as f:
    c = f.read()

# 1. Remove pct-part-a from ChapterSets
c_mod = re.sub(r'    \{\s*id:\s*[\'"]pct-part-a[\'"],[\s\S]*?setName:[^\n]+\n\s*\},?\n', '', c)

# 2. Update pct-part-a in Question Book to set isAnswerViewer: true
c_mod = c_mod.replace(
    "name: 'Percentages Part-A (Q 1(A) to 45(A))',",
    "name: 'Percentages Part-A Answers (Q 1(A) to 45(A))',\n      isAnswerViewer: true,"
)

with open(r'd:\bp\data\config.js', 'w', encoding='utf-8') as f:
    f.write(c_mod)

print('config.js cleaned up and isAnswerViewer set!')

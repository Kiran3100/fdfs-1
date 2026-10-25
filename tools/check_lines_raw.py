with open('js/app.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

for i in range(759, 774):
    print(repr(lines[i]))

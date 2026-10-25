with open('css/style.css', 'r', encoding='utf-8', errors='ignore') as f:
    txt = f.read()

print('style.css length:', len(txt))
print('Has .spinner?', '.spinner' in txt)
print('Has .badge?', '.badge' in txt)
print('Has .input?', '.input' in txt)

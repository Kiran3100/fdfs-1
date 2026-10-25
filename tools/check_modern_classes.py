with open('css/modern.css', 'r', encoding='utf-8', errors='ignore') as f:
    txt = f.read()

print('modern.css has spinner?', '.spinner' in txt)
print('modern.css has badge?', '.badge' in txt)
print('modern.css has input?', '.input' in txt)
print('modern.css has flex-between?', '.flex-between' in txt)
print('modern.css has mb-4?', '.mb-4' in txt)
print('modern.css has text-sm?', '.text-sm' in txt)

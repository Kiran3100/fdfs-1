with open('data/arithmetic/areas-1.js', 'r', encoding='utf-8') as f:
    text = f.read()

print('Has f field:', '"f":' in text)
print('Has explanation field:', '"explanation":' in text)
print('Has exp field:', '"exp":' in text)
print('First question object:')
print(text[:400])

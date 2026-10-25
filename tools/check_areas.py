import re

with open('data/arithmetic/areas-1.js', 'r', encoding='utf-8') as f:
    text = f.read()

qs = re.findall(r'"n":\s*"([^"]+)"', text)
print('areas-1 length:', len(qs))
models = {}
for q in qs:
    m = re.match(r'^(\d+)', q)
    mod = m.group(1) if m else q
    models[mod] = models.get(mod, 0) + 1

print('areas-1 model count:', len(models))
print('Sample models and variant counts:', list(models.items())[:10])

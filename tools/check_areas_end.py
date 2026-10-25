with open('data/arithmetic/areas-1.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
matches = re.findall(r'"n":\s*"([^"]+)"', text)
print("Last 20 questions in areas-1:", matches[-20:])

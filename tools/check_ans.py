with open('data/arithmetic/areas-1.js', 'r', encoding='utf-8') as f:
    text = f.read()

import re
ans = re.findall(r'"a":\s*([^,\}\n]+)', text)
print("Total answers found in areas-1:", len(ans))
print("Sample answers:", ans[:10])
print("Any null or None?", [x for x in ans if x in ['null', 'undefined']])

with open('data/config.js', 'r', encoding='utf-8') as f:
    config = f.read()

import re

# Find the first test in config.js
m = re.search(r'id:\s*[\'"]pct-1[\'"]', config)
if m:
    print(config[m.start()-50:m.start()+250])

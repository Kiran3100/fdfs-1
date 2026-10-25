with open('data/config.js', 'r', encoding='utf-8') as f:
    config = f.read()

import re

# Find all tests in config.js
test_blocks = re.findall(r'\{\s*id:\s*[\'"]([^\'"]+)[\'"][\s\S]*?topic:\s*[\'"]([^\'"]+)[\'"][\s\S]*?file:\s*[\'"]([^\'"]+)[\'"][\s\S]*?count:\s*(\d+)', config)
print(f"Total tests configured in config.js: {len(test_blocks)}")

arith_tests = [t for t in test_blocks if 'arithmetic' in t[2]]
print(f"Arithmetic tests: {len(arith_tests)}")
for t in arith_tests:
    print(t)

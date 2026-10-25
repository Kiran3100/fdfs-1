import re, json

with open('data/config.js', 'r', encoding='utf-8') as f:
    cfg = f.read()

# Let's see all test files for arithmetic
tests = re.findall(r'\{\s*id:\s*[\'"]([^\'"]+)[\'"]\s*,\s*subject:\s*[\'"]arithmetic[\'"]\s*,\s*topic:\s*[\'"]([^\'"]+)[\'"][\s\S]*?file:\s*[\'"]([^\'"]+)[\'"]', cfg)

print(f"Total arithmetic tests: {len(tests)}")
for t_id, topic, fpath in tests:
    # let's check first 50 chars of the file
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    var_match = re.search(r'QBANK\[[\'"]([^\'"]+)[\'"]\]\s*=', c)
    if var_match:
        loaded_key = var_match.group(1)
        if loaded_key != t_id:
            print(f"MISMATCH in {fpath}: config has id '{t_id}' but file defines QBANK['{loaded_key}']!")
        else:
            print(f"OK: {t_id} -> {fpath}")
    else:
        print(f"WARNING: QBANK key pattern not found in {fpath}")

import os, re, json

with open('data/config.js', 'r', encoding='utf-8') as f:
    cfg_text = f.read()

# Extract arithmetic topics
# topics: [ ... ]
m = re.search(r'id:\s*[\'"]arithmetic[\'"][\s\S]*?topics:\s*\[([\s\S]*?)\]\s*\}', cfg_text)
topics_text = m.group(1) if m else ""
topics = re.findall(r'\{\s*id:\s*[\'"]([^\'"]+)[\'"]\s*,\s*num:\s*(\d+)\s*,\s*name:\s*[\'"]([^\'"]+)[\'"]\s*,\s*category:\s*[\'"]([^\'"]+)[\'"]', topics_text)
print(f"Total arithmetic topics in config.js: {len(topics)}")

# Also extract tests
# find all { id: '...', subject: 'arithmetic', topic: '...', file: '...' }
test_matches = re.findall(r'\{\s*id:\s*[\'"]([^\'"]+)[\'"]\s*,\s*subject:\s*[\'"]arithmetic[\'"]\s*,\s*topic:\s*[\'"]([^\'"]+)[\'"][\s\S]*?file:\s*[\'"]([^\'"]+)[\'"]', cfg_text)
print(f"Total arithmetic tests configured: {len(test_matches)}")

topic_tests = {}
for tid, subj_topic, fpath in test_matches:
    if subj_topic not in topic_tests:
        topic_tests[subj_topic] = []
    topic_tests[subj_topic].append((tid, fpath))

for t_id, t_num, t_name, t_cat in topics:
    tests = topic_tests.get(t_id, [])
    print(f"Topic {t_num}: {t_name} (id: {t_id}) -> Tests: {len(tests)}")
    for tid, fpath in tests:
        if os.path.exists(fpath):
            with open(fpath, 'r', encoding='utf-8', errors='ignore') as fp:
                content = fp.read()
            ns = re.findall(r'"n":\s*"([^"]+)"', content)
            models = set()
            for n in ns:
                match = re.match(r'^(\d+)', n)
                models.add(match.group(1) if match else n)
            print(f"   -> {tid} ({fpath}): {len(ns)} Qs, {len(models)} Unique Models")
        else:
            print(f"   -> {tid} ({fpath}): FILE NOT FOUND")

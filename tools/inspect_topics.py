import re

with open('data/config.js', 'r', encoding='utf-8') as f:
    text = f.read()

subjects_data = [
    ('arithmetic', 'Arithmetic'),
    ('reasoning', 'Reasoning Ability')
]

for sub_id, sub_name in subjects_data:
    sub_block = re.search(r'id:\s*[\'\"]' + sub_id + r'[\'\"].*?topics:\s*\[(.*?)\]\s*\}', text, re.DOTALL)
    if not sub_block:
        continue
    topics = re.findall(r'id:\s*[\'\"]([^\'\"]+)[\'\"],\s*num:\s*(\d+),\s*name:\s*[\'\"]([^\'\"]+)[\'\"](?:,\s*category:\s*[\'\"]([^\'\"]+)[\'\"])?', sub_block.group(1))
    print(f'=== {sub_name} ({len(topics)} topics) ===')
    for tid, num, name, cat in topics:
        t_matches = re.findall(r'topic:\s*[\'\"]' + tid + r'[\'\"].*?count:\s*(\d+)', text, re.DOTALL)
        counts = [int(c) for c in t_matches]
        total_q = sum(counts)
        print(f'  {num}. [{tid}] {name} ({cat}) => {len(counts)} tests, {total_q} questions')

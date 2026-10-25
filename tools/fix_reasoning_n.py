"""
Fix all reasoning JS files that have sequential n="1","2","3"...
but embedded [1(A)], [1(B)], [1(C)], [1(D)] labels in q text.
Convert n to "1(a)", "1(b)", "1(c)", "1(d)" grouping where
each PDF label like [1(A)] means main question 1, variant A.

For files that have NO (A-D) letters (e.g. cause-and-effect), leave as-is.
"""
import glob, json, re

REASONING_FILES = sorted(glob.glob('data/reasoning/*.js'))
sub_letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']

for f in REASONING_FILES:
    with open(f, 'r', encoding='utf-8') as fp:
        txt = fp.read()
    
    m = re.search(r'QBANK\["([^"]+)"\]\s*=\s*(\[[\s\S]*?\]);', txt)
    if not m:
        print(f"SKIP (no match): {f}")
        continue
    
    name = m.group(1)
    arr = json.loads(m.group(2))
    
    # Check if questions have [N(Letter)] prefix in q text
    has_letter_sub = any(re.match(r'^\s*\[\d+\([A-Z]\)\]', q.get('q', '')) for q in arr)
    
    if not has_letter_sub:
        print(f"SKIP (no letter subs): {name}")
        continue
    
    # Check if n already has letter sub like "1(a)" or "1(A)"
    already_grouped = any(re.match(r'^\d+\([a-zA-Z]\)$', str(q.get('n', ''))) for q in arr)
    if already_grouped:
        print(f"SKIP (already grouped): {name}")
        continue
    
    # Re-label n based on embedded [N(Letter)] in q text
    # Each question has an embedded label like [1(A)] or [2(B)] etc.
    # Group: main_num = q number (N), variant = letter (A/B/C/D)
    # Per direction group, there's a specific puzzle, and per puzzle we have 
    # questions 1-5 each with variants A/B/C/D
    #
    # The structure is: for each direction group (e.g. 1-5),
    # questions 1..5 each have variants A,B,C,D
    # stored in order: 1(A),1(B),1(C),1(D), 2(A),2(B)...
    #
    # We want palette label: 
    # For each "main question number" (the N in [N(X)]), 
    # assign it as the group, and the variant letter becomes the sub.
    # But since there are multiple direction groups, and each group repeats Q1-Q5,
    # we need to assign a NEW sequential main number per direction group.
    #
    # Group by (direction_text, letter) to find unique puzzles
    
    # Extract (dir_text, q_num, letter) from each question
    parsed = []
    for q in arr:
        q_str = q.get('q', '')
        m_lab = re.match(r'^\s*\[(\d+)\(([A-Z])\)\]', q_str)
        if m_lab:
            q_num = int(m_lab.group(1))
            letter = m_lab.group(2)
        else:
            q_num = None
            letter = None
        # extract direction range
        m_dir = re.search(r'Direction\s*\(([^\)]+)\)', q_str, re.IGNORECASE)
        dir_range = m_dir.group(1) if m_dir else None
        parsed.append({'q_num': q_num, 'letter': letter, 'dir': dir_range})
    
    # Find unique puzzles = unique (dir_range, letter) combinations in order
    seen_puzzles = []
    puzzle_map = {}
    for p in parsed:
        key = (p['dir'], p['letter'])
        if key not in puzzle_map:
            puzzle_map[key] = len(seen_puzzles) + 1
            seen_puzzles.append(key)
    
    # Now assign n: for each question, its main = puzzle number, sub = position within puzzle
    puzzle_sub_counter = {}
    new_arr = []
    for i, (q, p) in enumerate(zip(arr, parsed)):
        key = (p['dir'], p['letter'])
        main_num = puzzle_map[key]
        # sub position within this puzzle group
        if key not in puzzle_sub_counter:
            puzzle_sub_counter[key] = 0
        sub_idx = puzzle_sub_counter[key]
        puzzle_sub_counter[key] += 1
        sub_let = sub_letters[sub_idx] if sub_idx < len(sub_letters) else str(sub_idx + 1)
        new_n = f"{main_num}({sub_let})"
        new_q = dict(q)
        new_q['n'] = new_n
        new_arr.append(new_q)
    
    # Write back
    prefix = f'QBANK["{name}"]'
    prefix_start = txt.find(prefix)
    header = txt[:prefix_start] + prefix + ' = '
    js_content = header + json.dumps(new_arr, ensure_ascii=False, indent=2) + ';\n'
    with open(f, 'w', encoding='utf-8') as fp:
        fp.write(js_content)
    
    print(f"UPDATED {name}: {len(arr)} questions, {len(seen_puzzles)} unique puzzle groups")
    print(f"  First 10 n values: {[q['n'] for q in new_arr[:10]]}")

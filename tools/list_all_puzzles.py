import pypdf, re

r = pypdf.PdfReader(r'F:\BANK\Reasoning\QUESTION-BOOK-MATERIAL-LAPTOP VERSION\10.Seating_Arrangement_Grouped_by_Direction.pdf')

groups = []
for i in range(len(r.pages) - 1):
    txt = r.pages[i].extract_text()
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
    m_q = re.match(r'^(\d+)\(([A-D])\)\.', lines[0]) if lines else None
    m_dir = None
    for line in lines[:3]:
        md = re.search(r'Direction\s*\(([^\)]+)\)', line, re.IGNORECASE)
        if md:
            m_dir = md.group(1)
            break
    groups.append((i+1, m_dir, m_q.group(1) if m_q else '?', m_q.group(2) if m_q else '?'))

from itertools import groupby
puzzles = []
for k, g in groupby(groups, key=lambda x: (x[1], x[3])):
    items = list(g)
    puzzles.append((k[0], k[1], len(items), [x[2] for x in items]))

print(f"Total puzzle sets: {len(puzzles)}")
total_q = sum(p[2] for p in puzzles)
print(f"Total questions: {total_q}")
for i, p in enumerate(puzzles):
    print(f"Puzzle {i+1}: Dir={p[0]} Set={p[1]} count={p[2]} q_nums={p[3]}")

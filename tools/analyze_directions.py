import pypdf, re

r = pypdf.PdfReader(r'F:\BANK\Reasoning\QUESTION-BOOK-MATERIAL-LAPTOP VERSION\10.Seating_Arrangement_Grouped_by_Direction.pdf')

groups = []
current_group = None

for i in range(len(r.pages) - 1):
    txt = r.pages[i].extract_text()
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
    if not lines:
        continue
    m_q = re.match(r'^(\d+)\(([A-D])\)\.', lines[0])
    m_dir = None
    for line in lines[:3]:
        md = re.search(r'Direction\s*\(([^\)]+)\)', line, re.IGNORECASE)
        if md:
            m_dir = md.group(1)
            break
    q_num = m_q.group(1) if m_q else '?'
    set_letter = m_q.group(2) if m_q else '?'
    groups.append({
        'page': i + 1,
        'label': f"{q_num}({set_letter})",
        'q_num': q_num,
        'set_letter': set_letter,
        'dir': m_dir
    })

# Print summary of groups
print(f"Total questions: {len(groups)}")
from itertools import groupby
for k, g in groupby(groups, key=lambda x: (x['dir'], x['set_letter'])):
    items = list(g)
    print(f"Direction {k[0]} Set {k[1]}: count={len(items)}, labels={[x['label'] for x in items]}")

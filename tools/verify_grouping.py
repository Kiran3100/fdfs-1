import pypdf, re, json
from generate_old_tests import parse_key, clean_opt

pdf_path = r'F:\BANK\Reasoning\QUESTION-BOOK-MATERIAL-LAPTOP VERSION\10.Seating_Arrangement_Grouped_by_Direction.pdf'
r = pypdf.PdfReader(pdf_path)

key = parse_key(r.pages[-1].extract_text())

# Extract all 367 questions
pages_data = []
for idx in range(len(r.pages) - 1):
    txt = r.pages[idx].extract_text()
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
    if not lines:
        continue
    m = re.match(r'^(\d+\([A-D]\))\.\s*(.*)', lines[0])
    if not m:
        print(f"Failed header on page {idx+1}: {lines[0]}")
        continue
    pdf_lab = m.group(1)
    rest_header = m.group(2).strip()
    
    # find direction if present
    m_dir = None
    for line in lines[:3]:
        md = re.search(r'Direction\s*\(([^\)]+)\)', line, re.IGNORECASE)
        if md:
            m_dir = md.group(1)
            break
            
    body_lines = [rest_header] if rest_header else []
    body_lines.extend(lines[1:-5])
    q_text = ' '.join(body_lines)
    raw_options = lines[-5:]
    options = [clean_opt(x) for x in raw_options]
    
    k = key.get(pdf_lab)
    ans = None
    flags = []
    if k in ('1','2','3','4','5'):
        ans = int(k) - 1
    elif k in ('A','B','C','D','E'):
        ans = 'ABCDE'.index(k)
    elif k in ('*', None, '-'):
        flags.append('No usable answer key for this question - excluded from scoring.')
    elif '/' in str(k):
        flags.append(f'Answer key lists more than one option ({k}) - ambiguous; excluded from scoring.')
    else:
        flags.append(f'Unrecognized answer key: {k}')
        
    m_q = re.match(r'^(\d+)\(([A-D])\)', pdf_lab)
    q_num = m_q.group(1)
    set_letter = m_q.group(2)
    
    pages_data.append({
        'page': idx + 1,
        'pdf_lab': pdf_lab,
        'q_num': q_num,
        'set_letter': set_letter,
        'dir': m_dir,
        'q_text': q_text,
        'options': options,
        'ans': ans,
        'flags': flags
    })

print(f"Extracted {len(pages_data)} pages.")

# Group into puzzles
from itertools import groupby
puzzles = []
for k_group, g in groupby(pages_data, key=lambda x: (x['dir'], x['set_letter'])):
    items = list(g)
    puzzles.append(items)

print(f"Total puzzle groups: {len(puzzles)}")
sub_letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g']

final_questions = []
for p_idx, p_items in enumerate(puzzles):
    main_num = p_idx + 1
    for sub_idx, item in enumerate(p_items):
        sub_let = sub_letters[sub_idx]
        display_n = f"{main_num}({sub_let})"
        # Include original pdf label in q text so [1(A)] is clear
        full_q_text = f"[{item['pdf_lab']}] {item['q_text']}"
        q_obj = {
            'n': display_n,
            'pdf_n': item['pdf_lab'],
            'q': full_q_text,
            'o': item['options'],
            'a': item['ans']
        }
        if item['flags']:
            q_obj['f'] = ' '.join(item['flags'])
        final_questions.append(q_obj)

print(f"Final questions count: {len(final_questions)}")
print("First 10 final questions:")
for q in final_questions[:10]:
    print(f"  n={q['n']} (pdf={q['pdf_n']}) a={q['a']} | {q['q'][:60]}...")

print("\nPuzzle 25 (3 qs):")
for q in final_questions[120:125]:
    print(f"  n={q['n']} (pdf={q['pdf_n']}) a={q['a']} | {q['q'][:60]}...")

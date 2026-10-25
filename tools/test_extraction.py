import pypdf, re, json

pdf_path = r'F:\BANK\Reasoning\QUESTION-BOOK-MATERIAL-LAPTOP VERSION\10.Seating_Arrangement_Grouped_by_Direction.pdf'
r = pypdf.PdfReader(pdf_path)

# 1. Parse answer key from page 368
key_page_txt = r.pages[-1].extract_text()
key = {}
lines = [l.strip() for l in key_page_txt.split('\n') if l.strip()]
i = 0
while i < len(lines):
    if lines[i] == 'Q.No' and i+4 < len(lines) and [lines[i+1], lines[i+2], lines[i+3], lines[i+4]] == ['A','B','C','D']:
        i += 5
        while i < len(lines):
            if lines[i] == 'Q.No':
                break
            if lines[i].startswith('Notes:'):
                i = len(lines)
                break
            qnum = lines[i]
            if not qnum.isdigit():
                i += 1
                continue
            vals = []
            for k in range(1, 5):
                if i + k < len(lines):
                    vals.append(lines[i+k])
            for let, v in zip(['A','B','C','D'], vals):
                lbl = f'{qnum}({let})'
                key[lbl] = v
            i += 5
    else:
        i += 1

print(f"Total keys in key dict: {len(key)}")

# 2. Inspect pages 1 to 367
extracted = []
errors = []

def clean_opt(opt_str):
    m = re.match(r'^(?:\d+\)|\(\d+\)|\([A-E]\))\s*(.*)', opt_str)
    return m.group(1).strip() if m else opt_str.strip()

for idx in range(len(r.pages) - 1):
    txt = r.pages[idx].extract_text()
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
    if not lines:
        errors.append((idx+1, "Empty page"))
        continue
    # Check header
    m = re.match(r'^(\d+\([A-D]\))\.\s*(.*)', lines[0])
    if not m:
        errors.append((idx+1, f"Header match failed: {lines[0]}"))
        continue
    pdf_lab = m.group(1)
    rest_header = m.group(2).strip()
    
    # Body and options
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
        
    extracted.append({
        'page': idx + 1,
        'pdf_lab': pdf_lab,
        'q_text': q_text,
        'options': options,
        'ans': ans,
        'flags': flags
    })

print(f"Successfully extracted: {len(extracted)} / {len(r.pages) - 1}")
if errors:
    print(f"Errors ({len(errors)}): {errors[:10]}")

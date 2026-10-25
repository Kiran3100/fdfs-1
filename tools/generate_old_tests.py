import sys, re, json, pypdf

def parse_key(txt):
    key = {}
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
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
    return key

def clean_opt(opt_str):
    m = re.match(r'^(?:\d+\)|\(\d+\)|\([A-E]\))\s*(.*)', opt_str)
    return m.group(1).strip() if m else opt_str.strip()

def process_file(pdf_path, out_path, test_id, is_reasoning=False):
    r = pypdf.PdfReader(pdf_path)
    key = parse_key(r.pages[-1].extract_text())
    qs = []
    for idx in range(len(r.pages) - 1):
        txt = r.pages[idx].extract_text()
        lines = [l.strip() for l in txt.split('\n') if l.strip()]
        if not lines:
            continue
        m = re.match(r'^(\d+\([A-D]\))\.\s*(.*)', lines[0])
        if not m:
            print(f'Error matching header on page {idx+1}: {lines[0]}')
            continue
        lab = m.group(1)
        rest_header = m.group(2).strip()
        body_lines = [rest_header] if rest_header else []
        body_lines.extend(lines[1:-5])
        q_text = f'[{lab}] ' + ' '.join(body_lines)
        raw_options = lines[-5:]
        options = [clean_opt(x) for x in raw_options]
        
        k = key.get(lab)
        ans = None
        flags = []
        if k in ('1','2','3','4','5'):
            ans = int(k) - 1
        elif k in ('A','B','C','D','E'):
            ans = 'ABCDE'.index(k)
        elif k in ('*', None, '-'):
            flags.append('No usable answer key for this question (answer not among options / missing) - excluded from scoring.')
        elif '/' in str(k):
            flags.append(f'Answer key lists more than one option ({k}) - ambiguous; excluded from scoring.')
        else:
            flags.append(f'Unrecognized answer key: {k}')
            
        d = {
            'n': str(idx + 1) if is_reasoning else lab,
            'q': q_text,
            'o': options,
            'a': ans
        }
        if flags:
            d['f'] = ' '.join(flags)
        qs.append(d)
        
    js_content = f'window.QBANK = window.QBANK || {{}};\nQBANK["{test_id}"] = ' + json.dumps(qs, ensure_ascii=False, indent=2) + ';\n'
    with open(out_path, 'w', encoding='utf-8') as f:
        f.write(js_content)
    print(f'Wrote {len(qs)} questions to {out_path} for test_id={test_id}')

if __name__ == '__main__':
    process_file(r'F:\BANK\Arithmetic\old\17_Areas_Full_Question_Per_Page.pdf', r'data\arithmetic\areas-1.js', 'areas-1', is_reasoning=False)
    process_file(r'F:\BANK\Arithmetic\old\19_LCM_and_HCF_Coded_Full_Question_Per_Page.pdf', r'data\arithmetic\lcm-hcf-1.js', 'lcm-hcf-1', is_reasoning=False)
    process_file(r'F:\BANK\Reasoning\old\7_Directions_and_Distances_Coded_Full_Question_Per_Page.pdf', r'data\reasoning\directions-distances-1.js', 'directions-distances-1', is_reasoning=True)
    process_file(r'F:\BANK\Reasoning\old\13_Machine_Input_Output_Full_Question_Per_Page.pdf', r'data\reasoning\machine-input-output-1.js', 'machine-input-output-1', is_reasoning=True)

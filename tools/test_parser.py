import fitz
import json
import re

def parse_pdf(pdf_path, is_approx=False):
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    print(f"Opening {pdf_path}: {total_pages} pages")
    
    # 1. Parse Answer Keys from pages 500..504
    ans_map = {} # qnum -> option_index (0 for A, 1 for B, 2 for C, 3 for D, 4 for E)
    option_letter_to_idx = {'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4}
    
    for pno in range(500, min(505, total_pages)):
        text = doc[pno].get_text("text")
        # Match Q<num>\s+<A-E> or Q<num>\n<A-E>
        matches = re.findall(r'Q(\d+)\s*[\n\r\t ]+([A-E])', text)
        for qn, ans in matches:
            ans_map[int(qn)] = option_letter_to_idx[ans]
            
    print(f"Extracted {len(ans_map)} answers from answer key pages (min: {min(ans_map.keys())}, max: {max(ans_map.keys())})")
    assert len(ans_map) == 500, f"Expected 500 answers, got {len(ans_map)}"
    
    # 2. Parse Questions from pages 0..499
    questions = []
    
    for pno in range(500):
        qnum = pno + 1
        page = doc[pno]
        text = page.get_text("text").strip()
        lines = [l.strip() for l in text.split('\n') if l.strip()]
        
        # We need question statement and 5 options
        # Pattern usually:
        # Q1.
        # Simplify: 57 + 45 ... = ?
        # (1(A))
        # (A)
        # 97
        # (B)
        # 107
        # ...
        
        # Let's extract options: (A), (B), (C), (D), (E)
        # We can find positions of (A), (B), (C), (D), (E)
        opt_indices = {}
        for opt_let in ['A', 'B', 'C', 'D', 'E']:
            # Search for line matching f"({opt_let})" or f"{opt_let}." or f"({opt_let})"
            found_idx = -1
            for idx, line in enumerate(lines):
                if line == f"({opt_let})":
                    found_idx = idx
                    break
            opt_indices[opt_let] = found_idx
            
        all_opts_found = all(opt_indices[k] != -1 for k in ['A', 'B', 'C', 'D', 'E'])
        if not all_opts_found:
            print(f"Warning on page {pno} (Q{qnum}): lines={lines}")
            
        # Options values
        options = []
        for i, opt_let in enumerate(['A', 'B', 'C', 'D', 'E']):
            start_i = opt_indices[opt_let] + 1
            if opt_let != 'E':
                next_let = ['A', 'B', 'C', 'D', 'E'][i+1]
                end_i = opt_indices[next_let]
            else:
                end_i = len(lines)
            opt_val = " ".join(lines[start_i:end_i]).strip()
            options.append(opt_val)
            
        # Question text: everything before (A), excluding Q<num>. and sub-code like (1(A)) if present
        first_opt_idx = opt_indices['A']
        q_lines = lines[:first_opt_idx]
        
        # Filter out sub-code like (1(A)), (125(D)), etc.
        filtered_q_lines = []
        sub_code = ""
        for ql in q_lines:
            sub_m = re.match(r'^\((\d+\([A-Za-z]\))\)$', ql)
            if sub_m:
                sub_code = sub_m.group(1)
            else:
                filtered_q_lines.append(ql)
                
        q_statement = " ".join(filtered_q_lines).strip()
        
        # Clean up double spaces
        q_statement = re.sub(r'\s+', ' ', q_statement)
        
        # Ensure answer exists
        ans_idx = ans_map.get(qnum, 0)
        
        questions.append({
            "n": str(qnum),
            "subCode": sub_code,
            "q": f"[{qnum}] {q_statement}",
            "o": options,
            "a": ans_idx
        })
        
    print(f"Successfully parsed {len(questions)} questions.")
    print("Sample Q1:", questions[0])
    print("Sample Q500:", questions[499])
    return questions

pdf_simp = r"C:\Users\kiran\.gemini\antigravity\brain\8b2cb6d0-d433-4745-aa09-76914f5a7d06\.user_uploaded\media_1794480276676_58baddd4.pdf"
pdf_approx = r"C:\Users\kiran\.gemini\antigravity\brain\8b2cb6d0-d433-4745-aa09-76914f5a7d06\.user_uploaded\media_1794480276687_7a004628.pdf"

simp_qs = parse_pdf(pdf_simp, False)
approx_qs = parse_pdf(pdf_approx, True)

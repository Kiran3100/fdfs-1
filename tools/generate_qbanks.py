import fitz
import json
import re

def parse_full_pdf(pdf_path, prefix, title_prefix):
    doc = fitz.open(pdf_path)
    total_pages = len(doc)
    print(f"Opening {pdf_path}: {total_pages} pages")
    
    # 1. Parse Answer Keys from pages 500..504
    ans_map = {}
    option_letter_to_idx = {'A': 0, 'B': 1, 'C': 2, 'D': 3, 'E': 4}
    
    for pno in range(500, min(505, total_pages)):
        text = doc[pno].get_text("text")
        matches = re.findall(r'Q(\d+)\s*[\n\r\t ]+([A-E])', text)
        for qn, ans in matches:
            ans_map[int(qn)] = option_letter_to_idx[ans]
            
    print(f"Extracted {len(ans_map)} answers.")
    assert len(ans_map) == 500, f"Expected 500 answers, got {len(ans_map)}"
    
    # 2. Parse Questions from pages 0..499
    questions = []
    
    for pno in range(500):
        qnum = pno + 1
        page = doc[pno]
        text = page.get_text("text").strip()
        lines = [l.strip() for l in text.split('\n') if l.strip()]
        
        opt_indices = {}
        for opt_let in ['A', 'B', 'C', 'D', 'E']:
            found_idx = -1
            for idx, line in enumerate(lines):
                if line == f"({opt_let})":
                    found_idx = idx
                    break
            opt_indices[opt_let] = found_idx
            
        all_opts_found = all(opt_indices[k] != -1 for k in ['A', 'B', 'C', 'D', 'E'])
        if not all_opts_found:
            raise ValueError(f"Could not find all options on page {pno} (Q{qnum}): {lines}")
            
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
            
        first_opt_idx = opt_indices['A']
        q_lines = lines[:first_opt_idx]
        
        sub_code = ""
        filtered_q_lines = []
        for ql in q_lines:
            sub_m = re.match(r'^\((\d+\([A-Za-z]\))\)$', ql)
            if sub_m:
                sub_code = sub_m.group(1)
            else:
                filtered_q_lines.append(ql)
                
        raw_statement = " ".join(filtered_q_lines).strip()
        # Clean up leading "Q1. ", "Q123. ", etc. if present
        clean_stmt = re.sub(r'^Q\d+\.\s*', '', raw_statement)
        clean_stmt = re.sub(r'\s+', ' ', clean_stmt).strip()
        
        ans_idx = ans_map[qnum]
        
        # Display number: if sub_code exists (e.g. 1(A)), use f"{qnum} ({sub_code})", or just str(qnum)
        # Let's check: n can be str(qnum) or sub_code
        # With n = str(qnum), questions are 1 to 500 sequentially!
        questions.append({
            "n": str(qnum),
            "subCode": sub_code,
            "q": clean_stmt,
            "o": options,
            "a": ans_idx
        })
        
    return questions

pdf_simp = r"C:\Users\kiran\.gemini\antigravity\brain\8b2cb6d0-d433-4745-aa09-76914f5a7d06\.user_uploaded\media_1794480276676_58baddd4.pdf"
pdf_approx = r"C:\Users\kiran\.gemini\antigravity\brain\8b2cb6d0-d433-4745-aa09-76914f5a7d06\.user_uploaded\media_1794480276687_7a004628.pdf"

simp_questions = parse_full_pdf(pdf_simp, "simp", "Simplification")
approx_questions = parse_full_pdf(pdf_approx, "approx", "Approximation")

# 1. Write Simplification files
# Master bank: 500 questions
with open(r"d:\bp\data\arithmetic\simplification-1.js", "w", encoding="utf-8") as f:
    f.write('window.QBANK = window.QBANK || {};\n')
    f.write('QBANK["simplification-1"] = ' + json.dumps(simp_questions, indent=2, ensure_ascii=False) + ';\n')
print("Wrote d:\\bp\\data\\arithmetic\\simplification-1.js (500 Qs)")

# 5 Sets for Simplification: 1-100, 101-200, 201-300, 301-400, 401-500
for s_idx in range(5):
    set_num = s_idx + 1
    start_q = s_idx * 100
    end_q = start_q + 100
    subset = simp_questions[start_q:end_q]
    set_id = f"simp-set{set_num}"
    out_file = rf"d:\bp\data\arithmetic\simplification-set{set_num}.js"
    with open(out_file, "w", encoding="utf-8") as f:
        f.write('window.QBANK = window.QBANK || {};\n')
        f.write(f'QBANK["{set_id}"] = ' + json.dumps(subset, indent=2, ensure_ascii=False) + ';\n')
    print(f"Wrote {out_file} ({len(subset)} Qs)")

# 2. Write Approximation files
# Master bank: 500 questions
with open(r"d:\bp\data\arithmetic\approximation-1.js", "w", encoding="utf-8") as f:
    f.write('window.QBANK = window.QBANK || {};\n')
    f.write('QBANK["approximation-1"] = ' + json.dumps(approx_questions, indent=2, ensure_ascii=False) + ';\n')
print("Wrote d:\\bp\\data\\arithmetic\\approximation-1.js (500 Qs)")

# 5 Sets for Approximation: 1-100, 101-200, 201-300, 301-400, 401-500
for s_idx in range(5):
    set_num = s_idx + 1
    start_q = s_idx * 100
    end_q = start_q + 100
    subset = approx_questions[start_q:end_q]
    set_id = f"approx-set{set_num}"
    out_file = rf"d:\bp\data\arithmetic\approximation-set{set_num}.js"
    with open(out_file, "w", encoding="utf-8") as f:
        f.write('window.QBANK = window.QBANK || {};\n')
        f.write(f'QBANK["{set_id}"] = ' + json.dumps(subset, indent=2, ensure_ascii=False) + ';\n')
    print(f"Wrote {out_file} ({len(subset)} Qs)")

print("ALL FILES GENERATED SUCCESSFULLY!")

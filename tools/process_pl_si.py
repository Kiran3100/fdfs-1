import fitz
import os
import json
import re

def process_topic(pdf_path, js_bank_path, output_img_dir, qbank_key, out_js_path):
    os.makedirs(output_img_dir, exist_ok=True)
    doc = fitz.open(pdf_path)
    
    questions = []
    for p_num in range(len(doc)):
        page = doc[p_num]
        il = page.get_images()
        items = []
        for img in il:
            xref = img[0]
            r = page.get_image_rects(xref)[0]
            pix = fitz.Pixmap(doc, xref)
            sample = pix.pixel(pix.width // 2, min(5, pix.height - 1))
            avg = sum(sample[:3]) / 3
            items.append({
                'xref': xref,
                'rect': r,
                'dark': avg < 60 and r.height < 75,
                'avg': avg
            })
        items.sort(key=lambda x: x['rect'].y0)
        
        curr_q = None
        for it in items:
            if it['dark']:
                if curr_q:
                    questions.append(curr_q)
                curr_q = {'page': p_num, 'banner': it, 'contents': []}
            else:
                if curr_q is not None:
                    curr_q['contents'].append(it)
        if curr_q:
            questions.append(curr_q)
            
    print(f"Total {len(questions)} questions found in {pdf_path}")
    
    # Crop solution part only (excluding top dark question banner)
    for i, q in enumerate(questions):
        p_num = q['page']
        page = doc[p_num]
        
        c_y0 = min(c['rect'].y0 for c in q['contents']) if q['contents'] else q['banner']['rect'].y1 + 4.0
        c_y1 = max(c['rect'].y1 for c in q['contents']) if q['contents'] else q['banner']['rect'].y1 + 100.0
        c_x1 = max(c['rect'].x1 for c in q['contents']) if q['contents'] else 528.0
        
        # Start strictly below the dark banner
        min_y = max(q['banner']['rect'].y1 + 1.0, c_y0 - 2.0)
        max_y = c_y1 + 4.0
        min_x = 68.0
        max_x = max(528.0, c_x1 + 6.0)
        
        clip = fitz.Rect(min_x, min_y, max_x, max_y)
        pix = page.get_pixmap(clip=clip, dpi=180)
        filename = f"q_{i+1}_a.png"
        filepath = os.path.join(output_img_dir, filename)
        pix.save(filepath)
    print(f"Cropped {len(questions)} solution images to {output_img_dir}")
    
    # Build JS data file
    with open(js_bank_path, 'r', encoding='utf-8') as f:
        js_text = f.read()
    m = re.search(r'QBANK\[["\']([^"\']+)["\']\]\s*=\s*(\[[\s\S]*\]);?', js_text)
    if not m:
        raise Exception(f"Failed to parse QBANK from {js_bank_path}")
    raw_data = json.loads(m.group(2))
    
    part_a_qs = []
    idx = 1
    rel_img_dir = output_img_dir.replace('d:/bp/', '').replace('d:\\bp\\', '').replace('\\', '/')
    for item in raw_data:
        n = item.get('n', '')
        if n.endswith('(A)') or re.match(r'^\d+\(A\)$', n):
            if idx <= len(questions):
                new_item = {
                    'n': n,
                    'q': item.get('q', ''),
                    'o': item.get('o', []),
                    'a': item.get('a', 0),
                    'ansImg': f"{rel_img_dir}/q_{idx}_a.png"
                }
                part_a_qs.append(new_item)
                idx += 1
                
    out_content = f'window.QBANK=window.QBANK||{{}};QBANK["{qbank_key}"]=' + json.dumps(part_a_qs, indent=2) + ';\n'
    with open(out_js_path, 'w', encoding='utf-8') as f:
        f.write(out_content)
    print(f"Saved {len(part_a_qs)} questions to {out_js_path}")

# 1. Process Profit & Loss (40 Qs)
process_topic(
    pdf_path=r'C:\Users\kiran\.gemini\antigravity\brain\bc054a57-43c7-417b-a328-9a65f7ac67da\.user_uploaded\media_1794319440619_09959134.pdf',
    js_bank_path=r'd:\bp\data\arithmetic\profit-loss-1.js',
    output_img_dir=r'd:\bp\images\questions\profit_loss_part_a',
    qbank_key='pl-part-a',
    out_js_path=r'd:\bp\data\arithmetic\profit-loss-part-a.js'
)

# 2. Process Simple Interest (20 Qs)
process_topic(
    pdf_path=r'C:\Users\kiran\.gemini\antigravity\brain\bc054a57-43c7-417b-a328-9a65f7ac67da\.user_uploaded\media_1794319440619_3752c736.pdf',
    js_bank_path=r'd:\bp\data\arithmetic\simple-interest-1.js',
    output_img_dir=r'd:\bp\images\questions\simple_interest_part_a',
    qbank_key='si-part-a',
    out_js_path=r'd:\bp\data\arithmetic\simple-interest-part-a.js'
)

print("Both Profit & Loss and Simple Interest processed successfully!")

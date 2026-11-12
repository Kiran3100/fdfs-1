import fitz
from PIL import Image
import os
import io

PDF_PATH = r"C:\Users\kiran\.gemini\antigravity\brain\bc054a57-43c7-417b-a328-9a65f7ac67da\.user_uploaded\media_1794395024717_d28dc7f2.pdf"
OUT_IMG_DIR = r"d:\bp\images\questions\basic_maths_part_a"
os.makedirs(OUT_IMG_DIR, exist_ok=True)

doc = fitz.open(PDF_PATH)
print("Processing PDF with", len(doc), "pages")

DPI = 200
scale = DPI / 72.0

# Questions 9(A) and 10(A) on page 3 (index 2):
# Page 3 banners in PDF:
# Banner 0: "Find the sum of odd numbers up to 35 ?" -> 10(A)
# Banner 1: "Find the sum of first 30 odd numbers ?" -> 9(A)
# Banner 2: "Find the sum of odd numbers from 25 to 75 ?" -> 11(A)
# Banner 3: "Find the sum of two digit odd numbers ?" -> 12(A)
# So on page 3, we map banner 0 -> 10(A), banner 1 -> 9(A), banner 2 -> 11(A), banner 3 -> 12(A)!

# Let's verify by extracting banners per page
page_crops = {}

for pno in range(len(doc)):
    page = doc[pno]
    pix = page.get_pixmap(dpi=DPI)
    page_img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    pw, ph = page_img.size
    
    banners = []
    for item in page.get_images():
        xref = item[0]
        rect = page.get_image_rects(xref)[0]
        img_dict = doc.extract_image(xref)
        pil_im = Image.open(io.BytesIO(img_dict['image']))
        tl = pil_im.getpixel((0, 0))
        if tl[0] < 50 and tl[1] < 50 and tl[2] < 50:
            banners.append(rect)
            
    banners.sort(key=lambda r: r.y0)
    print(f"Page {pno+1}: {len(banners)} banners")
    
    crops_for_page = []
    for i, b_rect in enumerate(banners):
        y_top = int(b_rect.y1 * scale) + 2
        if i + 1 < len(banners):
            y_bot = int(banners[i+1].y0 * scale) - 2
        else:
            y_bot = ph - int(25 * scale)
            
        sol_crop = page_img.crop((int(50 * scale), y_top, int(page.rect.width * scale) - int(30 * scale), y_bot))
        
        # Trim white borders
        gray = sol_crop.convert("L")
        inv = gray.point(lambda p: 255 if p < 240 else 0)
        bbox = inv.getbbox()
        if bbox:
            pad = int(10 * scale / 2)
            left = max(0, bbox[0] - pad)
            top = max(0, bbox[1] - pad)
            right = min(sol_crop.width, bbox[2] + pad)
            bottom = min(sol_crop.height, bbox[3] + pad)
            trimmed = sol_crop.crop((left, top, right, bottom))
        else:
            trimmed = sol_crop
            
        crops_for_page.append(trimmed)
        
    page_crops[pno] = crops_for_page

# Now map crops to Q1 through Q25
# Page 1: Q1, Q2, Q3, Q4
# Page 2: Q5, Q6, Q7, Q8
# Page 3: Banner 0 is Q10, Banner 1 is Q9, Banner 2 is Q11, Banner 3 is Q12
# Page 4: Q13, Q14, Q15, Q16
# Page 5: Q17, Q18, Q19, Q20
# Page 6: Q21, Q22, Q23
# Page 7: Q24, Q25

q_mapping = {}
# Page 1
q_mapping[1] = page_crops[0][0]
q_mapping[2] = page_crops[0][1]
q_mapping[3] = page_crops[0][2]
q_mapping[4] = page_crops[0][3]

# Page 2
q_mapping[5] = page_crops[1][0]
q_mapping[6] = page_crops[1][1]
q_mapping[7] = page_crops[1][2]
q_mapping[8] = page_crops[1][3]

# Page 3
q_mapping[9] = page_crops[2][1]   # first 30 odd numbers
q_mapping[10] = page_crops[2][0]  # odd numbers up to 35
q_mapping[11] = page_crops[2][2]  # odd numbers from 25 to 75
q_mapping[12] = page_crops[2][3]  # two digit odd numbers

# Page 4
q_mapping[13] = page_crops[3][0]
q_mapping[14] = page_crops[3][1]
q_mapping[15] = page_crops[3][2]
q_mapping[16] = page_crops[3][3]

# Page 5
q_mapping[17] = page_crops[4][0]
q_mapping[18] = page_crops[4][1]
q_mapping[19] = page_crops[4][2]
q_mapping[20] = page_crops[4][3]

# Page 6
q_mapping[21] = page_crops[5][0]
q_mapping[22] = page_crops[5][1]
q_mapping[23] = page_crops[5][2]

# Page 7
q_mapping[24] = page_crops[6][0]
q_mapping[25] = page_crops[6][1]

for q_idx in range(1, 26):
    img = q_mapping[q_idx]
    out_file = os.path.join(OUT_IMG_DIR, f"q_{q_idx}_a.png")
    img.save(out_file)
    print(f"Saved Q{q_idx} -> {out_file} (size: {img.size})")

print("All 25 Basic Maths solutions extracted and saved strictly in sequential order (1(A) to 25(A))!")

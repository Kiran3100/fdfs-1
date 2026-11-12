import fitz
from PIL import Image
import os
import io

PDF_PATH = r"C:\Users\kiran\.gemini\antigravity\brain\bc054a57-43c7-417b-a328-9a65f7ac67da\.user_uploaded\media_1794416028318_88a8d4ea.pdf"
OUT_IMG_DIR = r"d:\bp\images\questions\time_work_part_a"
OUT_IMP_DIR = r"d:\bp\images\questions\time_work_important_points"
os.makedirs(OUT_IMG_DIR, exist_ok=True)
os.makedirs(OUT_IMP_DIR, exist_ok=True)

doc = fitz.open(PDF_PATH)
print("Total pages:", len(doc))

DPI = 200
scale = DPI / 72.0

# 1. Render Important Points pages (Pages 1 to 9)
for pno in range(9):
    page = doc[pno]
    pix = page.get_pixmap(dpi=DPI)
    out_path = os.path.join(OUT_IMP_DIR, f"important_points_p{pno+1}.png")
    pix.save(out_path)
    print(f"Saved Important Points P{pno+1} -> {out_path}")

# 2. Extract Questions 1(A) to 35(A) from Pages 10 to 24 (pno 9 to 23)
q_crops = []

for pno in range(9, len(doc)):
    page = doc[pno]
    pix = page.get_pixmap(dpi=DPI)
    page_img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    pw, ph = page_img.size
    
    # Identify banners by checking each embedded image
    banners = []
    for item in page.get_images():
        xref = item[0]
        rect = page.get_image_rects(xref)[0]
        img_dict = doc.extract_image(xref)
        pil_im = Image.open(io.BytesIO(img_dict["image"]))
        tl = pil_im.getpixel((0, 0))
        # Banner is dark
        if tl[0] < 50 and tl[1] < 50 and tl[2] < 50:
            banners.append(rect)
            
    banners.sort(key=lambda r: r.y0)
    print(f"Page {pno+1}: {len(banners)} banners found")
    
    for i, b_rect in enumerate(banners):
        y_top = int(b_rect.y1 * scale) + 2
        if i + 1 < len(banners):
            y_bot = int(banners[i+1].y0 * scale) - 2
        else:
            y_bot = ph - int(25 * scale)
            
        sol_crop = page_img.crop((int(50 * scale), y_top, int(page.rect.width * scale) - int(30 * scale), y_bot))
        
        # Trim white margins
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
            
        q_crops.append(trimmed)

print(f"Total extracted question crops: {len(q_crops)}")
assert len(q_crops) == 35, f"Expected 35 crops, got {len(q_crops)}"

for idx, img in enumerate(q_crops, 1):
    out_file = os.path.join(OUT_IMG_DIR, f"q_{idx}_a.png")
    img.save(out_file)
    print(f"Saved Q{idx}(A) -> {out_file} (size: {img.size})")

print("All 35 Time and Work solutions extracted successfully!")

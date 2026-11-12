import fitz
from PIL import Image
import os
import io

PDF_PATH = r"C:\Users\kiran\.gemini\antigravity\brain\bc054a57-43c7-417b-a328-9a65f7ac67da\.user_uploaded\media_1794375205006_7c06eaee.pdf"
OUT_IMG_DIR = r"d:\bp\images\questions\ratio_proportion_part_a"
OUT_IMP_DIR = r"d:\bp\images\questions\ratio_proportion_important_points"
os.makedirs(OUT_IMG_DIR, exist_ok=True)
os.makedirs(OUT_IMP_DIR, exist_ok=True)

doc = fitz.open(PDF_PATH)
print("Processing PDF with", len(doc), "pages")

# Render Page 1 (Important Points) at high DPI (200 dpi)
p1 = doc[0]
pix1 = p1.get_pixmap(dpi=200)
imp_path = os.path.join(OUT_IMP_DIR, "important_points.png")
pix1.save(imp_path)
print("Page 1 saved to:", imp_path)

# Render pages 2-10 at DPI = 200 (scale = 200 / 72.0)
DPI = 200
scale = DPI / 72.0

q_num = 0

for pno in range(1, len(doc)):
    page = doc[pno]
    pix = page.get_pixmap(dpi=DPI)
    page_img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    pw, ph = page_img.size
    
    # Identify banners by checking each embedded image
    il = page.get_images()
    banners = []
    for item in il:
        xref = item[0]
        rect = page.get_image_rects(xref)[0]
        img_dict = doc.extract_image(xref)
        pil_im = Image.open(io.BytesIO(img_dict['image']))
        top_left = pil_im.getpixel((0, 0))
        if top_left[0] < 50 and top_left[1] < 50 and top_left[2] < 50:
            banners.append(rect)
    
    # Sort banners by vertical coordinate y0
    banners.sort(key=lambda r: r.y0)
    print(f"Page {pno+1}: {len(banners)} banners")
    
    for i, b_rect in enumerate(banners):
        q_num += 1
        # Top of solution is right below the banner
        y_top = int(b_rect.y1 * scale) + 2
        # Bottom of solution is right before next banner (or page bottom)
        if i + 1 < len(banners):
            y_bot = int(banners[i+1].y0 * scale) - 2
        else:
            y_bot = ph - int(25 * scale)
        
        # Crop the solution area
        sol_crop = page_img.crop((int(50 * scale), y_top, int(page.rect.width * scale) - int(30 * scale), y_bot))
        
        # Auto-trim blank / white margin around the solution
        # Background is close to white (>= 245)
        # Find non-white bbox
        gray = sol_crop.convert("L")
        # Invert so content is bright
        inv = gray.point(lambda p: 255 if p < 240 else 0)
        bbox = inv.getbbox()
        if bbox:
            # Add small padding
            pad = int(10 * scale / 2)
            left = max(0, bbox[0] - pad)
            top = max(0, bbox[1] - pad)
            right = min(sol_crop.width, bbox[2] + pad)
            bottom = min(sol_crop.height, bbox[3] + pad)
            trimmed = sol_crop.crop((left, top, right, bottom))
        else:
            trimmed = sol_crop
            
        out_name = f"q_{q_num}_a.png"
        out_path = os.path.join(OUT_IMG_DIR, out_name)
        trimmed.save(out_path)
        print(f"  Saved Q{q_num} -> {out_name} (size: {trimmed.size})")

print(f"\nAll done! Extracted {q_num} questions.")

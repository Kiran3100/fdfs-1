import fitz  # PyMuPDF
from PIL import Image
import os
import re
import json

PDF_PATH = r"C:\Users\kiran\.gemini\antigravity\brain\bc054a57-43c7-417b-a328-9a65f7ac67da\.user_uploaded\media_1794375205006_7c06eaee.pdf"
OUT_IMG_DIR = r"d:\bp\images\questions\ratio_proportion_part_a"
OUT_IMP_DIR = r"d:\bp\images\questions\ratio_proportion_important_points"
os.makedirs(OUT_IMG_DIR, exist_ok=True)
os.makedirs(OUT_IMP_DIR, exist_ok=True)

doc = fitz.open(PDF_PATH)
print("Total pages:", len(doc))

# 1. Process Page 1: Important Points
page1 = doc[0]
pix1 = page1.get_pixmap(dpi=200)
imp_img_path = os.path.join(OUT_IMP_DIR, "important_points.png")
pix1.save(imp_img_path)
print("Saved important points:", imp_img_path)

# Let's inspect dark banners on pages 2-10 (pages index 1 to 9)
# In previous scripts:
# pix = page.get_pixmap(dpi=150)
# find dark rectangles where width > pix.width * 0.7 and color is dark
DPI = 150
questions_extracted = []

for page_idx in range(1, len(doc)):
    page = doc[page_idx]
    pix = page.get_pixmap(dpi=DPI)
    img = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)
    
    # Analyze horizontal bands for dark banners
    # Question banners have black/dark blue background across most of the width
    w, h = img.size
    
    # We can detect banner y-ranges by scanning row average lightness
    # or inspecting drawings/rects from PyMuPDF
    rects = page.get_drawings()
    dark_rects = []
    for r in rects:
        # Check if rect has fill color and is wide
        fill = r.get("fill")
        rect = r.get("rect")
        if fill and rect:
            # fill is rgb tuple 0-1
            brightness = (fill[0] + fill[1] + fill[2]) / 3.0
            if brightness < 0.25 and (rect.x1 - rect.x0) > (page.rect.width * 0.7):
                dark_rects.append(rect)
    
    # If no drawing rect found or different format, fallback to pixel scanning
    if not dark_rects:
        print(f"Page {page_idx+1}: scanning pixels for dark banner...")
        # Pixel scanning
        gray = img.convert("L")
        dark_rows = []
        for y in range(h):
            # Sample across middle 80%
            row_pixels = [gray.getpixel((x, y)) for x in range(int(w*0.1), int(w*0.9), 5)]
            avg = sum(row_pixels) / len(row_pixels)
            if avg < 50:
                dark_rows.append(y)
        
        # Group contiguous dark rows into banners
        banners = []
        if dark_rows:
            start = dark_rows[0]
            prev = start
            for y in dark_rows[1:]:
                if y == prev + 1:
                    prev = y
                else:
                    if (prev - start) > 15: # at least 15px tall
                        banners.append((start, prev))
                    start = y
                    prev = y
            if (prev - start) > 15:
                banners.append((start, prev))
        
        print(f"Page {page_idx+1}: Found {len(banners)} banners via pixel scan: {banners}")
        # Crop each question solution
        # Solution for banner i starts right after banner i ends, and ends at banner i+1 start (or bottom of page)
        for i, (b_top, b_bot) in enumerate(banners):
            sol_top = b_bot + 4 # skip the banner completely
            if i + 1 < len(banners):
                sol_bot = banners[i+1][0] - 4
            else:
                sol_bot = h - 20
            
            # Crop image
            # Also find content bottom inside sol_top..sol_bot to avoid excessive whitespace
            sol_img = img.crop((0, sol_top, w, sol_bot))
            questions_extracted.append((page_idx, sol_img))
    else:
        # Sort dark rects by y0
        dark_rects.sort(key=lambda r: r.y0)
        # Deduplicate overlapping
        unique_rects = []
        for r in dark_rects:
            if not unique_rects or (r.y0 - unique_rects[-1].y0) > 20:
                unique_rects.append(r)
        
        print(f"Page {page_idx+1}: Found {len(unique_rects)} banners via vector rects")
        scale = DPI / 72.0
        for i, r in enumerate(unique_rects):
            b_bot = int(r.y1 * scale)
            sol_top = b_bot + 4
            if i + 1 < len(unique_rects):
                sol_bot = int(unique_rects[i+1].y0 * scale) - 4
            else:
                sol_bot = h - 20
            sol_img = img.crop((0, sol_top, w, sol_bot))
            questions_extracted.append((page_idx, sol_img))

print(f"Total extracted questions: {len(questions_extracted)}")

# Save each question image
for idx, (p_idx, q_img) in enumerate(questions_extracted, 1):
    out_file = os.path.join(OUT_IMG_DIR, f"q_{idx}_a.png")
    # Trim top/bottom white border
    q_img.save(out_file)
    print(f"Saved Q{idx} -> {out_file} (size {q_img.size})")

print("Processing complete!")

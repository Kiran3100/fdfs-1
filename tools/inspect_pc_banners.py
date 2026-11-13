import fitz
from PIL import Image
import os
import io

PDF_PATH = r"C:\Users\kiran\.gemini\antigravity\brain\bc054a57-43c7-417b-a328-9a65f7ac67da\.user_uploaded\media_1794477023998_87e52c35.pdf"
doc = fitz.open(PDF_PATH)

for pno in range(len(doc)):
    page = doc[pno]
    il = page.get_images()
    print(f"\n--- Page {pno+1} ({len(il)} images) ---")
    banners = []
    for idx, item in enumerate(il):
        xref = item[0]
        rect = page.get_image_rects(xref)[0]
        img_dict = doc.extract_image(xref)
        pil_im = Image.open(io.BytesIO(img_dict["image"]))
        tl = pil_im.getpixel((0,0))
        is_banner = (tl[0] < 50 and tl[1] < 50 and tl[2] < 50)
        if is_banner:
            banners.append((rect, xref, img_dict["width"], img_dict["height"]))
            print(f"  Banner {len(banners)}: rect={rect}, size=({img_dict['width']}x{img_dict['height']})")

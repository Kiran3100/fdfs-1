import fitz
from PIL import Image
import io

PDF_PATH = r"C:\Users\kiran\.gemini\antigravity\brain\bc054a57-43c7-417b-a328-9a65f7ac67da\.user_uploaded\media_1794416028318_88a8d4ea.pdf"
doc = fitz.open(PDF_PATH)
for i in range(9):
    p = doc[i]
    il = p.get_images()
    print(f"Page {i+1} has {len(il)} images:")
    for item in il:
        xref = item[0]
        rect = p.get_image_rects(xref)[0]
        img_dict = doc.extract_image(xref)
        pil_im = Image.open(io.BytesIO(img_dict["image"]))
        tl = pil_im.getpixel((0,0))
        is_banner = (tl[0] < 50 and tl[1] < 50 and tl[2] < 50)
        print(f"   xref {xref}: rect {rect}, size ({img_dict['width']}x{img_dict['height']}), is_banner: {is_banner}")

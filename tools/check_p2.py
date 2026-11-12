import fitz
from PIL import Image
import os
import io

doc = fitz.open(r"C:\Users\kiran\.gemini\antigravity\brain\bc054a57-43c7-417b-a328-9a65f7ac67da\.user_uploaded\media_1794375205006_7c06eaee.pdf")
os.makedirs("d:/bp/tools/dump", exist_ok=True)

# Save page 2 images
p2 = doc[1]
for i, info in enumerate(p2.get_images()):
    xref = info[0]
    img_data = doc.extract_image(xref)
    with open(f"d:/bp/tools/dump/p2_img_{i}_xref{xref}.{img_data['ext']}", "wb") as f:
        f.write(img_data["image"])
    rects = p2.get_image_rects(xref)
    print(f"p2 img {i} xref {xref} rects={rects} size={img_data['width']}x{img_data['height']}")

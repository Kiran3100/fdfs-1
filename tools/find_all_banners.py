import fitz
from PIL import Image

doc = fitz.open(r"C:\Users\kiran\.gemini\antigravity\brain\bc054a57-43c7-417b-a328-9a65f7ac67da\.user_uploaded\media_1794375205006_7c06eaee.pdf")

for pno in range(1, len(doc)):
    page = doc[pno]
    il = page.get_images()
    print(f"\n=== PAGE {pno+1} ===")
    for idx, item in enumerate(il):
        xref = item[0]
        rects = page.get_image_rects(xref)
        img_dict = doc.extract_image(xref)
        w, h = img_dict["width"], img_dict["height"]
        # sample color
        img_bytes = img_dict["image"]
        import io
        pil_im = Image.open(io.BytesIO(img_bytes))
        top_left = pil_im.getpixel((0, 0))
        # check if it is dark banner
        is_banner = (top_left[0] < 50 and top_left[1] < 50 and top_left[2] < 50)
        print(f"  img {idx}: xref={xref}, rect={rects[0]}, size=({w}x{h}), top_left={top_left}, IS_BANNER={is_banner}")

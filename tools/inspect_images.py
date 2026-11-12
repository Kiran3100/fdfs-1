import fitz

doc = fitz.open(r"C:\Users\kiran\.gemini\antigravity\brain\bc054a57-43c7-417b-a328-9a65f7ac67da\.user_uploaded\media_1794375205006_7c06eaee.pdf")
for pno in range(len(doc)):
    page = doc[pno]
    il = page.get_images()
    print(f"--- Page {pno+1} ({len(il)} images) ---")
    for img_info in il:
        xref = img_info[0]
        # Get bounding box on page
        rects = page.get_image_rects(xref)
        base_img = doc.extract_image(xref)
        w = base_img["width"]
        h = base_img["height"]
        ext = base_img["ext"]
        print(f"  xref {xref}: size ({w}x{h}), rects on page: {rects}")

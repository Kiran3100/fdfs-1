import fitz

doc = fitz.open(r"C:\Users\kiran\.gemini\antigravity\brain\bc054a57-43c7-417b-a328-9a65f7ac67da\.user_uploaded\media_1794375205006_7c06eaee.pdf")
for i, page in enumerate(doc):
    imgs = page.get_images(full=True)
    drawings = page.get_drawings()
    print(f"Page {i+1}: {len(imgs)} embedded images, {len(drawings)} drawings")

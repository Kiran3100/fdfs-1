import fitz

def inspect_structure(pdf_path, name):
    print("=" * 60)
    print("Inspecting", name)
    doc = fitz.open(pdf_path)
    print("Total pages:", len(doc))
    # Check pages 500 to 504 (the last 5 pages)
    for pno in range(500, len(doc)):
        text = doc[pno].get_text("text").strip()
        lines = [line.strip() for line in text.split("\n") if line.strip()]
        print(f"Page {pno} title / first 5 lines:", lines[:5])
        print(f"Page {pno} last 5 lines:", lines[-5:])
    
    # Check sample questions from pages 0, 1, 2, 50, 499
    for pno in [0, 1, 2, 50, 499]:
        text = doc[pno].get_text("text").strip()
        lines = [line.strip() for line in text.split("\n") if line.strip()]
        print(f"Question Page {pno}:", lines)

pdf_approx = r"C:\Users\kiran\.gemini\antigravity\brain\8b2cb6d0-d433-4745-aa09-76914f5a7d06\.user_uploaded\media_1794480276687_7a004628.pdf"
pdf_simp = r"C:\Users\kiran\.gemini\antigravity\brain\8b2cb6d0-d433-4745-aa09-76914f5a7d06\.user_uploaded\media_1794480276676_58baddd4.pdf"

inspect_structure(pdf_simp, "SIMPLIFICATION")
inspect_structure(pdf_approx, "APPROXIMATION")

import fitz
import sys

pdf1_path = r"C:\Users\kiran\.gemini\antigravity\brain\8b2cb6d0-d433-4745-aa09-76914f5a7d06\.user_uploaded\media_1794480276687_7a004628.pdf"
pdf2_path = r"C:\Users\kiran\.gemini\antigravity\brain\8b2cb6d0-d433-4745-aa09-76914f5a7d06\.user_uploaded\media_1794480276676_58baddd4.pdf"

print("--- PDF 1 ---")
doc1 = fitz.open(pdf1_path)
print("Page count:", len(doc1))
print("Page 0 text snippet:\n", doc1[0].get_text("text")[:300])
print("Page 501 text snippet:\n", doc1[501].get_text("text")[:300])

print("--- PDF 2 ---")
doc2 = fitz.open(pdf2_path)
print("Page count:", len(doc2))
print("Page 0 text snippet:\n", doc2[0].get_text("text")[:300])
print("Page 501 text snippet:\n", doc2[501].get_text("text")[:300])

import pypdf, re, json

r = pypdf.PdfReader(r'F:\BANK\Reasoning\QUESTION-BOOK-MATERIAL-LAPTOP VERSION\10.Seating_Arrangement_Grouped_by_Direction.pdf')
key_txt = r.pages[-1].extract_text()

# Parse answer key
# Format on page 368:
# Q.No A B C D (multiple columns)
print("Key text sample:")
print(key_txt[:500])

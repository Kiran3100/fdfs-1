import pypdf

r = pypdf.PdfReader(r'F:\BANK\Reasoning\QUESTION-BOOK-MATERIAL-LAPTOP VERSION\10.Seating_Arrangement_Grouped_by_Direction.pdf')
for p in range(10):
    print(f"=== PAGE {p+1} ===")
    print(r.pages[p].extract_text()[:300])

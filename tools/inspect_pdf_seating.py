import pypdf, re

r = pypdf.PdfReader(r'F:\BANK\Reasoning\QUESTION-BOOK-MATERIAL-LAPTOP VERSION\10.Seating_Arrangement_Grouped_by_Direction.pdf')
print(f"Total pages: {len(r.pages)}")

# Sample page headers
headers = []
for i in range(len(r.pages) - 1):
    txt = r.pages[i].extract_text()
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
    if lines:
        headers.append((i+1, lines[0]))

print(f"Total question pages found: {len(headers)}")
for page_num, h in headers[:30]:
    print(f"Page {page_num}: {h}")

print("...")
for page_num, h in headers[-15:]:
    print(f"Page {page_num}: {h}")

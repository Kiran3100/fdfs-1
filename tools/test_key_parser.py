import pypdf
from generate_old_tests import parse_key

r = pypdf.PdfReader(r'F:\BANK\Reasoning\QUESTION-BOOK-MATERIAL-LAPTOP VERSION\10.Seating_Arrangement_Grouped_by_Direction.pdf')
key = parse_key(r.pages[-1].extract_text())
print(f"Total keys parsed: {len(key)}")
print("Sample keys:", list(key.items())[:12])
print("Check 1(A):", key.get('1(A)'))
print("Check 95(C):", key.get('95(C)'))
print("Check 95(D):", key.get('95(D)'))

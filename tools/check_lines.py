with open('js/app.js', 'r', encoding='utf-8') as f:
    js_app = f.read()

with open('app.js', 'r', encoding='utf-8') as f:
    root_app = f.read()

# Normalize empty lines
js_clean = "\n".join([line.strip() for line in js_app.splitlines() if line.strip()])
root_clean = "\n".join([line.strip() for line in root_app.splitlines() if line.strip()])

print("Clean js/app.js lines:", len(js_clean.splitlines()))
print("Clean root app.js lines:", len(root_clean.splitlines()))
print("Are non-blank lines identical?", js_clean == root_clean)
if js_clean != root_clean:
    import difflib
    diff = list(difflib.unified_diff(js_clean.splitlines()[:50], root_clean.splitlines()[:50]))
    print("\n".join(diff[:20]))

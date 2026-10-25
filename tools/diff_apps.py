import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    js_app = f.read()

with open('app.js', 'r', encoding='utf-8') as f:
    root_app = f.read()

print(f"js/app.js len: {len(js_app)}, lines: {len(js_app.splitlines())}")
print(f"root app.js len: {len(root_app)}, lines: {len(root_app.splitlines())}")

# Let's find what is at the end of root app.js
print("End of js/app.js:")
print("\n".join(js_app.splitlines()[-15:]))
print("---")
print("End of root app.js:")
print("\n".join(root_app.splitlines()[-15:]))

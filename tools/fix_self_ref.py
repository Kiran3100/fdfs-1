with open('js/mock-test-ui.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Fix self-reference: window.MockTestUI.renderMockExamInterface() won't work inside the IIFE
# before the module is returned. We need to call renderMockExamInterface() directly.
old = "        window.MockTestUI.renderMockExamInterface();"
new = "        renderMockExamInterface();"

if old in code:
    code = code.replace(old, new)
    print("Fixed self-reference issue!")
else:
    print("Target not found:", repr(old))

with open('js/mock-test-ui.js', 'w', encoding='utf-8') as f:
    f.write(code)

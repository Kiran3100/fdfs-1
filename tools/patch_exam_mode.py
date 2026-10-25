with open('js/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

target = """    // Not on test page — always clear exam mode so sidebar/topbar are visible
    document.body.classList.remove('exam-mode');"""

replacement = """    // Not on test page or mock test page — clear exam mode so sidebar/topbar are visible
    if (page !== 'mock-tests' && page !== 'mock-test') {
      document.body.classList.remove('exam-mode');
    }"""

if target in code:
    code = code.replace(target, replacement)
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print("Successfully patched js/app.js exam-mode clearing!")
else:
    print("Target not found in js/app.js!")

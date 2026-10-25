with open('js/mock-test-ui.js', 'r', encoding='utf-8') as f:
    code = f.read()

target = """      location.hash = '#/mock-tests/active';
      renderMockExamInterface();"""

replacement = """      location.hash = '#/mock-tests/active';"""

if target in code:
    code = code.replace(target, replacement)
    with open('js/mock-test-ui.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print("Fixed double render in startMockExecution!")
else:
    print("Target not found in mock-test-ui.js!")

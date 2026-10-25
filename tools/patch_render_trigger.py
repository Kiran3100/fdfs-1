with open('js/mock-test-ui.js', 'r', encoding='utf-8') as f:
    code = f.read()

target = """      // Set hash and explicitly render (hashchange may not fire if same hash)
      if (location.hash === '#/mock-tests/active') {
        renderMockExamInterface();
      } else {
        location.hash = '#/mock-tests/active';
      }"""

replacement = """      // Update hash and immediately render examination interface
      location.hash = '#/mock-tests/active';
      renderMockExamInterface();"""

if target in code:
    code = code.replace(target, replacement)
    with open('js/mock-test-ui.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print("Updated startMockExecution to always trigger renderMockExamInterface directly!")
else:
    print("Target not found!")

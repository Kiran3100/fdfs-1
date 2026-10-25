with open('js/mock-test-ui.js', 'r', encoding='utf-8') as f:
    code = f.read()

target = """                <button class="btn" id="btn-start-mock" ${!isValid ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : 'style="font-size:1.05rem; padding:10px 24px; font-weight:700;"'}>
                  🚀 Start Mock Test
                </button>"""

replacement = """                <button class="btn" id="btn-start-mock" style="font-size:1.05rem; padding:10px 24px; font-weight:700;">
                  🚀 Start Mock Test
                </button>"""

if target in code:
    code = code.replace(target, replacement)
    with open('js/mock-test-ui.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print("Replaced start button in template!")
else:
    print("Target not found in mock-test-ui.js!")

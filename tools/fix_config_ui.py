with open('js/mock-test-ui.js', 'r', encoding='utf-8') as f:
    code = f.read()

# Fix 1: Dark-mode safe chapter item background in config right panel
old_item_style = 'background:var(--bg-canvas,#f8fafc); border-radius:var(--radius-sm); border:1px solid var(--border-color); font-size:0.88rem;'
new_item_style = 'background:var(--bg-secondary,var(--bg-surface)); border-radius:var(--radius-sm); border:1px solid var(--border-color); font-size:0.88rem;'

# Fix 2: Dark-mode safe validation/info box background in config form
old_info_bg = 'background:var(--bg-subtle,#f1f5f9); border-radius:var(--radius-md); margin-bottom:20px; font-size:0.88rem; color:var(--text-secondary);'
new_info_bg = 'background:var(--bg-secondary,var(--bg-tertiary,#1f2937)); border-radius:var(--radius-md); margin-bottom:20px; font-size:0.88rem; color:var(--text-secondary);'

# Fix 3: startMockExecution - call renderMockExamInterface() explicitly after hash change
# because hashchange might not fire if hash is already '#/mock-tests/active'
old_hash_set = "      location.hash = '#/mock-tests/active';\n\n    } catch (err) {"
new_hash_set = """      // Set hash and explicitly render (hashchange may not fire if same hash)
      if (location.hash === '#/mock-tests/active') {
        window.MockTestUI.renderMockExamInterface();
      } else {
        location.hash = '#/mock-tests/active';
      }

    } catch (err) {"""

replacements = [
    (old_item_style, new_item_style),
    (old_info_bg, new_info_bg),
    (old_hash_set, new_hash_set),
]

found = []
not_found = []
for old, new in replacements:
    if old in code:
        code = code.replace(old, new)
        found.append(old[:60])
    else:
        not_found.append(old[:60])

with open('js/mock-test-ui.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Replaced:", len(found))
for x in found:
    print(" OK:", x)
if not_found:
    print("NOT FOUND:")
    for x in not_found:
        print(" MISS:", x)

"""Fix palette rendering to restore plain label (just the number) for non-grouped tests."""

# Also fix the cleanLabel — for plain tests "1","2" etc it becomes "1", "2" (no change needed).
# The key fix: for non-grouped tests, palette grid has no inline style (uses default 5-col CSS)
# For grouped tests, it uses dynamic column count matching actual sub-count.
# Also the cleanLabel: "1(a)" -> "1A", "1" -> "1"  (already correct after replace)

# The palette-btn CSS now has very small font (0.78rem) for grouped tests which is fine,
# but for plain tests the button height 38px looks odd for single digits. Let's make
# the button height 40px again for non-grouped, by adding a CSS class.

old_palette_render = """          <div class="palette-grid" style="${isGroupedTest ? `grid-template-columns: repeat(${maxSubsPerGroup}, 1fr)` : ''}">
            ${S.qs.map((item, idx) => {
              // Format label as "1A", "1B"... (uppercase, no parens/spaces)
              const rawLabel = String(item.n || (idx + 1));
              const cleanLabel = rawLabel.replace(/(\\w+)/g, '$1').toUpperCase();
              return `
                <button class="palette-btn ${idx === S.cur ? 'current' : ''} ${item.sel != null ? 'answered' : ''} ${item.markedForReview ? 'marked' : ''}" data-idx="${idx}" title="Question ${esc(item.n)}">
                  ${cleanLabel}
                </button>
              `;
            }).join('')}"""

# We need to find the exact text in file
with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

import re
# Find the palette-grid div + map block
m = re.search(r'(<div class="palette-grid"[^>]*>)\s*\$\{S\.qs\.map\(.*?const cleanLabel.*?\}\)', content, re.DOTALL)
if m:
    print("Found at:", m.start(), "to", m.end())
    print(repr(content[m.start():m.start()+400]))
else:
    print("NOT FOUND - searching differently")
    idx = content.find('<div class="palette-grid"')
    print(repr(content[idx:idx+400]))

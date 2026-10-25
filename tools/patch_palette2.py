with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

pos = 105254
end_marker = ".join('')}"
end_pos = content.find(end_marker, pos) + len(end_marker)

old_block = content[pos:end_pos]

new_block = """<div class="palette-grid ${isGroupedTest ? 'palette-grouped' : ''}"\n              style="${isGroupedTest ? `grid-template-columns: repeat(${maxSubsPerGroup}, 1fr)` : ''}">
            ${S.qs.map((item, idx) => {
              // For grouped: "1(a)" -> "1A", for plain: "1" -> "1"
              const rawLabel = String(item.n || (idx + 1));
              const cleanLabel = rawLabel.replace(/\\((\\w+)\\)/g, '$1').toUpperCase();
              return `
                <button class="palette-btn ${idx === S.cur ? 'current' : ''} ${item.sel != null ? 'answered' : ''} ${item.markedForReview ? 'marked' : ''}" data-idx="${idx}" title="Question ${esc(item.n)}">
                  ${cleanLabel}
                </button>
              `;
            }).join('')}"""

if old_block in content:
    content = content.replace(old_block, new_block, 1)
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Patched successfully")
else:
    print("Not found - trying byte-based replace")
    content2 = content[:pos] + new_block + content[end_pos:]
    with open('js/app.js', 'w', encoding='utf-8') as f:
        f.write(content2)
    print("Byte-based replace done")

"""Patch getTestQuestionInfo to correctly detect sub-letter grouping."""

old = """      // If no natural sub-parts, group every 4 questions into 1 main question
      const mainCount = Math.ceil(bank.length / 4);
      return { isGrouped: true, mainCount: mainCount, rawCount: bank.length, autoGrouped: true };
    }

    const raw = testConfig.count || 0;
    const mainCount = Math.ceil(raw / 4);
    return { isGrouped: true, mainCount: mainCount, rawCount: raw, autoGrouped: true };"""

new = """      // If no natural sub-parts, group every 5 questions into 1 main question
      const mainCount = Math.ceil(bank.length / 5);
      return { isGrouped: true, mainCount: mainCount, rawCount: bank.length, autoGrouped: true };
    }

    const raw = testConfig.count || 0;
    const mainCount = Math.ceil(raw / 5);
    return { isGrouped: true, mainCount: mainCount, rawCount: raw, autoGrouped: true };"""

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

if old in content:
    content = content.replace(old, new, 1)
    print("Patch getTestQuestionInfo: 4->5 grouping applied")
else:
    print("ERROR: target not found")

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done.")

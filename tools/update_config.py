import re

config_path = r"d:\bp\data\config.js"
with open(config_path, "r", encoding="utf-8") as f:
    content = f.read()

content = content.replace("\r\n", "\n")

# 1. Update topics list in arithmetic: rename num: 21 to 'Simplification and Approximation'
old_topic = "{ id: 'approximation', num: 21, name: 'Approximation', category: 'Calculation', filePdf: '21.approximation.pdf' },"
new_topic = "{ id: 'approximation', num: 21, name: 'Simplification and Approximation', category: 'Calculation', filePdf: '21.approximation.pdf' },"

assert old_topic in content, "Could not find old_topic in config.js"
content = content.replace(old_topic, new_topic, 1)

# 2. Find and replace approximation-1 block
old_pattern = r"    \{\n      id: 'approximation-1',[\s\S]*?marking: \{ correct: 1, wrong: 0 \}\n    \},"

new_test_block = """    {
      id: 'simplification-1',
      subject: 'arithmetic',
      topic: 'approximation',
      name: 'Simplification - Question Bank (500 Qs)',
      source: '500_Simplification_Questions_with_Answer_Key.pdf',
      file: 'data/arithmetic/simplification-1.js',
      count: 500,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'simp-set1',
      subject: 'arithmetic',
      topic: 'approximation',
      name: 'Simplification - Set 1 (Q1 to Q100)',
      source: 'Simplification Set 1 (100 Qs)',
      file: 'data/arithmetic/simplification-set1.js',
      count: 100,
      marking: { correct: 1, wrong: 0 },
      isChapterSet: true,
      setName: 'Simplification Set 1 (Q1-Q100)'
    },
    {
      id: 'simp-set2',
      subject: 'arithmetic',
      topic: 'approximation',
      name: 'Simplification - Set 2 (Q101 to Q200)',
      source: 'Simplification Set 2 (100 Qs)',
      file: 'data/arithmetic/simplification-set2.js',
      count: 100,
      marking: { correct: 1, wrong: 0 },
      isChapterSet: true,
      setName: 'Simplification Set 2 (Q101-Q200)'
    },
    {
      id: 'simp-set3',
      subject: 'arithmetic',
      topic: 'approximation',
      name: 'Simplification - Set 3 (Q201 to Q300)',
      source: 'Simplification Set 3 (100 Qs)',
      file: 'data/arithmetic/simplification-set3.js',
      count: 100,
      marking: { correct: 1, wrong: 0 },
      isChapterSet: true,
      setName: 'Simplification Set 3 (Q201-Q300)'
    },
    {
      id: 'simp-set4',
      subject: 'arithmetic',
      topic: 'approximation',
      name: 'Simplification - Set 4 (Q301 to Q400)',
      source: 'Simplification Set 4 (100 Qs)',
      file: 'data/arithmetic/simplification-set4.js',
      count: 100,
      marking: { correct: 1, wrong: 0 },
      isChapterSet: true,
      setName: 'Simplification Set 4 (Q301-Q400)'
    },
    {
      id: 'simp-set5',
      subject: 'arithmetic',
      topic: 'approximation',
      name: 'Simplification - Set 5 (Q401 to Q500)',
      source: 'Simplification Set 5 (100 Qs)',
      file: 'data/arithmetic/simplification-set5.js',
      count: 100,
      marking: { correct: 1, wrong: 0 },
      isChapterSet: true,
      setName: 'Simplification Set 5 (Q401-Q500)'
    },
    {
      id: 'approximation-1',
      subject: 'arithmetic',
      topic: 'approximation',
      name: 'Approximation - Question Bank (500 Qs)',
      source: '500_Simplification_Approximation_Questions_with_Answer_Key.pdf',
      file: 'data/arithmetic/approximation-1.js',
      count: 500,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'approx-set1',
      subject: 'arithmetic',
      topic: 'approximation',
      name: 'Approximation - Set 1 (Q1 to Q100)',
      source: 'Approximation Set 1 (100 Qs)',
      file: 'data/arithmetic/approximation-set1.js',
      count: 100,
      marking: { correct: 1, wrong: 0 },
      isChapterSet: true,
      setName: 'Approximation Set 1 (Q1-Q100)'
    },
    {
      id: 'approx-set2',
      subject: 'arithmetic',
      topic: 'approximation',
      name: 'Approximation - Set 2 (Q101 to Q200)',
      source: 'Approximation Set 2 (100 Qs)',
      file: 'data/arithmetic/approximation-set2.js',
      count: 100,
      marking: { correct: 1, wrong: 0 },
      isChapterSet: true,
      setName: 'Approximation Set 2 (Q101-Q200)'
    },
    {
      id: 'approx-set3',
      subject: 'arithmetic',
      topic: 'approximation',
      name: 'Approximation - Set 3 (Q201 to Q300)',
      source: 'Approximation Set 3 (100 Qs)',
      file: 'data/arithmetic/approximation-set3.js',
      count: 100,
      marking: { correct: 1, wrong: 0 },
      isChapterSet: true,
      setName: 'Approximation Set 3 (Q201-Q300)'
    },
    {
      id: 'approx-set4',
      subject: 'arithmetic',
      topic: 'approximation',
      name: 'Approximation - Set 4 (Q301 to Q400)',
      source: 'Approximation Set 4 (100 Qs)',
      file: 'data/arithmetic/approximation-set4.js',
      count: 100,
      marking: { correct: 1, wrong: 0 },
      isChapterSet: true,
      setName: 'Approximation Set 4 (Q301-Q400)'
    },
    {
      id: 'approx-set5',
      subject: 'arithmetic',
      topic: 'approximation',
      name: 'Approximation - Set 5 (Q401 to Q500)',
      source: 'Approximation Set 5 (100 Qs)',
      file: 'data/arithmetic/approximation-set5.js',
      count: 100,
      marking: { correct: 1, wrong: 0 },
      isChapterSet: true,
      setName: 'Approximation Set 5 (Q401-Q500)'
    },"""

m = re.search(old_pattern, content)
assert m, "Regex did not match old approximation block!"
content = content[:m.start()] + new_test_block + content[m.end():]

# Save
with open(config_path, "w", encoding="utf-8") as f:
    f.write(content)

print("SUCCESS: config.js updated!")

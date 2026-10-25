"""Patch 2: Update startTest function to properly handle grouped n values like "1(a)","1(b)" """

old = """      // Check if dataset has natural letter sub-parts like 1(A), 1(B)
      const hasNaturalSub = bank.some(q => /\\([A-Za-z]\\)|[A-Za-z]$/.test(String(q.n || '')));

      let qs = bank.map((q, idx) => {
        let displayN = q.n;
        let groupNum = 1;
        if (hasNaturalSub) {
          const m = String(q.n || '').match(/^(\\d+)/);
          groupNum = m ? parseInt(m[1], 10) : idx + 1;
        } else {
          // Auto group: 4 questions per main number, labeled 1(A), 1(B), 1(C), 1(D), 2(A)...
          const mainQ = Math.floor(idx / 4) + 1;
          const subLetter = ['A', 'B', 'C', 'D'][idx % 4];
          displayN = `${mainQ}(${subLetter})`;
          groupNum = mainQ;
        }
        return Object.assign({}, q, {
          id: testConfig.id + ':' + (q.n || (idx + 1)),
          n: displayN,
          rawN: q.n,
          groupNum: groupNum,
          bankIndex: idx + 1
        });
      });"""

new = """      // Check if dataset has natural letter sub-parts like 1(a), 1(b) or 1(A), 1(B)
      const hasNaturalSub = bank.some(q => /\\([A-Za-z]\\)/.test(String(q.n || '')));

      let qs = bank.map((q, idx) => {
        let displayN = q.n;
        let groupNum = 1;
        if (hasNaturalSub) {
          const m = String(q.n || '').match(/^(\\d+)/);
          groupNum = m ? parseInt(m[1], 10) : idx + 1;
          displayN = q.n; // keep the natural n like "1(a)", "1(b)" etc.
        } else {
          // Auto group: 5 questions per main number, labeled 1(a), 1(b), 1(c), 1(d), 1(e), 2(a)...
          const subLetters = ['a','b','c','d','e'];
          const mainQ = Math.floor(idx / 5) + 1;
          const subLetter = subLetters[idx % 5] || String.fromCharCode(97 + (idx % 26));
          displayN = `${mainQ}(${subLetter})`;
          groupNum = mainQ;
        }
        return Object.assign({}, q, {
          id: testConfig.id + ':' + (q.n || (idx + 1)),
          n: displayN,
          rawN: q.n,
          groupNum: groupNum,
          bankIndex: idx + 1
        });
      });"""

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

old_clean = old.replace('\\n', '\n').replace('\\t', '\t')
if old_clean in content:
    content = content.replace(old_clean, new.replace('\\n', '\n').replace('\\t', '\t'), 1)
    print("Patch 2 applied: startTest grouping")
else:
    print("Trying raw replace...")
    if old in content:
        content = content.replace(old, new, 1)
        print("Patch 2 applied (raw)")
    else:
        # find nearby
        idx = content.find("const hasNaturalSub = bank.some")
        print(f"hasNaturalSub at char {idx}")
        print(repr(content[idx:idx+200]))

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done.")

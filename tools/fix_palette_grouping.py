"""
Fix startTest and getTestQuestionInfo so that plain sequential tests (n="1","2","3"...)
are NOT auto-grouped. Only tests with natural letter sub-parts like "1(a)", "1(b)"
or known grouped tests (arithmetic) get the grouped treatment.
"""

# ── Fix 1: startTest auto-grouping ──────────────────────────────────────────
old_start = """      // Check if dataset has natural letter sub-parts like 1(a), 1(b) or 1(A), 1(B)
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

new_start = """      // Check if dataset has natural letter sub-parts like 1(a), 1(b) or 1(A), 1(B)
      const hasNaturalSub = bank.some(q => /\\([A-Za-z]\\)/.test(String(q.n || '')));

      let qs = bank.map((q, idx) => {
        let displayN = q.n;
        let groupNum = idx + 1;
        if (hasNaturalSub) {
          // Has natural sub-letters like "1(a)", "1(b)": use the main number as group
          const m = String(q.n || '').match(/^(\\d+)/);
          groupNum = m ? parseInt(m[1], 10) : idx + 1;
          displayN = q.n; // keep as-is: "1(a)", "1(b)", etc.
        } else {
          // Plain sequential: keep n as-is (e.g. "1", "2", "3" ...)
          const m = String(q.n || '').match(/^(\\d+)/);
          groupNum = m ? parseInt(m[1], 10) : idx + 1;
          displayN = q.n;
        }
        return Object.assign({}, q, {
          id: testConfig.id + ':' + (q.n || (idx + 1)),
          n: displayN,
          rawN: q.n,
          groupNum: groupNum,
          bankIndex: idx + 1
        });
      });"""

# ── Fix 2: getTestQuestionInfo auto-grouped fallback ────────────────────────
old_info = """      // If no natural sub-parts, group every 5 questions into 1 main question
      const mainCount = Math.ceil(bank.length / 5);
      return { isGrouped: true, mainCount: mainCount, rawCount: bank.length, autoGrouped: true };
    }

    const raw = testConfig.count || 0;
    const mainCount = Math.ceil(raw / 5);
    return { isGrouped: true, mainCount: mainCount, rawCount: raw, autoGrouped: true };"""

new_info = """      // No letter sub-parts: plain sequential test, not grouped
      return { isGrouped: false, mainCount: bank.length, rawCount: bank.length };
    }

    const raw = testConfig.count || 0;
    return { isGrouped: false, mainCount: raw, rawCount: raw };"""

for path in ['js/app.js', 'app.js']:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    changed = False
    if old_start in content:
        content = content.replace(old_start, new_start, 1)
        print(f"[{path}] Fix 1 applied: startTest plain-n kept as-is")
        changed = True
    else:
        print(f"[{path}] Fix 1 NOT FOUND")

    if old_info in content:
        content = content.replace(old_info, new_info, 1)
        print(f"[{path}] Fix 2 applied: getTestQuestionInfo returns isGrouped=false for plain")
        changed = True
    else:
        print(f"[{path}] Fix 2 NOT FOUND")

    if changed:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)

print("Done.")

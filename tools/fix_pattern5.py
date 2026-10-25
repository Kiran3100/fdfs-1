"""Fix questionSplitRe in PATTERN 5 in js/app.js and app.js to require sentence boundary and take the last match."""

pattern5_code_old = """      const questionSplitRe = /(?<=\\S)\\s+(Which\\b|How\\b|Find\\b|What\\b|If\\b|In\\b|Calculate\\b|The\\b(?!\\s+following\\s+arrangement)|Who\\b|Whom\\b|Whose\\b|Where\\b|When\\b|Why\\b|Based\\b|Four\\b|As\\b|There\\b|Choose\\b|Identify\\b|According\\b)/i;
      const qSplitM = afterDir.match(questionSplitRe);

      let arrangementText = afterDir;
      let questionText = '';
      if (qSplitM) {
        arrangementText = afterDir.substring(0, qSplitM.index).trim();
        questionText = afterDir.substring(qSplitM.index).trim();
      }"""

pattern5_code_new = """      // Split on sentence boundary [.!?] before a question starter.
      // We look for all candidate question starters and pick the LAST one,
      // so the actual question at the end is cleanly extracted from the puzzle info.
      const questionSplitRe = /(?<=[.!?])\\s+(Who\\b|Whom\\b|Whose\\b|Which\\b|How\\b|What\\b|Where\\b|When\\b|Why\\b|If\\b|Find\\b|Calculate\\b|Based\\b|Four\\s+of\\b|As\\s+many\\b|In\\s+which\\b|There\\b|The\\s+(?:only|number|one)\\b)/gi;
      const allMatches = [...afterDir.matchAll(questionSplitRe)];

      let arrangementText = afterDir;
      let questionText = '';
      if (allMatches.length > 0) {
        const lastM = allMatches[allMatches.length - 1];
        arrangementText = afterDir.substring(0, lastM.index).trim();
        questionText = afterDir.substring(lastM.index).trim();
      } else {
        // Fallback for cases without terminal punctuation before question
        const fallbackRe = /(?<=\\S)\\s+(Who\\b|Whom\\b|Whose\\b|Which\\b|How\\b|What\\b|Where\\b|When\\b|Why\\b|Find\\b|Calculate\\b|Based\\s+on\\b)/gi;
        const fbMatches = [...afterDir.matchAll(fallbackRe)];
        if (fbMatches.length > 0) {
          const lastFb = fbMatches[fbMatches.length - 1];
          arrangementText = afterDir.substring(0, lastFb.index).trim();
          questionText = afterDir.substring(lastFb.index).trim();
        }
      }"""

for path in ['js/app.js', 'app.js']:
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    if pattern5_code_old in content:
        content = content.replace(pattern5_code_old, pattern5_code_new, 1)
        with open(path, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Successfully updated {path}")
    else:
        print(f"Could not find exact block in {path}")

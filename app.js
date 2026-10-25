// Main Application Controller for Modern Banking Exam Practice Platform
(function() {
  const C = window.APP_CONFIG;
  const Storage = window.BankStorage;
  const Analytics = window.BankAnalytics;
  const Charts = window.BankCharts;
  const app = document.getElementById('app');
  const dlg = document.getElementById('dlg');
  const LET = 'ABCDE';

  // ── Custom Dialog Helpers (replaces browser alert / confirm) ──────────────
  function showAlert(msg, title) {
    return new Promise(resolve => {
      dlg.innerHTML = `
        <div style="font-family:inherit;">
          ${title ? `<h3 style="margin:0 0 12px;font-size:1.05rem;">${title}</h3>` : ''}
          <p style="margin:0 0 20px;color:var(--text-secondary,#555);line-height:1.5;">${msg}</p>
          <div style="display:flex;justify-content:flex-end;">
            <button id="_dlg_ok" class="btn" style="min-width:80px;">OK</button>
          </div>
        </div>`;
      dlg.showModal();
      dlg.querySelector('#_dlg_ok').onclick = () => { dlg.close(); resolve(); };
      dlg.onclick = (e) => { if (e.target === dlg) { dlg.close(); resolve(); } };
    });
  }

  function showConfirm(msg, title) {
    return new Promise(resolve => {
      dlg.innerHTML = `
        <div style="font-family:inherit;">
          ${title ? `<h3 style="margin:0 0 12px;font-size:1.05rem;">${title}</h3>` : ''}
          <p style="margin:0 0 20px;color:var(--text-secondary,#555);line-height:1.5;">${msg}</p>
          <div style="display:flex;justify-content:flex-end;gap:10px;">
            <button id="_dlg_cancel" class="btn sm" style="background:var(--bg-muted,#f1f5f9);color:var(--text-primary,#333);min-width:80px;">Cancel</button>
            <button id="_dlg_ok" class="btn" style="min-width:80px;">OK</button>
          </div>
        </div>`;
      dlg.showModal();
      dlg.querySelector('#_dlg_ok').onclick    = () => { dlg.close(); resolve(true);  };
      dlg.querySelector('#_dlg_cancel').onclick = () => { dlg.close(); resolve(false); };
      dlg.onclick = (e) => { if (e.target === dlg) { dlg.close(); resolve(false); } };
    });
  }
  // ──────────────────────────────────────────────────────────────────────────

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  const pad = n => String(n).padStart(2, '0');
  const fmt = s => {
    s = Math.round(s);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    return (h ? h + ':' + pad(m) : m) + ':' + pad(s % 60);
  };

  function parseQNum(val) {
    if (val == null) return null;
    if (typeof val === 'number' && !isNaN(val)) return val;
    if (typeof val === 'string') {
      const m = val.match(/\d+/g);
      if (m && m.length) return parseInt(m[m.length - 1], 10);
    }
    return null;
  }

  function formatQRange(att) {
    if (!att) return '-';

    // 1. If attempt has rows, inspect question labels directly
    if (att.rows && att.rows.length) {
      const firstRow = att.rows[0];
      const lastRow = att.rows[att.rows.length - 1];

      // Extract main question number and optional letter from label e.g. "1(A)" -> main 1, letter "A"
      const parseLabel = (label) => {
        const m = String(label || '').match(/^(\d+)(?:\(([A-Za-z])\))?/);
        if (m) return { main: parseInt(m[1], 10), letter: m[2] || '' };
        return null;
      };

      const startParsed = parseLabel(firstRow?.n);
      const endParsed = parseLabel(lastRow?.n);

      if (startParsed && endParsed) {
        if (att.isRandom || (att.testName && att.testName.includes('Random Mock'))) {
          return `Q ${startParsed.main}&ndash;${endParsed.main} (Random)`;
        }
        if (att.isMistakes) {
          return `Mistakes (${att.total || att.rows.length} Qs)`;
        }
        if (startParsed.main === endParsed.main) {
          if (startParsed.letter && endParsed.letter && startParsed.letter !== endParsed.letter) {
            return `Q ${startParsed.main}(${startParsed.letter}) &ndash; ${endParsed.main}(${endParsed.letter})`;
          }
          return `Q ${startParsed.main}${startParsed.letter ? `(${startParsed.letter})` : ''}`;
        }
        return `Q ${startParsed.main} &ndash; ${endParsed.main}`;
      }
    }

    // 2. Fallback to raw att.from and att.to
    let from = parseQNum(att.from);
    let to   = parseQNum(att.to);

    // If numbers look like raw question indices (> 40) on a test with 4-question grouping, convert to main questions
    if (from != null && to != null) {
      if (from > 40 || to > 40) {
        const count = att.total || (to - from + 1);
        if (count && count <= 40 && (to - from + 1) === count) {
          // It's likely a test where from/to was recorded as raw indices
          const convFrom = Math.floor((from - 1) / 4) + 1;
          const convTo = Math.ceil(to / 4);
          if (convFrom && convTo && convTo <= 50) {
            from = convFrom;
            to = convTo;
          }
        }
      }

      if (att.isRandom || (att.testName && att.testName.includes('Random Mock'))) {
        return `Q ${from}&ndash;${to} (Random)`;
      }
      if (att.isMistakes) {
        return `Mistakes (${att.total || (to - from + 1)} Qs)`;
      }
      if (from === to) return `Q ${from}`;
      return `Q ${from} &ndash; ${to}`;
    }

    return '-';
  }

  const testsOf = (s, t) => C.tests.filter(x => x.subject === s && x.topic === t);

  // Helper to determine question grouping structure (e.g., 1(A)..1(D) as Question 1)
  const KNOWN_GROUPED_TESTS = {
    'pct-1': { raw: 180, main: 45 },
    'bm-1': { raw: 100, main: 25 },
    'pl-1': { raw: 160, main: 40 },
    'si-1': { raw: 80, main: 20 },
    'ci-1': { raw: 80, main: 20 },
    'rp-1': { raw: 140, main: 35 },
    'par-1': { raw: 80, main: 20 },
    'pa-1': { raw: 80, main: 20 },
    'averages-1': { raw: 100, main: 25 },
    'mixtures-allegations-1': { raw: 120, main: 30 },
    'time-distance-1': { raw: 100, main: 25 },
    'trains-1': { raw: 100, main: 25 },
    'boats-streams-1': { raw: 80, main: 20 },
    'time-work-1': { raw: 140, main: 35 },
    'pipes-cisterns-1': { raw: 60, main: 15 },
    'areas-1': { raw: 196, main: 50 },
    'volumes-1': { raw: 159, main: 40 },
    'lcm-hcf-1': { raw: 100, main: 25 },
    'problems-on-numbers-1': { raw: 140, main: 35 }
  };

  function getTestQuestionInfo(testConfig) {
    if (!testConfig) return { isGrouped: false, mainCount: 0, rawCount: 0 };
    
    // Check known mapped tests first (which have natural A-D sub-parts)
    if (KNOWN_GROUPED_TESTS[testConfig.id] && !testConfig.isHandout) {
      const g = KNOWN_GROUPED_TESTS[testConfig.id];
      return { isGrouped: true, mainCount: g.main, rawCount: testConfig.count || g.raw };
    }

    const bank = window.QBANK && window.QBANK[testConfig.id];
    if (bank && bank.length) {
      let maxMain = 0;
      let hasLetterSub = false;
      bank.forEach(q => {
        const m = String(q.n || '').match(/^(\d+)(?:\(([A-Za-z])\))?/);
        if (m) {
          const num = parseInt(m[1], 10);
          if (num > maxMain) maxMain = num;
          if (m[2]) hasLetterSub = true;
        }
      });
      if (hasLetterSub && maxMain > 0) {
        return { isGrouped: true, mainCount: maxMain, rawCount: bank.length };
      }
      // No letter sub-parts: plain sequential test, not grouped
      return { isGrouped: false, mainCount: bank.length, rawCount: bank.length };
    }

    const raw = testConfig.count || 0;
    return { isGrouped: false, mainCount: raw, rawCount: raw };
  }

  const names = (sid, tid) => {
    const s = C.subjects.find(x => x.id === sid) || {};
    const t = (s.topics || []).find(x => x.id === tid) || {};
    return [s.name || sid, t.name || tid];
  };

  const shuffle = a => {
    a = a.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  // Safe HTML Bold Markup: highlights bold tagged words like second(A), quoted words like 'SOLUTION', and expressions
  // Formats items inside a series strip: renders numbers and creates special appearance for '?'
  function formatSeriesTokens(itemsStr) {
    if (!itemsStr) return '';
    // Split by commas or 2+ spaces
    let tokens = [];
    if (itemsStr.indexOf(',') !== -1) {
      tokens = itemsStr.split(',').map(t => t.trim()).filter(Boolean);
    } else {
      tokens = itemsStr.split(/\s{2,}|\s+/).map(t => t.trim()).filter(Boolean);
    }

    return tokens.map(tok => {
      if (tok === '?' || tok === '(?)') {
        return `<span class="q-qmark-box">?</span>`;
      }
      return `<span class="q-series-token">${esc(tok)}</span>`;
    }).join(' ');
  }

  // Safe HTML Bold Markup: highlights bold tagged words, quotes, numbers, codes, and question-mark series
  function applyBoldMarkup(rawStr) {
    if (!rawStr) return '';
    let s = rawStr;
    // 1. Tagged keywords denoted with (A), (B), (C), (D) or (a)-(d) like second(A), two(B)
    s = s.replace(/\b([A-Za-z0-9]+(?:\([A-Da-d]\)))/g, '___BOLD_KW___$1___END_BOLD___');
    // 2. Double-quoted strings like "98527631" or "bank knows customer"
    s = s.replace(/"([^"\n\r]{2,65})"/g, '"___BOLD_Q___$1___END_BOLD___"');
    // 3. Strict single-quoted expressions (not apostrophes like Ram's, Sita's)
    s = s.replace(/(?<![A-Za-z0-9])'([^'\n\r]{2,65})'(?![A-Za-z0-9])/g, "'___BOLD_Q___$1___END_BOLD___'");
    // 4. Bare large number sequences (6+ digits)
    s = s.replace(/\b(\d{6,})\b/g, '___BOLD_NUM___$1___END_BOLD___');
    // 5. Numeric rank and position phrases (e.g., "12th from the top", "4th from the left end")
    s = s.replace(/\b(\d+(?:st|nd|rd|th)\s+(?:from\s+the\s+)?(?:left|right|top|bottom|beginning|end)(?:\s+end)?)\b/gi, '___BOLD_RANK___$1___END_BOLD___');
    // 6. Word-based rank and position phrases (e.g., "third from the left", "first from the right")
    s = s.replace(/\b((?:first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|last|middle)\s+(?:from\s+the\s+)?(?:left|right|top|bottom|beginning|end)(?:\s+end)?)\b/gi, '___BOLD_RANK___$1___END_BOLD___');
    // 7. Order & arrangement directives (e.g., "ascending order", "descending order", "from left to right")
    s = s.replace(/\b(ascending\s+order|descending\s+order|from\s+left\s+to\s+right|from\s+right\s+to\s+left)\b/gi, '___BOLD_ORDER___$1___END_BOLD___');
    // 8. Extrema & superlatives in comparison questions (e.g., "second tallest", "second heaviest")
    s = s.replace(/\b((?:first|second|third|fourth|fifth)\s+(?:tallest|shortest|heaviest|lightest|highest|lowest|oldest|youngest|fastest|slowest))\b/gi, '___BOLD_EXTR___$1___END_BOLD___');
    // 9. Coding & Decoding keywords: 'is coded as', 'is written as', 'Code for the letter', 'Code for the word'
    s = s.replace(/\b(is\s+coded\s+as|is\s+written\s+as|will\s+be\s+coded\s+as|will\s+be\s+written\s+as|Code\s+for\s+the\s+(?:letter|word|words)|coded\s+form)\b/gi, '___BOLD_KW___$1___END_BOLD___');
    // 10. Standalone uppercase coded words of 3+ letters in Coding & Decoding (e.g., PRINT, SULLR, TEARS, WHDPQ, KNOWN)
    s = s.replace(/(?<=\b(?:coded\s+as|written\s+as|how\s+will|word)\s+)([A-Z]{3,12})\b/g, '___BOLD_Q___$1___END_BOLD___');
    s = s.replace(/\b([A-Z]{3,12})(?=\s+(?:is\s+coded\s+as|is\s+written\s+as|will\s+be\s+coded))\b/g, '___BOLD_Q___$1___END_BOLD___');

    let escaped = esc(s);
    return escaped
      .replace(/___BOLD_KW___(.*?)___END_BOLD___/g, '<strong class="q-bold-keyword">$1</strong>')
      .replace(/___BOLD_Q___(.*?)___END_BOLD___/g, '<strong class="q-bold-quoted">$1</strong>')
      .replace(/___BOLD_NUM___(.*?)___END_BOLD___/g, '<strong class="q-bold-num">$1</strong>')
      .replace(/___BOLD_RANK___(.*?)___END_BOLD___/g, '<strong class="q-bold-rank">$1</strong>')
      .replace(/___BOLD_ORDER___(.*?)___END_BOLD___/g, '<strong class="q-bold-order">$1</strong>')
      .replace(/___BOLD_EXTR___(.*?)___END_BOLD___/g, '<strong class="q-bold-extr">$1</strong>');
  }

  // Structured Reasoning Question Layout Renderer
  // Preserves the exact pattern of every question (Combinations, Bold Replacements, Steps, Statements, Arrangements)
  // and renders all bold words, letters, and labels distinctly.
  function renderFormattedQuestion(rawText) {
    if (!rawText) return '';
    let str = String(rawText);

    // Extract embedded image tag like [IMAGE: images/questions/...]
    let imageHTML = '';
    const imgMatch = str.match(/\[IMAGE:\s*([^\]]+)\]/i);
    if (imgMatch) {
      const imgSrc = imgMatch[1].trim();
      imageHTML = `<div class="q-image-container"><img src="${esc(imgSrc)}" alt="Question Diagram" class="q-question-img" loading="lazy" /></div>`;
      str = str.replace(imgMatch[0], '').trim();
    }

    // Extract optional prefix like [1(A)] or [28(A)]
    let labelPrefix = '';
    const prefixMatch = str.match(/^\s*(\[\d+\([A-Za-z]\)\])\s*/);
    if (prefixMatch) {
      labelPrefix = prefixMatch[1];
      str = str.substring(prefixMatch[0].length).trim();
    }

    // ── PATTERN 1: Combinations (i), (ii), (iii) e.g. 28(A-D) ──
    const combMatch = str.match(/(\([iI]+\)\s+[A-Za-z\s]+?)\s*(\([iI]+\)\s+[A-Za-z\s]+?)\s*(\([iI]+\)\s+[A-Za-z\s]+?)\s*(From each of the given combinations.*)$/i);
    if (combMatch) {
      const introText = str.substring(0, combMatch.index).trim();
      const c1Val = combMatch[1].trim().replace(/^\([iI]+\)\s*/i, '');
      const c2Val = combMatch[2].trim().replace(/^\([iI]+\)\s*/i, '');
      const c3Val = combMatch[3].trim().replace(/^\([iI]+\)\s*/i, '');
      const qText = combMatch[4].trim();

      return `
        <div class="reasoning-q-layout">
          ${labelPrefix ? `<div class="q-meta-tag mb-2"><span class="q-label-tag">${esc(labelPrefix)}</span></div>` : ''}
          <div class="q-directions-block">
            <span class="q-block-label">Directions:</span>
            <span class="q-directions-text">${applyBoldMarkup(introText)}</span>
          </div>
          <div class="q-combinations-block">
            <div class="q-comb-item"><strong class="q-comb-num">(i)</strong> <span class="q-comb-val">${esc(c1Val)}</span></div>
            <div class="q-comb-item"><strong class="q-comb-num">(ii)</strong> <span class="q-comb-val">${esc(c2Val)}</span></div>
            <div class="q-comb-item"><strong class="q-comb-num">(iii)</strong> <span class="q-comb-val">${esc(c3Val)}</span></div>
          </div>
          <div class="q-question-block">
            <span class="q-block-label">Question:</span>
            <div class="q-question-text">${applyBoldMarkup(qText)}</div>
          </div>
        </div>`;
    }

    // ── PATTERN 2: Four words in bold denoted by (A), (B), (C), (D) e.g. 29(A-D) ──
    const fourBoldMatch = str.match(/^(In this question information has been given.*?(?:meaningful English word|meaningful word)\.)\s*(.*)$/i);
    if (fourBoldMatch) {
      const dirText = fourBoldMatch[1].trim();
      const bodyText = fourBoldMatch[2].trim();

      return `
        <div class="reasoning-q-layout">
          ${labelPrefix ? `<div class="q-meta-tag mb-2"><span class="q-label-tag">${esc(labelPrefix)}</span></div>` : ''}
          <div class="q-directions-block">
            <span class="q-block-label">Directions:</span>
            <span class="q-directions-text">${esc(dirText)}</span>
          </div>
          <div class="q-statement-block">
            <span class="q-block-label">Information:</span>
            <div class="q-info-content">${applyBoldMarkup(bodyText)}</div>
          </div>
        </div>`;
    }

    // ── PATTERN 3A: Arrangement + Step-Based Conditions e.g. 36(A) - 40(D) ──
    const arrStepMatch = str.match(/^(Direction\s*(?:\s*\(\d+[-–]\d+\)\s*)?:.+?:\s*)(.+?)\s+Conditions:\s+(Step I:.*)\s+((?:How|Which|What|If).*)$/i);
    if (arrStepMatch) {
      const dirText = arrStepMatch[1].trim();
      const arrText = arrStepMatch[2].trim();
      const stepsBody = arrStepMatch[3].trim();
      const qText = arrStepMatch[4].trim();

      const stepItems = stepsBody.split(/(?=(?:Step\s+[I|V|X]+)\s*:)/i).filter(Boolean);

      return `
        <div class="reasoning-q-layout">
          ${labelPrefix ? `<div class="q-meta-tag mb-2"><span class="q-label-tag">${esc(labelPrefix)}</span></div>` : ''}
          <div class="q-directions-block">
            <span class="q-block-label">Directions:</span>
            <span class="q-directions-text">${esc(dirText)}</span>
          </div>
          <div class="q-arrangement-block">
            <span class="q-block-label">Arrangement:</span>
            <div class="q-arrangement-content">${esc(arrText)}</div>
          </div>
          <div class="q-steps-list">
            ${stepItems.map(item => {
              const m = item.match(/^((?:Step\s+[I|V|X]+)\s*:)\s*(.*)$/i);
              if (m) {
                return `<div class="q-step-row"><strong class="q-step-tag">${esc(m[1])}</strong> <span>${esc(m[2])}</span></div>`;
              }
              return `<div class="q-step-row">${esc(item)}</div>`;
            }).join('')}
          </div>
          <div class="q-question-block">
            <span class="q-block-label">Question:</span>
            <div class="q-question-text">${applyBoldMarkup(qText)}</div>
          </div>
        </div>`;
    }

    // ── PATTERN 3B: Words in bold + Steps I-III e.g. 30(A-D) ──
    const stepMatch = str.match(/^(In this question three words are given in bold.*?answer the given question\.)\s*([A-Z\s]{10,})\s*(Step I:.*)$/i);
    if (stepMatch) {
      const dirText = stepMatch[1].trim();
      const wordsBold = stepMatch[2].trim();
      let stepsBody = stepMatch[3].trim();
      let qText = '';

      const qMatch = stepsBody.match(/(After following all the steps.*)$/i);
      if (qMatch) {
        qText = qMatch[1].trim();
        stepsBody = stepsBody.substring(0, qMatch.index).trim();
      }

      const stepItems = stepsBody.split(/(?=(?:Step\s+[I|V|X]+|Condition)\s*:)/i).filter(Boolean);

      return `
        <div class="reasoning-q-layout">
          ${labelPrefix ? `<div class="q-meta-tag mb-2"><span class="q-label-tag">${esc(labelPrefix)}</span></div>` : ''}
          <div class="q-directions-block">
            <span class="q-block-label">Directions:</span>
            <span class="q-directions-text">${esc(dirText)}</span>
          </div>
          <div class="q-arrangement-block">
            <span class="q-block-label">Words Given in Bold:</span>
            <div class="q-arrangement-content">${esc(wordsBold)}</div>
          </div>
          <div class="q-steps-list">
            ${stepItems.map(item => {
              const m = item.match(/^((?:Step\s+[I|V|X]+|Condition)\s*:)\s*(.*)$/i);
              if (m) {
                return `<div class="q-step-row"><strong class="q-step-tag">${esc(m[1])}</strong> <span>${esc(m[2])}</span></div>`;
              }
              return `<div class="q-step-row">${esc(item)}</div>`;
            }).join('')}
          </div>
          ${qText ? `
            <div class="q-question-block">
              <span class="q-block-label">Question:</span>
              <div class="q-question-text">${applyBoldMarkup(qText)}</div>
            </div>` : ''}
        </div>`;
    }

    // ── PATTERN 3C: Column I & Column II Matching Table e.g. 31(A) - 35(D) ──
    const tableMatch = str.match(/^(Direction\s*(?:\s*\(\d+[-–]\d+\)\s*)?:.+?options\.)\s*Statements:\s*(.+?)\s+Column\s+I\s+Column\s+II\s+1\.\s*(.+?)\s+A\.\s*(.+?)\s+2\.\s*(.+?)\s+B\.\s*(.+?)\s+3\.\s*(.+?)\s+C\.\s*(.+?)$/i);
    if (tableMatch) {
      const dirText = tableMatch[1].trim();
      const stmtText = tableMatch[2].trim();
      const r1c1 = tableMatch[3].trim();
      const r1c2 = tableMatch[4].trim();
      const r2c1 = tableMatch[5].trim();
      const r2c2 = tableMatch[6].trim();
      const r3c1 = tableMatch[7].trim();
      const r3c2 = tableMatch[8].trim();

      return `
        <div class="reasoning-q-layout">
          ${labelPrefix ? `<div class="q-meta-tag mb-2"><span class="q-label-tag">${esc(labelPrefix)}</span></div>` : ''}
          <div class="q-directions-block">
            <span class="q-block-label">Directions:</span>
            <span class="q-directions-text">${esc(dirText)}</span>
          </div>
          <div class="q-statement-block">
            <span class="q-block-label">Statements:</span>
            <div class="q-statement-content">${applyBoldMarkup(stmtText)}</div>
          </div>
          <div class="q-table-block">
            <table class="q-column-match-table">
              <thead>
                <tr>
                  <th>Column I</th>
                  <th>Column II</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><span class="q-tbl-num">1.</span> <span class="q-tbl-expr">${esc(r1c1)}</span></td>
                  <td><span class="q-tbl-let">A.</span> <span class="q-tbl-expr">${esc(r1c2)}</span></td>
                </tr>
                <tr>
                  <td><span class="q-tbl-num">2.</span> <span class="q-tbl-expr">${esc(r2c1)}</span></td>
                  <td><span class="q-tbl-let">B.</span> <span class="q-tbl-expr">${esc(r2c2)}</span></td>
                </tr>
                <tr>
                  <td><span class="q-tbl-num">3.</span> <span class="q-tbl-expr">${esc(r3c1)}</span></td>
                  <td><span class="q-tbl-let">C.</span> <span class="q-tbl-expr">${esc(r3c2)}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>`;
    }

    // ── PATTERN 4: Statement + Conclusions (Coded Inequalities, Syllogisms) ──
    const stmtRegex = /\b(Statements?)\s*:\s*/gi;
    let stmtMatches = [];
    let sm;
    while ((sm = stmtRegex.exec(str)) !== null) {
      stmtMatches.push({ index: sm.index, length: sm[0].length, label: sm[1] });
    }

    if (stmtMatches.length) {
      const stmtM = stmtMatches[stmtMatches.length - 1];
      const afterStmt = str.substring(stmtM.index + stmtM.length);

      let concIdxInAfter = -1;
      let concLabel = 'Conclusions';
      let concText = '';
      let stmtText = '';

      const concM1 = afterStmt.match(/\b(Conclusions?)\s*:?\s*(?=(?:Conclusion\s+)?[IVX]+[\.\s:])/i);
      if (concM1) {
        concIdxInAfter = concM1.index;
        concLabel = concM1[1];
        stmtText = afterStmt.substring(0, concIdxInAfter).trim();
        concText = afterStmt.substring(concIdxInAfter + concM1[0].length).trim();
      } else {
        const concM2 = afterStmt.match(/\b(Conclusion\s+[IVX]+[\.\s:])/i);
        if (concM2) {
          concIdxInAfter = concM2.index;
          stmtText = afterStmt.substring(0, concIdxInAfter).trim();
          concText = afterStmt.substring(concIdxInAfter).trim();
        } else {
          const concM3 = afterStmt.match(/\b(Conclusions?)\s*:\s*/i);
          if (concM3) {
            concIdxInAfter = concM3.index;
            concLabel = concM3[1];
            stmtText = afterStmt.substring(0, concIdxInAfter).trim();
            concText = afterStmt.substring(concIdxInAfter + concM3[0].length).trim();
          }
        }
      }

      if (concIdxInAfter !== -1) {
        const dirText = str.substring(0, stmtM.index).trim();
        const stmtLabel = stmtM.label;

        const concItems = [];
        const itemRegex = /(?:(?:Conclusion\s+)?([IVX]+)\s*[:\.]\s*)/gi;
        let lastMatch = null;
        let match;
        while ((match = itemRegex.exec(concText)) !== null) {
          if (lastMatch) {
            concItems.push({
              rom: lastMatch[1].toUpperCase(),
              body: concText.substring(lastMatch.index + lastMatch[0].length, match.index).trim()
            });
          }
          lastMatch = match;
        }
        if (lastMatch) {
          concItems.push({
            rom: lastMatch[1].toUpperCase(),
            body: concText.substring(lastMatch.index + lastMatch[0].length).trim()
          });
        }

        return `
          <div class="reasoning-q-layout">
            ${labelPrefix ? `<div class="q-meta-tag mb-2"><span class="q-label-tag">${esc(labelPrefix)}</span></div>` : ''}
            ${dirText ? `
              <div class="q-directions-block">
                <span class="q-block-label">Directions:</span>
                <span class="q-directions-text">${applyBoldMarkup(dirText)}</span>
              </div>` : ''}
            <div class="q-statement-block">
              <span class="q-block-label">${esc(stmtLabel)}:</span>
              <div class="q-statement-content">${applyBoldMarkup(stmtText)}</div>
            </div>
            <div class="q-conclusions-block">
              <span class="q-block-label">${esc(concLabel)}:</span>
              <div class="q-conclusions-list">
                ${concItems.length ? concItems.map(c => `
                  <div class="q-conclusion-item">
                    <strong class="q-roman-numeral">${esc(c.rom)}.</strong>
                    <span class="q-conclusion-body">${applyBoldMarkup(c.body)}</span>
                  </div>`).join('') : `<div>${applyBoldMarkup(concText)}</div>`}
              </div>
            </div>
          </div>`;
      }
    }

    // ── PATTERN 5: Directions + Arrangement / Given Words / Given Numbers + Question ──
    const directionMatch = str.match(/^(Directions?\s*(?:\s*\(\d+[-–]\d+\)\s*)?:\s*.+?(?:answer the (?:following|given) questions?|following questions?|illustrated as below:?|given below\s*:?|answer the questions?\s*(?:given\s+below|that\s+follow)?|answer the question\s*:?))\s*/i);
    if (directionMatch) {
      const dirText = directionMatch[1].trim();
      const afterDir = str.substring(directionMatch[0].length).trim();

      // Split on sentence boundary [.!?] before a question starter.
      // We look for all candidate question starters and pick the LAST one,
      // so the actual question at the end is cleanly extracted from the puzzle info.
      const questionSplitRe = /(?<=[.!?])\s+(Who\b|Whom\b|Whose\b|Which\b|How\b|What\b|Where\b|When\b|Why\b|If\b|Find\b|Calculate\b|Based\b|Four\s+of\b|As\s+many\b|In\s+which\b|There\b|The\s+(?:only|number|one)\b)/gi;
      const allMatches = [...afterDir.matchAll(questionSplitRe)];

      let arrangementText = afterDir;
      let questionText = '';
      if (allMatches.length > 0) {
        const lastM = allMatches[allMatches.length - 1];
        arrangementText = afterDir.substring(0, lastM.index).trim();
        questionText = afterDir.substring(lastM.index).trim();
      } else {
        // Fallback for cases without terminal punctuation before question
        const fallbackRe = /(?<=\S)\s+(Who\b|Whom\b|Whose\b|Which\b|How\b|What\b|Where\b|When\b|Why\b|Find\b|Calculate\b|Based\s+on\b)/gi;
        const fbMatches = [...afterDir.matchAll(fallbackRe)];
        if (fbMatches.length > 0) {
          const lastFb = fbMatches[fbMatches.length - 1];
          arrangementText = afterDir.substring(0, lastFb.index).trim();
          questionText = afterDir.substring(lastFb.index).trim();
        }
      }

      if (arrangementText) {
        return `
          <div class="reasoning-q-layout">
            ${labelPrefix ? `<div class="q-meta-tag mb-2"><span class="q-label-tag">${esc(labelPrefix)}</span></div>` : ''}
            <div class="q-directions-block">
              <span class="q-block-label">Directions:</span>
              <span class="q-directions-text">${esc(dirText)}</span>
            </div>
            <div class="q-arrangement-block">
              <span class="q-block-label">Arrangement:</span>
              <div class="q-arrangement-content">${applyBoldMarkup(arrangementText)}</div>
            </div>
            ${questionText ? `
            <div class="q-question-block">
              <span class="q-block-label">Question:</span>
              <div class="q-question-text">${applyBoldMarkup(questionText)}</div>
            </div>` : ''}
          </div>`;
      }
    }

    // ── PATTERN 5B: Number sequence sets (Directions + Number Arrangement + Question) ──
    const numSetMatch = str.match(/^(This question is based on[\s\S]+?:)\s*((?:\b\d{3,5}\b\s+){4,}\b\d{3,5}\b)\s+([\s\S]+)$/i);
    if (numSetMatch) {
      const directionsText = numSetMatch[1].trim();
      const numSequence = numSetMatch[2].trim();
      const questionText = numSetMatch[3].trim();
      return `
        <div class="q-structured-card">
          <div class="q-directions-block">
            <span class="q-block-label">Directions:</span>
            <div class="q-directions-text">${esc(directionsText)}</div>
          </div>
          <div class="q-arrangement-block">
            <span class="q-block-label">Given Numbers:</span>
            <div class="q-arrangement-content"><strong class="q-bold-num">${esc(numSequence)}</strong></div>
          </div>
          <div class="q-question-block">
            <span class="q-block-label">Question:</span>
            <div class="q-question-text">${applyBoldMarkup(questionText)}</div>
          </div>
        </div>`;
    }

    // ── PATTERN 5C: Number Series (Missing Number Series & Wrong Number Series) ──
    const seriesMatch = str.match(/^(Direction[\s\S]+?:[\s\S]*?)(Series(?:\s*\([A-Za-z0-9\s\.\+\-]+\)|\s+[A-Za-z0-9]+)?\s*:[\s\S]*)$/i);
    if (seriesMatch) {
      const directionsText = seriesMatch[1].trim();
      const seriesBody = seriesMatch[2].trim();

      // Render each Series line cleanly with special question mark appearance
      const seriesLines = seriesBody.split(/\r?\n/).filter(l => l.trim().length > 0);
      const renderedLines = seriesLines.map(line => {
        const lineM = line.match(/^(Series(?:\s*\([A-Za-z0-9\s\.\+\-]+\)|\s+[A-Za-z0-9]+)?\s*:|Complete the series starting with\s*:|\([I|V|X]+\)\s*:)([\s\S]*)$/i);
        if (lineM) {
          const sLabel = lineM[1].trim();
          const sItems = lineM[2].trim();
          return `
            <div class="q-series-strip">
              <span class="q-series-label">${esc(sLabel)}</span>
              <div class="q-series-items">${formatSeriesTokens(sItems)}</div>
            </div>`;
        }
        return `<div class="q-question-text mt-2">${applyBoldMarkup(line)}</div>`;
      }).join('');

      return `
        <div class="q-series-layout">
          ${labelPrefix ? `<div class="q-meta-tag mb-1"><span class="q-label-tag">${esc(labelPrefix)}</span></div>` : ''}
          <div class="q-directions-block">
            <span class="q-block-label">Directions:</span>
            <div class="q-directions-text">${esc(directionsText)}</div>
          </div>
          <div class="q-series-body">
            ${renderedLines}
          </div>
          ${imageHTML}
        </div>`;
    }

    // ── PATTERN 5D: Alphanumeric & Letter Series in Coding & Decoding (e.g. AB-3 CE-6 ... ?) ──
    const letterSeriesMatch = str.match(/^([\s\S]+?\?\s*)\n([A-Z0-9\-\s\+@%&#\.\(\)]+?\?[\sA-Z0-9\-\.]*)$/i);
    if (letterSeriesMatch) {
      const qText = letterSeriesMatch[1].trim();
      const seriesTokens = letterSeriesMatch[2].trim();
      return `
        <div class="q-series-layout">
          ${labelPrefix ? `<div class="q-meta-tag mb-1"><span class="q-label-tag">${esc(labelPrefix)}</span></div>` : ''}
          <div class="q-question-block mb-3">
            <div class="q-question-text">${applyBoldMarkup(qText)}</div>
          </div>
          <div class="q-series-strip">
            <span class="q-series-label">Given Series:</span>
            <div class="q-series-items">${formatSeriesTokens(seriesTokens)}</div>
          </div>
          ${imageHTML}
        </div>`;
    }

    // ── PATTERN 6: Standard question with bold markup ──
    return `<div class="q-plain-text">${labelPrefix ? `<span class="q-label-tag">${esc(labelPrefix)}</span> ` : ''}${applyBoldMarkup(str)}${imageHTML}</div>`;
  }

  // State Management
  let S = null;
  let timerInterval = null;
  let attemptsCache = [];
  let questionHistoryCache = {};
  let currentTheme = localStorage.getItem('bankprep_theme') || 'light';

  // Apply Theme
  function applyTheme(theme) {
    currentTheme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('bankprep_theme', theme);
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) btn.innerHTML = theme === 'dark' ? '☀️' : '🌙';
  }

  // Floating Non-blocking Toast Notification
  function showToast(msg, type = 'success') {
    let toast = document.getElementById('bp-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'bp-toast';
      document.body.appendChild(toast);
    }
    toast.className = `bp-toast ${type} show`;
    toast.innerHTML = msg;
    clearTimeout(toast._timer);
    toast._timer = setTimeout(() => {
      toast.classList.remove('show');
    }, 2200);
  }

  // Refresh Cached Attempts - Sync first so UI renders immediately, then async upgrade
  function refreshCacheSync() {
    attemptsCache = Storage.getAttemptsSync ? Storage.getAttemptsSync() : [];
    questionHistoryCache = Analytics.buildQuestionHistory(attemptsCache);
  }

  async function refreshCache() {
    refreshCacheSync();
    try {
      attemptsCache = await Storage.getAllAttempts();
      questionHistoryCache = Analytics.buildQuestionHistory(attemptsCache);
    } catch (e) {}
  }

  // Load Question Bank Script
  function loadData(t) {
    return new Promise((res, rej) => {
      if (window.QBANK && window.QBANK[t.id]) return res(window.QBANK[t.id]);
      const s = document.createElement('script');
      s.src = t.file;
      s.onload = () => window.QBANK && window.QBANK[t.id] ? res(window.QBANK[t.id]) : rej(new Error('Data file loaded but missing questions for ' + t.id));
      s.onerror = () => rej(new Error('Could not load question file: ' + t.file));
      document.head.appendChild(s);
    });
  }

  function wrongIdsForTest(testId) {
    const w = new Set();
    attemptsCache.filter(h => h.testId === testId).forEach(h => {
      (h.wrong || []).forEach(x => w.add(x));
      (h.ok || []).forEach(x => w.delete(x));
    });
    return [...w];
  }

  // Route Dispatcher
  function route() {
    refreshCacheSync();
    refreshCache(); // non-blocking background check
    const rawHash = decodeURIComponent(location.hash || '').replace(/^#\/?/, '').trim();
    const h = rawHash.split('/');
    let page = (h[0] || 'dashboard').trim().toLowerCase();
    // Normalize both 'ibps coach' and 'ibps-coach'
    if (page === 'ibps coach' || page === 'ibps_coach') page = 'ibps-coach';

    // Highlight sidebar links
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      if (
        (page === 'dashboard' && href === '#/') ||
        href === '#/' + page ||
        (page === 'subject' && href === '#/subject/' + h[1]) ||
        (page === 'topic' && href === '#/subject/' + h[1])
      ) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    if (S && S.phase === 'test') {
      if (page !== 'test') history.replaceState(null, '', '#/test');
      return renderTest();
    }

    // Always reset window scroll to top when switching pages/routes
    window.scrollTo(0, 0);

    // Not on test page — always clear exam mode so sidebar/topbar are visible
    document.body.classList.remove('exam-mode');

    if (page === 'test') {
      if (!S || S.phase !== 'test') {
        location.hash = '#/';
        return;
      }
      return renderTest();
    }

    if (page === 'result' && S && S.result) {
      return renderResult();
    }

    if (page === 'drill') {
      if (window.BankDrill) return window.BankDrill.render(h);
    }

    if (page === 'daily-revision') {
      if (window.DailyRevision) return window.DailyRevision.render();
    }

    if (page === 'subject') {
      return renderSubject(h[1]);
    }

    if (page === 'topic') {
      return renderTopic(h[1], h[2]);
    }

    if (page === 'history') {
      return renderHistory();
    }

    if (page === 'performance') {
      return renderPerformancePage();
    }

    if (page === 'ibps-coach') {
      if (window.IBPSCoach && typeof window.IBPSCoach.render === 'function') {
        return window.IBPSCoach.render();
      }
      app.innerHTML = '<div class="card" style="padding:40px; text-align:center;"><h2>Loading Coach...</h2><p class="text-muted">If this takes a moment, please refresh.</p></div>';
      return;
    }

    if (page === 'attempt') {
      return viewAttemptById(h[1]);
    }

    if (page === 'compare') {
      return renderCompareAttempts(h[1], h[2]);
    }

    if (page === 'settings') {
      return renderSettings();
    }

    // Default to Dashboard
    renderDashboard();
  }

  // --------------------------------------------------------------------------
  // PAGE: DASHBOARD (Master View)
  // --------------------------------------------------------------------------
  function renderDashboard() {
    const topicDiags = Analytics.computeTopicDiagnostics(attemptsCache, C.subjects);
    const overall = Analytics.computeOverallStats(attemptsCache, topicDiags);

    let html = `
      <div class="flex-between mb-4">
        <div>
          <h1>Preparation Dashboard</h1>
          <p class="subtitle">Bank PO &amp; Clerk Exam Mastery &middot; Real-time Question Speed &amp; Accuracy Diagnostics</p>
        </div>
        <div>
          <a href="#/history" class="btn alt">📊 Attempt History (${attemptsCache.length})</a>
        </div>
      </div>

      <!-- High-Level Metrics -->
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-title">Tests Completed</div>
          <div class="metric-val">${overall.totalTests}</div>
          <div class="metric-sub">${overall.totalQs} total questions taken</div>
        </div>
        <div class="metric-card ${overall.overallAccuracy >= 80 ? 'success' : overall.overallAccuracy >= 60 ? 'warning' : 'danger'}">
          <div class="metric-title">Overall Accuracy</div>
          <div class="metric-val">${overall.overallAccuracy}%</div>
          <div class="metric-sub">${overall.totalCorrect} correct &middot; ${overall.totalIncorrect} incorrect</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">Avg Solving Speed</div>
          <div class="metric-val">${overall.avgSolvingTime}s</div>
          <div class="metric-sub">Target benchmark: ~35-40s</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">Best Score</div>
          <div class="metric-val">${overall.bestScorePercent}%</div>
          <div class="metric-sub">Highest single test accuracy</div>
        </div>
      </div>

      <!-- Daily Revision Summary Card -->
      ${window.DailyRevision ? window.DailyRevision.getDashboardCardHTML() : ''}

      <!-- Subject Curriculum Selection Cards (Level 1) — moved to top -->
      <div class="mb-4">
        <h2>Subject Curriculum</h2>
        <p class="subtitle">Select a subject below to explore its chapters, question books, and test modules.</p>
        
        <div class="subject-select-grid">
          <!-- Arithmetic Subject Card (Primary Focus) -->
          <a href="#/subject/arithmetic" class="subject-select-card" id="card-subj-arithmetic">
            <div>
              <div class="subject-select-header">
                <div class="subject-select-icon">🧮</div>
                <span class="badge badge-success">23 Chapters · Active</span>
              </div>
              <h3 class="subject-select-title">Arithmetic</h3>
              <p class="subject-select-desc">
                Comprehensive quantitative syllabus: Basic Mathematics, Percentages, Profit and Loss, Simple &amp; Compound Interest, Speed &amp; Distance, Time &amp; Work, Permutations, and Probability.
              </p>
              <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:14px;">
                <span class="badge badge-muted" style="font-size:0.75rem;">1. Basic Mathematics</span>
                <span class="badge badge-muted" style="font-size:0.75rem;">2. Percentages</span>
                <span class="badge badge-muted" style="font-size:0.75rem;">3. Profit and Loss</span>
                <span class="badge badge-muted" style="font-size:0.75rem;">4. Simple Interest</span>
                <span class="badge badge-primary" style="font-size:0.75rem;">+ 19 more</span>
              </div>
            </div>
            <div class="subject-select-footer">
              <span>Explore 23 Chapters Syllabus</span>
              <span>&rarr;</span>
            </div>
          </a>

          <!-- Reasoning Subject Card (Active) -->
          <a href="#/subject/reasoning" class="subject-select-card" id="card-subj-reasoning">
            <div>
              <div class="subject-select-header">
                <div class="subject-select-icon" style="background:rgba(124, 58, 237, 0.1); color:#7c3aed;">🧠</div>
                <span class="badge badge-success">19 Chapters · Active</span>
              </div>
              <h3 class="subject-select-title">Reasoning Ability</h3>
              <p class="subject-select-desc">
                Comprehensive logical and analytical syllabus: Number Series, Alphabets, Coding-Decoding, Inequalities, Syllogisms, Seating Arrangements, and Critical Reasoning.
              </p>
              <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:14px;">
                <span class="badge badge-muted" style="font-size:0.75rem;">1. Missing Number Series</span>
                <span class="badge badge-muted" style="font-size:0.75rem;">2. Wrong Number Series</span>
                <span class="badge badge-muted" style="font-size:0.75rem;">3. Problems on Alphabets</span>
                <span class="badge badge-muted" style="font-size:0.75rem;">4. Coding and Decoding</span>
                <span class="badge badge-primary" style="font-size:0.75rem;">+ 15 more</span>
              </div>
            </div>
            <div class="subject-select-footer">
              <span>Explore 19 Chapters Syllabus</span>
              <span>&rarr;</span>
            </div>
          </a>
        </div>
      </div>

      <!-- Topic Speed & Accuracy Diagnosis — collapsible, moved below curriculum -->
      <div class="card mb-4" id="diag-card">
        <div class="card-header" id="diag-toggle" style="cursor:pointer; user-select:none;">
          <div style="display:flex; align-items:center; gap:10px;">
            <span id="diag-chevron" style="font-size:1.1rem; transition:transform 0.25s;">▶</span>
            <h3 style="margin:0;">⚡ Topic Speed &amp; Accuracy Diagnosis</h3>
          </div>
          <div style="display:flex; align-items:center; gap:12px;">
            <span class="text-muted text-sm">Click to expand</span>
            <span class="text-muted text-sm">Categorized according to banking exam benchmarks</span>
          </div>
        </div>
        <div id="diag-body" style="display:none; padding-top:12px;">
          <div id="chart-topic-comparison"></div>
        </div>
      </div>
    `;

    app.innerHTML = html;

    // Collapsible Topic Diagnosis — chart renders lazily on first expand
    const diagToggle  = document.getElementById('diag-toggle');
    const diagBody    = document.getElementById('diag-body');
    const diagChevron = document.getElementById('diag-chevron');
    let chartRendered = false;

    diagToggle.onclick = () => {
      const isOpen = diagBody.style.display !== 'none';
      if (isOpen) {
        diagBody.style.display = 'none';
        diagChevron.style.transform = 'rotate(0deg)';
        diagToggle.querySelector('.text-muted.text-sm').textContent = 'Click to expand';
      } else {
        diagBody.style.display = 'block';
        diagChevron.style.transform = 'rotate(90deg)';
        diagToggle.querySelector('.text-muted.text-sm').textContent = 'Click to collapse';
        if (!chartRendered) {
          const activeDiagnostics = topicDiags.filter(d => d.testsAttempted > 0);
          Charts.renderTopicComparison('chart-topic-comparison', activeDiagnostics.length ? activeDiagnostics : topicDiags);
          chartRendered = true;
        }
      }
    };
  }

  // --------------------------------------------------------------------------
  // PAGE: SUBJECT SYLLABUS (Level 2: Arithmetic Section)
  // --------------------------------------------------------------------------
  function renderSubject(sid) {
    const subj = C.subjects.find(s => s.id === sid) || C.subjects[0];
    if (subj.isPlaceholder) {
      showAlert(`${subj.name} syllabus is currently under development. Stay tuned!`, `${subj.name} Coming Soon`);
      location.hash = '#/';
      return;
    }

    const topicDiags = Analytics.computeTopicDiagnostics(attemptsCache, C.subjects);

    let html = `
      <nav class="crumb">
        <a href="#/">Dashboard</a> &rsaquo;
        <span><b>${esc(subj.name)} Section</b></span>
      </nav>

      <div class="flex-between mb-4">
        <div>
          <a href="#/" class="btn sm alt mb-3" style="display:inline-flex; align-items:center; gap:6px;">
            &larr; Back to Dashboard
          </a>
          <h1 style="margin-top:4px;">${esc(subj.name)} Syllabus &middot; ${subj.topics.length} Chapters</h1>
          <p class="subtitle">${esc(subj.description || 'Select any chapter below to explore question banks, detailed solutions, and practice drills.')}</p>
        </div>
      </div>

      <!-- Real-time Filter & Search Bar -->
      <div class="card mb-4" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; padding:16px 20px;">
        <div style="flex:1; min-width:260px;">
          <input type="text" id="subject-search-box" class="chapter-search-box" placeholder="Filter chapters (e.g., Percentages, Simple Interest, Work)..." autocomplete="off">
        </div>
        <div>
          <span class="badge badge-muted" id="subject-filter-badge">Showing ${subj.topics.length} of ${subj.topics.length} Chapters</span>
        </div>
      </div>

      <!-- 23 Chapters Responsive Cards Grid -->
      <div class="chapter-cards-grid" id="subject-chapter-grid">
    `;

    // Category → emoji icon + accent color
    const CATEGORY_META = {
      // Arithmetic Categories
      'Foundation':        { icon: '🔢', color: '#2563eb' },
      'Commercial':        { icon: '💰', color: '#059669' },
      'Motion & Work':     { icon: '⚡', color: '#d97706' },
      'Algebraic':         { icon: '📐', color: '#7c3aed' },
      'Mensuration':       { icon: '📏', color: '#db2777' },
      'Calculation':       { icon: '🧮', color: '#0891b2' },
      'Modern Math':       { icon: '🎲', color: '#65a30d' },
      'Quantitative':      { icon: '📊', color: '#2563eb' },

      // Reasoning Categories
      'Series & Patterns': { icon: '🔢', color: '#6366f1' },
      'Alpha-Numeric':     { icon: '🔤', color: '#3b82f6' },
      'Coding & Logic':    { icon: '🔐', color: '#8b5cf6' },
      'Order & Sequence':  { icon: '⏳', color: '#ec4899' },
      'Inequalities':      { icon: '⚖️', color: '#f59e0b' },
      'Spatial & Direction': { icon: '🧭', color: '#10b981' },
      'Family Tree':       { icon: '👥', color: '#ef4444' },
      'Deductive Logic':   { icon: '🧩', color: '#14b8a6' },
      'Puzzles & Seating': { icon: '🪑', color: '#8b5cf6' },
      'Critical Thinking': { icon: '💡', color: '#f97316' },
      'Process Logic':     { icon: '⚙️', color: '#64748b' },
      'Verbal Reasoning':  { icon: '📝', color: '#0284c7' },
    };

    subj.topics.forEach((t, idx) => {
      const num = t.num || (idx + 1);
      const numPad = String(num).padStart(2, '0');
      const tests = testsOf(subj.id, t.id);
      const diag = topicDiags.find(d => d.topicId === t.id) || {};
      const attCount = diag.testsAttempted || 0;
      const totalQs = tests.reduce((acc, x) => acc + (x.count || 0), 0);
      const cat = t.category || 'Quantitative';
      const meta = CATEGORY_META[cat] || CATEGORY_META['Quantitative'];

      // Badge: show accuracy if attempted, else question count, else "Coming Soon"
      let badgeText, badgeStyle;
      if (attCount > 0) {
        badgeText = `${diag.accuracy}% · ${attCount} attempt${attCount > 1 ? 's' : ''}`;
        badgeStyle = diag.accuracy >= 80 ? 'badge-success' : diag.accuracy >= 60 ? 'badge-warning' : 'badge-danger';
      } else if (totalQs > 0) {
        badgeText = `${totalQs} Practice Qs`;
        badgeStyle = 'badge-primary';
      } else {
        badgeText = 'Coming Soon';
        badgeStyle = 'badge-muted';
      }

      // Footer CTA text
      let footerAction, footerIcon;
      if (totalQs > 0) {
        footerAction = attCount > 0 ? 'Continue Practice' : 'Start Practice';
        footerIcon = attCount > 0 ? '▶' : '🚀';
      } else {
        footerAction = 'View Chapter';
        footerIcon = '→';
      }

      // Progress dot row (only if attempted)
      const progressHTML = attCount > 0 ? `
        <div style="display:flex; align-items:center; gap:6px; margin-top:6px;">
          <div style="flex:1; height:3px; background:var(--bg-tertiary); border-radius:99px; overflow:hidden;">
            <div style="width:${Math.min(diag.accuracy, 100)}%; height:100%; background:${diag.accuracy >= 80 ? 'var(--color-success)' : diag.accuracy >= 60 ? 'var(--color-warning)' : 'var(--color-danger)'}; border-radius:99px;"></div>
          </div>
          <span style="font-size:0.7rem; color:var(--text-muted); white-space:nowrap;">${diag.accuracy}% acc</span>
        </div>` : '';

      html += `
        <a href="#/topic/${subj.id}/${t.id}" class="chapter-item-card" data-title="${esc(t.name.toLowerCase())}" data-num="${num}" style="--card-accent:${meta.color};">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
              <span class="chapter-number-pill" style="background:${meta.color}18; color:${meta.color};">CH-${numPad}</span>
              <span class="badge ${badgeStyle}">${badgeText}</span>
            </div>
            <h3 class="chapter-item-title">${esc(t.name)}</h3>
            <div style="display:flex; align-items:center; gap:6px; margin-top:5px;">
              <span style="font-size:0.88rem;">${meta.icon}</span>
              <span style="font-size:0.72rem; color:var(--text-muted); text-transform:uppercase; font-weight:700; letter-spacing:0.05em;">${esc(cat)}</span>
            </div>
            ${progressHTML}
          </div>

          <div class="chapter-item-footer">
            <span style="display:flex; align-items:center; gap:5px;">
              ${totalQs > 0
                ? `<span style="color:var(--color-success); font-size:0.78rem;">●</span><span>${totalQs} questions ready</span>`
                : `<span style="color:var(--text-muted); font-size:0.78rem;">○</span><span style="color:var(--text-muted);">No questions yet</span>`}
            </span>
            <span class="chapter-cta-btn" style="color:${meta.color}; font-weight:700; font-size:0.82rem; display:flex; align-items:center; gap:4px;">
              ${footerAction} <span style="font-size:0.9rem;">${footerIcon}</span>
            </span>
          </div>
        </a>
      `;
    });

    html += `</div>`;
    app.innerHTML = html;

    // Search filter event listener
    const searchInput = document.getElementById('subject-search-box');
    const filterBadge = document.getElementById('subject-filter-badge');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        let visible = 0;
        document.querySelectorAll('#subject-chapter-grid .chapter-item-card').forEach(card => {
          const title = card.getAttribute('data-title') || '';
          const cNum = card.getAttribute('data-num') || '';
          if (title.includes(query) || cNum.includes(query)) {
            card.style.display = 'flex';
            visible++;
          } else {
            card.style.display = 'none';
          }
        });
        if (filterBadge) {
          filterBadge.textContent = `Showing ${visible} of ${subj.topics.length} Chapters`;
        }
      });
    }
  }

  // --------------------------------------------------------------------------
  // PAGE: TOPIC TEST SELECTION
  // --------------------------------------------------------------------------
  function renderTopic(sid, tid) {
    const [sn, tn] = names(sid, tid);
    const allTests = testsOf(sid, tid);
    const tests = allTests.filter(t => !t.isHandout);
    const handoutTests = allTests.filter(t => !!t.isHandout);
    const topicDiags = Analytics.computeTopicDiagnostics(attemptsCache, C.subjects);
    const diag = topicDiags.find(d => d.topicId === tid) || {};
    const topicAttempts = attemptsCache.filter(a => a.subject === sid && a.topic === tid).slice().reverse();

    const subjObj = C.subjects.find(s => s.id === sid) || {};
    const topicObj = (subjObj.topics || []).find(t => t.id === tid) || {};
    const chNum = topicObj.num || '';
    const fileName = topicObj.filePdf || (chNum ? `${chNum}.${topicObj.id.replace(/-/g, '_')}.pdf` : `${tid}.pdf`);

    let html = `
      <nav class="crumb">
        <a href="#/">Dashboard</a> &rsaquo;
        <a href="#/subject/${sid}">${esc(sn)}</a> &rsaquo;
        <span><b>${chNum ? chNum + '. ' : ''}${esc(tn)}</b></span>
      </nav>

      <div class="mb-3">
        <a href="#/subject/${sid}" class="btn sm alt" style="display:inline-flex; align-items:center; gap:6px;">
          &larr; Back to ${esc(sn)} Syllabus
        </a>
      </div>

      <div class="flex-between mb-4">
        <div>
          <h1>${chNum ? chNum + '. ' : ''}${esc(tn)}</h1>
          <p class="subtitle">Study Resources &middot; Banking exam target pace: <b>${diag.benchmark || 35} seconds per question</b></p>
        </div>
        <div>
          <span class="badge ${diag.classification === 'Strong Area' ? 'badge-success' : diag.classification === 'Speed Improvement Needed' ? 'badge-warning' : 'badge-primary'}" style="font-size:0.9rem; padding: 6px 12px;">
            Status: ${diag.classification || 'Unattempted'}
          </span>
        </div>
      </div>

      <!-- 3 Test Source & Mode Selection Tabs -->
      <div class="chapter-mode-tabs">
        <!-- Mode 1: Question Book -->
        <div class="chapter-mode-card active" id="tab-mode-qbook" role="button" tabindex="0">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <div class="subject-select-icon" style="width:44px; height:44px; font-size:1.3rem;">📘</div>
              <span class="badge badge-primary">${(() => {
                if (!tests.length) return 'PDF Question Book';
                const qInfo = getTestQuestionInfo(tests[0]);
                return qInfo.isGrouped
                  ? `${qInfo.mainCount} Questions (${qInfo.rawCount} Sub-parts)`
                  : `${qInfo.mainCount} Qs Available`;
              })()}</span>
            </div>
            <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:4px;">Question Book</h3>
            <p style="color:var(--text-muted); font-size:0.86rem; line-height:1.5;">
              Practice tests loaded directly from the official Question Book PDF (<b>${esc(fileName)}</b>).
            </p>
          </div>
          <div style="font-size:0.82rem; font-weight:700; color:var(--brand-primary); padding-top:10px; border-top:1px solid var(--border-color); display:flex; justify-content:space-between;">
            <span>Source: Question Book PDF</span>
            <span>&rarr;</span>
          </div>
        </div>

        <!-- Mode 2: Handout Practice -->
        <div class="chapter-mode-card" id="tab-mode-handson" role="button" tabindex="0">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <div class="subject-select-icon" style="width:44px; height:44px; font-size:1.3rem; background:rgba(16,185,129,0.1); color:var(--color-success);">⚡</div>
              <span class="badge badge-success">${handoutTests.length ? handoutTests.length + ' Papers Available' : 'Handout PDF'}</span>
            </div>
            <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:4px;">Handout Practice</h3>
            <p style="color:var(--text-muted); font-size:0.86rem; line-height:1.5;">
              ${handoutTests.length
                ? `Official handout test papers with per-question speed training &amp; answer keys.`
                : `Practice questions loaded from Handout PDF (<b>${esc(topicObj.id)}_handout.pdf</b>).`}
            </p>
          </div>
          <div style="font-size:0.82rem; font-weight:700; color:var(--color-success); padding-top:10px; border-top:1px solid var(--border-color); display:flex; justify-content:space-between;">
            <span>Source: Handout PDF</span>
            <span>&rarr;</span>
          </div>
        </div>

        <!-- Mode 3: Mock Tests Grid (Test 1 to 25) -->
        <div class="chapter-mode-card" id="tab-mode-mocksgrid" role="button" tabindex="0">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <div class="subject-select-icon" style="width:44px; height:44px; font-size:1.3rem; background:rgba(139,92,246,0.1); color:#8b5cf6;">🎯</div>
              <span class="badge" style="background:rgba(139,92,246,0.15); color:#7c3aed; font-weight:700;">25 Mock Tests</span>
            </div>
            <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:4px;">Mock Tests</h3>
            <p style="color:var(--text-muted); font-size:0.86rem; line-height:1.5;">
              Topic-wise test suite (Test 1 &ndash; 25) with detailed reports &amp; question performance analytics.
            </p>
          </div>
          <div style="font-size:0.82rem; font-weight:700; color:#8b5cf6; padding-top:10px; border-top:1px solid var(--border-color); display:flex; justify-content:space-between;">
            <span>Test Suite: Test 1 &ndash; 25</span>
            <span>&rarr;</span>
          </div>
        </div>

        <!-- Mode 4: Random Mock Drill -->
        <div class="chapter-mode-card" id="tab-mode-mock" role="button" tabindex="0">
          <div>
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
              <div class="subject-select-icon" style="width:44px; height:44px; font-size:1.3rem; background:rgba(245,158,11,0.1); color:var(--color-warning);">🎲</div>
              <span class="badge badge-warning">Random Questions</span>
            </div>
            <h3 style="font-size:1.2rem; font-weight:700; margin-bottom:4px;">Random Mock Drill</h3>
            <p style="color:var(--text-muted); font-size:0.86rem; line-height:1.5;">
              Generate a custom mock test with randomly sampled questions and a targeted countdown timer.
            </p>
          </div>
          <div style="font-size:0.82rem; font-weight:700; color:var(--color-warning); padding-top:10px; border-top:1px solid var(--border-color); display:flex; justify-content:space-between;">
            <span>Random Mock Generator</span>
            <span>&rarr;</span>
          </div>
        </div>
      </div>

      <!-- PANEL 1: Question Book Practice Tests (Active by default) -->
      <div id="panel-mode-qbook" class="mode-panel">
        <h2>Available Question Book Practice Tests</h2>
        ${!tests.length ? `
          <div class="card mb-4">
            <p class="text-muted">No tests configured for Question Book yet. You can add PDFs via tools/make_data.py or data/config.js.</p>
          </div>
        ` : tests.map(t => {
          const wrongList = wrongIdsForTest(t.id);
          const qInfo = getTestQuestionInfo(t);
          const maxQ = qInfo.mainCount;
          return `
            <form class="card mb-4 test-config-form" data-testid="${esc(t.id)}" data-grouped="${qInfo.isGrouped ? '1' : '0'}">
              <div class="flex-between">
                <div>
                  <h3>${esc(t.name)}</h3>
                  <p class="text-muted" style="font-size:0.88rem;">
                     Source: <b>${esc(t.source)}</b> &middot; ${qInfo.isGrouped
                       ? `Total <b>${maxQ} Questions</b> (${qInfo.rawCount} Sub-parts: 1(A)&ndash;1(D) per question)`
                       : `Total <b>${maxQ} Questions</b>`}
                  </p>
                </div>
                <div>
                  <span class="badge badge-primary">Question Book PDF</span>
                </div>
              </div>

              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px; margin: 18px 0; padding: 14px; background: var(--bg-secondary); border-radius: var(--radius-md); align-items: stretch;">
                <div class="test-input-card">
                  <label class="test-input-card-label" for="from-q-${esc(t.id)}">
                    <span>📌</span> From Question
                  </label>
                  <input id="from-q-${esc(t.id)}" name="from" type="number" min="1" max="${maxQ}" value="1" class="test-input-field">
                  ${qInfo.isGrouped ? `<span class="test-input-card-hint">Question 1 (includes A&ndash;D)</span>` : ''}
                </div>
                <div class="test-input-card">
                  <label class="test-input-card-label" for="to-q-${esc(t.id)}">
                    <span>🎯</span> To Question
                  </label>
                  <input id="to-q-${esc(t.id)}" name="to" type="number" min="1" max="${maxQ}" value="${maxQ}" class="test-input-field">
                  ${qInfo.isGrouped ? `<span class="test-input-card-hint">Question ${maxQ} (includes A&ndash;D)</span>` : ''}
                </div>
                <div class="test-input-card">
                  <label class="test-input-card-label" for="lim-q-${esc(t.id)}">
                    <span>⏱️</span> Time Limit (Mins)
                  </label>
                  <input id="lim-q-${esc(t.id)}" name="lim" type="number" min="0" value="0" class="test-input-field">
                  <span style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">0 = Untimed Practice</span>
                </div>
                <label class="test-toggle-label" title="Randomize question sequence">
                  <input type="checkbox" name="sq">
                  <div>
                    <span class="test-toggle-title">🔀 Shuffle Questions</span>
                    <span class="test-toggle-sub">Randomize order</span>
                  </div>
                </label>
                <label class="test-toggle-label" title="Randomize options (A, B, C, D, E) order">
                  <input type="checkbox" name="so" checked>
                  <div>
                    <span class="test-toggle-title">🎲 Shuffle Options</span>
                    <span class="test-toggle-sub">Randomize choices</span>
                  </div>
                </label>
              </div>

              <div style="display:flex; gap:12px; flex-wrap:wrap;">
                <button type="submit" class="btn">🚀 Start Question Book Test</button>
                ${wrongList.length ? `
                  <button type="button" class="btn alt" data-practisewrong="${esc(t.id)}">
                    ⚡ Practise ${wrongList.length} Past Mistake(s)
                  </button>
                ` : ''}
              </div>
            </form>
          `;
        }).join('')}
      </div>

      <!-- PANEL 2: Handout Practice PDF Tests -->
      <div id="panel-mode-handson" class="mode-panel" style="display:none;">
        ${!handoutTests.length ? `
          <div class="card mb-4">
            <div class="flex-between mb-3">
              <div>
                <h3>⚡ Handout Practice</h3>
                <p class="text-muted" style="font-size:0.88rem;">Target: <b>${esc(topicObj.id)}_handout.pdf</b></p>
              </div>
              <span class="badge badge-warning">No Handouts Yet</span>
            </div>
            <div style="background:var(--bg-secondary); padding:20px; border-radius:var(--radius-md); border:1px dashed var(--border-color); margin-bottom:16px;">
              <div style="font-weight:700; color:var(--text-primary); font-size:1.02rem; margin-bottom:8px;">📁 Handout Test Papers Not Yet Added For This Topic</div>
              <p style="font-size:0.92rem; color:var(--text-secondary); line-height:1.6; margin-bottom:14px;">
                Handout test papers have not yet been configured for this topic. Use the Question Book or Random Mock Generator in the meantime.
              </p>
              <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <button type="button" class="btn sm" id="btn-goto-qbook">Switch to Question Book (${tests.length ? tests[0].count : 0} Qs Ready)</button>
                <button type="button" class="btn sm alt" id="btn-goto-mock">Launch Random Mock Drill</button>
              </div>
            </div>
          </div>
        ` : `
          <div class="card mb-4">
            <div class="flex-between mb-3">
              <div>
                <h3>⚡ Handout Practice Papers</h3>
                <p class="text-muted" style="font-size:0.88rem;">
                  Official handout test papers &middot; Select a paper below to begin practice
                </p>
              </div>
              <span class="badge badge-success">${handoutTests.length} Papers Available</span>
            </div>

            <div style="margin-bottom:16px; padding:14px; background:var(--bg-secondary); border-radius:var(--radius-md); border:1px solid var(--border-color);">
              <label style="font-weight:700; font-size:0.92rem; display:block; margin-bottom:8px;">
                Select Test Paper:
              </label>
              <select id="handout-paper-select" style="width:100%; max-width:400px; padding:8px 12px; border:1px solid var(--border-color); border-radius:var(--radius-sm); font-size:0.95rem; font-weight:600; background:var(--bg-surface); color:var(--text-primary);">
                ${handoutTests.map((ht, idx) => `
                  <option value="${esc(ht.id)}" ${idx === 0 ? 'selected' : ''}>
                    ${esc(ht.name)} (${ht.count} Questions)
                  </option>
                `).join('')}
              </select>
            </div>

            ${handoutTests.map((ht, idx) => {
              const wrongList = wrongIdsForTest(ht.id);
              return `
                <form class="handout-test-form" id="handout-form-${esc(ht.id)}" data-testid="${esc(ht.id)}" style="${idx === 0 ? '' : 'display:none;'}">
                  <div class="flex-between mb-2">
                    <div>
                      <h4 style="margin:0; font-size:1.05rem;">${esc(ht.name)}</h4>
                      <p class="text-muted" style="font-size:0.84rem; margin:2px 0 0;">
                        Source: <b>${esc(ht.source)}</b> &middot; Total ${ht.count} questions
                      </p>
                    </div>
                    <span class="badge badge-primary">${ht.count} Questions</span>
                  </div>

                  <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px; margin: 16px 0; padding: 14px; background: var(--bg-secondary); border-radius: var(--radius-md); align-items: stretch;">
                    <div class="test-input-card">
                      <label class="test-input-card-label" for="from-hq-${esc(ht.id)}">
                        <span>📌</span> From Question
                      </label>
                      <input id="from-hq-${esc(ht.id)}" name="from" type="number" min="1" max="${ht.count}" value="1" class="test-input-field">
                    </div>
                    <div class="test-input-card">
                      <label class="test-input-card-label" for="to-hq-${esc(ht.id)}">
                        <span>🎯</span> To Question
                      </label>
                      <input id="to-hq-${esc(ht.id)}" name="to" type="number" min="1" max="${ht.count}" value="${ht.count}" class="test-input-field">
                    </div>
                    <div class="test-input-card">
                      <label class="test-input-card-label" for="lim-hq-${esc(ht.id)}">
                        <span>⏱️</span> Time Limit (Mins)
                      </label>
                      <input id="lim-hq-${esc(ht.id)}" name="lim" type="number" min="0" value="0" class="test-input-field">
                      <span style="font-size:0.75rem; color:var(--text-muted); margin-top:4px;">0 = Untimed Practice</span>
                    </div>
                    <label class="test-toggle-label" title="Randomize question sequence">
                      <input type="checkbox" name="sq">
                      <div>
                        <span class="test-toggle-title">🔀 Shuffle Questions</span>
                        <span class="test-toggle-sub">Randomize order</span>
                      </div>
                    </label>
                    <label class="test-toggle-label" title="Randomize options order">
                      <input type="checkbox" name="so" checked>
                      <div>
                        <span class="test-toggle-title">🎲 Shuffle Options</span>
                        <span class="test-toggle-sub">Randomize choices</span>
                      </div>
                    </label>
                  </div>

                  <div style="display:flex; gap:12px; flex-wrap:wrap;">
                    <button type="submit" class="btn" style="background:var(--color-success); border-color:var(--color-success);">
                      🚀 Start ${esc(ht.name)}
                    </button>
                    ${wrongList.length ? `
                      <button type="button" class="btn alt" data-practisewrong="${esc(ht.id)}">
                        ⚡ Practise ${wrongList.length} Past Mistake(s)
                      </button>
                    ` : ''}
                  </div>
                </form>
              `;
            }).join('')}
          </div>
        `}
      </div>

      <!-- PANEL 3: Random Mock Drill Generator -->
      <div id="panel-mode-mock" class="mode-panel" style="display:none;">
        <div class="card mb-4">
          <div class="flex-between mb-3">
            <div>
              <h3>🎲 Random Mock Test Generator (${esc(tn)})</h3>
              <p class="text-muted" style="font-size:0.88rem;">Generate a customized mock test with random questions sampled from <b>${esc(tn)}</b></p>
            </div>
            <span class="badge badge-warning">Random Speed Drill</span>
          </div>

          <form id="random-mock-form" style="display:flex; flex-direction:column; gap:18px;">
            <div>
              <label style="font-weight:700; font-size:0.92rem; display:block; margin-bottom:10px;">
                Select Number of Random Questions:
              </label>
              <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:12px;">
                <button type="button" class="btn alt sm btn-mock-count" data-count="10">10 Questions (Quick 10m Drill)</button>
                <button type="button" class="btn alt sm btn-mock-count active" data-count="20" style="border-color:var(--brand-primary); color:var(--brand-primary); font-weight:700;">20 Questions (Standard Mock)</button>
                <button type="button" class="btn alt sm btn-mock-count" data-count="30">30 Questions (Deep Mock)</button>
                <button type="button" class="btn alt sm btn-mock-count" data-count="50">50 Questions (Mega Drill)</button>
              </div>
              <div style="display:flex; align-items:center; gap:10px;">
                <span style="font-size:0.85rem; color:var(--text-muted);">Custom count:</span>
                <input type="number" id="mock-qcount-input" min="5" max="${tests.length ? tests[0].count : 180}" value="20" style="width:90px; padding:6px 10px; border:1px solid var(--border-color); border-radius:var(--radius-sm); font-weight:700;">
                <span style="font-size:0.85rem; color:var(--text-muted);">(Max ${tests.length ? tests[0].count : 180} questions)</span>
              </div>
            </div>

            <div style="padding:14px; background:var(--bg-secondary); border-radius:var(--radius-md);">
              <label style="font-weight:700; font-size:0.92rem; display:block; margin-bottom:10px;">
                Time Limit:
              </label>
              <div style="display:flex; gap:10px; flex-wrap:wrap; margin-bottom:10px;">
                <label style="display:flex; align-items:center; gap:6px; background:var(--bg-surface); padding:8px 14px; border-radius:var(--radius-sm); border:1px solid var(--border-color); cursor:pointer;">
                  <input type="radio" name="mock_time_limit" value="10">
                  <span style="font-size:0.88rem; font-weight:600;">10 Minutes</span>
                </label>
                <label style="display:flex; align-items:center; gap:6px; background:var(--bg-surface); padding:8px 14px; border-radius:var(--radius-sm); border:1px solid var(--border-color); cursor:pointer;">
                  <input type="radio" name="mock_time_limit" value="15">
                  <span style="font-size:0.88rem; font-weight:600;">15 Minutes</span>
                </label>
                <label style="display:flex; align-items:center; gap:6px; background:var(--bg-surface); padding:8px 14px; border-radius:var(--radius-sm); border:1px solid var(--border-color); cursor:pointer;">
                  <input type="radio" name="mock_time_limit" value="20" checked>
                  <span style="font-size:0.88rem; font-weight:600;">20 Minutes</span>
                </label>
                <label style="display:flex; align-items:center; gap:6px; background:var(--bg-surface); padding:8px 14px; border-radius:var(--radius-sm); border:1px solid var(--border-color); cursor:pointer;">
                  <input type="radio" name="mock_time_limit" value="0">
                  <span style="font-size:0.88rem; font-weight:600;">Untimed</span>
                </label>
              </div>

              <div style="margin-top:12px;">
                <label class="test-toggle-label" style="display:inline-flex;" title="Randomize choices on every attempt">
                  <input type="checkbox" id="mock-shuffle-opts" checked>
                  <div>
                    <span class="test-toggle-title">🎲 Shuffle Options for Every Attempt</span>
                    <span class="test-toggle-sub">Randomize answer positions A&ndash;E</span>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <button type="submit" class="btn" id="btn-submit-random-mock" style="min-width:280px; padding:12px 24px; font-size:1.05rem;">
                🎲 Start Random Mock Test (20 Qs) 🚀
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- PANEL 4: Mock Tests Grid (Test 1 - 25) -->
      <div id="panel-mode-mocksgrid" class="mode-panel" style="display:none;">
        <div class="card mb-4">
          <div class="flex-between mb-3">
            <div>
              <h3 style="display:flex; align-items:center; gap:8px;">
                <span>🎯 Mock Tests</span>
                <span style="font-size:0.88rem; font-weight:600; color:var(--text-muted);">(Test 1 &ndash; 25)</span>
              </h3>
              <p class="text-muted" style="font-size:0.88rem; margin:2px 0 0;">
                Curated 25 Mock Tests for <b>${esc(tn)}</b> &middot; Detailed performance reports &amp; analytics generated for every attempt
              </p>
            </div>
            <span class="badge" style="background:rgba(139,92,246,0.15); color:#7c3aed; font-weight:700;">25 Tests Suite</span>
          </div>

          <!-- Quick Test Launcher Info -->
          <div style="background:var(--bg-secondary); border-radius:var(--radius-md); padding:16px 20px; border:1px solid var(--border-color); margin-bottom:24px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
            <div style="display:flex; align-items:center; gap:16px; flex-wrap:wrap;">
              <span style="font-size:0.88rem; font-weight:700; color:var(--text-primary);">Test Setting:</span>
              <span style="font-size:0.84rem; color:var(--text-secondary);">⏱️ <b>20 Qs per test</b></span>
              <span style="font-size:0.84rem; color:var(--text-secondary);">⏳ <b>20 mins target timer</b></span>
              <span style="font-size:0.84rem; color:var(--text-secondary);">📊 <b>Analysis &amp; Report enabled</b></span>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <label style="font-size:0.82rem; font-weight:600; display:flex; align-items:center; gap:6px; cursor:pointer;">
                <input type="checkbox" id="grid-mock-shuffle-opt" checked>
                <span>Shuffle Options</span>
              </label>
            </div>
          </div>

          <div style="text-align:center; font-size:0.86rem; font-weight:700; color:var(--text-muted); margin-bottom:14px; letter-spacing:0.04em; text-transform:uppercase;">
            Test 1 &ndash; 25
          </div>

          <!-- 25 Test Buttons Grid styled matching the requested design -->
          <div style="display:flex; flex-wrap:wrap; justify-content:center; gap:12px; margin-bottom:20px;">
            ${Array.from({ length: 25 }, (_, i) => {
              const testNum = i + 1;
              const testTitle = `${tn} - Mock Test ${testNum}`;
              const pastAtt = topicAttempts.find(a => a.testName === testTitle);
              const isCompleted = !!pastAtt;
              const statusText = isCompleted ? (pastAtt.accuracy != null ? `${pastAtt.accuracy.toFixed(0)}% Done` : 'Completed') : 'Pending';
              const bgColor = isCompleted ? 'rgba(16,185,129,0.12)' : '#ede9fe';
              const borderColor = isCompleted ? 'var(--color-success)' : '#ddd6fe';
              const titleColor = isCompleted ? 'var(--color-success)' : '#1e1b4b';
              const subColor = isCompleted ? 'var(--color-success)' : '#6b7280';

              return `
                <div class="mock-grid-btn"
                     data-testnum="${testNum}"
                     role="button"
                     tabindex="0"
                     title="Click to take Mock Test ${testNum}"
                     style="width:105px; min-height:56px; background:${bgColor}; border:1px solid ${borderColor}; border-radius:12px; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:6px 10px; cursor:pointer; transition:all 0.18s ease; box-shadow:0 1px 3px rgba(0,0,0,0.04); user-select:none;">
                  <span style="font-weight:700; font-size:0.92rem; color:${titleColor}; line-height:1.2;">Test ${testNum}</span>
                  <span style="font-size:0.75rem; color:${subColor}; margin-top:2px; font-weight:${isCompleted ? '700' : '500'};">${statusText}</span>
                </div>
              `;
            }).join('')}
          </div>

          <div style="display:flex; justify-content:center; align-items:center; gap:20px; font-size:0.8rem; color:var(--text-muted); padding-top:12px; border-top:1px solid var(--border-color);">
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="width:12px; height:12px; border-radius:3px; background:#ede9fe; border:1px solid #ddd6fe; display:inline-block;"></span>
              <span>Pending</span>
            </div>
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="width:12px; height:12px; border-radius:3px; background:rgba(16,185,129,0.12); border:1px solid var(--color-success); display:inline-block;"></span>
              <span>Completed (Score Shown)</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Topic Performance Summary Card -->
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-title">Available Tests</div>
          <div class="metric-val">${tests.length}</div>
          <div class="metric-sub">${tests.reduce((acc, t) => acc + (t.count || 0), 0)} Total Questions</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">Attempts Taken</div>
          <div class="metric-val">${diag.testsAttempted || 0}</div>
          <div class="metric-sub">${diag.attemptedQuestions || 0} Qs solved</div>
        </div>
        <div class="metric-card ${diag.accuracy >= 80 ? 'success' : diag.accuracy >= 60 ? 'warning' : 'danger'}">
          <div class="metric-title">Topic Accuracy</div>
          <div class="metric-val">${diag.testsAttempted ? diag.accuracy + '%' : 'N/A'}</div>
          <div class="metric-sub">${diag.correctQuestions || 0} correct &middot; ${diag.incorrectQuestions || 0} wrong</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">Average Pace</div>
          <div class="metric-val">${diag.testsAttempted ? diag.avgTimePerAttempted + 's' : 'N/A'}</div>
          <div class="metric-sub">Fastest: ${diag.fastestTime || 0}s &middot; Target: ${diag.benchmark || 35}s</div>
        </div>
      </div>

      ${diag.testsAttempted ? `
        <div class="rec-box mb-4">
          <div style="font-weight:700; color:var(--brand-primary); margin-bottom:4px;">🎯 Recommendation for ${esc(tn)}:</div>
          <div style="font-size:0.95rem; color:var(--text-secondary);">${esc(diag.strategy)}</div>
        </div>
      ` : ''}

      <!-- Historical Attempts for this Topic -->
      <h2>Previous Topic Attempts</h2>
      ${!topicAttempts.length ? `
        <div class="card mb-4"><p class="text-muted">No previous attempts recorded for this topic yet.</p></div>
      ` : `
        <div class="table-container mb-4">
          <table class="data-table">
            <thead>
              <tr>
                <th style="white-space:nowrap;">Date &amp; Time</th>
                <th>Test Name</th>
                <th style="white-space:nowrap; text-align:center;">From &ndash; To</th>
                <th style="white-space:nowrap; text-align:center;">Score</th>
                <th style="white-space:nowrap; text-align:center;">Accuracy</th>
                <th style="white-space:nowrap; text-align:center;">Total Time</th>
                <th style="white-space:nowrap; text-align:center;">Avg / Q</th>
                <th style="white-space:nowrap; text-align:center;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${topicAttempts.map(att => `
                <tr>
                  <td style="white-space:nowrap; font-size:0.86rem; color:var(--text-secondary);">${new Date(att.ts).toLocaleString()}</td>
                  <td><b style="color:var(--text-primary); font-size:0.92rem;">${esc(att.testName)}</b></td>
                  <td style="white-space:nowrap; text-align:center;"><span class="badge badge-muted" style="font-weight:700; font-size:0.82rem; padding:3px 9px;">${formatQRange(att)}</span></td>
                  <td style="white-space:nowrap; font-weight:700; text-align:center; font-variant-numeric:tabular-nums;">${att.score} / ${att.max}</td>
                  <td style="white-space:nowrap; text-align:center;"><span class="badge ${att.accuracy >= 80 ? 'badge-success' : att.accuracy >= 60 ? 'badge-warning' : 'badge-danger'}">${(att.accuracy || 0).toFixed(1)}%</span></td>
                  <td style="white-space:nowrap; text-align:center; font-variant-numeric:tabular-nums;">${fmt(att.sec)}</td>
                  <td style="white-space:nowrap; text-align:center; font-variant-numeric:tabular-nums;">${att.avg ? att.avg.toFixed(1) + 's' : (att.sec / (att.total || 1)).toFixed(1) + 's'}</td>
                  <td style="white-space:nowrap; text-align:center;">
                    <div style="display:inline-flex; gap:6px; align-items:center;">
                      <a href="#/attempt/${att.id}" class="btn alt sm" style="white-space:nowrap; padding:4px 9px; font-size:0.82rem; font-weight:600;">📊 View Analysis</a>
                      <button type="button" class="btn danger sm" data-delattempt="${att.id}" title="Delete Test Attempt" style="white-space:nowrap; padding:4px 9px; font-size:0.82rem; font-weight:700;">🗑️ Delete</button>
                    </div>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    `;

    app.innerHTML = html;

    // Tab Mode Switching Events
    const tabQbook = app.querySelector('#tab-mode-qbook');
    const tabHandson = app.querySelector('#tab-mode-handson');
    const tabMocksGrid = app.querySelector('#tab-mode-mocksgrid');
    const tabMock = app.querySelector('#tab-mode-mock');

    const panelQbook = app.querySelector('#panel-mode-qbook');
    const panelHandson = app.querySelector('#panel-mode-handson');
    const panelMocksGrid = app.querySelector('#panel-mode-mocksgrid');
    const panelMock = app.querySelector('#panel-mode-mock');

    function selectMode(mode) {
      if (tabQbook) tabQbook.classList.toggle('active', mode === 'qbook');
      if (tabHandson) tabHandson.classList.toggle('active', mode === 'handson');
      if (tabMocksGrid) tabMocksGrid.classList.toggle('active', mode === 'mocksgrid');
      if (tabMock) tabMock.classList.toggle('active', mode === 'mock');

      if (panelQbook) panelQbook.style.display = mode === 'qbook' ? 'block' : 'none';
      if (panelHandson) panelHandson.style.display = mode === 'handson' ? 'block' : 'none';
      if (panelMocksGrid) panelMocksGrid.style.display = mode === 'mocksgrid' ? 'block' : 'none';
      if (panelMock) panelMock.style.display = mode === 'mock' ? 'block' : 'none';
    }

    if (tabQbook) tabQbook.onclick = () => selectMode('qbook');
    if (tabHandson) tabHandson.onclick = () => selectMode('handson');
    if (tabMocksGrid) tabMocksGrid.onclick = () => selectMode('mocksgrid');
    if (tabMock) tabMock.onclick = () => selectMode('mock');

    const btnGotoQbook = app.querySelector('#btn-goto-qbook');
    if (btnGotoQbook) btnGotoQbook.onclick = () => selectMode('qbook');

    const btnGotoMock = app.querySelector('#btn-goto-mock');
    if (btnGotoMock) btnGotoMock.onclick = () => selectMode('mock');

    // Mock Tests Grid (Test 1 - 25) Launch Handler
    app.querySelectorAll('.mock-grid-btn').forEach(btn => {
      btn.onclick = () => {
        const testNum = +btn.dataset.testnum;
        if (!testNum) return;
        const testConfig = tests[0] || (handoutTests.length ? handoutTests[0] : null);
        if (!testConfig) {
          alert('No question bank available for this topic.');
          return;
        }

        const so = !!app.querySelector('#grid-mock-shuffle-opt')?.checked;
        const testTitle = `${tn} - Mock Test ${testNum}`;

        startTest(testConfig, {
          randomCount: Math.min(20, testConfig.count || 20),
          lim: 20,
          sq: true,
          so: so,
          customTitle: testTitle
        });
      };
    });

    // Random Mock Generator Logic
    const mockForm = app.querySelector('#random-mock-form');
    const mockQInput = app.querySelector('#mock-qcount-input');
    const btnSubmitMock = app.querySelector('#btn-submit-random-mock');

    app.querySelectorAll('.btn-mock-count').forEach(btn => {
      btn.onclick = () => {
        app.querySelectorAll('.btn-mock-count').forEach(b => {
          b.classList.remove('active');
          b.style.borderColor = '';
          b.style.color = '';
        });
        btn.classList.add('active');
        btn.style.borderColor = 'var(--brand-primary)';
        btn.style.color = 'var(--brand-primary)';
        const count = +btn.dataset.count;
        if (mockQInput) mockQInput.value = count;
        if (btnSubmitMock) btnSubmitMock.textContent = `🎲 Start Random Mock Test (${count} Qs) 🚀`;
      };
    });

    if (mockQInput) {
      mockQInput.oninput = () => {
        const c = Math.max(1, +mockQInput.value || 1);
        if (btnSubmitMock) btnSubmitMock.textContent = `🎲 Start Random Mock Test (${c} Qs) 🚀`;
      };
    }

    if (mockForm && tests.length) {
      mockForm.onsubmit = e => {
        e.preventDefault();
        const testConfig = tests[0];
        const count = Math.max(1, Math.min(testConfig.count, +mockQInput.value || 20));
        const selectedTimeRadio = mockForm.querySelector('[name=mock_time_limit]:checked');
        const lim = selectedTimeRadio ? +selectedTimeRadio.value : 20;
        const so = !!mockForm.querySelector('#mock-shuffle-opts')?.checked;

        startTest(testConfig, {
          randomCount: count,
          lim: lim,
          sq: true,
          so: so,
          customTitle: `${tn} - ${count} Qs Random Mock Drill`
        });
      };
    }

    // Attach form submit handlers for standard Question Book tests
    app.querySelectorAll('.test-config-form').forEach(form => {
      const testId = form.dataset.testid;
      const testConfig = C.tests.find(x => x.id === testId);

      form.onsubmit = e => {
        e.preventDefault();
        const d = new FormData(form);
        const isGrouped = form.dataset.grouped === '1';
        startTest(testConfig, {
          from: Math.max(1, +d.get('from') || 1),
          to: Math.max(1, +d.get('to') || 1),
          lim: Math.max(0, +d.get('lim') || 0),
          sq: !!d.get('sq'),
          so: !!d.get('so'),
          isGrouped: isGrouped
        });
      };

      const wrongBtn = form.querySelector('[data-practisewrong]');
      if (wrongBtn) {
        wrongBtn.onclick = () => {
          const wList = wrongIdsForTest(testId);
          startTest(testConfig, {
            lim: 0,
            sq: false,
            so: !!form.querySelector('[name=so]').checked,
            only: wList
          });
        };
      }
    });

    // Handout Test Paper Dropdown & Form Logic
    const handoutSelect = app.querySelector('#handout-paper-select');
    if (handoutSelect) {
      handoutSelect.onchange = () => {
        const selId = handoutSelect.value;
        app.querySelectorAll('.handout-test-form').forEach(f => {
          f.style.display = f.dataset.testid === selId ? 'block' : 'none';
        });
      };
    }

    app.querySelectorAll('.handout-test-form').forEach(form => {
      const testId = form.dataset.testid;
      const testConfig = C.tests.find(x => x.id === testId);

      form.onsubmit = e => {
        e.preventDefault();
        const d = new FormData(form);
        startTest(testConfig, {
          from: Math.max(1, +d.get('from') || 1),
          to: Math.min(testConfig.count, +d.get('to') || testConfig.count),
          lim: Math.max(0, +d.get('lim') || 0),
          sq: !!d.get('sq'),
          so: !!d.get('so')
        });
      };

      const wrongBtn = form.querySelector('[data-practisewrong]');
      if (wrongBtn) {
        wrongBtn.onclick = () => {
          const wList = wrongIdsForTest(testId);
          startTest(testConfig, {
            lim: 0,
            sq: false,
            so: !!form.querySelector('[name=so]').checked,
            only: wList
          });
        };
      }
    });

    // Attach Delete Attempt button handlers in Previous Topic Attempts (Inline confirmation, zero popups)
    app.querySelectorAll('[data-delattempt]').forEach(btn => {
      btn.onclick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const attId = btn.dataset.delattempt;
        if (!attId) return;

        // Step 1: Inline confirmation on first click (no window popup)
        if (!btn.dataset.confirming) {
          btn.dataset.confirming = 'true';
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '⚠️ Confirm?';
          btn.style.background = '#dc2626';
          btn.style.borderColor = '#b91c1c';
          btn.style.color = '#ffffff';

          // Reset if not confirmed within 4 seconds
          setTimeout(() => {
            if (btn && btn.dataset && btn.dataset.confirming) {
              delete btn.dataset.confirming;
              btn.innerHTML = originalHTML;
              btn.style.background = '';
              btn.style.borderColor = '';
              btn.style.color = '';
            }
          }, 4000);
          return;
        }

        // Step 2: Confirmed click - perform deletion immediately with ZERO popups
        delete btn.dataset.confirming;
        const tr = btn.closest('tr');
        if (tr) tr.remove();

        attemptsCache = attemptsCache.filter(a => a.id !== attId);
        questionHistoryCache = Analytics.buildQuestionHistory(attemptsCache);
        await Storage.deleteAttempt(attId);

        showToast('✓ Test attempt deleted');
        renderTopic(sid, tid);
      };
    });
  }

  // --------------------------------------------------------------------------
  // TEST EXECUTION ENGINE
  // Question-by-question time tracking, revisits, answer modifications
  // --------------------------------------------------------------------------
  async function startTest(testConfig, opts) {
    try {
      const bank = await loadData(testConfig);
      const qInfo = getTestQuestionInfo(testConfig);

      // Check if dataset has natural letter sub-parts like 1(a), 1(b) or 1(A), 1(B)
      const hasNaturalSub = bank.some(q => /\([A-Za-z]\)/.test(String(q.n || '')));

      let qs = bank.map((q, idx) => {
        let displayN = q.n;
        let groupNum = idx + 1;
        if (hasNaturalSub) {
          // Has natural sub-letters like "1(a)", "1(b)": use the main number as group
          const m = String(q.n || '').match(/^(\d+)/);
          groupNum = m ? parseInt(m[1], 10) : idx + 1;
          displayN = q.n; // keep as-is: "1(a)", "1(b)", etc.
        } else {
          // Plain sequential: keep n as-is (e.g. "1", "2", "3" ...)
          const m = String(q.n || '').match(/^(\d+)/);
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
      });

      if (opts.only) {
        qs = qs.filter(q => opts.only.includes(q.id));
      } else if (opts.randomCount) {
        qs = shuffle(qs).slice(0, Math.min(opts.randomCount, qs.length));
      } else if (opts.isGrouped) {
        const fromGroup = Math.max(1, opts.from || 1);
        const toGroup = Math.max(fromGroup, opts.to || fromGroup);
        qs = qs.filter(q => q.groupNum >= fromGroup && q.groupNum <= toGroup);
      } else {
        const fromIdx = Math.max(0, (opts.from || 1) - 1);
        const toIdx = Math.min(qs.length, opts.to || qs.length);
        qs = qs.slice(fromIdx, toIdx);
      }

      if (opts.sq && !opts.randomCount) qs = shuffle(qs);
      if (!qs.length) return alert('No questions found in specified range.');

      // Build question objects with enhanced tracking
      qs = qs.map(q => {
        let op = q.o.map((x, i) => ({ x, i }));
        if (opts.so) op = shuffle(op);
        return {
          id: q.id,
          n: q.n,
          bankIndex: q.bankIndex,
          q: q.q,
          f: q.f,
          oi: op.map(z => z.i),
          opts: op.map(z => z.x),
          ci: q.a == null ? null : op.findIndex(z => z.i === q.a),
          sel: null,
          time: 0,
          revisitCount: 0,
          answerChangedCount: 0,
          markedForReview: false,
          openedAt: Date.now()
        };
      });

      const activeTestConfig = opts.customTitle ? Object.assign({}, testConfig, { name: opts.customTitle }) : testConfig;

      // Prepare state
      S = {
        phase: 'test',
        t: activeTestConfig,
        o: opts,
        qs,
        cur: 0,
        sec: 0,
        isPaused: false,
        startTime: Date.now(),
        lastActiveTimestamp: Date.now()
      };

      clearInterval(timerInterval);
      timerInterval = setInterval(testTick, 1000);

      // Handle visibility changes (pause timer if user leaves tab)
      document.removeEventListener('visibilitychange', handleTabVisibility);
      document.addEventListener('visibilitychange', handleTabVisibility);

      location.hash = '#/test';
      route();
    } catch (err) {
      alert(err.message + '\nMake sure the data folder is present.');
    }
  }

  function handleTabVisibility() {
    if (!S || S.phase !== 'test') return;
    if (document.hidden) {
      S.isPaused = true;
    } else {
      if (!S.isUserPaused) {
        S.isPaused = false;
        S.lastActiveTimestamp = Date.now();
      }
    }
  }

  function toggleTestPause(forceState) {
    if (!S || S.phase !== 'test') return;
    const shouldPause = forceState !== undefined ? forceState : !S.isPaused;
    S.isPaused = shouldPause;
    S.isUserPaused = shouldPause;

    const pauseBtn = document.getElementById('btn-pause-test');
    const timerBadge = document.getElementById('test-overall-timer');

    if (S.isPaused) {
      if (pauseBtn) {
        pauseBtn.innerHTML = '▶️ Resume';
        pauseBtn.classList.remove('alt');
        pauseBtn.style.background = '#10b981';
        pauseBtn.style.borderColor = '#059669';
        pauseBtn.style.color = '#ffffff';
        pauseBtn.style.fontWeight = '700';
      }
      if (timerBadge) {
        timerBadge.classList.add('paused');
        const left = S.o.lim ? (S.o.lim * 60 - S.sec) : null;
        timerBadge.innerHTML = `⏸️ PAUSED &middot; ${fmt(left == null ? S.sec : Math.max(0, left))}`;
      }
    } else {
      if (pauseBtn) {
        pauseBtn.innerHTML = '⏸️ Pause';
        pauseBtn.classList.add('alt');
        pauseBtn.style.background = '';
        pauseBtn.style.borderColor = '';
        pauseBtn.style.color = '';
        pauseBtn.style.fontWeight = '';
      }
      if (timerBadge) {
        timerBadge.classList.remove('paused');
        const left = S.o.lim ? (S.o.lim * 60 - S.sec) : null;
        timerBadge.innerHTML = `⏱️ ${left != null ? 'Time Left: ' : 'Elapsed: '} ${fmt(left == null ? S.sec : Math.max(0, left))}`;
      }
      S.lastActiveTimestamp = Date.now();
    }
  }

  function testTick() {
    if (!S || S.phase !== 'test' || S.isPaused) return;
    S.sec++;
    const currentQ = S.qs[S.cur];
    if (currentQ) {
      currentQ.time++;
      const qTimerEl = document.getElementById('q-active-timer');
      if (qTimerEl) qTimerEl.textContent = currentQ.time + 's';
      const qtCell = document.getElementById('qt-cell-' + S.cur);
      if (qtCell) qtCell.textContent = currentQ.time + 's';
    }

    const left = S.o.lim ? (S.o.lim * 60 - S.sec) : null;
    const testTimerEl = document.getElementById('test-overall-timer');
    if (testTimerEl) {
      testTimerEl.textContent = (left != null ? 'Time Left: ' : 'Elapsed: ') + fmt(left == null ? S.sec : Math.max(0, left));
    }

    if (left != null && left <= 0) {
      clearInterval(timerInterval);
      showAlert('⏰ Time limit reached! Submitting your test now…', 'Time Up').then(() => finishTest());
    }
  }

  function renderTest() {
    if (!S || S.phase !== 'test') return;
    window.scrollTo(0, 0);
    document.body.classList.add('exam-mode'); // hide sidebar + topbar during exam
    const q = S.qs[S.cur];
    const n = S.qs.length;
    const answeredCount = S.qs.filter(x => x.sel != null).length;
    const markedCount = S.qs.filter(x => x.markedForReview).length;
    const left = S.o.lim ? (S.o.lim * 60 - S.sec) : null;

    // Retrieve historical speed on this specific question
    const qHistory = questionHistoryCache[q.id];
    const prevTimesStr = qHistory && qHistory.times.length ? qHistory.times.map(t => t + 's').join(', ') : 'None yet';
    const benchmark = Analytics.getBenchmark(S.t.topic);
    const isGroupedTest = S.o?.isGrouped || S.qs.some(item => /\([A-Za-z]\)/.test(item.n));

    // Count subs per main group to determine palette grid column count
    const groupSubCounts = {};
    if (isGroupedTest) {
      S.qs.forEach(item => {
        const gm = String(item.n || '').match(/^(\d+)\(/);
        if (gm) {
          if (!groupSubCounts[gm[1]]) groupSubCounts[gm[1]] = 0;
          groupSubCounts[gm[1]]++;
        }
      });
    }
    const maxSubsPerGroup = isGroupedTest ? Math.max(4, ...Object.values(groupSubCounts)) : 5;

    let html = `
      <div class="test-top-bar">
        <div>
          <span style="font-weight:700; font-size:1.1rem; color:var(--text-primary);">${esc(S.t.name)}</span>
          <span class="text-muted" style="margin-left:8px; font-size:0.9rem;">(Q${esc(q.n)} &middot; Item ${S.cur + 1} of ${n})</span>
        </div>

        <div style="display:flex; align-items:center; gap:14px;">
          <div class="test-timer-badge ${S.isPaused ? 'paused' : ''}" id="test-overall-timer">
            ${S.isPaused ? '⏸️ PAUSED &middot; ' + fmt(left == null ? S.sec : Math.max(0, left)) : (left != null ? 'Time Left: ' : 'Elapsed: ') + fmt(left == null ? S.sec : Math.max(0, left))}
          </div>
          <button class="btn ${S.isPaused ? '' : 'alt'} sm" id="btn-pause-test" style="${S.isPaused ? 'background:#10b981; border-color:#059669; color:#ffffff; font-weight:700;' : ''}">
            ${S.isPaused ? '▶️ Resume' : '⏸️ Pause'}
          </button>
          <button class="btn alt sm" id="btn-exit-test">Exit</button>
          <button class="btn sm" id="btn-submit-test">Submit Test</button>
        </div>
      </div>

      <div class="test-layout">
        <!-- Question Content -->
        <div class="question-box">
          <div class="question-head">
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              <span class="badge badge-primary">Q${esc(q.n)}</span>
              <span class="question-meta-pill">⏱️ Active Time: <b id="q-active-timer">${q.time}s</b></span>
              <span class="question-meta-pill">Target: ~${benchmark}s</span>
              <span class="question-meta-pill">Revisits: <b>${q.revisitCount}</b></span>
            </div>
            <div>
              <button class="btn alt sm" id="btn-mark-review" style="${q.markedForReview ? 'background:var(--color-warning-bg); border-color:var(--color-warning);' : ''}">
                ${q.markedForReview ? '★ Marked for Review' : '☆ Mark for Review'}
              </button>
            </div>
          </div>

          ${qHistory ? `
            <div style="font-size:0.85rem; color:var(--text-muted); margin-bottom:14px; background:var(--bg-secondary); padding:8px 12px; border-radius:var(--radius-md);">
              Historical attempts for this question: <b>${prevTimesStr}</b> &middot; Fastest: <b>${qHistory.fastestTime}s</b> &middot; Lifetime Accuracy: <b>${qHistory.accuracy}%</b>
            </div>
          ` : ''}

          <div class="question-text">
            ${renderFormattedQuestion(q.q)}
          </div>

          ${q.f ? `
            <div class="rec-box mb-4" style="background:var(--color-warning-bg); border-color:var(--color-warning-border); padding:12px;">
              <span style="font-weight:600; color:var(--color-warning);">Note on this question:</span> ${esc(q.f)}
            </div>
          ` : ''}

          <!-- Options -->
          <div class="options-list">
            ${q.opts.map((optText, optIdx) => `
              <label class="option-item ${q.sel === optIdx ? 'selected' : ''}">
                <input type="radio" name="option-choice" value="${optIdx}" ${q.sel === optIdx ? 'checked' : ''}>
                <span class="opt-prefix">${LET[optIdx]}</span>
                <span>${esc(optText)}</span>
              </label>
            `).join('')}
          </div>

          <!-- Bottom Navigation Actions -->
          <div class="question-nav-actions">
            <div>
              <button class="btn alt" id="btn-prev-q" ${S.cur === 0 ? 'disabled' : ''}>&larr; Previous</button>
              <button class="btn alt" id="btn-clear-q">Clear Choice</button>
            </div>
            <div>
              <button class="btn" id="btn-next-q" ${S.cur === n - 1 ? 'disabled' : ''}>Next Question &rarr;</button>
            </div>
          </div>

          <div style="font-size:0.82rem; color:var(--text-muted); margin-top:14px;">
            Keyboard shortcuts: <b>1-5</b> select options &middot; <b>N</b> next &middot; <b>P</b> previous
          </div>
        </div>

        <!-- Question Palette -->
        <div class="palette-card">
          <div class="flex-between mb-4">
            <span style="font-weight:700; font-size:0.95rem;">Question Palette</span>
            <span class="text-muted text-sm">${answeredCount}/${n} Solved</span>
          </div>

          <div class="palette-grid ${isGroupedTest ? 'palette-grouped' : ''}"
              style="${isGroupedTest ? `grid-template-columns: repeat(${maxSubsPerGroup}, 1fr)` : ''}">
            ${S.qs.map((item, idx) => {
              // For grouped: "1(a)" -> "1A", for plain: "1" -> "1"
              const rawLabel = String(item.n || (idx + 1));
              const cleanLabel = rawLabel.replace(/\((\w+)\)/g, '$1').toUpperCase();
              return `
                <button class="palette-btn ${idx === S.cur ? 'current' : ''} ${item.sel != null ? 'answered' : ''} ${item.markedForReview ? 'marked' : ''}" data-idx="${idx}" title="Question ${esc(item.n)}">
                  ${cleanLabel}
                </button>
              `;
            }).join('')}
          </div>

          <div style="margin-top:18px; font-size:0.82rem; display:flex; flex-direction:column; gap:6px;">
            <div style="display:flex; align-items:center; gap:8px;"><span style="width:12px; height:12px; border-radius:2px; background:var(--color-success); display:inline-block;"></span> Answered (${answeredCount})</div>
            <div style="display:flex; align-items:center; gap:8px;"><span style="width:12px; height:12px; border-radius:2px; background:var(--color-warning); display:inline-block;"></span> Marked for Review (${markedCount})</div>
            <div style="display:flex; align-items:center; gap:8px;"><span style="width:12px; height:12px; border-radius:2px; background:var(--bg-secondary); border:1px solid var(--border-color); display:inline-block;"></span> Unanswered (${n - answeredCount})</div>
          </div>

          <div style="margin-top:16px; border-top:1px solid var(--border-color); padding-top:12px;">
            <div style="font-weight:700; font-size:0.88rem; margin-bottom:6px;">&#x23F1; Time per Question</div>
            <div style="max-height:220px; overflow-y:auto; font-size:0.8rem;">
              <table style="width:100%; border-collapse:collapse;">
                <thead><tr style="color:var(--text-muted);"><th style="text-align:left;padding:2px 4px;border-bottom:1px solid var(--border-color);">Q</th><th style="text-align:right;padding:2px 4px;border-bottom:1px solid var(--border-color);">Time</th><th style="text-align:center;padding:2px 4px;border-bottom:1px solid var(--border-color);">Done</th></tr></thead>
                <tbody id="q-time-tracker-body">
                  ${S.qs.map(function(item2, idx2) { var ic2 = item2.sel != null ? '\u2713' : item2.markedForReview ? '\u2736' : '-'; var bg2 = idx2 === S.cur ? 'background:var(--color-primary-bg,#eff6ff);font-weight:700;' : ''; return '<tr style="' + bg2 + '"><td style="padding:2px 6px;">Q' + item2.n + '</td><td style="text-align:right;padding:2px 6px;" id="qt-cell-' + idx2 + '">' + item2.time + 's</td><td style="text-align:center;padding:2px 4px;">' + ic2 + '</td></tr>'; }).join('')}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    `;

    app.innerHTML = html;

    // Event Bindings
    const goToQuestion = (targetIdx, preservePaletteScroll) => {
      if (targetIdx === S.cur) return;
      if (S.qs[targetIdx]) {
        S.qs[targetIdx].revisitCount++;
      }

      // Preserve palette scroll offset so it doesn't jump to top
      const paletteGrid = app.querySelector('.palette-grid');
      const paletteScrollTop = paletteGrid ? paletteGrid.scrollTop : null;

      S.cur = targetIdx;
      renderTest();

      // Restore palette scroll position and ensure active button is visible inside its container
      const newGrid = app.querySelector('.palette-grid');
      if (newGrid && paletteScrollTop != null) {
        newGrid.scrollTop = paletteScrollTop;
      }
      const activePaletteBtn = app.querySelector(`.palette-btn[data-idx="${targetIdx}"]`);
      if (activePaletteBtn && newGrid) {
        // Calculate offset relative to paletteGrid container only, avoiding window scroll
        const btnTop = activePaletteBtn.offsetTop - newGrid.offsetTop;
        if (btnTop < newGrid.scrollTop) {
          newGrid.scrollTop = btnTop;
        } else if (btnTop + activePaletteBtn.offsetHeight > newGrid.scrollTop + newGrid.clientHeight) {
          newGrid.scrollTop = btnTop + activePaletteBtn.offsetHeight - newGrid.clientHeight;
        }
      }
    };

    // Option selection
    app.querySelectorAll('input[name="option-choice"]').forEach(radio => {
      radio.onchange = () => {
        const val = +radio.value;
        if (q.sel != null && q.sel !== val) {
          q.answerChangedCount++;
        }
        q.sel = val;
        renderTest();
      };
    });

    // Nav buttons
    const prevBtn = document.getElementById('btn-prev-q');
    if (prevBtn) prevBtn.onclick = () => goToQuestion(S.cur - 1);

    const nextBtn = document.getElementById('btn-next-q');
    if (nextBtn) nextBtn.onclick = () => goToQuestion(S.cur + 1);

    const clearBtn = document.getElementById('btn-clear-q');
    if (clearBtn) clearBtn.onclick = () => {
      q.sel = null;
      renderTest();
    };

    const markBtn = document.getElementById('btn-mark-review');
    if (markBtn) markBtn.onclick = () => {
      q.markedForReview = !q.markedForReview;
      renderTest();
    };

    // Palette navigation (preserves current scroll)
    app.querySelectorAll('.palette-btn').forEach(btn => {
      btn.onclick = () => goToQuestion(+btn.dataset.idx, true);
    });

    // Auto-scroll active palette button into view inside container without moving whole page
    const currentBtn = app.querySelector(`.palette-btn[data-idx="${S.cur}"]`);
    const currentGrid = app.querySelector('.palette-grid');
    if (currentBtn && currentGrid) {
      const btnTop = currentBtn.offsetTop - currentGrid.offsetTop;
      if (btnTop < currentGrid.scrollTop) {
        currentGrid.scrollTop = btnTop;
      } else if (btnTop + currentBtn.offsetHeight > currentGrid.scrollTop + currentGrid.clientHeight) {
        currentGrid.scrollTop = btnTop + currentBtn.offsetHeight - currentGrid.clientHeight;
      }
    }

    // Pause / Resume test toggle (Zero popups)
    const pauseBtn = document.getElementById('btn-pause-test');
    if (pauseBtn) {
      pauseBtn.onclick = (e) => {
        e.preventDefault();
        toggleTestPause();
      };
    }

    // Exit test
    const exitBtn = document.getElementById('btn-exit-test');
    if (exitBtn) exitBtn.onclick = () => {
      showConfirm('Are you sure you want to exit? Your ongoing answers will not be saved.', 'Exit Test?')
        .then(ok => {
          if (ok) {
            clearInterval(timerInterval);
            document.body.classList.remove('exam-mode'); // restore sidebar + topbar
            const returnHash = (S && S.t && S.t.subject && S.t.topic)
              ? `#/topic/${S.t.subject}/${S.t.topic}`
              : '#/';
            S = null;
            location.hash = returnHash;
          }
        });
    };

    // Submit test
    const submitBtn = document.getElementById('btn-submit-test');
    if (submitBtn) submitBtn.onclick = async () => {
      const ok = await showConfirm('Are you sure you want to submit your test?', 'Submit Test');
      if (!ok) return;
      submitBtn.disabled = true;
      submitBtn.textContent = '⏳ Submitting…';
      finishTest();
    };
  }

  // Keyboard navigation
  document.addEventListener('keydown', e => {
    if (!S || S.phase !== 'test' || e.ctrlKey || e.altKey || e.metaKey) return;
    const q = S.qs[S.cur];
    const k = e.key.toLowerCase();
    if (/^[1-5]$/.test(k) && +k <= q.opts.length) {
      const optIdx = +k - 1;
      if (q.sel != null && q.sel !== optIdx) q.answerChangedCount++;
      q.sel = optIdx;
      renderTest();
    } else if (k === 'n' && S.cur < S.qs.length - 1) {
      if (S.qs[S.cur + 1]) S.qs[S.cur + 1].revisitCount++;
      S.cur++;
      renderTest();
    } else if (k === 'p' && S.cur > 0) {
      if (S.qs[S.cur - 1]) S.qs[S.cur - 1].revisitCount++;
      S.cur--;
      renderTest();
    }
  });

  // --------------------------------------------------------------------------
  // TEST SUBMISSION & ADVANCED ANALYSIS GENERATION
  // --------------------------------------------------------------------------
  function finishTest() {
    clearInterval(timerInterval);
    document.removeEventListener('visibilitychange', handleTabVisibility);
    document.body.classList.remove('exam-mode'); // restore sidebar + topbar

    try {
      const m = S.t.marking || { correct: 1, wrong: 0 };
      const benchmark = Analytics.getBenchmark(S.t.topic);

      // Build question-wise detailed records
      const rows = S.qs.map((q, idx) => {
        const qHist = questionHistoryCache[q.id] || { times: [] };
        const prevTimes = qHist.times || [];
        const isCorrect = q.ci != null && q.sel === q.ci;
        const isSkipped = q.sel == null;

        const st = q.ci == null ? 'No key' : isSkipped ? 'Unanswered' : isCorrect ? 'Correct' : 'Incorrect';
        let classification = { speedClass: 'normal', label: 'Normal', badgeClass: 'badge-muted', action: 'Maintain Speed' };
        try { classification = Analytics.classifyQuestionSpeed(q.time, isCorrect, isSkipped, benchmark, prevTimes); } catch(e) {}

        const prevTime = prevTimes.length ? prevTimes[prevTimes.length - 1] : null;
        let speedDeltaPct = null;
        let speedTrendText = 'First Attempt';
        if (prevTime) {
          speedDeltaPct = +(((prevTime - q.time) / prevTime) * 100).toFixed(1);
          if (q.time < prevTime * 0.9) speedTrendText = `Faster (${Math.abs(speedDeltaPct)}% less time)`;
          else if (q.time > prevTime * 1.1) speedTrendText = `Slower (${Math.abs(speedDeltaPct)}% more time)`;
          else speedTrendText = 'Same pace';
        }

        return {
          i: idx + 1,
          id: q.id,
          n: q.n,
          bankIndex: q.bankIndex,
          q: q.q,
          opts: q.opts,
          sel: q.sel,
          ci: q.ci,
          time: q.time,
          revisitCount: q.revisitCount || 0,
          answerChangedCount: q.answerChangedCount || 0,
          markedForReview: !!q.markedForReview,
          prev: prevTimes,
          prevTime,
          speedDeltaPct,
          speedTrendText,
          fastestHistorical: qHist.fastestTime || q.time,
          f: q.f,
          st,
          speedClass: classification.speedClass,
          speedLabel: classification.label,
          speedBadge: classification.badgeClass,
          recommendedAction: classification.action || 'Maintain Speed'
        };
      });

      const c = key => rows.filter(r => r.st === key).length;
      const correctCount   = c('Correct');
      const incorrectCount = c('Incorrect');
      const unansweredCount = c('Unanswered');
      const nokeyCount     = c('No key');
      const attemptedCount = rows.filter(r => r.sel != null).length;
      const scoredTotal    = correctCount + incorrectCount;
      const accuracy  = scoredTotal ? +((correctCount / scoredTotal) * 100).toFixed(1) : 0;
      const score     = +(correctCount * m.correct - incorrectCount * m.wrong).toFixed(2);
      const maxScore  = (rows.length - nokeyCount) * m.correct;
      const avgTime   = attemptedCount ? +(S.sec / attemptedCount).toFixed(1) : +(S.sec / Math.max(rows.length, 1)).toFixed(1);

      const bIndices = rows.map(r => r.bankIndex).filter(n => typeof n === 'number' && !isNaN(n));
      const qFrom = S.o?.from != null ? +S.o.from : (bIndices.length ? Math.min(...bIndices) : 1);
      const qTo   = S.o?.to != null ? +S.o.to : (bIndices.length ? Math.max(...bIndices) : rows.length);

      const R = {
        id:        'att_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        ts:        new Date().toISOString(),
        testId:    S.t.id,
        testName:  S.t.name,
        source:    S.t.source || '',
        subject:   S.t.subject,
        topic:     S.t.topic,
        from:      qFrom,
        to:        qTo,
        isRandom:  !!S.o?.randomCount,
        isMistakes: !!S.o?.only,
        total:     rows.length,
        correct:   correctCount,
        incorrect: incorrectCount,
        unanswered: unansweredCount,
        nokey:     nokeyCount,
        attempted: attemptedCount,
        sec:       S.sec,
        avg:       avgTime,
        accuracy,
        score,
        max:       maxScore,
        rows,
        qt:    Object.fromEntries(rows.filter(r => r.time > 0).map(r => [r.id, r.time])),
        wrong: rows.filter(r => r.st === 'Incorrect' || r.st === 'Unanswered').map(r => r.id),
        ok:    rows.filter(r => r.st === 'Correct').map(r => r.id),
        opts:  S.o ? Object.assign({}, S.o) : null
      };

      // localStorage is written synchronously inside saveAttempt — no await needed.
      // IndexedDB runs in the background and must NOT block the redirect.
      Storage.saveAttempt(R).catch(e => console.warn('saveAttempt (IDB) failed:', e));
      refreshCacheSync(); // sync update so renderResult has fresh data immediately

      // Capture before overwriting S
      const savedT = S.t;
      const savedO = S.o;

      S = { phase: 'result', result: R, t: savedT, o: savedO, filter: 'All' };

      // Navigate instantly to Detailed Performance Report
      history.replaceState(null, '', '#/result');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      renderResult();

    } catch (err) {
      console.error('finishTest error:', err);
      app.innerHTML = `
        <div style="padding:40px; text-align:center;">
          <h2 style="color:var(--color-danger, red);">⚠️ Error generating report</h2>
          <p style="margin:16px 0; color:var(--text-secondary);">${err.message}</p>
          <p style="font-size:0.85rem; color:var(--text-muted); font-family:monospace;">${err.stack || ''}</p>
          <a href="#/" class="btn" style="margin-top:20px;">Back to Dashboard</a>
        </div>`;
    }
  }

  // --------------------------------------------------------------------------
  // PAGE: RESULT & ADVANCED TEST ANALYSIS
  // --------------------------------------------------------------------------
  function renderResult() {
    const R = S.result;
    const [sn, tn] = names(R.subject, R.topic);
    const f = S.filter || 'All';
    const benchmark = Analytics.getBenchmark(R.topic);

    // Compute Diagnostics & Improvement Plan (guarded so failures don't block report)
    let topicDiags = [];
    let plan = { primaryTopic: tn, priority: 'Normal', summary: 'Keep practising to improve your speed and accuracy.', recommendations: [] };
    try { topicDiags = Analytics.computeTopicDiagnostics(attemptsCache, C.subjects); } catch(e) { console.warn('computeTopicDiagnostics error:', e); }
    try { plan = Analytics.generateImprovementPlan(R, attemptsCache, topicDiags); } catch(e) { console.warn('generateImprovementPlan error:', e); }

    // Filtering rows
    let filteredRows = R.rows.filter(r => {
      if (f === 'All') return true;
      if (f === 'Correct') return r.st === 'Correct';
      if (f === 'Incorrect') return r.st === 'Incorrect';
      if (f === 'Unanswered') return r.st === 'Unanswered';
      if (f === 'Slowest') return r.time > benchmark * 1.25;
      if (f === 'Mistakes') return r.st === 'Incorrect';
      if (f === 'SpeedImproved') return r.speedDeltaPct > 0;
      if (f === 'SpeedDeclined') return r.speedDeltaPct < 0;
      return true;
    });

    let html = `
      <nav class="crumb">
        <a href="#/">Dashboard</a> &rsaquo;
        <a href="#/topic/${R.subject}/${R.topic}">${esc(tn)}</a> &rsaquo;
        <span><b>Detailed Performance Report</b></span>
      </nav>

      <!-- Top Summary Banner -->
      <div class="results-summary-banner">
        <div>
          <span style="text-transform:uppercase; font-size:0.8rem; letter-spacing:0.05em; opacity:0.85;">Test Completed</span>
          <h1 style="color:#fff; margin:4px 0 8px;">${esc(R.testName)}</h1>
          <p style="opacity:0.9; font-size:0.95rem;">
            Attempt Date: <b>${new Date(R.ts).toLocaleString()}</b> &middot; Topic: <b>${esc(tn)}</b>
          </p>
        </div>
        <div style="text-align:right;">
          <div class="summary-score-large">${(R.accuracy || 0).toFixed(1)}%</div>
          <div style="font-size:1.1rem; font-weight:600;">Score: ${R.score} / ${R.max}</div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-title">Questions Attempted</div>
          <div class="metric-val">${R.attempted} / ${R.total}</div>
          <div class="metric-sub">${R.unanswered} skipped</div>
        </div>
        <div class="metric-card success">
          <div class="metric-title">Correct Answers</div>
          <div class="metric-val">${R.correct}</div>
          <div class="metric-sub">+${(R.correct * (R.t?.marking?.correct || 1)).toFixed(2)} marks</div>
        </div>
        <div class="metric-card danger">
          <div class="metric-title">Incorrect Answers</div>
          <div class="metric-val">${R.incorrect}</div>
          <div class="metric-sub">Negative impact: -${(R.incorrect * (R.t?.marking?.wrong || 0)).toFixed(2)}</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">Total Active Time</div>
          <div class="metric-val">${fmt(R.sec)}</div>
          <div class="metric-sub">Avg pace: ${(R.avg || 0).toFixed(1)}s / attempted Q</div>
        </div>
      </div>

      <!-- Improvement Plan Callout -->
      <div class="rec-box mb-4">
        <div class="flex-between mb-4">
          <div style="font-size:1.1rem; font-weight:700; color:var(--brand-primary);">
            💡 Personalized Improvement Plan (${esc(plan.primaryTopic)})
          </div>
          <span class="badge ${plan.priority === 'Critical' ? 'badge-danger' : plan.priority === 'High' ? 'badge-warning' : 'badge-primary'}">
            Priority: ${plan.priority}
          </span>
        </div>
        <p style="font-size:0.98rem; color:var(--text-primary); margin-bottom:16px;">
          ${esc(plan.summary)}
        </p>

        <div style="display:flex; flex-direction:column; gap:10px;">
          ${plan.recommendations.map(rec => `
            <div class="rec-item">
              <span style="font-size:1.3rem;">${rec.type === 'speed' ? '⚡' : rec.type === 'accuracy' ? '🎯' : rec.type === 'repeat' ? '🔄' : '📚'}</span>
              <div>
                <b style="color:var(--text-primary); font-size:0.95rem;">${esc(rec.title)}</b>
                <p style="font-size:0.88rem; color:var(--text-secondary); margin-top:2px;">${esc(rec.desc)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Charts Section (2 Columns) -->
      <div class="results-grid-2col">
        <div class="chart-box">
          <div class="chart-title">📊 Answer Distribution</div>
          <div id="chart-pie-results"></div>
        </div>
        <div class="chart-box">
          <div class="flex-between">
            <div class="chart-title">⏱️ Question-Wise Time vs Target Benchmark (${benchmark}s)</div>
            <span class="text-muted text-sm" style="font-weight:600; color:var(--brand-primary);">💡 Click any bar to review</span>
          </div>
          <div id="chart-bar-times"></div>
        </div>
      </div>

      <!-- Question-Wise Performance Table & Filters -->
      <div class="card mb-4">
        <div class="flex-between mb-4">
          <h3>Question-Wise Time &amp; Historical Speed Analysis</h3>
          <span class="text-muted text-sm">Click 'Review' to inspect detailed solution and comparison</span>
        </div>

        <div class="filter-tabs">
          <button class="filter-btn ${f === 'All' ? 'active' : ''}" data-filter="All">All (${R.rows.length})</button>
          <button class="filter-btn ${f === 'Correct' ? 'active' : ''}" data-filter="Correct">Correct (${R.correct})</button>
          <button class="filter-btn ${f === 'Incorrect' ? 'active' : ''}" data-filter="Incorrect">Incorrect (${R.incorrect})</button>
          <button class="filter-btn ${f === 'Unanswered' ? 'active' : ''}" data-filter="Unanswered">Skipped (${R.unanswered})</button>
          <button class="filter-btn ${f === 'Slowest' ? 'active' : ''}" data-filter="Slowest">Slow (>1.25x target)</button>
          <button class="filter-btn ${f === 'SpeedImproved' ? 'active' : ''}" data-filter="SpeedImproved">Speed Improved</button>
          <button class="filter-btn ${f === 'SpeedDeclined' ? 'active' : ''}" data-filter="SpeedDeclined">Speed Declined</button>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Q#</th>
                <th>Question Preview</th>
                <th>Your Answer</th>
                <th>Correct Key</th>
                <th>Result</th>
                <th>Time Spent</th>
                <th>Speed Status</th>
                <th>Historical Speed Trend</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${filteredRows.map(r => `
                <tr>
                  <td><b>Q${esc(r.n)}</b></td>
                  <td style="max-width:280px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;" title="${esc(r.q)}">
                    ${esc(r.q)}
                  </td>
                  <td>${r.sel == null ? '<span class="text-muted">Skipped</span>' : `<b>${LET[r.sel]}</b>. ${esc(r.opts[r.sel])}`}</td>
                  <td>${r.ci == null ? '<span class="text-muted">No key</span>' : `<b>${LET[r.ci]}</b>. ${esc(r.opts[r.ci])}`}</td>
                  <td>
                    <span class="badge ${r.st === 'Correct' ? 'badge-success' : r.st === 'Incorrect' ? 'badge-danger' : 'badge-muted'}">
                      ${r.st}
                    </span>
                  </td>
                  <td><b>${r.time}s</b></td>
                  <td><span class="badge ${r.speedBadge}">${esc(r.speedLabel)}</span></td>
                  <td>
                    <span style="font-size:0.85rem; color:${r.speedDeltaPct > 0 ? 'var(--color-success)' : r.speedDeltaPct < 0 ? 'var(--color-danger)' : 'var(--text-muted)'}; font-weight:600;">
                      ${esc(r.speedTrendText)}
                    </span>
                  <td>
                    <button class="btn alt sm" data-reviewqid="${esc(r.id)}" data-reviewidx="${r.i - 1}">Review</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Action Buttons Footer -->
      <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:40px;">
        <button class="btn" id="btn-export-excel">📥 Download Excel Sheet</button>
        <button class="btn alt" id="btn-repeat-test">🔄 Repeat Test</button>
        <button class="btn danger" id="btn-delete-current-result">🗑️ Delete Attempt</button>
        <a href="#/topic/${R.subject}/${R.topic}" class="btn alt">Back to ${esc(tn)}</a>
        <a href="#/" class="btn alt">Dashboard</a>
      </div>
    `;

    app.innerHTML = html;

    // Render Charts
    Charts.renderDonut('chart-pie-results', [
      { label: 'Correct', value: R.correct, color: '#10b981' },
      { label: 'Incorrect', value: R.incorrect, color: '#ef4444' },
      { label: 'Skipped', value: R.unanswered, color: '#8b5cf6' }
    ]);

    const barItems = R.rows.map((r, idx) => ({
      id: r.id,
      idx: idx,
      label: `Q${r.n}`,
      shortLabel: r.n,
      value: r.time,
      prevTime: r.prevTime,
      speedDeltaPct: r.speedDeltaPct,
      status: r.st,
      color: r.st === 'Correct' ? (r.time <= benchmark ? '#10b981' : '#f59e0b') : '#ef4444'
    }));
    Charts.renderBarChart('chart-bar-times', barItems, {
      target: benchmark,
      onBarClick: (item, idx) => {
        openQuestionReviewModal(R.rows[idx], benchmark);
      }
    });

    // Filter Buttons Event
    app.querySelectorAll('[data-filter]').forEach(b => {
      b.onclick = () => {
        S.filter = b.dataset.filter;
        renderResult();
      };
    });

    // Review Modal Event
    app.querySelectorAll('[data-reviewqid], [data-reviewidx]').forEach(b => {
      b.onclick = () => {
        const qid = b.dataset.reviewqid;
        const row = (qid ? R.rows.find(x => x.id === qid) : null) || R.rows[+b.dataset.reviewidx];
        if (row) openQuestionReviewModal(row, benchmark);
      };
    });

    // Excel Export
    document.getElementById('btn-export-excel').onclick = () => exportAttemptToExcel(R);

    // Repeat Test (re-attempt exact questions from this attempt)
    document.getElementById('btn-repeat-test').onclick = () => {
      let repeatOpts = S.o ? Object.assign({}, S.o) : (R.opts ? Object.assign({}, R.opts) : null);
      if (!repeatOpts) {
        if (R.rows && R.rows.length) {
          repeatOpts = { only: R.rows.map(r => r.id), lim: 0, sq: false, so: false };
        } else if (R.from != null && R.to != null) {
          repeatOpts = { from: R.from, to: R.to, lim: 0, sq: false, so: false };
        } else {
          repeatOpts = { from: 1, to: S.t.count, lim: 0, sq: false, so: false };
        }
      }
      // If repeatOpts is still broad (e.g. from 1 to 180) but attempt was only specific questions
      if (R.rows && R.rows.length && (!repeatOpts.only && (!repeatOpts.from || !repeatOpts.to || (repeatOpts.to - repeatOpts.from + 1) > R.rows.length))) {
        repeatOpts.only = R.rows.map(r => r.id);
      }
      startTest(S.t, repeatOpts);
    };

    // Delete Attempt from results view
    // Delete Attempt from results view (Inline confirmation, zero popups)
    const delResBtn = document.getElementById('btn-delete-current-result');
    if (delResBtn) {
      delResBtn.onclick = async () => {
        if (!delResBtn.dataset.confirming) {
          delResBtn.dataset.confirming = 'true';
          const originalHTML = delResBtn.innerHTML;
          delResBtn.innerHTML = '⚠️ Confirm Delete?';
          setTimeout(() => {
            if (delResBtn && delResBtn.dataset && delResBtn.dataset.confirming) {
              delete delResBtn.dataset.confirming;
              delResBtn.innerHTML = originalHTML;
            }
          }, 4000);
          return;
        }

        delete delResBtn.dataset.confirming;
        if (R.id) {
          attemptsCache = attemptsCache.filter(a => a.id !== R.id);
          questionHistoryCache = Analytics.buildQuestionHistory(attemptsCache);
          await Storage.deleteAttempt(R.id);
        }
        showToast('✓ Test attempt deleted');
        location.hash = `#/topic/${R.subject}/${R.topic}`;
      };
    }
  }
  // --------------------------------------------------------------------------
  // QUESTION REVIEW MODAL (Detailed Explanations & Comparisons)
  // --------------------------------------------------------------------------
  function openQuestionReviewModal(row, benchmark) {
    if (!row) return;
    var dlgEl = document.getElementById('question-review-modal') || document.getElementById('dlg');
    if (!dlgEl) {
      dlgEl = document.createElement('dialog');
      dlgEl.id = 'question-review-modal';
      document.body.appendChild(dlgEl);
    }

    var qHistory = questionHistoryCache[row.id] || { times: [], statuses: [], attemptsList: [] };
    var attemptsRowsHTML = (qHistory.attemptsList || []).map(function(a) {
      var dateStr = new Date(a.date).toLocaleString();
      var s = a.status;
      var statusBadge = s === 'Correct' ? '<span class="badge badge-success">Correct</span>'
        : s === 'Incorrect' ? '<span class="badge badge-danger">Incorrect</span>'
        : s === 'Skipped' ? '<span class="badge badge-muted">Skipped</span>'
        : '<span class="badge badge-muted">' + esc(s) + '</span>';
      return '<tr><td>' + dateStr + '</td><td>' + esc(a.testName) + '</td><td>' + a.time + 's</td><td>' + statusBadge + '</td></tr>';
    }).join('');

    var optionsHTML = (row.opts || []).map(function(opt, i) {
      var styleClass = '';
      var badgeTag = '';
      if (i === row.ci) {
        styleClass = 'border-color:var(--color-success);background:var(--color-success-bg);font-weight:600;';
        badgeTag = ' \u2190 Correct Answer Key';
      }
      if (i === row.sel) {
        if (row.st === 'Incorrect') {
          styleClass = 'border-color:var(--color-danger);background:var(--color-danger-bg);';
          badgeTag = ' \u2190 Your Answer (Incorrect)';
        } else {
          badgeTag = ' \u2190 Your Answer';
        }
      }
      return '<div class="option-item" style="' + styleClass + '"><span class="opt-prefix">' + LET[i] + '</span><span>' + esc(opt) + badgeTag + '</span></div>';
    }).join('');

    var noteHTML = row.f ? '<div class="rec-box mb-4" style="padding:10px;"><b class="text-warning">Note:</b> ' + esc(row.f) + '</div>' : '';
    var historyBlock = attemptsRowsHTML
      ? '<div class="table-container" style="max-height:200px;overflow:auto;margin-top:8px;"><table class="data-table" style="width:100%;font-size:0.85rem;"><thead><tr><th>Date &amp; Time</th><th>Test Name</th><th>Time (s)</th><th>Status</th></tr></thead><tbody>' + attemptsRowsHTML + '</tbody></table></div>'
      : '<div class="text-muted mt-2" style="font-size:0.85rem;">No prior attempts recorded yet.</div>';

    dlgEl.innerHTML =
      '<div class="flex-between mb-4">' +
        '<div style="display:flex;align-items:center;gap:10px;">' +
          '<span style="font-size:1.3rem;">📋</span>' +
          '<h3 style="margin:0;">Question Q' + esc(String(row.n)) + ' Details</h3>' +
        '</div>' +
        '<button class="modal-close-btn" id="dlg-close-x" title="Close (or tap outside)" aria-label="Close modal">&times;</button>' +
      '</div>' +
      '<div class="question-text mb-4" style="font-size:1.05rem;">' + renderFormattedQuestion(row.q) + '</div>' +
      noteHTML +
      '<div class="options-list mb-4">' + optionsHTML + '</div>' +
      '<div style="background:var(--bg-secondary);padding:16px;border-radius:var(--radius-md);font-size:0.9rem;margin-bottom:20px;">' +
        '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px 14px;margin-bottom:12px;">' +
          '<div><b>Time this attempt:</b> ' + row.time + 's</div>' +
          '<div><b>Benchmark pace:</b> ~' + benchmark + 's</div>' +
          '<div><b>Speed:</b> <span class="badge ' + (row.speedBadge || 'badge-muted') + '">' + esc(row.speedLabel || 'Normal') + '</span></div>' +
          '<div><b>Recommendation:</b> <b>' + esc(row.recommendedAction || 'Maintain Speed') + '</b></div>' +
        '</div>' +
        '<div style="border-top:1px solid var(--border-color);padding-top:10px;margin-top:10px;">' +
          '<b>Historical Attempts:</b>' + historyBlock +
          '<div class="mt-2">Personal best: <b>' + (row.fastestHistorical || row.time) + 's</b> &middot; Trend: <b>' + esc(row.speedTrendText || 'First Attempt') + '</b></div>' +
        '</div>' +
      '</div>' +
      '<div class="flex-between"><span class="text-muted text-sm">Verified via standard banking answer key.</span><button class="btn" id="dlg-close-btn">Close Review</button></div>';

    dlgEl.showModal();
    var closeX = dlgEl.querySelector('#dlg-close-x');
    var closeBtn = dlgEl.querySelector('#dlg-close-btn');
    if (closeX) closeX.onclick = function() { dlgEl.close(); };
    if (closeBtn) closeBtn.onclick = function() { dlgEl.close(); };

    // Dismiss when touching or clicking anywhere outside the modal dialog dialog content
    dlgEl.onclick = function(e) {
      if (e.target === dlgEl) {
        dlgEl.close();
      }
    };
  }

  // --------------------------------------------------------------------------
  // PAGE: ATTEMPT HISTORY & ARCHIVES
  // --------------------------------------------------------------------------
  function renderHistory() {
    let html = `
      <nav class="crumb">
        <a href="#/">Dashboard</a> &rsaquo;
        <span><b>Attempt History &amp; Trend Tracker</b></span>
      </nav>

      <div class="flex-between mb-4">
        <div>
          <h1>Attempt History</h1>
          <p class="subtitle">Review every submitted test session, compare attempts side-by-side, or export data.</p>
        </div>
        <div style="display:flex; gap:10px;">
          <a href="#/settings" class="btn alt">⚙️ Backup &amp; Settings</a>
        </div>
      </div>

      <!-- Trend Chart Across All Attempts -->
      <div class="card mb-4">
        <div class="card-header">
          <h3>📈 Performance &amp; Speed Progress Trend</h3>
          <span class="text-muted text-sm">Chronological evolution of test accuracy and solving pace</span>
        </div>
        <div id="chart-overall-trend"></div>
      </div>

      <!-- All Attempts Table -->
      <div class="card">
        <h3>All Recorded Test Sessions (${attemptsCache.length})</h3>
        <div class="table-container mt-4">
          <table class="data-table">
            <thead>
              <tr>
                <th style="white-space:nowrap;">Date &amp; Time</th>
                <th>Test Title</th>
                <th style="white-space:nowrap;">Subject</th>
                <th style="white-space:nowrap;">Topic</th>
                <th style="white-space:nowrap; text-align:center;">From &ndash; To</th>
                <th style="white-space:nowrap; text-align:center;">Score</th>
                <th style="white-space:nowrap; text-align:center;">Accuracy</th>
                <th style="white-space:nowrap; text-align:center;">Duration</th>
                <th style="white-space:nowrap; text-align:center;">Avg / Q</th>
                <th style="white-space:nowrap; text-align:center;">Actions</th>
              </tr>
            </thead>
            <tbody>
              ${attemptsCache.length ? attemptsCache.slice().reverse().map(att => `
                <tr>
                  <td style="white-space:nowrap; font-size:0.86rem; color:var(--text-secondary);">${new Date(att.ts).toLocaleString()}</td>
                  <td><b style="color:var(--text-primary); font-size:0.92rem;">${esc(att.testName)}</b></td>
                  <td style="white-space:nowrap; color:var(--text-secondary); font-size:0.86rem;">${esc(att.subject)}</td>
                  <td style="white-space:nowrap; color:var(--text-secondary); font-size:0.86rem;">${esc(att.topic)}</td>
                  <td style="white-space:nowrap; text-align:center;"><span class="badge badge-muted" style="font-weight:700; font-size:0.82rem; padding:3px 9px;">${formatQRange(att)}</span></td>
                  <td style="white-space:nowrap; font-weight:700; text-align:center; font-variant-numeric:tabular-nums;">${att.score} / ${att.max}</td>
                  <td style="white-space:nowrap; text-align:center;"><span class="badge ${att.accuracy >= 80 ? 'badge-success' : att.accuracy >= 60 ? 'badge-warning' : 'badge-danger'}">${(att.accuracy || 0).toFixed(1)}%</span></td>
                  <td style="white-space:nowrap; text-align:center; font-variant-numeric:tabular-nums;">${fmt(att.sec)}</td>
                  <td style="white-space:nowrap; text-align:center; font-variant-numeric:tabular-nums;">${att.avg ? att.avg.toFixed(1) + 's' : (att.sec / (att.total || 1)).toFixed(1) + 's'}</td>
                  <td style="white-space:nowrap; text-align:center;">
                    <div style="display:inline-flex; gap:6px; align-items:center;">
                      <a href="#/attempt/${att.id}" class="btn alt sm" style="white-space:nowrap; padding:4px 9px; font-size:0.82rem; font-weight:600;">📊 View Report</a>
                      <button class="btn danger sm" data-delattempt="${att.id}" title="Delete Attempt" style="white-space:nowrap; padding:4px 9px; font-size:0.82rem; font-weight:700;">🗑️ Delete</button>
                    </div>
                  </td>
                </tr>
              `).join('') : '<tr><td colspan="10" class="text-muted" style="text-align:center;">No test attempts stored yet. Complete a practice test to see your history.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>
    `;

    app.innerHTML = html;

    // Render trend line
    Charts.renderTrendLine('chart-overall-trend', attemptsCache);

    // Attach delete actions (Inline confirmation, zero popups)
    app.querySelectorAll('[data-delattempt]').forEach(btn => {
      btn.onclick = async (e) => {
        e.preventDefault();
        e.stopPropagation();
        const attId = btn.dataset.delattempt;
        if (!attId) return;

        if (!btn.dataset.confirming) {
          btn.dataset.confirming = 'true';
          const originalHTML = btn.innerHTML;
          btn.innerHTML = '⚠️ Confirm?';
          btn.style.background = '#dc2626';
          btn.style.borderColor = '#b91c1c';
          btn.style.color = '#ffffff';

          setTimeout(() => {
            if (btn && btn.dataset && btn.dataset.confirming) {
              delete btn.dataset.confirming;
              btn.innerHTML = originalHTML;
              btn.style.background = '';
              btn.style.borderColor = '';
              btn.style.color = '';
            }
          }, 4000);
          return;
        }

        delete btn.dataset.confirming;
        const tr = btn.closest('tr');
        if (tr) tr.remove();
        attemptsCache = attemptsCache.filter(a => a.id !== attId);
        questionHistoryCache = Analytics.buildQuestionHistory(attemptsCache);
        await Storage.deleteAttempt(attId);
        showToast('✓ Test attempt deleted');
        renderHistory();
      };
    });
  }

  // --------------------------------------------------------------------------
  // PAGE: PERFORMANCE & PROGRESS ANALYTICS
  // --------------------------------------------------------------------------
  let perfFilterSubject = 'all'; // 'all' | 'arithmetic' | 'reasoning'
  let perfFilterStatus = 'all';  // 'all' | 'strong' | 'average' | 'weak' | 'not-started' | 'coming-soon'
  let perfSortKey = 'num';       // 'num' | 'accuracy' | 'solved' | 'attempts'
  let perfSortAsc = true;
  let perfSearchTerm = '';
  let perfTargetAccuracy = 85;

  function renderPerformancePage() {
    const topicDiags = Analytics.computeTopicDiagnostics(attemptsCache, C.subjects);

    // 1. Calculate overall inventory and metrics across all configured chapters
    let totalQsAvailable = 0;
    let totalQsSolved = 0; // count of unique questions attempted across user history
    let totalAttemptsCount = attemptsCache.length;
    let totalCorrectAll = 0;
    let totalIncorrectAll = 0;

    // Build rich chapter-level dataset
    const chaptersData = [];

    C.subjects.forEach(subj => {
      subj.topics.forEach((t, idx) => {
        const tests = testsOf(subj.id, t.id);
        const diag = topicDiags.find(d => d.topicId === t.id) || {};
        const attCount = diag.testsAttempted || 0;
        const totalAvail = tests.reduce((acc, x) => acc + (x.count || 0), 0);
        const isComingSoon = totalAvail === 0;

        // Calculate unique solved questions for this chapter
        const solvedSet = new Set();
        let correctCount = 0;
        let incorrectCount = 0;

        attemptsCache.filter(a => a.topic === t.id).forEach(a => {
          if (a.rows && Array.isArray(a.rows)) {
            a.rows.forEach(r => {
              if (r && (r.st === 'Correct' || r.st === 'Incorrect' || r.sel != null)) {
                solvedSet.add(r.id || (a.testId + ':' + (r.n || '')));
              }
            });
          }
          correctCount += (a.correct || 0);
          incorrectCount += (a.incorrect || 0);
        });

        const solvedCount = solvedSet.size || diag.attemptedQuestions || (diag.correctQuestions + diag.incorrectQuestions);
        const scoredTotal = correctCount + incorrectCount;
        const accuracy = scoredTotal > 0 ? +((correctCount / scoredTotal) * 100).toFixed(1) : (diag.accuracy || 0);
        const completionPct = totalAvail > 0 ? +Math.min(100, (solvedCount / totalAvail) * 100).toFixed(1) : 0;

        if (!isComingSoon) {
          totalQsAvailable += totalAvail;
          totalQsSolved += Math.min(solvedCount, totalAvail);
          totalCorrectAll += correctCount;
          totalIncorrectAll += incorrectCount;
        }

        // Status determination
        let status = 'not-started';
        let statusLabel = '⚪ Not Started';
        let badgeClass = 'badge-muted';

        if (isComingSoon) {
          status = 'coming-soon';
          statusLabel = '🔒 Coming Soon';
          badgeClass = 'badge-muted';
        } else if (attCount === 0) {
          status = 'not-started';
          statusLabel = '⚪ Not Started';
          badgeClass = 'badge-muted';
        } else if (accuracy >= 80) {
          status = 'strong';
          statusLabel = '🟢 Strong';
          badgeClass = 'badge-success';
        } else if (accuracy >= 60) {
          status = 'average';
          statusLabel = '🟡 Average';
          badgeClass = 'badge-warning';
        } else {
          status = 'weak';
          statusLabel = '🔴 Weak';
          badgeClass = 'badge-danger';
        }

        // Priority score for "Chapters to Concentrate On"
        // Higher score = higher priority to study!
        // 1. Weak accuracy (<60%) gets highest urgency
        // 2. Average accuracy (60-79%) gets medium urgency
        // 3. Not started chapters get high exploratory priority
        // 4. Low practice volume vs available adds urgency
        let priorityScore = 0;
        if (!isComingSoon) {
          if (attCount === 0) {
            priorityScore = 50 + (100 - completionPct) * 0.2;
          } else if (accuracy < 60) {
            priorityScore = 100 + (60 - accuracy) * 1.5 + (100 - completionPct) * 0.3;
          } else if (accuracy < 80) {
            priorityScore = 40 + (80 - accuracy) + (100 - completionPct) * 0.2;
          } else {
            priorityScore = (100 - accuracy) * 0.5 + (100 - completionPct) * 0.1;
          }
        }

        chaptersData.push({
          num: t.num || (idx + 1),
          code: `CH-${String(t.num || idx + 1).padStart(2, '0')}`,
          id: t.id,
          name: t.name,
          category: t.category || 'General',
          subjectId: subj.id,
          subjectName: subj.name,
          totalAvailable: totalAvail,
          solvedCount: Math.min(solvedCount, totalAvail),
          attempts: attCount,
          accuracy: accuracy,
          completionPct: completionPct,
          status,
          statusLabel,
          badgeClass,
          isComingSoon,
          priorityScore,
          avgTime: diag.avgTimePerAttempted || 0,
          benchmark: Analytics.getBenchmark(t.id)
        });
      });
    });

    const overallScored = totalCorrectAll + totalIncorrectAll;
    const overallAccuracy = overallScored > 0 ? +((totalCorrectAll / overallScored) * 100).toFixed(1) : 0;
    const overallCompletionPct = totalQsAvailable > 0 ? +((totalQsSolved / totalQsAvailable) * 100).toFixed(1) : 0;

    let overallStatusLabel = 'Not Started';
    let overallStatusBadge = 'badge-muted';
    if (totalAttemptsCount > 0) {
      if (overallAccuracy >= 85) { overallStatusLabel = '🏆 Excellent (≥85%)'; overallStatusBadge = 'badge-success'; }
      else if (overallAccuracy >= 70) { overallStatusLabel = '⭐ Good (70–84%)'; overallStatusBadge = 'badge-primary'; }
      else if (overallAccuracy >= 50) { overallStatusLabel = '⚠️ Needs Improvement (50–69%)'; overallStatusBadge = 'badge-warning'; }
      else { overallStatusLabel = '🚨 Critical (<50%)'; overallStatusBadge = 'badge-danger'; }
    }

    // 2. Subject-wise summaries
    const subjectsSummary = C.subjects.map(s => {
      const chaps = chaptersData.filter(c => c.subjectId === s.id && !c.isComingSoon);
      const totalAvail = chaps.reduce((acc, c) => acc + c.totalAvailable, 0);
      const totalSolved = chaps.reduce((acc, c) => acc + c.solvedCount, 0);
      const attemptedChaps = chaps.filter(c => c.attempts > 0);
      
      let sCorrect = 0;
      let sIncorrect = 0;
      attemptsCache.filter(a => a.subject === s.id).forEach(a => {
        sCorrect += (a.correct || 0);
        sIncorrect += (a.incorrect || 0);
      });
      const sScored = sCorrect + sIncorrect;
      const accuracy = sScored > 0 ? +((sCorrect / sScored) * 100).toFixed(1) : 0;
      const completion = totalAvail > 0 ? +((totalSolved / totalAvail) * 100).toFixed(1) : 0;
      const gapToTarget = Math.max(0, +(perfTargetAccuracy - accuracy).toFixed(1));

      return {
        id: s.id,
        name: s.name,
        totalAvailable: totalAvail,
        totalSolved,
        accuracy,
        completion,
        gapToTarget,
        chaptersCount: chaps.length,
        attemptedCount: attemptedChaps.length
      };
    });

    // 3. Ranked Focus Areas: Bottom 5 Weakest & Top 3 Strongest (Subject Aware)
    const activeChapters = chaptersData.filter(c => !c.isComingSoon);
    const subjectScopedActive = activeChapters.filter(c => perfFilterSubject === 'all' || c.subjectId === perfFilterSubject);

    const chaptersToFocus = [...subjectScopedActive]
      .sort((a, b) => b.priorityScore - a.priorityScore)
      .slice(0, 5);

    const strongestChapters = [...subjectScopedActive]
      .filter(c => c.attempts > 0)
      .sort((a, b) => b.accuracy - a.accuracy || b.solvedCount - a.solvedCount)
      .slice(0, 3);

    // 4. Filter and Sort table
    let filteredChaps = chaptersData.filter(c => {
      if (perfFilterSubject !== 'all' && c.subjectId !== perfFilterSubject) return false;
      if (perfFilterStatus !== 'all' && c.status !== perfFilterStatus) return false;
      if (perfSearchTerm) {
        const q = perfSearchTerm.toLowerCase();
        return c.name.toLowerCase().includes(q) || c.code.toLowerCase().includes(q) || c.category.toLowerCase().includes(q);
      }
      return true;
    });

    filteredChaps.sort((a, b) => {
      let diff = 0;
      if (perfSortKey === 'num') diff = a.num - b.num;
      else if (perfSortKey === 'accuracy') diff = a.accuracy - b.accuracy;
      else if (perfSortKey === 'solved') diff = a.solvedCount - b.solvedCount;
      else if (perfSortKey === 'attempts') diff = a.attempts - b.attempts;
      return perfSortAsc ? diff : -diff;
    });

    // Generate Auto-Insight text
    const gapOverall = +(perfTargetAccuracy - overallAccuracy).toFixed(1);
    const qsRemaining = totalQsAvailable - totalQsSolved;
    const topWeakNames = chaptersToFocus.slice(0, 2).map(c => `<b>${esc(c.name)}</b>`).join(' and ');
    let autoInsightText = '';
    if (totalAttemptsCount === 0) {
      autoInsightText = `Keep practicing questions to generate personalized diagnostic insights across your syllabus.`;
    } else if (gapOverall <= 0) {
      const surplus = Math.abs(gapOverall);
      autoInsightText = `Outstanding! Your current overall accuracy is <b>${overallAccuracy}%</b>, which surpasses your target of <b>${perfTargetAccuracy}%</b> by <b>+${surplus}%</b>. Keep solving revision drills to maintain this peak benchmark pace. Approximately <b>${qsRemaining}</b> questions remain unsolved across the active syllabus.`;
    } else {
      autoInsightText = `Your current overall accuracy is <b>${overallAccuracy}%</b>. You need <b>+${gapOverall}%</b> to reach your target of <b>${perfTargetAccuracy}%</b>. Prioritize practice on ${topWeakNames} to make the fastest score gains. Approximately <b>${qsRemaining}</b> questions remain unsolved across the active syllabus.`;
    }

    let html = `
      <nav class="crumb">
        <a href="#/">Dashboard</a> &rsaquo;
        <span><b>Performance Analytics &amp; Progress Hub</b></span>
      </nav>

      <!-- Page Header -->
      <div class="flex-between mb-4">
        <div>
          <h1>Performance &amp; Progress Analytics</h1>
          <p class="subtitle">Complete syllabus mastery, chapter-by-chapter accuracy tracking, and weak-area radar diagnostics.</p>
        </div>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button class="btn alt" id="btn-export-perf-csv">📥 Export CSV Report</button>
          <button class="btn alt" id="btn-print-perf-report">🖨️ Print / PDF</button>
        </div>
      </div>

      <!-- 1. OVERALL SUMMARY CARDS -->
      <div class="metrics-grid mb-4">
        <div class="metric-card">
          <div class="metric-title">Questions Solved</div>
          <div class="metric-val">${totalQsSolved} <span style="font-size:1rem; color:var(--text-muted); font-weight:500;">/ ${totalQsAvailable}</span></div>
          <div class="metric-sub">${overallCompletionPct}% Syllabus completed (${totalQsAvailable - totalQsSolved} left)</div>
        </div>

        <div class="metric-card ${overallAccuracy >= 80 ? 'success' : overallAccuracy >= 60 ? 'warning' : 'danger'}">
          <div class="metric-title">Overall Accuracy</div>
          <div class="metric-val">${overallAccuracy}%</div>
          <div class="metric-sub">${totalCorrectAll} correct &middot; ${totalIncorrectAll} incorrect</div>
        </div>

        <div class="metric-card">
          <div class="metric-title">Tests &amp; Drills Taken</div>
          <div class="metric-val">${totalAttemptsCount}</div>
          <div class="metric-sub">Recorded practice sessions</div>
        </div>

        <div class="metric-card">
          <div class="metric-title">Mastery Status</div>
          <div class="metric-val" style="font-size:1.35rem; margin-top:4px;">
            <span class="badge ${overallStatusBadge}" style="font-size:0.95rem; padding:6px 14px;">${overallStatusLabel}</span>
          </div>
          <div class="metric-sub mt-2">Target Benchmark: <b>${perfTargetAccuracy}%</b></div>
        </div>
      </div>

      <!-- 2. IMPROVEMENT INSIGHT CALLOUT -->
      <div class="rec-box mb-4" style="background:linear-gradient(135deg, rgba(37,99,235,0.08), rgba(79,70,229,0.04)); border:1px solid rgba(37,99,235,0.25);">
        <div class="flex-between mb-2">
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:1.4rem;">💡</span>
            <b style="font-size:1.05rem; color:var(--brand-primary);">Personalized Progress Diagnostic</b>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <label style="font-size:0.85rem; color:var(--text-secondary); font-weight:600;">Target Accuracy:</label>
            <select id="perf-target-select" style="padding:4px 8px; border-radius:6px; border:1px solid var(--border-color); font-weight:700; background:var(--bg-surface);">
              <option value="80" ${perfTargetAccuracy === 80 ? 'selected' : ''}>80%</option>
              <option value="85" ${perfTargetAccuracy === 85 ? 'selected' : ''}>85% (Recommended)</option>
              <option value="90" ${perfTargetAccuracy === 90 ? 'selected' : ''}>90% (Expert)</option>
              <option value="95" ${perfTargetAccuracy === 95 ? 'selected' : ''}>95% (Flawless)</option>
            </select>
          </div>
        </div>
        <p style="font-size:0.95rem; color:var(--text-primary); line-height:1.6; margin:0;">
          ${autoInsightText}
        </p>
      </div>

      <!-- 3. SUBJECT-WISE BREAKDOWN (Separate Subject Cards - Interactive Filter) -->
      <div class="mb-2 flex-between" style="flex-wrap:wrap; gap:8px; align-items:center;">
        <div>
          <h2 style="margin:0; font-size:1.3rem;">Subject-Wise Performance</h2>
          <p class="subtitle text-sm" style="margin:2px 0 0;">Click on a subject card to view only its chapters, charts, and recommendations.</p>
        </div>
        <div style="display:flex; gap:6px;">
          <button class="btn sm ${perfFilterSubject === 'all' ? '' : 'alt'} perf-subj-pill-btn" data-subj="all">All Subjects</button>
          <button class="btn sm ${perfFilterSubject === 'arithmetic' ? '' : 'alt'} perf-subj-pill-btn" data-subj="arithmetic">🧮 Arithmetic</button>
          <button class="btn sm ${perfFilterSubject === 'reasoning' ? '' : 'alt'} perf-subj-pill-btn" data-subj="reasoning">🧠 Reasoning</button>
        </div>
      </div>

      <div class="results-grid-2col mb-4">
        ${subjectsSummary.map(s => {
          const isSelected = perfFilterSubject === s.id;
          const isDimmed = perfFilterSubject !== 'all' && !isSelected;
          const hasAttempts = s.attemptedCount > 0;
          const gapVal = +(perfTargetAccuracy - s.accuracy).toFixed(1);
          let gapLabel = '';
          let gapColor = '#64748b';

          if (!hasAttempts) {
            gapLabel = '⚪ Not Started';
            gapColor = 'var(--text-muted)';
          } else if (gapVal <= 0) {
            const surplus = Math.abs(gapVal);
            gapLabel = surplus > 0 ? `✓ Target Met (+${surplus}%)` : `✓ Target Met (85%)`;
            gapColor = '#10b981';
          } else {
            gapLabel = `-${gapVal}% to target`;
            gapColor = '#ef4444';
          }

          return `
            <div class="card perf-subject-card ${isSelected ? 'is-active-subject' : ''}" data-subj="${s.id}"
              style="display:flex; flex-direction:column; justify-content:space-between; cursor:pointer; position:relative;
                border: 2px solid ${isSelected ? (s.id === 'arithmetic' ? '#2563eb' : '#7c3aed') : 'var(--border-color)'};
                box-shadow: ${isSelected ? '0 8px 24px rgba(37,99,235,0.14)' : '0 2px 6px rgba(0,0,0,0.03)'};
                opacity: ${isDimmed ? '0.7' : '1'};
                transition: all 0.2s ease;">
              
              <div style="position:absolute; top:12px; right:12px;">
                <span class="badge ${isSelected ? 'badge-primary' : 'badge-muted'}" style="font-size:0.75rem;">
                  ${isSelected ? '● Active Filter' : 'Click to Filter'}
                </span>
              </div>

              <div>
                <div class="flex-between mb-3" style="padding-right:75px;">
                  <div style="display:flex; align-items:center; gap:10px;">
                    <span style="font-size:1.6rem; width:44px; height:44px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:${s.id === 'arithmetic' ? 'rgba(37,99,235,0.1)' : 'rgba(124,58,237,0.1)'};">
                      ${s.id === 'arithmetic' ? '🧮' : '🧠'}
                    </span>
                    <div>
                      <h3 style="margin:0; font-size:1.2rem;">${esc(s.name)}</h3>
                      <span class="text-muted text-sm">${s.attemptedCount} of ${s.chaptersCount} active chapters started</span>
                    </div>
                  </div>
                </div>

                <div class="flex-between mb-2">
                  <span class="text-muted text-sm">Subject Accuracy:</span>
                  <span style="font-size:1.35rem; font-weight:800; color:${!hasAttempts ? 'var(--text-muted)' : s.accuracy >= 80 ? 'var(--color-success)' : s.accuracy >= 60 ? 'var(--color-warning)' : 'var(--color-danger)'};">
                    ${hasAttempts ? s.accuracy + '%' : '0%'}
                  </span>
                </div>

                <!-- Metrics sub-grid -->
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px; background:var(--bg-secondary); padding:12px; border-radius:8px;">
                  <div>
                    <span class="text-muted text-sm">Solved / Total:</span>
                    <div style="font-weight:700; font-size:1.05rem;">${s.totalSolved} / ${s.totalAvailable}</div>
                  </div>
                  <div>
                    <span class="text-muted text-sm">Target Status:</span>
                    <div style="font-weight:700; font-size:0.95rem; color:${gapColor};">
                      ${gapLabel}
                    </div>
                  </div>
                </div>

                <!-- Completion Progress Bar -->
                <div class="mb-2">
                  <div class="flex-between text-sm mb-1">
                    <span style="font-weight:600;">Syllabus Completion</span>
                    <b>${s.completion}%</b>
                  </div>
                  <div class="progress-track" style="height:10px; border-radius:5px; background:var(--border-color);">
                    <div class="progress-fill" style="width:${s.completion}%; background:${s.id === 'arithmetic' ? 'var(--brand-primary)' : '#7c3aed'}; height:100%; border-radius:5px;"></div>
                  </div>
                </div>
              </div>

              <div style="margin-top:16px; pt-2; border-top:1px solid var(--border-color); display:flex; gap:8px;">
                <button type="button" class="btn sm ${isSelected ? '' : 'alt'} perf-card-filter-btn" data-subj="${s.id}" style="flex:1;">
                  ${isSelected ? '✓ Showing ' + esc(s.name) : 'Show ' + esc(s.name) + ' Data'}
                </button>
                <a href="#/subject/${s.id}" class="btn sm alt" style="white-space:nowrap;" title="Open full chapter curriculum">
                  Curriculum &rarr;
                </a>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <!-- 4. FOCUS AREAS: Chapters to Concentrate On vs Strongest Chapters -->
      <div class="results-grid-2col mb-4">
        <!-- Weakest Chapters -->
        <div class="card" style="border-top:4px solid #ef4444;">
          <div class="flex-between mb-3">
            <div>
              <h3 style="color:#ef4444; margin:0; display:flex; align-items:center; gap:6px;">
                <span>🎯</span> Chapters to Concentrate On ${perfFilterSubject !== 'all' ? `(${perfFilterSubject === 'arithmetic' ? 'Arithmetic' : 'Reasoning'})` : ''}
              </h3>
              <p class="subtitle text-sm" style="margin:2px 0 0;">Ranked by urgency: low accuracy, low practice volume, and unpracticed topics.</p>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            ${chaptersToFocus.length ? chaptersToFocus.map((c, i) => `
              <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; padding:10px 12px; background:var(--bg-secondary); border-radius:8px; border-left:3px solid ${c.attempts === 0 ? '#94a3b8' : c.accuracy < 60 ? '#ef4444' : '#f59e0b'};">
                <div style="flex:1; min-width:0;">
                  <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
                    <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted);">${c.code}</span>
                    <b style="font-size:0.92rem; color:var(--text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${esc(c.name)}</b>
                    <span class="badge ${c.badgeClass}" style="font-size:0.72rem; padding:2px 6px;">${c.statusLabel}</span>
                  </div>
                  <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:3px;">
                    ${c.attempts > 0 ? `Accuracy: <b>${c.accuracy}%</b> &middot; Solved: ${c.solvedCount}/${c.totalAvailable} &middot; Target: 85%` : `Not yet practiced &middot; ${c.totalAvailable} questions ready`}
                  </div>
                </div>
                <a href="#/topic/${c.subjectId}/${c.id}" class="btn sm" style="white-space:nowrap;">Practice &rarr;</a>
              </div>
            `).join('') : `
              <div class="chart-empty" style="padding:24px 10px;">No weak chapters found for the selected view.</div>
            `}
          </div>
        </div>

        <!-- Strongest Chapters -->
        <div class="card" style="border-top:4px solid #10b981;">
          <div class="flex-between mb-3">
            <div>
              <h3 style="color:#10b981; margin:0; display:flex; align-items:center; gap:6px;">
                <span>🌟</span> Strongest Chapters ${perfFilterSubject !== 'all' ? `(${perfFilterSubject === 'arithmetic' ? 'Arithmetic' : 'Reasoning'})` : ''}
              </h3>
              <p class="subtitle text-sm" style="margin:2px 0 0;">Your highest performing topics. Keep solving drills to maintain top pace!</p>
            </div>
          </div>

          <div style="display:flex; flex-direction:column; gap:10px;">
            ${strongestChapters.length ? strongestChapters.map(c => `
              <div style="display:flex; align-items:center; justify-content:space-between; gap:10px; padding:12px; background:var(--bg-secondary); border-radius:8px; border-left:3px solid #10b981;">
                <div>
                  <div style="display:flex; align-items:center; gap:6px;">
                    <span style="font-size:0.75rem; font-weight:700; color:var(--text-muted);">${c.code}</span>
                    <b style="font-size:0.95rem; color:var(--text-primary);">${esc(c.name)}</b>
                    <span class="badge badge-success" style="font-size:0.72rem; padding:2px 6px;">🟢 Strong</span>
                  </div>
                  <div style="font-size:0.82rem; color:var(--text-secondary); margin-top:3px;">
                    Mastery: <b>${c.accuracy}% Accuracy</b> &middot; ${c.attempts} attempt${c.attempts > 1 ? 's' : ''} &middot; Avg speed ${c.avgTime}s/Q
                  </div>
                </div>
                <a href="#/topic/${c.subjectId}/${c.id}" class="btn sm alt">Review</a>
              </div>
            `).join('') : `
              <div class="chart-empty" style="padding:30px 10px;">Complete at least one practice test with ≥80% accuracy in this subject to display top chapters.</div>
            `}
          </div>

          <!-- Radar Chart Section Inside -->
          <div style="margin-top:20px; border-top:1px solid var(--border-color); padding-top:14px;">
            <div class="flex-between mb-2">
              <b style="font-size:0.92rem; color:var(--text-primary);">🕸️ Category Mastery Radar</b>
              <span class="text-muted text-sm">Strength across categories</span>
            </div>
            <div id="chart-category-radar"></div>
          </div>
        </div>
      </div>

      <!-- 5. CHARTS & VISUALS SECTION -->
      <div class="results-grid-2col mb-4">
        <!-- Bar Chart: Accuracy by Chapter -->
        <div class="card chart-box">
          <div class="flex-between mb-2">
            <div>
              <h3 style="margin:0;">📊 Chapter-Wise Accuracy (${perfFilterSubject === 'all' ? 'All Subjects' : perfFilterSubject === 'arithmetic' ? 'Arithmetic' : 'Reasoning'})</h3>
              <p class="subtitle text-sm" style="margin:2px 0 0;">Color-coded by mastery status. Click any bar to start practicing.</p>
            </div>
          </div>
          <div id="chart-perf-bars"></div>
        </div>

        <!-- Donut: Solved vs Unsolved per Subject -->
        <div class="card chart-box">
          <div class="flex-between mb-2">
            <div>
              <h3 style="margin:0;">🍩 Syllabus Question Coverage (${perfFilterSubject === 'all' ? 'Overall' : perfFilterSubject === 'arithmetic' ? 'Arithmetic' : 'Reasoning'})</h3>
              <p class="subtitle text-sm" style="margin:2px 0 0;">Questions completed vs remaining across selected curriculum.</p>
            </div>
          </div>
          <div id="chart-perf-coverage-donut"></div>
        </div>
      </div>

      <!-- 6. CHAPTER-WISE PERFORMANCE TABLE -->
      <div class="card mb-4">
        <div class="flex-between mb-3" style="flex-wrap:wrap; gap:12px;">
          <div>
            <h3 style="margin:0;">Chapter-Wise Performance Breakdown</h3>
            <p class="subtitle text-sm" style="margin:2px 0 0;">Inspect accuracy, attempt counts, and question volume across all 42 chapters.</p>
          </div>
          <div style="display:flex; align-items:center; gap:8px;">
            <span class="badge badge-muted" id="perf-table-count-badge">Showing ${filteredChaps.length} chapters</span>
          </div>
        </div>

        <!-- Controls: Search, Subject Filter, Status Filter, Sorting -->
        <div style="display:flex; flex-wrap:wrap; gap:10px; align-items:center; margin-bottom:18px; padding:12px 14px; background:var(--bg-secondary); border-radius:8px;">
          <div style="flex:1; min-width:220px;">
            <input type="text" id="perf-search-input" value="${esc(perfSearchTerm)}" placeholder="Search chapters by name or code (e.g. Percentages, CH-02)..." style="width:100%; padding:7px 12px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-surface); font-size:0.9rem;">
          </div>

          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <!-- Subject Filter -->
            <select id="perf-filter-subj-select" style="padding:6px 10px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-surface); font-size:0.85rem;">
              <option value="all" ${perfFilterSubject === 'all' ? 'selected' : ''}>All Subjects</option>
              <option value="arithmetic" ${perfFilterSubject === 'arithmetic' ? 'selected' : ''}>Arithmetic (23)</option>
              <option value="reasoning" ${perfFilterSubject === 'reasoning' ? 'selected' : ''}>Reasoning (19)</option>
            </select>

            <!-- Status Filter -->
            <select id="perf-filter-status-select" style="padding:6px 10px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-surface); font-size:0.85rem;">
              <option value="all" ${perfFilterStatus === 'all' ? 'selected' : ''}>All Statuses</option>
              <option value="strong" ${perfFilterStatus === 'strong' ? 'selected' : ''}>🟢 Strong (≥80%)</option>
              <option value="average" ${perfFilterStatus === 'average' ? 'selected' : ''}>🟡 Average (60–79%)</option>
              <option value="weak" ${perfFilterStatus === 'weak' ? 'selected' : ''}>🔴 Weak (&lt;60%)</option>
              <option value="not-started" ${perfFilterStatus === 'not-started' ? 'selected' : ''}>⚪ Not Started</option>
              <option value="coming-soon" ${perfFilterStatus === 'coming-soon' ? 'selected' : ''}>🔒 Coming Soon</option>
            </select>

            <!-- Sort Key -->
            <select id="perf-sort-key-select" style="padding:6px 10px; border-radius:6px; border:1px solid var(--border-color); background:var(--bg-surface); font-size:0.85rem;">
              <option value="num" ${perfSortKey === 'num' ? 'selected' : ''}>Sort: Chapter Code</option>
              <option value="accuracy" ${perfSortKey === 'accuracy' ? 'selected' : ''}>Sort: Accuracy</option>
              <option value="solved" ${perfSortKey === 'solved' ? 'selected' : ''}>Sort: Questions Solved</option>
              <option value="attempts" ${perfSortKey === 'attempts' ? 'selected' : ''}>Sort: Attempts</option>
            </select>

            <button class="btn sm alt" id="perf-sort-order-btn" title="Toggle Ascending / Descending">${perfSortAsc ? '↑ Asc' : '↓ Desc'}</button>
          </div>
        </div>

        <!-- Chapters Table -->
        <div class="table-container">
          <table class="data-table" id="perf-chapters-table">
            <thead>
              <tr>
                <th style="width:75px;">Code</th>
                <th>Chapter Name</th>
                <th style="width:120px;">Subject</th>
                <th style="width:130px; text-align:center;">Solved / Total</th>
                <th style="width:90px; text-align:center;">Attempts</th>
                <th style="width:100px; text-align:center;">Accuracy</th>
                <th style="width:140px;">Completion</th>
                <th style="width:130px; text-align:center;">Status</th>
                <th style="width:100px; text-align:center;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${filteredChaps.length ? filteredChaps.map(c => `
                <tr>
                  <td><b>${c.code}</b></td>
                  <td>
                    <b style="color:var(--text-primary); font-size:0.92rem;">${esc(c.name)}</b>
                    <div style="font-size:0.75rem; color:var(--text-muted);">${esc(c.category)}</div>
                  </td>
                  <td style="font-size:0.85rem; color:var(--text-secondary);">${esc(c.subjectName)}</td>
                  <td style="text-align:center; font-weight:600; font-size:0.9rem;">
                    ${c.isComingSoon ? '<span class="text-muted">-</span>' : `${c.solvedCount} <span style="font-weight:400; color:var(--text-muted);">/ ${c.totalAvailable}</span>`}
                  </td>
                  <td style="text-align:center; font-weight:600;">
                    ${c.attempts > 0 ? c.attempts : '<span class="text-muted">0</span>'}
                  </td>
                  <td style="text-align:center;">
                    ${c.isComingSoon ? '<span class="text-muted">-</span>' : c.attempts > 0 ? `<b style="color:${c.accuracy >= 80 ? 'var(--color-success)' : c.accuracy >= 60 ? 'var(--color-warning)' : 'var(--color-danger)'}; font-size:0.95rem;">${c.accuracy}%</b>` : '<span class="text-muted">-</span>'}
                  </td>
                  <td>
                    ${c.isComingSoon ? '<span class="text-muted text-sm">Coming Soon</span>' : `
                      <div style="display:flex; align-items:center; gap:8px;">
                        <div class="progress-track" style="flex:1; height:7px; background:var(--border-color); border-radius:4px;">
                          <div class="progress-fill" style="width:${c.completionPct}%; height:100%; border-radius:4px; background:${c.completionPct >= 80 ? 'var(--color-success)' : 'var(--brand-primary)'};"></div>
                        </div>
                        <span style="font-size:0.78rem; font-weight:600; color:var(--text-muted); width:32px;">${c.completionPct}%</span>
                      </div>
                    `}
                  </td>
                  <td style="text-align:center;">
                    <span class="badge ${c.badgeClass}" style="font-size:0.8rem; padding:3px 8px;">${c.statusLabel}</span>
                  </td>
                  <td style="text-align:center;">
                    ${c.isComingSoon ? '<span class="text-muted text-sm">-</span>' : `
                      <a href="#/topic/${c.subjectId}/${c.id}" class="btn sm ${c.attempts > 0 ? 'alt' : ''}" style="padding:3px 10px; font-size:0.8rem;">
                        ${c.attempts > 0 ? 'Practice' : 'Start'}
                      </a>
                    `}
                  </td>
                </tr>
              `).join('') : `
                <tr>
                  <td colspan="9" style="text-align:center; padding:30px;" class="text-muted">
                    No chapters matched your search and filter criteria.
                  </td>
                </tr>
              `}
            </tbody>
          </table>
        </div>
      </div>
    `;

    app.innerHTML = html;

    // Attach Event Handlers: Search, Filters, Target Select, Sorting, Exports
    const searchInput = document.getElementById('perf-search-input');
    if (searchInput) {
      searchInput.oninput = (e) => {
        perfSearchTerm = e.target.value.trim();
        renderPerformancePage();
      };
    }

    const subjSelect = document.getElementById('perf-filter-subj-select');
    if (subjSelect) {
      subjSelect.onchange = (e) => {
        perfFilterSubject = e.target.value;
        renderPerformancePage();
      };
    }

    const statusSelect = document.getElementById('perf-filter-status-select');
    if (statusSelect) {
      statusSelect.onchange = (e) => {
        perfFilterStatus = e.target.value;
        renderPerformancePage();
      };
    }

    const sortKeySelect = document.getElementById('perf-sort-key-select');
    if (sortKeySelect) {
      sortKeySelect.onchange = (e) => {
        perfSortKey = e.target.value;
        renderPerformancePage();
      };
    }

    const sortOrderBtn = document.getElementById('perf-sort-order-btn');
    if (sortOrderBtn) {
      sortOrderBtn.onclick = () => {
        perfSortAsc = !perfSortAsc;
        renderPerformancePage();
      };
    }

    const targetSelect = document.getElementById('perf-target-select');
    if (targetSelect) {
      targetSelect.onchange = (e) => {
        perfTargetAccuracy = +e.target.value;
        renderPerformancePage();
      };
    }

    // CSV Export
    const csvBtn = document.getElementById('btn-export-perf-csv');
    if (csvBtn) {
      csvBtn.onclick = () => {
        exportPerformanceCSV(chaptersData, overallAccuracy, totalQsSolved, totalQsAvailable);
      };
    }

    // Print / PDF
    const printBtn = document.getElementById('btn-print-perf-report');
    if (printBtn) {
      printBtn.onclick = () => window.print();
    }

    // Subject Cards & Pill Switchers (Interactive Separation)
    document.querySelectorAll('.perf-subject-card, .perf-card-filter-btn').forEach(elem => {
      elem.onclick = (e) => {
        // If clicking the direct 'Curriculum ->' anchor, let default navigation occur
        if (e.target.closest('a[href^="#/subject/"]')) return;
        const subj = elem.dataset.subj;
        if (subj) {
          // If already selected, clicking it again resets to 'all' for easy toggle
          perfFilterSubject = (perfFilterSubject === subj && !elem.classList.contains('perf-card-filter-btn')) ? 'all' : subj;
          renderPerformancePage();
        }
      };
    });

    document.querySelectorAll('.perf-subj-pill-btn').forEach(btn => {
      btn.onclick = () => {
        perfFilterSubject = btn.dataset.subj || 'all';
        renderPerformancePage();
      };
    });

    // 5. RENDER CHARTS
    // A. Category Mastery Radar Chart (Subject Scoped)
    const categoriesMap = {};
    subjectScopedActive.forEach(c => {
      const cat = c.category || 'General';
      if (!categoriesMap[cat]) categoriesMap[cat] = { totalAcc: 0, count: 0 };
      if (c.attempts > 0) {
        categoriesMap[cat].totalAcc += c.accuracy;
        categoriesMap[cat].count++;
      }
    });

    const categoryList = Object.keys(categoriesMap).map(k => ({
      name: k,
      score: categoriesMap[k].count ? Math.round(categoriesMap[k].totalAcc / categoriesMap[k].count) : 0
    })).filter(c => c.score > 0);

    if (categoryList.length >= 3 && Charts.renderRadarChart) {
      Charts.renderRadarChart('chart-category-radar', categoryList, { size: 300 });
    } else {
      const el = document.getElementById('chart-category-radar');
      if (el) el.innerHTML = '<div class="chart-empty" style="padding:16px 0;">Attempt tests in 3+ categories in this subject to generate Radar visualization.</div>';
    }

    // B. Accuracy by Chapter (Horizontal/Vertical Bar Chart - Scoped by Subject)
    const activeWithAttempts = subjectScopedActive.filter(c => c.attempts > 0);
    if (activeWithAttempts.length) {
      const barItems = activeWithAttempts.map(c => ({
        label: c.name,
        shortLabel: c.code.replace('CH-', ''),
        value: c.accuracy,
        color: c.accuracy >= 80 ? '#10b981' : c.accuracy >= 60 ? '#f59e0b' : '#ef4444',
        status: `${c.accuracy}% Acc · ${c.attempts} att`
      }));
      Charts.renderBarChart('chart-perf-bars', barItems, {
        target: perfTargetAccuracy,
        unit: '%',
        onBarClick: (item, idx) => {
          const ch = activeWithAttempts[idx];
          if (ch) location.hash = `#/topic/${ch.subjectId}/${ch.id}`;
        }
      });
    } else {
      const el = document.getElementById('chart-perf-bars');
      if (el) el.innerHTML = `<div class="chart-empty">No ${perfFilterSubject === 'all' ? '' : perfFilterSubject === 'arithmetic' ? 'Arithmetic ' : 'Reasoning '}chapter attempts recorded yet. Start practicing to generate accuracy chart!</div>`;
    }

    // C. Donut Chart: Solved vs Remaining (Scoped by Subject)
    const scopedAvail = subjectScopedActive.reduce((acc, c) => acc + c.totalAvailable, 0);
    const scopedSolved = subjectScopedActive.reduce((acc, c) => acc + c.solvedCount, 0);
    const remainingQs = Math.max(0, scopedAvail - scopedSolved);
    Charts.renderDonut('chart-perf-coverage-donut', [
      { label: 'Solved Questions', value: scopedSolved, color: '#10b981' },
      { label: 'Unsolved Questions', value: remainingQs, color: '#cbd5e1' }
    ], { size: 200 });
  }

  // Helper for CSV export
  function exportPerformanceCSV(chapters, overallAcc, solved, available) {
    const rows = [
      ['BankPrep Pro - Overall Progress & Performance Report'],
      ['Export Date', new Date().toLocaleString()],
      ['Overall Accuracy', `${overallAcc}%`],
      ['Total Questions Solved', solved],
      ['Total Available Questions', available],
      [],
      ['Code', 'Chapter Name', 'Subject', 'Category', 'Solved Qs', 'Total Available', 'Attempts', 'Accuracy (%)', 'Completion (%)', 'Status']
    ];

    chapters.forEach(c => {
      rows.push([
        c.code,
        `"${c.name}"`,
        c.subjectName,
        c.category,
        c.solvedCount,
        c.totalAvailable,
        c.attempts,
        c.accuracy,
        c.completionPct,
        c.statusLabel.replace(/[^\w\s]/g, '').trim()
      ]);
    });

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(r => r.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Performance_Analytics_Report_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }
  async function viewAttemptById(attemptId) {
    const attempt = attemptsCache.find(a => a.id === attemptId);
    if (!attempt) {
      alert('Attempt not found.');
      location.hash = '#/history';
      return;
    }

    if (attempt.isDrill && window.BankDrill && window.BankDrill.renderAttempt) {
      return window.BankDrill.renderAttempt(attempt);
    }

    const testConfig = C.tests.find(x => x.id === attempt.testId);
    if (!testConfig) {
      alert('Associated test configuration was not found.');
      return;
    }

    try {
      const bank = await loadData(testConfig);
      const benchmark = Analytics.getBenchmark(attempt.topic);

      // Reconstruct rows if needed
      let reconstructedRows = [];
      if (attempt.rows && attempt.rows[0] && attempt.rows[0].q) {
        reconstructedRows = attempt.rows;
      } else {
        // Older compact format [n, sel, time]
        reconstructedRows = (attempt.rows || []).map((r, k) => {
          const qn = Array.isArray(r) ? r[0] : r.n;
          const sel = Array.isArray(r) ? r[1] : r.sel;
          const time = Array.isArray(r) ? r[2] : r.time;
          const q = bank.find(b => b.n === qn) || { q: 'Question ' + qn, o: [] };
          const ci = q.a;
          const st = ci == null ? 'No key' : sel == null ? 'Unanswered' : sel === ci ? 'Correct' : 'Incorrect';
          const classification = Analytics.classifyQuestionSpeed(time, sel === ci, sel == null, benchmark);

          return {
            i: k + 1,
            id: testConfig.id + ':' + qn,
            n: qn,
            q: q.q,
            opts: q.o,
            sel,
            ci,
            time,
            prev: [],
            f: q.f,
            st,
            speedClass: classification.speedClass,
            speedLabel: classification.label,
            speedBadge: classification.badgeClass,
            recommendedAction: classification.action || 'Maintain Speed',
            speedDeltaPct: 0,
            speedTrendText: 'Archived record'
          };
        });
      }

      const fullResult = Object.assign({}, attempt, {
        rows: reconstructedRows,
        t: testConfig
      });

      // Restore exact options used during this attempt (or fallback to precise row IDs)
      let restoredOpts = attempt.opts ? Object.assign({}, attempt.opts) : null;
      if (!restoredOpts) {
        if (attempt.from != null && attempt.to != null && attempt.from <= attempt.to) {
          restoredOpts = { from: attempt.from, to: attempt.to, lim: 0, sq: false, so: false };
        } else if (reconstructedRows.length) {
          const qids = reconstructedRows.map(r => r.id);
          restoredOpts = { only: qids, lim: 0, sq: false, so: false };
        } else {
          restoredOpts = { from: 1, to: testConfig.count, lim: 0, sq: false, so: false };
        }
      }

      S = {
        phase: 'result',
        result: fullResult,
        t: testConfig,
        o: restoredOpts,
        filter: 'All'
      };

      renderResult();
    } catch (e) {
      alert('Error loading attempt details: ' + e.message);
    }
  }

  // --------------------------------------------------------------------------
  // PAGE: SETTINGS & BACKUP / RESTORE
  // --------------------------------------------------------------------------
  function renderSettings() {
    let html = `
      <nav class="crumb">
        <a href="#/">Dashboard</a> &rsaquo;
        <span><b>Platform Settings &amp; Data Management</b></span>
      </nav>

      <h1>Settings &amp; Backup</h1>
      <p class="subtitle">Securely manage your attempt records, export backups, or transfer progress across browsers.</p>

      <div class="metrics-grid mb-4">
        <div class="card">
          <h3>📦 Export Backup</h3>
          <p class="text-muted" style="font-size:0.88rem; margin:8px 0 16px;">
            Download all your historical test attempts, timings, and question scores as a portable JSON file.
          </p>
          <button class="btn" id="btn-export-backup">Download JSON Backup</button>
        </div>

        <div class="card">
          <h3>📥 Restore Backup</h3>
          <p class="text-muted" style="font-size:0.88rem; margin:8px 0 16px;">
            Import a previously saved JSON backup file. This will merge or restore your attempts.
          </p>
          <input type="file" id="input-restore-file" accept=".json" style="display:none;">
          <button class="btn alt" id="btn-trigger-restore">Select Backup File</button>
        </div>

        <div class="card">
          <h3>🗑️ Clear Data</h3>
          <p class="text-muted" style="font-size:0.88rem; margin:8px 0 16px;">
            Permanently clear all attempts and cached data from this browser.
          </p>
          <button class="btn danger" id="btn-clear-all">Reset All Practice Data</button>
        </div>

        <div class="card">
          <h3>📅 Reset Daily Revision</h3>
          <p class="text-muted" style="font-size:0.88rem; margin:8px 0 16px;">
            Reset your Daily Revision progress, streak, and history. This cannot be undone.
          </p>
          <button class="btn danger" id="btn-reset-revision">Reset Daily Revision</button>
        </div>
      </div>

      <div class="card">
        <h3>💡 Offline Data Storage Notice</h3>
        <p class="text-muted" style="font-size:0.92rem; line-height:1.6; margin-top:8px;">
          All question attempts, timings, and analytical recommendations are stored locally on your device via browser IndexedDB and LocalStorage. No internet server is required. We recommend creating an occasional JSON backup before clearing browser cookies or switching computers.
        </p>
      </div>
    `;

    app.innerHTML = html;

    // Export Backup (includes attempts and drill settings)
    document.getElementById('btn-export-backup').onclick = () => {
      let drillSettings = null;
      try { drillSettings = JSON.parse(localStorage.getItem('bankprep.drill_settings.v2')); } catch(e) {}
      let dailyRevision = null;
      try { dailyRevision = JSON.parse(localStorage.getItem('bp_dailyRevision')); } catch(e) {}
      const payload = {
        version: 2,
        exportedAt: new Date().toISOString(),
        attempts: attemptsCache,
        drillSettings: drillSettings,
        dailyRevision: dailyRevision
      };
      const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(payload, null, 2));
      const a = document.createElement('a');
      a.setAttribute('href', dataStr);
      a.setAttribute('download', 'banking_exam_backup_' + new Date().toISOString().slice(0, 10) + '.json');
      document.body.appendChild(a);
      a.click();
      a.remove();
    };

    // Restore Backup (supports both array and object formats)
    const fileInput = document.getElementById('input-restore-file');
    document.getElementById('btn-trigger-restore').onclick = () => fileInput.click();
    fileInput.onchange = e => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = async event => {
        try {
          const parsed = JSON.parse(event.target.result);
          let attemptsList = [];
          if (Array.isArray(parsed)) {
            attemptsList = parsed;
          } else if (parsed && Array.isArray(parsed.attempts)) {
            attemptsList = parsed.attempts;
            if (parsed.drillSettings) {
              localStorage.setItem('bankprep.drill_settings.v2', JSON.stringify(parsed.drillSettings));
            }
            if (parsed.dailyRevision) {
              localStorage.setItem('bp_dailyRevision', JSON.stringify(parsed.dailyRevision));
            }
          } else {
            alert('Invalid backup format: file must contain attempt records.');
            return;
          }
          await Storage.saveAllAttempts(attemptsList);
          await refreshCache();
          alert(`Successfully restored ${attemptsList.length} attempt records!`);
          location.hash = '#/';
        } catch (err) {
          alert('Failed to parse backup JSON: ' + err.message);
        }
      };
      reader.readAsText(file);
    };

    // Clear Data
    document.getElementById('btn-clear-all').onclick = async () => {
      if (confirm('WARNING: Are you sure you want to delete ALL test attempts and history? This cannot be undone.')) {
        await Storage.clearAllData();
        await refreshCache();
        alert('All practice data has been reset.');
        location.hash = '#/';
      }
    };

    // Reset Daily Revision
    const resetRevBtn = document.getElementById('btn-reset-revision');
    if (resetRevBtn) {
      resetRevBtn.onclick = () => {
        if (window.DailyRevision) window.DailyRevision.resetProgress();
      };
    }
  }

  // --------------------------------------------------------------------------
  // EXCEL EXPORT (Preserves & Enhances original XLSX download)
  // --------------------------------------------------------------------------
  function exportAttemptToExcel(R) {
    if (!window.XLSX) {
      alert('Excel export library not loaded.');
      return;
    }
    const [sn, tn] = names(R.subject, R.topic);
    const d = new Date(R.ts);
    const ans = x => x == null ? '' : LET[x] + '. ';

    const sum = [
      ['Banking Exam Practice - Comprehensive Attempt Report'],
      [],
      ['Subject', sn],
      ['Topic', tn],
      ['Test Name', R.testName],
      ['Source PDF', R.source],
      ['Attempt Date & Time', d.toLocaleString()],
      ['Total Questions', R.total],
      ['Questions Attempted', R.attempted],
      ['Correct Answers', R.correct],
      ['Incorrect Answers', R.incorrect],
      ['Skipped / Unanswered', R.unanswered],
      ['Score Achieved', R.score + ' / ' + R.max],
      ['Accuracy (%)', +R.accuracy.toFixed(1)],
      ['Total Solving Time', fmt(R.sec)],
      ['Avg Time Per Question (s)', +(R.avg || 0).toFixed(1)]
    ];

    const det = [
      ['#', 'Question Ref', 'Question Text', 'Your Answer', 'Correct Answer', 'Status', 'Time (s)', 'Speed Status', 'Historical Trend', 'Recommendation']
    ].concat(R.rows.map(r => [
      r.i,
      r.n,
      r.q,
      r.sel == null ? 'Skipped' : ans(r.sel) + r.opts[r.sel],
      r.ci == null ? 'Not available' : ans(r.ci) + r.opts[r.ci],
      r.st,
      r.time,
      r.speedLabel || '',
      r.speedTrendText || '',
      r.recommendedAction || ''
    ]));

    const wb = XLSX.utils.book_new();
    const aSheet = XLSX.utils.aoa_to_sheet(sum);
    const bSheet = XLSX.utils.aoa_to_sheet(det);

    aSheet['!cols'] = [{ wch: 28 }, { wch: 45 }];
    bSheet['!cols'] = [{ wch: 5 }, { wch: 14 }, { wch: 60 }, { wch: 22 }, { wch: 22 }, { wch: 12 }, { wch: 10 }, { wch: 18 }, { wch: 20 }, { wch: 22 }];

    XLSX.utils.book_append_sheet(wb, aSheet, 'Test Summary');
    XLSX.utils.book_append_sheet(wb, bSheet, 'Question Analysis');

    const fileName = (R.testName || 'Banking_Test').replace(/[^\w]+/g, '_') + '_' +
      d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + '_' +
      pad(d.getHours()) + pad(d.getMinutes()) + '.xlsx';

    XLSX.writeFile(wb, fileName);
  }

  // --------------------------------------------------------------------------
  // INITIALIZATION & GLOBAL LISTENERS
  // --------------------------------------------------------------------------
  function init() {
    applyTheme(currentTheme);

    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.onclick = () => {
        applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
      };
    }

    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('app-sidebar');
    if (mobileMenuBtn && sidebar) {
      mobileMenuBtn.onclick = () => {
        sidebar.classList.toggle('open');
      };
    }

    window.addEventListener('hashchange', route);

    // Initialize Daily Revision global UI (sidebar badge)
    if (window.DailyRevision) {
      window.DailyRevision.updateGlobalUI();
    }

    // Show IBPS RRB Coach startup banner (once per session, auto-dismiss)
    if (window.IBPSCoach) {
      window.IBPSCoach.maybeShowStartupBanner();
    }

    route();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();



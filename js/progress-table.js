// BankPrep Pro – Chapter Progress Table
// Checkbox-based chapter tracker with question counts & completion percentages
window.ProgressTable = (function () {
  'use strict';

  const LS_KEY = 'bankprep.chapter_progress.v1';

  // ── Syllabus data (real question counts from config.js tests) ─────────────
  const ARITHMETIC = [
    { id: 'basic-maths',              name: 'Basic Mathematics',           questions: 100  },
    { id: 'percentages',              name: 'Percentages',                 questions: 223  },
    { id: 'profit-loss',              name: 'Profit and Loss',             questions: 204  },
    { id: 'simple-interest',          name: 'Simple Interest',             questions: 80   },
    { id: 'compound-interest',        name: 'Compound Interest',           questions: 80   },
    { id: 'ratio-proportion',         name: 'Ratio and Proportion',        questions: 140  },
    { id: 'partnership',              name: 'Partnership',                 questions: 80   },
    { id: 'problems-on-ages',         name: 'Problems on Ages',            questions: 80   },
    { id: 'averages',                 name: 'Averages',                    questions: 100  },
    { id: 'mixtures-allegations',     name: 'Mixtures and Allegations',    questions: 120  },
    { id: 'time-distance',            name: 'Time and Distance',           questions: 100  },
    { id: 'trains',                   name: 'Trains',                      questions: 100  },
    { id: 'boats-streams',            name: 'Boats and Streams',           questions: 80   },
    { id: 'time-work',                name: 'Time and Work',               questions: 140  },
    { id: 'pipes-cisterns',           name: 'Pipes and Cisterns',          questions: 60   },
    { id: 'inequalities-comparison',  name: 'Inequalities Comparison',     questions: 32   },
    { id: 'areas',                    name: 'Areas',                       questions: 196  },
    { id: 'volumes',                  name: 'Volumes',                     questions: 159  },
    { id: 'lcm-hcf',                  name: 'LCM and HCF',                 questions: 100  },
    { id: 'problems-on-numbers',      name: 'Problems on Numbers',         questions: 140  },
    { id: 'approximation',            name: 'Approximation',               questions: 30   },
    { id: 'permutations-combinations',name: 'Permutations & Combinations', questions: 0    },
    { id: 'probability',              name: 'Probability',                 questions: 0    },
  ];

  const REASONING = [
    { id: 'missing-number-series',         name: 'Missing Number Series',            questions: 300 },
    { id: 'wrong-number-series',           name: 'Wrong Number Series',              questions: 300 },
    { id: 'problems-on-alphabets',         name: 'Problems Based on Alphabets',      questions: 200 },
    { id: 'coding-decoding',               name: 'Coding and Decoding',              questions: 200 },
    { id: 'ranking-time-sequence',         name: 'Ranking and Time Sequence',        questions: 180 },
    { id: 'coded-inequalities',            name: 'Coded Inequalities',               questions: 140 },
    { id: 'directions-distances',          name: 'Directions and Distances',         questions: 180 },
    { id: 'blood-relations',               name: 'Blood Relations',                  questions: 140 },
    { id: 'syllogisms',                    name: 'Syllogisms',                       questions: 0   },
    { id: 'seating-arrangement',           name: 'Seating Arrangement',              questions: 367 },
    { id: 'analytical-reasoning',          name: 'Analytical Reasoning',             questions: 0   },
    { id: 'data-sufficiency',              name: 'Data Sufficiency',                 questions: 140 },
    { id: 'machine-input-output',          name: 'Machine Input and Output',         questions: 320 },
    { id: 'decision-making',               name: 'Decision Making',                  questions: 61  },
    { id: 'statement-arguments',           name: 'Statement and Arguments',          questions: 25  },
    { id: 'statement-assumptions',         name: 'Statement and Assumptions',        questions: 25  },
    { id: 'statements-course-of-actions',  name: 'Statements and Course of Actions', questions: 25  },
    { id: 'cause-and-effect',              name: 'Cause and Effect',                 questions: 25  },
    { id: 'inference-conclusions',         name: 'Inference and Conclusions',        questions: 25  },
  ];

  // ── State ─────────────────────────────────────────────────────────────────
  function load() {
    try { return JSON.parse(localStorage.getItem(LS_KEY) || '{}'); } catch(e) { return {}; }
  }
  function save(state) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(state)); } catch(e) {}
  }

  // ── Calculations ──────────────────────────────────────────────────────────
  function stats(topics, state) {
    const total   = topics.length;
    const done    = topics.filter(t => state[t.id]).length;
    const totalQ  = topics.reduce((s, t) => s + t.questions, 0);
    const doneQ   = topics.filter(t => state[t.id]).reduce((s, t) => s + t.questions, 0);
    const pctChap = total ? Math.round((done / total) * 100) : 0;
    const pctQ    = totalQ ? Math.round((doneQ / totalQ) * 100) : 0;
    return { total, done, remaining: total - done, totalQ, doneQ, pctChap, pctQ };
  }

  // ── Render ────────────────────────────────────────────────────────────────
  function render(container) {
    if (!container) container = document.getElementById('app');

    function draw() {
      const state = load();
      const aStats = stats(ARITHMETIC, state);
      const rStats = stats(REASONING,  state);
      const allDone  = aStats.done  + rStats.done;
      const allTotal = aStats.total + rStats.total;
      const allQ     = aStats.totalQ + rStats.totalQ;
      const allDoneQ = aStats.doneQ  + rStats.doneQ;
      const overallPctChap = allTotal ? Math.round((allDone  / allTotal) * 100) : 0;
      const overallPctQ    = allQ     ? Math.round((allDoneQ / allQ)     * 100) : 0;

      container.innerHTML = `
        <div class="pt-wrap">

          <!-- Page title -->
          <div class="pt-header">
            <h1 class="pt-title">📋 Chapter Progress Tracker</h1>
            <p class="pt-sub">Check off chapters as you complete them. Progress updates instantly.</p>
          </div>

          <!-- Overall summary cards -->
          <div class="pt-summary-row">
            ${summaryCard('🗂️', 'Total Chapters', allTotal, 'across both subjects')}
            ${summaryCard('✅', 'Chapters Done', allDone, `${allTotal - allDone} remaining`)}
            ${summaryCard('📝', 'Questions Done', allDoneQ, `of ${allQ} total questions`)}
            ${summaryCard('🏆', 'Overall Progress',
              overallPctChap + '%',
              `by chapters &nbsp;|&nbsp; ${overallPctQ}% by questions`,
              overallPctChap, '#3b82f6'
            )}
          </div>

          <!-- Subject split bar -->
          <div class="pt-subject-bars">
            ${subjectBar('🧮', 'Arithmetic', aStats, '#2563eb')}
            ${subjectBar('🧠', 'Reasoning',  rStats, '#7c3aed')}
          </div>

          <!-- Arithmetic table -->
          ${buildTable('🧮 Arithmetic', ARITHMETIC, state, aStats, 'arithmetic')}

          <!-- Reasoning table -->
          ${buildTable('🧠 Reasoning Ability', REASONING, state, rStats, 'reasoning')}

          <!-- Reset button -->
          <div style="text-align:center; margin-top:2rem;">
            <button class="btn pt-reset-btn" id="pt-reset-btn">↺ Reset All Progress</button>
          </div>

        </div>
      `;

      // Attach checkbox listeners
      container.querySelectorAll('.pt-chk').forEach(chk => {
        chk.addEventListener('change', e => {
          const st = load();
          const id = e.target.getAttribute('data-id');
          if (e.target.checked) st[id] = true; else delete st[id];
          save(st);
          draw();
        });
      });

      // Select-all per subject
      container.querySelectorAll('.pt-select-all').forEach(btn => {
        btn.addEventListener('click', e => {
          const subj = e.currentTarget.getAttribute('data-subj');
          const topics = subj === 'arithmetic' ? ARITHMETIC : REASONING;
          const st = load();
          const allChecked = topics.every(t => st[t.id]);
          topics.forEach(t => { if (allChecked) delete st[t.id]; else st[t.id] = true; });
          save(st);
          draw();
        });
      });

      // Reset all
      const resetBtn = document.getElementById('pt-reset-btn');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (confirm('Reset all chapter checkboxes?')) { save({}); draw(); }
        });
      }
    }

    draw();
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  function summaryCard(icon, label, value, sub, pct, color) {
    let bar = '';
    if (pct !== undefined) {
      bar = `<div class="pt-sc-bar-wrap"><div class="pt-sc-bar" style="width:${pct}%;background:${color || '#3b82f6'};"></div></div>`;
    }
    return `
      <div class="pt-sc">
        <div class="pt-sc-icon">${icon}</div>
        <div class="pt-sc-body">
          <div class="pt-sc-label">${label}</div>
          <div class="pt-sc-value">${value}</div>
          <div class="pt-sc-sub">${sub}</div>
          ${bar}
        </div>
      </div>`;
  }

  function subjectBar(icon, label, s, color) {
    return `
      <div class="pt-sbar">
        <div class="pt-sbar-top">
          <span class="pt-sbar-label">${icon} ${label}</span>
          <span class="pt-sbar-nums">${s.done}/${s.total} chapters &nbsp;·&nbsp; ${s.doneQ}/${s.totalQ} questions</span>
          <span class="pt-sbar-pct" style="color:${color}">${s.pctChap}%</span>
        </div>
        <div class="pt-bar-track">
          <div class="pt-bar-fill" style="width:${s.pctChap}%;background:${color};"></div>
        </div>
        <div class="pt-sbar-bot">
          <span>${s.pctQ}% by questions</span>
          <span>${s.remaining} chapters remaining</span>
        </div>
      </div>`;
  }

  function buildTable(title, topics, state, s, subjKey) {
    const allDone = topics.every(t => state[t.id]);
    const rows = topics.map((t, i) => {
      const done = !!state[t.id];
      const pct  = done ? 100 : 0;
      const statusIcon = done ? '✅' : '⭕';
      const statusLabel = done ? 'Completed' : 'Pending';
      return `
        <tr class="${done ? 'pt-row-done' : ''}">
          <td class="pt-td-num">${i + 1}</td>
          <td class="pt-td-check">
            <input type="checkbox" class="pt-chk" data-id="${t.id}" ${done ? 'checked' : ''}>
          </td>
          <td class="pt-td-name">${t.name}</td>
          <td class="pt-td-q">${t.questions > 0 ? t.questions : '—'}</td>
          <td class="pt-td-pct">
            <div class="pt-mini-bar-wrap">
              <div class="pt-mini-bar" style="width:${pct}%;"></div>
            </div>
            <span class="pt-pct-label">${pct}%</span>
          </td>
          <td class="pt-td-status">
            <span class="pt-status-badge ${done ? 'pt-badge-done' : 'pt-badge-pend'}">${statusIcon} ${statusLabel}</span>
          </td>
        </tr>`;
    }).join('');

    return `
      <div class="pt-table-section">
        <div class="pt-table-header">
          <div class="pt-table-title">${title}</div>
          <div class="pt-table-summary">
            <span class="pt-tsumm-pill">${s.done}/${s.total} chapters</span>
            <span class="pt-tsumm-pill">${s.doneQ}/${s.totalQ} questions</span>
            <span class="pt-tsumm-pill pt-tsumm-pct">${s.pctChap}% complete</span>
          </div>
          <button class="btn pt-select-all" data-subj="${subjKey}">
            ${allDone ? '☐ Uncheck All' : '☑ Check All'}
          </button>
        </div>

        <div class="pt-table-wrap">
          <table class="pt-table">
            <thead>
              <tr>
                <th class="pt-th-num">#</th>
                <th class="pt-th-check">Done</th>
                <th>Chapter Name</th>
                <th class="pt-th-q">Questions Available</th>
                <th class="pt-th-pct">Completion</th>
                <th class="pt-th-status">Status</th>
              </tr>
            </thead>
            <tbody>${rows}</tbody>
            <tfoot>
              <tr class="pt-tfoot-row">
                <td colspan="3"><strong>Total — ${title.replace(/[🧮🧠]/g,'').trim()}</strong></td>
                <td><strong>${s.totalQ}</strong></td>
                <td>
                  <div class="pt-mini-bar-wrap">
                    <div class="pt-mini-bar" style="width:${s.pctChap}%;"></div>
                  </div>
                  <span class="pt-pct-label"><strong>${s.pctChap}%</strong></span>
                </td>
                <td><strong>${s.done}/${s.total} done</strong></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>`;
  }

  return { render };
})();

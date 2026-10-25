new_render_result = '''  // --------------------------------------------------------------------------
  // 4. TEST RESULTS & DETAILED REVIEW (Same full standard layout as Question Book)
  // --------------------------------------------------------------------------
  function renderMockResult(attemptId) {
    window.scrollTo(0, 0);
    document.body.classList.remove('exam-mode');

    const record = Engine.getMockAttemptById(attemptId);
    if (!record) {
      app.innerHTML = `
        ${renderSubNav('history')}
        <div class="card" style="padding:40px; text-align:center;">
          <h3>Mock test attempt not found</h3>
          <p class="text-muted">The requested attempt could not be located in your test history.</p>
          <a href="#/mock-tests/history" class="btn sm">View Test History</a>
        </div>
      `;
      return;
    }

    const Charts = window.BankCharts;
    const Analytics = window.BankAnalytics;
    const benchmark = 45; // standard arithmetic benchmark pace (45s)
    const f = activeResultFilter || 'All';

    // Compute Improvement Plan if Analytics is loaded
    let plan = { primaryTopic: 'Arithmetic Mock', priority: 'Normal', summary: 'Keep practising to improve your speed and accuracy across arithmetic chapters.', recommendations: [] };
    if (Analytics && typeof Analytics.generateImprovementPlan === 'function') {
      try {
        const topicDiags = typeof Analytics.computeTopicDiagnostics === 'function' ? Analytics.computeTopicDiagnostics(window.attemptsCache || [], window.APP_CONFIG.subjects) : [];
        plan = Analytics.generateImprovementPlan(record, window.attemptsCache || [], topicDiags);
      } catch (e) {
        console.warn('generateImprovementPlan error:', e);
      }
    }

    // Check for previous attempt for comparison
    const prevAttempt = Engine.findComparableAttempt(record);
    let comparisonHtml = '';
    if (prevAttempt) {
      const scoreDiff = +(record.score - prevAttempt.score).toFixed(2);
      const accDiff = +(record.accuracy - prevAttempt.accuracy).toFixed(1);
      const timeDiff = record.timeSpentSeconds - prevAttempt.timeSpentSeconds;

      comparisonHtml = `
        <div class="card mb-4" style="background:var(--bg-secondary); border-left:4px solid var(--brand-primary,#4f46e5);">
          <div class="flex-between mb-2">
            <h3 style="margin:0; font-size:1.05rem; display:flex; align-items:center; gap:8px;">
              <span>⚖️</span> Comparison with Previous Comparable Attempt
            </h3>
            <span class="text-muted text-sm">${new Date(prevAttempt.submittedAt || prevAttempt.ts).toLocaleDateString()}</span>
          </div>
          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(180px, 1fr)); gap:12px; margin-top:12px;">
            <div class="mock-comp-item">
              <span class="mock-comp-lbl">Score Change</span>
              <span class="mock-comp-val ${scoreDiff >= 0 ? 'pos' : 'neg'}">
                ${scoreDiff >= 0 ? '+' + scoreDiff : scoreDiff} pts
              </span>
            </div>
            <div class="mock-comp-item">
              <span class="mock-comp-lbl">Accuracy Change</span>
              <span class="mock-comp-val ${accDiff >= 0 ? 'pos' : 'neg'}">
                ${accDiff >= 0 ? '+' + accDiff : accDiff}%
              </span>
            </div>
            <div class="mock-comp-item">
              <span class="mock-comp-lbl">Completion Time</span>
              <span class="mock-comp-val ${timeDiff <= 0 ? 'pos' : 'neg'}">
                ${timeDiff <= 0 ? fmtTime(Math.abs(timeDiff)) + ' faster' : fmtTime(timeDiff) + ' slower'}
              </span>
            </div>
          </div>
        </div>
      `;
    }

    // Rows filtering
    const rows = record.rows || [];
    const filteredRows = rows.filter(r => {
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
        <a href="#/mock-tests/select">Mock Tests</a> &rsaquo;
        <a href="#/mock-tests/history">History</a> &rsaquo;
        <span><b>Detailed Performance Report</b></span>
      </nav>

      <!-- Top Summary Banner -->
      <div class="results-summary-banner">
        <div>
          <span style="text-transform:uppercase; font-size:0.8rem; letter-spacing:0.05em; opacity:0.85;">Mock Test Completed</span>
          <h1 style="color:#fff; margin:4px 0 8px;">Arithmetic Mock Test</h1>
          <p style="opacity:0.9; font-size:0.95rem;">
            Attempt Date: <b>${new Date(record.submittedAt || record.ts).toLocaleString()}</b> &middot;
            Chapters: <b>${esc((record.selectedChapterNames || []).join(', '))}</b>
          </p>
        </div>
        <div style="text-align:right;">
          <div class="summary-score-large">${(record.accuracy || 0).toFixed(1)}%</div>
          <div style="font-size:1.1rem; font-weight:600;">Score: ${record.score} / ${record.maxScore || record.total}</div>
        </div>
      </div>

      <!-- Quick Metrics Grid -->
      <div class="metrics-grid">
        <div class="metric-card">
          <div class="metric-title">Questions Attempted</div>
          <div class="metric-val">${record.attempted} / ${record.total}</div>
          <div class="metric-sub">${record.unattempted} skipped</div>
        </div>
        <div class="metric-card success">
          <div class="metric-title">Correct Answers</div>
          <div class="metric-val">${record.correct}</div>
          <div class="metric-sub">+${record.correct}.00 marks</div>
        </div>
        <div class="metric-card danger">
          <div class="metric-title">Incorrect Answers</div>
          <div class="metric-val">${record.incorrect}</div>
          <div class="metric-sub">0.00 penalty</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">Total Active Time</div>
          <div class="metric-val">${fmtTime(record.timeSpentSeconds || record.sec || 0)}</div>
          <div class="metric-sub">Avg pace: ${(record.avgTime || record.avg || 0).toFixed(1)}s / attempted Q</div>
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
          ${(plan.recommendations || []).map(rec => `
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

      ${comparisonHtml}

      <!-- Chapter-Wise Performance Breakdown -->
      ${record.chapterBreakdown && record.chapterBreakdown.length ? `
        <div class="card mb-4">
          <h3 style="margin:0 0 16px; font-size:1.1rem;">📚 Chapter-Wise Performance Breakdown</h3>
          <div class="table-container">
            <table class="data-table" style="width:100%;">
              <thead>
                <tr>
                  <th>Chapter</th>
                  <th style="text-align:center;">Total Qs</th>
                  <th style="text-align:center;">Attempted</th>
                  <th style="text-align:center;">Correct</th>
                  <th style="text-align:center;">Incorrect</th>
                  <th style="text-align:center;">Accuracy</th>
                  <th style="text-align:right;">Time Spent</th>
                </tr>
              </thead>
              <tbody>
                ${record.chapterBreakdown.map(ch => `
                  <tr>
                    <td><b>${esc(ch.chapterName)}</b></td>
                    <td style="text-align:center;">${ch.total}</td>
                    <td style="text-align:center;">${ch.attempted}</td>
                    <td style="text-align:center; color:var(--color-success); font-weight:700;">${ch.correct}</td>
                    <td style="text-align:center; color:var(--color-danger); font-weight:700;">${ch.incorrect}</td>
                    <td style="text-align:center;">
                      <span class="badge ${ch.accuracy >= 80 ? 'badge-success' : ch.accuracy >= 50 ? 'badge-warning' : 'badge-danger'}">
                        ${ch.accuracy}%
                      </span>
                    </td>
                    <td style="text-align:right; color:var(--text-muted); font-weight:600;">${fmtTime(ch.timeSpent)}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      ` : ''}

      <!-- Charts Section (2 Columns) -->
      <div class="results-grid-2col">
        <div class="chart-box">
          <div class="chart-title">📊 Answer Distribution</div>
          <div id="mock-chart-pie-results"></div>
        </div>
        <div class="chart-box">
          <div class="flex-between">
            <div class="chart-title">⏱️ Question-Wise Time vs Target Benchmark (${benchmark}s)</div>
            <span class="text-muted text-sm" style="font-weight:600; color:var(--brand-primary);">💡 Click any bar to review</span>
          </div>
          <div id="mock-chart-bar-times"></div>
        </div>
      </div>

      <!-- Question-Wise Performance Table & Filters (Exact Question Book Pattern) -->
      <div class="card mb-4">
        <div class="flex-between mb-4">
          <div>
            <h3 style="margin:0 0 4px; font-size:1.1rem;">Question-Wise Time &amp; Historical Speed Analysis</h3>
            <span class="text-muted text-sm">Click 'Review' to inspect detailed solution and comparison</span>
          </div>
        </div>

        <div class="filter-tabs">
          <button class="filter-btn ${f === 'All' ? 'active' : ''}" data-mockfilter="All">All (${rows.length})</button>
          <button class="filter-btn ${f === 'Correct' ? 'active' : ''}" data-mockfilter="Correct">Correct (${record.correct})</button>
          <button class="filter-btn ${f === 'Incorrect' ? 'active' : ''}" data-mockfilter="Incorrect">Incorrect (${record.incorrect})</button>
          <button class="filter-btn ${f === 'Unanswered' ? 'active' : ''}" data-mockfilter="Unanswered">Skipped (${record.unattempted})</button>
          <button class="filter-btn ${f === 'Slowest' ? 'active' : ''}" data-mockfilter="Slowest">Slow (>1.25x target)</button>
          <button class="filter-btn ${f === 'SpeedImproved' ? 'active' : ''}" data-mockfilter="SpeedImproved">Speed Improved</button>
          <button class="filter-btn ${f === 'SpeedDeclined' ? 'active' : ''}" data-mockfilter="SpeedDeclined">Speed Declined</button>
        </div>

        <div class="table-container">
          <table class="data-table">
            <thead>
              <tr>
                <th>Q#</th>
                <th>Chapter</th>
                <th>Question Preview</th>
                <th>Your Answer</th>
                <th>Correct Key</th>
                <th>Result</th>
                <th>Time Spent</th>
                <th>Speed Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              ${filteredRows.map(r => `
                <tr>
                  <td><b>Q${esc(r.n)}</b></td>
                  <td><span class="mock-chapter-tag">${esc(r.chapterName || 'Arithmetic')}</span></td>
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
                  <td><span class="badge ${r.speedBadge || 'badge-muted'}">${esc(r.speedLabel || 'Normal')}</span></td>
                  <td>
                    <button class="btn alt sm btn-mock-review" data-qidx="${r.i - 1}">Review</button>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Action Buttons Footer -->
      <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:40px;">
        <button class="btn" id="btn-mock-export-excel">📥 Download Excel Sheet</button>
        <button class="btn alt" id="btn-retake-mock">🔄 Repeat / Retake Test</button>
        <a href="#/mock-tests/select" class="btn alt">&larr; Back to Chapters</a>
        <a href="#/mock-tests/history" class="btn alt">Mock Test History</a>
        <a href="#/" class="btn alt">Dashboard</a>
      </div>
    `;

    app.innerHTML = html;

    // Render Charts
    if (Charts) {
      if (typeof Charts.renderDonut === 'function') {
        Charts.renderDonut('mock-chart-pie-results', [
          { label: 'Correct', value: record.correct, color: '#10b981' },
          { label: 'Incorrect', value: record.incorrect, color: '#ef4444' },
          { label: 'Skipped', value: record.unattempted, color: '#8b5cf6' }
        ]);
      }

      if (typeof Charts.renderBarChart === 'function') {
        const barItems = rows.map((r, idx) => ({
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

        Charts.renderBarChart('mock-chart-bar-times', barItems, {
          target: benchmark,
          onBarClick: (item, idx) => {
            const row = rows[idx];
            if (row && window.openQuestionReviewModal) {
              window.openQuestionReviewModal(row, benchmark);
            }
          }
        });
      }
    }

    // Filter Buttons Event
    app.querySelectorAll('[data-mockfilter]').forEach(b => {
      b.onclick = () => {
        activeResultFilter = b.dataset.mockfilter;
        renderMockResult(attemptId);
      };
    });

    // Review Modal Event
    app.querySelectorAll('.btn-mock-review').forEach(b => {
      b.onclick = () => {
        const row = rows[+b.dataset.qidx];
        if (row && window.openQuestionReviewModal) {
          window.openQuestionReviewModal(row, benchmark);
        }
      };
    });

    // Excel Export
    const excelBtn = document.getElementById('btn-mock-export-excel');
    if (excelBtn) {
      excelBtn.onclick = () => {
        if (window.exportAttemptToExcel) {
          window.exportAttemptToExcel(record);
        } else {
          alert('Excel export not available.');
        }
      };
    }

    // Retake button
    const retakeBtn = document.getElementById('btn-retake-mock');
    if (retakeBtn) {
      retakeBtn.onclick = () => {
        selectedChapters = new Set(record.selectedChapterIds || []);
        location.hash = '#/mock-tests/configure';
      };
    }
  }
'''

with open('js/mock-test-ui.js', 'r', encoding='utf-8') as f:
    content = f.read()

import re

# Add activeResultFilter variable at top of UI module
if 'let activeResultFilter = \'All\';' not in content:
    content = content.replace("let selectedChapters = new Set(['percentages', 'profit-loss', 'ratio-proportion']);", "let selectedChapters = new Set(['percentages', 'profit-loss', 'ratio-proportion']);\n  let activeResultFilter = 'All';")

# Find renderMockResult definition and replace up to renderMockHistory
pattern = r'  // --------------------------------------------------------------------------\s*// 4\. TEST RESULTS & DETAILED REVIEW[\s\S]*?function renderMockHistory\(\)'
match = re.search(pattern, content)
if match:
    replacement_str = new_render_result + '\n  function renderMockHistory()'
    content = content[:match.start()] + replacement_str + content[match.end():]
    with open('js/mock-test-ui.js', 'w', encoding='utf-8') as f:
        f.write(content)
    print("Successfully replaced renderMockResult with full question book layout!")
else:
    print("Pattern not matched!")

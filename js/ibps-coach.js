// ============================================================================
// BANKPREP PRO – IBPS RRB CLERK COACH MODULE (REAL DATA & FULLY RESPONSIVE)
// IBPS RRB Office Assistant (Multipurpose) Prelims Preparation Engine
// Prelims: 6 Dec 2026 | Mains: 30 Jan 2027 | No Interview
// ============================================================================
window.IBPSCoach = (function () {
  'use strict';

  // --------------------------------------------------------------------------
  // CONSTANTS & EXAM DATES
  // --------------------------------------------------------------------------
  const LS_KEY        = 'bp_ibps_coach_v1';
  const SESSION_KEY   = 'bp_ibps_coach_session';
  const PRELIMS_DATE  = new Date('2026-12-06T00:00:00+05:30');
  const MOCK_CYCLE    = 6;    // days per mock cycle
  const NEG_MARK      = 0.25; // 1/4 negative marking in prelims

  // Map coach topics to actual topic IDs & PDF tests in the BankPrep Pro application
  const QUANT_TOPICS = [
    {
      id: 'simplification',
      name: 'Simplification & Approximation',
      priority: 1,
      prelimQs: '8–10',
      subjectId: 'arithmetic',
      appTopicIds: ['approximation', 'basic-maths'],
      primaryTopic: 'approximation',
      practiceUrl: '#/topic/arithmetic/approximation',
      drillLabel: 'Simplification & Approx.'
    },
    {
      id: 'number-series',
      name: 'Number Series',
      priority: 2,
      prelimQs: '5',
      subjectId: 'reasoning',
      appTopicIds: ['missing-number-series', 'wrong-number-series'],
      primaryTopic: 'missing-number-series',
      practiceUrl: '#/topic/reasoning/missing-number-series'
    },
    {
      id: 'quadratic',
      name: 'Quadratic Equations / Inequalities',
      priority: 3,
      prelimQs: '5',
      subjectId: 'arithmetic',
      appTopicIds: ['inequalities-comparison'],
      primaryTopic: 'inequalities-comparison',
      practiceUrl: '#/topic/arithmetic/inequalities-comparison'
    },
    {
      id: 'pct-profit',
      name: 'Percentages & Profit/Loss',
      priority: 4,
      prelimQs: '2–3',
      subjectId: 'arithmetic',
      appTopicIds: ['percentages', 'profit-loss'],
      primaryTopic: 'percentages',
      practiceUrl: '#/topic/arithmetic/percentages',
      drillLabel: 'Percentages'
    },
    {
      id: 'di',
      name: 'Data Interpretation / Sufficiency',
      priority: 5,
      prelimQs: '5',
      subjectId: 'reasoning',
      appTopicIds: ['data-sufficiency'],
      primaryTopic: 'data-sufficiency',
      practiceUrl: '#/topic/reasoning/data-sufficiency'
    },
    {
      id: 'time-work',
      name: 'Time & Work / Pipes & Cisterns',
      priority: 6,
      prelimQs: '1–2',
      subjectId: 'arithmetic',
      appTopicIds: ['time-work', 'pipes-cisterns'],
      primaryTopic: 'time-work',
      practiceUrl: '#/topic/arithmetic/time-work'
    },
    {
      id: 'speed-dist',
      name: 'Speed, Distance, Trains & Boats',
      priority: 7,
      prelimQs: '1–2',
      subjectId: 'arithmetic',
      appTopicIds: ['time-distance', 'trains', 'boats-streams'],
      primaryTopic: 'time-distance',
      practiceUrl: '#/topic/arithmetic/time-distance'
    },
    {
      id: 'interest',
      name: 'Simple & Compound Interest',
      priority: 8,
      prelimQs: '1–2',
      subjectId: 'arithmetic',
      appTopicIds: ['simple-interest', 'compound-interest'],
      primaryTopic: 'simple-interest',
      practiceUrl: '#/topic/arithmetic/simple-interest'
    },
    {
      id: 'ratio-misc',
      name: 'Ratio, Ages, Partnership & Mixtures',
      priority: 9,
      prelimQs: '1–2',
      subjectId: 'arithmetic',
      appTopicIds: ['ratio-proportion', 'problems-on-ages', 'partnership', 'mixtures-allegations'],
      primaryTopic: 'ratio-proportion',
      practiceUrl: '#/topic/arithmetic/ratio-proportion'
    },
    {
      id: 'misc-arith',
      name: 'Mensuration, Averages & Numbers',
      priority: 10,
      prelimQs: '~1',
      subjectId: 'arithmetic',
      appTopicIds: ['areas', 'volumes', 'averages', 'problems-on-numbers', 'lcm-hcf'],
      primaryTopic: 'areas',
      practiceUrl: '#/topic/arithmetic/areas'
    }
  ];

  const REASONING_TOPICS = [
    {
      id: 'puzzles-seating',
      name: 'Puzzles & Seating Arrangement',
      priority: 1,
      prelimQs: '15–20',
      subjectId: 'reasoning',
      appTopicIds: ['seating-arrangement', 'analytical-reasoning'],
      primaryTopic: 'seating-arrangement',
      practiceUrl: '#/topic/reasoning/seating-arrangement'
    },
    {
      id: 'syllogism',
      name: 'Syllogism & Deductive Logic',
      priority: 2,
      prelimQs: '5',
      subjectId: 'reasoning',
      appTopicIds: ['syllogisms', 'inference-conclusions'],
      primaryTopic: 'syllogisms',
      practiceUrl: '#/topic/reasoning/syllogisms'
    },
    {
      id: 'inequality',
      name: 'Coded Inequalities',
      priority: 3,
      prelimQs: '5',
      subjectId: 'reasoning',
      appTopicIds: ['coded-inequalities'],
      primaryTopic: 'coded-inequalities',
      practiceUrl: '#/topic/reasoning/coded-inequalities'
    },
    {
      id: 'coding-decoding',
      name: 'Coding and Decoding',
      priority: 4,
      prelimQs: '2–3',
      subjectId: 'reasoning',
      appTopicIds: ['coding-decoding'],
      primaryTopic: 'coding-decoding',
      practiceUrl: '#/topic/reasoning/coding-decoding'
    },
    {
      id: 'blood-relations',
      name: 'Blood Relations',
      priority: 5,
      prelimQs: '2–3',
      subjectId: 'reasoning',
      appTopicIds: ['blood-relations'],
      primaryTopic: 'blood-relations',
      practiceUrl: '#/topic/reasoning/blood-relations'
    },
    {
      id: 'directions',
      name: 'Direction and Distances',
      priority: 6,
      prelimQs: '2',
      subjectId: 'reasoning',
      appTopicIds: ['directions-distances'],
      primaryTopic: 'directions-distances',
      practiceUrl: '#/topic/reasoning/directions-distances'
    },
    {
      id: 'order-ranking',
      name: 'Order, Ranking & Time Sequence',
      priority: 7,
      prelimQs: '1–2',
      subjectId: 'reasoning',
      appTopicIds: ['ranking-time-sequence'],
      primaryTopic: 'ranking-time-sequence',
      practiceUrl: '#/topic/reasoning/ranking-time-sequence'
    },
    {
      id: 'alpha-series',
      name: 'Alphanumeric Series',
      priority: 8,
      prelimQs: '1–2',
      subjectId: 'reasoning',
      appTopicIds: ['problems-on-alphabets'],
      primaryTopic: 'problems-on-alphabets',
      practiceUrl: '#/topic/reasoning/problems-on-alphabets'
    },
    {
      id: 'input-output',
      name: 'Machine Input-Output & Verbal',
      priority: 9,
      prelimQs: '0–1',
      subjectId: 'reasoning',
      appTopicIds: ['machine-input-output', 'decision-making', 'statement-arguments', 'statement-assumptions', 'cause-and-effect'],
      primaryTopic: 'machine-input-output',
      practiceUrl: '#/topic/reasoning/machine-input-output'
    }
  ];

  // Daily drill composition (20 questions total)
  const DRILL_SPLITS = [
    { id: 'simplification', label: 'Simplification & Approx.', count: 8, url: '#/topic/arithmetic/approximation', sub: 'PDF 21: Approximation' },
    { id: 'percentages',    label: 'Percentages',               count: 6, url: '#/topic/arithmetic/percentages',   sub: 'PDF 2: Percentages' },
    { id: 'fractions',      label: 'Fractions & Ratios',        count: 3, url: '#/topic/arithmetic/ratio-proportion', sub: 'PDF 6: Ratio & Prop.' },
    { id: 'pure-calc',      label: 'Pure Calculation',          count: 3, url: '#/topic/arithmetic/basic-maths',   sub: 'PDF 1: Basic Maths' }
  ];

  // --------------------------------------------------------------------------
  // INJECT RESPONSIVE STYLES
  // --------------------------------------------------------------------------
  function injectCoachStyles() {
    if (document.getElementById('ibps-coach-styles')) return;
    const style = document.createElement('style');
    style.id = 'ibps-coach-styles';
    style.textContent = `
      /* Coach Page Container & Layout */
      .ibps-page {
        max-width: 1200px;
        margin: 0 auto;
        padding-bottom: 40px;
      }
      .ibps-hero-card {
        background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 60%, #3b82f6 100%);
        color: #ffffff;
        border-radius: 16px;
        padding: 24px;
        margin-bottom: 24px;
        box-shadow: 0 10px 25px -5px rgba(37,99,235,0.3);
      }
      .ibps-hero-top {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        flex-wrap: wrap;
        gap: 16px;
      }
      .ibps-hero-title {
        font-size: 1.6rem;
        font-weight: 800;
        margin: 0 0 6px 0;
        letter-spacing: -0.02em;
        display: flex;
        align-items: center;
        gap: 10px;
      }
      .ibps-hero-sub {
        font-size: 0.92rem;
        opacity: 0.9;
        margin: 0;
        line-height: 1.4;
      }

      /* Responsive Metrics Grid */
      .ibps-grid-4 {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 16px;
        margin-bottom: 24px;
      }
      @media (max-width: 900px) {
        .ibps-grid-4 { grid-template-columns: repeat(2, 1fr); gap: 12px; }
      }
      @media (max-width: 480px) {
        .ibps-grid-4 { grid-template-columns: 1fr; gap: 10px; }
      }

      .ibps-stat-card {
        background: var(--bg-surface, #ffffff);
        border: 1px solid var(--border-color, #e2e8f0);
        border-radius: 14px;
        padding: 16px 18px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      }
      .ibps-stat-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0,0,0,0.08);
      }
      .ibps-stat-label {
        font-size: 0.82rem;
        font-weight: 700;
        text-transform: uppercase;
        letter-spacing: 0.05em;
        color: var(--text-muted, #64748b);
        margin-bottom: 6px;
      }
      .ibps-stat-val {
        font-size: 1.85rem;
        font-weight: 800;
        line-height: 1.1;
        color: var(--text-primary, #0f172a);
      }
      .ibps-stat-foot {
        font-size: 0.8rem;
        color: var(--text-secondary, #475569);
        margin-top: 8px;
        display: flex;
        align-items: center;
        gap: 6px;
      }

      /* Drill Splits Grid */
      .ibps-drill-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 12px;
        margin-bottom: 16px;
      }
      @media (max-width: 860px) {
        .ibps-drill-grid { grid-template-columns: repeat(2, 1fr); }
      }
      @media (max-width: 480px) {
        .ibps-drill-grid { grid-template-columns: 1fr; }
      }

      .ibps-drill-item {
        background: var(--bg-secondary, #f8fafc);
        border: 1px solid var(--border-color, #e2e8f0);
        border-radius: 12px;
        padding: 14px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
      .ibps-drill-item-head {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;
      }

      /* Responsive Two-Column Layout */
      .ibps-two-col {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        margin-bottom: 24px;
      }
      @media (max-width: 860px) {
        .ibps-two-col { grid-template-columns: 1fr; gap: 16px; }
      }

      /* Responsive Table Wrapper */
      .ibps-table-card {
        background: var(--bg-surface, #ffffff);
        border: 1px solid var(--border-color, #e2e8f0);
        border-radius: 14px;
        overflow: hidden;
        margin-bottom: 24px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.04);
      }
      .ibps-table-header {
        padding: 16px 20px;
        border-bottom: 1px solid var(--border-color, #e2e8f0);
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
      }
      .ibps-table-scroll {
        width: 100%;
        overflow-x: auto;
        -webkit-overflow-scrolling: touch;
      }
      .ibps-table-scroll table {
        width: 100%;
        min-width: 680px;
        border-collapse: collapse;
      }
      .ibps-table-scroll th {
        background: var(--bg-secondary, #f8fafc);
        padding: 10px 14px;
        font-size: 0.8rem;
        font-weight: 700;
        text-transform: uppercase;
        color: var(--text-muted, #64748b);
        border-bottom: 1px solid var(--border-color, #e2e8f0);
        text-align: left;
      }
      .ibps-table-scroll td {
        padding: 12px 14px;
        font-size: 0.88rem;
        border-bottom: 1px solid var(--border-color, #e2e8f0);
        color: var(--text-primary, #1e293b);
      }
      .ibps-table-scroll tr:hover td {
        background: rgba(37,99,235,0.02);
      }

      /* Quick action buttons */
      .ibps-btn-practice {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        background: #2563eb;
        color: #ffffff !important;
        font-size: 0.78rem;
        font-weight: 600;
        padding: 5px 10px;
        border-radius: 6px;
        text-decoration: none;
        white-space: nowrap;
        transition: background 0.15s ease;
      }
      .ibps-btn-practice:hover {
        background: #1d4ed8;
      }
      .ibps-btn-outline {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        border: 1px solid var(--border-color, #cbd5e1);
        background: var(--bg-surface, #ffffff);
        color: var(--text-primary, #1e293b) !important;
        font-size: 0.78rem;
        font-weight: 600;
        padding: 4px 8px;
        border-radius: 6px;
        text-decoration: none;
        cursor: pointer;
      }
      .ibps-btn-outline:hover {
        background: var(--bg-secondary, #f1f5f9);
      }

      /* Responsive Mistake List */
      .ibps-mistake-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 320px;
        overflow-y: auto;
      }
      .ibps-mistake-card {
        padding: 10px 14px;
        border-radius: 8px;
        background: var(--bg-secondary, #f8fafc);
        border-left: 4px solid #f59e0b;
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        gap: 10px;
      }
    `;
    document.head.appendChild(style);
  }

  // --------------------------------------------------------------------------
  // STORAGE & REAL APP DATA PULL
  // --------------------------------------------------------------------------
  function loadState() {
    try {
      const raw = localStorage.getItem(LS_KEY);
      const parsed = raw ? JSON.parse(raw) : {};
      const def = defaultState();
      const st = Object.assign({}, def, parsed);
      // Ensure all arrays and objects exist even if loaded from older format
      st.manualTopicStats = st.manualTopicStats || st.topicStats || {};
      st.dailyLog = Array.isArray(st.dailyLog) ? st.dailyLog : [];
      st.pctPass1 = Array.isArray(st.pctPass1) ? st.pctPass1 : [];
      st.pctPass2 = Array.isArray(st.pctPass2) ? st.pctPass2 : [];
      st.mistakes = Array.isArray(st.mistakes) ? st.mistakes : [];
      st.mocks = Array.isArray(st.mocks) ? st.mocks : [];
      st.revisionSchedule = Array.isArray(st.revisionSchedule) ? st.revisionSchedule : [];
      return st;
    } catch (_) { return defaultState(); }
  }

  function saveState(st) {
    try { localStorage.setItem(LS_KEY, JSON.stringify(st)); } catch (_) {}
  }

  function defaultState() {
    return {
      startDate:        null,
      lastMockDate:     null,
      mockCount:        0,
      practiceDays:     0,
      dailyLog:         [],
      manualTopicStats: {},
      pctPass1:         [],
      pctPass2:         [],
      mistakes:         [],
      mocks:            [],
      revisionSchedule: []
    };
  }

  // Pull real attempts from the app's BankStorage & BankAnalytics
  function getRealAttempts() {
    if (window.BankStorage && typeof window.BankStorage.getAttemptsSync === 'function') {
      return window.BankStorage.getAttemptsSync();
    }
    try {
      const raw = localStorage.getItem('bankprep.history.v1');
      return raw ? JSON.parse(raw) : [];
    } catch (_) {
      return [];
    }
  }

  // Aggregate real stats per topic from attemptsCache
  function getRealTopicStatsMap() {
    const attempts = getRealAttempts();
    const map = {}; // key: topicId -> { solved, correct, incorrect, testsCount, lastDate }

    attempts.forEach(att => {
      const tid = att.topic;
      if (!tid) return;
      if (!map[tid]) {
        map[tid] = {
          solved: 0,
          correct: 0,
          incorrect: 0,
          testsCount: 0,
          lastDate: null,
          timeSpent: 0
        };
      }
      const m = map[tid];
      m.testsCount++;
      m.solved += (att.attempted !== undefined ? att.attempted : ((att.correct || 0) + (att.incorrect || 0)));
      m.correct += (att.correct || 0);
      m.incorrect += (att.incorrect || 0);
      m.timeSpent += (att.sec || 0);
      if (att.ts && (!m.lastDate || att.ts > m.lastDate)) {
        m.lastDate = att.ts;
      }
    });

    return map;
  }

  // Compute aggregated stats for a Coach topic (which may map to 1 or more app topic IDs)
  function getCoachTopicAggregated(coachTopic, realStatsMap, manualStats) {
    let solved = 0;
    let correct = 0;
    let testAttempts = 0;
    let lastDate = null;

    (coachTopic.appTopicIds || []).forEach(tid => {
      const rs = realStatsMap[tid];
      if (rs) {
        solved += rs.solved;
        correct += rs.correct;
        testAttempts += rs.testsCount;
        if (rs.lastDate && (!lastDate || rs.lastDate > lastDate)) {
          lastDate = rs.lastDate;
        }
      }
    });

    // Add any manual logged sessions for this coach topic
    const ms = manualStats && manualStats[coachTopic.id];
    if (ms) {
      solved += (ms.q || 0);
      correct += (ms.correct || 0);
    }

    const accuracy = solved > 0 ? Math.round((correct / solved) * 100) : null;
    return {
      solved,
      correct,
      testAttempts,
      accuracy,
      lastDate
    };
  }

  // Overall coach real totals across all chapters
  function getOverallRealSummary(realStatsMap, st) {
    let totalSolved = 0;
    let totalCorrect = 0;
    let totalAttempts = 0;

    Object.values(realStatsMap).forEach(s => {
      totalSolved += s.solved;
      totalCorrect += s.correct;
      totalAttempts += s.testsCount;
    });

    // Also include drill log questions
    (st.dailyLog || []).forEach(d => {
      totalSolved += (d.drillTotal || 0);
      totalCorrect += (d.drillCorrect || 0);
    });

    const accuracy = totalSolved > 0 ? Math.round((totalCorrect / totalSolved) * 100) : 0;
    return {
      totalSolved,
      totalCorrect,
      totalAttempts,
      accuracy
    };
  }

  // --------------------------------------------------------------------------
  // DATE UTILITIES
  // --------------------------------------------------------------------------
  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function daysLeft() {
    const now  = new Date();
    const diff = PRELIMS_DATE.getTime() - now.getTime();
    return Math.max(0, Math.ceil(diff / 86400000));
  }

  function daysBetween(isoA, isoB) {
    return Math.round((new Date(isoB) - new Date(isoA)) / 86400000);
  }

  function getOrCreateTodayLog(st) {
    const t = today();
    let log = st.dailyLog.find(d => d.date === t);
    if (!log) {
      log = { date: t, drillDone: false, drillCorrect: 0, drillTotal: 0, drillTime: 0, topics: {} };
      st.dailyLog.push(log);
      if (!st.startDate) st.startDate = t;
    }
    // Practice days count is distinct dates logged or attempted
    st.practiceDays = st.dailyLog.length;
    return log;
  }

  function mockDueStatus(st, realStatsMap) {
    // If user has taken mocks, calculate from last mock
    if (st.lastMockDate) {
      return daysBetween(st.lastMockDate, today()) >= MOCK_CYCLE;
    }
    // If no mocks taken yet, check if 6 practice days or 100+ real questions solved
    const summary = getOverallRealSummary(realStatsMap, st);
    return st.practiceDays >= MOCK_CYCLE || summary.totalSolved >= 120;
  }

  function cycleTopics(st, realStatsMap) {
    const cutoff = st.lastMockDate || st.startDate;
    const seen = new Set();

    // From real attempts since cutoff
    const attempts = getRealAttempts();
    attempts.forEach(att => {
      if (!cutoff || (att.ts && att.ts.slice(0, 10) >= cutoff)) {
        // match to coach topic
        const allTopics = [...QUANT_TOPICS, ...REASONING_TOPICS];
        const match = allTopics.find(ct => (ct.appTopicIds || []).includes(att.topic));
        if (match) seen.add(match.name);
      }
    });

    // From daily drill log
    (st.dailyLog || []).forEach(d => {
      if (!cutoff || d.date >= cutoff) {
        Object.keys(d.topics || {}).forEach(tid => {
          const allTopics = [...QUANT_TOPICS, ...REASONING_TOPICS];
          const match = allTopics.find(ct => ct.id === tid);
          if (match) seen.add(match.name);
        });
      }
    });

    return [...seen];
  }

  // --------------------------------------------------------------------------
  // STARTUP NOTIFICATION (once per session, auto-dismiss)
  // --------------------------------------------------------------------------
  function maybeShowStartupBanner() {
    const sessionShown = sessionStorage.getItem(SESSION_KEY);
    if (sessionShown) return;
    sessionStorage.setItem(SESSION_KEY, '1');

    const st           = loadState();
    const realStatsMap = getRealTopicStatsMap();
    const dl           = daysLeft();
    const mockDue      = mockDueStatus(st, realStatsMap);
    const drillLog     = st.dailyLog.find(d => d.date === today());
    const drillDone    = drillLog && drillLog.drillDone;
    const summary      = getOverallRealSummary(realStatsMap, st);

    let line1 = `🏦 IBPS RRB Clerk Prelims: <b>${dl} days left</b> (6 Dec 2026)`;
    let line2 = drillDone
      ? `✅ Today's 20-Q drill done! Total solved: ${summary.totalSolved} Qs (${summary.accuracy}% acc).`
      : `📝 Today's 20-Q drill is <b>pending</b>. ${summary.totalSolved} Qs solved in app so far.`;

    let mockLine = '';
    if (mockDue) {
      const ct = cycleTopics(st, realStatsMap);
      mockLine = `🔔 <b>MOCK DUE:</b> Practised: ${ct.length ? ct.slice(0, 4).join(', ') : 'Quant & Reasoning'}.`;
    }

    const banner = document.createElement('div');
    banner.id = 'ibps-startup-banner';
    banner.innerHTML = `
      <div style="display:flex; align-items:flex-start; gap:12px;">
        <span style="font-size:1.5rem; line-height:1;">📅</span>
        <div style="flex:1;">
          <div style="font-weight:700; font-size:0.95rem; line-height:1.4;">${line1}</div>
          <div style="font-size:0.85rem; margin-top:3px; opacity:0.92;">${line2}</div>
          ${mockLine ? `<div style="font-size:0.82rem; margin-top:5px; background:rgba(255,255,255,0.18); padding:3px 8px; border-radius:6px;">${mockLine}</div>` : ''}
        </div>
        <button id="ibps-banner-close" style="background:none; border:none; color:inherit; font-size:1.3rem; cursor:pointer; padding:0 4px; opacity:0.8; line-height:1;">&times;</button>
      </div>
    `;

    if (!document.getElementById('ibps-banner-style')) {
      const styleEl = document.createElement('style');
      styleEl.id = 'ibps-banner-style';
      styleEl.textContent = `
        #ibps-startup-banner {
          position: fixed; top: 16px; left: 50%; transform: translateX(-50%);
          z-index: 99999; background: linear-gradient(135deg, #1e3a8a, #2563eb);
          color: #ffffff; padding: 12px 18px; border-radius: 12px;
          box-shadow: 0 8px 30px rgba(37,99,235,0.4);
          max-width: min(540px, calc(100vw - 32px)); width: 100%;
          animation: ibpsBannerIn 0.35s ease;
          font-family: inherit;
          transition: opacity 0.4s ease, transform 0.4s ease;
        }
        @keyframes ibpsBannerIn {
          from { opacity:0; transform:translateX(-50%) translateY(-12px); }
          to   { opacity:1; transform:translateX(-50%) translateY(0); }
        }
        #ibps-startup-banner.hiding {
          opacity: 0; transform: translateX(-50%) translateY(-12px);
        }
      `;
      document.head.appendChild(styleEl);
    }

    document.body.appendChild(banner);

    function dismissBanner() {
      banner.classList.add('hiding');
      setTimeout(() => banner.remove(), 450);
    }

    const timer = setTimeout(dismissBanner, 6000);
    document.getElementById('ibps-banner-close').onclick = (e) => {
      e.stopPropagation();
      clearTimeout(timer);
      dismissBanner();
    };
    const tapHandler = () => { clearTimeout(timer); dismissBanner(); document.removeEventListener('click', tapHandler); };
    setTimeout(() => document.addEventListener('click', tapHandler), 200);
  }

  // --------------------------------------------------------------------------
  // MAIN RENDER METHOD
  // --------------------------------------------------------------------------
  function render() {
    const container = document.getElementById('app');
    if (!container) return;

    injectCoachStyles();

    const st           = loadState();
    const realStatsMap = getRealTopicStatsMap();
    const dl           = daysLeft();
    const isDue        = mockDueStatus(st, realStatsMap);
    const ct           = cycleTopics(st, realStatsMap);
    const tLog         = getOrCreateTodayLog(st);
    saveState(st);

    container.innerHTML = buildPageHTML(st, realStatsMap, dl, isDue, ct, tLog);
    wireEvents(st, realStatsMap);
  }

  // --------------------------------------------------------------------------
  // PAGE HTML BUILDER
  // --------------------------------------------------------------------------
  function buildPageHTML(st, realStatsMap, dl, isDue, ct, tLog) {
    const summary = getOverallRealSummary(realStatsMap, st);

    return `
      <div class="ibps-page">
        <!-- Breadcrumb -->
        <nav class="crumb">
          <a href="#/">Dashboard</a> &rsaquo;
          <span><b>IBPS RRB Clerk Coach</b></span>
        </nav>

        <!-- Hero Header -->
        <div class="ibps-hero-card">
          <div class="ibps-hero-top">
            <div>
              <div class="ibps-hero-title">
                <span>🏦</span> IBPS RRB Clerk Prelims Coach
              </div>
              <p class="ibps-hero-sub">
                Target: <b>32–36</b> in Quant + <b>35+</b> in Reasoning (Total 80 Qs / 45 min) · Prelims: 6 Dec 2026 · Mains: 30 Jan 2027
              </p>
            </div>
            <div style="display:flex; gap:8px; flex-wrap:wrap;">
              <a href="#/subject/arithmetic" class="ibps-btn-outline" style="background:rgba(255,255,255,0.15); color:#fff !important; border-color:rgba(255,255,255,0.3);">
                🧮 23 Quant Chapters
              </a>
              <a href="#/subject/reasoning" class="ibps-btn-outline" style="background:rgba(255,255,255,0.15); color:#fff !important; border-color:rgba(255,255,255,0.3);">
                🧠 19 Reasoning Chapters
              </a>
              <button class="ibps-btn-outline" id="ibps-export-btn" style="background:rgba(255,255,255,0.9); color:#1e3a8a !important; border:none;">
                📥 Export Report
              </button>
            </div>
          </div>
        </div>

        <!-- Metric Cards (Responsive Grid 4-col desktop, 2-col mobile) -->
        ${buildCountdownBand(dl, st, isDue, tLog, summary)}

        <!-- Mock Due Alert (if applicable) -->
        ${isDue ? buildMockDueBanner(ct) : ''}

        <!-- Daily 20-Q Drill (with direct links to actual question banks) -->
        ${buildDailyDrill(tLog, st, realStatsMap)}

        <!-- Percentage Two-Solve Rule Tracker -->
        ${buildPercentageTwoSolveTracker(st, realStatsMap)}

        <!-- Real Topic Tracker (Quantitative Aptitude) -->
        ${buildTopicTracker(QUANT_TOPICS, 'Quantitative Aptitude (40 Qs)', '#2563eb', realStatsMap, st)}

        <!-- Real Topic Tracker (Reasoning Ability) -->
        ${buildTopicTracker(REASONING_TOPICS, 'Reasoning Ability (40 Qs)', '#7c3aed', realStatsMap, st)}

        <!-- Two Column Section: Mock History & Mistake Notebook -->
        <div class="ibps-two-col">
          ${buildMockHistory(st)}
          ${buildMistakeNotebook(st)}
        </div>

        <!-- Exam Day Sectional Strategy -->
        ${buildExamStrategy()}
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // SECTION BUILDERS
  // --------------------------------------------------------------------------
  function buildCountdownBand(dl, st, isDue, tLog, summary) {
    const urgencyColor = dl > 30 ? '#2563eb' : dl > 14 ? '#d97706' : '#dc2626';
    const phaseLabel = dl > 21 ? 'Foundation Phase' : dl > 7 ? 'Sprint Phase' : 'Exam Week';

    return `
      <div class="ibps-grid-4">
        <!-- Card 1: Days to Prelims -->
        <div class="ibps-stat-card" style="border-top: 4px solid ${urgencyColor};">
          <div>
            <div class="ibps-stat-label">Days to Prelims</div>
            <div class="ibps-stat-val" style="color:${urgencyColor};">${dl}</div>
          </div>
          <div class="ibps-stat-foot">
            <span class="badge ${dl > 21 ? 'badge-primary' : 'badge-warning'}">${phaseLabel}</span>
            <span>6 Dec 2026</span>
          </div>
        </div>

        <!-- Card 2: Questions Solved from PDFs -->
        <div class="ibps-stat-card" style="border-top: 4px solid #10b981;">
          <div>
            <div class="ibps-stat-label">Questions Solved (PDFs)</div>
            <div class="ibps-stat-val" style="color:#10b981;">${summary.totalSolved}</div>
          </div>
          <div class="ibps-stat-foot">
            <span>${summary.totalAttempts} test sessions completed</span>
          </div>
        </div>

        <!-- Card 3: Real Accuracy -->
        <div class="ibps-stat-card" style="border-top: 4px solid #8b5cf6;">
          <div>
            <div class="ibps-stat-label">Overall Accuracy</div>
            <div class="ibps-stat-val" style="color:#8b5cf6;">${summary.accuracy}%</div>
          </div>
          <div class="ibps-stat-foot">
            <span class="badge ${summary.accuracy >= 80 ? 'badge-success' : summary.accuracy >= 60 ? 'badge-warning' : 'badge-danger'}">
              ${summary.accuracy >= 80 ? '🎯 Prelims Ready' : summary.accuracy >= 60 ? '⚡ Needs Polish' : '🔴 Focus Needed'}
            </span>
          </div>
        </div>

        <!-- Card 4: Daily Drill & Mocks -->
        <div class="ibps-stat-card" style="border-top: 4px solid #f59e0b;">
          <div>
            <div class="ibps-stat-label">Daily Drill & Mocks</div>
            <div class="ibps-stat-val">
              ${tLog.drillDone ? '<span style="color:#10b981; font-size:1.4rem;">✅ Done</span>' : '<span style="color:#d97706; font-size:1.4rem;">⏳ Pending</span>'}
            </div>
          </div>
          <div class="ibps-stat-foot">
            <span>${isDue ? '🔔 <b style="color:#dc2626;">Mock Due Now</b>' : `${st.mockCount} mocks logged`}</span>
          </div>
        </div>
      </div>
    `;
  }

  function buildMockDueBanner(cycleTopicsArr) {
    const list = cycleTopicsArr.length
      ? cycleTopicsArr.map(n => `<span class="badge badge-primary" style="font-size:0.78rem;">${n}</span>`).join(' ')
      : '<em class="text-muted">General Prelims Syllabus (Quant + Reasoning)</em>';

    return `
      <div class="card mb-4" style="border-left: 5px solid #dc2626; background: linear-gradient(135deg, rgba(220,38,38,0.06), rgba(239,68,68,0.02));">
        <div class="flex-between mb-2" style="flex-wrap:wrap; gap:8px;">
          <h3 style="color:#dc2626; margin:0; display:flex; align-items:center; gap:8px; font-size:1.1rem;">
            <span>🔔</span> 6-Day Cycle Complete: MOCK DUE
          </h3>
          <span class="badge badge-danger">Timed 45-Min Prelims Drill</span>
        </div>
        <p style="font-size:0.88rem; color:var(--text-secondary); margin:0 0 10px;">
          Assess your speed, accuracy, and negative marking penalty (<b>−0.25</b>) across the topics you have practised in this cycle:
        </p>
        <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:14px;">
          ${list}
        </div>
        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button class="btn" id="ibps-start-mock-btn">📝 Take / Log Mock Test</button>
          <button class="btn alt sm" id="ibps-skip-mock-btn">Reset Cycle</button>
        </div>
      </div>
    `;
  }

  function buildDailyDrill(tLog, st, realStatsMap) {
    const drillDone = tLog.drillDone;
    const acc = tLog.drillTotal > 0 ? Math.round((tLog.drillCorrect / tLog.drillTotal) * 100) : null;

    return `
      <div class="card mb-4" style="border-left: 5px solid #2563eb;">
        <div class="flex-between mb-3" style="flex-wrap:wrap; gap:8px;">
          <div>
            <h3 style="margin:0; display:flex; align-items:center; gap:8px; font-size:1.15rem;">
              <span>⚡</span> Daily 20-Question Drill
              <span class="badge ${drillDone ? 'badge-success' : 'badge-warning'}">${drillDone ? '✅ Completed' : '⏳ Pending Today'}</span>
            </h3>
            <p class="subtitle text-sm" style="margin:4px 0 0;">
              Mandatory daily speed training: Simplification(8) + Percentages(6) + Fractions(3) + Pure Calc(3)
            </p>
          </div>
          ${drillDone && acc !== null ? `
            <div style="text-align:right;">
              <span style="font-size:1.4rem; font-weight:800; color:${acc>=80?'#10b981':'#d97706'};">${acc}%</span>
              <div class="text-muted text-sm">${tLog.drillCorrect}/20 correct (${tLog.drillTime || 20}m)</div>
            </div>
          ` : ''}
        </div>

        <!-- 4 Drill Sub-Sections with Direct Links to Question Banks -->
        <div class="ibps-drill-grid">
          ${DRILL_SPLITS.map(s => `
            <div class="ibps-drill-item">
              <div class="ibps-drill-item-head">
                <span style="font-weight:700; font-size:0.86rem; color:var(--text-primary);">${s.label}</span>
                <span class="badge badge-primary" style="font-size:0.75rem;">${s.count} Qs</span>
              </div>
              <div style="font-size:0.78rem; color:var(--text-muted); margin-bottom:10px;">${s.sub}</div>
              <a href="${s.url}" class="ibps-btn-practice">
                Solve in App &rarr;
              </a>
            </div>
          `).join('')}
        </div>

        <!-- Drill Logger Form -->
        ${drillDone ? `
          <div style="background:rgba(16,185,129,0.08); border:1px solid rgba(16,185,129,0.3); border-radius:10px; padding:12px 16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
            <div>
              <b style="color:#059669;">✅ Today's drill logged:</b>
              <span style="font-size:0.9rem; color:var(--text-secondary);"> ${tLog.drillCorrect}/20 correct in ${tLog.drillTime || 20} mins.</span>
            </div>
            <button class="btn sm alt" id="ibps-re-log-drill-btn">Edit Result</button>
          </div>
        ` : `
          <div style="background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:12px; padding:16px;">
            <div style="font-weight:700; font-size:0.92rem; margin-bottom:10px;">Log Today's 20-Q Drill Result:</div>
            <div style="display:flex; flex-wrap:wrap; gap:12px; align-items:flex-end;">
              <div>
                <label style="font-size:0.82rem; font-weight:600; display:block; margin-bottom:4px;">Correct (out of 20)</label>
                <input type="number" id="ibps-drill-correct" min="0" max="20" value="16"
                  style="width:90px; padding:8px 10px; border:1px solid var(--border-color); border-radius:8px; font-size:0.95rem; background:var(--bg-surface);">
              </div>
              <div>
                <label style="font-size:0.82rem; font-weight:600; display:block; margin-bottom:4px;">Time taken (min)</label>
                <input type="number" id="ibps-drill-time" min="1" max="60" value="20"
                  style="width:90px; padding:8px 10px; border:1px solid var(--border-color); border-radius:8px; font-size:0.95rem; background:var(--bg-surface);">
              </div>
              <div>
                <button class="btn" id="ibps-log-drill-btn" style="height:38px;">✅ Save Drill Result</button>
              </div>
            </div>
          </div>
        `}
      </div>
    `;
  }

  function buildPercentageTwoSolveTracker(st, realStatsMap) {
    const p1 = st.pctPass1.length;
    const p2 = st.pctPass2.length;
    const pending = st.pctPass1.filter(s1 => !st.pctPass2.find(s2 => s2.vs === s1.date));
    const pctReal = realStatsMap['percentages'] || { solved: 0, correct: 0 };

    return `
      <div class="card mb-4" style="border-left: 5px solid #8b5cf6;">
        <div class="flex-between mb-2" style="flex-wrap:wrap; gap:8px;">
          <h3 style="margin:0; display:flex; align-items:center; gap:8px; font-size:1.15rem;">
            <span>🔄</span> Percentage Two-Solve Rule
          </h3>
          <div style="display:flex; gap:8px; flex-wrap:wrap;">
            <span class="badge badge-primary">${pctReal.solved} Questions Practiced</span>
            <span class="badge badge-success">${p1} Pass 1</span>
            <span class="badge badge-warning">${p2} Pass 2</span>
          </div>
        </div>
        <p style="font-size:0.88rem; color:var(--text-secondary); margin:0 0 12px; line-height:1.5;">
          Every percentage question must be solved twice. <b>Pass 1</b> in the question book / app; <b>Pass 2</b> after a gap of 2–3 days as a timed test. Questions answered incorrectly in both passes automatically enter your Mistake Notebook.
        </p>

        ${pending.length ? `
          <div style="background:rgba(139,92,246,0.08); border:1px solid rgba(139,92,246,0.3); border-radius:10px; padding:12px 14px; margin-bottom:14px;">
            <b style="color:#7c3aed;">⏰ ${pending.length} Pass-1 Session(s) Ready for Pass 2 (Gap reached):</b>
            <div style="font-size:0.82rem; color:var(--text-secondary); margin-top:6px;">
              ${pending.map(s => `Session from ${s.date} (${s.questions} Qs, ${s.correct} correct)`).join(' &nbsp;|&nbsp; ')}
            </div>
          </div>
        ` : ''}

        <div style="display:flex; gap:10px; flex-wrap:wrap; align-items:center;">
          <a href="#/topic/arithmetic/percentages" class="btn sm">
            Practice Percentages (PDF 2) &rarr;
          </a>
          <button class="btn sm alt" id="ibps-log-pct-pass1">📝 Record Pass 1 Session</button>
          ${pending.length ? `<button class="btn sm alt" id="ibps-log-pct-pass2">🔄 Record Pass 2 Session</button>` : ''}
          <button class="btn sm alt" id="ibps-add-mistake-btn">➕ Add to Mistake List</button>
        </div>
      </div>
    `;
  }

  function buildTopicTracker(topicsList, sectionTitle, themeColor, realStatsMap, st) {
    const rows = topicsList.map(t => {
      const stats = getCoachTopicAggregated(t, realStatsMap, st.manualTopicStats);
      const acc = stats.accuracy;

      let badge = '';
      if (!stats.solved) {
        badge = `<span class="badge badge-muted" style="font-size:0.75rem;">⚪ Not Started</span>`;
      } else if (acc >= 80) {
        badge = `<span class="badge badge-success" style="font-size:0.75rem;">🟢 Strong (Ready)</span>`;
      } else if (acc >= 60) {
        badge = `<span class="badge badge-warning" style="font-size:0.75rem;">🟡 Average</span>`;
      } else {
        badge = `<span class="badge badge-danger" style="font-size:0.75rem;">🔴 Weak &ndash; Revise</span>`;
      }

      const accColor = acc === null ? 'var(--text-muted)' : acc >= 80 ? '#10b981' : acc >= 60 ? '#d97706' : '#ef4444';

      return `
        <tr>
          <td>
            <div style="font-weight:700; font-size:0.9rem;">${t.name}</div>
            <div class="text-muted" style="font-size:0.75rem;">Priority #${t.priority}</div>
          </td>
          <td style="text-align:center;">
            <span class="badge" style="background:var(--bg-secondary); color:var(--text-primary); font-size:0.78rem;">
              ${t.prelimQs} Qs
            </span>
          </td>
          <td style="text-align:center; font-weight:700; font-size:0.92rem;">
            ${stats.solved}
          </td>
          <td style="text-align:center; font-weight:800; font-size:0.95rem; color:${accColor};">
            ${acc !== null ? acc + '%' : '—'}
          </td>
          <td style="text-align:center;">
            ${badge}
          </td>
          <td style="text-align:center; white-space:nowrap;">
            <a href="${t.practiceUrl}" class="ibps-btn-practice">
              Practice Now &rarr;
            </a>
          </td>
        </tr>
      `;
    });

    return `
      <div class="ibps-table-card">
        <div class="ibps-table-header" style="border-left:5px solid ${themeColor};">
          <div>
            <h3 style="margin:0; font-size:1.05rem; display:flex; align-items:center; gap:8px;">
              <span>${sectionTitle.startsWith('Quant') ? '🧮' : '🧠'}</span> ${sectionTitle}
            </h3>
            <div class="text-muted text-sm" style="margin-top:2px;">
              Live data from your PDF question bank attempts
            </div>
          </div>
          <span class="badge badge-primary" style="font-size:0.78rem;">
            ${sectionTitle.startsWith('Quant') ? 'Target: 32–36 Qs' : 'Target: 35+ Qs'}
          </span>
        </div>
        <div class="ibps-table-scroll">
          <table>
            <thead>
              <tr>
                <th>Topic & Priority</th>
                <th style="text-align:center; width:90px;">Exam Weight</th>
                <th style="text-align:center; width:90px;">Solved</th>
                <th style="text-align:center; width:90px;">Accuracy</th>
                <th style="text-align:center; width:130px;">Status</th>
                <th style="text-align:center; width:130px;">Action</th>
              </tr>
            </thead>
            <tbody>
              ${rows.join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function buildMockHistory(st) {
    const mocks = (st.mocks || []).slice().reverse();

    return `
      <div class="card" style="border-left: 5px solid #10b981; margin-bottom:0;">
        <div class="flex-between mb-3" style="flex-wrap:wrap; gap:8px;">
          <div>
            <h3 style="margin:0; font-size:1.05rem; display:flex; align-items:center; gap:8px;">
              <span>🧪</span> Mock Test Records
            </h3>
            <p class="subtitle text-sm" style="margin:2px 0 0;">Cycle: Every 6 days · Target: 80%+ · Penalty: −0.25</p>
          </div>
          <button class="btn sm" id="ibps-manual-log-mock">+ Log Mock</button>
        </div>

        ${mocks.length ? `
          <div class="ibps-table-scroll" style="margin-top:8px;">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th style="text-align:center;">Score</th>
                  <th style="text-align:center;">Accuracy</th>
                  <th style="text-align:center;">Status</th>
                </tr>
              </thead>
              <tbody>
                ${mocks.slice(0, 5).map(m => {
                  const netScore = (m.correct - (m.incorrect || 0) * NEG_MARK).toFixed(2);
                  const passed = m.accuracy >= 80;
                  return `
                    <tr>
                      <td><b>${m.date}</b></td>
                      <td style="text-align:center; font-weight:700;">${netScore} / ${m.total}</td>
                      <td style="text-align:center; font-weight:800; color:${m.accuracy>=80?'#10b981':'#ef4444'};">${m.accuracy}%</td>
                      <td style="text-align:center;">
                        <span class="badge ${passed ? 'badge-success' : 'badge-danger'}">${passed ? '✅ Ready' : '📚 Revise'}</span>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        ` : `
          <div style="padding:24px 16px; text-align:center; background:var(--bg-secondary); border-radius:10px; color:var(--text-muted); font-size:0.88rem;">
            No mocks logged yet. Complete 6 practice days or 120+ questions, then take a full mock.
          </div>
        `}
      </div>
    `;
  }

  function buildMistakeNotebook(st) {
    const mistakes = (st.mistakes || []).slice().reverse();
    const isSunday = new Date().getDay() === 0;

    return `
      <div class="card" style="border-left: 5px solid #f59e0b; margin-bottom:0;">
        <div class="flex-between mb-3" style="flex-wrap:wrap; gap:8px;">
          <div>
            <h3 style="margin:0; font-size:1.05rem; display:flex; align-items:center; gap:8px;">
              <span>📒</span> Mistake Notebook
              ${isSunday ? `<span class="badge badge-warning">📅 Sunday Revision</span>` : ''}
            </h3>
            <p class="subtitle text-sm" style="margin:2px 0 0;">Review every Sunday · Identify time sinks & repeated errors</p>
          </div>
          <button class="btn sm alt" id="ibps-add-mistake-log-btn">+ Add Mistake</button>
        </div>

        ${mistakes.length ? `
          <div class="ibps-mistake-list">
            ${mistakes.slice(0, 8).map((m, idx) => `
              <div class="ibps-mistake-card">
                <div>
                  <div style="font-size:0.75rem; color:var(--text-muted); font-weight:600;">
                    ${m.date} &middot; <span style="color:#d97706;">${m.topic || 'General'}</span>
                  </div>
                  <div style="font-size:0.86rem; color:var(--text-primary); margin-top:2px;">
                    ${m.note}
                  </div>
                </div>
                <button class="ibps-btn-outline ibps-remove-mistake-btn" data-idx="${mistakes.length - 1 - idx}" style="padding:2px 6px; font-size:0.72rem;">
                  ✕
                </button>
              </div>
            `).join('')}
          </div>
        ` : `
          <div style="padding:24px 16px; text-align:center; background:var(--bg-secondary); border-radius:10px; color:var(--text-muted); font-size:0.88rem;">
            Mistake notebook is clean! Any question answered wrongly twice in Percentage Two-Solve is auto-added here.
          </div>
        `}
      </div>
    `;
  }

  function buildExamStrategy() {
    return `
      <div class="card mt-4" style="border-left: 5px solid #3b82f6;">
        <h3 style="margin:0 0 12px; font-size:1.15rem; display:flex; align-items:center; gap:8px;">
          <span>⚡</span> IBPS RRB Clerk Prelims: Ideal Attempt Sequence
        </h3>
        <div class="ibps-two-col" style="margin-bottom:12px;">
          <!-- Quant Strategy -->
          <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; border:1px solid var(--border-color);">
            <div style="font-weight:700; color:#2563eb; font-size:0.95rem; margin-bottom:10px;">
              🧮 Quantitative Aptitude (Target: 32–36 Qs)
            </div>
            <ol style="margin:0; padding-left:18px; font-size:0.86rem; line-height:1.6; color:var(--text-primary);">
              <li><b>Simplification & Approx. (8–10 Qs):</b> Attempt FIRST (fastest score builder).</li>
              <li><b>Number Series (5 Qs):</b> Spot obvious patterns in &lt;30s; skip complex ones immediately.</li>
              <li><b>Quadratic Equations (5 Qs):</b> Standard factorization — reliable full marks.</li>
              <li><b>Data Interpretation (5 Qs):</b> Solve direct graph questions; avoid heavy calculation sets.</li>
              <li><b>Arithmetic Word Problems (Remaining):</b> Solve high-yield Percentage/Ratio first.</li>
            </ol>
          </div>

          <!-- Reasoning Strategy -->
          <div style="background:var(--bg-secondary); padding:16px; border-radius:12px; border:1px solid var(--border-color);">
            <div style="font-weight:700; color:#7c3aed; font-size:0.95rem; margin-bottom:10px;">
              🧠 Reasoning Ability (Target: 35+ Qs)
            </div>
            <ol style="margin:0; padding-left:18px; font-size:0.86rem; line-height:1.6; color:var(--text-primary);">
              <li><b>Syllogism (5 Qs) & Inequalities (5 Qs):</b> Attempt FIRST within 3–4 minutes.</li>
              <li><b>Coding-Decoding & Alpha Series (4–5 Qs):</b> High accuracy, fast execution.</li>
              <li><b>Direction Sense & Blood Relations (4–5 Qs):</b> Draw family tree/map quickly.</li>
              <li><b>Puzzles & Seating (15–20 Qs):</b> Pick 1-variable puzzles first; skip 3+ variable sets.</li>
              <li><b>Negative Marking Alert:</b> Never blind guess (−0.25 penalty).</li>
            </ol>
          </div>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // EVENT WIRING & DIALOGS
  // --------------------------------------------------------------------------
  function wireEvents(st, realStatsMap) {
    // Daily Drill Log
    const logDrillBtn = document.getElementById('ibps-log-drill-btn');
    if (logDrillBtn) {
      logDrillBtn.onclick = () => {
        const c = parseInt(document.getElementById('ibps-drill-correct').value) || 0;
        const tm = parseInt(document.getElementById('ibps-drill-time').value) || 20;
        const tLog = getOrCreateTodayLog(st);
        tLog.drillDone = true;
        tLog.drillCorrect = Math.min(Math.max(c, 0), 20);
        tLog.drillTotal = 20;
        tLog.drillTime = tm;
        tLog.topics['simplification'] = 8;
        tLog.topics['percentages'] = 6;
        tLog.topics['ratio-misc'] = 3;
        tLog.topics['pure-calc'] = 3;
        saveState(st);
        showToastCoach(`✅ Drill logged! ${tLog.drillCorrect}/20 correct (${Math.round(tLog.drillCorrect/20*100)}%).`);
        render();
      };
    }

    const reLogBtn = document.getElementById('ibps-re-log-drill-btn');
    if (reLogBtn) {
      reLogBtn.onclick = () => {
        const tLog = getOrCreateTodayLog(st);
        tLog.drillDone = false;
        saveState(st);
        render();
      };
    }

    // Pass 1 Log
    const p1Btn = document.getElementById('ibps-log-pct-pass1');
    if (p1Btn) {
      p1Btn.onclick = () => showPctPassDialog(st, 1);
    }

    // Pass 2 Log
    const p2Btn = document.getElementById('ibps-log-pct-pass2');
    if (p2Btn) {
      p2Btn.onclick = () => showPctPassDialog(st, 2);
    }

    // Add Mistake Dialog
    [document.getElementById('ibps-add-mistake-btn'), document.getElementById('ibps-add-mistake-log-btn')].forEach(b => {
      if (b) b.onclick = () => showAddMistakeDialog(st);
    });

    // Remove Mistake
    document.querySelectorAll('.ibps-remove-mistake-btn').forEach(btn => {
      btn.onclick = () => {
        const idx = parseInt(btn.dataset.idx);
        if (!isNaN(idx) && idx >= 0 && idx < st.mistakes.length) {
          st.mistakes.splice(idx, 1);
          saveState(st);
          render();
        }
      };
    });

    // Mock Log
    const mockBtn = document.getElementById('ibps-manual-log-mock');
    if (mockBtn) mockBtn.onclick = () => showLogMockDialog(st, realStatsMap);

    const startMockBtn = document.getElementById('ibps-start-mock-btn');
    if (startMockBtn) startMockBtn.onclick = () => showLogMockDialog(st, realStatsMap);

    // Reset Mock Cycle
    const skipMockBtn = document.getElementById('ibps-skip-mock-btn');
    if (skipMockBtn) {
      skipMockBtn.onclick = () => {
        st.lastMockDate = today();
        saveState(st);
        showToastCoach('Mock cycle reset. Carry on practising!');
        render();
      };
    }

    // Export Progress Report
    const exportBtn = document.getElementById('ibps-export-btn');
    if (exportBtn) {
      exportBtn.onclick = () => exportProgressCSV(st, realStatsMap);
    }
  }

  // --------------------------------------------------------------------------
  // DIALOG HELPERS
  // --------------------------------------------------------------------------
  function showPctPassDialog(st, passNum) {
    const dlg = document.getElementById('dlg');
    if (!dlg) return;

    dlg.innerHTML = `
      <div style="font-family:inherit;">
        <h3 style="margin:0 0 12px; font-size:1.05rem;">
          🔄 Record Percentage Pass ${passNum} Session
        </h3>
        <p style="font-size:0.85rem; color:var(--text-secondary); margin:0 0 14px;">
          ${passNum === 1 ? 'Pass 1: Record your initial test solving.' : 'Pass 2: Re-attempting previously solved questions to measure speed improvement.'}
        </p>
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div>
            <label style="font-size:0.82rem; font-weight:600; display:block; margin-bottom:4px;">Questions Solved</label>
            <input type="number" id="_pct_q" value="20" min="1" max="180"
              style="width:100%; padding:8px 10px; border:1px solid var(--border-color); border-radius:6px; background:var(--bg-surface);">
          </div>
          <div>
            <label style="font-size:0.82rem; font-weight:600; display:block; margin-bottom:4px;">Correct Answers</label>
            <input type="number" id="_pct_c" value="16" min="0" max="180"
              style="width:100%; padding:8px 10px; border:1px solid var(--border-color); border-radius:6px; background:var(--bg-surface);">
          </div>
          <div>
            <label style="font-size:0.82rem; font-weight:600; display:block; margin-bottom:4px;">Time Taken (minutes)</label>
            <input type="number" id="_pct_t" value="15" min="1" max="120"
              style="width:100%; padding:8px 10px; border:1px solid var(--border-color); border-radius:6px; background:var(--bg-surface);">
          </div>
        </div>
        <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:16px;">
          <button id="_dlg_cancel" class="btn sm alt">Cancel</button>
          <button id="_dlg_save" class="btn sm">Save Pass ${passNum}</button>
        </div>
      </div>
    `;
    dlg.showModal();

    dlg.querySelector('#_dlg_save').onclick = () => {
      const q = parseInt(dlg.querySelector('#_pct_q').value) || 20;
      const c = parseInt(dlg.querySelector('#_pct_c').value) || 0;
      const t = parseInt(dlg.querySelector('#_pct_t').value) || 15;

      if (passNum === 1) {
        st.pctPass1.push({ date: today(), questions: q, correct: c, time: t });
      } else {
        const lastP1 = st.pctPass1[st.pctPass1.length - 1];
        st.pctPass2.push({ date: today(), questions: q, correct: c, time: t, vs: lastP1 ? lastP1.date : today() });
        // If accuracy is poor, add to mistake notebook
        if (c < q * 0.8) {
          st.mistakes.push({
            date: today(),
            topic: 'Percentages (Pass 2)',
            note: `Failed Pass 2 benchmark: ${c}/${q} correct (${Math.round(c/q*100)}%). Needs conceptual review.`
          });
        }
      }
      saveState(st);
      dlg.close();
      showToastCoach(`✅ Pass ${passNum} saved!`);
      render();
    };

    dlg.querySelector('#_dlg_cancel').onclick = () => dlg.close();
    dlg.onclick = e => { if (e.target === dlg) dlg.close(); };
  }

  function showAddMistakeDialog(st) {
    const dlg = document.getElementById('dlg');
    if (!dlg) return;

    dlg.innerHTML = `
      <div style="font-family:inherit;">
        <h3 style="margin:0 0 12px; font-size:1.05rem;">📒 Add to Mistake Notebook</h3>
        <p style="font-size:0.85rem; color:var(--text-secondary); margin:0 0 14px;">
          Record time traps, shortcut oversights, or repeated calculation errors.
        </p>
        <div style="display:flex; flex-direction:column; gap:12px;">
          <div>
            <label style="font-size:0.82rem; font-weight:600; display:block; margin-bottom:4px;">Topic</label>
            <input type="text" id="_mst_top" value="Simplification / Fractions"
              style="width:100%; padding:8px 10px; border:1px solid var(--border-color); border-radius:6px; background:var(--bg-surface);">
          </div>
          <div>
            <label style="font-size:0.82rem; font-weight:600; display:block; margin-bottom:4px;">Mistake / Learning Note</label>
            <textarea id="_mst_note" rows="3" placeholder="e.g. Wasted 70s on decimal division; use 1/8 = 12.5% shortcut instead."
              style="width:100%; padding:8px 10px; border:1px solid var(--border-color); border-radius:6px; background:var(--bg-surface); font-family:inherit;"></textarea>
          </div>
        </div>
        <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:16px;">
          <button id="_dlg_cancel" class="btn sm alt">Cancel</button>
          <button id="_dlg_save" class="btn sm">Save Mistake</button>
        </div>
      </div>
    `;
    dlg.showModal();

    dlg.querySelector('#_dlg_save').onclick = () => {
      const top = dlg.querySelector('#_mst_top').value.trim() || 'General';
      const note = dlg.querySelector('#_mst_note').value.trim();
      if (!note) return;

      st.mistakes.push({ date: today(), topic: top, note });
      saveState(st);
      dlg.close();
      showToastCoach('✅ Mistake recorded in notebook.');
      render();
    };

    dlg.querySelector('#_dlg_cancel').onclick = () => dlg.close();
    dlg.onclick = e => { if (e.target === dlg) dlg.close(); };
  }

  function showLogMockDialog(st, realStatsMap) {
    const dlg = document.getElementById('dlg');
    if (!dlg) return;

    dlg.innerHTML = `
      <div style="font-family:inherit;">
        <h3 style="margin:0 0 12px; font-size:1.05rem;">🧪 Log Mock Test Result</h3>
        <p style="font-size:0.85rem; color:var(--text-secondary); margin:0 0 14px;">
          Enter your sectional test / full prelims mock result. Negative marking: <b>−0.25</b>.
        </p>
        <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
          <div>
            <label style="font-size:0.82rem; font-weight:600; display:block; margin-bottom:4px;">Total Questions</label>
            <input type="number" id="_mock_tot" value="40" min="10" max="80"
              style="width:100%; padding:8px; border:1px solid var(--border-color); border-radius:6px; background:var(--bg-surface);">
          </div>
          <div>
            <label style="font-size:0.82rem; font-weight:600; display:block; margin-bottom:4px;">Correct Answers</label>
            <input type="number" id="_mock_cor" value="32" min="0" max="80"
              style="width:100%; padding:8px; border:1px solid var(--border-color); border-radius:6px; background:var(--bg-surface);">
          </div>
          <div>
            <label style="font-size:0.82rem; font-weight:600; display:block; margin-bottom:4px;">Wrong Answers</label>
            <input type="number" id="_mock_inc" value="4" min="0" max="80"
              style="width:100%; padding:8px; border:1px solid var(--border-color); border-radius:6px; background:var(--bg-surface);">
          </div>
          <div>
            <label style="font-size:0.82rem; font-weight:600; display:block; margin-bottom:4px;">Time (min)</label>
            <input type="number" id="_mock_time" value="25" min="1" max="60"
              style="width:100%; padding:8px; border:1px solid var(--border-color); border-radius:6px; background:var(--bg-surface);">
          </div>
        </div>
        <div style="margin-top:12px;">
          <label style="font-size:0.82rem; font-weight:600; display:block; margin-bottom:4px;">Where was time lost? (Mistake Note)</label>
          <input type="text" id="_mock_note" placeholder="e.g. Got stuck on 2nd puzzle for 6 minutes"
            style="width:100%; padding:8px; border:1px solid var(--border-color); border-radius:6px; background:var(--bg-surface);">
        </div>
        <div style="display:flex; justify-content:flex-end; gap:8px; margin-top:16px;">
          <button id="_dlg_cancel" class="btn sm alt">Cancel</button>
          <button id="_dlg_save" class="btn sm">Save Mock</button>
        </div>
      </div>
    `;
    dlg.showModal();

    dlg.querySelector('#_dlg_save').onclick = () => {
      const tot = parseInt(dlg.querySelector('#_mock_tot').value) || 40;
      const cor = parseInt(dlg.querySelector('#_mock_cor').value) || 0;
      const inc = parseInt(dlg.querySelector('#_mock_inc').value) || 0;
      const note = dlg.querySelector('#_mock_note').value.trim();
      const attempted = cor + inc;
      const accuracy = attempted > 0 ? Math.round((cor / attempted) * 100) : 0;

      st.mockCount++;
      st.lastMockDate = today();
      st.mocks.push({
        date: today(),
        total: tot,
        correct: cor,
        incorrect: inc,
        accuracy: accuracy
      });

      if (note) {
        st.mistakes.push({ date: today(), topic: `Mock #${st.mockCount}`, note });
      }

      saveState(st);
      dlg.close();
      showToastCoach(`✅ Mock logged! Score: ${(cor - inc*NEG_MARK).toFixed(2)} (${accuracy}% acc).`);
      render();
    };

    dlg.querySelector('#_dlg_cancel').onclick = () => dlg.close();
    dlg.onclick = e => { if (e.target === dlg) dlg.close(); };
  }

  // --------------------------------------------------------------------------
  // EXPORT PROGRESS CSV
  // --------------------------------------------------------------------------
  function exportProgressCSV(st, realStatsMap) {
    const summary = getOverallRealSummary(realStatsMap, st);
    const rows = [
      ['IBPS RRB Clerk (Office Assistant) Prep Progress Report'],
      ['Generated On', new Date().toLocaleString()],
      ['Days Left to Prelims (6 Dec 2026)', daysLeft()],
      ['Total Questions Solved in App', summary.totalSolved],
      ['Overall Accuracy', summary.accuracy + '%'],
      ['Mocks Completed', st.mockCount],
      [],
      ['-- QUANTITATIVE APTITUDE TOPICS --'],
      ['Topic', 'Priority', 'Exam Weight', 'Solved in App', 'Accuracy'],
      ...QUANT_TOPICS.map(t => {
        const s = getCoachTopicAggregated(t, realStatsMap, st.manualTopicStats);
        return [t.name, '#' + t.priority, t.prelimQs + ' Qs', s.solved, s.accuracy !== null ? s.accuracy + '%' : 'Not Started'];
      }),
      [],
      ['-- REASONING ABILITY TOPICS --'],
      ['Topic', 'Priority', 'Exam Weight', 'Solved in App', 'Accuracy'],
      ...REASONING_TOPICS.map(t => {
        const s = getCoachTopicAggregated(t, realStatsMap, st.manualTopicStats);
        return [t.name, '#' + t.priority, t.prelimQs + ' Qs', s.solved, s.accuracy !== null ? s.accuracy + '%' : 'Not Started'];
      }),
      [],
      ['-- MOCK TEST HISTORY --'],
      ['Date', 'Total Qs', 'Correct', 'Incorrect', 'Accuracy', 'Net Score'],
      ...(st.mocks || []).map(m => [
        m.date, m.total, m.correct, m.incorrect, m.accuracy + '%', (m.correct - m.incorrect * NEG_MARK).toFixed(2)
      ]),
      [],
      ['-- MISTAKE NOTEBOOK --'],
      ['Date', 'Topic', 'Note'],
      ...(st.mistakes || []).map(m => [m.date, m.topic, m.note])
    ];

    const csvContent = rows.map(r => r.map(c => `"${String(c == null ? '' : c).replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `IBPS_RRB_Prep_Report_${today()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function showToastCoach(msg) {
    let t = document.getElementById('bp-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'bp-toast';
      document.body.appendChild(t);
    }
    t.className = 'bp-toast show';
    t.textContent = msg;
    clearTimeout(t._timer);
    t._timer = setTimeout(() => {
      t.classList.remove('show');
    }, 2800);
  }

  // --------------------------------------------------------------------------
  // PUBLIC API
  // --------------------------------------------------------------------------
  return {
    render,
    maybeShowStartupBanner,
    getDaysLeft: daysLeft,
    getState: loadState
  };
})();

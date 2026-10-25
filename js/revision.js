// ============================================================================
// BANKPREP PRO - DAILY REVISION ENGINE
// Mandatory Habit-Building Engine: Tables, Squares, Cubes, and Percentages
// ============================================================================

window.DailyRevision = (function() {
  const LS_KEY = 'bp_dailyRevision';
  const SNOOZE_KEY = 'bp_revision_snooze';
  const INTRO_KEY = 'bp_revision_intro_shown';

  // --------------------------------------------------------------------------
  // CONTENT SCHEDULE CONSTANTS & PURE SCHEDULE FUNCTIONS
  // --------------------------------------------------------------------------
  
  // A) TABLES: 28 tables in cycle. Sequence: 2..9, 11..30 (Table 10 is skipped!)
  const TABLE_SEQUENCE = [
    2, 3, 4, 5, 6, 7, 8, 9,
    11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30
  ];

  /**
   * Pure function: Returns the table number for a given cycle index.
   * Day 1 (index 0) = 2, Day 8 (index 7) = 9, Day 9 (index 8) = 11, Day 28 (index 27) = 30.
   * Wraps from 30 back to 2. Table 10 is never returned.
   */
  function getTableForIndex(i) {
    const idx = ((i % TABLE_SEQUENCE.length) + TABLE_SEQUENCE.length) % TABLE_SEQUENCE.length;
    return TABLE_SEQUENCE[idx];
  }

  /**
   * Pure function: Returns array of 5 numbers for Squares cycle (1 to 60).
   * Day 1 (index 0) = [1, 2, 3, 4, 5], Day 12 (index 11) = [56, 57, 58, 59, 60].
   * Wraps from 60 back to 1.
   */
  function getSquaresForIndex(i) {
    const cycle = ((i % 12) + 12) % 12;
    const start = cycle * 5 + 1;
    return [start, start + 1, start + 2, start + 3, start + 4];
  }

  /**
   * Pure function: Returns array of 5 numbers for Cubes cycle (1 to 60).
   * Day 1 (index 0) = [1, 2, 3, 4, 5], Day 12 (index 11) = [56, 57, 58, 59, 60].
   * Wraps from 60 back to 1.
   */
  function getCubesForIndex(i) {
    const cycle = ((i % 12) + 12) % 12;
    const start = cycle * 5 + 1;
    return [start, start + 1, start + 2, start + 3, start + 4];
  }

  /**
   * Pure function: Returns array of 5 denominators for Percentages cycle (1/1 to 1/30).
   * Day 1 (index 0) = [1, 2, 3, 4, 5], Day 6 (index 5) = [26, 27, 28, 29, 30].
   * Wraps from 1/30 back to 1/1.
   */
  function getPercentagesForIndex(i) {
    const cycle = ((i % 6) + 6) % 6;
    const start = cycle * 5 + 1;
    return [start, start + 1, start + 2, start + 3, start + 4];
  }

  // Pre-compiled benchmark conversions for denominators 1 to 30
  const PERCENTAGE_DATA = {
    1:  { frac: '1/1', pct: '100%', num: 100, mixed: '100%', dec: '1.00' },
    2:  { frac: '1/2', pct: '50%', num: 50, mixed: '50%', dec: '0.50' },
    3:  { frac: '1/3', pct: '33.33%', num: 33.33, mixed: '33⅓%', dec: '0.333' },
    4:  { frac: '1/4', pct: '25%', num: 25, mixed: '25%', dec: '0.25' },
    5:  { frac: '1/5', pct: '20%', num: 20, mixed: '20%', dec: '0.20' },
    6:  { frac: '1/6', pct: '16.66%', num: 16.66, mixed: '16⅔%', dec: '0.166' },
    7:  { frac: '1/7', pct: '14.28%', num: 14.28, mixed: '14²₇%', dec: '0.142' },
    8:  { frac: '1/8', pct: '12.5%', num: 12.5, mixed: '12½%', dec: '0.125' },
    9:  { frac: '1/9', pct: '11.11%', num: 11.11, mixed: '11¹₉%', dec: '0.111' },
    10: { frac: '1/10', pct: '10%', num: 10, mixed: '10%', dec: '0.10' },
    11: { frac: '1/11', pct: '9.09%', num: 9.09, mixed: '9¹₁₁%', dec: '0.090' },
    12: { frac: '1/12', pct: '8.33%', num: 8.33, mixed: '8⅓%', dec: '0.083' },
    13: { frac: '1/13', pct: '7.69%', num: 7.69, mixed: '7⁹₁₃%', dec: '0.076' },
    14: { frac: '1/14', pct: '7.14%', num: 7.14, mixed: '7¹₇%', dec: '0.071' },
    15: { frac: '1/15', pct: '6.66%', num: 6.66, mixed: '6⅔%', dec: '0.066' },
    16: { frac: '1/16', pct: '6.25%', num: 6.25, mixed: '6¼%', dec: '0.062' },
    17: { frac: '1/17', pct: '5.88%', num: 5.88, mixed: '5¹⁵₁₇%', dec: '0.058' },
    18: { frac: '1/18', pct: '5.55%', num: 5.55, mixed: '5⁵₉%', dec: '0.055' },
    19: { frac: '1/19', pct: '5.26%', num: 5.26, mixed: '5⁵₁₉%', dec: '0.052' },
    20: { frac: '1/20', pct: '5%', num: 5, mixed: '5%', dec: '0.05' },
    21: { frac: '1/21', pct: '4.76%', num: 4.76, mixed: '4¹⁶₂₁%', dec: '0.047' },
    22: { frac: '1/22', pct: '4.54%', num: 4.54, mixed: '4⁶₁₁%', dec: '0.045' },
    23: { frac: '1/23', pct: '4.34%', num: 4.34, mixed: '4⁸₂₃%', dec: '0.043' },
    24: { frac: '1/24', pct: '4.16%', num: 4.16, mixed: '4⅙%', dec: '0.041' },
    25: { frac: '1/25', pct: '4%', num: 4, mixed: '4%', dec: '0.04' },
    26: { frac: '1/26', pct: '3.84%', num: 3.84, mixed: '3¹¹₁₃%', dec: '0.038' },
    27: { frac: '1/27', pct: '3.70%', num: 3.70, mixed: '3¹₉%', dec: '0.037' },
    28: { frac: '1/28', pct: '3.57%', num: 3.57, mixed: '3⁴₇%', dec: '0.035' },
    29: { frac: '1/29', pct: '3.44%', num: 3.44, mixed: '3¹³₂₉%', dec: '0.034' },
    30: { frac: '1/30', pct: '3.33%', num: 3.33, mixed: '3⅓%', dec: '0.033' }
  };

  /**
   * Pure function: Generates today's complete sets and test questions for a given state.
   */
  function getTodaysSet(state) {
    const pointers = (state && state.pointers) || { tables: 0, squares: 0, cubes: 0, percentages: 0 };

    // 1. Tables set
    const tableNum = getTableForIndex(pointers.tables);
    const tableItems = [];
    for (let m = 1; m <= 10; m++) {
      tableItems.push({
        id: `rev_tbl_${tableNum}_${m}`,
        term: `${tableNum} × ${m}`,
        prompt: `${tableNum} × ${m} =`,
        display: `${tableNum} × ${m} = ${tableNum * m}`,
        ans: String(tableNum * m),
        ansDisplay: String(tableNum * m),
        type: 'number'
      });
    }

    // 2. Squares set
    const sqNums = getSquaresForIndex(pointers.squares);
    const squareItems = sqNums.map(n => ({
      id: `rev_sq_${n}`,
      term: `${n}²`,
      prompt: `${n}² =`,
      display: `${n}² = ${n * n}`,
      ans: String(n * n),
      ansDisplay: String(n * n),
      type: 'number'
    }));

    // 3. Cubes set
    const cbNums = getCubesForIndex(pointers.cubes);
    const cubeItems = cbNums.map(n => ({
      id: `rev_cb_${n}`,
      term: `${n}³`,
      prompt: `${n}³ =`,
      display: `${n}³ = ${n * n * n}`,
      ans: String(n * n * n),
      ansDisplay: String(n * n * n),
      type: 'number'
    }));

    // 4. Percentages set
    const pctDenoms = getPercentagesForIndex(pointers.percentages);
    const percentageItems = pctDenoms.map(d => {
      const data = PERCENTAGE_DATA[d] || { frac: `1/${d}`, pct: `${(100 / d).toFixed(2)}%`, num: +(100 / d).toFixed(2), mixed: `${(100 / d).toFixed(1)}%`, dec: (1 / d).toFixed(3) };
      const ansDisp = data.mixed && data.mixed !== data.pct ? `${data.pct} (${data.mixed})` : data.pct;
      return {
        id: `rev_pct_${d}`,
        term: data.frac,
        prompt: `${data.frac} =`,
        display: `${data.frac} = ${ansDisp}`,
        ans: data.pct,
        ansDisplay: ansDisp,
        numVal: data.num,
        type: 'percentage'
      };
    });

    return {
      tables: {
        num: tableNum,
        label: `Table ${tableNum}`,
        preview: `Table ${tableNum} (×1 to ×10)`,
        items: tableItems
      },
      squares: {
        start: sqNums[0],
        end: sqNums[sqNums.length - 1],
        label: `Squares ${sqNums[0]}²–${sqNums[sqNums.length - 1]}²`,
        preview: `Squares ${sqNums[0]}–${sqNums[sqNums.length - 1]}`,
        items: squareItems
      },
      cubes: {
        start: cbNums[0],
        end: cbNums[cbNums.length - 1],
        label: `Cubes ${cbNums[0]}³–${cbNums[cbNums.length - 1]}³`,
        preview: `Cubes ${cbNums[0]}–${cbNums[cbNums.length - 1]}`,
        items: cubeItems
      },
      percentages: {
        start: pctDenoms[0],
        end: pctDenoms[pctDenoms.length - 1],
        label: `Fractions 1/${pctDenoms[0]}–1/${pctDenoms[pctDenoms.length - 1]}`,
        preview: `1/${pctDenoms[0]}–1/${pctDenoms[pctDenoms.length - 1]}`,
        items: percentageItems
      }
    };
  }

  /**
   * Pure function: Generates tomorrow's preview string
   */
  function getTomorrowsPreview(state) {
    const p = (state && state.pointers) || { tables: 0, squares: 0, cubes: 0, percentages: 0 };
    const nextTable = getTableForIndex(p.tables + 1);
    const nextSq = getSquaresForIndex(p.squares + 1);
    const nextCb = getCubesForIndex(p.cubes + 1);
    const nextPct = getPercentagesForIndex(p.percentages + 1);
    return `Table ${nextTable} · Squares ${nextSq[0]}–${nextSq[4]} · Cubes ${nextCb[0]}–${nextCb[4]} · 1/${nextPct[0]}–1/${nextPct[4]}`;
  }

  // --------------------------------------------------------------------------
  // DATE & PERSISTENCE HELPERS
  // --------------------------------------------------------------------------

  function getLocalDate(d = new Date()) {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${day}`;
  }

  function getFormattedDate(dateStr) {
    try {
      const [y, m, d] = dateStr.split('-').map(Number);
      const date = new Date(y, m - 1, d);
      return date.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    } catch(e) {
      return dateStr;
    }
  }

  function dateDifferenceInDays(d1Str, d2Str) {
    try {
      const [y1, m1, day1] = d1Str.split('-').map(Number);
      const [y2, m2, day2] = d2Str.split('-').map(Number);
      const date1 = new Date(y1, m1 - 1, day1);
      const date2 = new Date(y2, m2 - 1, day2);
      const diffMs = date2.getTime() - date1.getTime();
      return Math.round(diffMs / (1000 * 60 * 60 * 24));
    } catch(e) {
      return 0;
    }
  }

  // Active UI Runtime State
  let activeTab = 'tables'; // 'tables' | 'squares' | 'cubes' | 'percentages'
  let activeMode = 'reading'; // 'reading' | 'practice'
  let practiceQueue = [];
  let practiceItem = null;
  let practiceFeedback = null; // { isCorrect: bool, correctAns: string, userVal: string }

  /**
   * Initializes or loads persisted Daily Revision state.
   * Handles local midnight rollover, streak reset on missed days,
   * and preserves unfinished days until completion.
   */
  function loadState() {
    const todayStr = getLocalDate();
    let state = null;

    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) state = JSON.parse(raw);
    } catch(e) {
      console.warn('Failed to parse Daily Revision state, resetting:', e);
    }

    if (!state || !state.firstLoginDate) {
      state = {
        firstLoginDate: todayStr,
        currentDay: 1,
        lastCompletedDate: null,
        streak: 0,
        bestStreak: 0,
        pointers: { tables: 0, squares: 0, cubes: 0, percentages: 0 },
        today: {
          date: todayStr,
          tables: false,
          squares: false,
          cubes: false,
          percentages: false
        },
        history: []
      };
      saveState(state);
      return state;
    }

    // Safety checks for pointers and today structure
    if (!state.pointers) state.pointers = { tables: 0, squares: 0, cubes: 0, percentages: 0 };
    if (!state.today) state.today = { date: todayStr, tables: false, squares: false, cubes: false, percentages: false };
    if (!Array.isArray(state.history)) state.history = [];
    if (typeof state.streak !== 'number') state.streak = 0;
    if (typeof state.bestStreak !== 'number') state.bestStreak = 0;

    // Check midnight rollover
    if (state.today.date !== todayStr) {
      const wasYesterdayCompleted = state.today.tables && state.today.squares && state.today.cubes && state.today.percentages;

      if (wasYesterdayCompleted) {
        // Previous day was fully completed: advance to next day!
        state.currentDay = (state.currentDay || 1) + 1;
        state.pointers.tables = (state.pointers.tables + 1) % TABLE_SEQUENCE.length;
        state.pointers.squares = (state.pointers.squares + 1) % 12;
        state.pointers.cubes = (state.pointers.cubes + 1) % 12;
        state.pointers.percentages = (state.pointers.percentages + 1) % 6;

        state.today = {
          date: todayStr,
          tables: false,
          squares: false,
          cubes: false,
          percentages: false
        };
      } else {
        // Content was NOT finished! As per requirement:
        // "No content may be skipped. If the user misses a day, they continue from where
        // they left off on their next visit. Missed calendar days do not consume content."
        // Update today's date stamp while preserving pending and completed categories!
        state.today.date = todayStr;
      }

      // Check streak integrity
      if (state.lastCompletedDate) {
        const daysDiff = dateDifferenceInDays(state.lastCompletedDate, todayStr);
        // If more than 1 day has passed without a completion, streak resets
        if (daysDiff > 1) {
          state.streak = 0;
        }
      } else {
        state.streak = 0;
      }

      saveState(state);
    }

    return state;
  }

  function saveState(state) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(state));
    } catch(e) {
      console.error('Failed to save Daily Revision state:', e);
    }
  }

  function isCategoryComplete(cat, state = loadState()) {
    return !!(state.today && state.today[cat]);
  }

  function isTodayComplete(state = loadState()) {
    return !!(state.today && state.today.tables && state.today.squares && state.today.cubes && state.today.percentages);
  }

  function getCompletedCount(state = loadState()) {
    if (!state.today) return 0;
    let count = 0;
    if (state.today.tables) count++;
    if (state.today.squares) count++;
    if (state.today.cubes) count++;
    if (state.today.percentages) count++;
    return count;
  }

  /**
   * Marks a category complete, checks day completion, updates streak & history.
   */
  function markCategoryComplete(cat) {
    const state = loadState();
    if (!state.today) return;

    state.today[cat] = true;

    // Check if all 4 categories are finished today
    const allDone = state.today.tables && state.today.squares && state.today.cubes && state.today.percentages;
    const todayStr = state.today.date;

    if (allDone && state.lastCompletedDate !== todayStr) {
      const yesterdayStr = getLocalDate(new Date(Date.now() - 86400000));
      
      if (state.lastCompletedDate === yesterdayStr) {
        state.streak = (state.streak || 0) + 1;
      } else {
        state.streak = 1;
      }
      
      state.bestStreak = Math.max(state.bestStreak || 0, state.streak);
      state.lastCompletedDate = todayStr;

      // Log in history
      state.history.unshift({
        date: todayStr,
        day: state.currentDay,
        completed: ['tables', 'squares', 'cubes', 'percentages'],
        ts: new Date().toISOString()
      });
      if (state.history.length > 60) state.history.pop();
    }

    saveState(state);
    updateGlobalUI();
  }

  // --------------------------------------------------------------------------
  // ANSWER CHECKING HELPER
  // --------------------------------------------------------------------------

  function checkUserAnswer(userRaw, item) {
    if (!userRaw || !item) return false;
    const cleanUser = String(userRaw).trim().toLowerCase().replace(/\s+/g, '');
    const cleanTarget = String(item.ans).trim().toLowerCase().replace(/\s+/g, '');

    if (item.type === 'number') {
      return cleanUser === cleanTarget;
    }

    if (item.type === 'percentage') {
      const uNum = parseFloat(cleanUser.replace('%', ''));
      const tNum = item.numVal != null ? item.numVal : parseFloat(cleanTarget.replace('%', ''));

      if (!isNaN(uNum) && !isNaN(tNum)) {
        if (Math.abs(uNum - tNum) <= 0.05) return true;
      }

      // Check fractional strings (e.g., 33 1/3, 33 1/3%, 33.33)
      if (cleanUser === cleanTarget || cleanUser === cleanTarget.replace('%', '')) return true;
      if (cleanTarget.startsWith('33') && (cleanUser.startsWith('33.3') || cleanUser.startsWith('33 1/3') || cleanUser.startsWith('33⅓'))) return true;
      if (cleanTarget.startsWith('16') && (cleanUser.startsWith('16.6') || cleanUser.startsWith('16 2/3') || cleanUser.startsWith('16⅔'))) return true;
      if (cleanTarget.startsWith('66') && (cleanUser.startsWith('66.6') || cleanUser.startsWith('66 2/3') || cleanUser.startsWith('66⅔'))) return true;
      if (cleanTarget.startsWith('14') && (cleanUser.startsWith('14.2') || cleanUser.startsWith('14 2/7') || cleanUser.startsWith('14²₇'))) return true;
      if (cleanTarget.startsWith('11') && (cleanUser.startsWith('11.1') || cleanUser.startsWith('11 1/9') || cleanUser.startsWith('11¹₉'))) return true;
      if (cleanTarget.startsWith('9') && (cleanUser.startsWith('9.09') || cleanUser.startsWith('9 1/11') || cleanUser.startsWith('9¹₁₁'))) return true;
      if (cleanTarget.startsWith('8') && (cleanUser.startsWith('8.33') || cleanUser.startsWith('8 1/3') || cleanUser.startsWith('8⅓'))) return true;
      if (cleanTarget.startsWith('6.6') && (cleanUser.startsWith('6.6') || cleanUser.startsWith('6 2/3') || cleanUser.startsWith('6⅔'))) return true;
      if (cleanTarget.startsWith('4.16') && (cleanUser.startsWith('4.16') || cleanUser.startsWith('4.17') || cleanUser.startsWith('4 1/6') || cleanUser.startsWith('4⅙'))) return true;
      if (cleanTarget.startsWith('3.33') && (cleanUser.startsWith('3.33') || cleanUser.startsWith('3 1/3') || cleanUser.startsWith('3⅓'))) return true;
    }

    return false;
  }

  // --------------------------------------------------------------------------
  // PRACTICE QUIZ CONTROLLER
  // --------------------------------------------------------------------------

  function initPracticeQuiz(cat) {
    const state = loadState();
    const todaysSet = getTodaysSet(state);
    const items = todaysSet[cat].items || [];

    // Shuffle items
    const shuffled = [...items].sort(() => Math.random() - 0.5);
    practiceQueue = shuffled.map(it => ({ ...it, attempts: 0 }));
    practiceItem = practiceQueue[0] || null;
    practiceFeedback = null;
  }

  function advancePracticeQuestion(userVal) {
    if (!practiceItem) return;

    const isCorrect = checkUserAnswer(userVal, practiceItem);

    if (isCorrect) {
      practiceFeedback = { isCorrect: true, userVal, correctAns: practiceItem.ans };
      // Remove current item from the front of queue
      practiceQueue.shift();
    } else {
      practiceFeedback = { isCorrect: false, userVal: userVal || '(Empty)', correctAns: practiceItem.ans };
      // Move current wrong item to the back of queue so it will be re-asked!
      const wrong = practiceQueue.shift();
      wrong.attempts = (wrong.attempts || 0) + 1;
      practiceQueue.push(wrong);
    }

    // Check if queue is now empty
    if (practiceQueue.length === 0) {
      practiceItem = null;
      markCategoryComplete(activeTab);
    } else {
      practiceItem = practiceQueue[0];
    }
  }

  // --------------------------------------------------------------------------
  // UI RENDERERS
  // --------------------------------------------------------------------------

  function render() {
    const app = document.getElementById('app');
    if (!app) return;

    const state = loadState();
    const todayComplete = isTodayComplete(state);
    const completedCount = getCompletedCount(state);
    const todaysSet = getTodaysSet(state);
    const tomorrowsPreview = getTomorrowsPreview(state);

    // Initialize practice queue if needed
    if (activeMode === 'practice' && !practiceItem && practiceQueue.length === 0 && !isCategoryComplete(activeTab, state)) {
      initPracticeQuiz(activeTab);
    }

    const currentCatData = todaysSet[activeTab];
    const isCurCatComplete = isCategoryComplete(activeTab, state);

    // Build Category Tab items
    const tabsList = [
      { key: 'tables', icon: '✖️', name: 'Tables', label: todaysSet.tables.label },
      { key: 'squares', icon: '²', name: 'Squares', label: todaysSet.squares.label },
      { key: 'cubes', icon: '³', name: 'Cubes', label: todaysSet.cubes.label },
      { key: 'percentages', icon: '%', name: 'Percentages', label: todaysSet.percentages.label }
    ];

    let contentHtml = '';

    if (activeMode === 'reading') {
      contentHtml = renderReadingView(activeTab, currentCatData, isCurCatComplete);
    } else {
      contentHtml = renderPracticeView(activeTab, currentCatData, isCurCatComplete);
    }

    const html = `
      <!-- Breadcrumb Navigation -->
      <nav class="crumb">
        <a href="#/">Dashboard</a> &rsaquo;
        <span><b>📅 Daily Revision</b></span>
      </nav>

      <!-- Page Header with Day Counter & Streak -->
      <div class="flex-between mb-4" style="flex-wrap:wrap; gap:16px; align-items:center;">
        <div>
          <div style="display:flex; align-items:center; gap:10px;">
            <h1 style="margin:0;">Daily Revision</h1>
            <span class="badge badge-primary" style="font-size:0.95rem; font-weight:800; padding:5px 12px;">
              Day ${state.currentDay}
            </span>
          </div>
          <p class="subtitle" style="margin:4px 0 0;">
            ${getFormattedDate(state.today.date)} &middot; Complete all 4 daily sets to build unbreakable mental calculation speed.
          </p>
        </div>

        <div style="display:flex; align-items:center; gap:14px;">
          <!-- Streak Badge -->
          <div class="revision-streak-badge" title="Daily Completion Streak">
            🔥 <b>${state.streak}</b> ${state.streak === 1 ? 'day' : 'days'} streak
          </div>

          <!-- Reading / Practice Mode Toggle -->
          <div class="drill-sub-tabs">
            <button class="drill-sub-tab ${activeMode === 'reading' ? 'active' : ''}" id="btn-rev-mode-reading">
              📖 Reading
            </button>
            <button class="drill-sub-tab ${activeMode === 'practice' ? 'active' : ''}" id="btn-rev-mode-practice">
              ✍️ Practice
            </button>
          </div>
        </div>
      </div>

      <!-- One-time Intro Callout (for first-time users) -->
      ${!localStorage.getItem(INTRO_KEY) ? `
        <div class="card mb-4 revision-intro-card" id="revision-intro-banner">
          <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:12px;">
            <div style="display:flex; gap:12px; align-items:flex-start;">
              <span style="font-size:2rem; line-height:1;">💡</span>
              <div>
                <h4 style="margin:0 0 4px; color:var(--brand-primary);">Welcome to Daily Revision!</h4>
                <p style="margin:0; font-size:0.92rem; color:var(--text-secondary);">
                  Every day, you will receive 1 table, 5 squares, 5 cubes, and 5 fraction conversions.
                  Complete them in <b>Reading</b> or <b>Practice</b> mode to keep your streak alive and sharpen your recall for Bank PO &amp; Clerk exams!
                </p>
              </div>
            </div>
            <button class="btn alt sm" id="btn-dismiss-intro" style="padding:4px 10px;">Dismiss</button>
          </div>
        </div>
      ` : ''}

      <!-- Daily Progress Bar Card -->
      <div class="card mb-4" style="padding:18px 24px;">
        <div class="flex-between mb-2">
          <div style="font-weight:700; font-size:0.95rem; color:var(--text-primary);">
            Today's Progress: <span style="color:var(--brand-primary);">${completedCount} of 4</span> categories completed
          </div>
          <div style="font-size:0.88rem; font-weight:700; color:${todayComplete ? 'var(--color-success)' : 'var(--text-muted)'};">
            ${todayComplete ? 'All Done for Today! 🎉' : `${4 - completedCount} remaining`}
          </div>
        </div>
        <div class="revision-progress-track">
          <div class="revision-progress-fill" style="width:${(completedCount / 4) * 100}%;"></div>
        </div>
      </div>

      <!-- Celebration & Tomorrow Preview (When all 4 categories done) -->
      ${todayComplete ? `
        <div class="card mb-4 revision-celebration-card">
          <div style="display:flex; align-items:center; gap:16px;">
            <div style="font-size:2.8rem;">🎉</div>
            <div style="flex:1;">
              <h3 style="margin:0 0 4px; color:var(--color-success);">Today's Revision Complete!</h3>
              <p style="margin:0; font-size:0.95rem; color:var(--text-primary);">
                Outstanding habit building! Come back tomorrow for <b>Day ${state.currentDay + 1}</b>.
              </p>
              <div class="revision-tomorrow-preview mt-2">
                <b>Coming up tomorrow:</b> ${escapeHtml(tomorrowsPreview)}
              </div>
            </div>
          </div>
        </div>
      ` : ''}

      <!-- Top Pill Tabs for 4 Categories -->
      <div class="revision-tabs-bar mb-4">
        ${tabsList.map(t => {
          const isDone = isCategoryComplete(t.key, state);
          const isActive = activeTab === t.key;
          return `
            <button class="revision-tab-btn ${isActive ? 'active' : ''} ${isDone ? 'done' : ''}" data-cat="${t.key}">
              <span class="revision-tab-icon">${t.icon}</span>
              <span class="revision-tab-title">${t.name}</span>
              <span class="revision-tab-badge">${isDone ? '✅' : '🔴'}</span>
            </button>
          `;
        }).join('')}
      </div>

      <!-- Main Category Content Box -->
      <div id="revision-category-content">
        ${contentHtml}
      </div>
    `;

    app.innerHTML = html;
    attachRevisionEvents();
    updateGlobalUI();
  }

  function renderReadingView(cat, catData, isComplete) {
    const items = catData.items || [];
    return `
      <div class="card" style="padding:24px;">
        <div class="flex-between mb-4" style="flex-wrap:wrap; gap:12px; align-items:center;">
          <div>
            <h3 style="margin:0 0 4px;">📖 Reading: ${escapeHtml(catData.label)}</h3>
            <span class="text-muted text-sm">Read and memorize today's verified values</span>
          </div>
          <div>
            ${isComplete
              ? `<span class="badge badge-success" style="font-size:0.95rem; padding:6px 14px;">✅ Completed for Today</span>`
              : `<button class="btn" id="btn-mark-revised" style="padding:8px 20px; font-weight:700;">✅ Mark as Revised</button>`}
          </div>
        </div>

        <!-- Items Display Vertical List (Centered Straight Line Layout) -->
        <div class="revision-vertical-list">
          ${items.map(it => `
            <div class="revision-vertical-row">
              <span class="rev-term">${escapeHtml(it.term || it.prompt.replace(/\s*=$/, ''))}</span>
              <span class="rev-eq">=</span>
              <span class="rev-ans">${escapeHtml(it.ansDisplay || it.ans)}</span>
            </div>
          `).join('')}
        </div>

        <!-- Bottom Action Bar -->
        <div style="margin-top:24px; padding-top:18px; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div class="text-muted text-sm">
            💡 <b>Pro Tip:</b> Switch to <b>✍️ Practice</b> mode to test your speed recall with instant feedback.
          </div>
          ${!isComplete ? `
            <button class="btn" id="btn-mark-revised-bottom" style="padding:10px 24px; font-weight:700;">
              ✅ Mark "${escapeHtml(catData.label)}" as Revised
            </button>
          ` : `
            <button class="btn alt" id="btn-switch-to-practice" style="font-weight:700;">
              ✍️ Test in Practice Quiz &rarr;
            </button>
          `}
        </div>
      </div>
    `;
  }

  function renderPracticeView(cat, catData, isComplete) {
    // If category is already marked complete, show celebration view with option to re-test
    if (isComplete && !practiceItem) {
      return `
        <div class="card text-center" style="padding:40px 24px;">
          <div style="font-size:3.2rem; margin-bottom:12px;">🏆</div>
          <h2 style="margin:0 0 8px; color:var(--color-success);">${escapeHtml(catData.label)} Completed!</h2>
          <p class="text-muted" style="max-width:500px; margin:0 auto 20px;">
            You have successfully answered every item in today's ${cat} set correctly.
          </p>
          <div style="display:flex; justify-content:center; gap:12px; flex-wrap:wrap;">
            <button class="btn alt" id="btn-retake-quiz">🔄 Practice Again</button>
            <button class="btn" id="btn-next-category">Next Category &rarr;</button>
          </div>
        </div>
      `;
    }

    if (!practiceItem) {
      initPracticeQuiz(cat);
    }

    const cur = practiceItem;
    const remainingCount = practiceQueue.length;

    return `
      <div class="card" style="padding:28px 24px;">
        <div class="flex-between mb-4">
          <div>
            <span class="badge badge-primary">Practice Quiz &middot; ${escapeHtml(catData.label)}</span>
            <span class="text-muted text-sm" style="margin-left:8px;">
              ${remainingCount} ${remainingCount === 1 ? 'item' : 'items'} remaining in queue
            </span>
          </div>
          <div>
            <button class="btn alt sm" id="btn-restart-quiz">Restart</button>
          </div>
        </div>

        <!-- Flash Question Card -->
        <div class="drill-one-card" style="margin:20px 0;">
          <div class="text-muted text-sm font-semibold" style="text-transform:uppercase; letter-spacing:0.05em;">
            Enter the exact answer
          </div>
          <div class="drill-one-question" style="margin:16px 0 24px; font-size:3.2rem; font-weight:800;">
            ${escapeHtml(cur.prompt)}
          </div>

          <div>
            <input type="text" autocomplete="off" id="rev-quiz-input"
              class="drill-one-input" placeholder="" autofocus
              inputmode="${cur.type === 'number' ? 'numeric' : 'text'}"
              style="width:200px; height:58px; font-size:2.2rem; text-align:center;">
          </div>

          <!-- Instant Feedback Message -->
          <div id="rev-feedback-container" style="min-height:36px; margin-top:16px;">
            ${practiceFeedback ? `
              <div class="${practiceFeedback.isCorrect ? 'text-success' : 'text-danger'}" style="font-weight:800; font-size:1.1rem;">
                ${practiceFeedback.isCorrect
                  ? '✓ Correct!'
                  : `✗ Wrong! Verified answer: <span class="badge badge-success" style="font-size:1rem;">${escapeHtml(practiceFeedback.correctAns)}</span> (Re-queued to practice again)`}
              </div>
            ` : `
              <div class="text-muted text-xs">
                Press <b>Enter</b> to submit &middot; Wrong answers will be re-asked at the end
              </div>
            `}
          </div>

          <div style="margin-top:20px;">
            <button class="btn" id="btn-quiz-submit" style="padding:10px 32px; font-size:1.05rem; font-weight:700;">
              Check Answer &rarr;
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // EVENT BINDINGS
  // --------------------------------------------------------------------------

  function attachRevisionEvents() {
    // Mode toggle
    const readBtn = document.getElementById('btn-rev-mode-reading');
    const pracBtn = document.getElementById('btn-rev-mode-practice');
    if (readBtn) readBtn.onclick = () => { activeMode = 'reading'; render(); };
    if (pracBtn) pracBtn.onclick = () => { activeMode = 'practice'; render(); };

    // Dismiss intro banner
    const disIntro = document.getElementById('btn-dismiss-intro');
    if (disIntro) disIntro.onclick = () => {
      localStorage.setItem(INTRO_KEY, '1');
      const b = document.getElementById('revision-intro-banner');
      if (b) b.remove();
    };

    // Category Tabs
    document.querySelectorAll('.revision-tab-btn').forEach(btn => {
      btn.onclick = () => {
        activeTab = btn.dataset.cat;
        practiceQueue = [];
        practiceItem = null;
        practiceFeedback = null;
        render();
      };
    });

    // Mark as revised
    const markBtn = document.getElementById('btn-mark-revised');
    const markBtnBtm = document.getElementById('btn-mark-revised-bottom');
    const handleMark = () => {
      markCategoryComplete(activeTab);
      render();
    };
    if (markBtn) markBtn.onclick = handleMark;
    if (markBtnBtm) markBtnBtm.onclick = handleMark;

    // Switch to practice
    const switchPrac = document.getElementById('btn-switch-to-practice');
    if (switchPrac) switchPrac.onclick = () => {
      activeMode = 'practice';
      initPracticeQuiz(activeTab);
      render();
    };

    // Practice Quiz Buttons
    const retakeBtn = document.getElementById('btn-retake-quiz');
    if (retakeBtn) retakeBtn.onclick = () => {
      initPracticeQuiz(activeTab);
      render();
    };

    const nextCatBtn = document.getElementById('btn-next-category');
    if (nextCatBtn) nextCatBtn.onclick = () => {
      const order = ['tables', 'squares', 'cubes', 'percentages'];
      const curIdx = order.indexOf(activeTab);
      activeTab = order[(curIdx + 1) % order.length];
      practiceQueue = [];
      practiceItem = null;
      render();
    };

    const restartQuizBtn = document.getElementById('btn-restart-quiz');
    if (restartQuizBtn) restartQuizBtn.onclick = () => {
      initPracticeQuiz(activeTab);
      render();
    };

    // Quiz Input & Keydown
    const inputEl = document.getElementById('rev-quiz-input');
    const submitBtn = document.getElementById('btn-quiz-submit');

    const handleQuizAnswer = () => {
      if (!inputEl) return;
      const val = inputEl.value.trim();
      advancePracticeQuestion(val);
      render();
      // Auto focus the input field for instant next question typing
      setTimeout(() => {
        const nextInput = document.getElementById('rev-quiz-input');
        if (nextInput) {
          nextInput.focus();
          nextInput.select();
        }
      }, 20);
    };

    if (submitBtn) submitBtn.onclick = handleQuizAnswer;
    if (inputEl) {
      inputEl.onkeydown = e => {
        if (e.key === 'Enter') {
          e.preventDefault();
          handleQuizAnswer();
        }
      };
      // Initial focus
      setTimeout(() => {
        inputEl.focus();
      }, 20);
    }
  }

  // --------------------------------------------------------------------------
  // GLOBAL APPLICATION INTEGRATION (Sticky Banner, Modal, Sidebar Badge, Dashboard Card)
  // --------------------------------------------------------------------------

  function updateGlobalUI() {
    updateSidebarBadge();
    updateStickyBanner();
  }

  function updateSidebarBadge() {
    const badgeEl = document.getElementById('nav-revision-badge');
    if (!badgeEl) return;

    const state = loadState();
    const complete = isTodayComplete(state);

    if (complete) {
      badgeEl.innerHTML = `<span class="badge badge-success sm" style="margin-left:6px; font-size:0.75rem;">✅</span>`;
    } else {
      const count = getCompletedCount(state);
      badgeEl.innerHTML = `<span class="badge badge-danger sm" style="margin-left:6px; font-size:0.75rem;" title="${4 - count} categories pending">🔴</span>`;
    }
  }

  function updateStickyBanner() {
    // Top banner removed per user preference
    const bannerEl = document.getElementById('revision-sticky-banner');
    if (bannerEl) bannerEl.remove();
  }

  /**
   * Shows the centered reminder modal if revision is pending and not snoozed.
   */
  function checkAndShowReminderModal() {
    const hash = location.hash.replace(/^#\/?/, '').split('/')[0];
    if (hash === 'daily-revision' || hash === 'revision' || hash === 'test') {
      return; // Don't pop up over the revision page itself or active test
    }

    const state = loadState();
    if (isTodayComplete(state)) return;

    // Check session snooze
    const snoozeUntil = +sessionStorage.getItem(SNOOZE_KEY) || 0;
    if (Date.now() < snoozeUntil) return;

    let dlg = document.getElementById('daily-revision-modal');
    if (!dlg) {
      dlg = document.createElement('dialog');
      dlg.id = 'daily-revision-modal';
      document.body.appendChild(dlg);
    }

    const todaysSet = getTodaysSet(state);
    const count = getCompletedCount(state);

    dlg.innerHTML = `
      <div style="padding:10px 6px;">
        <div style="text-align:center; margin-bottom:18px;">
          <div style="font-size:2.8rem; line-height:1; margin-bottom:8px;">📅</div>
          <h2 style="margin:0 0 4px; font-size:1.45rem;">Your Daily Revision is Pending</h2>
          <p class="text-muted text-sm" style="margin:0;">
            Build your high-speed mental math foundation for Day ${state.currentDay}.
          </p>
        </div>

        <div class="card mb-4" style="background:var(--bg-secondary); border-color:var(--border-color); padding:16px;">
          <div style="font-weight:700; font-size:0.88rem; text-transform:uppercase; color:var(--text-muted); margin-bottom:8px;">
            Today's Target Set (${count} of 4 completed):
          </div>
          <div style="display:flex; flex-direction:column; gap:6px; font-size:0.95rem;">
            <div style="display:flex; justify-content:space-between;">
              <span>✖️ <b>${escapeHtml(todaysSet.tables.label)}</b></span>
              <span>${state.today.tables ? '✅ Done' : '🔴 Pending'}</span>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span>² <b>${escapeHtml(todaysSet.squares.label)}</b></span>
              <span>${state.today.squares ? '✅ Done' : '🔴 Pending'}</span>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span>³ <b>${escapeHtml(todaysSet.cubes.label)}</b></span>
              <span>${state.today.cubes ? '✅ Done' : '🔴 Pending'}</span>
            </div>
            <div style="display:flex; justify-content:space-between;">
              <span>% <b>${escapeHtml(todaysSet.percentages.label)}</b></span>
              <span>${state.today.percentages ? '✅ Done' : '🔴 Pending'}</span>
            </div>
          </div>
        </div>

        <div style="display:flex; gap:12px; justify-content:flex-end;">
          <button class="btn alt" id="btn-modal-snooze-15">Remind me in 15 min</button>
          <button class="btn" id="btn-modal-start-rev" style="font-weight:700;">Start Now &rarr;</button>
        </div>
      </div>
    `;

    try {
      dlg.showModal();
    } catch(e) {}

    const snoozeBtn = dlg.querySelector('#btn-modal-snooze-15');
    if (snoozeBtn) {
      snoozeBtn.onclick = () => {
        sessionStorage.setItem(SNOOZE_KEY, String(Date.now() + 15 * 60 * 1000));
        try { dlg.close(); } catch(e) {}
      };
    }

    const startBtn = dlg.querySelector('#btn-modal-start-rev');
    if (startBtn) {
      startBtn.onclick = () => {
        try { dlg.close(); } catch(e) {}
        location.hash = '#/daily-revision';
      };
    }

    dlg.onclick = (e) => {
      if (e.target === dlg) {
        try { dlg.close(); } catch(err) {}
      }
    };
  }

  /**
   * Generates HTML for the Dashboard "Today's Revision" summary card.
   */
  function getDashboardCardHTML() {
    const state = loadState();
    const complete = isTodayComplete(state);
    const count = getCompletedCount(state);
    const set = getTodaysSet(state);

    return `
      <div class="card mb-4 revision-dashboard-card">
        <div class="flex-between" style="flex-wrap:wrap; gap:14px; align-items:center;">
          <div style="display:flex; align-items:center; gap:14px;">
            <div class="revision-dashboard-icon">
              📅
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:8px;">
                <h3 style="margin:0; font-size:1.15rem;">Today's Revision</h3>
                <span class="badge ${complete ? 'badge-success' : 'badge-primary'}" style="font-size:0.78rem;">
                  Day ${state.currentDay}
                </span>
                <span class="revision-streak-pill">
                  🔥 ${state.streak} ${state.streak === 1 ? 'day' : 'days'}
                </span>
              </div>
              <p class="text-muted text-sm" style="margin:4px 0 0;">
                ${complete
                  ? 'All 4 revision sets completed for today! 🎉 Great consistency.'
                  : `${count} of 4 completed &middot; Finish today's set to keep your streak alive!`}
              </p>
            </div>
          </div>

          <div style="display:flex; align-items:center; gap:12px;">
            <a href="#/daily-revision" class="btn ${complete ? 'alt' : ''}" style="font-weight:700;">
              ${complete ? 'View Today\'s Revision ✅' : count === 0 ? 'Start Revision 🚀' : `Continue Revision (${count}/4) ⚡`}
            </a>
          </div>
        </div>

        <!-- Quick 4 category pills status -->
        <div class="revision-dash-chips mt-3">
          <div class="revision-dash-chip ${state.today.tables ? 'done' : ''}">
            <span>✖️ ${escapeHtml(set.tables.label)}</span>
            <b>${state.today.tables ? '✓' : '...'}</b>
          </div>
          <div class="revision-dash-chip ${state.today.squares ? 'done' : ''}">
            <span>² ${escapeHtml(set.squares.label)}</span>
            <b>${state.today.squares ? '✓' : '...'}</b>
          </div>
          <div class="revision-dash-chip ${state.today.cubes ? 'done' : ''}">
            <span>³ ${escapeHtml(set.cubes.label)}</span>
            <b>${state.today.cubes ? '✓' : '...'}</b>
          </div>
          <div class="revision-dash-chip ${state.today.percentages ? 'done' : ''}">
            <span>% ${escapeHtml(set.percentages.label)}</span>
            <b>${state.today.percentages ? '✓' : '...'}</b>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Resets all Daily Revision progress behind confirmation
   */
  function resetProgress() {
    if (confirm('Are you sure you want to reset your Daily Revision progress, streak, and history? This cannot be undone.')) {
      localStorage.removeItem(LS_KEY);
      sessionStorage.removeItem(SNOOZE_KEY);
      loadState();
      updateGlobalUI();
      alert('Daily Revision progress has been reset.');
      location.hash = '#/';
    }
  }

  // Handle midnight rollover on window visibility change or focus
  window.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'visible') {
      loadState();
      updateGlobalUI();
    }
  });

  window.addEventListener('focus', () => {
    loadState();
    updateGlobalUI();
  });

  function escapeHtml(str) {
    if (str == null) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  // Public API
  return {
    render,
    getTableForIndex,
    getSquaresForIndex,
    getCubesForIndex,
    getPercentagesForIndex,
    getTodaysSet,
    getTomorrowsPreview,
    loadState,
    isTodayComplete,
    getCompletedCount,
    updateGlobalUI,
    checkAndShowReminderModal,
    getDashboardCardHTML,
    resetProgress
  };
})();

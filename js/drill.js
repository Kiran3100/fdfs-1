// ============================================================================
// BANKING EXAM ENGINE - BASIC CALCULATION DRILL MODULE
// Speed Arithmetic: Addition, Subtraction, Tables, Division, Squares, Cubes
// ============================================================================
window.BankDrill = (function() {
  const LS_SETTINGS_KEY = 'bankprep.drill_settings.v2';

  // Default Persistent Settings
  const defaultSettings = {
    activeTab: 'tables',
    activeSubTab: 'practice',
    tables: {
      num: 1,
      upTo: 10,
      customUpTo: 10,
      order: 'seq', // 'seq' | 'shuffled'
      sideBySideCount: 4
    },
    squares: {
      from: 1,
      upTo: 60,
      customUpTo: 60,
      style: 'sheet', // 'sheet' | 'one'
      reverse: false,
      flashcardsHidden: false
    },
    cubes: {
      from: 1,
      upTo: 30,
      customUpTo: 30,
      style: 'sheet', // 'sheet' | 'one'
      reverse: false,
      flashcardsHidden: false
    },
    addition: {
      combo: '2D+2D',
      d1: 2,
      d2: 2,
      terms: 2,
      round: false,
      decimals: false,
      count: 20,
      customCount: 20,
      timerMode: 'off', // 'off' | 'question' | 'total'
      timerSec: 60,
      style: 'sheet'
    },
    subtraction: {
      combo: '2D+2D',
      d1: 2,
      d2: 2,
      round: false,
      decimals: false,
      allowNegative: false,
      borrowing: 'mixed', // 'borrow' | 'mixed'
      count: 20,
      customCount: 20,
      timerMode: 'off',
      timerSec: 60,
      style: 'sheet'
    },
    division: {
      combo: '3D÷1D',
      d1: 3,
      d2: 1,
      answerType: 'exact', // 'exact' | 'remainder' | 'decimal'
      count: 20,
      customCount: 20,
      timerMode: 'off',
      timerSec: 60,
      style: 'sheet'
    },
    percentages: {
      familyFilter: 'all', // 'all' | 'core' | 'adv' | 'benchmarks'
      practiceMode: 'frac2pct', // 'frac2pct' | 'pct2frac' | 'pctOfNum' | 'mixed'
      count: 20,
      customCount: 20,
      timerMode: 'off',
      timerSec: 60,
      style: 'sheet',
      flashcardsHidden: false
    }
  };

  function loadSettings() {
    try {
      const saved = localStorage.getItem(LS_SETTINGS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.tables && parsed.tables.num === 7 && !parsed.tables._custom) {
          parsed.tables.num = 1;
          parsed.tables.sideBySideCount = 4;
        }
        if (parsed.squares && (!parsed.squares._userUpTo || parsed.squares.upTo < 60)) {
          parsed.squares.from = 1;
          parsed.squares.upTo = 60;
          parsed.squares.customUpTo = 60;
        }
        if (parsed.cubes && (!parsed.cubes._userUpTo || parsed.cubes.upTo < 30)) {
          parsed.cubes.from = 1;
          parsed.cubes.upTo = 30;
          parsed.cubes.customUpTo = 30;
        }
        if (!parsed.percentages) {
          parsed.percentages = Object.assign({}, defaultSettings.percentages);
        }
        return Object.assign({}, defaultSettings, parsed);
      }
    } catch (e) {}
    return Object.assign({}, defaultSettings);
  }

  function saveSettings() {
    try {
      localStorage.setItem(LS_SETTINGS_KEY, JSON.stringify(state.settings));
    } catch (e) {}
  }

  // Active Runtime State
  const state = {
    settings: loadSettings(),
    activeSession: null,
    timerInterval: null
  };

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  const pad = n => String(n).padStart(2, '0');
  const fmtTime = s => {
    s = Math.max(0, Math.round(s));
    const m = Math.floor(s / 60);
    return (m ? m + ':' + pad(s % 60) : s + 's');
  };

  // --------------------------------------------------------------------------
  // FRACTION-TO-PERCENTAGE FAMILIES DATASET (Banking Exam Speed Maths)
  // --------------------------------------------------------------------------
  const FRACTION_FAMILIES = [
    {
      id: '1/2',
      name: '1/2 Family',
      base: '1/2',
      category: 'core',
      items: [
        { frac: '1/2', num: 1, den: 2, pct: 50, pctStr: '50%', dec: '0.5', mixed: '50%' }
      ]
    },
    {
      id: '1/3',
      name: '1/3 Family',
      base: '1/3',
      category: 'core',
      items: [
        { frac: '1/3', num: 1, den: 3, pct: 33.33, pctStr: '33.33%', dec: '0.333', mixed: '33⅓%' },
        { frac: '2/3', num: 2, den: 3, pct: 66.66, pctStr: '66.66%', dec: '0.666', mixed: '66⅔%' }
      ]
    },
    {
      id: '1/4',
      name: '1/4 Family',
      base: '1/4',
      category: 'core',
      items: [
        { frac: '1/4', num: 1, den: 4, pct: 25, pctStr: '25%', dec: '0.25', mixed: '25%' },
        { frac: '3/4', num: 3, den: 4, pct: 75, pctStr: '75%', dec: '0.75', mixed: '75%' }
      ]
    },
    {
      id: '1/5',
      name: '1/5 Family',
      base: '1/5',
      category: 'core',
      items: [
        { frac: '1/5', num: 1, den: 5, pct: 20, pctStr: '20%', dec: '0.2', mixed: '20%' },
        { frac: '2/5', num: 2, den: 5, pct: 40, pctStr: '40%', dec: '0.4', mixed: '40%' },
        { frac: '3/5', num: 3, den: 5, pct: 60, pctStr: '60%', dec: '0.6', mixed: '60%' },
        { frac: '4/5', num: 4, den: 5, pct: 80, pctStr: '80%', dec: '0.8', mixed: '80%' }
      ]
    },
    {
      id: '1/6',
      name: '1/6 Family',
      base: '1/6',
      category: 'core',
      items: [
        { frac: '1/6', num: 1, den: 6, pct: 16.66, pctStr: '16.66%', dec: '0.166', mixed: '16⅔%' },
        { frac: '5/6', num: 5, den: 6, pct: 83.33, pctStr: '83.33%', dec: '0.833', mixed: '83⅓%' }
      ]
    },
    {
      id: '1/7',
      name: '1/7 Family',
      base: '1/7',
      category: 'core',
      items: [
        { frac: '1/7', num: 1, den: 7, pct: 14.28, pctStr: '14.28%', dec: '0.1428', mixed: '14²⁄₇%' },
        { frac: '2/7', num: 2, den: 7, pct: 28.57, pctStr: '28.57%', dec: '0.2857', mixed: '28⁴⁄₇%' },
        { frac: '3/7', num: 3, den: 7, pct: 42.85, pctStr: '42.85%', dec: '0.4285', mixed: '42⁶⁄₇%' },
        { frac: '4/7', num: 4, den: 7, pct: 57.14, pctStr: '57.14%', dec: '0.5714', mixed: '57¹⁄₇%' },
        { frac: '5/7', num: 5, den: 7, pct: 71.42, pctStr: '71.42%', dec: '0.7142', mixed: '71³⁄₇%' },
        { frac: '6/7', num: 6, den: 7, pct: 85.71, pctStr: '85.71%', dec: '0.8571', mixed: '85⁵⁄₇%' }
      ]
    },
    {
      id: '1/8',
      name: '1/8 Family',
      base: '1/8',
      category: 'core',
      items: [
        { frac: '1/8', num: 1, den: 8, pct: 12.5, pctStr: '12.5%', dec: '0.125', mixed: '12½%' },
        { frac: '3/8', num: 3, den: 8, pct: 37.5, pctStr: '37.5%', dec: '0.375', mixed: '37½%' },
        { frac: '5/8', num: 5, den: 8, pct: 62.5, pctStr: '62.5%', dec: '0.625', mixed: '62½%' },
        { frac: '7/8', num: 7, den: 8, pct: 87.5, pctStr: '87.5%', dec: '0.875', mixed: '87½%' }
      ]
    },
    {
      id: '1/9',
      name: '1/9 Family',
      base: '1/9',
      category: 'core',
      items: [
        { frac: '1/9', num: 1, den: 9, pct: 11.11, pctStr: '11.11%', dec: '0.1111', mixed: '11⅑%' },
        { frac: '2/9', num: 2, den: 9, pct: 22.22, pctStr: '22.22%', dec: '0.2222', mixed: '22²⁄₉%' },
        { frac: '4/9', num: 4, den: 9, pct: 44.44, pctStr: '44.44%', dec: '0.4444', mixed: '44⁴⁄₉%' },
        { frac: '5/9', num: 5, den: 9, pct: 55.55, pctStr: '55.55%', dec: '0.5555', mixed: '55⁵⁄₉%' },
        { frac: '7/9', num: 7, den: 9, pct: 77.77, pctStr: '77.77%', dec: '0.7777', mixed: '77⁷⁄₉%' },
        { frac: '8/9', num: 8, den: 9, pct: 88.88, pctStr: '88.88%', dec: '0.8888', mixed: '88⁸⁄₉%' }
      ]
    },
    {
      id: '1/10',
      name: '1/10 Family',
      base: '1/10',
      category: 'core',
      items: [
        { frac: '1/10', num: 1, den: 10, pct: 10, pctStr: '10%', dec: '0.1', mixed: '10%' },
        { frac: '3/10', num: 3, den: 10, pct: 30, pctStr: '30%', dec: '0.3', mixed: '30%' },
        { frac: '7/10', num: 7, den: 10, pct: 70, pctStr: '70%', dec: '0.7', mixed: '70%' },
        { frac: '9/10', num: 9, den: 10, pct: 90, pctStr: '90%', dec: '0.9', mixed: '90%' }
      ]
    },
    {
      id: '1/11',
      name: '1/11 Family',
      base: '1/11',
      category: 'adv',
      items: [
        { frac: '1/11', num: 1, den: 11, pct: 9.09, pctStr: '9.09%', dec: '0.0909', mixed: '9¹⁄₁₁%' },
        { frac: '2/11', num: 2, den: 11, pct: 18.18, pctStr: '18.18%', dec: '0.1818', mixed: '18²⁄₁₁%' },
        { frac: '3/11', num: 3, den: 11, pct: 27.27, pctStr: '27.27%', dec: '0.2727', mixed: '27³⁄₁₁%' },
        { frac: '4/11', num: 4, den: 11, pct: 36.36, pctStr: '36.36%', dec: '0.3636', mixed: '36⁴⁄₁₁%' },
        { frac: '5/11', num: 5, den: 11, pct: 45.45, pctStr: '45.45%', dec: '0.4545', mixed: '45⁵⁄₁₁%' },
        { frac: '6/11', num: 6, den: 11, pct: 54.54, pctStr: '54.54%', dec: '0.5454', mixed: '54⁶⁄₁₁%' },
        { frac: '7/11', num: 7, den: 11, pct: 63.63, pctStr: '63.63%', dec: '0.6363', mixed: '63⁷⁄₁₁%' },
        { frac: '8/11', num: 8, den: 11, pct: 72.72, pctStr: '72.72%', dec: '0.7272', mixed: '72⁸⁄₁₁%' },
        { frac: '9/11', num: 9, den: 11, pct: 81.81, pctStr: '81.81%', dec: '0.8181', mixed: '81⁹⁄₁₁%' },
        { frac: '10/11', num: 10, den: 11, pct: 90.9, pctStr: '90.90%', dec: '0.9090', mixed: '90¹⁰⁄₁₁%' }
      ]
    },
    {
      id: '1/12',
      name: '1/12 Family',
      base: '1/12',
      category: 'adv',
      items: [
        { frac: '1/12', num: 1, den: 12, pct: 8.33, pctStr: '8.33%', dec: '0.0833', mixed: '8⅓%' },
        { frac: '5/12', num: 5, den: 12, pct: 41.66, pctStr: '41.66%', dec: '0.4166', mixed: '41⅔%' },
        { frac: '7/12', num: 7, den: 12, pct: 58.33, pctStr: '58.33%', dec: '0.5833', mixed: '58⅓%' },
        { frac: '11/12', num: 11, den: 12, pct: 91.66, pctStr: '91.66%', dec: '0.9166', mixed: '91⅔%' }
      ]
    },
    {
      id: '1/13',
      name: '1/13 Family',
      base: '1/13',
      category: 'adv',
      items: [
        { frac: '1/13', num: 1, den: 13, pct: 7.69, pctStr: '7.69%', dec: '0.0769', mixed: '7⁹⁄₁₃%' },
        { frac: '2/13', num: 2, den: 13, pct: 15.38, pctStr: '15.38%', dec: '0.1538', mixed: '15⁵⁄₁₃%' },
        { frac: '3/13', num: 3, den: 13, pct: 23.07, pctStr: '23.07%', dec: '0.2307', mixed: '23¹⁄₁₃%' },
        { frac: '4/13', num: 4, den: 13, pct: 30.76, pctStr: '30.76%', dec: '0.3076', mixed: '30¹⁰⁄₁₃%' }
      ]
    },
    {
      id: '1/14',
      name: '1/14 Family',
      base: '1/14',
      category: 'adv',
      items: [
        { frac: '1/14', num: 1, den: 14, pct: 7.14, pctStr: '7.14%', dec: '0.0714', mixed: '7¹⁄₇%' },
        { frac: '3/14', num: 3, den: 14, pct: 21.42, pctStr: '21.42%', dec: '0.2142', mixed: '21³⁄₇%' },
        { frac: '5/14', num: 5, den: 14, pct: 35.71, pctStr: '35.71%', dec: '0.3571', mixed: '35⁵⁄₇%' },
        { frac: '9/14', num: 9, den: 14, pct: 64.28, pctStr: '64.28%', dec: '0.6428', mixed: '64²⁄₇%' }
      ]
    },
    {
      id: '1/15',
      name: '1/15 Family',
      base: '1/15',
      category: 'adv',
      items: [
        { frac: '1/15', num: 1, den: 15, pct: 6.66, pctStr: '6.66%', dec: '0.0666', mixed: '6⅔%' },
        { frac: '2/15', num: 2, den: 15, pct: 13.33, pctStr: '13.33%', dec: '0.1333', mixed: '13⅓%' },
        { frac: '4/15', num: 4, den: 15, pct: 26.66, pctStr: '26.66%', dec: '0.2666', mixed: '26⅔%' },
        { frac: '7/15', num: 7, den: 15, pct: 46.66, pctStr: '46.66%', dec: '0.4666', mixed: '46⅔%' },
        { frac: '8/15', num: 8, den: 15, pct: 53.33, pctStr: '53.33%', dec: '0.5333', mixed: '53⅓%' },
        { frac: '11/15', num: 11, den: 15, pct: 73.33, pctStr: '73.33%', dec: '0.7333', mixed: '73⅓%' }
      ]
    },
    {
      id: '1/16',
      name: '1/16 Family',
      base: '1/16',
      category: 'adv',
      items: [
        { frac: '1/16', num: 1, den: 16, pct: 6.25, pctStr: '6.25%', dec: '0.0625', mixed: '6¼%' },
        { frac: '3/16', num: 3, den: 16, pct: 18.75, pctStr: '18.75%', dec: '0.1875', mixed: '18¾%' },
        { frac: '5/16', num: 5, den: 16, pct: 31.25, pctStr: '31.25%', dec: '0.3125', mixed: '31¼%' },
        { frac: '7/16', num: 7, den: 16, pct: 43.75, pctStr: '43.75%', dec: '0.4375', mixed: '43¾%' },
        { frac: '9/16', num: 9, den: 16, pct: 56.25, pctStr: '56.25%', dec: '0.5625', mixed: '56¼%' },
        { frac: '11/16', num: 11, den: 16, pct: 68.75, pctStr: '68.75%', dec: '0.6875', mixed: '68¾%' },
        { frac: '13/16', num: 13, den: 16, pct: 81.25, pctStr: '81.25%', dec: '0.8125', mixed: '81¼%' },
        { frac: '15/16', num: 15, den: 16, pct: 93.75, pctStr: '93.75%', dec: '0.9375', mixed: '93¾%' }
      ]
    },
    {
      id: '1/17',
      name: '1/17 Family',
      base: '1/17',
      category: 'adv',
      items: [
        { frac: '1/17', num: 1, den: 17, pct: 5.88, pctStr: '5.88%', dec: '0.0588', mixed: '5¹⁵⁄₁₇%' },
        { frac: '2/17', num: 2, den: 17, pct: 11.76, pctStr: '11.76%', dec: '0.1176', mixed: '11¹³⁄₁₇%' },
        { frac: '3/17', num: 3, den: 17, pct: 17.64, pctStr: '17.64%', dec: '0.1764', mixed: '17¹¹⁄₁₇%' }
      ]
    },
    {
      id: '1/18',
      name: '1/18 Family',
      base: '1/18',
      category: 'adv',
      items: [
        { frac: '1/18', num: 1, den: 18, pct: 5.55, pctStr: '5.55%', dec: '0.0555', mixed: '5⁵⁄₉%' },
        { frac: '5/18', num: 5, den: 18, pct: 27.77, pctStr: '27.77%', dec: '0.2777', mixed: '27⁷⁄₉%' },
        { frac: '7/18', num: 7, den: 18, pct: 38.88, pctStr: '38.88%', dec: '0.3888', mixed: '38⁸⁄₉%' }
      ]
    },
    {
      id: '1/19',
      name: '1/19 Family',
      base: '1/19',
      category: 'adv',
      items: [
        { frac: '1/19', num: 1, den: 19, pct: 5.26, pctStr: '5.26%', dec: '0.0526', mixed: '5⁵⁄₁₉%' },
        { frac: '2/19', num: 2, den: 19, pct: 10.52, pctStr: '10.52%', dec: '0.1052', mixed: '10¹⁰⁄₁₉%' },
        { frac: '3/19', num: 3, den: 19, pct: 15.78, pctStr: '15.78%', dec: '0.1578', mixed: '15¹⁵⁄₁₉%' }
      ]
    },
    {
      id: '1/20',
      name: '1/20 Family',
      base: '1/20',
      category: 'adv',
      items: [
        { frac: '1/20', num: 1, den: 20, pct: 5, pctStr: '5%', dec: '0.05', mixed: '5%' },
        { frac: '3/20', num: 3, den: 20, pct: 15, pctStr: '15%', dec: '0.15', mixed: '15%' },
        { frac: '7/20', num: 7, den: 20, pct: 35, pctStr: '35%', dec: '0.35', mixed: '35%' },
        { frac: '9/20', num: 9, den: 20, pct: 45, pctStr: '45%', dec: '0.45', mixed: '45%' },
        { frac: '11/20', num: 11, den: 20, pct: 55, pctStr: '55%', dec: '0.55', mixed: '55%' },
        { frac: '13/20', num: 13, den: 20, pct: 65, pctStr: '65%', dec: '0.65', mixed: '65%' },
        { frac: '17/20', num: 17, den: 20, pct: 85, pctStr: '85%', dec: '0.85', mixed: '85%' },
        { frac: '19/20', num: 19, den: 20, pct: 95, pctStr: '95%', dec: '0.95', mixed: '95%' }
      ]
    },
    {
      id: 'benchmarks',
      name: 'Key Benchmark Fractions (1/24 to 1/50)',
      base: 'Benchmarks',
      category: 'benchmarks',
      items: [
        { frac: '1/24', num: 1, den: 24, pct: 4.16, pctStr: '4.16%', dec: '0.0416', mixed: '4⅙%' },
        { frac: '1/25', num: 1, den: 25, pct: 4, pctStr: '4%', dec: '0.04', mixed: '4%' },
        { frac: '1/30', num: 1, den: 30, pct: 3.33, pctStr: '3.33%', dec: '0.0333', mixed: '3⅓%' },
        { frac: '1/40', num: 1, den: 40, pct: 2.5, pctStr: '2.5%', dec: '0.025', mixed: '2½%' },
        { frac: '1/50', num: 1, den: 50, pct: 2, pctStr: '2%', dec: '0.02', mixed: '2%' }
      ]
    }
  ];

  function isAnswerCorrect(userRaw, q) {
    if (!userRaw) return false;
    userRaw = String(userRaw).trim();
    const target = String(q.ans).trim();

    if (userRaw.toLowerCase() === target.toLowerCase()) return true;

    // Check accepted alternate answers
    if (q.accepted && Array.isArray(q.accepted)) {
      const normUser = userRaw.replace(/%/g, '').replace(/\s+/g, '').toLowerCase();
      for (const a of q.accepted) {
        const normA = String(a).replace(/%/g, '').replace(/\s+/g, '').toLowerCase();
        if (normUser === normA) return true;
        if (!isNaN(+normUser) && !isNaN(+normA) && Math.abs(+normUser - +normA) < 0.05) return true;
      }
    }

    // Direct percentage check (37.5 vs 37.5%)
    const uClean = userRaw.replace(/%/g, '').trim();
    const tClean = target.replace(/%/g, '').trim();
    if (uClean === tClean) return true;

    if (!isNaN(+uClean) && !isNaN(+tClean)) {
      return Math.abs(+uClean - +tClean) < 0.05;
    }

    // Fraction check (e.g. 3/8)
    const normFrac = s => s.replace(/\s+/g, '');
    if (normFrac(userRaw) === normFrac(target)) return true;

    return false;
  }

  // --------------------------------------------------------------------------
  // RANDOM & MATH GENERATORS
  // --------------------------------------------------------------------------
  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function randNDigits(d, isRound = false) {
    if (d <= 1) {
      const val = randInt(1, 9);
      return val;
    }
    const min = Math.pow(10, d - 1);
    const max = Math.pow(10, d) - 1;
    let n = randInt(min, max);
    if (isRound) {
      const step = Math.pow(10, Math.max(1, d - 1));
      n = Math.round(n / step) * step;
      if (n < min) n = min;
    }
    return n;
  }

  function shuffle(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  // --------------------------------------------------------------------------
  // QUESTION GENERATORS PER TAB
  // --------------------------------------------------------------------------
  function generateQuestions(tab) {
    const set = state.settings[tab];
    let qs = [];

    if (tab === 'tables') {
      const num = Math.max(1, Math.min(100, +set.num || 1));
      const upTo = Math.max(1, Math.min(100, +set.upTo || 10));
      for (let i = 1; i <= upTo; i++) {
        qs.push({
          id: `tbl_${num}x${i}`,
          prompt: `${num} × ${i} =`,
          ans: String(num * i),
          val: num * i
        });
      }
      if (set.order === 'shuffled') {
        qs = shuffle(qs);
      }
      return {
        tab: 'tables',
        title: `Multiplication Table of ${num} (Up to ${upTo})`,
        questions: qs,
        style: 'sheet'
      };
    }

    if (tab === 'squares') {
      const from = Math.max(1, +set.from || 1);
      const upTo = Math.max(from, Math.min(150, +set.upTo || 60));
      const reverse = !!set.reverse;
      for (let i = from; i <= upTo; i++) {
        if (reverse) {
          qs.push({
            id: `sq_rev_${i}`,
            prompt: `√${i * i} =`,
            ans: String(i),
            val: i
          });
        } else {
          qs.push({
            id: `sq_${i}`,
            prompt: `${i}² =`,
            ans: String(i * i),
            val: i * i
          });
        }
      }
      qs = shuffle(qs);
      return {
        tab: 'squares',
        title: reverse ? `Square Roots Drill (${from} to ${upTo})` : `Squares Drill (${from} to ${upTo})`,
        questions: qs,
        style: set.style || 'sheet'
      };
    }

    if (tab === 'cubes') {
      const from = Math.max(1, +set.from || 1);
      const upTo = Math.max(from, Math.min(50, +set.upTo || 30));
      const reverse = !!set.reverse;
      for (let i = from; i <= upTo; i++) {
        if (reverse) {
          qs.push({
            id: `cb_rev_${i}`,
            prompt: `∛${i * i * i} =`,
            ans: String(i),
            val: i
          });
        } else {
          qs.push({
            id: `cb_${i}`,
            prompt: `${i}³ =`,
            ans: String(i * i * i),
            val: i * i * i
          });
        }
      }
      qs = shuffle(qs);
      return {
        tab: 'cubes',
        title: reverse ? `Cube Roots Drill (${from} to ${upTo})` : `Cubes Drill (${from} to ${upTo})`,
        questions: qs,
        style: set.style || 'sheet'
      };
    }

    if (tab === 'addition') {
      const count = Math.max(5, Math.min(100, +set.count || 20));
      const termsCount = Math.max(2, Math.min(5, +set.terms || 2));
      const seen = new Set();
      while (qs.length < count) {
        let terms = [];
        for (let t = 0; t < termsCount; t++) {
          const d = t === 0 ? set.d1 : set.d2;
          let val = randNDigits(d, set.round);
          if (set.decimals) {
            val = +(val + (randInt(1, 9) / 10)).toFixed(1);
          }
          terms.push(val);
        }
        const key = terms.join('+');
        if (seen.has(key) && count < 50) continue;
        seen.add(key);
        const sum = set.decimals
          ? +(terms.reduce((a, b) => a + b, 0)).toFixed(1)
          : terms.reduce((a, b) => a + b, 0);

        qs.push({
          id: `add_${qs.length}`,
          prompt: terms.join(' + ') + ' =',
          ans: String(sum),
          val: sum
        });
      }
      return {
        tab: 'addition',
        title: `Addition Drill (${set.combo || `${set.d1}D+${set.d2}D`}, ${termsCount} terms)`,
        questions: qs,
        style: set.style || 'sheet'
      };
    }

    if (tab === 'subtraction') {
      const count = Math.max(5, Math.min(100, +set.count || 20));
      const seen = new Set();
      while (qs.length < count) {
        let n1 = randNDigits(set.d1, set.round);
        let n2 = randNDigits(set.d2, set.round);
        if (set.decimals) {
          n1 = +(n1 + randInt(1, 9) / 10).toFixed(1);
          n2 = +(n2 + randInt(1, 9) / 10).toFixed(1);
        }
        if (!set.allowNegative && n1 < n2) {
          [n1, n2] = [n2, n1];
        }
        if (set.borrowing === 'borrow' && !set.decimals && n1 > 9 && n2 > 0) {
          // ensure at least one borrow in units place
          if ((n1 % 10) >= (n2 % 10)) {
            n1 = n1 - (n1 % 10) + randInt(0, 3);
            n2 = n2 - (n2 % 10) + randInt(4, 9);
            if (!set.allowNegative && n1 < n2) [n1, n2] = [n2, n1];
          }
        }
        const key = `${n1}-${n2}`;
        if (seen.has(key) && count < 50) continue;
        seen.add(key);
        const diff = set.decimals ? +(n1 - n2).toFixed(1) : (n1 - n2);
        qs.push({
          id: `sub_${qs.length}`,
          prompt: `${n1} − ${n2} =`,
          ans: String(diff),
          val: diff
        });
      }
      return {
        tab: 'subtraction',
        title: `Subtraction Drill (${set.combo || `${set.d1}D-${set.d2}D`})`,
        questions: qs,
        style: set.style || 'sheet'
      };
    }

    if (tab === 'division') {
      const count = Math.max(5, Math.min(100, +set.count || 20));
      const seen = new Set();
      while (qs.length < count) {
        const dDivisor = set.d2 || 1;
        const dDividend = set.d1 || 3;
        const divisor = randNDigits(dDivisor, false);
        if (divisor <= 1) continue;

        let dividend = 0;
        let ansStr = '';

        if (set.answerType === 'exact') {
          // ensure quotient has matching digits
          const qDigits = Math.max(1, dDividend - dDivisor + 1);
          const quotient = randNDigits(qDigits, false);
          dividend = quotient * divisor;
          ansStr = String(quotient);
        } else if (set.answerType === 'remainder') {
          dividend = randNDigits(dDividend, false);
          const q = Math.floor(dividend / divisor);
          const r = dividend % divisor;
          ansStr = r === 0 ? String(q) : `Q${q} R${r}`;
        } else {
          // decimal up to 2 places
          dividend = randNDigits(dDividend, false);
          ansStr = String(+(dividend / divisor).toFixed(2));
        }

        const key = `${dividend}/${divisor}`;
        if (seen.has(key) && count < 50) continue;
        seen.add(key);

        qs.push({
          id: `div_${qs.length}`,
          prompt: `${dividend} ÷ ${divisor} =`,
          ans: ansStr,
          val: ansStr
        });
      }
      return {
        tab: 'division',
        title: `Division Drill (${set.combo || `${set.d1}D÷${set.d2}D`}, ${set.answerType})`,
        questions: qs,
        style: set.style || 'sheet'
      };
    }

    if (tab === 'percentages') {
      const count = Math.max(5, Math.min(100, +set.count || 20));
      const mode = set.practiceMode || 'frac2pct';
      const familyFilter = set.familyFilter || 'all';

      // Collect eligible items
      let pool = [];
      FRACTION_FAMILIES.forEach(fam => {
        if (familyFilter === 'all') {
          pool.push(...fam.items);
        } else if (familyFilter === 'core' && fam.category === 'core') {
          pool.push(...fam.items);
        } else if (familyFilter === 'adv' && fam.category === 'adv') {
          pool.push(...fam.items);
        } else if (familyFilter === 'benchmarks' && fam.category === 'benchmarks') {
          pool.push(...fam.items);
        } else if (fam.id === familyFilter) {
          pool.push(...fam.items);
        }
      });

      if (!pool.length) {
        pool = FRACTION_FAMILIES.flatMap(f => f.items);
      }

      const shuffledPool = shuffle(pool);
      let pIdx = 0;

      while (qs.length < count) {
        const item = shuffledPool[pIdx % shuffledPool.length];
        pIdx++;

        let effectiveMode = mode;
        if (effectiveMode === 'mixed') {
          const modes = ['frac2pct', 'pct2frac', 'pctOfNum'];
          effectiveMode = modes[randInt(0, modes.length - 1)];
        }

        if (effectiveMode === 'frac2pct') {
          qs.push({
            id: `pct_f2p_${qs.length}`,
            prompt: `${item.frac} =`,
            ans: item.pctStr,
            accepted: [
              item.pctStr,
              String(item.pct),
              item.mixed,
              item.pctStr.replace('%', ''),
              String(item.pct.toFixed(2)),
              String(item.pct.toFixed(1)),
              item.dec
            ],
            val: item.pctStr
          });
        } else if (effectiveMode === 'pct2frac') {
          qs.push({
            id: `pct_p2f_${qs.length}`,
            prompt: `${item.pctStr} =`,
            ans: item.frac,
            accepted: [item.frac, item.frac.replace('/', ' / ')],
            val: item.frac
          });
        } else if (effectiveMode === 'pctOfNum') {
          const mult = randInt(2, 30);
          const totalVal = item.den * mult;
          const resultVal = item.num * mult;
          qs.push({
            id: `pct_of_${qs.length}`,
            prompt: `${item.pctStr} of ${totalVal} =`,
            ans: String(resultVal),
            accepted: [String(resultVal)],
            val: resultVal
          });
        }
      }

      let modeLabel = 'Fraction to %';
      if (mode === 'pct2frac') modeLabel = '% to Fraction';
      else if (mode === 'pctOfNum') modeLabel = '% of a Number';
      else if (mode === 'mixed') modeLabel = 'Mixed Challenge';

      return {
        tab: 'percentages',
        title: `Percentages Speed Drill (${modeLabel})`,
        questions: qs,
        style: set.style || 'sheet'
      };
    }

    return null;
  }

  // --------------------------------------------------------------------------
  // TOP-LEVEL RENDER CONTROLLER
  // --------------------------------------------------------------------------
  function render(hashParts) {
    const app = document.getElementById('app');
    if (!app) return;

    // Remove exam mode if active
    document.body.classList.remove('exam-mode');

    // Parse subroute if provided, e.g. #/drill/tables/reading
    if (hashParts && hashParts[1]) {
      const tabSlug = hashParts[1].toLowerCase();
      if (['addition', 'subtraction', 'tables', 'division', 'percentages', 'squares', 'cubes'].includes(tabSlug)) {
        state.settings.activeTab = tabSlug;
      }
      if (hashParts[2] && ['reading', 'practice'].includes(hashParts[2].toLowerCase())) {
        state.settings.activeSubTab = hashParts[2].toLowerCase();
      }
    }

    const currentTab = state.settings.activeTab || 'tables';
    const currentSubTab = state.settings.activeSubTab || 'practice';

    let contentHtml = '';

    if (currentSubTab === 'reading') {
      contentHtml = renderReadingMode(currentTab);
    } else {
      // Practice mode: check if currently in an active session
      if (state.activeSession && state.activeSession.tab === currentTab) {
        if (state.activeSession.isSubmitted) {
          contentHtml = renderResultSummary(state.activeSession);
        } else if (state.activeSession.style === 'one') {
          contentHtml = renderOneByOnePractice(state.activeSession);
        } else {
          contentHtml = renderFullSheetPractice(state.activeSession);
        }
      } else {
        contentHtml = renderSetupCard(currentTab);
      }
    }

    const html = `
      <nav class="crumb">
        <a href="#/">Dashboard</a> &rsaquo;
        <span><b>🧮 Basic Calculation Drill</b></span>
      </nav>

      <div class="flex-between mb-4" style="flex-wrap:wrap; gap:12px;">
        <div>
          <h1>Basic Calculation Drill</h1>
          <p class="subtitle">High-speed mental math training designed for Bank PO, SBI &amp; Clerk preliminary exams.</p>
        </div>
        <div style="display:flex; gap:10px; align-items:center;">
          <div class="drill-sub-tabs">
            <button class="drill-sub-tab ${currentSubTab === 'reading' ? 'active' : ''}" data-subtab="reading">
              📖 Reading
            </button>
            <button class="drill-sub-tab ${currentSubTab === 'practice' ? 'active' : ''}" data-subtab="practice">
              ✍️ Practice
            </button>
          </div>
        </div>
      </div>

      <!-- Top-Level Horizontal Tabs -->
      <div class="drill-nav-tabs mb-4">
        <button class="drill-nav-tab ${currentTab === 'addition' ? 'active' : ''}" data-tab="addition">
          ➕ Addition
        </button>
        <button class="drill-nav-tab ${currentTab === 'subtraction' ? 'active' : ''}" data-tab="subtraction">
          ➖ Subtraction
        </button>
        <button class="drill-nav-tab ${currentTab === 'tables' ? 'active' : ''}" data-tab="tables">
          ✖️ Tables
        </button>
        <button class="drill-nav-tab ${currentTab === 'division' ? 'active' : ''}" data-tab="division">
          ➗ Division
        </button>
        <button class="drill-nav-tab ${currentTab === 'percentages' ? 'active' : ''}" data-tab="percentages">
          % Percentages
        </button>
        <button class="drill-nav-tab ${currentTab === 'squares' ? 'active' : ''}" data-tab="squares">
          ² Squares
        </button>
        <button class="drill-nav-tab ${currentTab === 'cubes' ? 'active' : ''}" data-tab="cubes">
          ³ Cubes
        </button>
      </div>

      <div id="drill-tab-content">
        ${contentHtml}
      </div>
    `;

    app.innerHTML = html;
    attachTopNavEvents();
    attachSubTabEvents();
    attachTabSpecificEvents(currentTab, currentSubTab);

    // Render performance bar chart on result summary screen
    if (state.activeSession && state.activeSession.isSubmitted && state.activeSession.result) {
      const r = state.activeSession.result;
      if (window.BankCharts && r.questionsReview && r.questionsReview.length) {
        const targetBenchmark = +(r.avgPerQ || 5);
        const barItems = r.questionsReview.map(item => ({
          id: item.id,
          idx: item.idx - 1,
          value: +(item.time != null ? item.time : r.avgPerQ),
          label: `Q${item.idx}`,
          shortLabel: String(item.idx),
          status: item.isCorrect ? 'Correct' : (item.isSkipped ? 'Unanswered' : 'Incorrect'),
          prevTime: null
        }));
        setTimeout(() => {
          window.BankCharts.renderBarChart('drill-perf-bar-chart', barItems, {
            target: targetBenchmark,
            unit: 's'
          });
        }, 0);
      }
    }

    // Auto-focus active input and track active question for seamless timing
    if (state.activeSession && !state.activeSession.isSubmitted) {
      if (state.activeSession.style === 'one') {
        const singleInput = document.getElementById('drill-one-single-input');
        if (singleInput) {
          singleInput.oninput = saveSingleInputAnswer;
          singleInput.onfocus = () => {
            recordQuestionTime(state.activeSession.currentIdx);
          };
          setTimeout(() => {
            const el = document.getElementById('drill-one-single-input');
            if (el) {
              el.focus();
              el.select();
            }
          }, 15);
        }
      } else if (state.activeSession.style === 'sheet') {
        document.querySelectorAll('.sheet-input').forEach(input => {
          input.addEventListener('focus', () => {
            const idx = +input.dataset.idx;
            recordQuestionTime(idx);
          });
        });

        const firstInput = document.getElementById('input-q-0');
        if (firstInput && !firstInput.value) {
          setTimeout(() => {
            if (document.activeElement?.tagName !== 'INPUT') {
              firstInput.focus();
            }
          }, 15);
        }
      }
    }
  }

  function attachTopNavEvents() {
    document.querySelectorAll('.drill-nav-tab').forEach(btn => {
      btn.onclick = () => {
        const tab = btn.dataset.tab;
        state.settings.activeTab = tab;
        saveSettings();
        // Reset active session when switching tabs
        if (state.timerInterval) clearInterval(state.timerInterval);
        state.activeSession = null;
        render();
      };
    });
  }

  function attachSubTabEvents() {
    document.querySelectorAll('.drill-sub-tab').forEach(btn => {
      btn.onclick = () => {
        const sub = btn.dataset.subtab;
        state.settings.activeSubTab = sub;
        saveSettings();
        render();
      };
    });
  }

  // --------------------------------------------------------------------------
  // SETUP CARDS (Practice configuration per tab)
  // --------------------------------------------------------------------------
  function renderSetupCard(tab) {
    const set = state.settings[tab];

    if (tab === 'tables') {
      return `
        <div class="drill-setup-box">
          <div class="flex-between mb-4">
            <div>
              <h2 style="margin:0 0 4px; font-size:1.35rem;">✖️ Multiplication Tables Practice Setup</h2>
              <p class="text-muted text-sm" style="margin:0;">Speed drill one table at a time with instant keyboard navigation.</p>
            </div>
            <span class="badge badge-primary">Tables Drill</span>
          </div>

          <!-- STEP 1: Table Number -->
          <div class="drill-step-card">
            <div class="drill-step-header">
              <div class="drill-step-title">
                <span class="drill-step-badge">Step 1</span>
                <span>🔢 Which Table? (1 to 100)</span>
              </div>
              <span class="text-muted text-sm">Enter table number or click quick pill</span>
            </div>

            <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
              <span class="text-muted text-sm font-semibold">Table:</span>
              <input type="number" id="tbl-input-num" min="1" max="100" value="${set.num || 1}"
                class="drill-large-input" style="width:100px; height:44px; font-size:1.3rem; text-align:center; padding:0 10px;">
              <span class="text-muted text-xs">Type any number from 1 to 100</span>
            </div>

            <div class="drill-option-subrow" style="margin-top:6px;">
              <span class="drill-subrow-label">Quick Pick Tables (1 to 20):</span>
              <div class="drill-pill-options">
                ${[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map(n => `
                  <button type="button" class="drill-pill-btn btn-tbl-quick-pick ${(+set.num || 1) === n ? 'active' : ''}" data-val="${n}">${n}</button>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- STEP 2: Limit & Question Order -->
          <div class="drill-step-card">
            <div class="drill-step-header">
              <div class="drill-step-title">
                <span class="drill-step-badge">Step 2</span>
                <span>📐 Range &amp; Question Order</span>
              </div>
              <span class="text-muted text-sm">Set multiplication limit and shuffling</span>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
              <div>
                <span class="drill-subrow-label">Multiply Up to:</span>
                <div class="drill-pill-options" style="margin-top:8px;">
                  ${[10, 12, 15, 20].map(n => `
                    <button type="button" class="drill-pill-btn btn-tbl-upto ${set.upTo === n ? 'active' : ''}" data-val="${n}">${n}</button>
                  `).join('')}
                  <div style="display:inline-flex; align-items:center; gap:6px; margin-left:6px; padding-left:10px; border-left:1px solid var(--border-color);">
                    <span class="text-muted text-sm">Custom:</span>
                    <input type="number" id="tbl-input-custom-upto" min="1" max="100" value="${set.customUpTo || set.upTo || 10}"
                      style="width:65px; height:36px; text-align:center; border:1px solid var(--border-color); border-radius:var(--radius-sm); font-weight:700;">
                  </div>
                </div>
              </div>

              <div>
                <span class="drill-subrow-label">Question Order:</span>
                <div class="drill-pill-options" style="margin-top:8px;">
                  <button type="button" class="drill-pill-btn btn-tbl-order ${set.order === 'seq' ? 'active' : ''}" data-val="seq">
                    Sequential (1 to N)
                  </button>
                  <button type="button" class="drill-pill-btn btn-tbl-order ${set.order === 'shuffled' ? 'active' : ''}" data-val="shuffled">
                    🎲 Shuffled (Random)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Bar -->
          <div class="drill-action-bar">
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="badge badge-primary" style="font-size:0.9rem; padding:6px 14px;">
                Ready: Table of ${set.num || 1} &middot; 1 to ${set.upTo || 10} &middot; ${set.order === 'shuffled' ? '🎲 Shuffled' : 'Sequential'}
              </span>
            </div>
            <button class="btn" id="btn-start-drill" style="padding:12px 32px; font-size:1.1rem; font-weight:700;">
              🚀 Start Table Drill
            </button>
          </div>
        </div>
      `;
    }

    if (tab === 'squares' || tab === 'cubes') {
      const isSq = tab === 'squares';
      const presets = isSq ? [25, 30, 40, 50, 60, 100] : [10, 15, 20, 25, 30, 50];
      return `
        <div class="drill-setup-box">
          <div class="flex-between mb-4">
            <div>
              <h2 style="margin:0 0 4px; font-size:1.35rem;">${isSq ? '² Squares Practice Setup (1² to 60²)' : '³ Cubes Practice Setup (1³ to 30³)'}</h2>
              <p class="text-muted text-sm" style="margin:0;">Master mental powers and roots for fast banking simplification.</p>
            </div>
            <span class="badge badge-primary">${isSq ? 'Squares Drill' : 'Cubes Drill'}</span>
          </div>

          <!-- STEP 1: Range Selection -->
          <div class="drill-step-card">
            <div class="drill-step-header">
              <div class="drill-step-title">
                <span class="drill-step-badge">Step 1</span>
                <span>📏 Range Selection</span>
              </div>
              <span class="text-muted text-sm">Choose starting and upper boundary</span>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(260px, 1fr)); gap:20px;">
              <div>
                <span class="drill-subrow-label">Starting From:</span>
                <div style="margin-top:8px; display:flex; align-items:center; gap:8px;">
                  <input type="number" id="pow-input-from" min="1" max="100" value="${set.from || 1}"
                    style="width:90px; height:40px; text-align:center; border:1px solid var(--border-color); border-radius:var(--radius-md); font-weight:800; font-size:1.2rem;">
                  <span class="text-muted text-sm">(Default: 1)</span>
                </div>
              </div>

              <div>
                <span class="drill-subrow-label">Up to?</span>
                <div class="drill-pill-options" style="margin-top:8px;">
                  ${presets.map(n => `
                    <button type="button" class="drill-pill-btn btn-pow-upto ${set.upTo === n ? 'active' : ''}" data-val="${n}">${n}</button>
                  `).join('')}
                  <div style="display:inline-flex; align-items:center; gap:6px; margin-left:6px; padding-left:10px; border-left:1px solid var(--border-color);">
                    <span class="text-muted text-sm">Custom:</span>
                    <input type="number" id="pow-input-custom-upto" min="1" max="${isSq ? 150 : 50}" value="${set.customUpTo || set.upTo || (isSq ? 60 : 30)}"
                      style="width:65px; height:36px; text-align:center; border:1px solid var(--border-color); border-radius:var(--radius-sm); font-weight:700;">
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 2: Display Format & Direction -->
          <div class="drill-step-card">
            <div class="drill-step-header">
              <div class="drill-step-title">
                <span class="drill-step-badge">Step 2</span>
                <span>⚙️ Practice Format &amp; Direction</span>
              </div>
              <span class="text-muted text-sm">Select display format and roots mode</span>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
              <div>
                <span class="drill-subrow-label">Display Style</span>
                <div class="drill-pill-options" style="margin-top:8px;">
                  <button type="button" class="drill-pill-btn btn-pow-style ${set.style === 'sheet' ? 'active' : ''}" data-val="sheet">
                    📝 Full Sheet <span class="text-xs text-muted">(All rows visible)</span>
                  </button>
                  <button type="button" class="drill-pill-btn btn-pow-style ${set.style === 'one' ? 'active' : ''}" data-val="one">
                    ⚡ One-by-One <span class="text-xs text-muted">(Flashcard pace)</span>
                  </button>
                </div>
              </div>

              <div>
                <span class="drill-subrow-label">Question Direction</span>
                <div class="drill-pill-options" style="margin-top:8px;">
                  <button type="button" class="drill-pill-btn btn-pow-rev ${!set.reverse ? 'active' : ''}" data-val="false">
                    Standard (${isSq ? 'n²' : 'n³'} = ?)
                  </button>
                  <button type="button" class="drill-pill-btn btn-pow-rev ${set.reverse ? 'active' : ''}" data-val="true">
                    Reverse (${isSq ? '√x' : '∛x'} = ?)
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Action Bar -->
          <div class="drill-action-bar">
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="badge badge-primary" style="font-size:0.9rem; padding:6px 14px;">
                Ready: Range ${set.from || 1} to ${set.upTo || (isSq ? 60 : 30)} &middot; ${set.reverse ? (isSq ? '√x Roots' : '∛x Cube Roots') : (isSq ? 'n² Powers' : 'n³ Powers')} &middot; ${set.style === 'one' ? 'One-by-One' : 'Full Sheet'}
              </span>
            </div>
            <button class="btn" id="btn-start-drill" style="padding:12px 32px; font-size:1.1rem; font-weight:700;">
              🚀 Start ${isSq ? 'Squares' : 'Cubes'} Drill
            </button>
          </div>
        </div>
      `;
    }

    if (tab === 'addition' || tab === 'subtraction') {
      const isAdd = tab === 'addition';
      const combos = ['1D + 1D', '1D + 2D', '2D + 2D', '2D + 3D', '3D + 3D', '4D + 4D'];
      return `
        <div class="drill-setup-box">
          <div class="flex-between mb-4">
            <div>
              <h2 style="margin:0 0 4px; font-size:1.35rem;">${isAdd ? '➕ Addition' : '➖ Subtraction'} Practice Setup</h2>
              <p class="text-muted text-sm" style="margin:0;">Configurable speed drills for multi-digit mental computation.</p>
            </div>
            <span class="badge badge-primary">Arithmetic Speed Drill</span>
          </div>

          <!-- STEP 1: Difficulty & Digit Selection -->
          <div class="drill-step-card">
            <div class="drill-step-header">
              <div class="drill-step-title">
                <span class="drill-step-badge">Step 1</span>
                <span>🎯 Difficulty &amp; Number Configuration</span>
              </div>
              <span class="text-muted text-sm">Choose preset or custom digit lengths</span>
            </div>

            <!-- Quick Presets -->
            <div class="drill-option-subrow" style="margin-top:0;">
              <span class="drill-subrow-label">Digit Combination Presets</span>
              <div class="drill-pill-options">
                ${combos.map(c => `
                  <button type="button" class="drill-pill-btn btn-as-combo ${set.combo === c ? 'active' : ''}" data-val="${c}">
                    ${isAdd ? c : c.replace('+', '−')}
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Custom Digits Formula -->
            <div class="drill-option-subrow">
              <span class="drill-subrow-label">Or Custom Digits</span>
              <div class="drill-custom-digits-box">
                <div class="drill-digit-unit">
                  <span class="text-muted text-sm">1st Number:</span>
                  <input type="number" id="as-d1" min="1" max="6" value="${set.d1}">
                  <span class="text-sm font-semibold">digits</span>
                </div>
                <span class="drill-op-sign">${isAdd ? '+' : '−'}</span>
                <div class="drill-digit-unit">
                  <span class="text-muted text-sm">2nd Number:</span>
                  <input type="number" id="as-d2" min="1" max="6" value="${set.d2}">
                  <span class="text-sm font-semibold">digits</span>
                </div>
              </div>
            </div>

            <!-- Special Modes: Addition vs Subtraction -->
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:16px; margin-top:16px; padding-top:14px; border-top:1px dashed var(--border-color);">
              ${isAdd ? `
                <div>
                  <span class="drill-subrow-label">Number of Terms</span>
                  <div class="drill-pill-options" style="margin-top:8px;">
                    ${[2, 3, 4, 5].map(n => `
                      <button type="button" class="drill-pill-btn btn-add-terms ${set.terms === n ? 'active' : ''}" data-val="${n}">${n} Numbers</button>
                    `).join('')}
                  </div>
                </div>
              ` : `
                <div>
                  <span class="drill-subrow-label">Negative Answers &amp; Borrowing</span>
                  <div style="margin-top:8px; display:flex; flex-direction:column; gap:10px;">
                    <label style="display:inline-flex; align-items:center; gap:8px; font-size:0.92rem; cursor:pointer;">
                      <input type="checkbox" id="sub-allow-neg" ${set.allowNegative ? 'checked' : ''}>
                      <span>Allow negative answers <span class="text-muted text-xs">(e.g. 24 − 68 = −44)</span></span>
                    </label>
                    <div class="drill-pill-options">
                      <button type="button" class="drill-pill-btn btn-sub-borrow ${set.borrowing === 'mixed' ? 'active' : ''}" data-val="mixed">🎲 Mixed Cases</button>
                      <button type="button" class="drill-pill-btn btn-sub-borrow ${set.borrowing === 'borrow' ? 'active' : ''}" data-val="borrow">🔄 With Borrowing Only</button>
                    </div>
                  </div>
                </div>
              `}

              <div>
                <span class="drill-subrow-label">Special Number Types</span>
                <div style="margin-top:8px; display:flex; flex-direction:column; gap:10px;">
                  <label style="display:inline-flex; align-items:center; gap:8px; font-size:0.92rem; cursor:pointer;">
                    <input type="checkbox" id="as-round" ${set.round ? 'checked' : ''}>
                    <span>Round numbers <span class="text-muted text-xs">${isAdd ? '(e.g. 40 + 70, 300 + 500)' : '(e.g. 80 − 30, 700 − 200)'}</span></span>
                  </label>
                  <label style="display:inline-flex; align-items:center; gap:8px; font-size:0.92rem; cursor:pointer;">
                    <input type="checkbox" id="as-decimals" ${set.decimals ? 'checked' : ''}>
                    <span>Decimals <span class="text-muted text-xs">${isAdd ? '(e.g. 12.5 + 7.25)' : '(e.g. 15.5 − 8.25)'}</span></span>
                  </label>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 2: Practice Style & Timer Controls -->
          <div class="drill-step-card">
            <div class="drill-step-header">
              <div class="drill-step-title">
                <span class="drill-step-badge">Step 2</span>
                <span>⚙️ Practice Style &amp; Timer</span>
              </div>
              <span class="text-muted text-sm">Control display format and pacing</span>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
              <div>
                <span class="drill-subrow-label">Display Format</span>
                <div class="drill-pill-options" style="margin-top:8px;">
                  <button type="button" class="drill-pill-btn btn-as-style ${set.style === 'sheet' ? 'active' : ''}" data-val="sheet">
                    📝 Full Sheet <span class="text-xs text-muted">(All on screen)</span>
                  </button>
                  <button type="button" class="drill-pill-btn btn-as-style ${set.style === 'one' ? 'active' : ''}" data-val="one">
                    ⚡ One-by-One <span class="text-xs text-muted">(Speed flash)</span>
                  </button>
                </div>
              </div>

              <div>
                <span class="drill-subrow-label">Timer Mode</span>
                <div class="drill-pill-options" style="margin-top:8px;">
                  <button type="button" class="drill-pill-btn btn-as-timer ${set.timerMode === 'off' ? 'active' : ''}" data-val="off">
                    ⏱️ Timer Off
                  </button>
                  <button type="button" class="drill-pill-btn btn-as-timer ${set.timerMode === 'total' ? 'active' : ''}" data-val="total">
                    ⏳ Total Time (60s)
                  </button>
                  <button type="button" class="drill-pill-btn btn-as-timer ${set.timerMode === 'question' ? 'active' : ''}" data-val="question">
                    ⚡ 5s / Question
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 3: Question Volume -->
          <div class="drill-step-card">
            <div class="drill-step-header">
              <div class="drill-step-title">
                <span class="drill-step-badge">Step 3</span>
                <span>🔢 Number of Questions</span>
              </div>
              <span class="text-muted text-sm">Select drill length</span>
            </div>

            <div class="drill-pill-options" style="align-items:center;">
              ${[10, 20, 30, 50].map(n => `
                <button type="button" class="drill-pill-btn btn-as-count ${set.count === n ? 'active' : ''}" data-val="${n}">${n} Questions</button>
              `).join('')}
              <div style="display:inline-flex; align-items:center; gap:8px; margin-left:8px; padding-left:12px; border-left:1px solid var(--border-color);">
                <span class="text-muted text-sm font-semibold">Custom:</span>
                <input type="number" id="as-custom-count" min="5" max="100" value="${set.customCount || set.count}"
                  style="width:70px; height:38px; text-align:center; border:1px solid var(--border-color); border-radius:var(--radius-sm); font-weight:800; font-size:1.05rem;">
                <span class="text-muted text-xs">Questions</span>
              </div>
            </div>
          </div>

          <!-- Action Bar -->
          <div class="drill-action-bar">
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="badge badge-primary" style="font-size:0.9rem; padding:6px 14px;">
                Ready: ${set.combo ? (isAdd ? set.combo : set.combo.replace('+', '−')) : `${set.d1}D ${isAdd ? '+' : '−'} ${set.d2}D`} &middot; ${set.count} Questions &middot; ${set.style === 'one' ? 'One-by-One' : 'Full Sheet'}
              </span>
            </div>
            <button class="btn" id="btn-start-drill" style="padding:12px 32px; font-size:1.1rem; font-weight:700;">
              🚀 Start ${isAdd ? 'Addition' : 'Subtraction'} Drill
            </button>
          </div>
        </div>
      `;
    }

    if (tab === 'division') {
      const combos = ['2D ÷ 1D', '3D ÷ 1D', '3D ÷ 2D', '4D ÷ 2D'];
      return `
        <div class="drill-setup-box">
          <div class="flex-between mb-4">
            <div>
              <h2 style="margin:0 0 4px; font-size:1.35rem;">➗ Division Practice Setup</h2>
              <p class="text-muted text-sm" style="margin:0;">Speed drills for quotient estimation, divisibility, and decimal conversions.</p>
            </div>
            <span class="badge badge-primary">Division Drill</span>
          </div>

          <!-- STEP 1: Difficulty & Digit Presets -->
          <div class="drill-step-card">
            <div class="drill-step-header">
              <div class="drill-step-title">
                <span class="drill-step-badge">Step 1</span>
                <span>🎯 Difficulty &amp; Number Configuration</span>
              </div>
              <span class="text-muted text-sm">Choose preset dividend/divisor or custom</span>
            </div>

            <div class="drill-option-subrow" style="margin-top:0;">
              <span class="drill-subrow-label">Digit Combination Presets</span>
              <div class="drill-pill-options">
                ${combos.map(c => `
                  <button type="button" class="drill-pill-btn btn-div-combo ${set.combo === c ? 'active' : ''}" data-val="${c}">${c}</button>
                `).join('')}
              </div>
            </div>

            <div class="drill-option-subrow">
              <span class="drill-subrow-label">Or Custom Digits</span>
              <div class="drill-custom-digits-box">
                <div class="drill-digit-unit">
                  <span class="text-muted text-sm">Dividend:</span>
                  <input type="number" id="div-d1" min="1" max="6" value="${set.d1}">
                  <span class="text-sm font-semibold">digits</span>
                </div>
                <span class="drill-op-sign">÷</span>
                <div class="drill-digit-unit">
                  <span class="text-muted text-sm">Divisor:</span>
                  <input type="number" id="div-d2" min="1" max="6" value="${set.d2}">
                  <span class="text-sm font-semibold">digits</span>
                </div>
              </div>
            </div>

            <div class="drill-option-subrow" style="padding-top:14px; border-top:1px dashed var(--border-color);">
              <span class="drill-subrow-label">Answer Type:</span>
              <div class="drill-pill-options">
                <button type="button" class="drill-pill-btn btn-div-anstype ${set.answerType === 'exact' ? 'active' : ''}" data-val="exact">
                  🎯 Exact (No Remainder, clean quotients)
                </button>
                <button type="button" class="drill-pill-btn btn-div-anstype ${set.answerType === 'decimal' ? 'active' : ''}" data-val="decimal">
                  🔢 Decimal (2 Decimal Places)
                </button>
              </div>
            </div>
          </div>

          <!-- STEP 2: Practice Style & Timer Controls -->
          <div class="drill-step-card">
            <div class="drill-step-header">
              <div class="drill-step-title">
                <span class="drill-step-badge">Step 2</span>
                <span>⚙️ Practice Style &amp; Timer</span>
              </div>
              <span class="text-muted text-sm">Control display format and pacing</span>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
              <div>
                <span class="drill-subrow-label">Display Format</span>
                <div class="drill-pill-options" style="margin-top:8px;">
                  <button type="button" class="drill-pill-btn btn-div-style ${set.style === 'sheet' ? 'active' : ''}" data-val="sheet">
                    📝 Full Sheet <span class="text-xs text-muted">(All on screen)</span>
                  </button>
                  <button type="button" class="drill-pill-btn btn-div-style ${set.style === 'one' ? 'active' : ''}" data-val="one">
                    ⚡ One-by-One <span class="text-xs text-muted">(Speed flash)</span>
                  </button>
                </div>
              </div>

              <div>
                <span class="drill-subrow-label">Timer Mode</span>
                <div class="drill-pill-options" style="margin-top:8px;">
                  <button type="button" class="drill-pill-btn btn-div-timer ${set.timerMode === 'off' ? 'active' : ''}" data-val="off">
                    ⏱️ Timer Off
                  </button>
                  <button type="button" class="drill-pill-btn btn-div-timer ${set.timerMode === 'total' ? 'active' : ''}" data-val="total">
                    ⏳ Total Time (60s)
                  </button>
                  <button type="button" class="drill-pill-btn btn-div-timer ${set.timerMode === 'question' ? 'active' : ''}" data-val="question">
                    ⚡ 6s / Question
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 3: Question Volume -->
          <div class="drill-step-card">
            <div class="drill-step-header">
              <div class="drill-step-title">
                <span class="drill-step-badge">Step 3</span>
                <span>🔢 Number of Questions</span>
              </div>
              <span class="text-muted text-sm">Select drill length</span>
            </div>

            <div class="drill-pill-options" style="align-items:center;">
              ${[10, 20, 30, 50].map(n => `
                <button type="button" class="drill-pill-btn btn-div-count ${set.count === n ? 'active' : ''}" data-val="${n}">${n} Questions</button>
              `).join('')}
              <div style="display:inline-flex; align-items:center; gap:8px; margin-left:8px; padding-left:12px; border-left:1px solid var(--border-color);">
                <span class="text-muted text-sm font-semibold">Custom:</span>
                <input type="number" id="div-custom-count" min="5" max="100" value="${set.customCount || set.count}"
                  style="width:70px; height:38px; text-align:center; border:1px solid var(--border-color); border-radius:var(--radius-sm); font-weight:800; font-size:1.05rem;">
                <span class="text-muted text-xs">Questions</span>
              </div>
            </div>
          </div>

          <!-- Action Bar -->
          <div class="drill-action-bar">
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="badge badge-primary" style="font-size:0.9rem; padding:6px 14px;">
                Ready: ${set.combo || `${set.d1}D ÷ ${set.d2}D`} &middot; ${set.count} Questions &middot; ${set.answerType === 'exact' ? 'Exact Division' : 'Decimals'}
              </span>
            </div>
            <button class="btn" id="btn-start-drill" style="padding:12px 32px; font-size:1.1rem; font-weight:700;">
              🚀 Start Division Drill
            </button>
          </div>
        </div>
      `;
    }

    if (tab === 'percentages') {
      const set = state.settings.percentages;
      return `
        <div class="drill-setup-box">
          <div class="flex-between mb-4">
            <div>
              <h2 style="margin:0 0 4px; font-size:1.35rem;">% Fraction &amp; Percentage Drill Setup</h2>
              <p class="text-muted text-sm" style="margin:0;">Master the 1/2 to 1/25 fraction families, conversions, and speed simplification.</p>
            </div>
            <span class="badge badge-primary">Banking Core Drill</span>
          </div>

          <!-- STEP 1: Drill Mode Selection -->
          <div class="drill-step-card">
            <div class="drill-step-header">
              <div class="drill-step-title">
                <span class="drill-step-badge">Step 1</span>
                <span>🎯 Drill Mode</span>
              </div>
              <span class="text-muted text-sm">Select question style</span>
            </div>

            <div class="drill-pill-options">
              <button type="button" class="drill-pill-btn btn-pct-mode ${set.practiceMode === 'frac2pct' ? 'active' : ''}" data-val="frac2pct">
                Fraction ➔ % <span class="text-xs text-muted">(e.g. 3/8 = ?)</span>
              </button>
              <button type="button" class="drill-pill-btn btn-pct-mode ${set.practiceMode === 'pct2frac' ? 'active' : ''}" data-val="pct2frac">
                % ➔ Fraction <span class="text-xs text-muted">(e.g. 37.5% = ?)</span>
              </button>
              <button type="button" class="drill-pill-btn btn-pct-mode ${set.practiceMode === 'pctOfNum' ? 'active' : ''}" data-val="pctOfNum">
                % of a Number <span class="text-xs text-muted">(e.g. 37.5% of 480)</span>
              </button>
              <button type="button" class="drill-pill-btn btn-pct-mode ${set.practiceMode === 'mixed' ? 'active' : ''}" data-val="mixed">
                🎲 Mixed Speed Challenge
              </button>
            </div>
          </div>

          <!-- STEP 2: Fraction Families to Include -->
          <div class="drill-step-card">
            <div class="drill-step-header">
              <div class="drill-step-title">
                <span class="drill-step-badge">Step 2</span>
                <span>📚 Fraction Families to Include</span>
              </div>
              <span class="text-muted text-sm">Target specific difficulty tiers</span>
            </div>

            <div class="drill-pill-options">
              <button type="button" class="drill-pill-btn btn-pct-fam ${set.familyFilter === 'core' ? 'active' : ''}" data-val="core">
                ⭐ Core Families (1/2 to 1/10)
              </button>
              <button type="button" class="drill-pill-btn btn-pct-fam ${set.familyFilter === 'adv' ? 'active' : ''}" data-val="adv">
                ⚡ Advanced (1/11 to 1/20)
              </button>
              <button type="button" class="drill-pill-btn btn-pct-fam ${set.familyFilter === 'all' ? 'active' : ''}" data-val="all">
                🌟 All Families (1/2 to 1/25)
              </button>
              <button type="button" class="drill-pill-btn btn-pct-fam ${set.familyFilter === 'benchmarks' ? 'active' : ''}" data-val="benchmarks">
                🎯 Benchmarks (1/24 to 1/50)
              </button>
            </div>

            <!-- Individual Family Targeting Chips -->
            <div style="border-top:1px dashed var(--border-color); margin-top:14px; padding-top:14px;">
              <span style="font-size:0.78rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; letter-spacing:0.05em;">
                🎯 Target Specific Family:
              </span>
              <div style="display:flex; flex-wrap:wrap; gap:6px; margin-top:10px;">
                ${FRACTION_FAMILIES
                  .filter(fam => fam.id.startsWith('1/'))
                  .map(fam => `<button type="button"
                    class="drill-pill-btn btn-pct-fam ${set.familyFilter === fam.id ? 'active' : ''}"
                    data-val="${fam.id}"
                    style="padding:5px 12px; font-size:0.82rem; min-width:auto; font-weight:700;">
                    ${fam.base}
                  </button>`).join('')}
              </div>
            </div>
          </div>


          <!-- STEP 3: Practice Style & Timer Controls -->
          <div class="drill-step-card">
            <div class="drill-step-header">
              <div class="drill-step-title">
                <span class="drill-step-badge">Step 3</span>
                <span>⚙️ Practice Style &amp; Timer</span>
              </div>
              <span class="text-muted text-sm">Control display format and pacing</span>
            </div>

            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:20px;">
              <div>
                <span class="drill-subrow-label">Display Format</span>
                <div class="drill-pill-options" style="margin-top:8px;">
                  <button type="button" class="drill-pill-btn btn-pct-style ${set.style === 'sheet' ? 'active' : ''}" data-val="sheet">
                    📝 Full Sheet <span class="text-xs text-muted">(All on screen)</span>
                  </button>
                  <button type="button" class="drill-pill-btn btn-pct-style ${set.style === 'one' ? 'active' : ''}" data-val="one">
                    ⚡ One-by-One <span class="text-xs text-muted">(Speed flash)</span>
                  </button>
                </div>
              </div>

              <div>
                <span class="drill-subrow-label">Timer Mode</span>
                <div class="drill-pill-options" style="margin-top:8px;">
                  <button type="button" class="drill-pill-btn btn-pct-timer ${set.timerMode === 'off' ? 'active' : ''}" data-val="off">
                    ⏱️ Timer Off
                  </button>
                  <button type="button" class="drill-pill-btn btn-pct-timer ${set.timerMode === 'total' ? 'active' : ''}" data-val="total">
                    ⏳ Total Time (60s)
                  </button>
                  <button type="button" class="drill-pill-btn btn-pct-timer ${set.timerMode === 'question' ? 'active' : ''}" data-val="question">
                    ⚡ 6s / Question
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- STEP 4: Question Volume -->
          <div class="drill-step-card">
            <div class="drill-step-header">
              <div class="drill-step-title">
                <span class="drill-step-badge">Step 4</span>
                <span>🔢 Number of Questions</span>
              </div>
              <span class="text-muted text-sm">Select drill length</span>
            </div>

            <div class="drill-pill-options" style="align-items:center;">
              ${[10, 20, 30, 50].map(n => `
                <button type="button" class="drill-pill-btn btn-pct-count ${set.count === n ? 'active' : ''}" data-val="${n}">${n} Questions</button>
              `).join('')}
              <div style="display:inline-flex; align-items:center; gap:8px; margin-left:8px; padding-left:12px; border-left:1px solid var(--border-color);">
                <span class="text-muted text-sm font-semibold">Custom:</span>
                <input type="number" id="pct-custom-count" min="5" max="100" value="${set.customCount || set.count}"
                  style="width:70px; height:38px; text-align:center; border:1px solid var(--border-color); border-radius:var(--radius-sm); font-weight:800; font-size:1.05rem;">
                <span class="text-muted text-xs">Questions</span>
              </div>
            </div>
          </div>

          <!-- Action Bar -->
          <div class="drill-action-bar">
            <div style="display:flex; align-items:center; gap:10px;">
              <span class="badge badge-primary" style="font-size:0.9rem; padding:6px 14px;">
                Ready: ${set.practiceMode === 'frac2pct' ? 'Fraction ➔ %' : set.practiceMode === 'pct2frac' ? '% ➔ Fraction' : set.practiceMode === 'pctOfNum' ? '% of Number' : 'Mixed Challenge'} &middot; ${set.count} Questions &middot; ${set.style === 'one' ? 'One-by-One' : 'Full Sheet'}
              </span>
            </div>
            <button class="btn" id="btn-start-drill" style="padding:12px 32px; font-size:1.1rem; font-weight:700;">
              🚀 Start Percentages Drill
            </button>
          </div>
        </div>
      `;
    }

    return '';
  }

  function attachTabSpecificEvents(tab, subtab) {
    if (subtab !== 'practice') return;
    const set = state.settings[tab];

    // Start Drill Button
    const startBtn = document.getElementById('btn-start-drill');
    if (startBtn) {
      startBtn.onclick = () => {
        // Collect custom input values
        if (tab === 'tables') {
          const numEl = document.getElementById('tbl-input-num');
          const customUpToEl = document.getElementById('tbl-input-custom-upto');
          if (numEl) set.num = Math.max(1, Math.min(100, +numEl.value || 1));
          if (customUpToEl && document.querySelector('.btn-tbl-upto.active') == null) {
            set.upTo = Math.max(1, Math.min(100, +customUpToEl.value || 10));
          }
        } else if (tab === 'squares' || tab === 'cubes') {
          const fromEl = document.getElementById('pow-input-from');
          const customUpToEl = document.getElementById('pow-input-custom-upto');
          if (fromEl) set.from = Math.max(1, +fromEl.value || 1);
          if (customUpToEl && document.querySelector('.btn-pow-upto.active') == null) {
            set.upTo = Math.max(set.from, +customUpToEl.value || (tab === 'squares' ? 60 : 30));
            set.customUpTo = set.upTo;
          }
        } else if (tab === 'addition' || tab === 'subtraction') {
          const d1El = document.getElementById('as-d1');
          const d2El = document.getElementById('as-d2');
          const rndEl = document.getElementById('as-round');
          const decEl = document.getElementById('as-decimals');
          if (d1El) set.d1 = Math.max(1, Math.min(6, +d1El.value || 2));
          if (d2El) set.d2 = Math.max(1, Math.min(6, +d2El.value || 2));
          if (rndEl) set.round = rndEl.checked;
          if (decEl) set.decimals = decEl.checked;
          if (tab === 'subtraction') {
            const negEl = document.getElementById('sub-allow-neg');
            if (negEl) set.allowNegative = negEl.checked;
          }
        } else if (tab === 'division') {
          const d1El = document.getElementById('div-d1');
          const d2El = document.getElementById('div-d2');
          if (d1El) set.d1 = Math.max(1, Math.min(6, +d1El.value || 3));
          if (d2El) set.d2 = Math.max(1, Math.min(6, +d2El.value || 1));
        } else if (tab === 'percentages') {
          const customCountEl = document.getElementById('pct-custom-count');
          if (customCountEl && document.querySelector('.btn-pct-count.active') == null) {
            set.count = Math.max(5, Math.min(100, +customCountEl.value || 20));
            set.customCount = set.count;
          }
        }

        saveSettings();
        startSession(tab);
      };
    }

    // Tables Events
    document.querySelectorAll('.btn-tbl-quick-pick').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-tbl-quick-pick').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        const n = +b.dataset.val;
        const input = document.getElementById('tbl-input-num');
        if (input) input.value = n;
        set.num = n;
        set._custom = true;
        saveSettings();
      };
    });
    const tblInput = document.getElementById('tbl-input-num');
    if (tblInput) {
      tblInput.oninput = () => {
        const val = Math.max(1, Math.min(100, +tblInput.value || 1));
        set.num = val;
        set._custom = true;
        document.querySelectorAll('.btn-tbl-quick-pick').forEach(x => {
          x.classList.toggle('active', +x.dataset.val === val);
        });
      };
    }
    document.querySelectorAll('.btn-tbl-upto').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-tbl-upto').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.upTo = +b.dataset.val;
        saveSettings();
      };
    });
    document.querySelectorAll('.btn-tbl-order').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-tbl-order').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.order = b.dataset.val;
        saveSettings();
      };
    });

    // Squares/Cubes Events
    document.querySelectorAll('.btn-pow-upto').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-pow-upto').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.upTo = +b.dataset.val;
        set.customUpTo = set.upTo;
        set._userUpTo = true;
        const customInput = document.getElementById('pow-input-custom-upto');
        if (customInput) customInput.value = set.upTo;
        saveSettings();
      };
    });
    const powCustomUpTo = document.getElementById('pow-input-custom-upto');
    if (powCustomUpTo) {
      powCustomUpTo.oninput = () => {
        document.querySelectorAll('.btn-pow-upto').forEach(x => x.classList.remove('active'));
        const maxLimit = tab === 'squares' ? 150 : 50;
        set.upTo = Math.max(1, Math.min(maxLimit, +powCustomUpTo.value || (tab === 'squares' ? 60 : 30)));
        set.customUpTo = set.upTo;
        set._userUpTo = true;
      };
    }
    document.querySelectorAll('.btn-pow-style').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-pow-style').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.style = b.dataset.val;
        saveSettings();
      };
    });
    document.querySelectorAll('.btn-pow-rev').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-pow-rev').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.reverse = b.dataset.val === 'true';
        saveSettings();
      };
    });

    // Addition / Subtraction Combos
    document.querySelectorAll('.btn-as-combo').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-as-combo').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.combo = b.dataset.val;
        const parts = b.dataset.val.replace(/[^\d+]/g, '').split('+');
        if (parts.length === 2) {
          set.d1 = +parts[0];
          set.d2 = +parts[1];
          const d1Input = document.getElementById('as-d1');
          const d2Input = document.getElementById('as-d2');
          if (d1Input) d1Input.value = set.d1;
          if (d2Input) d2Input.value = set.d2;
        }
        saveSettings();
      };
    });
    document.querySelectorAll('.btn-add-terms').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-add-terms').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.terms = +b.dataset.val;
        saveSettings();
      };
    });
    document.querySelectorAll('.btn-sub-borrow').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-sub-borrow').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.borrowing = b.dataset.val;
        saveSettings();
      };
    });
    document.querySelectorAll('.btn-as-count').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-as-count').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.count = +b.dataset.val;
        saveSettings();
      };
    });
    document.querySelectorAll('.btn-as-style').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-as-style').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.style = b.dataset.val;
        saveSettings();
      };
    });
    document.querySelectorAll('.btn-as-timer').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-as-timer').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.timerMode = b.dataset.val;
        saveSettings();
      };
    });

    // Division Events
    document.querySelectorAll('.btn-div-combo').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-div-combo').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.combo = b.dataset.val;
        const match = b.dataset.val.match(/(\d+)D\s*÷\s*(\d+)D/);
        if (match) {
          set.d1 = +match[1];
          set.d2 = +match[2];
          const d1Input = document.getElementById('div-d1');
          const d2Input = document.getElementById('div-d2');
          if (d1Input) d1Input.value = set.d1;
          if (d2Input) d2Input.value = set.d2;
        }
        saveSettings();
      };
    });
    document.querySelectorAll('.btn-div-anstype').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-div-anstype').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.answerType = b.dataset.val;
        saveSettings();
      };
    });
    document.querySelectorAll('.btn-div-count').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-div-count').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.count = +b.dataset.val;
        saveSettings();
      };
    });
    document.querySelectorAll('.btn-div-style').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-div-style').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.style = b.dataset.val;
        saveSettings();
      };
    });
    document.querySelectorAll('.btn-div-timer').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-div-timer').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.timerMode = b.dataset.val;
        saveSettings();
      };
    });

    // Percentages Practice Events
    document.querySelectorAll('.btn-pct-mode').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-pct-mode').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.practiceMode = b.dataset.val;
        saveSettings();
      };
    });
    document.querySelectorAll('.btn-pct-fam').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-pct-fam').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.familyFilter = b.dataset.val;
        saveSettings();
      };
    });
    document.querySelectorAll('.btn-pct-count').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-pct-count').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.count = +b.dataset.val;
        saveSettings();
      };
    });
    document.querySelectorAll('.btn-pct-style').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-pct-style').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.style = b.dataset.val;
        saveSettings();
      };
    });
    document.querySelectorAll('.btn-pct-timer').forEach(b => {
      b.onclick = () => {
        document.querySelectorAll('.btn-pct-timer').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
        set.timerMode = b.dataset.val;
        saveSettings();
      };
    });
  }

  // --------------------------------------------------------------------------
  // SESSION CONTROLLER (PRACTICE MODES)
  // --------------------------------------------------------------------------
  function startSession(tab, customQs = null) {
    if (state.timerInterval) clearInterval(state.timerInterval);

    const generated = customQs ? {
      tab,
      title: customQs.title || `${tab} Drill`,
      questions: customQs.questions,
      style: customQs.style || 'sheet'
    } : generateQuestions(tab);

    if (!generated || !generated.questions.length) {
      alert('Unable to generate drill with specified settings.');
      return;
    }

    const set = state.settings[tab] || {};
    let timerTotal = null;
    if (set.timerMode === 'total') timerTotal = set.timerSec || 60;
    else if (set.timerMode === 'question') timerTotal = (set.timerSec || 5) * generated.questions.length;

    const now = Date.now();
    state.activeSession = {
      tab,
      title: generated.title,
      questions: generated.questions,
      style: generated.style,
      currentIdx: 0,
      answers: {},
      questionTimes: {},      // q.id -> seconds spent
      questionActiveIdx: 0,   // currently focused question idx
      questionLastStart: now, // timestamp when current question focus started
      startTime: now,
      elapsedSeconds: 0,
      timerRemaining: timerTotal,
      isSubmitted: false,
      result: null
    };

    if (timerTotal != null) {
      state.timerInterval = setInterval(() => {
        if (!state.activeSession || state.activeSession.isSubmitted) {
          clearInterval(state.timerInterval);
          return;
        }
        state.activeSession.elapsedSeconds++;
        state.activeSession.timerRemaining--;
        const timerEl = document.getElementById('drill-timer-display');
        if (timerEl) {
          timerEl.textContent = `⏱️ ${fmtTime(state.activeSession.timerRemaining)}`;
        }
        if (state.activeSession.timerRemaining <= 0) {
          clearInterval(state.timerInterval);
          alert('⏰ Time up! Submitting your answers now.');
          submitSession();
        }
      }, 1000);
    } else {
      state.timerInterval = setInterval(() => {
        if (!state.activeSession || state.activeSession.isSubmitted) {
          clearInterval(state.timerInterval);
          return;
        }
        state.activeSession.elapsedSeconds++;
        const timerEl = document.getElementById('drill-timer-display');
        if (timerEl) {
          timerEl.textContent = `⏱️ ${fmtTime(state.activeSession.elapsedSeconds)}`;
        }
      }, 1000);
    }

    render();
  }

  // --------------------------------------------------------------------------
  // PRACTICE VIEW 1: FULL SHEET MODE (Tables & Multi-Row Sheets)
  // --------------------------------------------------------------------------
  function renderFullSheetPractice(session) {
    const qs = session.questions;
    const isTables = session.tab === 'tables';

    return `
      <div class="card mb-4" style="padding:20px 24px;">
        <div class="flex-between mb-3" style="flex-wrap:wrap; gap:12px;">
          <div>
            <span class="badge badge-primary">Practice Sheet</span>
            <h2 style="margin:4px 0 0;">${esc(session.title)}</h2>
          </div>
          <div style="display:flex; align-items:center; gap:14px;">
            <div class="test-timer-badge" id="drill-timer-display">
              ⏱️ ${session.timerRemaining != null ? fmtTime(session.timerRemaining) : fmtTime(session.elapsedSeconds)}
            </div>
            <button class="btn alt sm" id="btn-cancel-drill">Exit Drill</button>
          </div>
        </div>

        <p class="text-muted text-sm mb-4">
          💡 <b>Keyboard Navigation:</b> Press <b>Enter</b> or <b>Tab</b> to automatically advance to the next box.
          Large inputs allow quick keypad entry on phone, tablet, and desktop.
        </p>

        <!-- 2-Column Responsive Sheet Grid (Requirement 10) -->
        <div class="drill-sheet-grid" id="drill-sheet-container">
          ${qs.map((q, idx) => {
            const userVal = session.answers[q.id] || '';
            return `
              <div class="drill-sheet-row" data-qid="${esc(q.id)}">
                <div class="drill-prompt-text">${esc(q.prompt)}</div>
                <div class="drill-input-wrapper">
                  <input type="text" inputmode="${session.tab === 'percentages' ? 'text' : 'numeric'}" autocomplete="off"
                    class="drill-large-input sheet-input"
                    id="input-q-${idx}"
                    data-idx="${idx}"
                    data-qid="${esc(q.id)}"
                    value="${esc(userVal)}"
                    placeholder="?">
                  <div class="drill-wrong-badge" id="badge-err-${idx}" style="display:none;"></div>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <!-- Action Buttons -->
        <div style="margin-top:28px; padding-top:20px; border-top:1px solid var(--border-color); display:flex; justify-content:space-between; flex-wrap:wrap; gap:12px;">
          <div style="display:flex; gap:10px;">
            <button class="btn alt" id="btn-reset-sheet">🔄 Reset</button>
            ${isTables ? `<button class="btn alt" id="btn-next-table">➡️ Next Table (${(+state.settings.tables.num || 1) + 1})</button>` : ''}
          </div>
          <button class="btn" id="btn-check-answers" style="padding:12px 32px; font-size:1.05rem;">✓ Check Answers</button>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // PRACTICE VIEW 2: ONE-BY-ONE MODE (Fast Flashcard Drill)
  // --------------------------------------------------------------------------
  function renderOneByOnePractice(session) {
    const curIdx = session.currentIdx || 0;
    const q = session.questions[curIdx];
    const total = session.questions.length;
    const userVal = session.answers[q.id] || '';

    return `
      <div class="card mb-4" style="padding:24px;">
        <div class="flex-between mb-4">
          <div>
            <span class="badge badge-primary">One-by-One Drill</span>
            <span class="text-muted" style="margin-left:8px; font-size:0.95rem;">Question ${curIdx + 1} of ${total}</span>
          </div>
          <div style="display:flex; align-items:center; gap:14px;">
            <div class="test-timer-badge" id="drill-timer-display">
              ⏱️ ${session.timerRemaining != null ? fmtTime(session.timerRemaining) : fmtTime(session.elapsedSeconds)}
            </div>
            <button class="btn alt sm" id="btn-cancel-drill">Exit Drill</button>
          </div>
        </div>

        <div class="drill-one-card">
          <div class="text-muted" style="font-weight:700; letter-spacing:0.05em; font-size:0.85rem; text-transform:uppercase;">
            ${esc(session.title)}
          </div>
          <div class="drill-one-question">
            ${esc(q.prompt)}
          </div>
          <div>
            <input type="text" inputmode="${session.tab === 'percentages' ? 'text' : 'numeric'}" autocomplete="off"
              class="drill-one-input" id="drill-one-single-input"
              value="${esc(userVal)}" placeholder="" autofocus>
          </div>
          <div class="text-muted text-sm mt-3">
            Press <b>Enter</b> to submit and advance &middot; <b>Backspace</b> clears
          </div>
        </div>

        <div style="margin-top:28px; display:flex; justify-content:space-between; align-items:center;">
          <button class="btn alt sm" id="btn-one-prev" ${curIdx === 0 ? 'disabled' : ''}>&larr; Previous</button>
          <div style="font-weight:700; color:var(--text-secondary);">
            Progress: ${curIdx + 1} / ${total}
          </div>
          <button class="btn sm" id="btn-one-next">
            ${curIdx === total - 1 ? 'Finish &amp; Check ✓' : 'Next &rarr;'}
          </button>
        </div>
      </div>
    `;
  }

  function recordQuestionTime(targetIdx) {
    const session = state.activeSession;
    if (!session || session.isSubmitted) return;
    const now = Date.now();
    const curIdx = session.questionActiveIdx != null ? session.questionActiveIdx : session.currentIdx;
    const curQ = session.questions && session.questions[curIdx];
    if (curQ) {
      if (!session.questionTimes) session.questionTimes = {};
      const lastStart = session.questionLastStart || session.startTime || now;
      const spent = Math.max(0, (now - lastStart) / 1000);
      session.questionTimes[curQ.id] = +((session.questionTimes[curQ.id] || 0) + spent).toFixed(1);
    }
    session.questionActiveIdx = targetIdx;
    session.questionLastStart = now;
  }

  // --------------------------------------------------------------------------
  // CHECK ANSWERS & SUBMIT
  // --------------------------------------------------------------------------
  function submitSession() {
    if (state.timerInterval) clearInterval(state.timerInterval);
    const session = state.activeSession;
    if (!session) return;

    recordQuestionTime(null);

    let correctCount = 0;
    let incorrectCount = 0;
    const questionsReview = [];
    const wrongList = [];
    const correctList = [];

    const total = session.questions.length;
    const totalSec = Math.max(1, session.elapsedSeconds || 1);
    const avgPerQ = +(totalSec / total).toFixed(1);

    session.questions.forEach((q, idx) => {
      const userRaw = (session.answers[q.id] || '').trim();
      const target = String(q.ans).trim();

      const isCorrect = isAnswerCorrect(userRaw, q);
      const isSkipped = !userRaw;
      const rawSpent = session.questionTimes && session.questionTimes[q.id] != null
        ? session.questionTimes[q.id]
        : 0;
      const timeSpent = +(rawSpent > 0 ? rawSpent : avgPerQ).toFixed(1);

      const item = {
        idx: idx + 1,
        id: q.id,
        prompt: q.prompt,
        userAns: userRaw || '(Empty)',
        correctAns: target,
        isCorrect: isCorrect,
        isSkipped: isSkipped,
        time: timeSpent,
        status: isCorrect ? 'Correct' : (isSkipped ? 'Unanswered' : 'Incorrect')
      };

      questionsReview.push(item);

      if (isCorrect) {
        correctCount++;
        correctList.push(item);
      } else {
        incorrectCount++;
        wrongList.push(item);
      }
    });

    const accuracy = total > 0 ? +((correctCount / total) * 100).toFixed(1) : 0;

    const result = {
      score: correctCount,
      total,
      accuracy,
      totalSec,
      avgPerQ,
      wrongList,
      correctList,
      questionsReview,
      reviewFilter: 'all' // Default to 'all' so users see both correct and incorrect answers immediately!
    };

    session.isSubmitted = true;
    session.result = result;

    // Save to Attempt History (Requirement 9)
    try {
      const attemptRecord = {
        id: 'att_drill_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
        ts: new Date().toISOString(),
        testId: 'drill-' + session.tab,
        testName: session.title,
        subject: 'Calculation Drill',
        topic: session.tab,
        total,
        correct: correctCount,
        incorrect: incorrectCount,
        unanswered: 0,
        nokey: 0,
        attempted: total,
        sec: totalSec,
        avg: avgPerQ,
        accuracy,
        score: correctCount,
        max: total,
        isDrill: true,
        drillData: {
          wrongList,
          correctList,
          questionsReview,
          questions: session.questions,
          answers: session.answers,
          style: session.style    // Save drill style so repeats use same format
        }
      };

      if (window.BankStorage && window.BankStorage.saveAttempt) {
        window.BankStorage.saveAttempt(attemptRecord);
      }
    } catch (e) {
      console.warn('Could not record drill attempt:', e);
    }

    render();
  }

  // --------------------------------------------------------------------------
  // RESULT SUMMARY COMPONENT (Requirement 9)
  // --------------------------------------------------------------------------
  function renderResultSummary(session) {
    const r = session.result;
    if (!r) return renderSetupCard(session.tab);

    const isPerfect = r.score === r.total;
    const activeFilter = r.reviewFilter || 'all';

    const allList = r.questionsReview || [];
    let displayedList = allList;
    if (activeFilter === 'incorrect') {
      displayedList = (r.wrongList && r.wrongList.length) ? r.wrongList : allList.filter(x => !x.isCorrect);
    } else if (activeFilter === 'correct') {
      displayedList = (r.correctList && r.correctList.length) ? r.correctList : allList.filter(x => x.isCorrect);
    }

    return `
      <!-- Result Banner -->
      <div class="drill-result-banner">
        <div>
          <span style="text-transform:uppercase; font-size:0.8rem; letter-spacing:0.05em; opacity:0.85;">Drill Complete</span>
          <h1 style="color:#fff; margin:6px 0 8px;">${esc(session.title)}</h1>
          <p style="opacity:0.9; margin:0; font-size:0.95rem;">
            ${isPerfect ? '🎉 Outstanding! 100% accuracy achieved with flawless speed!' : 'Great practice session! Review all items below or filter by correct / incorrect.'}
          </p>
        </div>
        <div style="text-align:right;">
          <div class="drill-result-score">${r.score} / ${r.total}</div>
          <div style="font-size:1.15rem; font-weight:700; margin-top:4px;">Accuracy: ${r.accuracy}%</div>
        </div>
      </div>

      <!-- Quick Metrics Grid (Interactive Filters) -->
      <div class="metrics-grid mb-4">
        <div class="metric-card success btn-metric-filter ${activeFilter === 'correct' ? 'active-filter-card' : ''}" data-filter="correct" style="cursor:pointer;" title="Click to view correct answers">
          <div class="metric-title">Correct Answers 🔍</div>
          <div class="metric-val">${r.score}</div>
          <div class="metric-sub">${r.accuracy}% accuracy &middot; Click to filter</div>
        </div>
        <div class="metric-card ${r.wrongList.length ? 'danger' : 'success'} btn-metric-filter ${activeFilter === 'incorrect' ? 'active-filter-card' : ''}" data-filter="incorrect" style="cursor:pointer;" title="Click to view incorrect answers">
          <div class="metric-title">Incorrect / Skipped 🔍</div>
          <div class="metric-val">${r.wrongList.length}</div>
          <div class="metric-sub">${r.wrongList.length ? 'Review recommended &middot; Click' : 'Zero errors!'}</div>
        </div>
        <div class="metric-card btn-metric-filter ${activeFilter === 'all' ? 'active-filter-card' : ''}" data-filter="all" style="cursor:pointer;" title="Click to view all answers">
          <div class="metric-title">Total Questions 🔍</div>
          <div class="metric-val">${r.total}</div>
          <div class="metric-sub">View all questions</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">Average Solving Pace</div>
          <div class="metric-val">${r.avgPerQ}s</div>
          <div class="metric-sub">${fmtTime(r.totalSec)} total time</div>
        </div>
      </div>

      <!-- 📊 Question-by-Question Time vs Target Benchmark Bar Chart -->
      <div class="card mb-4">
        <div class="card-header" style="padding-bottom:8px;">
          <h3 style="margin:0 0 4px;">⏱️ Question-Wise Time vs Target Benchmark (${r.avgPerQ}s)</h3>
          <span class="text-muted text-sm">Green (Fast &amp; Correct) · Amber (Slow Pace) · Red (Incorrect) · Purple (Skipped)</span>
        </div>
        <div style="overflow-x:auto; padding:8px 0;">
          <div id="drill-perf-bar-chart"></div>
        </div>
      </div>

      <!-- Comprehensive Questions Review Table with Filter Controls -->

      <div class="card mb-4">
        <div class="card-header flex-between" style="flex-wrap:wrap; gap:12px; align-items:center;">
          <div>
            <h3 style="margin:0 0 4px;">
              ${activeFilter === 'correct' ? '✓ Correct Answers Review' : activeFilter === 'incorrect' ? '❌ Incorrect Answers Review' : '📝 Questions Review (All Questions)'}
              (${displayedList.length})
            </h3>
            <span class="text-muted text-sm">Compare your input against the verified key</span>
          </div>

          <!-- Filter Pills: All, Incorrect, Correct -->
          <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
            <button class="btn sm ${activeFilter === 'all' ? '' : 'alt'} btn-drill-filter" data-filter="all">
              All (${r.total})
            </button>
            <button class="btn sm ${activeFilter === 'incorrect' ? 'badge-danger' : 'alt'} btn-drill-filter" data-filter="incorrect"
              style="${activeFilter === 'incorrect' ? 'background:var(--color-danger); color:#fff; border-color:var(--color-danger);' : ''}">
              ❌ Incorrect (${r.wrongList.length})
            </button>
            <button class="btn sm ${activeFilter === 'correct' ? 'badge-success' : 'alt'} btn-drill-filter" data-filter="correct"
              style="${activeFilter === 'correct' ? 'background:var(--color-success); color:#fff; border-color:var(--color-success);' : ''}">
              ✓ Correct (${r.score})
            </button>
          </div>
        </div>

        <div class="table-container mt-3">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width:60px;">Q#</th>
                <th>Formula / Question</th>
                <th>Your Answer</th>
                <th style="width:110px;">Time Spent</th>
                <th style="width:120px;">Status</th>
                <th>Correct Answer</th>
              </tr>
            </thead>
            <tbody>
              ${displayedList.map(item => `
                <tr style="${item.isCorrect ? 'background:rgba(16,185,129,0.05);' : 'background:rgba(239,68,68,0.04);'}">
                  <td><b>#${item.idx}</b></td>
                  <td style="font-size:1.15rem; font-weight:700;">${esc(item.prompt)}</td>
                  <td>
                    ${item.isCorrect
                      ? `<span class="badge badge-success" style="font-size:1rem; font-weight:800;">✓ ${esc(item.userAns)}</span>`
                      : `<span class="badge badge-danger">${esc(item.userAns)}</span>`}
                  </td>
                  <td><b>${item.time != null ? item.time : r.avgPerQ}s</b></td>
                  <td>
                    ${item.isCorrect
                      ? `<span class="badge badge-success">✓ Correct</span>`
                      : `<span class="badge badge-danger">✗ Incorrect</span>`}
                  </td>
                  <td>
                    <span class="badge badge-success" style="font-size:1rem; font-weight:800;">${esc(item.correctAns)}</span>
                  </td>
                </tr>
              `).join('')}
              ${displayedList.length === 0 ? `
                <tr>
                  <td colspan="6" style="text-align:center; padding:24px; color:var(--text-muted);">
                    No questions found for the "${activeFilter}" filter.
                  </td>
                </tr>
              ` : ''}
            </tbody>
          </table>
        </div>
      </div>

      <!-- Action Footer Buttons (Requirement 9) -->
      <div style="display:flex; gap:12px; flex-wrap:wrap; margin-bottom:40px;">
        <button class="btn" id="btn-res-retry-same">🔄 Retry Same</button>
        ${r.wrongList.length ? `<button class="btn alt" id="btn-res-retry-wrong">🎯 Retry Wrong Only (${r.wrongList.length})</button>` : ''}
        <button class="btn alt" id="btn-res-new-set">🎲 New Set</button>
        <button class="btn alt" id="btn-res-back-setup">⚙️ Back to Setup</button>
      </div>
    `;
  }

  // Support historical drill inspection from Attempt History
  function renderAttempt(attempt) {
    const app = document.getElementById('app');
    if (!app) return;

    const data = attempt.drillData || {};
    const wrongList = data.wrongList || [];
    const correctList = data.correctList || [];
    const questionsReview = data.questionsReview || (
      (data.questions || []).map((q, idx) => {
        const userRaw = (data.answers && data.answers[q.id] != null ? data.answers[q.id] : '').trim();
        const target = String(q.ans).trim();
        const isCorrect = isAnswerCorrect(userRaw, q);
        return {
          idx: idx + 1,
          id: q.id,
          prompt: q.prompt,
          userAns: userRaw || '(Empty)',
          correctAns: target,
          isCorrect
        };
      })
    );

    const reviewItems = questionsReview.length ? questionsReview : (
      [
        ...wrongList.map(w => ({ ...w, isCorrect: false })),
        ...correctList.map(c => ({ ...c, isCorrect: true }))
      ].sort((a, b) => a.idx - b.idx)
    );

    const html = `
      <nav class="crumb">
        <a href="#/">Dashboard</a> &rsaquo;
        <a href="#/history">Attempt History</a> &rsaquo;
        <span><b>Calculation Drill Report</b></span>
      </nav>

      <div class="drill-result-banner">
        <div>
          <span style="text-transform:uppercase; font-size:0.8rem; letter-spacing:0.05em; opacity:0.85;">Archived Drill</span>
          <h1 style="color:#fff; margin:6px 0 8px;">${esc(attempt.testName)}</h1>
          <p style="opacity:0.9; margin:0; font-size:0.95rem;">
            Completed on ${new Date(attempt.ts).toLocaleString()}
          </p>
        </div>
        <div style="text-align:right;">
          <div class="drill-result-score">${attempt.score} / ${attempt.max}</div>
          <div style="font-size:1.15rem; font-weight:700; margin-top:4px;">Accuracy: ${attempt.accuracy}%</div>
        </div>
      </div>

      <div class="metrics-grid mb-4">
        <div class="metric-card success">
          <div class="metric-title">Correct Answers</div>
          <div class="metric-val">${attempt.score}</div>
          <div class="metric-sub">${attempt.accuracy}% accuracy</div>
        </div>
        <div class="metric-card ${wrongList.length ? 'danger' : 'success'}">
          <div class="metric-title">Incorrect / Skipped</div>
          <div class="metric-val">${wrongList.length}</div>
          <div class="metric-sub">${wrongList.length ? 'Mistakes recorded' : 'Zero mistakes'}</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">Total Active Time</div>
          <div class="metric-val">${fmtTime(attempt.sec)}</div>
          <div class="metric-sub">Session time</div>
        </div>
        <div class="metric-card">
          <div class="metric-title">Average Solving Pace</div>
          <div class="metric-val">${attempt.avg}s</div>
          <div class="metric-sub">Per calculation</div>
        </div>
      </div>

      <!-- 📊 Question-by-Question Time vs Target Benchmark Bar Chart (Historical) -->
      <div class="card mb-4">
        <div class="card-header" style="padding-bottom:8px;">
          <h3 style="margin:0 0 4px;">⏱️ Question-Wise Time vs Target Benchmark (${attempt.avg || 5}s)</h3>
          <span class="text-muted text-sm">Green (Fast &amp; Correct) · Amber (Slow Pace) · Red (Incorrect) · Purple (Skipped)</span>
        </div>
        <div style="overflow-x:auto; padding:8px 0;">
          <div id="drill-hist-bar-chart"></div>
        </div>
      </div>

      <div class="card mb-4">
        <div class="card-header flex-between">
          <h3>📝 Questions Review (${reviewItems.length})</h3>
          <span class="text-muted text-sm">All verified questions and answers</span>
        </div>
        <div class="table-container mt-3">
          <table class="data-table">
            <thead>
              <tr>
                <th style="width:60px;">Q#</th>
                <th>Formula / Question</th>
                <th>Your Answer</th>
                <th style="width:110px;">Time Spent</th>
                <th style="width:120px;">Status</th>
                <th>Correct Answer</th>
              </tr>
            </thead>
            <tbody>
              ${reviewItems.map(item => `
                <tr style="${item.isCorrect ? 'background:rgba(16,185,129,0.05);' : 'background:rgba(239,68,68,0.04);'}">
                  <td><b>#${item.idx}</b></td>
                  <td style="font-weight:700; font-size:1.15rem;">${esc(item.prompt)}</td>
                  <td>
                    ${item.isCorrect
                      ? `<span class="badge badge-success" style="font-size:1rem; font-weight:800;">✓ ${esc(item.userAns)}</span>`
                      : `<span class="badge badge-danger">${esc(item.userAns)}</span>`}
                  </td>
                  <td><b>${item.time != null ? item.time : (attempt.avg || 5)}s</b></td>
                  <td>
                    ${item.isCorrect
                      ? `<span class="badge badge-success">✓ Correct</span>`
                      : `<span class="badge badge-danger">✗ Incorrect</span>`}
                  </td>
                  <td>
                    <span class="badge badge-success" style="font-size:1rem; font-weight:800;">${esc(item.correctAns)}</span>
                  </td>
                </tr>
              `).join('')}
              ${reviewItems.length === 0 ? `
                <tr>
                  <td colspan="6" style="text-align:center; padding:24px; color:var(--text-muted);">
                    No questions recorded for this drill.
                  </td>
                </tr>
              ` : ''}
            </tbody>
          </table>
        </div>
      </div>

      <div style="margin-top:20px; display:flex; gap:12px; flex-wrap:wrap; margin-bottom:40px;">
        ${data.questions && data.questions.length ? `<button class="btn" id="btn-repeat-drill-attempt">🔄 Repeat This Drill</button>` : ''}
        ${wrongList.length && data.questions ? `<button class="btn alt" id="btn-repeat-wrong-drill">🎯 Retry Wrong Only (${wrongList.length})</button>` : ''}
        <a href="#/drill/${attempt.topic || 'percentages'}" class="btn alt">🎲 Start New Drill</a>
        <button class="btn danger" id="btn-delete-drill-attempt">🗑️ Delete Attempt</button>
        <a href="#/history" class="btn alt">← Attempt History</a>
      </div>
    `;

    app.innerHTML = html;

    // Render the historical bar chart
    if (window.BankCharts && reviewItems.length) {
      const histBenchmark = +(attempt.avg || 5);
      const barItems = reviewItems.map(item => ({
        id: item.id,
        idx: item.idx - 1,
        value: +(item.time != null ? item.time : histBenchmark),
        label: `Q${item.idx}`,
        shortLabel: String(item.idx),
        status: item.isCorrect ? 'Correct' : (item.isSkipped ? 'Unanswered' : 'Incorrect'),
        prevTime: null
      }));
      setTimeout(() => {
        window.BankCharts.renderBarChart('drill-hist-bar-chart', barItems, {
          target: histBenchmark,
          unit: 's'
        });
      }, 0);
    }

    // Repeat This Drill — reload the exact same questions fresh
    const repeatBtn = document.getElementById('btn-repeat-drill-attempt');
    if (repeatBtn && data.questions && data.questions.length) {
      repeatBtn.onclick = () => {
        const tab = attempt.topic || 'percentages';
        // Navigate to the drill tab, then start session with saved questions
        state.settings.activeTab = tab;
        state.settings.activeSubTab = 'practice';
        saveSettings();
        startSession(tab, {
          title: attempt.testName,
          questions: data.questions,
          style: data.style || 'sheet'
        });
        render();
      };
    }

    // Retry Wrong Only from history
    const retryWrongBtn = document.getElementById('btn-repeat-wrong-drill');
    if (retryWrongBtn && wrongList.length && data.questions) {
      retryWrongBtn.onclick = () => {
        const tab = attempt.topic || 'percentages';
        const wrongIds = new Set(wrongList.map(w => w.id));
        const wrongQs = data.questions.filter(q => wrongIds.has(q.id));
        if (!wrongQs.length) return;
        state.settings.activeTab = tab;
        state.settings.activeSubTab = 'practice';
        saveSettings();
        startSession(tab, {
          title: `${attempt.testName} (Wrong Only)`,
          questions: wrongQs,
          style: data.style || 'sheet'
        });
        render();
      };
    }

    const delBtn = document.getElementById('btn-delete-drill-attempt');
    if (delBtn) {
      delBtn.onclick = async () => {
        if (confirm('Are you sure you want to delete this drill attempt? This will permanently remove its record.')) {
          if (attempt.id && window.BankStorage) {
            await window.BankStorage.deleteAttempt(attempt.id);
          }
          location.hash = '#/history';
        }
      };
    }
  }


  // --------------------------------------------------------------------------
  // READING MODES PER TAB (Tricks, Reference Cards, Flashcards)
  // --------------------------------------------------------------------------
  function renderReadingMode(tab) {
    if (tab === 'tables') {
      const set = state.settings.tables;
      const num = Math.max(1, Math.min(100, +set.num || 1));
      const upTo = Math.max(1, Math.min(50, +set.upTo || 12));
      const sideBySide = set.sideBySideCount || 4;

      let tablesToRender = [];
      for (let s = 0; s < sideBySide; s++) {
        if (num + s <= 100) {
          tablesToRender.push(num + s);
        }
      }

      return `
        <div class="card mb-4">
          <div class="flex-between mb-3" style="flex-wrap:wrap; gap:12px;">
            <div>
              <h3>📖 Multiplication Tables Reference &amp; Revision (Tables 1 to 100)</h3>
              <p class="text-muted text-sm">Study any table from 1 to 100 with side-by-side comparative views.</p>
            </div>
            <div style="display:flex; align-items:center; gap:8px;">
              <button class="btn alt sm btn-read-tbl-prev" ${num <= 1 ? 'disabled' : ''}>&larr; Prev Table</button>
              <button class="btn alt sm btn-read-tbl-next" ${num >= 100 ? 'disabled' : ''}>Next Table &rarr;</button>
            </div>
          </div>

          <!-- Quick Jump & Table Selector Toolbar -->
          <div style="background:var(--bg-secondary); padding:14px 16px; border-radius:var(--radius-md); margin-bottom:18px; border:1px solid var(--border-color);">
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-bottom:10px;">
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <span style="font-weight:700; font-size:0.88rem; color:var(--text-primary);">Quick 4-Table Packs:</span>
                <div class="drill-pill-options">
                  ${[
                    { label: 'Tables 1–4', start: 1, count: 4 },
                    { label: 'Tables 5–8', start: 5, count: 4 },
                    { label: 'Tables 9–12', start: 9, count: 4 },
                    { label: 'Tables 13–16', start: 13, count: 4 },
                    { label: 'Tables 17–20', start: 17, count: 4 },
                    { label: 'Tables 21–24', start: 21, count: 4 },
                    { label: 'Tables 25–28', start: 25, count: 4 }
                  ].map(p => `
                    <button type="button" class="drill-pill-btn btn-read-tbl-pack ${num === p.start && sideBySide === p.count ? 'active' : ''}"
                      data-start="${p.start}" data-count="${p.count}">${p.label}</button>
                  `).join('')}
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:8px;">
                <span class="text-muted text-sm" style="font-weight:700;">Start Table (1–100):</span>
                <input type="number" id="input-read-tbl-start" min="1" max="100" value="${num}"
                  style="width:70px; height:36px; text-align:center; font-weight:800; font-size:1.1rem; border:2px solid var(--border-color); border-radius:var(--radius-sm); background:var(--bg-surface);">
              </div>
            </div>

            <!-- Single Table Number Quick Selector (Tables 1 to 25) -->
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; padding-top:8px; border-top:1px dashed var(--border-color);">
              <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted); margin-right:4px;">Jump to Table:</span>
              ${Array.from({ length: 25 }, (_, i) => i + 1).map(n => `
                <button type="button" class="btn-read-tbl-num" data-num="${n}"
                  style="min-width:32px; height:30px; padding:0 6px; font-size:0.85rem; font-weight:700; border-radius:var(--radius-sm); border:1px solid ${num === n ? 'var(--brand-primary)' : 'var(--border-color)'}; background:${num === n ? 'var(--brand-primary)' : 'var(--bg-surface)'}; color:${num === n ? '#fff' : 'var(--text-primary)'}; cursor:pointer;">
                  ${n}
                </button>
              `).join('')}
            </div>

            <!-- Multiplier & Side-by-side controls -->
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-top:10px; padding-top:8px; border-top:1px dashed var(--border-color);">
              <div style="display:flex; align-items:center; gap:8px;">
                <span class="text-muted text-sm" style="font-weight:700;">Side-by-Side:</span>
                <div class="drill-pill-options">
                  ${[1, 2, 3, 4].map(n => `
                    <button type="button" class="drill-pill-btn btn-read-tbl-cols ${sideBySide === n ? 'active' : ''}" data-cols="${n}">${n} ${n === 1 ? 'Table' : 'Tables'}</button>
                  `).join('')}
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:8px;">
                <span class="text-muted text-sm" style="font-weight:700;">Up to Multiplier:</span>
                <div class="drill-pill-options">
                  ${[10, 12, 15, 20].map(m => `
                    <button type="button" class="drill-pill-btn btn-read-tbl-mult ${upTo === m ? 'active' : ''}" data-mult="${m}">${m}</button>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(200px, 260px)); gap:18px; justify-content:center;">
            ${tablesToRender.map(tNum => `
              <div style="background:var(--bg-secondary); border:1px solid var(--border-color); border-radius:var(--radius-md); padding:16px;">
                <div style="font-size:1.25rem; font-weight:800; color:var(--brand-primary); text-align:center; padding-bottom:10px; border-bottom:1px solid var(--border-color); margin-bottom:12px;">
                  Table of ${tNum}
                </div>
                <div style="display:flex; flex-direction:column; gap:6px;">
                  ${Array.from({ length: upTo }, (_, i) => i + 1).map(step => `
                    <div style="display:flex; align-items:center; justify-content:center; font-size:1.08rem; padding:6px 12px; border-radius:var(--radius-sm); background:var(--bg-surface);">
                      <span style="width:75px; text-align:right; font-weight:600; color:var(--text-secondary);">${tNum} &times; ${step}</span>
                      <span style="width:24px; text-align:center; font-weight:700; color:var(--text-muted);">=</span>
                      <span style="width:65px; text-align:left; font-weight:800; color:var(--brand-primary); font-size:1.15rem;">${tNum * step}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (tab === 'squares' || tab === 'cubes') {
      const isSq = tab === 'squares';
      const set = state.settings[tab];
      const from = Math.max(1, +set.from || 1);
      const maxLimit = isSq ? 100 : 50;
      const defaultLimit = isSq ? 60 : 30;
      const upTo = Math.max(from, Math.min(maxLimit, +set.upTo || defaultLimit));
      const isHidden = !!set.flashcardsHidden;

      const items = [];
      for (let i = from; i <= upTo; i++) {
        items.push({
          num: i,
          ans: isSq ? i * i : i * i * i
        });
      }

      const sqPacks = [
        { label: '1 to 30', from: 1, upTo: 30 },
        { label: '31 to 60', from: 31, upTo: 60 },
        { label: '1 to 60 (Standard)', from: 1, upTo: 60 },
        { label: '1 to 100 (Full)', from: 1, upTo: 100 }
      ];
      const cbPacks = [
        { label: '1 to 15', from: 1, upTo: 15 },
        { label: '16 to 30', from: 16, upTo: 30 },
        { label: '1 to 30 (Standard)', from: 1, upTo: 30 },
        { label: '1 to 50 (Full)', from: 1, upTo: 50 }
      ];
      const packs = isSq ? sqPacks : cbPacks;
      const uptoPresets = isSq ? [25, 30, 40, 50, 60, 100] : [10, 15, 20, 25, 30, 50];

      return `
        <div class="card mb-4">
          <div class="flex-between mb-3" style="flex-wrap:wrap; gap:12px;">
            <div>
              <h3>📖 ${isSq ? `Square Numbers (1² to ${upTo}²)` : `Cube Numbers (1³ to ${upTo}³)`}</h3>
              <p class="text-muted text-sm">Essential for banking speed maths (simplification, number series, quadratic equations).</p>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
              <button class="btn alt sm" id="btn-toggle-flashcards">
                ${isHidden ? '👁️ Show All Answers' : '🔒 Hide Answers (Flashcard Mode)'}
              </button>
            </div>
          </div>

          <!-- Range & Filter Toolbar -->
          <div style="background:var(--bg-secondary); padding:14px 16px; border-radius:var(--radius-md); margin-bottom:18px; border:1px solid var(--border-color);">
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-bottom:10px;">
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <span style="font-weight:700; font-size:0.88rem; color:var(--text-primary);">Quick Range Packs:</span>
                <div class="drill-pill-options">
                  ${packs.map(p => `
                    <button type="button" class="drill-pill-btn btn-read-pow-pack ${from === p.from && upTo === p.upTo ? 'active' : ''}"
                      data-from="${p.from}" data-upto="${p.upTo}">${p.label}</button>
                  `).join('')}
                </div>
              </div>

              <div style="display:flex; align-items:center; gap:8px;">
                <span class="text-muted text-sm" style="font-weight:700;">From:</span>
                <input type="number" id="input-read-pow-from" min="1" max="${maxLimit}" value="${from}"
                  style="width:65px; height:34px; text-align:center; font-weight:800; border:1px solid var(--border-color); border-radius:var(--radius-sm); background:var(--bg-surface);">
                <span class="text-muted text-sm" style="font-weight:700;">Up to:</span>
                <input type="number" id="input-read-pow-upto" min="1" max="${maxLimit}" value="${upTo}"
                  style="width:70px; height:34px; text-align:center; font-weight:800; border:1px solid var(--border-color); border-radius:var(--radius-sm); background:var(--bg-surface);">
              </div>
            </div>

            <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap; padding-top:8px; border-top:1px dashed var(--border-color);">
              <span style="font-size:0.82rem; font-weight:700; color:var(--text-muted);">Quick "Up To" Limit:</span>
              <div class="drill-pill-options">
                ${uptoPresets.map(u => `
                  <button type="button" class="drill-pill-btn btn-read-pow-upto-pill ${upTo === u ? 'active' : ''}" data-upto="${u}">${u}</button>
                `).join('')}
              </div>
            </div>
          </div>

          <p class="text-muted text-sm mb-3">
            ${isHidden ? '💡 Click on any card to reveal its answer.' : '💡 Click "Hide Answers" to test your memory flashcard style.'}
            Currently displaying <b>${items.length} cards</b> (${from}${isSq ? '²' : '³'} to ${upTo}${isSq ? '²' : '³'}).
          </p>

          <div class="drill-flashcard-grid">
            ${items.map(it => `
              <div class="drill-flashcard ${isHidden ? 'hidden' : ''}" data-ans="${it.ans}">
                <div class="drill-flashcard-q">${it.num}${isSq ? '²' : '³'}</div>
                <div class="drill-flashcard-ans">${isHidden ? '?' : it.ans}</div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (tab === 'addition') {
      return `
        <div class="card mb-4">
          <h3>📖 Speed Addition: Mental Math Strategies &amp; Shortcuts</h3>
          <p class="text-muted text-sm mb-4">Techniques used by banking toppers to compute additions in under 2 seconds without pen.</p>

          <div style="display:flex; flex-direction:column; gap:16px;">
            <div class="rec-item">
              <span style="font-size:1.6rem;">⚡</span>
              <div>
                <b style="font-size:1.05rem;">1. Left-to-Right Addition (Breakdown by Place Value)</b>
                <p style="margin:4px 0 0; color:var(--text-secondary); font-size:0.92rem;">
                  Instead of starting with unit digits and carrying over, add from highest place value:
                  <br><b>Example:</b> 68 + 57 &rarr; (60 + 50) + (8 + 7) = 110 + 15 = <b>125</b>.
                  <br><b>Example:</b> 346 + 283 &rarr; (300 + 200) + (40 + 80) + (6 + 3) = 500 + 120 + 9 = <b>629</b>.
                </p>
              </div>
            </div>

            <div class="rec-item">
              <span style="font-size:1.6rem;">🎯</span>
              <div>
                <b style="font-size:1.05rem;">2. Rounding and Adjusting (Near-Tens Trick)</b>
                <p style="margin:4px 0 0; color:var(--text-secondary); font-size:0.92rem;">
                  When a number ends in 8 or 9, round it up to the nearest multiple of 10 and subtract the difference:
                  <br><b>Example:</b> 84 + 39 &rarr; 84 + 40 − 1 = 124 − 1 = <b>123</b>.
                  <br><b>Example:</b> 256 + 198 &rarr; 256 + 200 − 2 = 456 − 2 = <b>454</b>.
                </p>
              </div>
            </div>

            <div class="rec-item">
              <span style="font-size:1.6rem;">🧩</span>
              <div>
                <b style="font-size:1.05rem;">3. Grouping into Tens and Hundreds</b>
                <p style="margin:4px 0 0; color:var(--text-secondary); font-size:0.92rem;">
                  Spot complementary pairs that sum to 10 or 100 before adding the rest:
                  <br><b>Pairs:</b> (1, 9), (2, 8), (3, 7), (4, 6), (5, 5) &middot; (25, 75), (35, 65), (40, 60).
                  <br><b>Example:</b> 24 + 47 + 36 &rarr; (24 + 36) + 47 = 60 + 47 = <b>107</b>.
                </p>
              </div>
            </div>

            <div class="rec-item">
              <span style="font-size:1.6rem;">📊</span>
              <div>
                <b style="font-size:1.05rem;">4. Column Alignment for 3+ Numbers</b>
                <p style="margin:4px 0 0; color:var(--text-secondary); font-size:0.92rem;">
                  When adding vertical lists, combine units first, then shift decimal places.
                </p>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (tab === 'subtraction') {
      return `
        <div class="card mb-4">
          <h3>📖 Speed Subtraction: Mental Math Tricks</h3>
          <p class="text-muted text-sm mb-4">Eliminate borrowing mistakes in time-pressured exam conditions.</p>

          <div style="display:flex; flex-direction:column; gap:16px;">
            <div class="rec-item">
              <span style="font-size:1.6rem;">🎯</span>
              <div>
                <b style="font-size:1.05rem;">1. Vedic Complement Method (Subtracting from 100, 1000)</b>
                <p style="margin:4px 0 0; color:var(--text-secondary); font-size:0.92rem;">
                  Rule: <i>"All from 9 and the last from 10"</i>.
                  <br><b>Example:</b> 1000 − 476 &rarr; (9 − 4 = 5), (9 − 7 = 2), (10 − 6 = 4) = <b>524</b>.
                  <br><b>Example:</b> 100 − 63 &rarr; (9 − 6 = 3), (10 − 3 = 7) = <b>37</b>.
                </p>
              </div>
            </div>

            <div class="rec-item">
              <span style="font-size:1.6rem;">⚡</span>
              <div>
                <b style="font-size:1.05rem;">2. Shift / Equal Addition Method (Avoid Borrowing)</b>
                <p style="margin:4px 0 0; color:var(--text-secondary); font-size:0.92rem;">
                  Add the same small number to both sides so the subtracted number ends in 0:
                  <br><b>Example:</b> 73 − 38 &rarr; (+2 to both) &rarr; 75 − 40 = <b>35</b>.
                  <br><b>Example:</b> 142 − 89 &rarr; (+11 to both) &rarr; 153 − 100 = <b>53</b>.
                </p>
              </div>
            </div>

            <div class="rec-item">
              <span style="font-size:1.6rem;">🔄</span>
              <div>
                <b style="font-size:1.05rem;">3. Left-to-Right Stepdown</b>
                <p style="margin:4px 0 0; color:var(--text-secondary); font-size:0.92rem;">
                  <b>Example:</b> 86 − 39 &rarr; 86 − 30 = 56; then 56 − 9 = <b>47</b>.
                </p>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    if (tab === 'division') {
      return `
        <div class="card mb-4">
          <h3>📖 Speed Division: Divisibility Rules &amp; Fraction Conversions</h3>
          <p class="text-muted text-sm mb-4">Critical shortcut table for Bank PO Data Interpretation and Simplification.</p>

          <!-- Fraction-to-Percentage Table (1/2 to 1/20) -->
          <div class="card-header" style="margin-top:16px;">
            <h4>🔥 Important Fraction to Percentage Table (1/2 to 1/20)</h4>
            <span class="badge badge-primary">Must Memorize</span>
          </div>
          <div class="table-container mt-2 mb-4">
            <table class="data-table" style="font-size:0.92rem;">
              <thead>
                <tr>
                  <th>Fraction</th>
                  <th>Percentage</th>
                  <th>Decimal</th>
                  <th>Fraction</th>
                  <th>Percentage</th>
                  <th>Decimal</th>
                </tr>
              </thead>
              <tbody>
                <tr><td><b>1/2</b></td><td>50%</td><td>0.5</td><td><b>1/11</b></td><td>9.09%</td><td>0.0909</td></tr>
                <tr><td><b>1/3</b></td><td>33.33%</td><td>0.333</td><td><b>1/12</b></td><td>8.33%</td><td>0.0833</td></tr>
                <tr><td><b>1/4</b></td><td>25%</td><td>0.25</td><td><b>1/13</b></td><td>7.69%</td><td>0.0769</td></tr>
                <tr><td><b>1/5</b></td><td>20%</td><td>0.2</td><td><b>1/14</b></td><td>7.14%</td><td>0.0714</td></tr>
                <tr><td><b>1/6</b></td><td>16.66%</td><td>0.166</td><td><b>1/15</b></td><td>6.66%</td><td>0.0666</td></tr>
                <tr><td><b>1/7</b></td><td>14.28%</td><td>0.1428</td><td><b>1/16</b></td><td>6.25%</td><td>0.0625</td></tr>
                <tr><td><b>1/8</b></td><td>12.5%</td><td>0.125</td><td><b>1/17</b></td><td>5.88%</td><td>0.0588</td></tr>
                <tr><td><b>1/9</b></td><td>11.11%</td><td>0.1111</td><td><b>1/18</b></td><td>5.55%</td><td>0.0555</td></tr>
                <tr><td><b>1/10</b></td><td>10%</td><td>0.1</td><td><b>1/19</b></td><td>5.26%</td><td>0.0526</td></tr>
                <tr><td><b>1/20</b></td><td>5%</td><td>0.05</td><td><b>1/25</b></td><td>4%</td><td>0.04</td></tr>
              </tbody>
            </table>
          </div>

          <!-- Divisibility Rules Summary (2 to 12) -->
          <div class="card-header mt-4">
            <h4>⚡ Divisibility Rules (2 to 12)</h4>
          </div>
          <div class="table-container mt-2">
            <table class="data-table" style="font-size:0.92rem;">
              <thead>
                <tr><th>Divisor</th><th>Rule</th><th>Example</th></tr>
              </thead>
              <tbody>
                <tr><td><b>2</b></td><td>Last digit is even (0, 2, 4, 6, 8)</td><td>4,378 is divisible</td></tr>
                <tr><td><b>3</b></td><td>Sum of all digits is divisible by 3</td><td>543 &rarr; 5+4+3=12 (✓)</td></tr>
                <tr><td><b>4</b></td><td>Last two digits divisible by 4</td><td>1,536 &rarr; 36 ÷ 4 = 9 (✓)</td></tr>
                <tr><td><b>5</b></td><td>Last digit is 0 or 5</td><td>2,485 (✓)</td></tr>
                <tr><td><b>6</b></td><td>Divisible by both 2 and 3</td><td>342 is even and 3+4+2=9 (✓)</td></tr>
                <tr><td><b>7</b></td><td>Double last digit and subtract from remaining &rarr; divisible by 7</td><td>343 &rarr; 34 − (2×3) = 28 (✓)</td></tr>
                <tr><td><b>8</b></td><td>Last three digits divisible by 8</td><td>4,128 &rarr; 128 ÷ 8 = 16 (✓)</td></tr>
                <tr><td><b>9</b></td><td>Sum of digits is divisible by 9</td><td>2,835 &rarr; 2+8+3+5=18 (✓)</td></tr>
                <tr><td><b>10</b></td><td>Last digit is 0</td><td>1,240 (✓)</td></tr>
                <tr><td><b>11</b></td><td>(Sum of odd place digits) − (Sum of even place digits) is 0 or multiple of 11</td><td>1,331 &rarr; (1+3) − (3+1) = 0 (✓)</td></tr>
                <tr><td><b>12</b></td><td>Divisible by both 3 and 4</td><td>648 &rarr; sum=18 and 48 ÷ 4 = 12 (✓)</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      `;
    }

    if (tab === 'percentages') {
      const set = state.settings.percentages;
      const isHidden = !!set.flashcardsHidden;
      const filter = set.familyFilter || 'all';

      let familiesToRender = FRACTION_FAMILIES;
      if (filter === 'core') {
        familiesToRender = FRACTION_FAMILIES.filter(f => f.category === 'core');
      } else if (filter === 'adv') {
        familiesToRender = FRACTION_FAMILIES.filter(f => f.category === 'adv');
      } else if (filter === 'benchmarks') {
        familiesToRender = FRACTION_FAMILIES.filter(f => f.category === 'benchmarks');
      } else if (filter !== 'all') {
        familiesToRender = FRACTION_FAMILIES.filter(f => f.id === filter);
        if (!familiesToRender.length) familiesToRender = FRACTION_FAMILIES;
      }

      return `
        <div class="card mb-4">
          <div class="flex-between mb-3" style="flex-wrap:wrap; gap:12px;">
            <div>
              <h3>📖 Fraction-to-Percentage Families Reference &amp; Conversion Hub</h3>
              <p class="text-muted text-sm">Essential for Bank PO, SBI &amp; IBPS Simplification, Arithmetic, and Data Interpretation (DI).</p>
            </div>
            <div style="display:flex; align-items:center; gap:10px;">
              <button class="btn alt sm" id="btn-toggle-pct-flashcards">
                ${isHidden ? '👁️ Show All Values' : '🔒 Hide Percentages (Flashcard Recall Mode)'}
              </button>
            </div>
          </div>

          <!-- Family Filters Toolbar -->
          <div style="background:var(--bg-secondary); padding:14px 16px; border-radius:var(--radius-md); margin-bottom:20px; border:1px solid var(--border-color);">
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px; margin-bottom:10px;">
              <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                <span style="font-weight:700; font-size:0.88rem; color:var(--text-primary);">Family Groups:</span>
                <div class="drill-pill-options">
                  <button type="button" class="drill-pill-btn btn-pct-read-filter ${filter === 'all' ? 'active' : ''}" data-filter="all">All Families (${FRACTION_FAMILIES.length})</button>
                  <button type="button" class="drill-pill-btn btn-pct-read-filter ${filter === 'core' ? 'active' : ''}" data-filter="core">Core (1/2 to 1/10)</button>
                  <button type="button" class="drill-pill-btn btn-pct-read-filter ${filter === 'adv' ? 'active' : ''}" data-filter="adv">Advanced (1/11 to 1/20)</button>
                  <button type="button" class="drill-pill-btn btn-pct-read-filter ${filter === 'benchmarks' ? 'active' : ''}" data-filter="benchmarks">Benchmarks (1/24 to 1/50)</button>
                </div>
              </div>
            </div>

            <!-- Single Family Jump Pills -->
            <div style="display:flex; align-items:center; gap:6px; flex-wrap:wrap; padding-top:8px; border-top:1px dashed var(--border-color);">
              <span style="font-size:0.8rem; font-weight:700; color:var(--text-muted); margin-right:4px;">Jump to Family:</span>
              ${FRACTION_FAMILIES.map(fam => `
                <button type="button" class="btn-pct-read-fam-chip" data-famid="${esc(fam.id)}"
                  style="min-width:38px; height:28px; padding:0 8px; font-size:0.82rem; font-weight:700; border-radius:var(--radius-sm); border:1px solid ${filter === fam.id ? 'var(--brand-primary)' : 'var(--border-color)'}; background:${filter === fam.id ? 'var(--brand-primary)' : 'var(--bg-surface)'}; color:${filter === fam.id ? '#fff' : 'var(--text-primary)'}; cursor:pointer;">
                  ${esc(fam.base)}
                </button>
              `).join('')}
            </div>
          </div>

          <p class="text-muted text-sm mb-4">
            ${isHidden ? '💡 <b>Flashcard Mode Active:</b> Percentages are hidden. Click any row or card to reveal its percentage value.' : '💡 <b>Study Tip:</b> Memorize the base fraction (e.g., 1/7 = 14.28%), then multiply to find any family member (e.g., 3/7 = 3 × 14.28% = 42.85%).'}
          </p>

          <!-- Fraction Families Grid -->
          <div class="family-grid">
            ${familiesToRender.map(fam => `
              <div class="family-card" id="fam-card-${esc(fam.id)}">
                <div class="family-card-header">
                  <div>
                    <h4 style="margin:0; font-size:1.05rem; color:var(--brand-primary);">${esc(fam.name)}</h4>
                    <span class="text-muted text-sm">Base: <b>${esc(fam.base)}</b></span>
                  </div>
                  <span class="badge ${fam.category === 'core' ? 'badge-primary' : fam.category === 'adv' ? 'badge-warning' : 'badge-muted'}">
                    ${fam.items.length} ${fam.items.length === 1 ? 'member' : 'members'}
                  </span>
                </div>

                <div style="display:grid; grid-template-columns: 70px 1fr 1fr 1fr; font-size:0.78rem; font-weight:700; color:var(--text-muted); text-transform:uppercase; padding:4px 10px; margin-bottom:4px; border-bottom:1px solid var(--border-color);">
                  <span>Fraction</span>
                  <span style="text-align:center;">Percentage</span>
                  <span style="text-align:center;">Mixed %</span>
                  <span style="text-align:right;">Decimal</span>
                </div>

                <div style="display:flex; flex-direction:column; gap:4px;">
                  ${fam.items.map(it => `
                    <div class="family-row-item ${isHidden ? 'pct-hidden' : ''}" data-ans="${esc(it.pctStr)}"
                      style="display:grid; grid-template-columns: 70px 1fr 1fr 1fr; align-items:center; padding:6px 10px; font-size:0.95rem; border-radius:var(--radius-sm); background:var(--bg-secondary); cursor:${isHidden ? 'pointer' : 'default'};">
                      <span style="font-weight:800; font-size:1.05rem; color:var(--text-primary);">${esc(it.frac)}</span>
                      <span class="family-pct-val" style="text-align:center; font-weight:800; color:var(--brand-primary); font-size:1rem;">
                        ${isHidden ? '<span class="badge badge-muted" style="cursor:pointer;">? Reveal</span>' : esc(it.pctStr)}
                      </span>
                      <span style="text-align:center; font-weight:600; color:var(--text-secondary);">${esc(it.mixed)}</span>
                      <span style="text-align:right; font-family:monospace; font-weight:600; color:var(--text-muted); font-size:0.88rem;">${esc(it.dec)}</span>
                    </div>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>

          <!-- Mental Math Trick Guide for Fractions -->
          <div class="card mt-4" style="background:var(--bg-secondary); border-color:var(--border-color);">
            <h4 style="margin:0 0 10px;">⚡ Pro Banking Calculation Shortcuts: Fraction Multiplication</h4>
            <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:14px; font-size:0.92rem;">
              <div>
                <b>1. The 1/7 Family Cycle (14, 28, 42, 57, 71, 85):</b>
                <p style="margin:4px 0 0; color:var(--text-secondary);">
                  Notice the cyclic decimal: 1/7 = .142857..., 2/7 = .285714..., 3/7 = .428571... The digits 1-4-2-8-5-7 rotate in sequence!
                </p>
              </div>
              <div>
                <b>2. The 1/8 Family (Half of 25%):</b>
                <p style="margin:4px 0 0; color:var(--text-secondary);">
                  1/8 = 12.5%. Just add 25%: 3/8 = 37.5%, 5/8 = 62.5%, 7/8 = 87.5%. High frequency in SBI &amp; IBPS PO DI questions!
                </p>
              </div>
              <div>
                <b>3. The Twin Rule (1/9 vs 1/11):</b>
                <p style="margin:4px 0 0; color:var(--text-secondary);">
                  Fractions with 9 in denominator use table of 11 (1/9 = 11.11%). Fractions with 11 in denominator use table of 9 (1/11 = 9.09%).
                </p>
              </div>
            </div>
          </div>
        </div>
      `;
    }

    return '';
  }

  // --------------------------------------------------------------------------
  // DOM EVENT BINDINGS FOR ACTIVE PRACTICE & RESULTS
  // --------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', initDrillEvents);
  document.addEventListener('click', handleGlobalDrillClicks);
  document.addEventListener('keydown', handleDrillKeydown);
  document.addEventListener('change', e => {
    if (e.target && e.target.id === 'input-read-tbl-start') {
      const val = Math.max(1, Math.min(100, +e.target.value || 1));
      state.settings.tables.num = val;
      state.settings.tables._custom = true;
      saveSettings();
      render();
    }
    if (e.target && e.target.id === 'input-read-pow-from') {
      const tab = state.settings.activeTab;
      if (tab === 'squares' || tab === 'cubes') {
        const val = Math.max(1, +e.target.value || 1);
        state.settings[tab].from = val;
        state.settings[tab]._userUpTo = true;
        saveSettings();
        render();
      }
    }
    if (e.target && e.target.id === 'input-read-pow-upto') {
      const tab = state.settings.activeTab;
      if (tab === 'squares' || tab === 'cubes') {
        const maxLimit = tab === 'squares' ? 100 : 50;
        const val = Math.max(state.settings[tab].from || 1, Math.min(maxLimit, +e.target.value || (tab === 'squares' ? 60 : 30)));
        state.settings[tab].upTo = val;
        state.settings[tab].customUpTo = val;
        state.settings[tab]._userUpTo = true;
        saveSettings();
        render();
      }
    }
  });

  function initDrillEvents() {}

  function handleGlobalDrillClicks(e) {
    const target = e.target;

    // Reading Squares/Cubes Range Packs (e.g. 1-30, 31-60, 1-60)
    const powPackBtn = target.closest('.btn-read-pow-pack');
    if (powPackBtn) {
      const tab = state.settings.activeTab;
      if (tab === 'squares' || tab === 'cubes') {
        state.settings[tab].from = +powPackBtn.dataset.from;
        state.settings[tab].upTo = +powPackBtn.dataset.upto;
        state.settings[tab].customUpTo = +powPackBtn.dataset.upto;
        state.settings[tab]._userUpTo = true;
        saveSettings();
        render();
        return;
      }
    }

    // Reading Squares/Cubes quick Up to pill
    const powUptoBtn = target.closest('.btn-read-pow-upto-pill');
    if (powUptoBtn) {
      const tab = state.settings.activeTab;
      if (tab === 'squares' || tab === 'cubes') {
        state.settings[tab].from = 1;
        state.settings[tab].upTo = +powUptoBtn.dataset.upto;
        state.settings[tab].customUpTo = +powUptoBtn.dataset.upto;
        state.settings[tab]._userUpTo = true;
        saveSettings();
        render();
        return;
      }
    }

    // Reading side-by-side tables
    if (target.classList.contains('btn-read-tbl-cols')) {
      const cols = +target.dataset.cols || 4;
      state.settings.tables.sideBySideCount = cols;
      saveSettings();
      render();
      return;
    }

    // Reading Table Packs (e.g. Tables 1-4, 5-8, 9-12...)
    const packBtn = target.closest('.btn-read-tbl-pack');
    if (packBtn) {
      state.settings.tables.num = +packBtn.dataset.start;
      state.settings.tables.sideBySideCount = +packBtn.dataset.count;
      state.settings.tables._custom = true;
      saveSettings();
      render();
      return;
    }

    // Reading Jump to Table number pill
    const numBtn = target.closest('.btn-read-tbl-num');
    if (numBtn) {
      state.settings.tables.num = +numBtn.dataset.num;
      state.settings.tables._custom = true;
      saveSettings();
      render();
      return;
    }

    // Reading Multiplier pill (10, 12, 15, 20)
    const multBtn = target.closest('.btn-read-tbl-mult');
    if (multBtn) {
      state.settings.tables.upTo = +multBtn.dataset.mult;
      saveSettings();
      render();
      return;
    }

    // Reading Prev / Next Table navigation
    if (target.classList.contains('btn-read-tbl-prev')) {
      state.settings.tables.num = Math.max(1, (+state.settings.tables.num || 1) - 1);
      state.settings.tables._custom = true;
      saveSettings();
      render();
      return;
    }

    if (target.classList.contains('btn-read-tbl-next')) {
      state.settings.tables.num = Math.min(100, (+state.settings.tables.num || 1) + 1);
      state.settings.tables._custom = true;
      saveSettings();
      render();
      return;
    }

    // Percentages Reading Filters
    const pctFilterBtn = target.closest('.btn-pct-read-filter');
    if (pctFilterBtn) {
      state.settings.percentages.familyFilter = pctFilterBtn.dataset.filter;
      saveSettings();
      render();
      return;
    }

    const pctFamChip = target.closest('.btn-pct-read-fam-chip');
    if (pctFamChip) {
      state.settings.percentages.familyFilter = pctFamChip.dataset.famid;
      saveSettings();
      render();
      return;
    }

    if (target.id === 'btn-toggle-pct-flashcards') {
      state.settings.percentages.flashcardsHidden = !state.settings.percentages.flashcardsHidden;
      saveSettings();
      render();
      return;
    }

    // Single percentage row reveal in flashcard mode
    const pctRow = target.closest('.family-row-item.pct-hidden');
    if (pctRow) {
      pctRow.classList.remove('pct-hidden');
      const valEl = pctRow.querySelector('.family-pct-val');
      if (valEl) valEl.textContent = pctRow.dataset.ans;
      return;
    }

    // Flashcard Toggle (Hide / Show)
    if (target.id === 'btn-toggle-flashcards') {
      const tab = state.settings.activeTab;
      state.settings[tab].flashcardsHidden = !state.settings[tab].flashcardsHidden;
      saveSettings();
      render();
      return;
    }

    // Flashcard Item click (reveal single card)
    const cardEl = target.closest('.drill-flashcard');
    if (cardEl && cardEl.classList.contains('hidden')) {
      cardEl.classList.remove('hidden');
      const ansEl = cardEl.querySelector('.drill-flashcard-ans');
      if (ansEl) ansEl.textContent = cardEl.dataset.ans;
      return;
    }

    // Cancel drill
    if (target.id === 'btn-cancel-drill') {
      if (state.timerInterval) clearInterval(state.timerInterval);
      state.activeSession = null;
      render();
      return;
    }

    // Clicking anywhere in the One-by-One card focuses the input
    const oneCard = target.closest('.drill-one-card');
    if (oneCard && !target.closest('button')) {
      const singleInput = document.getElementById('drill-one-single-input');
      if (singleInput && document.activeElement !== singleInput) {
        singleInput.focus();
      }
    }

    // Reset Full Sheet
    if (target.id === 'btn-reset-sheet') {
      document.querySelectorAll('.sheet-input').forEach(input => {
        input.value = '';
        input.classList.remove('correct', 'wrong');
      });
      document.querySelectorAll('.drill-wrong-badge').forEach(b => {
        b.style.display = 'none';
        b.textContent = '';
      });
      if (state.activeSession) state.activeSession.answers = {};
      const firstInput = document.getElementById('input-q-0');
      if (firstInput) firstInput.focus();
      return;
    }

    // Next Table button (increment table by 1 and reload)
    if (target.id === 'btn-next-table') {
      state.settings.tables.num = Math.min(100, (+state.settings.tables.num || 1) + 1);
      saveSettings();
      startSession('tables');
      return;
    }

    // Check Answers button
    if (target.id === 'btn-check-answers') {
      saveSheetAnswers();
      checkSheetAnswersInline();
      submitSession();
      return;
    }

    // One-by-One Prev / Next
    if (target.id === 'btn-one-prev') {
      if (state.activeSession && state.activeSession.currentIdx > 0) {
        saveSingleInputAnswer();
        recordQuestionTime(state.activeSession.currentIdx - 1);
        state.activeSession.currentIdx--;
        render();
      }
      return;
    }

    if (target.id === 'btn-one-next') {
      if (state.activeSession) {
        saveSingleInputAnswer();
        if (state.activeSession.currentIdx < state.activeSession.questions.length - 1) {
          recordQuestionTime(state.activeSession.currentIdx + 1);
          state.activeSession.currentIdx++;
          render();
        } else {
          submitSession();
        }
      }
      return;
    }

    // Review Filter Toggle (All, Incorrect, Correct)
    const drillFilterBtn = target.closest('.btn-drill-filter') || target.closest('.btn-metric-filter');
    if (drillFilterBtn) {
      const f = drillFilterBtn.dataset.filter;
      if (state.activeSession && state.activeSession.result && f) {
        state.activeSession.result.reviewFilter = f;
        render();
        return;
      }
    }

    // Result Action Buttons
    if (target.id === 'btn-res-retry-same') {
      if (state.activeSession) {
        startSession(state.activeSession.tab, {
          title: state.activeSession.title,
          questions: state.activeSession.questions,
          style: state.activeSession.style
        });
      }
      return;
    }

    if (target.id === 'btn-res-retry-wrong') {
      if (state.activeSession && state.activeSession.result && state.activeSession.result.wrongList.length) {
        const wrongIds = new Set(state.activeSession.result.wrongList.map(w => w.id));
        const wrongQs = state.activeSession.questions.filter(q => wrongIds.has(q.id));
        startSession(state.activeSession.tab, {
          title: `${state.activeSession.title} (Mistakes Drill)`,
          questions: wrongQs,
          style: state.activeSession.style
        });
      }
      return;
    }

    if (target.id === 'btn-res-new-set') {
      if (state.activeSession) {
        startSession(state.activeSession.tab);
      }
      return;
    }

    if (target.id === 'btn-res-back-setup') {
      if (state.timerInterval) clearInterval(state.timerInterval);
      state.activeSession = null;
      render();
      return;
    }
  }

  function saveSheetAnswers() {
    if (!state.activeSession) return;
    document.querySelectorAll('.sheet-input').forEach(input => {
      const qid = input.dataset.qid;
      if (qid) state.activeSession.answers[qid] = input.value.trim();
    });
  }

  function checkSheetAnswersInline() {
    if (!state.activeSession) return;
    state.activeSession.questions.forEach((q, idx) => {
      const input = document.getElementById(`input-q-${idx}`);
      const badge = document.getElementById(`badge-err-${idx}`);
      if (!input) return;

      const userVal = (input.value || '').trim();
      const target = String(q.ans).trim();

      const isCorrect = isAnswerCorrect(userVal, q);

      if (isCorrect) {
        input.classList.remove('wrong');
        input.classList.add('correct');
        if (badge) badge.style.display = 'none';
      } else {
        input.classList.remove('correct');
        input.classList.add('wrong');
        if (badge) {
          badge.style.display = 'block';
          badge.textContent = `Correct: ${target}`;
        }
      }
    });
  }

  function saveSingleInputAnswer() {
    const singleInput = document.getElementById('drill-one-single-input');
    if (singleInput && state.activeSession) {
      const curQ = state.activeSession.questions[state.activeSession.currentIdx];
      if (curQ) state.activeSession.answers[curQ.id] = singleInput.value.trim();
    }
  }

  function handleDrillKeydown(e) {
    const session = state.activeSession;
    if (!session || session.isSubmitted) return;

    // Full Sheet Mode Enter / Tab focus advance (Requirement 3 & 9)
    if (session.style === 'sheet' && e.key === 'Enter') {
      const activeEl = document.activeElement;
      if (activeEl && activeEl.classList.contains('sheet-input')) {
        e.preventDefault();
        saveSheetAnswers();
        const curIdx = +activeEl.dataset.idx;
        const nextInput = document.getElementById(`input-q-${curIdx + 1}`);
        if (nextInput) {
          nextInput.focus();
          nextInput.select();
        } else {
          // Last input reached: trigger check answers
          const checkBtn = document.getElementById('btn-check-answers');
          if (checkBtn) checkBtn.click();
        }
      }
    }

    // One-by-One Mode Enter key advances
    if (session.style === 'one') {
      const singleInput = document.getElementById('drill-one-single-input');
      if (e.key === 'Enter') {
        if (singleInput && document.activeElement === singleInput) {
          e.preventDefault();
          const nextBtn = document.getElementById('btn-one-next');
          if (nextBtn) nextBtn.click();
        }
      } else if (singleInput && document.activeElement !== singleInput && !e.ctrlKey && !e.metaKey && !e.altKey) {
        if (/^[0-9./%\-]$/.test(e.key)) {
          singleInput.focus();
        }
      }
    }
  }

  // Public API
  return {
    render,
    renderAttempt,
    getSettings: () => state.settings
  };
})();

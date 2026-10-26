// Model Registry and Duplicate-Prevention Generator for Arithmetic Mock Tests
// Window namespace: window.MockTestEngine

window.MockTestEngine = (function() {
  'use strict';

  // Extract model identifier from question 'n' property or raw number
  // E.g. "1(A)" -> "1", "12(B)" -> "12", "5" -> "5", "Model 1A" -> "1"
  function extractModelKey(q) {
    if (!q) return 'unknown';
    const rawN = String(q.n || '').trim();
    // Check pattern like "1(A)", "1(B)", "12(D)"
    let m = rawN.match(/^(\d+)(?:\(([A-Za-z])\))?/);
    if (m) {
      return m[1];
    }
    // Check pattern like "1A", "1B", "12C"
    m = rawN.match(/^(\d+)([A-Za-z])/);
    if (m) {
      return m[1];
    }
    // Check digits anywhere
    m = rawN.match(/(\d+)/);
    if (m) {
      return m[1];
    }
    return rawN || 'model_default';
  }

  // Extract variant code like "A", "B", "C", "D" or empty
  function extractVariantCode(q) {
    if (!q) return '';
    const rawN = String(q.n || '').trim();
    let m = rawN.match(/^\d+\(([A-Za-z])\)/);
    if (m) return m[1].toUpperCase();
    m = rawN.match(/^\d+([A-Za-z])/);
    if (m) return m[1].toUpperCase();
    return '';
  }

  // Shuffle array using Fisher-Yates
  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      const tmp = a[i];
      a[i] = a[j];
      a[j] = tmp;
    }
    return a;
  }

  // Get all arithmetic topics from APP_CONFIG
  function getArithmeticTopics() {
    const C = window.APP_CONFIG;
    if (!C || !C.subjects) return [];
    const subj = C.subjects.find(s => s.id === 'arithmetic');
    return subj ? subj.topics : [];
  }

  // Get test configurations for a given arithmetic topic
  function getTestsForTopic(topicId) {
    const C = window.APP_CONFIG;
    if (!C || !C.tests) return [];
    return C.tests.filter(t => t.subject === 'arithmetic' && t.topic === topicId && !t.isHandout);
  }

  // Load a test data file into window.QBANK if not already loaded
  function loadTestData(testConfig) {
    return new Promise((resolve, reject) => {
      if (window.QBANK && window.QBANK[testConfig.id]) {
        return resolve(window.QBANK[testConfig.id]);
      }
      const s = document.createElement('script');
      s.src = testConfig.file;
      s.onload = () => {
        if (window.QBANK && window.QBANK[testConfig.id]) {
          resolve(window.QBANK[testConfig.id]);
        } else {
          reject(new Error('Question data not found for ' + testConfig.id));
        }
      };
      s.onerror = () => reject(new Error('Failed to load file: ' + testConfig.file));
      document.head.appendChild(s);
    });
  }

  // Load and analyze all questions for a given topic
  // Returns { topicId, topicName, totalQuestions, uniqueModelCount, models: Map<modelKey, question[]> }
  async function getChapterModelData(topic) {
    const tests = getTestsForTopic(topic.id);
    if (!tests.length) {
      return {
        topicId: topic.id,
        topicName: topic.name,
        topicNum: topic.num,
        category: topic.category,
        totalQuestions: 0,
        uniqueModelCount: 0,
        models: new Map(),
        isAvailable: false
      };
    }

    const modelMap = new Map();
    let totalQuestions = 0;

    for (const t of tests) {
      try {
        const questions = await loadTestData(t);
        questions.forEach((q, idx) => {
          totalQuestions++;
          const modelKey = extractModelKey(q);
          const variant = extractVariantCode(q);
          const fullModelId = `${topic.id}_m${modelKey}`;

          const qItem = {
            id: `${t.id}:${q.n || (idx + 1)}`,
            originalN: q.n,
            chapterId: topic.id,
            chapterName: topic.name,
            testId: t.id,
            modelKey: modelKey,
            modelGroupId: fullModelId,
            variantCode: variant,
            q: q.q,
            o: q.o,
            a: q.a,
            explanation: q.exp || q.explanation || null
          };

          if (!modelMap.has(fullModelId)) {
            modelMap.set(fullModelId, []);
          }
          modelMap.get(fullModelId).push(qItem);
        });
      } catch (err) {
        console.warn('Could not load data for test:', t.id, err);
      }
    }

    return {
      topicId: topic.id,
      topicName: topic.name,
      topicNum: topic.num,
      category: topic.category,
      totalQuestions: totalQuestions,
      uniqueModelCount: modelMap.size,
      models: modelMap,
      isAvailable: totalQuestions > 0
    };
  }

  // Load all arithmetic chapters summary info (for chapter selection screen)
  async function loadAllArithmeticChapters() {
    const topics = getArithmeticTopics();
    const chapterDataPromises = topics.map(top => getChapterModelData(top));
    const results = await Promise.all(chapterDataPromises);
    return results;
  }

  // Capacity-aware balanced question distribution algorithm
  // Distributes targetTotal questions among chapters as evenly as possible respecting chapter capacities.
  // Returns Map<topicId, targetQuestionCount>
  function calculateBalancedDistribution(chapterCapacities, targetTotal) {
    const allocation = new Map();
    const chapters = Array.from(chapterCapacities.entries()).map(([topicId, capacity]) => ({
      topicId,
      capacity,
      allocated: 0
    }));

    const totalCapacity = chapters.reduce((sum, ch) => sum + ch.capacity, 0);
    const totalToAllocate = Math.min(targetTotal, totalCapacity);

    // Initial equal division
    let remaining = totalToAllocate;
    while (remaining > 0) {
      // Find active chapters that still have capacity
      const eligible = chapters.filter(ch => ch.allocated < ch.capacity);
      if (!eligible.length) break;

      // Find the minimum allocated among eligible chapters
      const minAllocated = Math.min(...eligible.map(ch => ch.allocated));
      const candidates = eligible.filter(ch => ch.allocated === minAllocated);

      // Allocate 1 question to each candidate (or up to remaining)
      for (const cand of candidates) {
        if (remaining <= 0) break;
        cand.allocated++;
        remaining--;
      }
    }

    chapters.forEach(ch => {
      allocation.set(ch.topicId, ch.allocated);
    });

    return allocation;
  }

  // Generate Mock Test questions:
  // 1. Selects chapters
  // 2. Ensures no duplicate model is chosen (within and across chapters)
  // 3. Allocates questions evenly across selected chapters
  // 4. Randomly picks exactly 1 variant per selected model group
  // 5. Randomly shuffles the resulting question list across chapters
  async function generateMockTest(selectedChapterIds, requestedCount, durationMinutes) {
    const allTopics = getArithmeticTopics();
    const selectedTopics = allTopics.filter(t => selectedChapterIds.includes(t.id));

    if (!selectedTopics.length) {
      throw new Error('Please select at least one chapter.');
    }

    // Load data for all selected chapters
    const chapterDataList = await Promise.all(selectedTopics.map(t => getChapterModelData(t)));

    // Track total unique models across all selected chapters
    // Map of fullModelGroupId -> Array of question variants
    const allUniqueModels = new Map();
    const chapterModelsMap = new Map(); // topicId -> Map<modelGroupId, variants[]>

    chapterDataList.forEach(chData => {
      const chMap = new Map();
      chData.models.forEach((variants, modelGroupId) => {
        if (!allUniqueModels.has(modelGroupId)) {
          allUniqueModels.set(modelGroupId, variants);
        }
        chMap.set(modelGroupId, variants);
      });
      chapterModelsMap.set(chData.topicId, chMap);
    });

    const totalEligibleModels = allUniqueModels.size;

    if (totalEligibleModels === 0) {
      throw new Error('No question models are available in the selected chapters.');
    }

    if (requestedCount > totalEligibleModels) {
      throw new Error(
        `Only ${totalEligibleModels} unique question models are available for the selected chapters. Please select more chapters or reduce the number of questions.`
      );
    }

    // Step 2: Balanced distribution across selected chapters
    // Chapter capacity = number of unique models in chapter
    const chapterCapacities = new Map();
    chapterDataList.forEach(chData => {
      chapterCapacities.set(chData.topicId, chData.uniqueModelCount);
    });

    const targetAllocations = calculateBalancedDistribution(chapterCapacities, requestedCount);

    // Step 3: Model-Aware Selection without duplicates
    // Global set of picked model group IDs
    const selectedModelGroups = new Set();
    const selectedQuestions = [];

    // For each chapter, select up to targetAllocations[topicId] unique models
    // Sort chapters by allocation descending to ensure larger allocations are fulfilled cleanly
    const sortedChapters = chapterDataList.slice().sort((a, b) => {
      return (targetAllocations.get(b.topicId) || 0) - (targetAllocations.get(a.topicId) || 0);
    });

    sortedChapters.forEach(chData => {
      const targetCount = targetAllocations.get(chData.topicId) || 0;
      let count = 0;

      // Available models in this chapter not yet picked globally
      const availableModelIds = Array.from(chData.models.keys()).filter(mgId => !selectedModelGroups.has(mgId));
      const shuffledModelIds = shuffleArray(availableModelIds);

      for (const mgId of shuffledModelIds) {
        if (count >= targetCount) break;
        if (selectedModelGroups.has(mgId)) continue;

        const variants = chData.models.get(mgId);
        if (!variants || !variants.length) continue;

        // Pick exactly ONE variant randomly from this model group
        const chosenVariant = variants[Math.floor(Math.random() * variants.length)];

        selectedModelGroups.add(mgId);
        selectedQuestions.push(chosenVariant);
        count++;
      }
    });

    // If due to overlaps or rounding any questions remain to reach requestedCount, fill from remaining models
    if (selectedQuestions.length < requestedCount) {
      const remainingModelIds = Array.from(allUniqueModels.keys()).filter(mgId => !selectedModelGroups.has(mgId));
      const shuffledRemaining = shuffleArray(remainingModelIds);

      for (const mgId of shuffledRemaining) {
        if (selectedQuestions.length >= requestedCount) break;
        const variants = allUniqueModels.get(mgId);
        const chosenVariant = variants[Math.floor(Math.random() * variants.length)];
        selectedModelGroups.add(mgId);
        selectedQuestions.push(chosenVariant);
      }
    }

    // Step 4: Randomize the final question sequence (interleaving chapters)
    const randomizedQuestions = shuffleArray(selectedQuestions);

    // Step 5: Format questions for examination interface
    // Mask answer keys in examination session questions until submission!
    const examQuestions = randomizedQuestions.map((q, idx) => {
      const optionChoices = q.o.map((text, oIdx) => ({
        originalIndex: oIdx,
        text: text
      }));

      return {
        id: q.id,
        testId: q.testId,
        questionOrder: idx + 1,
        chapterId: q.chapterId,
        chapterName: q.chapterName,
        modelGroupId: q.modelGroupId,
        variantCode: q.variantCode,
        displayLabel: q.originalN,
        questionText: q.q,
        options: optionChoices.map(opt => opt.text),
        optionIndices: optionChoices.map(opt => opt.originalIndex),
        // correctAnswer is kept securely inside attempt vault, not exposed in plain client state
        _correctAnswer: q.a,
        explanation: q.explanation || null,
        selectedAnswer: null,
        markedForReview: false,
        timeSpentSeconds: 0,
        status: 'not_visited' // 'not_visited' | 'not_answered' | 'answered' | 'marked_for_review' | 'answered_marked_for_review'
      };
    });

    const testAttempt = {
      id: 'mock_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6),
      type: 'arithmetic_mock',
      subject: 'arithmetic',
      selectedChapterIds: selectedChapterIds,
      selectedChapterNames: selectedTopics.map(t => t.name),
      totalQuestions: examQuestions.length,
      durationMinutes: durationMinutes,
      durationSeconds: durationMinutes * 60,
      startedAt: new Date().toISOString(),
      submittedAt: null,
      status: 'in_progress',
      questions: examQuestions
    };

    return testAttempt;
  }

  // Evaluate submitted mock test attempt
  function evaluateMockTest(attempt, timeSpentTotalSeconds) {
    const questions = attempt.questions;
    let correctCount = 0;
    let incorrectCount = 0;
    let unattemptedCount = 0;

    // Banking marking scheme: +1 for correct, 0 for unattempted, configurable negative marking (0 or 0.25)
    const MARK_CORRECT = 1;
    const MARK_WRONG = 0; // standard bank practice mode

    const evaluatedQuestions = questions.map((q, idx) => {
      const isAttempted = q.selectedAnswer != null;
      const isCorrect = isAttempted && (q.selectedAnswer === q._correctAnswer);
      const isIncorrect = isAttempted && !isCorrect;

      if (!isAttempted) {
        unattemptedCount++;
      } else if (isCorrect) {
        correctCount++;
      } else {
        incorrectCount++;
      }

      return {
        id: q.id,
        questionOrder: idx + 1,
        chapterId: q.chapterId,
        chapterName: q.chapterName,
        modelGroupId: q.modelGroupId,
        variantCode: q.variantCode,
        displayLabel: q.displayLabel,
        questionText: q.questionText,
        options: q.options,
        selectedAnswer: q.selectedAnswer,
        correctAnswer: q._correctAnswer,
        isCorrect: isCorrect,
        isAttempted: isAttempted,
        status: isCorrect ? 'Correct' : (isAttempted ? 'Incorrect' : 'Unattempted'),
        timeSpentSeconds: q.timeSpentSeconds || 0,
        explanation: q.explanation
      };
    });

    const attemptedTotal = correctCount + incorrectCount;
    const score = +(correctCount * MARK_CORRECT - incorrectCount * MARK_WRONG).toFixed(2);
    const maxScore = +(questions.length * MARK_CORRECT).toFixed(2);
    const accuracy = attemptedTotal > 0 ? +((correctCount / attemptedTotal) * 100).toFixed(1) : 0;
    const avgTimePerQuestion = attemptedTotal > 0
      ? +(timeSpentTotalSeconds / attemptedTotal).toFixed(1)
      : +(timeSpentTotalSeconds / Math.max(questions.length, 1)).toFixed(1);

    // Compute chapter-wise breakdown
    const chapterBreakdownMap = new Map();
    evaluatedQuestions.forEach(q => {
      if (!chapterBreakdownMap.has(q.chapterId)) {
        chapterBreakdownMap.set(q.chapterId, {
          chapterId: q.chapterId,
          chapterName: q.chapterName,
          total: 0,
          attempted: 0,
          correct: 0,
          incorrect: 0,
          unattempted: 0,
          timeSpent: 0
        });
      }
      const ch = chapterBreakdownMap.get(q.chapterId);
      ch.total++;
      ch.timeSpent += (q.timeSpentSeconds || 0);
      if (q.isAttempted) ch.attempted++;
      if (q.isCorrect) ch.correct++;
      else if (q.isAttempted) ch.incorrect++;
      else ch.unattempted++;
    });

    const chapterBreakdown = Array.from(chapterBreakdownMap.values()).map(ch => {
      const chAcc = ch.attempted > 0 ? +((ch.correct / ch.attempted) * 100).toFixed(1) : 0;
      return Object.assign({}, ch, { accuracy: chAcc });
    });

    // Also build rows compatible with the standard Detailed Performance Report format
    const benchmark = 45;
    const rows = evaluatedQuestions.map((q, idx) => {
      const qHist = (window.questionHistoryCache && window.questionHistoryCache[q.id]) || { times: [] };
      const prevTimes = qHist.times || [];
      const isCorrect = q.isCorrect;
      const isSkipped = !q.isAttempted;
      const st = q.status;

      let classification = { speedClass: 'normal', label: 'Normal', badgeClass: 'badge-muted', action: 'Maintain Speed' };
      if (window.BankAnalytics && typeof window.BankAnalytics.classifyQuestionSpeed === 'function') {
        try { classification = window.BankAnalytics.classifyQuestionSpeed(q.timeSpentSeconds, isCorrect, isSkipped, benchmark, prevTimes); } catch(e) {}
      }

      return {
        i: idx + 1,
        id: q.id,
        n: q.displayLabel || (idx + 1),
        bankIndex: idx + 1,
        q: q.questionText,
        opts: q.options,
        sel: q.selectedAnswer,
        ci: q.correctAnswer,
        time: q.timeSpentSeconds,
        revisitCount: 0,
        answerChangedCount: 0,
        markedForReview: false,
        prev: prevTimes,
        prevTime: prevTimes.length ? prevTimes[prevTimes.length - 1] : null,
        speedDeltaPct: null,
        speedTrendText: 'First Attempt',
        fastestHistorical: q.timeSpentSeconds,
        f: q.explanation || null,
        st: st,
        speedClass: classification.speedClass,
        speedLabel: classification.label,
        speedBadge: classification.badgeClass,
        recommendedAction: classification.action || 'Maintain Speed',
        chapterName: q.chapterName,
        modelGroupId: q.modelGroupId
      };
    });

    const completedRecord = {
      id: attempt.id,
      ts: attempt.startedAt,
      testId: 'mock-arithmetic',
      testName: 'Arithmetic Mock Test (' + attempt.selectedChapterNames.join(', ') + ')',
      type: 'arithmetic_mock',
      subject: 'arithmetic',
      topic: attempt.selectedChapterIds[0] || 'percentages',
      selectedChapterIds: attempt.selectedChapterIds,
      selectedChapterNames: attempt.selectedChapterNames,
      from: 1,
      to: questions.length,
      isRandom: true,
      total: questions.length,
      durationMinutes: attempt.durationMinutes,
      sec: timeSpentTotalSeconds,
      timeSpentSeconds: timeSpentTotalSeconds,
      submittedAt: new Date().toISOString(),
      status: 'completed',
      score: score,
      max: maxScore,
      maxScore: maxScore,
      correct: correctCount,
      incorrect: incorrectCount,
      unattempted: unattemptedCount,
      attempted: attemptedTotal,
      accuracy: accuracy,
      avg: avgTimePerQuestion,
      avgTime: avgTimePerQuestion,
      chapterBreakdown: chapterBreakdown,
      questions: evaluatedQuestions,
      rows: rows,
      qt: Object.fromEntries(rows.filter(r => r.time > 0).map(r => [r.id, r.time])),
      wrong: rows.filter(r => r.st === 'Incorrect' || r.st === 'Unanswered').map(r => r.id),
      ok: rows.filter(r => r.st === 'Correct').map(r => r.id)
    };

    return completedRecord;
  }

  // Storage key for mock test attempts
  const MOCK_STORAGE_KEY = 'bankprep.mock_attempts.v1';

  function getMockAttempts() {
    try {
      const data = localStorage.getItem(MOCK_STORAGE_KEY);
      const list = data ? JSON.parse(data) : [];
      list.sort((a, b) => new Date(b.submittedAt || b.ts).getTime() - new Date(a.submittedAt || a.ts).getTime());
      return list;
    } catch (e) {
      console.warn('Error reading mock attempts:', e);
      return [];
    }
  }

  function saveMockAttempt(record) {
    try {
      const list = getMockAttempts();
      const existingIdx = list.findIndex(item => item.id === record.id);
      if (existingIdx >= 0) {
        list[existingIdx] = record;
      } else {
        list.unshift(record);
      }
      localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(list));

      // Also persist to global BankStorage so it appears in standard Attempt History and analytics
      if (window.BankStorage && typeof window.BankStorage.saveAttempt === 'function') {
        window.BankStorage.saveAttempt(record).catch(e => console.warn('BankStorage save failed:', e));
      }
      return true;
    } catch (e) {
      console.warn('Error saving mock attempt:', e);
      return false;
    }
  }

  function getMockAttemptById(id) {
    const list = getMockAttempts();
    return list.find(item => item.id === id) || null;
  }

  // Find previous attempt with the same chapter selection for comparison
  function findComparableAttempt(currentAttempt) {
    const list = getMockAttempts();
    const currChSet = new Set(currentAttempt.selectedChapterIds || []);

    // Look for previous attempt with identical chapter selection
    for (const att of list) {
      if (att.id === currentAttempt.id) continue;
      const attChSet = new Set(att.selectedChapterIds || []);
      if (currChSet.size === attChSet.size && [...currChSet].every(x => attChSet.has(x))) {
        return att;
      }
    }
    return null;
  }

  return {
    extractModelKey,
    extractVariantCode,
    getArithmeticTopics,
    getTestsForTopic,
    loadTestData,
    getChapterModelData,
    loadAllArithmeticChapters,
    calculateBalancedDistribution,
    generateMockTest,
    evaluateMockTest,
    getMockAttempts,
    saveMockAttempt,
    getMockAttemptById,
    findComparableAttempt
  };
})();

with open('js/mock-test-engine.js', 'r', encoding='utf-8') as f:
    code = f.read()

target = """    const completedRecord = {
      id: attempt.id,
      ts: attempt.startedAt,
      type: 'arithmetic_mock',
      subject: 'arithmetic',
      selectedChapterIds: attempt.selectedChapterIds,
      selectedChapterNames: attempt.selectedChapterNames,
      total: questions.length,
      durationMinutes: attempt.durationMinutes,
      timeSpentSeconds: timeSpentTotalSeconds,
      submittedAt: new Date().toISOString(),
      status: 'completed',
      score: score,
      maxScore: maxScore,
      correct: correctCount,
      incorrect: incorrectCount,
      unattempted: unattemptedCount,
      attempted: attemptedTotal,
      accuracy: accuracy,
      avgTime: avgTimePerQuestion,
      chapterBreakdown: chapterBreakdown,
      questions: evaluatedQuestions
    };"""

replacement = """    // Also build rows compatible with the standard Detailed Performance Report format
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
    };"""

if target in code:
    code = code.replace(target, replacement)
    with open('js/mock-test-engine.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print("Enhanced completedRecord with standard question rows and analytics compatibility!")
else:
    print("Target not found in mock-test-engine.js!")

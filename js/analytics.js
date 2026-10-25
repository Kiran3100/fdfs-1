// Advanced Banking Exam Analytics Engine
// Computes question-level trends, speed classification, topic diagnostics, and personalized recommendations
window.BankAnalytics = (function() {

  // Target time benchmarks per question (seconds) based on exam standards
  const TOPIC_BENCHMARKS = {
    'percentages': 40,
    'basic-maths': 30,
    'profit-loss': 45,
    'inequalities': 25,
    'coded-decoding': 35,
    'alphabets': 25,
    'default': 35
  };

  function getBenchmark(topic) {
    return TOPIC_BENCHMARKS[topic] || TOPIC_BENCHMARKS.default;
  }

  // Speed and accuracy classification for a single question attempt
  // Compares against topic benchmark and prior attempts
  function classifyQuestionSpeed(qTime, isCorrect, isSkipped, benchmark, prevTimes = []) {
    if (isSkipped) {
      return {
        speedClass: 'skipped',
        label: 'Not Attempted',
        badgeClass: 'badge-muted',
        icon: 'dash'
      };
    }

    const avgPrev = prevTimes.length ? prevTimes.reduce((a, b) => a + b, 0) / prevTimes.length : null;
    const isFasterThanTarget = qTime <= benchmark;
    const isSignificantlySlow = qTime > benchmark * 1.5;

    if (!isCorrect) {
      if (qTime <= benchmark * 0.7) {
        return {
          speedClass: 'rush-inaccurate',
          label: 'Rushed (Inaccurate)',
          badgeClass: 'badge-danger',
          action: 'Improve Accuracy',
          icon: 'alert-triangle'
        };
      }
      return {
        speedClass: 'needs-review',
        label: 'Needs Review',
        badgeClass: 'badge-danger',
        action: 'Revise Concept',
        icon: 'x-circle'
      };
    }

    // Question is correct
    if (qTime <= benchmark * 0.8) {
      return {
        speedClass: 'fast',
        label: 'Fast',
        badgeClass: 'badge-success',
        action: 'Maintain Speed',
        icon: 'zap'
      };
    } else if (qTime <= benchmark * 1.25) {
      return {
        speedClass: 'optimal',
        label: 'Target Pace',
        badgeClass: 'badge-primary',
        action: 'Maintain Speed',
        icon: 'check-circle'
      };
    } else {
      return {
        speedClass: 'slow',
        label: 'Accurate but Slow',
        badgeClass: 'badge-warning',
        action: 'Practice for Speed',
        icon: 'clock'
      };
    }
  }

  // Build question history lookup across all attempts
  // key: question id (e.g. "pct-1:1(A)")
  function buildQuestionHistory(attempts) {
    const map = {};
    attempts.forEach((att, attIdx) => {
      if (!att.rows) return;
      att.rows.forEach(r => {
        // r can be full object or compact array [n, sel, time, ...]
        const qid = r.id || (att.testId + ':' + (r.n || (Array.isArray(r) ? r[0] : '')));
        const time = r.time !== undefined ? r.time : (Array.isArray(r) ? r[2] : 0);
        const st = r.st || (Array.isArray(r) ? (r[1] == null ? 'Unanswered' : 'Attempted') : 'Unknown');
        const isCorrect = st === 'Correct';
        const isWrong = st === 'Incorrect';

        if (!map[qid]) {
          map[qid] = {
            id: qid,
            attemptsCount: 0,
            times: [],
            statuses: [],
            correctCount: 0,
            wrongCount: 0,
            unansweredCount: 0,
            dates: [],
            attemptsList: []
          };
        }
        map[qid].attemptsCount++;
        map[qid].times.push(time);
        map[qid].statuses.push(st);
        map[qid].dates.push(att.ts);
        map[qid].attemptsList.push({
          attemptId: att.id,
          testName: att.testName,
          date: att.ts,
          time: time,
          status: st
        });
        if (isCorrect) map[qid].correctCount++;
        else if (isWrong) map[qid].wrongCount++;
        else map[qid].unansweredCount++;
      });
    });

    // Compute derived metrics
    Object.keys(map).forEach(qid => {
      const entry = map[qid];
      const validTimes = entry.times.filter(t => t > 0);
      entry.fastestTime = validTimes.length ? Math.min(...validTimes) : 0;
      entry.slowestTime = validTimes.length ? Math.max(...validTimes) : 0;
      entry.avgTime = validTimes.length ? +(validTimes.reduce((a, b) => a + b, 0) / validTimes.length).toFixed(1) : 0;
      const scored = entry.correctCount + entry.wrongCount;
      entry.accuracy = scored ? +((entry.correctCount / scored) * 100).toFixed(1) : 0;
    });

    return map;
  }

  // Calculate detailed topic diagnostics across attempts
  function computeTopicDiagnostics(attempts, configSubjects) {
    const topicMap = {};

    // Initialize all configured topics
    configSubjects.forEach(s => {
      (s.topics || []).forEach(t => {
        topicMap[t.id] = {
          topicId: t.id,
          topicName: t.name,
          subjectId: s.id,
          subjectName: s.name,
          testsAttempted: 0,
          totalQuestions: 0,
          attemptedQuestions: 0,
          correctQuestions: 0,
          incorrectQuestions: 0,
          unansweredQuestions: 0,
          totalTime: 0,
          questionTimes: [],
          attemptsList: [],
          repeatedMistakes: 0,
          mistakeQuestions: new Set(),
          speedTrend: 'stable',
          accuracyTrend: 'stable'
        };
      });
    });

    // Populate from attempts
    attempts.forEach(att => {
      const tid = att.topic;
      if (!topicMap[tid]) {
        topicMap[tid] = {
          topicId: tid,
          topicName: tid,
          subjectId: att.subject || 'unknown',
          subjectName: att.subject || 'Unknown',
          testsAttempted: 0,
          totalQuestions: 0,
          attemptedQuestions: 0,
          correctQuestions: 0,
          incorrectQuestions: 0,
          unansweredQuestions: 0,
          totalTime: 0,
          questionTimes: [],
          attemptsList: [],
          repeatedMistakes: 0,
          mistakeQuestions: new Set(),
          speedTrend: 'stable',
          accuracyTrend: 'stable'
        };
      }

      const t = topicMap[tid];
      t.testsAttempted++;
      t.attemptsList.push(att);
      t.totalQuestions += (att.total || 0);
      t.correctQuestions += (att.correct || 0);
      t.incorrectQuestions += (att.incorrect || 0);
      t.unansweredQuestions += (att.unanswered || 0);
      t.attemptedQuestions += (att.attempted !== undefined ? att.attempted : ((att.correct || 0) + (att.incorrect || 0)));
      t.totalTime += (att.sec || 0);

      // Track question times and mistakes
      if (att.rows && Array.isArray(att.rows)) {
        att.rows.forEach(r => {
          const qid = r.id || (att.testId + ':' + (r.n || (Array.isArray(r) ? r[0] : '')));
          const time = r.time !== undefined ? r.time : (Array.isArray(r) ? r[2] : 0);
          const st = r.st || (Array.isArray(r) ? (r[1] == null ? 'Unanswered' : 'Attempted') : 'Unknown');
          if (time > 0) t.questionTimes.push(time);
          if (st === 'Incorrect') {
            if (t.mistakeQuestions.has(qid)) {
              t.repeatedMistakes++;
            } else {
              t.mistakeQuestions.add(qid);
            }
          }
        });
      }
    });

    // Finalize metrics
    const benchmarkMap = TOPIC_BENCHMARKS;
    const result = Object.values(topicMap).map(t => {
      const benchmark = getBenchmark(t.topicId);
      const scored = t.correctQuestions + t.incorrectQuestions;
      const accuracy = scored ? +( (t.correctQuestions / scored) * 100 ).toFixed(1) : 0;
      const avgTimePerAttempted = t.attemptedQuestions ? +(t.totalTime / t.attemptedQuestions).toFixed(1) : 0;
      
      const sortedTimes = [...t.questionTimes].sort((a, b) => a - b);
      const medianTime = sortedTimes.length ? (sortedTimes.length % 2 === 0 ? (sortedTimes[sortedTimes.length/2 - 1] + sortedTimes[sortedTimes.length/2])/2 : sortedTimes[Math.floor(sortedTimes.length/2)]) : 0;
      const fastestTime = sortedTimes.length ? sortedTimes[0] : 0;
      const slowestTime = sortedTimes.length ? sortedTimes[sortedTimes.length - 1] : 0;
      const slowQuestionsCount = sortedTimes.filter(tm => tm > benchmark * 1.3).length;

      // Trends across attempts
      let speedTrend = 'N/A';
      let accuracyTrend = 'N/A';
      if (t.attemptsList.length >= 2) {
        const first = t.attemptsList[0];
        const last = t.attemptsList[t.attemptsList.length - 1];
        const firstSpeed = first.attempted ? first.sec / first.attempted : first.sec / first.total;
        const lastSpeed = last.attempted ? last.sec / last.attempted : last.sec / last.total;
        if (lastSpeed < firstSpeed * 0.9) speedTrend = 'Improving (Faster)';
        else if (lastSpeed > firstSpeed * 1.1) speedTrend = 'Declining (Slower)';
        else speedTrend = 'Stable';

        if (last.accuracy > first.accuracy + 4) accuracyTrend = 'Improving (+)';
        else if (last.accuracy < first.accuracy - 4) accuracyTrend = 'Declining (-)';
        else accuracyTrend = 'Stable';
      }

      // Topic Classification
      let classification = 'Insufficient Data';
      let priority = 'Medium';
      let strategy = 'Complete at least 1 full test to generate recommendations.';

      if (t.testsAttempted > 0) {
        if (accuracy >= 85 && avgTimePerAttempted <= benchmark * 1.1) {
          classification = 'Strong Area';
          priority = 'Low';
          strategy = 'Maintain momentum! Take mixed full mocks and keep error log clean.';
        } else if (accuracy < 75 && avgTimePerAttempted <= benchmark * 1.1) {
          classification = 'Accuracy Improvement Needed';
          priority = 'High';
          strategy = 'You are solving at good speed but making preventable errors. Focus on step verification, question re-reading, and calculation sanity checks.';
        } else if (accuracy >= 80 && avgTimePerAttempted > benchmark * 1.25) {
          classification = 'Speed Improvement Needed';
          priority = 'High';
          strategy = 'Conceptual understanding is solid! Focus on short-cuts, Vedic math tables, fraction-to-percentage conversions, and skipping lengthy steps.';
        } else if (accuracy < 75 && avgTimePerAttempted > benchmark * 1.25) {
          classification = 'Concept Revision Needed';
          priority = 'Critical';
          strategy = 'Fundamental concepts need strengthening. Review topic notes, formulas, and fundamental patterns before attempting high-speed timed tests.';
        } else {
          classification = 'Developing';
          priority = 'Medium';
          strategy = 'Consistent practice needed. Target 15-20 questions daily to bring time under benchmark.';
        }
      }

      return {
        ...t,
        benchmark,
        accuracy,
        avgTimePerAttempted,
        medianTime,
        fastestTime,
        slowestTime,
        slowQuestionsCount,
        speedTrend,
        accuracyTrend,
        classification,
        priority,
        strategy,
        repeatedMistakesCount: t.repeatedMistakes
      };
    });

    return result;
  }

  // Generate Personalized Improvement Plan
  function generateImprovementPlan(currentResult, allAttempts, topicDiagnostics) {
    const plans = [];
    const weakestTopics = [...topicDiagnostics]
      .filter(t => t.testsAttempted > 0)
      .sort((a, b) => {
        const pOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
        return (pOrder[b.priority] || 0) - (pOrder[a.priority] || 0) || (a.accuracy - b.accuracy);
      });

    const primaryWeakness = weakestTopics[0];

    // Inspect current test rows
    const rows = currentResult.rows || [];
    const incorrectRows = rows.filter(r => r.st === 'Incorrect');
    const slowRows = rows.filter(r => r.st === 'Correct' && r.time > (getBenchmark(currentResult.topic) * 1.3));
    const rushedRows = rows.filter(r => r.st === 'Incorrect' && r.time < (getBenchmark(currentResult.topic) * 0.7));

    let actionableSummary = '';
    let dailyTarget = 'Practice 15-20 targeted questions daily.';
    let recommendations = [];

    if (primaryWeakness) {
      if (primaryWeakness.classification === 'Speed Improvement Needed') {
        actionableSummary = `In ${primaryWeakness.topicName}, your accuracy is ${primaryWeakness.accuracy}% but your average time (${primaryWeakness.avgTimePerAttempted}s) exceeds the banking exam target (${primaryWeakness.benchmark}s). Practice calculation shortcuts and fraction tables.`;
        recommendations.push({
          type: 'speed',
          title: 'Speed Acceleration & Mental Math',
          desc: `Memorize core percentage-to-fraction values (1/7=14.28%, 1/8=12.5%, 1/13=7.69%) and practice unit-digit / approximation elimination to cut 10-15s per question.`
        });
      } else if (primaryWeakness.classification === 'Accuracy Improvement Needed') {
        actionableSummary = `In ${primaryWeakness.topicName}, your speed is commendable (${primaryWeakness.avgTimePerAttempted}s), but accuracy (${primaryWeakness.accuracy}%) is suffering from rushed mistakes.`;
        recommendations.push({
          type: 'accuracy',
          title: 'Error Prevention & Reading Precision',
          desc: `Double check final question demands (e.g. "percentage more than" vs "percent of", or units). You had ${rushedRows.length} rushed errors in this session.`
        });
      } else if (primaryWeakness.classification === 'Concept Revision Needed') {
        actionableSummary = `In ${primaryWeakness.topicName}, both accuracy (${primaryWeakness.accuracy}%) and solving speed (${primaryWeakness.avgTimePerAttempted}s) require immediate conceptual grounding.`;
        recommendations.push({
          type: 'concept',
          title: 'Core Concept Revision',
          desc: `Revise foundational rules, ratios, and standard banking exam patterns before taking further speed tests.`
        });
      } else {
        actionableSummary = `Good balanced baseline! Maintain ${primaryWeakness.accuracy}% accuracy while shaving solving time down towards ${primaryWeakness.benchmark}s per question.`;
      }
    } else {
      actionableSummary = `Test completed successfully! Complete more tests to reveal detailed cross-topic trends.`;
    }

    if (incorrectRows.length > 0) {
      recommendations.push({
        type: 'repeat',
        title: `Revisit ${incorrectRows.length} Missed Question${incorrectRows.length > 1 ? 's' : ''}`,
        desc: `Use the 'Practise past mistakes' feature from the topic screen to redo questions: ${incorrectRows.slice(0, 5).map(r => r.n).join(', ')}${incorrectRows.length > 5 ? '...' : ''}.`
      });
    }

    if (slowRows.length > 0) {
      recommendations.push({
        type: 'drill',
        title: `Optimize ${slowRows.length} Slow Solutions`,
        desc: `Questions ${slowRows.slice(0, 4).map(r => r.n).join(', ')} were solved correctly but took over ${Math.round(getBenchmark(currentResult.topic) * 1.3)}s. Re-solve them looking for faster substitution or elimination methods.`
      });
    }

    return {
      primaryTopic: primaryWeakness ? primaryWeakness.topicName : currentResult.topic,
      priority: primaryWeakness ? primaryWeakness.priority : 'Normal',
      summary: actionableSummary,
      dailyTarget,
      recommendations,
      slowestQuestions: [...rows].sort((a, b) => b.time - a.time).slice(0, 5)
    };
  }

  // Master Dashboard Overall Stats
  function computeOverallStats(attempts, topicDiagnostics) {
    const totalTests = attempts.length;
    let totalQs = 0;
    let totalCorrect = 0;
    let totalIncorrect = 0;
    let totalTime = 0;
    let bestScorePercent = 0;

    attempts.forEach(a => {
      const qs = a.total || (a.rows ? a.rows.length : 0);
      totalQs += qs;
      totalCorrect += (a.correct || 0);
      totalIncorrect += (a.incorrect || 0);
      totalTime += (a.sec || 0);
      const acc = a.accuracy || 0;
      if (acc > bestScorePercent) bestScorePercent = acc;
    });

    const attemptedScored = totalCorrect + totalIncorrect;
    const overallAccuracy = attemptedScored ? +((totalCorrect / attemptedScored) * 100).toFixed(1) : 0;
    const avgSolvingTime = attemptedScored ? +(totalTime / attemptedScored).toFixed(1) : (totalQs ? +(totalTime / totalQs).toFixed(1) : 0);

    // Active topics
    const activeTopics = topicDiagnostics.filter(t => t.testsAttempted > 0);
    const sortedBySpeed = [...activeTopics].sort((a, b) => a.avgTimePerAttempted - b.avgTimePerAttempted);
    const sortedByAcc = [...activeTopics].sort((a, b) => a.accuracy - b.accuracy);

    const fastestTopic = sortedBySpeed.length ? sortedBySpeed[0].topicName : 'N/A';
    const weakestTopic = sortedByAcc.length ? sortedByAcc[0].topicName : 'N/A';
    const strongestTopic = sortedByAcc.length ? sortedByAcc[sortedByAcc.length - 1].topicName : 'N/A';

    return {
      totalTests,
      totalQs,
      totalCorrect,
      totalIncorrect,
      totalTime,
      overallAccuracy,
      avgSolvingTime,
      bestScorePercent,
      fastestTopic,
      weakestTopic,
      strongestTopic
    };
  }

  return {
    getBenchmark,
    classifyQuestionSpeed,
    buildQuestionHistory,
    computeTopicDiagnostics,
    generateImprovementPlan,
    computeOverallStats
  };
})();

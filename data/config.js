// ADD NEW TOPICS / TESTS HERE. Each test = one PDF converted with tools/make_data.py.
window.QBANK = window.QBANK || {};
window.APP_CONFIG = {
  subjects: [
    {
      id: 'arithmetic',
      name: 'Arithmetic',
      description: 'Foundational quantitative aptitude covering commercial mathematics, arithmetic mechanics, speed distance, and counting principles.',
      topics: [
        { id: 'basic-maths', num: 1, name: 'Basic Mathematics', category: 'Foundation', filePdf: '1.basic_mathematics.pdf' },
        { id: 'percentages', num: 2, name: 'Percentages', category: 'Commercial', filePdf: '2.percentages.pdf' },
        { id: 'profit-loss', num: 3, name: 'Profit and Loss', category: 'Commercial', filePdf: '3.profit_and_loss.pdf' },
        { id: 'simple-interest', num: 4, name: 'Simple Interest', category: 'Commercial', filePdf: '4.simple_interest.pdf' },
        { id: 'compound-interest', num: 5, name: 'Compound Interest', category: 'Commercial', filePdf: '5.compound_interest.pdf' },
        { id: 'ratio-proportion', num: 6, name: 'Ratio and Proportion', category: 'Foundation', filePdf: '6.ratio_and_proportion.pdf' },
        { id: 'partnership', num: 7, name: 'Partnership', category: 'Commercial', filePdf: '7.partnership.pdf' },
        { id: 'problems-on-ages', num: 8, name: 'Problems on Ages', category: 'Foundation', filePdf: '8.problems_on_ages.pdf' },
        { id: 'averages', num: 9, name: 'Averages', category: 'Foundation', filePdf: '9.averages.pdf' },
        { id: 'mixtures-allegations', num: 10, name: 'Mixtures and Allegations', category: 'Commercial', filePdf: '10.mixtures_and_allegations.pdf' },
        { id: 'time-distance', num: 11, name: 'Time and Distance', category: 'Motion & Work', filePdf: '11.time_and_distance.pdf' },
        { id: 'trains', num: 12, name: 'Trains', category: 'Motion & Work', filePdf: '12.trains.pdf' },
        { id: 'boats-streams', num: 13, name: 'Boats and Streams', category: 'Motion & Work', filePdf: '13.boats_and_streams.pdf' },
        { id: 'time-work', num: 14, name: 'Time and Work', category: 'Motion & Work', filePdf: '14.time_and_work.pdf' },
        { id: 'pipes-cisterns', num: 15, name: 'Pipes and Cisterns', category: 'Motion & Work', filePdf: '15.pipes_and_cisterns.pdf' },
        { id: 'inequalities-comparison', num: 16, name: 'Inequalities Comparison', category: 'Algebraic', filePdf: '16.inequalities_comparison.pdf' },
        { id: 'areas', num: 17, name: 'Areas', category: 'Mensuration', filePdf: '17.areas.pdf' },
        { id: 'volumes', num: 18, name: 'Volumes', category: 'Mensuration', filePdf: '18.volumes.pdf' },
        { id: 'lcm-hcf', num: 19, name: 'LCM and HCF', category: 'Foundation', filePdf: '19.lcm_and_hcf.pdf' },
        { id: 'problems-on-numbers', num: 20, name: 'Problems on Numbers', category: 'Foundation', filePdf: '20.problems_on_numbers.pdf' },
        { id: 'approximation', num: 21, name: 'Approximation', category: 'Calculation', filePdf: '21.approximation.pdf' },
        { id: 'permutations-combinations', num: 22, name: 'Permutations and Combinations', category: 'Modern Math', filePdf: '22.permutations_and_combinations.pdf' },
        { id: 'probability', num: 23, name: 'Probability', category: 'Modern Math', filePdf: '23.probability.pdf' }
      ]
    },
    {
      id: 'reasoning',
      name: 'Reasoning Ability',
      description: 'Comprehensive logical and analytical aptitude covering number series, coding, inequalities, seating arrangements, puzzles, and verbal reasoning.',
      topics: [
        { id: 'missing-number-series', num: 1, name: 'Missing Number Series', category: 'Series & Patterns', filePdf: '1. Missing number series.pdf' },
        { id: 'wrong-number-series', num: 2, name: 'Wrong Number Series', category: 'Series & Patterns', filePdf: '2. Wrong number series.pdf' },
        { id: 'problems-on-alphabets', num: 3, name: 'Problems Based on Alphabets', category: 'Alpha-Numeric', filePdf: '3. Problems based on alphabets.pdf' },
        { id: 'coding-decoding', num: 4, name: 'Coding and Decoding', category: 'Coding & Logic', filePdf: '4. Coding and decoding.pdf' },
        { id: 'ranking-time-sequence', num: 5, name: 'Ranking and Time Sequence', category: 'Order & Sequence', filePdf: '5. Ranking and time sequence.pdf' },
        { id: 'coded-inequalities', num: 6, name: 'Coded Inequalities', category: 'Inequalities', filePdf: '6. coded inequalities.pdf' },
        { id: 'directions-distances', num: 7, name: 'Directions and Distances', category: 'Spatial & Direction', filePdf: '7. Directions and distances.pdf' },
        { id: 'blood-relations', num: 8, name: 'Blood Relations', category: 'Family Tree', filePdf: '8. Blood relations.pdf' },
        { id: 'syllogisms', num: 9, name: 'Syllogisms', category: 'Deductive Logic', filePdf: '9. syllogisms.pdf' },
        { id: 'seating-arrangement', num: 10, name: 'Seating Arrangement', category: 'Puzzles & Seating', filePdf: '10. Seating arrangement.pdf' },
        { id: 'analytical-reasoning', num: 11, name: 'Analytical Reasoning', category: 'Puzzles & Seating', filePdf: '11. Analytical reasoning.pdf' },
        { id: 'data-sufficiency', num: 12, name: 'Data Sufficiency', category: 'Critical Thinking', filePdf: '12. Data sufficiency.pdf' },
        { id: 'machine-input-output', num: 13, name: 'Machine Input and Output', category: 'Process Logic', filePdf: '13. Machine input and output.pdf' },
        { id: 'decision-making', num: 14, name: 'Decision Making', category: 'Critical Thinking', filePdf: '14. decision making.pdf' },
        { id: 'statement-arguments', num: 15, name: 'Statement and Arguments', category: 'Verbal Reasoning', filePdf: '15. statement and arguments.pdf' },
        { id: 'statement-assumptions', num: 16, name: 'Statement and Assumptions', category: 'Verbal Reasoning', filePdf: '16. statement and assumptions.pdf' },
        { id: 'statements-course-of-actions', num: 17, name: 'Statements and Course of Actions', category: 'Verbal Reasoning', filePdf: '17. statements and course of actions.pdf' },
        { id: 'cause-and-effect', num: 18, name: 'Cause and Effect', category: 'Verbal Reasoning', filePdf: '18. cause and effect.pdf' },
        { id: 'inference-conclusions', num: 19, name: 'Inference and Conclusions', category: 'Verbal Reasoning', filePdf: '19. inference and conclusions.pdf' }
      ]
    }
  ],
  tests: [
    {
      id: 'pct-1',
      subject: 'arithmetic',
      topic: 'percentages',
      name: 'Percentages - Practice Test 1',
      source: 'percentages_questions_with_answer_key.pdf',
      file: 'data/arithmetic/percentages-1.js',
      count: 180,
      marking: { correct: 1, wrong: 0 } // set wrong: 0.25 for negative marking
    },
    {
      id: 'bm-1',
      subject: 'arithmetic',
      topic: 'basic-maths',
      name: 'Basic Mathematics - Practice Test 1',
      source: '1.basic_mathematics_questions_with_answer_key.pdf',
      file: 'data/arithmetic/basic-maths-1.js',
      count: 100,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'pl-1',
      subject: 'arithmetic',
      topic: 'profit-loss',
      name: 'Profit and Loss - Practice Test 1',
      source: 'profit_and_loss_questions_with_answer_key.pdf',
      file: 'data/arithmetic/profit-loss-1.js',
      count: 160,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'si-1',
      subject: 'arithmetic',
      topic: 'simple-interest',
      name: 'Simple Interest - Practice Test 1',
      source: '4.simple_interest_questions_with_answer_key.pdf',
      file: 'data/arithmetic/simple-interest-1.js',
      count: 80,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'ci-1',
      subject: 'arithmetic',
      topic: 'compound-interest',
      name: 'Compound Interest - Practice Test 1',
      source: '5.compound_interest_questions_with_answer_key.pdf',
      file: 'data/arithmetic/compound-interest-1.js',
      count: 80,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'rp-1',
      subject: 'arithmetic',
      topic: 'ratio-proportion',
      name: 'Ratio and Proportion - Practice Test 1',
      source: '6.ratio_and_proportion_questions_with_answer_key.pdf',
      file: 'data/arithmetic/ratio-proportion-1.js',
      count: 140,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'par-1',
      subject: 'arithmetic',
      topic: 'partnership',
      name: 'Partnership - Practice Test 1',
      source: '7.partnership_questions_with_answer_key.pdf',
      file: 'data/arithmetic/partnership-1.js',
      count: 80,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'pa-1',
      subject: 'arithmetic',
      topic: 'problems-on-ages',
      name: 'Problems on Ages - Practice Test 1',
      source: '8.problems_on_ages_questions_with_answer_key.pdf',
      file: 'data/arithmetic/problems-on-ages-1.js',
      count: 80,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'averages-1',
      subject: 'arithmetic',
      topic: 'averages',
      name: 'Averages - Practice Test 1',
      source: '9.Averages_Coded_Full_Question_Per_Page.pdf',
      file: 'data/arithmetic/averages-1.js',
      count: 100,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'mixtures-allegations-1',
      subject: 'arithmetic',
      topic: 'mixtures-allegations',
      name: 'Mixtures and Allegations - Practice Test 1',
      source: '10.Mixtures_and_Allegations_Full_Question_Per_Page.pdf',
      file: 'data/arithmetic/mixtures-allegations-1.js',
      count: 120,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'time-distance-1',
      subject: 'arithmetic',
      topic: 'time-distance',
      name: 'Time and Distance - Practice Test 1',
      source: '11.Time_and_Distance_Coded_Full_Question_Per_Page.pdf',
      file: 'data/arithmetic/time-distance-1.js',
      count: 100,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'trains-1',
      subject: 'arithmetic',
      topic: 'trains',
      name: 'Trains - Practice Test 1',
      source: '12.Trains_Full_Question_Per_Page.pdf',
      file: 'data/arithmetic/trains-1.js',
      count: 100,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'boats-streams-1',
      subject: 'arithmetic',
      topic: 'boats-streams',
      name: 'Boats and Streams - Practice Test 1',
      source: '13._Boats_and_Streams_Coded_Full_Question_Per_Page.pdf',
      file: 'data/arithmetic/boats-streams-1.js',
      count: 80,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'time-work-1',
      subject: 'arithmetic',
      topic: 'time-work',
      name: 'Time and Work - Practice Test 1',
      source: '14.Time_and_Work_Full_Question_Per_Page.pdf',
      file: 'data/arithmetic/time-work-1.js',
      count: 140,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'pipes-cisterns-1',
      subject: 'arithmetic',
      topic: 'pipes-cisterns',
      name: 'Pipes and Cisterns - Practice Test 1',
      source: '15.Pipes_and_Cisterns_Coded_Full_Question_Per_Page.pdf',
      file: 'data/arithmetic/pipes-cisterns-1.js',
      count: 60,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'inequalities-comparison-1',
      subject: 'arithmetic',
      topic: 'inequalities-comparison',
      name: 'Inequalities Comparison - Practice Test 1',
      source: '16.Inequalities_Comparison_Full_Question_Per_Page.pdf',
      file: 'data/arithmetic/inequalities-comparison-1.js',
      count: 32,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'areas-1',
      subject: 'arithmetic',
      topic: 'areas',
      name: 'Areas - Practice Test 1',
      source: '17_Areas_Full_Question_Per_Page.pdf',
      file: 'data/arithmetic/areas-1.js',
      count: 196,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'volumes-1',
      subject: 'arithmetic',
      topic: 'volumes',
      name: 'Volumes - Practice Test 1',
      source: '18.Volumes_Coded_Full_Question_Per_Page.pdf',
      file: 'data/arithmetic/volumes-1.js',
      count: 159,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'lcm-hcf-1',
      subject: 'arithmetic',
      topic: 'lcm-hcf',
      name: 'LCM and HCF - Practice Test 1',
      source: '19_LCM_and_HCF_Coded_Full_Question_Per_Page.pdf',
      file: 'data/arithmetic/lcm-hcf-1.js',
      count: 100,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'problems-on-numbers-1',
      subject: 'arithmetic',
      topic: 'problems-on-numbers',
      name: 'Problems on Numbers - Practice Test 1',
      source: '20.Problems_on_Numbers_Per_Page.pdf',
      file: 'data/arithmetic/problems-on-numbers-1.js',
      count: 140,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'approximation-1',
      subject: 'arithmetic',
      topic: 'approximation',
      name: 'Approximation - Practice Test 1',
      source: '21.Approximation_Coded_Full_Question_Per_Page.pdf',
      file: 'data/arithmetic/approximation-1.js',
      count: 30,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'alphabets-1',
      subject: 'reasoning',
      topic: 'problems-on-alphabets',
      name: 'Problems Based on Alphabets - Practice Test 1',
      source: 'Alphabets_Full_Question_Per_Page.pdf',
      file: 'data/reasoning/alphabets-1.js',
      count: 200,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'coded-inequalities-1',
      subject: 'reasoning',
      topic: 'coded-inequalities',
      name: 'Coded Inequalities - Practice Test 1',
      source: 'Coded_Inequalities_Full_Question_Per_Page.pdf',
      file: 'data/reasoning/coded-inequalities-1.js',
      count: 140,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'ranking-time-sequence-1',
      subject: 'reasoning',
      topic: 'ranking-time-sequence',
      name: 'Ranking and Time Sequence - Practice Test 1',
      source: 'Ranking_Time_Sequence_Full_Question_Per_Page.pdf',
      file: 'data/reasoning/ranking-time-sequence-1.js',
      count: 180,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'missing-number-series-1',
      subject: 'reasoning',
      topic: 'missing-number-series',
      name: 'Missing Number Series - Practice Test 1',
      source: '1.Missing_Number_Series_Coded_Full_Question_Per_Page.pdf',
      file: 'data/reasoning/missing-number-series-1.js',
      count: 300,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'wrong-number-series-1',
      subject: 'reasoning',
      topic: 'wrong-number-series',
      name: 'Wrong Number Series - Practice Test 1',
      source: '2.Wrong_Number_Series_Coded_Full_Question_Per_Page.pdf',
      file: 'data/reasoning/wrong-number-series-1.js',
      count: 300,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'coding-decoding-1',
      subject: 'reasoning',
      topic: 'coding-decoding',
      name: 'Coding and Decoding - Practice Test 1',
      source: '4.Coding_and_Decoding_Full_Question_Per_Page.pdf',
      file: 'data/reasoning/coding-decoding-1.js',
      count: 200,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'directions-distances-1',
      subject: 'reasoning',
      topic: 'directions-distances',
      name: 'Directions and Distances - Practice Test 1',
      source: '7_Directions_and_Distances_Coded_Full_Question_Per_Page.pdf',
      file: 'data/reasoning/directions-distances-1.js',
      count: 180,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'blood-relations-1',
      subject: 'reasoning',
      topic: 'blood-relations',
      name: 'Blood Relations - Practice Test 1',
      source: '8.Blood_Relations_Coded_Full_Question_Per_Page.pdf',
      file: 'data/reasoning/blood-relations-1.js',
      count: 140,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'seating-arrangement-1',
      subject: 'reasoning',
      topic: 'seating-arrangement',
      name: 'Seating Arrangement - Practice Test 1',
      source: '10.Seating_Arrangement_Grouped_by_Direction.pdf',
      file: 'data/reasoning/seating-arrangement-1.js',
      count: 367,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'data-sufficiency-1',
      subject: 'reasoning',
      topic: 'data-sufficiency',
      name: 'Data Sufficiency - Practice Test 1',
      source: '12.Data_Sufficiency_Full_Question_Per_Page.pdf',
      file: 'data/reasoning/data-sufficiency-1.js',
      count: 140,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'machine-input-output-1',
      subject: 'reasoning',
      topic: 'machine-input-output',
      name: 'Machine Input and Output - Practice Test 1',
      source: '13_Machine_Input_Output_Full_Question_Per_Page.pdf',
      file: 'data/reasoning/machine-input-output-1.js',
      count: 320,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'decision-making-1',
      subject: 'reasoning',
      topic: 'decision-making',
      name: 'Decision Making - Practice Test 1',
      source: '14.Decision_Making_Full_Question_Per_Page.pdf',
      file: 'data/reasoning/decision-making-1.js',
      count: 61,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'statement-arguments-1',
      subject: 'reasoning',
      topic: 'statement-arguments',
      name: 'Statement and Arguments - Practice Test 1',
      source: '15.Statement_and_Arguments_Coded_Full_Question_Per_Page.pdf',
      file: 'data/reasoning/statement-arguments-1.js',
      count: 25,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'statement-assumptions-1',
      subject: 'reasoning',
      topic: 'statement-assumptions',
      name: 'Statement and Assumptions - Practice Test 1',
      source: '16.Statement_and_Assumption_Coded_Full_Question_Per_Page.pdf',
      file: 'data/reasoning/statement-assumptions-1.js',
      count: 25,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'statements-course-of-actions-1',
      subject: 'reasoning',
      topic: 'statements-course-of-actions',
      name: 'Statements and Course of Actions - Practice Test 1',
      source: '17.Statement_and_Course_of_Action_Full_Question_Per_Page.pdf',
      file: 'data/reasoning/statements-course-of-actions-1.js',
      count: 25,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'cause-and-effect-1',
      subject: 'reasoning',
      topic: 'cause-and-effect',
      name: 'Cause and Effect - Practice Test 1',
      source: '18.Cause_and_Effect_Full_Question_Per_Page.pdf',
      file: 'data/reasoning/cause-and-effect-1.js',
      count: 25,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'inference-conclusions-1',
      subject: 'reasoning',
      topic: 'inference-conclusions',
      name: 'Inference and Conclusions - Practice Test 1',
      source: '19.Inference_and_Conclusions_Coded_Full_Question_Per_Page.pdf',
      file: 'data/reasoning/inference-conclusions-1.js',
      count: 25,
      marking: { correct: 1, wrong: 0 }
    },
    // ── Handout Tests ──────────────────────────────────────────────────────────
    {
      id: 'pct-h1',
      subject: 'arithmetic',
      topic: 'percentages',
      name: 'Test Paper 1',
      source: 'PERCENTAGES-1_one_question_per_page.pdf',
      file: 'data/arithmetic/percentages-h1.js',
      count: 23,
      marking: { correct: 1, wrong: 0 },
      isHandout: true
    },
    {
      id: 'pct-h2',
      subject: 'arithmetic',
      topic: 'percentages',
      name: 'Test Paper 2',
      source: 'PERCENTAGES-2_one_question_per_page.pdf',
      file: 'data/arithmetic/percentages-h2.js',
      count: 20,
      marking: { correct: 1, wrong: 0 },
      isHandout: true
    },
    {
      id: 'pl-h1',
      subject: 'arithmetic',
      topic: 'profit-loss',
      name: 'Test Paper 1',
      source: 'PROFIT_AND_LOSS-1_one_question_per_page.pdf',
      file: 'data/arithmetic/profit-loss-h1.js',
      count: 25,
      marking: { correct: 1, wrong: 0 },
      isHandout: true
    },
    {
      id: 'pl-h2',
      subject: 'arithmetic',
      topic: 'profit-loss',
      name: 'Test Paper 2',
      source: 'PROFIT_AND_LOSS-2_one_question_per_page.pdf',
      file: 'data/arithmetic/profit-loss-h2.js',
      count: 19,
      marking: { correct: 1, wrong: 0 },
      isHandout: true
    }
  ]
};

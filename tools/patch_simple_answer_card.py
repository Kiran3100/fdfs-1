with open(r'd:\bp\js\app.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update tests.map in renderTopic
old_card_pattern = '''        ` : tests.map(t => {
          const wrongList = wrongIdsForTest(t.id);
          const qInfo = getTestQuestionInfo(t);
          const maxQ = qInfo.mainCount;
          return `
            <form class="card mb-4 test-config-form" data-testid="${esc(t.id)}" data-grouped="${qInfo.isGrouped ? '1' : '0'}">'''

new_card_pattern = '''        ` : tests.map(t => {
          if (t.isAnswerViewer) {
            return `
              <div class="card mb-4" style="border-left: 4px solid var(--brand-primary); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 14px; padding: 20px;">
                <div>
                  <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
                    <h3 style="margin:0; font-size:1.15rem;">${esc(t.name)}</h3>
                    <span class="badge badge-success">Visual Answers</span>
                  </div>
                  <p class="text-muted" style="margin:0; font-size:0.88rem;">
                    Browse all <b>${t.count} questions</b> in sequential order (1(A) to 45(A)) with verified step-by-step visual solutions.
                  </p>
                </div>
                <div>
                  <button type="button" class="btn btn-view-answers" data-testid="${esc(t.id)}" style="display:inline-flex; align-items:center; gap:8px; font-weight:700; padding:10px 18px;">
                    <span>📖</span> View Answers
                  </button>
                </div>
              </div>
            `;
          }
          const wrongList = wrongIdsForTest(t.id);
          const qInfo = getTestQuestionInfo(t);
          const maxQ = qInfo.mainCount;
          return `
            <form class="card mb-4 test-config-form" data-testid="${esc(t.id)}" data-grouped="${qInfo.isGrouped ? '1' : '0'}">'''

if old_card_pattern in text:
    text = text.replace(old_card_pattern, new_card_pattern)
    print('Card rendering updated!')
else:
    print('Failed to find old_card_pattern!')

# 2. Add click handler for btn-view-answers
old_submit_handler = '''    // Attach form submit handlers for standard Question Book tests'''
new_submit_handler = '''    // Attach click handler for simple Answer Viewer cards
    app.querySelectorAll('.btn-view-answers').forEach(btn => {
      btn.onclick = () => {
        const testId = btn.dataset.testid;
        const testConfig = C.tests.find(x => x.id === testId);
        if (!testConfig) return;
        startTest(testConfig, {
          from: 1,
          to: testConfig.count || 45,
          lim: 0,
          sq: false,
          so: false,
          isAnswerViewer: true
        });
      };
    });

    // Attach form submit handlers for standard Question Book tests'''

if old_submit_handler in text:
    text = text.replace(old_submit_handler, new_submit_handler)
    print('Click handler added!')
else:
    print('Failed to find old_submit_handler!')

# 3. In startTest mapping questions, retain ansImg
old_map = '''          sol: q.sol || '','''
new_map = '''          sol: q.sol || '',
          ansImg: q.ansImg || '', '''
if old_map in text:
    text = text.replace(old_map, new_map)
    print('ansImg mapping added to startTest!')
else:
    print('Failed to find old_map!')

# 4. In renderTest, display the answer image directly for isAnswerViewer
old_render_q = '''          <div class="question-text">
            ${renderFormattedQuestion(q.q)}
          </div>'''

new_render_q = '''          <div class="question-text">
            ${renderFormattedQuestion(q.q)}
          </div>

          ${(q.ansImg || (S.t && S.t.isAnswerViewer && q.img)) ? `
            <div class="q-image-container" style="margin-top:16px; background:#ffffff; border:1px solid var(--border-color); border-radius:var(--radius-md); padding:16px; text-align:center;">
              <div style="font-weight:700; color:var(--color-success); font-size:0.95rem; margin-bottom:10px; text-align:left; display:flex; align-items:center; gap:6px;">
                <span>💡</span> Step-by-Step Answer:
              </div>
              <img src="${esc(q.ansImg || q.img)}" alt="Question ${esc(q.n)} Answer" class="q-question-img" style="max-width:100%; height:auto; box-shadow:0 2px 8px rgba(0,0,0,0.06); border-radius:6px;" loading="lazy" />
            </div>
          ` : ''}'''

if old_render_q in text:
    text = text.replace(old_render_q, new_render_q)
    print('Answer image rendering added to renderTest!')
else:
    print('Failed to find old_render_q!')

with open(r'd:\bp\js\app.js', 'w', encoding='utf-8') as f:
    f.write(text)

with open(r'd:\bp\app.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('Both js/app.js and app.js updated successfully!')

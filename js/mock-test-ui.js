// Arithmetic Mock Tests Module Controller
// Window namespace: window.MockTestUI

window.MockTestUI = (function() {
  'use strict';

  const Engine = window.MockTestEngine;
  const app = document.getElementById('app');
  const dlg = document.getElementById('dlg');
  const LET = 'ABCDE';

  // Active state for mock test taking
  let mockState = null;
  let mockTimerInterval = null;

  // Selected chapters in configuration
  let selectedChapters = new Set(['percentages', 'profit-loss', 'ratio-proportion']);
  let activeResultFilter = 'All'; // sensible defaults

  // Helper dialog
  function showConfirmModal(msg, title) {
    return new Promise(resolve => {
      dlg.innerHTML = `
        <div style="font-family:inherit;">
          ${title ? `<h3 style="margin:0 0 12px;font-size:1.1rem;color:var(--text-primary);">${title}</h3>` : ''}
          <p style="margin:0 0 20px;color:var(--text-secondary,#555);line-height:1.5;font-size:0.95rem;">${msg}</p>
          <div style="display:flex;justify-content:flex-end;gap:10px;">
            <button id="_dlg_mock_cancel" class="btn sm" style="background:var(--bg-muted,#f1f5f9);color:var(--text-primary,#333);min-width:80px;">Cancel</button>
            <button id="_dlg_mock_ok" class="btn sm" style="min-width:80px;">Confirm</button>
          </div>
        </div>`;
      dlg.showModal();
      const okBtn = dlg.querySelector('#_dlg_mock_ok');
      const cancelBtn = dlg.querySelector('#_dlg_mock_cancel');
      if (okBtn) okBtn.onclick = () => { dlg.close(); resolve(true); };
      if (cancelBtn) cancelBtn.onclick = () => { dlg.close(); resolve(false); };
      dlg.onclick = (e) => { if (e.target === dlg) { dlg.close(); resolve(false); } };
    });
  }

  function showAlertModal(msg, title) {
    return new Promise(resolve => {
      dlg.innerHTML = `
        <div style="font-family:inherit;">
          ${title ? `<h3 style="margin:0 0 12px;font-size:1.1rem;color:var(--text-primary);">${title}</h3>` : ''}
          <p style="margin:0 0 20px;color:var(--text-secondary,#555);line-height:1.5;font-size:0.95rem;">${msg}</p>
          <div style="display:flex;justify-content:flex-end;">
            <button id="_dlg_mock_ok" class="btn sm" style="min-width:80px;">OK</button>
          </div>
        </div>`;
      dlg.showModal();
      const okBtn = dlg.querySelector('#_dlg_mock_ok');
      if (okBtn) okBtn.onclick = () => { dlg.close(); resolve(); };
      dlg.onclick = (e) => { if (e.target === dlg) { dlg.close(); resolve(); } };
    });
  }

  const pad = n => String(n).padStart(2, '0');
  const fmtTime = s => {
    s = Math.max(0, Math.round(s));
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return pad(m) + ':' + pad(sec);
  };

  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));

  // --------------------------------------------------------------------------
  // SUB-NAV TABS COMPONENT
  // --------------------------------------------------------------------------
  function renderSubNav(activeTab) {
    return `
      <div class="mock-test-header mb-4">
        <div class="flex-between" style="align-items:flex-start; margin-bottom:12px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px;">
              <span style="font-size:1.4rem;">🎯</span>
              <h1 style="margin:0; font-size:1.6rem; font-weight:800; letter-spacing:-0.02em;">Arithmetic Mock Tests</h1>
            </div>
            <p style="color:var(--text-muted); margin:4px 0 0; font-size:0.92rem;">
              Create customized, model-aware practice tests without duplicate question models.
            </p>
          </div>
          <div style="display:flex; gap:8px;">
            <a href="#/mock-tests/history" class="btn sm alt" style="text-decoration:none;">
              <span>📈</span> Test Results / History
            </a>
          </div>
        </div>

        <div class="mock-sub-tabs">
          <a href="#/mock-tests/select" class="mock-tab-link ${activeTab === 'select' ? 'active' : ''}">
            <span class="tab-step">1</span> Chapter Selection
          </a>
          <a href="#/mock-tests/configure" class="mock-tab-link ${activeTab === 'configure' ? 'active' : ''}">
            <span class="tab-step">2</span> Configure Test
          </a>
          <a href="#/mock-tests/history" class="mock-tab-link ${activeTab === 'history' ? 'active' : ''}">
            <span class="tab-step">3</span> Test Results / History
          </a>
        </div>
      </div>
    `;
  }

  // --------------------------------------------------------------------------
  // 1. CHAPTER SELECTION VIEW
  // --------------------------------------------------------------------------
  async function renderChapterSelection() {
    window.scrollTo(0, 0);
    document.body.classList.remove('exam-mode');

    app.innerHTML = `
      ${renderSubNav('select')}
      <div class="card" style="padding:40px; text-align:center;">
        <div class="spinner" style="margin:0 auto 16px;"></div>
        <p style="color:var(--text-secondary); font-size:1rem;">Loading Arithmetic chapters and question models…</p>
      </div>
    `;

    try {
      const chapters = await Engine.loadAllArithmeticChapters();

      // Filter available chapters (with tests loaded)
      const availableChapters = chapters.filter(c => c.isAvailable);
      const unavailableChapters = chapters.filter(c => !c.isAvailable);

      function updateUI() {
        const selCount = selectedChapters.size;
        const totalAvailUniqueModels = availableChapters
          .filter(c => selectedChapters.has(c.topicId))
          .reduce((sum, c) => sum + c.uniqueModelCount, 0);

        const countBadge = document.getElementById('selected-count-badge');
        if (countBadge) countBadge.textContent = `${selCount} selected (${totalAvailUniqueModels} models)`;

        const btnConfig = document.getElementById('btn-goto-config');
        if (btnConfig) {
          btnConfig.disabled = selCount === 0;
          if (selCount === 0) {
            btnConfig.style.opacity = '0.5';
            btnConfig.style.cursor = 'not-allowed';
          } else {
            btnConfig.style.opacity = '1';
            btnConfig.style.cursor = 'pointer';
          }
        }
      }

      let cardsHtml = availableChapters.map(ch => {
        const isChecked = selectedChapters.has(ch.topicId);
        return `
          <div class="mock-chapter-card ${isChecked ? 'selected' : ''}" data-topic-id="${ch.topicId}">
            <div class="mock-card-header">
              <span class="mock-ch-number">Chapter ${ch.topicNum}</span>
              <input type="checkbox" class="mock-ch-checkbox" data-topic-id="${ch.topicId}" ${isChecked ? 'checked' : ''}>
            </div>
            <h3 class="mock-ch-title">${esc(ch.topicName)}</h3>
            <div class="mock-ch-category">${esc(ch.category || 'Arithmetic')}</div>
            <div class="mock-ch-stats">
              <div class="mock-stat-item">
                <span class="mock-stat-val">${ch.totalQuestions}</span>
                <span class="mock-stat-lbl">Questions</span>
              </div>
              <div class="mock-stat-divider"></div>
              <div class="mock-stat-item">
                <span class="mock-stat-val">${ch.uniqueModelCount}</span>
                <span class="mock-stat-lbl">Unique Models</span>
              </div>
            </div>
          </div>
        `;
      }).join('');

      let unavailHtml = '';
      if (unavailableChapters.length > 0) {
        unavailHtml = `
          <div style="margin-top:24px; padding:16px; background:var(--bg-subtle,#f8fafc); border-radius:var(--radius-md); border:1px dashed var(--border-color);">
            <div style="font-size:0.85rem; color:var(--text-muted); font-weight:600; margin-bottom:4px;">
              Coming Soon in Syllabus (${unavailableChapters.length} Chapters)
            </div>
            <div style="font-size:0.82rem; color:var(--text-secondary);">
              ${unavailableChapters.map(c => esc(c.topicName)).join(' &middot; ')}
            </div>
          </div>
        `;
      }

      app.innerHTML = `
        ${renderSubNav('select')}

        <div class="card mb-4">
          <div class="flex-between" style="flex-wrap:wrap; gap:14px;">
            <div style="display:flex; align-items:center; gap:12px; flex-wrap:wrap;">
              <button class="btn sm alt" id="btn-select-all">Select All</button>
              <button class="btn sm alt" id="btn-clear-selection">Clear Selection</button>
              <span class="badge badge-primary" id="selected-count-badge" style="font-size:0.9rem; padding:6px 12px;">
                ${selectedChapters.size} selected
              </span>
            </div>

            <button class="btn" id="btn-goto-config" style="display:flex; align-items:center; gap:8px;">
              <span>Configure Test</span> &rarr;
            </button>
          </div>
        </div>

        <div class="mock-chapters-grid">
          ${cardsHtml}
        </div>

        ${unavailHtml}
      `;

      updateUI();

      // Card click handling
      app.querySelectorAll('.mock-chapter-card').forEach(card => {
        card.onclick = (e) => {
          if (e.target.tagName.toLowerCase() === 'input') return; // checkbox handles itself
          const topicId = card.dataset.topicId;
          const chk = card.querySelector('.mock-ch-checkbox');
          if (selectedChapters.has(topicId)) {
            selectedChapters.delete(topicId);
            card.classList.remove('selected');
            if (chk) chk.checked = false;
          } else {
            selectedChapters.add(topicId);
            card.classList.add('selected');
            if (chk) chk.checked = true;
          }
          updateUI();
        };
      });

      // Checkbox click handling
      app.querySelectorAll('.mock-ch-checkbox').forEach(chk => {
        chk.onchange = (e) => {
          const topicId = chk.dataset.topicId;
          const card = app.querySelector(`.mock-chapter-card[data-topic-id="${topicId}"]`);
          if (chk.checked) {
            selectedChapters.add(topicId);
            if (card) card.classList.add('selected');
          } else {
            selectedChapters.delete(topicId);
            if (card) card.classList.remove('selected');
          }
          updateUI();
        };
      });

      // Select all button
      const selAllBtn = document.getElementById('btn-select-all');
      if (selAllBtn) {
        selAllBtn.onclick = () => {
          availableChapters.forEach(c => selectedChapters.add(c.topicId));
          app.querySelectorAll('.mock-chapter-card').forEach(card => card.classList.add('selected'));
          app.querySelectorAll('.mock-ch-checkbox').forEach(chk => { chk.checked = true; });
          updateUI();
        };
      }

      // Clear selection button
      const clearBtn = document.getElementById('btn-clear-selection');
      if (clearBtn) {
        clearBtn.onclick = () => {
          selectedChapters.clear();
          app.querySelectorAll('.mock-chapter-card').forEach(card => card.classList.remove('selected'));
          app.querySelectorAll('.mock-ch-checkbox').forEach(chk => { chk.checked = false; });
          updateUI();
        };
      }

      // Goto configure
      const gotoConfigBtn = document.getElementById('btn-goto-config');
      if (gotoConfigBtn) {
        gotoConfigBtn.onclick = () => {
          if (selectedChapters.size === 0) return;
          location.hash = '#/mock-tests/configure';
        };
      }

    } catch (err) {
      console.error(err);
      app.innerHTML = `
        ${renderSubNav('select')}
        <div class="card" style="padding:30px; color:var(--color-danger);">
          <h3>Error loading arithmetic chapters</h3>
          <p>${esc(err.message)}</p>
          <button class="btn sm" onclick="location.reload()">Retry</button>
        </div>
      `;
    }
  }

  // --------------------------------------------------------------------------
  // 2. TEST CONFIGURATION VIEW
  // --------------------------------------------------------------------------
  async function renderTestConfiguration() {
    window.scrollTo(0, 0);
    document.body.classList.remove('exam-mode');

    if (selectedChapters.size === 0) {
      location.hash = '#/mock-tests/select';
      return;
    }

    app.innerHTML = `
      ${renderSubNav('configure')}
      <div class="card" style="padding:40px; text-align:center;">
        <div class="spinner" style="margin:0 auto 16px;"></div>
        <p style="color:var(--text-secondary); font-size:1rem;">Calculating available unique models for selected chapters…</p>
      </div>
    `;

    try {
      const allTopics = Engine.getArithmeticTopics();
      const selectedTopics = allTopics.filter(t => selectedChapters.has(t.id));
      const chapterDataList = await Promise.all(selectedTopics.map(t => Engine.getChapterModelData(t)));

      // Collect total unique models
      let totalEligibleModels = 0;
      chapterDataList.forEach(ch => {
        totalEligibleModels += ch.uniqueModelCount;
      });

      // Default configuration values
      let currentQCount = Math.min(35, totalEligibleModels);
      let currentDuration = 20;

      function renderConfigForm() {
        // Validation check
        const isCountExceeded = currentQCount > totalEligibleModels;
        const isValid = !isCountExceeded && currentQCount > 0 && currentDuration > 0;

        app.innerHTML = `
          ${renderSubNav('configure')}

          <div style="display:grid; grid-template-columns: 1fr 340px; gap:24px; align-items:start;">
            <!-- Left: Settings Card -->
            <div class="card">
              <h2 style="margin:0 0 16px; font-size:1.25rem;">Mock Test Settings</h2>

              <!-- Presets -->
              <div style="margin-bottom:24px;">
                <label style="display:block; font-weight:600; font-size:0.9rem; margin-bottom:8px; color:var(--text-primary);">
                  Quick Standard Presets
                </label>
                <div style="display:flex; gap:10px; flex-wrap:wrap;">
                  <button class="btn sm ${currentQCount === 20 && currentDuration === 10 ? '' : 'alt'} preset-btn" data-q="20" data-d="10">
                    ⚡ 20 Questions &middot; 10 Mins
                  </button>
                  <button class="btn sm ${currentQCount === 35 && currentDuration === 20 ? '' : 'alt'} preset-btn" data-q="35" data-d="20">
                    🏆 35 Questions &middot; 20 Mins (Standard)
                  </button>
                  <button class="btn sm ${currentQCount === 50 && currentDuration === 30 ? '' : 'alt'} preset-btn" data-q="50" data-d="30">
                    🔥 50 Questions &middot; 30 Mins
                  </button>
                </div>
              </div>

              <!-- Custom Count & Duration -->
              <div style="display:grid; grid-template-columns: 1fr 1fr; gap:16px; margin-bottom:20px;">
                <div>
                  <label for="input-q-count" style="display:block; font-weight:600; font-size:0.9rem; margin-bottom:6px;">
                    Total Questions
                  </label>
                  <input type="number" id="input-q-count" class="input" style="width:100%; font-size:1.1rem; font-weight:700;" value="${currentQCount}" min="1" max="${totalEligibleModels}">
                  <span class="text-muted text-sm">Available unique models: <b>${totalEligibleModels}</b></span>
                </div>
                <div>
                  <label for="input-duration" style="display:block; font-weight:600; font-size:0.9rem; margin-bottom:6px;">
                    Duration (Minutes)
                  </label>
                  <input type="number" id="input-duration" class="input" style="width:100%; font-size:1.1rem; font-weight:700;" value="${currentDuration}" min="1" max="180">
                  <span class="text-muted text-sm">Timer will count down from ${currentDuration}m</span>
                </div>
              </div>

              <!-- Validation message if insufficient models -->
              ${isCountExceeded ? `
                <div style="padding:14px; background:var(--color-danger-bg,#fee2e2); border:1px solid var(--color-danger,#ef4444); border-radius:var(--radius-md); color:var(--color-danger,#b91c1c); margin-bottom:20px; font-size:0.92rem; line-height:1.4;">
                  ⚠️ <b>Insufficient Question Models:</b> Only <b>${totalEligibleModels}</b> unique question models are available for the selected chapters. Please select more chapters or reduce the number of questions to ${totalEligibleModels} or less.
                </div>
              ` : `
                <div style="padding:12px 16px; background:var(--bg-secondary,var(--bg-tertiary,#1f2937)); border-radius:var(--radius-md); margin-bottom:20px; font-size:0.88rem; color:var(--text-secondary);">
                  🛡️ <b>Model Uniqueness Guaranteed:</b> The generator will choose at most ONE question variant (e.g. Model 1A, 1B, 1C, or 1D) from each question model. Duplicate models will never appear.
                </div>
              `}

              <!-- Start Button -->
              <div style="display:flex; justify-content:space-between; align-items:center; border-top:1px solid var(--border-color); padding-top:18px;">
                <a href="#/mock-tests/select" class="btn sm alt">&larr; Back to Chapters</a>
                <button class="btn" id="btn-start-mock" style="font-size:1.05rem; padding:10px 24px; font-weight:700;">
                  🚀 Start Mock Test
                </button>
              </div>
            </div>

            <!-- Right: Selected Chapters Summary -->
            <div class="card">
              <div class="flex-between mb-2">
                <h3 style="margin:0; font-size:1.05rem;">Selected Chapters</h3>
                <span class="badge badge-primary">${selectedChapters.size}</span>
              </div>
              <p class="text-muted text-sm mb-4">Questions will be balanced across these chapters:</p>

              <div style="max-height:360px; overflow-y:auto; display:flex; flex-direction:column; gap:8px;">
                ${chapterDataList.map(ch => `
                  <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 10px; background:var(--bg-secondary,var(--bg-surface)); border-radius:var(--radius-sm); border:1px solid var(--border-color); font-size:0.88rem;">
                    <div>
                      <div style="font-weight:600; color:var(--text-primary);">${esc(ch.topicName)}</div>
                      <div style="font-size:0.75rem; color:var(--text-muted);">${ch.uniqueModelCount} models available</div>
                    </div>
                    <span class="badge" style="font-size:0.75rem;">Ch ${ch.topicNum}</span>
                  </div>
                `).join('')}
              </div>

              <div style="margin-top:16px; padding-top:12px; border-top:1px solid var(--border-color); text-align:center;">
                <a href="#/mock-tests/select" style="font-size:0.85rem; color:var(--brand-primary); text-decoration:none; font-weight:600;">
                  + Add or remove chapters
                </a>
              </div>
            </div>
          </div>
        `;

        // Event bindings
        app.querySelectorAll('.preset-btn').forEach(btn => {
          btn.onclick = () => {
            currentQCount = +btn.dataset.q;
            currentDuration = +btn.dataset.d;
            renderConfigForm();
          };
        });

        const qInput = document.getElementById('input-q-count');
        if (qInput) {
          qInput.oninput = () => {
            currentQCount = parseInt(qInput.value, 10) || 0;
            const startBtn = document.getElementById('btn-start-mock');
            if (currentQCount > totalEligibleModels || currentQCount <= 0) {
              if (startBtn) {
                startBtn.disabled = true;
                startBtn.style.opacity = '0.5';
                startBtn.style.cursor = 'not-allowed';
              }
            } else {
              if (startBtn) {
                startBtn.disabled = false;
                startBtn.style.opacity = '1';
                startBtn.style.cursor = 'pointer';
              }
            }
          };
        }

        const durInput = document.getElementById('input-duration');
        if (durInput) {
          durInput.oninput = () => {
            currentDuration = parseInt(durInput.value, 10) || 1;
          };
        }

        const startBtn = document.getElementById('btn-start-mock');
        if (startBtn) {
          startBtn.onclick = async (e) => {
            if (e) e.preventDefault();
            const finalQCount = parseInt(document.getElementById('input-q-count')?.value, 10) || currentQCount;
            const finalDuration = parseInt(document.getElementById('input-duration')?.value, 10) || currentDuration;

            if (finalQCount > totalEligibleModels) {
              await showAlertModal(
                `Only ${totalEligibleModels} unique question models are available for the selected chapters. Please select more chapters or reduce the number of questions.`,
                'Insufficient Models'
              );
              return;
            }
            if (finalQCount <= 0 || finalDuration <= 0) {
              await showAlertModal('Please enter a valid question count and test duration.', 'Invalid Settings');
              return;
            }
            startBtn.disabled = true;
            startBtn.textContent = '⏳ Preparing Test…';
            startMockExecution(Array.from(selectedChapters), finalQCount, finalDuration);
          };
        }
      }

      renderConfigForm();

    } catch (err) {
      console.error(err);
      app.innerHTML = `
        ${renderSubNav('configure')}
        <div class="card" style="padding:30px; color:var(--color-danger);">
          <h3>Error loading configuration</h3>
          <p>${esc(err.message)}</p>
          <button class="btn sm" onclick="location.hash='#/mock-tests/select'">Back to Chapters</button>
        </div>
      `;
    }
  }

  // --------------------------------------------------------------------------
  // 3. MOCK TEST EXECUTION (Examination Interface)
  // --------------------------------------------------------------------------
  async function startMockExecution(chapterIds, totalQuestions, durationMinutes) {
    try {
      app.innerHTML = `
        <div class="card" style="padding:60px 40px; text-align:center; max-width:600px; margin:40px auto;">
          <div class="spinner" style="margin:0 auto 20px;"></div>
          <h2 style="margin:0 0 8px; font-size:1.3rem;">Generating Customized Mock Test…</h2>
          <p style="color:var(--text-secondary); font-size:0.95rem; margin:0 0 16px;">
            Checking model-wise duplicate prevention &amp; balancing questions across chapters…
          </p>
        </div>
      `;

      const testAttempt = await Engine.generateMockTest(chapterIds, totalQuestions, durationMinutes);

      mockState = {
        attempt: testAttempt,
        currentIndex: 0,
        elapsedSeconds: 0,
        remainingSeconds: durationMinutes * 60,
        isPaused: false,
        showElapsed: true,
        startTime: Date.now()
      };

      // Set up timer
      clearInterval(mockTimerInterval);
      mockTimerInterval = setInterval(mockTick, 1000);

      // Save ongoing attempt to prevent loss
      saveSessionState();

      // Update hash and immediately render examination interface
      location.hash = '#/mock-tests/active';
      renderMockExamInterface();

    } catch (err) {
      await showAlertModal(err.message, 'Generation Error');
      location.hash = '#/mock-tests/configure';
    }
  }

  function mockTick() {
    if (!mockState || mockState.isPaused) return;

    mockState.elapsedSeconds++;
    mockState.remainingSeconds = Math.max(0, mockState.attempt.durationSeconds - mockState.elapsedSeconds);

    // Track active question timing
    const currentQ = mockState.attempt.questions[mockState.currentIndex];
    if (currentQ) {
      currentQ.timeSpentSeconds = (currentQ.timeSpentSeconds || 0) + 1;
    }

    // Update timer display
    const timerBadge = document.getElementById('test-overall-timer') || document.getElementById('mock-timer-display');
    if (timerBadge && !mockState.isPaused) {
      const timeStr = mockState.showElapsed !== false
        ? `Elapsed: ${fmtTime(mockState.elapsedSeconds)}`
        : `Time Left: ${fmtTime(mockState.remainingSeconds)}`;
      timerBadge.textContent = timeStr;
      if (mockState.remainingSeconds <= 300 && mockState.showElapsed === false) {
        timerBadge.classList.add('urgent');
      } else {
        timerBadge.classList.remove('urgent');
      }
    }

    // Time expired: auto-submit!
    if (mockState.remainingSeconds <= 0) {
      clearInterval(mockTimerInterval);
      showAlertModal('⏰ Time limit reached! Submitting your mock test now…', 'Time Up')
        .then(() => submitMockTest(true));
    }
  }

  function toggleMockPause(forceState) {
    if (!mockState) return;
    const shouldPause = forceState !== undefined ? forceState : !mockState.isPaused;
    mockState.isPaused = shouldPause;

    const pauseBtn = document.getElementById('btn-pause-test');
    const timerBadge = document.getElementById('test-overall-timer');
    const qPane = document.querySelector('.mock-question-pane');

    if (mockState.isPaused) {
      if (pauseBtn) {
        pauseBtn.innerHTML = '▶️ Resume';
        pauseBtn.classList.remove('alt');
        pauseBtn.style.background = '#10b981';
        pauseBtn.style.borderColor = '#059669';
        pauseBtn.style.color = '#ffffff';
        pauseBtn.style.fontWeight = '700';
      }
      if (timerBadge) {
        timerBadge.classList.add('paused');
        const curVal = mockState.showElapsed !== false ? fmtTime(mockState.elapsedSeconds) : fmtTime(mockState.remainingSeconds);
        timerBadge.innerHTML = `⏸️ PAUSED &middot; ${curVal}`;
      }
      if (qPane) {
        qPane.style.filter = 'blur(5px)';
        qPane.style.pointerEvents = 'none';
        qPane.style.userSelect = 'none';
      }
    } else {
      if (pauseBtn) {
        pauseBtn.innerHTML = '⏸️ Pause';
        pauseBtn.classList.add('alt');
        pauseBtn.style.background = '';
        pauseBtn.style.borderColor = '';
        pauseBtn.style.color = '';
        pauseBtn.style.fontWeight = '';
      }
      if (timerBadge) {
        timerBadge.classList.remove('paused');
        const curVal = mockState.showElapsed !== false ? `Elapsed: ${fmtTime(mockState.elapsedSeconds)}` : `Time Left: ${fmtTime(mockState.remainingSeconds)}`;
        timerBadge.textContent = curVal;
      }
      if (qPane) {
        qPane.style.filter = '';
        qPane.style.pointerEvents = '';
        qPane.style.userSelect = '';
      }
    }
    saveSessionState();
  }

  function saveSessionState() {
    try {
      if (mockState && mockState.attempt) {
        sessionStorage.setItem('bankprep.active_mock_test', JSON.stringify({
          attempt: mockState.attempt,
          currentIndex: mockState.currentIndex,
          elapsedSeconds: mockState.elapsedSeconds,
          remainingSeconds: mockState.remainingSeconds,
          isPaused: !!mockState.isPaused,
          showElapsed: mockState.showElapsed !== false
        }));
      }
    } catch (e) {}
  }

  function restoreSessionState() {
    try {
      const data = sessionStorage.getItem('bankprep.active_mock_test');
      if (data) {
        const parsed = JSON.parse(data);
        if (parsed && parsed.attempt && parsed.remainingSeconds > 0) {
          mockState = parsed;
          if (mockState.isPaused == null) mockState.isPaused = false;
          if (mockState.showElapsed == null) mockState.showElapsed = true;
          clearInterval(mockTimerInterval);
          mockTimerInterval = setInterval(mockTick, 1000);
          return true;
        }
      }
    } catch (e) {}
    return false;
  }

  function renderMockExamInterface() {
    if (!mockState || !mockState.attempt) {
      if (!restoreSessionState()) {
        location.hash = '#/mock-tests/select';
        return;
      }
    }

    window.scrollTo(0, 0);
    document.body.classList.add('exam-mode'); // Indian banking exam full-focus mode

    const attempt = mockState.attempt;
    const questions = attempt.questions;
    const curIdx = mockState.currentIndex;
    const q = questions[curIdx];

    // Mark current question as visited if not visited
    if (q.status === 'not_visited') {
      q.status = 'not_answered';
    }

    // Calculate palette counts
    let answeredCount = 0;
    let notAnsweredCount = 0;
    let markedCount = 0;
    let markedAnsweredCount = 0;
    let notVisitedCount = 0;

    questions.forEach(item => {
      if (item.status === 'answered') answeredCount++;
      else if (item.status === 'marked_for_review') markedCount++;
      else if (item.status === 'answered_marked_for_review') markedAnsweredCount++;
      else if (item.status === 'not_visited') notVisitedCount++;
      else notAnsweredCount++;
    });

    const isFirstQ = curIdx === 0;
    const isLastQ = curIdx === questions.length - 1;

    const testTitle = (attempt.selectedChapterNames && attempt.selectedChapterNames.length === 1)
      ? `${attempt.selectedChapterNames[0]} - Mock Test`
      : `${q.chapterName || 'Arithmetic'} - Mock Test`;

    const timerText = mockState.isPaused
      ? `⏸️ PAUSED &middot; ${fmtTime(mockState.showElapsed !== false ? mockState.elapsedSeconds : mockState.remainingSeconds)}`
      : (mockState.showElapsed !== false ? `Elapsed: ${fmtTime(mockState.elapsedSeconds)}` : `Time Left: ${fmtTime(mockState.remainingSeconds)}`);

    app.innerHTML = `
      <!-- Top Test Bar (Exact Question Book Pattern: Title, Q# · Item X of Y, Elapsed/Time Left, Pause, Exit, Submit Test) -->
      <div style="max-width:1400px; margin:0 auto; padding:16px 20px 0;">
        <div class="test-top-bar" style="margin-bottom:0;">
          <div>
            <span style="font-weight:700; font-size:1.1rem; color:var(--text-primary);">${esc(testTitle)}</span>
            <span class="text-muted" style="margin-left:8px; font-size:0.9rem;">(Q${esc(q.displayLabel || (curIdx + 1))} &middot; Item ${curIdx + 1} of ${questions.length})</span>
          </div>

          <div style="display:flex; align-items:center; gap:14px;">
            <div class="test-timer-badge ${mockState.isPaused ? 'paused' : ''}" id="test-overall-timer" title="Click to toggle Elapsed / Time Left" style="cursor:pointer; user-select:none;">
              ${timerText}
            </div>
            <button class="btn ${mockState.isPaused ? '' : 'alt'} sm" id="btn-pause-test" style="${mockState.isPaused ? 'background:#10b981; border-color:#059669; color:#ffffff; font-weight:700;' : ''}>
              ${mockState.isPaused ? '▶️ Resume' : '⏸️ Pause'}
            </button>
            <button class="btn alt sm" id="btn-exit-test">Exit</button>
            <button class="btn sm" id="btn-submit-test">Submit Test</button>
          </div>
        </div>
      </div>

      <!-- Main Examination Area -->
      <div class="mock-exam-layout" style="padding-top:16px;">
        <!-- Center Left: Question Section -->
        <div class="mock-question-pane" style="${mockState.isPaused ? 'filter:blur(5px); pointer-events:none; user-select:none;' : ''}">
          <!-- Question Header info -->
          <div class="mock-question-header">
            <div style="display:flex; align-items:center; gap:10px; flex-wrap:wrap;">
              <span class="badge badge-primary" style="font-weight:700;">Q${esc(q.displayLabel || (curIdx + 1))}</span>
              <span class="mock-chapter-tag">${esc(q.chapterName)}</span>
              <span class="mock-q-badge">Item ${curIdx + 1} of ${questions.length}</span>
              <span class="badge" style="font-size:0.75rem; color:var(--text-muted);">Model: ${esc(q.modelGroupId)}</span>
            </div>
            <div style="font-size:0.85rem; color:var(--text-muted);">
              Marks: <b style="color:var(--color-success,#10b981);">+1.00</b> &middot; <span style="color:var(--text-muted);">0.00</span>
            </div>
          </div>
          <div class="mock-question-body">
            <div class="mock-q-text">${esc(q.questionText)}</div>

            <!-- Options -->
            <div class="mock-options-list">
              ${q.options.map((optText, oIdx) => {
                const isSelected = q.selectedAnswer === oIdx;
                return `
                  <label class="mock-option-label ${isSelected ? 'selected' : ''}">
                    <input type="radio" name="mock_option" value="${oIdx}" ${isSelected ? 'checked' : ''} class="mock-option-radio">
                    <span class="mock-option-letter">${LET[oIdx] || (oIdx + 1)}</span>
                    <span class="mock-option-content">${esc(optText)}</span>
                  </label>
                `;
              }).join('')}
            </div>
          </div>

          <!-- Bottom Action Buttons (Inspired by IBPS / TCS iON) -->
          <div class="mock-bottom-bar">
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <button class="btn sm alt" id="btn-mark-review">
                ${q.markedForReview ? '⭐ Unmark Review' : '🔖 Mark for Review'}
              </button>
              <button class="btn sm alt" id="btn-clear-response">
                🧹 Clear Response
              </button>
            </div>

            <div style="display:flex; gap:10px;">
              <button class="btn sm alt" id="btn-prev-question" ${isFirstQ ? 'disabled style="opacity:0.5; cursor:not-allowed;"' : ''}>
                &larr; Previous
              </button>
              <button class="btn sm" id="btn-next-question">
                ${isLastQ ? 'Save &amp; Finish &rarr;' : 'Save &amp; Next &rarr;'}
              </button>
            </div>
          </div>
        </div>

        <!-- Right Side: Question Navigation Palette (IBPS Style) -->
        <div class="mock-palette-pane">
          <div class="mock-palette-legend">
            <div class="legend-item"><span class="legend-dot answered"></span> Answered (${answeredCount})</div>
            <div class="legend-item"><span class="legend-dot not-answered"></span> Not Answered (${notAnsweredCount})</div>
            <div class="legend-item"><span class="legend-dot not-visited"></span> Not Visited (${notVisitedCount})</div>
            <div class="legend-item"><span class="legend-dot marked"></span> Marked for Review (${markedCount})</div>
            <div class="legend-item"><span class="legend-dot marked-answered"></span> Answered &amp; Marked (${markedAnsweredCount})</div>
          </div>

          <div class="mock-palette-title">
            <span>Question Palette</span>
            <span class="text-muted text-sm">${questions.length} Items</span>
          </div>

          <div class="mock-palette-grid">
            ${questions.map((item, idx) => {
              let statusClass = 'not-visited';
              if (item.status === 'answered') statusClass = 'answered';
              else if (item.status === 'marked_for_review') statusClass = 'marked';
              else if (item.status === 'answered_marked_for_review') statusClass = 'marked-answered';
              else if (item.status === 'not_answered') statusClass = 'not-answered';

              const isCurrent = idx === curIdx;

              return `
                <button class="mock-pal-btn ${statusClass} ${isCurrent ? 'current' : ''}" data-idx="${idx}" title="Q${idx + 1}: ${esc(item.chapterName)}">
                  ${idx + 1}
                </button>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    `;

    // Event bindings for options
    app.querySelectorAll('input[name="mock_option"]').forEach(radio => {
      radio.onchange = () => {
        const val = parseInt(radio.value, 10);
        q.selectedAnswer = val;
        if (q.markedForReview) {
          q.status = 'answered_marked_for_review';
        } else {
          q.status = 'answered';
        }
        saveSessionState();
        renderMockExamInterface();
      };
    });

    // Mark for review button
    const markBtn = document.getElementById('btn-mark-review');
    if (markBtn) {
      markBtn.onclick = () => {
        q.markedForReview = !q.markedForReview;
        if (q.markedForReview) {
          q.status = q.selectedAnswer != null ? 'answered_marked_for_review' : 'marked_for_review';
        } else {
          q.status = q.selectedAnswer != null ? 'answered' : 'not_answered';
        }
        saveSessionState();
        renderMockExamInterface();
      };
    }

    // Clear response
    const clearBtn = document.getElementById('btn-clear-response');
    if (clearBtn) {
      clearBtn.onclick = () => {
        q.selectedAnswer = null;
        if (q.markedForReview) {
          q.status = 'marked_for_review';
        } else {
          q.status = 'not_answered';
        }
        saveSessionState();
        renderMockExamInterface();
      };
    }

    // Previous question
    const prevBtn = document.getElementById('btn-prev-question');
    if (prevBtn && !isFirstQ) {
      prevBtn.onclick = () => {
        mockState.currentIndex = curIdx - 1;
        saveSessionState();
        renderMockExamInterface();
      };
    }

    // Next / Save & Next
    const nextBtn = document.getElementById('btn-next-question');
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (isLastQ) {
          // Confirm submission
          confirmAndSubmit();
        } else {
          mockState.currentIndex = curIdx + 1;
          saveSessionState();
          renderMockExamInterface();
        }
      };
    }

    // Palette direct jumps
    app.querySelectorAll('.mock-pal-btn').forEach(btn => {
      btn.onclick = () => {
        const targetIdx = parseInt(btn.dataset.idx, 10);
        if (!isNaN(targetIdx) && targetIdx >= 0 && targetIdx < questions.length) {
          mockState.currentIndex = targetIdx;
          saveSessionState();
          renderMockExamInterface();
        }
      };
    });

    // Pause button
    const pauseBtn = document.getElementById('btn-pause-test');
    if (pauseBtn) {
      pauseBtn.onclick = (e) => {
        e.preventDefault();
        toggleMockPause();
      };
    }

    // Timer badge toggle between Elapsed and Time Left
    const timerBadge = document.getElementById('test-overall-timer');
    if (timerBadge) {
      timerBadge.onclick = () => {
        mockState.showElapsed = (mockState.showElapsed === false) ? true : false;
        if (!mockState.isPaused) {
          timerBadge.textContent = mockState.showElapsed !== false ? `Elapsed: ${fmtTime(mockState.elapsedSeconds)}` : `Time Left: ${fmtTime(mockState.remainingSeconds)}`;
        }
        saveSessionState();
      };
    }

    // Exit test
    const exitBtn = document.getElementById('btn-exit-test');
    if (exitBtn) {
      exitBtn.onclick = () => {
        showConfirmModal('Are you sure you want to exit? Your ongoing mock test progress will not be saved.', 'Exit Mock Test?')
          .then(ok => {
            if (ok) {
              clearInterval(mockTimerInterval);
              try { sessionStorage.removeItem('bankprep.active_mock_test'); } catch (e) {}
              document.body.classList.remove('exam-mode');
              mockState = null;
              location.hash = '#/mock-tests/select';
            }
          });
      };
    }

    // Submit button in top bar
    const submitBtn = document.getElementById('btn-submit-test') || document.getElementById('btn-submit-mock-exam');
    if (submitBtn) {
      submitBtn.onclick = () => confirmAndSubmit();
    }
  }

  async function confirmAndSubmit() {
    if (!mockState || !mockState.attempt) return;
    const questions = mockState.attempt.questions;
    const answeredCount = questions.filter(q => q.selectedAnswer != null).length;
    const unattemptedCount = questions.length - answeredCount;

    const confirmed = await showConfirmModal(
      `You have answered <b>${answeredCount}</b> of <b>${questions.length}</b> questions.<br>${unattemptedCount > 0 ? `<span style="color:var(--color-warning,#d97706);">${unattemptedCount} questions are unattempted.</span><br>` : ''}Are you sure you want to finish and submit your mock test?`,
      'Submit Mock Test'
    );

    if (confirmed) {
      submitMockTest(false);
    }
  }

  function submitMockTest(isAutoSubmit) {
    if (!mockState || !mockState.attempt) return;

    clearInterval(mockTimerInterval);
    document.body.classList.remove('exam-mode');

    const totalTimeSpent = mockState.elapsedSeconds;
    const completedRecord = Engine.evaluateMockTest(mockState.attempt, totalTimeSpent);

    // Save record to persistent storage
    Engine.saveMockAttempt(completedRecord);

    // Clear session storage
    sessionStorage.removeItem('bankprep.active_mock_test');
    mockState = null;

    // Redirect to Result view
    location.hash = `#/mock-tests/result/${completedRecord.id}`;
  }

  // --------------------------------------------------------------------------
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

  function renderMockHistory() {
    window.scrollTo(0, 0);
    document.body.classList.remove('exam-mode');

    const attempts = Engine.getMockAttempts();

    let attemptsHtml = '';
    if (!attempts.length) {
      attemptsHtml = `
        <div class="card" style="padding:60px 20px; text-align:center;">
          <div style="font-size:3rem; margin-bottom:12px;">📊</div>
          <h3 style="margin:0 0 8px; color:var(--text-primary);">No Mock Tests Taken Yet</h3>
          <p style="color:var(--text-secondary); max-width:460px; margin:0 auto 20px; font-size:0.95rem;">
            Practice with custom Arithmetic mock tests. Each attempt generates a unique randomized question set with duplicate model prevention.
          </p>
          <a href="#/mock-tests/select" class="btn" style="font-weight:700; padding:10px 24px;">
            🚀 Create Your First Mock Test
          </a>
        </div>
      `;
    } else {
      attemptsHtml = `
        <div style="display:flex; flex-direction:column; gap:14px;">
          ${attempts.map((att, idx) => {
            const attemptNum = attempts.length - idx;
            return `
              <div class="card mock-history-card">
                <div class="mock-hist-left">
                  <div style="display:flex; align-items:center; gap:10px; margin-bottom:6px;">
                    <span class="badge badge-primary">Attempt #${attemptNum}</span>
                    <span style="font-weight:700; font-size:1.05rem; color:var(--text-primary);">
                      Arithmetic Mock Test
                    </span>
                    <span class="text-muted text-sm">&middot; ${new Date(att.submittedAt || att.ts).toLocaleString()}</span>
                  </div>
                  <div style="font-size:0.88rem; color:var(--text-secondary); margin-bottom:8px;">
                    <b>Chapters (${att.selectedChapterNames ? att.selectedChapterNames.length : 0}):</b>
                    ${att.selectedChapterNames ? att.selectedChapterNames.join(', ') : 'Arithmetic'}
                  </div>
                  <div style="display:flex; gap:16px; font-size:0.82rem; color:var(--text-muted);">
                    <span>Questions: <b>${att.total}</b></span>
                    <span>Duration: <b>${att.durationMinutes}m</b></span>
                    <span>Time Taken: <b>${fmtTime(att.timeSpentSeconds)}</b></span>
                  </div>
                </div>

                <div class="mock-hist-right">
                  <div style="text-align:right;">
                    <div style="font-size:1.35rem; font-weight:800; color:var(--brand-primary,#4f46e5);">
                      ${att.accuracy.toFixed(1)}%
                    </div>
                    <div style="font-size:0.85rem; font-weight:600; color:var(--text-secondary);">
                      Score: ${att.score} / ${att.maxScore}
                    </div>
                  </div>
                  <a href="#/mock-tests/result/${att.id}" class="btn sm alt" style="text-decoration:none; font-weight:600;">
                    View Results &rarr;
                  </a>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    app.innerHTML = `
      ${renderSubNav('history')}
      ${attemptsHtml}
    `;
  }

  // --------------------------------------------------------------------------
  // ROUTER DISPATCHER FOR MOCK TESTS
  // --------------------------------------------------------------------------
  function route(parts) {
    const subRoute = (parts[1] || 'select').toLowerCase();

    if (subRoute === 'select') {
      return renderChapterSelection();
    }
    if (subRoute === 'configure') {
      return renderTestConfiguration();
    }
    if (subRoute === 'active') {
      return renderMockExamInterface();
    }
    if (subRoute === 'result') {
      return renderMockResult(parts[2]);
    }
    if (subRoute === 'history') {
      return renderMockHistory();
    }

    // Default to chapter selection
    renderChapterSelection();
  }

  return {
    route,
    renderChapterSelection,
    renderTestConfiguration,
    renderMockExamInterface,
    renderMockResult,
    renderMockHistory
  };
})();

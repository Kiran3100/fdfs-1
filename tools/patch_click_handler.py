with open('js/mock-test-ui.js', 'r', encoding='utf-8') as f:
    code = f.read()

target = """        const startBtn = document.getElementById('btn-start-mock');
        if (startBtn) {
          startBtn.onclick = async () => {
            if (currentQCount > totalEligibleModels) {
              await showAlertModal(
                `Only ${totalEligibleModels} unique question models are available for the selected chapters. Please select more chapters or reduce the number of questions.`,
                'Insufficient Models'
              );
              return;
            }
            if (currentQCount <= 0 || currentDuration <= 0) {
              await showAlertModal('Please enter a valid question count and test duration.', 'Invalid Settings');
              return;
            }
            startMockExecution(Array.from(selectedChapters), currentQCount, currentDuration);
          };
        }"""

replacement = """        const startBtn = document.getElementById('btn-start-mock');
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
        }"""

if target in code:
    code = code.replace(target, replacement)
    with open('js/mock-test-ui.js', 'w', encoding='utf-8') as f:
        f.write(code)
    print("Enhanced start button click handler successfully!")
else:
    print("Target not found!")

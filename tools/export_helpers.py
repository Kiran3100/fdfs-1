with open('js/app.js', 'r', encoding='utf-8') as f:
    code = f.read()

target = '  function openQuestionReviewModal(row, benchmark) {'
replacement = '''  window.openQuestionReviewModal = openQuestionReviewModal;
  function openQuestionReviewModal(row, benchmark) {'''

target_excel = '  function exportAttemptToExcel(R) {'
replacement_excel = '''  window.exportAttemptToExcel = exportAttemptToExcel;
  function exportAttemptToExcel(R) {'''

code = code.replace(target, replacement)
code = code.replace(target_excel, replacement_excel)

with open('js/app.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Exported openQuestionReviewModal and exportAttemptToExcel to window!")

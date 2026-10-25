with open('js/mock-test-engine.js', 'r', encoding='utf-8') as f:
    code = f.read()

target = '''  function saveMockAttempt(record) {
    try {
      const list = getMockAttempts();
      const existingIdx = list.findIndex(item => item.id === record.id);
      if (existingIdx >= 0) {
        list[existingIdx] = record;
      } else {
        list.unshift(record);
      }
      localStorage.setItem(MOCK_STORAGE_KEY, JSON.stringify(list));
      return true;
    } catch (e) {
      console.warn('Error saving mock attempt:', e);
      return false;
    }
  }'''

replacement = '''  function saveMockAttempt(record) {
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
  }'''

code = code.replace(target, replacement)
with open('js/mock-test-engine.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated saveMockAttempt to sync with BankStorage!")

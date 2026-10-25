// Storage & Analytics Engine for Banking Exam Practice
// Synchronous local storage initial read + IndexedDB async persistence
window.BankStorage = (function() {
  const DB_NAME = 'BankExamPracticeDB';
  const DB_VERSION = 1;
  const STORE_ATTEMPTS = 'attempts';
  const STORE_SETTINGS = 'settings';
  const LS_KEY = 'bankprep.history.v1';

  let dbPromise = null;

  function openDB() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve) => {
      // In local file:// URLs, IndexedDB may be disabled or throw SecurityError
      try {
        if (!window.indexedDB) {
          return resolve(null);
        }
        const req = indexedDB.open(DB_NAME, DB_VERSION);
        req.onupgradeneeded = (e) => {
          try {
            const db = e.target.result;
            if (!db.objectStoreNames.contains(STORE_ATTEMPTS)) {
              const store = db.createObjectStore(STORE_ATTEMPTS, { keyPath: 'id' });
              store.createIndex('testId', 'testId', { unique: false });
              store.createIndex('topic', 'topic', { unique: false });
              store.createIndex('ts', 'ts', { unique: false });
            }
            if (!db.objectStoreNames.contains(STORE_SETTINGS)) {
              db.createObjectStore(STORE_SETTINGS, { keyPath: 'key' });
            }
          } catch (ex) {
            resolve(null);
          }
        };
        req.onsuccess = (e) => {
          try {
            resolve(req.result || (e && e.target ? e.target.result : null));
          } catch (_) {
            resolve(null);
          }
        };
        req.onerror = () => resolve(null);
        req.onblocked = () => resolve(null);
      } catch (err) {
        resolve(null);
      }
    });
    return dbPromise;
  }

  function getLSAttempts() {
    try {
      const data = localStorage.getItem(LS_KEY);
      let list = data ? JSON.parse(data) : [];
      let modified = false;
      list.forEach((item, idx) => {
        if (!item.id) {
          item.id = 'att_' + (item.ts ? new Date(item.ts).getTime() : Date.now()) + '_' + idx;
          modified = true;
        }
      });
      if (modified) {
        setLSAttempts(list);
      }
      return list;
    } catch (e) {
      return [];
    }
  }

  function setLSAttempts(arr) {
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(arr));
      return true;
    } catch (e) {
      console.warn('LocalStorage write error:', e);
      return false;
    }
  }

  // Get attempts synchronously or asynchronously without blocking
  function getAttemptsSync() {
    const list = getLSAttempts();
    list.sort((a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime());
    return list;
  }

  async function getAllAttempts() {
    const fallback = getAttemptsSync();
    try {
      // Timeout promise so UI NEVER hangs under file:// protocol
      const timeoutPromise = new Promise(res => setTimeout(() => res(null), 300));
      const db = await Promise.race([openDB(), timeoutPromise]);
      if (!db) return fallback;

      return new Promise((resolve) => {
        try {
          const tx = db.transaction(STORE_ATTEMPTS, 'readonly');
          const store = tx.objectStore(STORE_ATTEMPTS);
          const req = store.getAll();
          req.onsuccess = () => {
            let list = req.result || [];
            if (!list.length && fallback.length) {
              list = fallback;
              saveAllAttempts(fallback);
            }
            list.sort((a, b) => new Date(a.ts).getTime() - new Date(b.ts).getTime());
            resolve(list);
          };
          req.onerror = () => resolve(fallback);
        } catch (e) {
          resolve(fallback);
        }
      });
    } catch (err) {
      return fallback;
    }
  }

  async function saveAttempt(attempt) {
    if (!attempt.id) {
      attempt.id = 'att_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    }

    // Immediately persist to LocalStorage
    const all = getLSAttempts();
    const idx = all.findIndex(a => a.id === attempt.id || (a.ts === attempt.ts && a.testId === attempt.testId));
    if (idx >= 0) all[idx] = attempt;
    else all.push(attempt);
    setLSAttempts(all);

    // Also persist to IndexedDB asynchronously in background
    try {
      const db = await openDB();
      if (db) {
        const tx = db.transaction(STORE_ATTEMPTS, 'readwrite');
        tx.objectStore(STORE_ATTEMPTS).put(attempt);
      }
    } catch (e) {}

    return attempt.id;
  }

  async function saveAllAttempts(attempts) {
    setLSAttempts(attempts);
    try {
      const db = await openDB();
      if (db) {
        const tx = db.transaction(STORE_ATTEMPTS, 'readwrite');
        const store = tx.objectStore(STORE_ATTEMPTS);
        store.clear();
        attempts.forEach(a => {
          if (!a.id) a.id = 'att_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
          store.put(a);
        });
      }
    } catch (e) {}
  }

  async function deleteAttempt(id) {
    const all = getLSAttempts().filter(a => a.id !== id);
    setLSAttempts(all);
    try {
      const db = await openDB();
      if (db) {
        await new Promise((resolve) => {
          try {
            const tx = db.transaction(STORE_ATTEMPTS, 'readwrite');
            tx.oncomplete = () => resolve(true);
            tx.onerror = () => resolve(false);
            tx.onabort = () => resolve(false);
            tx.objectStore(STORE_ATTEMPTS).delete(id);
          } catch (e) {
            resolve(false);
          }
        });
      }
    } catch (e) {}
    return true;
  }

  async function clearAllData() {
    localStorage.removeItem(LS_KEY);
    try {
      const db = await openDB();
      if (db) {
        const tx = db.transaction([STORE_ATTEMPTS, STORE_SETTINGS], 'readwrite');
        tx.objectStore(STORE_ATTEMPTS).clear();
        tx.objectStore(STORE_SETTINGS).clear();
      }
    } catch (e) {}
  }

  return {
    getAttemptsSync,
    getAllAttempts,
    saveAttempt,
    saveAllAttempts,
    deleteAttempt,
    clearAllData
  };
})();

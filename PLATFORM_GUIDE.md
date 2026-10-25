# Modern Banking Exam Practice Platform & Advanced Analytics (BankPrep Pro)

## 📌 Overview
Your HTML-based banking exam platform has been upgraded into a **modern, responsive learning and analytics dashboard** inspired by premium banking exam preparation applications (SBI PO, IBPS PO, RRB, and Clerk).

All of your existing questions, options, original answer keys, warning flags, test configuration options, and Excel download functionality are **100% preserved**, while adding:
- Question-level millisecond/second time tracking and revisit logging.
- Multi-attempt historical speed comparison.
- Smart banking exam speed classification.
- Interactive SVG charts (accuracy donuts, time vs target benchmark bars, and cross-attempt trend lines).
- Personalized weakness diagnostics and data-driven improvement plans.
- IndexedDB + LocalStorage fallback persistent storage with JSON backup and restore.

---

## 🚀 How to Run the Platform
1. **Open the Application**:
   - Double-click [`index.html`](file:///c:/Users/kiran/Downloads/banking-practice%20(2)/bp/index.html) in Google Chrome, Microsoft Edge, or any modern web browser.
   - **No internet connection or local web server required.** Everything runs locally and offline.
2. **Take a Test**:
   - From the **Dashboard**, select either Arithmetic or Reasoning topics.
   - Available tests (e.g. **Percentages - Practice Test 1** with 180 questions or **Basic Mathematics - Foundation Test** with 20 questions) will display their question count and available options.
   - Customize question range (From Q to Q), optional time limit in minutes, and question/option shuffle.
   - Click **Start Test** or **Practise Past Mistakes** to solve previously missed questions.
3. **During the Test**:
   - The top bar displays overall elapsed time / remaining time, question counter, Pause/Resume, and Submit button.
   - The question box tracks **active time spent on the current question in seconds**, number of revisits, and target benchmark pace.
   - Mark questions for review (starred on palette), or jump to any question using the visual question palette on the right.
   - Keyboard shortcuts: `1-5` select options, `N` for Next question, `P` for Previous question.
   - Timing automatically pauses if you switch tabs or minimize the browser window.
4. **Detailed Post-Test Analysis**:
   - Immediate score, negative marking breakdown, accuracy percentage, and total active solving time.
   - **Personalized Improvement Plan**: Automatically analyzes your weakest topics and slowest questions, recommending specific techniques (e.g., fraction tables, speed drills, or accuracy checks).
   - **Answer Distribution Donut Chart** & **Question-Wise Time Bar Chart** with banking exam target line.
   - **Filterable Question Table**: Filter by Correct, Incorrect, Skipped, Slowest (>1.25x target), Speed Improved, or Speed Declined.
   - Click **Review** on any question to view its solution, historical attempts across all sessions, fastest personal time, and recommended action.
   - Download the enhanced **Excel Report** (.xlsx) with full analytical metrics.
5. **Attempt History & Backup/Restore**:
   - Click **Attempt History** on the sidebar to view your progress trend line over time.
   - Click **Settings & Backup** to export your complete session data to a JSON backup file or restore previously saved records.

---

## 📁 File Structure
- [`index.html`](file:///c:/Users/kiran/Downloads/banking-practice%20(2)/bp/index.html): Modern desktop sidebar & mobile responsive layout with Light/Dark mode switcher.
- [`css/modern.css`](file:///c:/Users/kiran/Downloads/banking-practice%20(2)/bp/css/modern.css): Design system with fintech color palettes, cards, badges, and responsive breakpoints.
- [`js/app.js`](file:///c:/Users/kiran/Downloads/banking-practice%20(2)/bp/js/app.js): Application routing, test runner, timer coordinator, and UI view renderer.
- [`js/storage.js`](file:///c:/Users/kiran/Downloads/banking-practice%20(2)/bp/js/storage.js): IndexedDB persistent storage manager with LocalStorage fallback and JSON import/export.
- [`js/analytics.js`](file:///c:/Users/kiran/Downloads/banking-practice%20(2)/bp/js/analytics.js): Banking exam speed classification engine, historical comparisons, and topic diagnosis.
- [`js/charts.js`](file:///c:/Users/kiran/Downloads/banking-practice%20(2)/bp/js/charts.js): Standalone SVG charting engine for donuts, target-line bar charts, and trend line graphs.
- [`data/config.js`](file:///c:/Users/kiran/Downloads/banking-practice%20(2)/bp/data/config.js): Topic and test catalog.
- [`data/arithmetic/percentages-1.js`](file:///c:/Users/kiran/Downloads/banking-practice%20(2)/bp/data/arithmetic/percentages-1.js): All 180 Percentages questions preserved with answer keys and source flags.
- [`data/arithmetic/basic-maths-1.js`](file:///c:/Users/kiran/Downloads/banking-practice%20(2)/bp/data/arithmetic/basic-maths-1.js): 20 verified Basic Mathematics test questions extracted from your PDF.

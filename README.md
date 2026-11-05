# BankPrep Pro — Modern Banking Exam Practice & Advanced Analytics Platform

> **BankPrep Pro** is an offline-first, client-side, zero-dependency web application designed for comprehensive preparation for competitive Indian banking examinations (SBI PO, IBPS PO, IBPS RRB Officer Scale I & Office Assistant / Clerk, RBI Assistant, and related tests).
>
> It features a test bank of **4,997+ verified questions**, custom mock test generators, speed calculation drills, daily micro-revision schedules, an interactive IBPS RRB preparation coach, rich SVG performance analytics, question revisit tracking, and full Excel export capabilities.

---

## 📑 Table of Contents

- [Key Highlights & Architecture](#-key-highlights--architecture)
- [System Architecture & Tech Stack](#-system-architecture--tech-stack)
- [Quick Start Guide](#-quick-start-guide)
- [Core Features & Modules](#-core-features--modules)
  - [1. Dashboard & Routing](#1-dashboard--routing)
  - [2. Topic Practice & Chapter Tests](#2-topic-practice--chapter-tests)
  - [3. Exam & Practice Runner](#3-exam--practice-runner)
  - [4. Custom Mock Test Suite Engine](#4-custom-mock-test-suite-engine)
  - [5. IBPS RRB Clerk / PO Coach](#5-ibps-rrb-clerk--po-coach)
  - [6. Speed Calculation Drill Module](#6-speed-calculation-drill-module)
  - [7. Daily Habit-Building Revision Engine](#7-daily-habit-building-revision-engine)
  - [8. Study Progress Matrix](#8-study-progress-matrix)
  - [9. Performance Analytics & Standalone SVG Charts](#9-performance-analytics--standalone-svg-charts)
  - [10. Storage, Backup & Excel Reports](#10-storage-backup--excel-reports)
- [Curriculum Breakdown](#-curriculum-breakdown)
  - [Arithmetic Aptitude (23 Topics / 25 Configured Sets)](#arithmetic-aptitude-23-topics--25-configured-sets)
  - [Reasoning Ability (19 Topics / 17 Configured Sets)](#reasoning-ability-19-topics--17-configured-sets)
- [Directory Structure](#-directory-structure)
- [Adding New Tests & Data Ingestion (Python Pipeline)](#-adding-new-tests--data-ingestion-python-pipeline)
- [Data Storage Schema](#-data-storage-schema)
- [Keyboard Shortcuts](#-keyboard-shortcuts)
- [Browser Compatibility & Privacy](#-browser-compatibility--privacy)

---

## 🌟 Key Highlights & Architecture

- **100% Offline & Serverless**: Runs completely in any modern web browser simply by opening `index.html`. No Node.js server, Python backend, database daemon, or internet access required.
- **Massive Content Catalog**: **42 pre-configured practice sets** comprising **4,997 questions** across Quantitative Aptitude (Arithmetic) and Reasoning Ability.
- **Millisecond-Precision Time & Revisit Tracking**: Tracks active solving time per question, detects tab-switching to auto-pause timers, counts revisit passes, and logs multi-attempt histories.
- **Smart Speed Benchmarking**: Evaluates your performance against realistic banking exam target times (e.g. 30s for simplification, 60s for word problems, 120s for multi-question puzzles).
- **Zero Heavy External Dependencies**: Custom-built pure JavaScript SVG charting engine (no Chart.js or D3 needed). Uses only [`vendor/xlsx.full.min.js`](file:///d:/bp/vendor/xlsx.full.min.js) for high-fidelity Excel report generation.
- **Fault-Tolerant Hybrid Storage**: Primary storage via browser `IndexedDB` with automatic fallback to `localStorage`, plus manual JSON backup/restore.

---

## 🛠 System Architecture & Tech Stack

| Layer | Implementation / Technologies |
|---|---|
| **Frontend Structure** | Pure Semantic HTML5 (`index.html`, `dashboard.html`), CSS Custom Properties (Theme variables) |
| **Styling & Design System** | Modern responsive CSS (`css/modern.css`, `css/style.css`, `css/mock-tests.css`, `css/progress-table.css`) with native Light & Dark mode support |
| **Routing & Core App** | Client-side Hash Router (`#/`, `#/subject/...`, `#/test/...`, `#/drill`, `#/daily-revision`, `#/ibps-coach`, etc.) managed in [`js/app.js`](file:///d:/bp/js/app.js) |
| **Data Visualization** | Handcrafted SVG renderer (`js/charts.js`) producing Donut Charts, Benchmark Bar Charts, and Attempt Trendlines |
| **Spreadsheet Generation** | SheetJS (`vendor/xlsx.full.min.js`) for comprehensive `.xlsx` exports with styling and question-level breakdowns |
| **Data Processing Pipeline** | Python 3 scripts in `tools/` with PDF-to-text parsers (`pdftotext`, `pdfplumber`, regex tokenizers) formatting questions into modular JS objects |

---

## 🚀 Quick Start Guide

### 1. Launching the App
1. Clone or download this project folder to your local storage.
2. Double-click [`index.html`](file:///d:/bp/index.html) in **Google Chrome**, **Microsoft Edge**, **Mozilla Firefox**, or **Brave**.
3. *That's it!* There is no installation command or server startup needed.

### 2. Optional: Running via a Local Web Server
If you prefer running via a local HTTP server:
```bash
# Using Python 3
python -m http.server 8000

# Or using npx
npx serve .
```
Then navigate to `http://localhost:8000` in your browser.

---

## 🔍 Core Features & Modules

### 1. Dashboard & Routing
- Single-page application architecture using standard hash-based routing (`#/` URLs).
- Responsive sidebar navigation with collapsible drawer on mobile devices.
- Persistent Light/Dark theme toggle stored in browser preferences.
- Quick stats overview displaying completed tests, average accuracy, total questions solved, and ongoing study streaks.

### 2. Topic Practice & Chapter Tests
- Individual practice sets for all key topics in Arithmetic and Reasoning.
- **Configurable Test Runs**:
  - Custom question ranges (e.g., solve Questions 20 to 50 instead of the entire set).
  - Optional countdown timer in minutes or open-ended untimed mode.
  - Question and option shuffling (Fisher-Yates shuffle algorithm).
  - **"Practise Past Mistakes" Mode**: Filters the test to only questions you previously marked wrong or skipped.

### 3. Exam & Practice Runner
- Real-time exam interface simulating competitive examination environments:
  - Top progress status bar: overall elapsed / remaining time, active question index, Pause/Resume, and Final Submit button.
  - Question viewport with typography optimized for mathematical formulas and puzzle tables.
  - Visual Question Palette on the right panel (Green = Answered, Red = Skipped/Visited, Purple = Marked for Review, Grey = Not Visited).
  - Direct keyboard shortcuts for speed (see [Keyboard Shortcuts](#-keyboard-shortcuts)).
  - Auto-pause when the browser window loses focus or tabs are switched.

### 4. Custom Mock Test Suite Engine (`js/mock-test-engine.js` & `js/mock-test-ui.js`)
- **Full Mini-Mocks & Sectional Tests**:
  - **Model Registry System**: Automatically categorizes questions by model variants (e.g., Model 1A vs Model 1B) to prevent duplicate question types in the same generated mock test.
  - Generates balanced 15, 20, 25, 30, or 40-question mock exams sampled across the curriculum according to banking exam blueprints.
  - Immediate score card with sectional speed breakdown and percentile diagnostics.

### 5. IBPS RRB Clerk / PO Coach (`js/ibps-coach.js`)
- Dedicated preparation assistant aligned with IBPS RRB (Office Assistant & Officer Scale I) timelines:
  - **Countdown Clock**: Live days-to-exam countdown.
  - **6-Day Mock Cycles**: Structured study roadmap alternating between high-yield quantitative topics (Simplification, Quadratic Equations, Missing Series) and reasoning topics (Inequalities, Direction Sense, Blood Relations).
  - Target score benchmarks, cutoff estimators, and weak-area alerts.

### 6. Speed Calculation Drill Module (`js/drill.js`)
- Comprehensive rapid calculation trainer designed to eliminate calculation bottlenecks:
  - **Multiplication Tables**: Practice tables from 1 to 30 in sequential or shuffled mode with customizable ranges.
  - **Squares (1–60) & Cubes (1–30)**: Flashcard memorization mode and active recall quizzes.
  - **Mental Addition & Subtraction**: Single-digit to multi-digit (2D+2D, 3D+3D, decimals, carry/borrow toggles) drills with customizable countdown timers per question or whole set.
  - **Fraction to Percentage Conversions**: Memorization sheets and drills covering fractions from $1/1$ through $1/30$.

### 7. Daily Habit-Building Revision Engine (`js/revision.js`)
- Micro-learning routine ensuring retention of critical mathematical constants:
  - Daily scheduled rotation of:
    - 1 Multiplication Table ($2 \dots 30$, omitting $10$).
    - 5 Squares (12-day complete cycle covering $1 \dots 60$).
    - 5 Cubes (12-day complete cycle covering $1 \dots 60$).
    - 5 Percentage-Fraction pairs (6-day complete cycle covering $1/1 \dots 1/30$).
  - Modal prompt with snoozing and completion checkmarks to maintain discipline.

### 8. Study Progress Matrix (`js/progress-table.js`)
- High-level curriculum syllabus checklist tracking:
  - Total question count per topic.
  - Completed questions and test attempts count.
  - Topic completion percentages and syllabus mastery score.

### 9. Performance Analytics & Standalone SVG Charts (`js/analytics.js` & `js/charts.js`)
- **Post-Test Diagnostics**:
  - Score card factoring in positive marks (+1) and standard negative marking (-0.25).
  - **Accuracy Donut Chart**: Breakdown of Correct, Incorrect, and Unattempted questions.
  - **Question-Wise Time Bar Chart**: Displays active time taken on each question with an overlay line for the banking target benchmark.
  - **Speed Classification**: Labels each response as *Fast & Accurate*, *Overtime*, *Rushed / Guessed*, or *Slow & Inaccurate*.
  - **Historical Comparison**: Compares your current attempt times with past attempts to flag *Speed Improved* or *Speed Declined*.
  - **Personalized Recommendations**: Automatically suggests target techniques (e.g. Vedic cross-multiplication, fraction tables) for question types with the highest time sinks.

### 10. Storage, Backup & Excel Reports
- **Persistent Storage** (`js/storage.js`): Uses IndexedDB with transparent LocalStorage fallback for seamless performance across sessions.
- **Data Export & Import**: Export full historical test attempt logs into a `.json` backup file; restore anytime.
- **Excel Report Download**: One-click generation of a multi-column `.xlsx` test report detailing:
  - Question ID & Sub-topic
  - Question Text & Options
  - Selected Answer vs Correct Key
  - Outcome (Correct / Incorrect / Skipped)
  - Time Spent (seconds) vs Target Benchmark
  - Revisit Count & Status Flags

---

## 📚 Curriculum Breakdown

The platform includes **42 verified test files** containing **4,997 total questions**.

### Quantitative Aptitude / Arithmetic (2,844 Questions)

| # | Topic | Questions | Source File |
|---|---|:---:|---|
| 1 | Basic Mathematics | 100 | `data/arithmetic/basic-maths-1.js` |
| 2 | Percentages (Main + Higher Sets) | 223 | `data/arithmetic/percentages-1.js`, `percentages-h1.js`, `percentages-h2.js` |
| 3 | Profit and Loss (Main + Higher Sets) | 204 | `data/arithmetic/profit-loss-1.js`, `profit-loss-h1.js`, `profit-loss-h2.js` |
| 4 | Simple Interest | 80 | `data/arithmetic/simple-interest-1.js` |
| 5 | Compound Interest | 80 | `data/arithmetic/compound-interest-1.js` |
| 6 | Ratio and Proportion | 140 | `data/arithmetic/ratio-proportion-1.js` |
| 7 | Partnership | 80 | `data/arithmetic/partnership-1.js` |
| 8 | Problems on Ages | 80 | `data/arithmetic/problems-on-ages-1.js` |
| 9 | Averages | 100 | `data/arithmetic/averages-1.js` |
| 10 | Mixtures and Allegations | 120 | `data/arithmetic/mixtures-allegations-1.js` |
| 11 | Time and Distance | 100 | `data/arithmetic/time-distance-1.js` |
| 12 | Trains | 100 | `data/arithmetic/trains-1.js` |
| 13 | Boats and Streams | 80 | `data/arithmetic/boats-streams-1.js` |
| 14 | Time and Work | 140 | `data/arithmetic/time-work-1.js` |
| 15 | Pipes and Cisterns | 60 | `data/arithmetic/pipes-cisterns-1.js` |
| 16 | Inequalities Comparison (Quadratic) | 32 | `data/arithmetic/inequalities-comparison-1.js` |
| 17 | Areas (Mensuration 2D) | 196 | `data/arithmetic/areas-1.js` |
| 18 | Volumes (Mensuration 3D) | 159 | `data/arithmetic/volumes-1.js` |
| 19 | LCM and HCF | 100 | `data/arithmetic/lcm-hcf-1.js` |
| 20 | Problems on Numbers | 140 | `data/arithmetic/problems-on-numbers-1.js` |
| 21 | Approximation & Simplification | 30 | `data/arithmetic/approximation-1.js` |
| 22 | Permutations and Combinations | *Syllabus listed* | *Ready for ingestion* |
| 23 | Probability | *Syllabus listed* | *Ready for ingestion* |

### Reasoning Ability (2,153 Questions)

| # | Topic | Questions | Source File |
|---|---|:---:|---|
| 1 | Missing Number Series | 300 | `data/reasoning/missing-number-series-1.js` |
| 2 | Wrong Number Series | 300 | `data/reasoning/wrong-number-series-1.js` |
| 3 | Problems Based on Alphabets | 200 | `data/reasoning/alphabets-1.js` |
| 4 | Coding and Decoding | 200 | `data/reasoning/coding-decoding-1.js` |
| 5 | Ranking and Time Sequence | 180 | `data/reasoning/ranking-time-sequence-1.js` |
| 6 | Coded Inequalities | 140 | `data/reasoning/coded-inequalities-1.js` |
| 7 | Directions and Distances | 180 | `data/reasoning/directions-distances-1.js` |
| 8 | Blood Relations | 140 | `data/reasoning/blood-relations-1.js` |
| 9 | Seating Arrangement & Puzzles | 367 | `data/reasoning/seating-arrangement-1.js` |
| 10 | Data Sufficiency | 140 | `data/reasoning/data-sufficiency-1.js` |
| 11 | Machine Input and Output | 320 | `data/reasoning/machine-input-output-1.js` |
| 12 | Decision Making | 61 | `data/reasoning/decision-making-1.js` |
| 13 | Statement and Arguments | 25 | `data/reasoning/statement-arguments-1.js` |
| 14 | Statement and Assumptions | 25 | `data/reasoning/statement-assumptions-1.js` |
| 15 | Statements and Course of Actions | 25 | `data/reasoning/statements-course-of-actions-1.js` |
| 16 | Cause and Effect | 25 | `data/reasoning/cause-and-effect-1.js` |
| 17 | Inference and Conclusions | 25 | `data/reasoning/inference-conclusions-1.js` |

---

## 📁 Directory Structure

```text
bp/
├── index.html                 # Main entrypoint and HTML shell
├── dashboard.html             # Standalone dashboard view template
├── favicon.svg                # Application vector brand icon
├── PLATFORM_GUIDE.md          # Architecture and design notes
├── README.md                  # Comprehensive project documentation
├── README.txt                 # Legacy quick-reference note
│
├── css/
│   ├── modern.css             # Core design system, variables, dark/light themes
│   ├── style.css              # Custom UI enhancements and layout adjustments
│   ├── mock-tests.css         # Styles for sectional and full mock tests
│   └── progress-table.css     # Checklist and syllabus completion styles
│
├── js/
│   ├── app.js                 # App routing, test controller, question palette
│   ├── analytics.js           # Score evaluation, speed classification, benchmarks
│   ├── charts.js              # Pure SVG chart generators (Donuts, Bars, Lines)
│   ├── drill.js               # Rapid calculation drills (Tables, Squares, Cubes)
│   ├── ibps-coach.js          # IBPS RRB Clerk/PO structured study coach
│   ├── mock-test-engine.js    # Model registry and duplicate-preventing mock generator
│   ├── mock-test-ui.js        # UI components and view flow for mock exams
│   ├── progress-table.js      # Curriculum progress matrix tracker
│   ├── revision.js            # Daily habit-building micro-revision engine
│   └── storage.js             # IndexedDB & LocalStorage persistence layer
│
├── data/
│   ├── config.js              # Central catalog registering all subjects, topics, and tests
│   ├── arithmetic/            # 25 JavaScript data files containing Arithmetic questions
│   │   ├── percentages-1.js
│   │   ├── profit-loss-1.js
│   │   └── ...
│   └── reasoning/             # 17 JavaScript data files containing Reasoning questions
│       ├── seating-arrangement-1.js
│       ├── missing-number-series-1.js
│       └── ...
│
├── tools/                     # Python extraction and maintenance pipeline
│   ├── make_data.py           # Standard PDF-to-JS parser
│   ├── list_tests.py          # Validation tool reporting configured tests
│   └── ...                    # Inspection, regex parsing, and batch transcribers
│
└── vendor/
    └── xlsx.full.min.js       # SheetJS engine for client-side Excel exports
```

---

## 🔄 Adding New Tests & Data Ingestion (Python Pipeline)

You can easily expand the platform by adding new topic PDFs using the provided Python tools.

### Step 1: Convert PDF to Data File
Ensure Python 3 is installed along with Poppler (`pdftotext`) or `pdfplumber`:
```bash
python tools/make_data.py "path/to/source.pdf" data/arithmetic/topic-name-1.js test-id-slug
```
*The parser extracts question numbers, question stems, multiple-choice options (`A`, `B`, `C`, `D`, `E`), and answer keys from the terminal key table.*

### Step 2: Register in `data/config.js`
Open [`data/config.js`](file:///d:/bp/data/config.js) and add the new test object under `APP_CONFIG.tests`:
```javascript
{
  id: 'topic-name-1',
  subject: 'arithmetic',          // or 'reasoning'
  topic: 'topic-slug',
  name: 'Topic Title - Practice Test 1',
  source: 'source_file.pdf',
  file: 'data/arithmetic/topic-name-1.js',
  count: 100,                     // Total questions extracted
  marking: { correct: 1, wrong: 0 } // Set wrong: 0.25 to enable default negative marking
}
```

### Step 3: Refresh the Browser
Reload [`index.html`](file:///d:/bp/index.html). The new test will immediately appear in the topic selector and mock test generator.

---

## 💾 Data Storage Schema

All user data is stored strictly on the user's client machine.

| Storage Key | Type | Description |
|---|---|---|
| `bankprep_sessions` | IndexedDB / LocalStorage | Complete history of all finished test sessions, question times, and scores |
| `bankprep.drill_settings.v2` | LocalStorage | Active configurations for speed drills (tables, squares, timers) |
| `bp_dailyRevision` | LocalStorage | Daily revision completion calendar, streaks, and timestamps |
| `bp_revision_snooze` | LocalStorage | Temporary snooze timestamp for daily revision modal |
| `bankprep.chapter_progress.v1` | LocalStorage | Syllabus chapter completion states |
| `bp_theme` | LocalStorage | Active color scheme preference (`dark` or `light`) |
| `bp_ibps_coach_v1` | LocalStorage | IBPS RRB Coach study cycle progress and targets |

---

## ⌨️ Keyboard Shortcuts

During an active test, you can navigate and submit answers without touching the mouse:

| Key | Action |
|:---:|---|
| `1` or `A` | Select Option A |
| `2` or `B` | Select Option B |
| `3` or `C` | Select Option C |
| `4` or `D` | Select Option E |
| `5` or `E` | Select Option E |
| `N` / `ArrowRight` | Save & Navigate to Next Question |
| `P` / `ArrowLeft` | Navigate to Previous Question |
| `M` | Toggle "Mark for Review" |
| `C` | Clear Selection for Current Question |
| `Space` | Pause / Resume Timer |

---

## 🔒 Browser Compatibility & Privacy

- **Compatibility**: Compatible with modern versions of Chrome, Edge, Firefox, Safari, Opera, and Chromium-based Android browsers.
- **Privacy & Security**: Zero telemetry, zero tracking cookies, zero external API requests. Your study patterns, answers, and scores remain completely private to your device.
- **Data Safety Note**: Because data is stored in the browser's local sandbox, clearing browser cache / site data or using Incognito/Private mode will clear historical records. Use the **Settings & Backup** menu to export your `.json` backup periodically.

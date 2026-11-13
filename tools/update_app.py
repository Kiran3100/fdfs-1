import re

app_path = r"d:\bp\js\app.js"
with open(app_path, "r", encoding="utf-8") as f:
    content = f.read()

# Notice the exact indentation: 12 spaces for footer/span, 10 spaces for </a>
target = """            <div class="subject-select-footer">
              <span>Explore 19 Chapters Syllabus</span>
              <span>&rarr;</span>
            </div>
          </a>"""

simp_card = """
          <!-- Simplification & Approximation Card -->
          <a href="#/topic/arithmetic/approximation" class="subject-select-card" id="card-subj-simp-approx" style="border-color: rgba(8, 145, 178, 0.4); background: linear-gradient(180deg, rgba(8, 145, 178, 0.05) 0%, var(--bg-surface) 100%);">
            <div>
              <div class="subject-select-header">
                <div class="subject-select-icon" style="background:rgba(8, 145, 178, 0.12); color:#0891b2;">⚡</div>
                <span class="badge" style="background:rgba(8, 145, 178, 0.15); color:#0891b2; border:1px solid rgba(8, 145, 178, 0.3);">1,000 Questions · 10 Sets</span>
              </div>
              <h3 class="subject-select-title">Simplification &amp; Approximation</h3>
              <p class="subject-select-desc">
                Core quantitative speed &amp; mental math mastery: 500 Simplification and 500 Approximation questions with complete answer keys, organized into 10 practice sets.
              </p>
              <div style="display:flex; flex-wrap:wrap; gap:6px; margin-bottom:14px;">
                <span class="badge badge-muted" style="font-size:0.75rem;">Simplification (500 Qs)</span>
                <span class="badge badge-muted" style="font-size:0.75rem;">Approximation (500 Qs)</span>
                <span class="badge badge-muted" style="font-size:0.75rem;">5 Simp Sets</span>
                <span class="badge badge-muted" style="font-size:0.75rem;">5 Approx Sets</span>
                <span class="badge badge-primary" style="font-size:0.75rem; background:#0891b2;">⚡ Speed Drills</span>
              </div>
            </div>
            <div class="subject-select-footer" style="color:#0891b2;">
              <span>Explore Question Banks &amp; Test Sets</span>
              <span>&rarr;</span>
            </div>
          </a>"""

assert target in content, "Could not find target in js/app.js"
content = content.replace(target, target + "\n" + simp_card, 1)

with open(app_path, "w", encoding="utf-8") as f:
    f.write(content)

print("SUCCESS: Updated js/app.js with Simplification & Approximation card!")

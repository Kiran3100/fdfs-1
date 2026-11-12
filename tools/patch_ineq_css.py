with open('css/modern.css', 'r', encoding='utf-8') as f:
    content = f.read()

target = '.q-conclusions-block {\n  background: var(--bg-surface);\n  border: 1.5px solid var(--border-color);\n  border-left: 3px solid var(--color-success);\n  border-radius: var(--radius-sm);\n  padding: 8px 12px;\n  box-shadow: none;\n}'

css_add = """

/* Inequalities Comparison Equation Stack (Equation I top, Equation II bottom) */
.q-equations-card {
  display: flex;
  flex-direction: column;
  gap: 10px;
  background: var(--bg-surface);
  border: 1.5px solid var(--border-color);
  border-left: 4px solid var(--brand-primary);
  border-radius: var(--radius-md);
  padding: 14px 18px;
  margin: 12px 0;
  box-shadow: var(--shadow-sm);
}

.q-equation-row {
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: var(--font-mono, ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace);
  font-size: 1.28rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: 0.03em;
  padding: 4px 0;
}

.q-equation-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 34px;
  height: 28px;
  padding: 0 8px;
  background: var(--brand-light, rgba(37,99,235,0.1));
  color: var(--brand-primary, #2563eb);
  border: 1px solid rgba(37,99,235,0.25);
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
  font-weight: 800;
  font-family: var(--font-sans, system-ui, sans-serif);
}

.q-equation-text {
  font-size: 1.28rem;
  font-weight: 700;
  color: var(--text-primary);
  word-spacing: 0.1em;
}

.q-equation-text sup {
  font-size: 0.72em;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
  top: -0.5em;
}

[data-theme="dark"] .q-equations-card {
  background: rgba(15, 23, 42, 0.6);
  border-color: rgba(255, 255, 255, 0.1);
  border-left-color: #3b82f6;
}

[data-theme="dark"] .q-equation-badge {
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  border-color: rgba(96, 165, 250, 0.3);
}

[data-theme="dark"] .q-equation-text {
  color: #f8fafc;
}
"""

if target in content:
    with open('css/modern.css', 'w', encoding='utf-8') as f:
        f.write(content.replace(target, target + css_add, 1))
    print('CSS successfully updated!')
else:
    print('Target not found!')

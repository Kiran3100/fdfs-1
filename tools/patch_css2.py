"""Fix CSS palette-btn: restore normal styling for plain tests, compact only for grouped."""

old_css = """.palette-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 6px;
  max-height: 440px;
  overflow-y: auto;
  padding: 4px;
}

/* Legacy class kept for backwards compat */
.palette-grid.palette-grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

.palette-btn {
  height: 38px;
  min-width: 0;
  border: 1px solid var(--border-color);
  background: var(--bg-surface);
  color: var(--text-primary);
  border-radius: var(--radius-md);
  font-weight: 700;
  font-size: 0.78rem;
  letter-spacing: 0.01em;
  cursor: pointer;
  transition: var(--transition);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 2px;
}"""

new_css = """.palette-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  max-height: 440px;
  overflow-y: auto;
  padding: 4px;
}

/* Legacy class kept for backwards compat */
.palette-grid.palette-grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

.palette-btn {
  height: 40px;
  min-width: 0;
  border: 1px solid var(--border-color);
  background: var(--bg-surface);
  color: var(--text-primary);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 0 2px;
}

/* Compact style for grouped tests with many sub-parts (1A, 1B, 1C...) */
.palette-grid.palette-grouped .palette-btn {
  height: 36px;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.01em;
}"""

with open('css/modern.css', 'r', encoding='utf-8') as f:
    content = f.read()

if old_css in content:
    content = content.replace(old_css, new_css, 1)
    with open('css/modern.css', 'w', encoding='utf-8') as f:
        f.write(content)
    print("CSS patch applied successfully")
else:
    print("CSS target not found")

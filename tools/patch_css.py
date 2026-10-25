"""Patch modern.css palette styles"""

old = """.palette-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 8px;
  max-height: 440px;
  overflow-y: auto;
  padding: 4px;
}

.palette-grid.palette-grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

.palette-btn {
  height: 40px;
  border: 1px solid var(--border-color);
  background: var(--bg-surface);
  color: var(--text-primary);
  border-radius: var(--radius-md);
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: var(--transition);
}"""

new = """.palette-grid {
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

with open('css/modern.css', 'r', encoding='utf-8') as f:
    content = f.read()

if old in content:
    content = content.replace(old, new, 1)
    print("CSS Patch applied")
else:
    print("ERROR: target not found in modern.css")

with open('css/modern.css', 'w', encoding='utf-8') as f:
    f.write(content)
print("Done.")

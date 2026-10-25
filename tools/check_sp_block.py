
# Check only the 15-line block we inserted in app.js
with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find and display the study-progress block
start = content.find("if (page === 'study-progress')")
end   = content.find("if (page === 'attempt')", start)
block = content[start:end].strip()
print('Study-progress block:')
print(block)

with open('js/app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Extract and replace the block by char offsets
pos = 105254
end_marker = '.join(\'\')}'
end_pos = content.find(end_marker, pos) + len(end_marker)

old_block = content[pos:end_pos]
print("Old block:")
print(repr(old_block))
print("\n---Length:", len(old_block))

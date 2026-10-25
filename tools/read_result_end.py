with open('js/mock-test-ui.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(''.join(lines[1125:1165]).encode('ascii', errors='replace').decode())

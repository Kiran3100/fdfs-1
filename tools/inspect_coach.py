import re

with open('js/ibps-coach.js', 'r', encoding='utf-8') as f:
    text = f.read()

# Let's see how IBPSCoach does recommendations or tracking
coach_vars = re.findall(r'const\s+([A-Z0-9_]+)\s*=', text)
print('IBPSCoach consts:', coach_vars)

# Check functions
funcs = re.findall(r'function\s+([a-zA-Z0-9_]+)', text)
print('IBPSCoach funcs:', funcs[:25])

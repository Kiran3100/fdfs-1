import re, glob

for fpath in ['js/app.js', 'js/analytics.js', 'js/drill.js', 'js/ibps-coach.js', 'js/revision.js', 'js/charts.js']:
    try:
        with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
            c = f.read()
        if 'spinner' in c:
            idx = c.index('spinner')
            print(f"{fpath}: spinner found at {idx}")
            print(c[max(0,idx-40):idx+150])
            print('---')
    except Exception as e:
        print(f"{fpath}: error - {e}")

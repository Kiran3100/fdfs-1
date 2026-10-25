import re

with open('js/app.js', 'r', encoding='utf-8') as f:
    txt = f.read()

# Find spinner CSS rule in app.js (sometimes inlined)
if 'spinner' in txt.lower():
    idx = txt.lower().index('spinner')
    print("Found 'spinner' in app.js at:", idx)
    print(txt[max(0,idx-50):idx+200])
else:
    print("No spinner in app.js")

with open('js/ibps-coach.js', 'r', encoding='utf-8') as f:
    ibps = f.read()

if '.spinner' in ibps:
    idx = ibps.index('.spinner')
    print("Found .spinner in ibps-coach.js at:", idx)
    print(ibps[idx:idx+200])

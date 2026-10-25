import json
with open('data/reasoning/seating-arrangement-1.js', 'r', encoding='utf-8') as f:
    txt = f.read()

prefix = 'QBANK["seating-arrangement-1"] = '
arr = json.loads(txt[txt.find(prefix)+len(prefix):].rstrip(';\n '))
print("Q1(a) full text:")
print(repr(arr[0]['q']))
print("\nQ1(b) full text:")
print(repr(arr[1]['q']))

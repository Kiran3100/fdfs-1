import glob

for f in glob.glob('data/arithmetic/*.js'):
    with open(f, 'r', encoding='utf-8', errors='ignore') as fp:
        c = fp.read()
    if '"explanation"' in c or '"exp"' in c or '"sol"' in c or '"solution"' in c:
        print(f, "has explanation")
print("Check finished.")

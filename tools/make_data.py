"""Convert an 'answer key' PDF into a data/*.js file.
Usage: python make_data.py key.pdf out.js test-id   (needs poppler's pdftotext)"""
import re,sys,json,subprocess
pdf,out,tid=sys.argv[1:4]
txt=subprocess.run(['pdftotext','-layout',pdf,'-'],capture_output=True,text=True).stdout
pages=[p for p in txt.split('\f') if p.strip()]
key={m.group(2):m.group(3) for m in re.finditer(r'Q(\d+) \((\d+\([A-Z]\))\)\s+([A-E*](?:/[A-E])*)',pages[-1])}
qs=[]
for p in pages[:-1]:
    L=[l.strip() for l in p.split('\n') if l.strip()]
    m=re.match(r'^Q\d+\.\s+(.*)',L[0]);body=[m.group(1)];j=1;lab=None
    while True:
        mm=re.match(r'^\((\d+\([A-Z]\))\)\s*(.*)',L[j])
        if mm and lab is None:
            lab=mm.group(1);body+= [mm.group(2)] if mm.group(2) else [];j+=1;continue
        if re.match(r'^\([A-E]\)\s',L[j]):break
        body.append(L[j]);j+=1
    o=[re.match(r'^\([A-E]\)\s+(.*)',x).group(1).strip() for x in L[j:]]
    k=key.get(lab);multi=bool(k and '/' in k)
    d={'n':lab,'q':' '.join(body),'o':o,'a':None if (k in(None,'*') or multi) else 'ABCDE'.index(k)}
    f=[]
    if multi:f.append('Answer key lists more than one option (%s) - ambiguous; excluded from scoring.'%k)
    elif k in(None,'*'):f.append('No usable answer key for this question (answer not among options / missing) - excluded from scoring.')
    if any(int(a)>=int(b) for x in o for a,b in re.findall(r'\d+ (\d+)/(\d+)',x)):f.append('Options contain an improper mixed fraction (e.g. "28 8/7") - likely a printing error in the PDF; verify.')
    if f:d['f']=' '.join(f)
    qs.append(d)
open(out,'w',encoding='utf-8').write("window.QBANK=window.QBANK||{};QBANK[%s]=%s;\n"%(json.dumps(tid),json.dumps(qs,ensure_ascii=False,indent=0)))
print(len(qs),'questions;',sum(1 for q in qs if q['a'] is None),'without key;',sum(1 for q in qs if 'f' in q),'flagged')

BANKING EXAM PRACTICE - how to use
===================================
RUN (Windows): unzip, double-click index.html (Chrome or Edge). No server or internet needed.
Keep the folder structure intact (css/, js/, data/, vendor/).

FLOW: Dashboard -> Arithmetic/Reasoning -> topic -> range / shuffle / time limit -> Start Test
      -> Submit -> results, review filters, Excel download, repeat test, or practise past mistakes.

ADD A NEW PDF / TOPIC
1. Convert the PDF (needs Python + poppler's pdftotext on PATH):
     python tools/make_data.py "my_key.pdf" data/arithmetic/profit-loss-1.js pl-1
   The PDF must use the same layout as the Percentages key PDF (Q1. text / (1(A)) / (A) option ...
   and an answer-key table on the last page). For other layouts, send the PDF and the converter can be adapted.
2. In data/config.js add one entry to "tests":
     { id:'pl-1', subject:'arithmetic', topic:'profit-loss', name:'Profit and Loss - PDF 1',
       source:'my_key.pdf', file:'data/arithmetic/profit-loss-1.js', count:<number of questions>,
       marking:{correct:1, wrong:0} }
   Topic ids already defined: percentages, basic-maths, profit-loss, inequalities, coded-decoding, alphabets.
   New topics: add {id,name} under the subject's "topics".
3. Refresh the page. No other code changes needed.

HISTORY: stored in this browser's localStorage. It is NOT synced between devices/browsers and is lost if you
clear site data or use private mode. Excel downloads are your portable record.

KNOWN ISSUES IN THE PERCENTAGES PDF
- Q89 = 23(A): the key says the correct value (Rs. 2.0 lakh) is not among the options. Shown with a warning
  and excluded from scoring ("No answer key").
- 12(B), 12(C): options like "28 8/7" are improper mixed fractions (likely printing errors). Flagged; scored per key.
- The PDFs contain no explanations, so review shows "not provided".

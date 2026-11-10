with open(r'd:\bp\data\config.js', 'r', encoding='utf-8') as f:
    c = f.read()

# Add pl-part-a after pl-1
pl_target = '''    {
      id: 'pl-1',
      subject: 'arithmetic',
      topic: 'profit-loss',
      name: 'Profit and Loss - Practice Test 1',
      source: 'profit_and_loss_questions_with_answer_key.pdf',
      file: 'data/arithmetic/profit-loss-1.js',
      count: 160,
      marking: { correct: 1, wrong: 0 }
    },'''

pl_replacement = '''    {
      id: 'pl-1',
      subject: 'arithmetic',
      topic: 'profit-loss',
      name: 'Profit and Loss - Practice Test 1',
      source: 'profit_and_loss_questions_with_answer_key.pdf',
      file: 'data/arithmetic/profit-loss-1.js',
      count: 160,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'pl-part-a',
      subject: 'arithmetic',
      topic: 'profit-loss',
      name: 'Profit and Loss Part-A Answers (Q 1(A) to 40(A))',
      source: 'Profit and Loss part-A answers (Visual Solutions)',
      file: 'data/arithmetic/profit-loss-part-a.js',
      count: 40,
      marking: { correct: 1, wrong: 0 },
      isAnswerViewer: true
    },'''

# Add si-part-a after si-1
si_target = '''    {
      id: 'si-1',
      subject: 'arithmetic',
      topic: 'simple-interest',
      name: 'Simple Interest - Practice Test 1',
      source: '4.simple_interest_questions_with_answer_key.pdf',
      file: 'data/arithmetic/simple-interest-1.js',
      count: 80,
      marking: { correct: 1, wrong: 0 }
    },'''

si_replacement = '''    {
      id: 'si-1',
      subject: 'arithmetic',
      topic: 'simple-interest',
      name: 'Simple Interest - Practice Test 1',
      source: '4.simple_interest_questions_with_answer_key.pdf',
      file: 'data/arithmetic/simple-interest-1.js',
      count: 80,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'si-part-a',
      subject: 'arithmetic',
      topic: 'simple-interest',
      name: 'Simple Interest Part-A Answers (Q 1(A) to 20(A))',
      source: 'Simple Interest part-A answers (Visual Solutions)',
      file: 'data/arithmetic/simple-interest-part-a.js',
      count: 20,
      marking: { correct: 1, wrong: 0 },
      isAnswerViewer: true
    },'''

assert pl_target in c, "pl_target not found!"
assert si_target in c, "si_target not found!"

c = c.replace(pl_target, pl_replacement).replace(si_target, si_replacement)

with open(r'd:\bp\data\config.js', 'w', encoding='utf-8') as f:
    f.write(c)

print("config.js updated successfully with pl-part-a and si-part-a!")

with open(r'd:\bp\data\config.js', 'r', encoding='utf-8') as f:
    c = f.read()

# Add par-part-a after par-1
par_target = '''    {
      id: 'par-1',
      subject: 'arithmetic',
      topic: 'partnership',
      name: 'Partnership - Practice Test 1',
      source: '7.partnership_questions_with_answer_key.pdf',
      file: 'data/arithmetic/partnership-1.js',
      count: 80,
      marking: { correct: 1, wrong: 0 }
    },'''

par_replacement = '''    {
      id: 'par-1',
      subject: 'arithmetic',
      topic: 'partnership',
      name: 'Partnership - Practice Test 1',
      source: '7.partnership_questions_with_answer_key.pdf',
      file: 'data/arithmetic/partnership-1.js',
      count: 80,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'par-part-a',
      subject: 'arithmetic',
      topic: 'partnership',
      name: 'Partnership Part-A Answers (Q 1(A) to 20(A))',
      source: 'Partnership part-A answers (Visual Solutions)',
      file: 'data/arithmetic/partnership-part-a.js',
      count: 20,
      marking: { correct: 1, wrong: 0 },
      isAnswerViewer: true
    },'''

# Add pa-part-a after pa-1
pa_target = '''    {
      id: 'pa-1',
      subject: 'arithmetic',
      topic: 'problems-on-ages',
      name: 'Problems on Ages - Practice Test 1',
      source: '8.problems_on_ages_questions_with_answer_key.pdf',
      file: 'data/arithmetic/problems-on-ages-1.js',
      count: 80,
      marking: { correct: 1, wrong: 0 }
    },'''

pa_replacement = '''    {
      id: 'pa-1',
      subject: 'arithmetic',
      topic: 'problems-on-ages',
      name: 'Problems on Ages - Practice Test 1',
      source: '8.problems_on_ages_questions_with_answer_key.pdf',
      file: 'data/arithmetic/problems-on-ages-1.js',
      count: 80,
      marking: { correct: 1, wrong: 0 }
    },
    {
      id: 'pa-part-a',
      subject: 'arithmetic',
      topic: 'problems-on-ages',
      name: 'Problems on Ages Part-A Answers (Q 1(A) to 20(A))',
      source: 'Problems on Ages part-A answers (Visual Solutions)',
      file: 'data/arithmetic/problems-on-ages-part-a.js',
      count: 20,
      marking: { correct: 1, wrong: 0 },
      isAnswerViewer: true
    },'''

assert par_target in c, "par_target not found!"
assert pa_target in c, "pa_target not found!"

c = c.replace(par_target, par_replacement).replace(pa_target, pa_replacement)

with open(r'd:\bp\data\config.js', 'w', encoding='utf-8') as f:
    f.write(c)

print("config.js updated successfully with par-part-a and pa-part-a!")

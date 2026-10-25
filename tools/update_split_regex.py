"""Update questionSplitRe in js/app.js and app.js to include Who, Whom, Whose, Where, When, Why, Based, Four, As, There, Choose, Identify, According"""

old_regex = r'const questionSplitRe = /(?<=\S)\s+(Which\b|How\b|Find\b|What\b|If\b|In\b|Calculate\b|The\b(?!\s+following\s+arrangement))/;'
new_regex = r'const questionSplitRe = /(?<=\S)\s+(Which\b|How\b|Find\b|What\b|If\b|In\b|Calculate\b|The\b(?!\s+following\s+arrangement)|Who\b|Whom\b|Whose\b|Where\b|When\b|Why\b|Based\b|Four\b|As\b|There\b|Choose\b|Identify\b|According\b)/i;'

for filepath in ['js/app.js', 'app.js']:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        if old_regex in content:
            content = content.replace(old_regex, new_regex, 1)
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(content)
            print(f"Updated {filepath}")
        else:
            print(f"Target not found in {filepath}")
    except Exception as e:
        print(f"Error {filepath}: {e}")

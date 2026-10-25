"""Update PATTERN 5 in js/app.js and app.js to match both 'question:' and 'questions:' and cleanly separate Arrangement from Question."""

old_dir_regex = r'const directionMatch = str.match(/^(Directions?\s*(?:\s*\(\d+[-–]\d+\)\s*)?:\s*.+?(?:answer the (?:following|given) questions?|following questions?|illustrated as below:?|given below\s*:?))\s*/i);'

new_dir_regex = r'const directionMatch = str.match(/^(Directions?\s*(?:\s*\(\d+[-–]\d+\)\s*)?:\s*.+?(?:answer the (?:following|given) questions?|following questions?|illustrated as below:?|given below\s*:?|answer the questions?\s*(?:given\s+below|that\s+follow)?|answer the question\s*:?))\s*/i);'

for filepath in ['js/app.js', 'app.js']:
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if old_dir_regex in content:
        content = content.replace(old_dir_regex, new_dir_regex, 1)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Updated directionMatch in {filepath}")
    else:
        print(f"Target not found in {filepath}")

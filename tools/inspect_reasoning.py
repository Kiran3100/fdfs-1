import glob, re

for f in sorted(glob.glob('data/reasoning/*.js')):
    with open(f, 'r', encoding='utf-8') as fp:
        txt = fp.read()
    m_n = re.search(r'"n":\s*"([^"]+)"', txt)
    m_q = re.search(r'"q":\s*"([^"\n]{1,40})', txt)
    n_val = m_n.group(1) if m_n else "None"
    q_val = m_q.group(1) if m_q else "None"
    print(f"{f}: n={n_val} | q={q_val}")

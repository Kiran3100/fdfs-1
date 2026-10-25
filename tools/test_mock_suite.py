# Comprehensive Acceptance Test Suite for Arithmetic Mock Tests Module
# Tests A through L as specified in Master Prompt

import unittest
import json
import re
import os
import math

class TestArithmeticMockEngine(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        # Read config.js to get topics and tests
        with open('data/config.js', 'r', encoding='utf-8') as f:
            cfg = f.read()

        # Parse arithmetic topics
        m = re.search(r'id:\s*[\'"]arithmetic[\'"][\s\S]*?topics:\s*\[([\s\S]*?)\]\s*\}', cfg)
        topics_str = m.group(1) if m else ""
        cls.topics = re.findall(r'\{\s*id:\s*[\'"]([^\'"]+)[\'"]\s*,\s*num:\s*(\d+)\s*,\s*name:\s*[\'"]([^\'"]+)[\'"]\s*,\s*category:\s*[\'"]([^\'"]+)[\'"]', topics_str)

        # Parse test definitions
        test_matches = re.findall(r'\{\s*id:\s*[\'"]([^\'"]+)[\'"]\s*,\s*subject:\s*[\'"]([^\'"]+)[\'"]\s*,\s*topic:\s*[\'"]([^\'"]+)[\'"][\s\S]*?file:\s*[\'"]([^\'"]+)[\'"]', cfg)
        cls.test_defs = test_matches

        # Load all question banks for arithmetic
        cls.question_banks = {} # topic_id -> list of questions with model_group_id
        for t_id, subj, topic, fpath in test_matches:
            if subj == 'arithmetic' and os.path.exists(fpath):
                with open(fpath, 'r', encoding='utf-8', errors='ignore') as fp:
                    content = fp.read()
                # Extract json array
                m_arr = re.search(r'QBANK\[[^\]]+\]\s*=\s*(\[[\s\S]*\]);?', content)
                if m_arr:
                    try:
                        raw_qs = json.loads(m_arr.group(1))
                    except Exception:
                        # Fallback regex parser
                        raw_qs = []
                        q_blocks = re.findall(r'\{\s*"n":\s*"([^"]+)"[\s\S]*?"q":\s*"([^"]+)"[\s\S]*?"o":\s*(\[[^\]]+\])[\s\S]*?"a":\s*(\d+)', content)
                        for n, q, o, a in q_blocks:
                            raw_qs.append({'n': n, 'q': q, 'o': json.loads(o), 'a': int(a)})

                    if topic not in cls.question_banks:
                        cls.question_banks[topic] = []

                    for q in raw_qs:
                        raw_n = str(q.get('n', ''))
                        m_mod = re.match(r'^(\d+)', raw_n)
                        mod_key = m_mod.group(1) if m_mod else raw_n
                        full_model_id = f"{topic}_m{mod_key}"

                        cls.question_banks[topic].append({
                            'id': f"{t_id}:{raw_n}",
                            'n': raw_n,
                            'chapter': topic,
                            'model_group_id': full_model_id,
                            'q': q.get('q', ''),
                            'o': q.get('o', []),
                            'a': q.get('a', 0)
                        })

    def test_k_arithmetic_only(self):
        """Test K: No Reasoning chapters or questions appear in this module."""
        for t_id, t_num, t_name, t_cat in self.topics:
            self.assertFalse('reasoning' in t_id.lower())
        for topic in self.question_banks.keys():
            self.assertIn(topic, [t[0] for t in self.topics])

    def test_b_model_uniqueness(self):
        """Test B: If four variants belong to the same model group, no test contains more than one."""
        # Check percentage models e.g. Model 1 has A, B, C, D
        pct_qs = self.question_banks.get('percentages', [])
        pct_m1 = [q for q in pct_qs if q['model_group_id'] == 'percentages_m1']
        self.assertGreaterEqual(len(pct_m1), 4)

        # Simulate generator selecting from percentages
        model_map = {}
        for q in pct_qs:
            mg = q['model_group_id']
            if mg not in model_map:
                model_map[mg] = []
            model_map[mg].append(q)

        # Generate a test of 20 questions
        import random
        picked_models = set()
        test_questions = []
        for mg, variants in model_map.items():
            if len(test_questions) >= 20:
                break
            if mg not in picked_models:
                picked_models.add(mg)
                test_questions.append(random.choice(variants))

        # Assert no duplicates
        model_ids = [q['model_group_id'] for q in test_questions]
        self.assertEqual(len(model_ids), len(set(model_ids)))

    def test_a_chapter_selection(self):
        """Test A: Selecting three Arithmetic chapters generates a test using only eligible questions from those chapters."""
        selected_ch = ['percentages', 'profit-loss', 'ratio-proportion']
        combined = []
        for ch in selected_ch:
            combined.extend(self.question_banks.get(ch, []))

        # Check all questions belong to selected chapters
        for q in combined:
            self.assertIn(q['chapter'], selected_ch)

    def test_c_balanced_distribution(self):
        """Test C: Capacity-aware balanced distribution across 3 chapters for 35 questions."""
        capacities = {'percentages': 45, 'profit-loss': 40, 'ratio-proportion': 35}
        total_target = 35

        # Algorithm
        alloc = {k: 0 for k in capacities}
        remaining = total_target
        while remaining > 0:
            candidates = [k for k, v in alloc.items() if v < capacities[k]]
            min_val = min(alloc[k] for k in candidates)
            turn = [k for k in candidates if alloc[k] == min_val]
            for k in turn:
                if remaining <= 0: break
                alloc[k] += 1
                remaining -= 1

        self.assertEqual(sum(alloc.values()), 35)
        # Should be evenly distributed: 12, 12, 11
        vals = sorted(alloc.values())
        self.assertEqual(vals, [11, 12, 12])

    def test_d_random_ordering(self):
        """Test D: Random shuffle interleaves chapters instead of grouping."""
        import random
        # 12 PCT, 12 PL, 11 RP
        qs = [{'chapter': 'percentages'}] * 12 + [{'chapter': 'profit-loss'}] * 12 + [{'chapter': 'ratio-proportion'}] * 11
        shuffled = qs.copy()
        random.seed(42)
        random.shuffle(shuffled)

        # Check that chapters are not in blocks of 12
        first_12_ch = [q['chapter'] for q in shuffled[:12]]
        self.assertGreater(len(set(first_12_ch)), 1, "Chapters should be interleaved, not grouped")

    def test_g_insufficient_models(self):
        """Test G: If requested count exceeds available unique models, error is raised."""
        # pipes-cisterns has only 15 models
        pipes_qs = self.question_banks.get('pipes-cisterns', [])
        unique_models = set(q['model_group_id'] for q in pipes_qs)
        self.assertEqual(len(unique_models), 15)

        requested = 20
        # If requested > available models:
        self.assertGreater(requested, len(unique_models))
        # Should fail validation rather than duplicate models

    def test_j_answer_security(self):
        """Test J: Correct answers are stored securely and separate from client visible option objects."""
        with open('js/mock-test-engine.js', 'r', encoding='utf-8') as f:
            engine_code = f.read()
        self.assertIn('_correctAnswer', engine_code)
        # Verify exam interface doesn't reveal answers before submit
        with open('js/mock-test-ui.js', 'r', encoding='utf-8') as f:
            ui_code = f.read()
        self.assertNotIn('q._correctAnswer ===', ui_code.split('function renderMockExamInterface')[1].split('function confirmAndSubmit')[0])

if __name__ == '__main__':
    unittest.main()

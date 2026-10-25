import json

# Full mapping of real videos from user's course batch screenshots
# Each video has: { id, title, lessonNo, date (optional), duration (optional) }

COURSE_VIDEOS = {
    # ── ARITHMETIC ─────────────────────────────────────────────────────────
    "basic-maths": [
        {"id": "bm-v1", "title": "Basic Mathematics - 01", "lessonNo": 1, "date": "01 Aug"},
        {"id": "bm-v2", "title": "Basic Mathematics - 02", "lessonNo": 2, "date": "02 Aug"},
        {"id": "bm-v3", "title": "Basic Mathematics - 03", "lessonNo": 3, "date": "04 Aug"}
    ],
    "percentages": [
        {"id": "pct-v1", "title": "Percentages - 01", "lessonNo": 1, "date": "05 Aug"},
        {"id": "pct-v2", "title": "Percentages - 02", "lessonNo": 2, "date": "06 Aug"},
        {"id": "pct-v3", "title": "Percentages - 03", "lessonNo": 3, "date": "07 Aug"},
        {"id": "pct-v4", "title": "Percentages - 04", "lessonNo": 4, "date": "10 Aug"}
    ],
    "profit-loss": [
        {"id": "pl-v1", "title": "Profit and Loss - 01", "lessonNo": 1, "date": "11 Aug"},
        {"id": "pl-v2", "title": "Profit and Loss - 02", "lessonNo": 2, "date": "12 Aug"},
        {"id": "pl-v3", "title": "Profit and Loss - 03", "lessonNo": 3, "date": "17 Aug"}
    ],
    "simple-interest": [
        {"id": "si-v1", "title": "Simple Interest - 01", "lessonNo": 1, "date": "05 Aug"},
        {"id": "si-v2", "title": "Simple Interest - 02", "lessonNo": 2, "date": "06 Aug"},
        {"id": "si-v3", "title": "Simple Interest - 03", "lessonNo": 3, "date": "01 Oct"}
    ],
    "compound-interest": [
        {"id": "ci-v1", "title": "Compound Interest - 01", "lessonNo": 1, "date": "05 Oct"},
        {"id": "ci-v2", "title": "Compound Interest - 02", "lessonNo": 2, "date": "16 Oct"},
        {"id": "ci-v3", "title": "Compound Interest - 03", "lessonNo": 3, "date": "17 Oct"}
    ],
    "ratio-proportion": [
        {"id": "rp-v1", "title": "Ratio and Proportion - 01", "lessonNo": 1, "date": "18 Aug"},
        {"id": "rp-v2", "title": "Ratio and Proportion - 02", "lessonNo": 2, "date": "19 Aug"},
        {"id": "rp-v3", "title": "Ratio and Proportion - 03", "lessonNo": 3, "date": "20 Aug"}
    ],
    "partnership": [
        {"id": "par-v1", "title": "Partnership - 01", "lessonNo": 1, "date": "24 Aug"},
        {"id": "par-v2", "title": "Partnership - 02", "lessonNo": 2, "date": "25 Aug"}
    ],
    "problems-on-ages": [
        {"id": "pa-v1", "title": "Ages - 01", "lessonNo": 1, "date": "26 Aug"},
        {"id": "pa-v2", "title": "Ages - 02", "lessonNo": 2, "date": "27 Aug"}
    ],
    "averages": [
        {"id": "avg-v1", "title": "Averages - 01", "lessonNo": 1, "date": "28 Aug"},
        {"id": "avg-v2", "title": "Averages - 02", "lessonNo": 2, "date": "29 Aug"},
        {"id": "avg-v3", "title": "Averages - 03", "lessonNo": 3, "date": "02 Sep"},
        {"id": "avg-v4", "title": "Averages - 04", "lessonNo": 4, "date": "09 Oct"}
    ],
    "mixtures-allegations": [
        {"id": "ma-v1", "title": "Mixtures and Alligations - 01", "lessonNo": 1, "date": "23 Sep"},
        {"id": "ma-v2", "title": "Mixtures and Alligations - 02", "lessonNo": 2, "date": "24 Sep"}
    ],
    "time-distance": [
        {"id": "td-v1", "title": "Time and Distance - 01", "lessonNo": 1, "date": "21 Sep"},
        {"id": "td-v2", "title": "Time and Distance - 02", "lessonNo": 2, "date": "02 Oct"},
        {"id": "td-v3", "title": "Time and Distance - 03", "lessonNo": 3, "date": "03 Oct"},
        {"id": "td-v4", "title": "Time and Distance - 04", "lessonNo": 4, "date": "05 Oct"}
    ],
    "trains": [
        {"id": "trn-v1", "title": "Trains - 01", "lessonNo": 1, "date": "06 Oct"},
        {"id": "trn-v2", "title": "Trains - 02", "lessonNo": 2, "date": "07 Oct"},
        {"id": "trn-v3", "title": "Trains - 03", "lessonNo": 3, "date": "08 Oct"}
    ],
    "boats-streams": [
        {"id": "bs-v1", "title": "Boats and Streams - 01", "lessonNo": 1, "date": "13 Oct"},
        {"id": "bs-v2", "title": "Boats and Streams - 02", "lessonNo": 2, "date": "14 Oct"}
    ],
    "time-work": [
        {"id": "tw-v1", "title": "Time and Work - 01", "lessonNo": 1, "date": "22 Oct"}
    ],
    "pipes-cisterns": [],
    "inequalities-comparison": [
        {"id": "ineq-v1", "title": "Inequalities - 01", "lessonNo": 1, "date": "25 Sep"},
        {"id": "ineq-v2", "title": "Inequalities - 02", "lessonNo": 2, "date": "26 Sep"}
    ],
    "areas": [],
    "volumes": [],
    "lcm-hcf": [
        {"id": "lh-v1", "title": "LCM & HCF - 01", "lessonNo": 1, "date": "31 Aug"},
        {"id": "lh-v2", "title": "LCM & HCF - 02", "lessonNo": 2, "date": "16 Sep"},
        {"id": "lh-v3", "title": "LCM & HCF - 03", "lessonNo": 3, "date": "18 Sep"}
    ],
    "problems-on-numbers": [
        {"id": "pn-v1", "title": "Problems on Numbers - 01", "lessonNo": 1, "date": "04 Sep"},
        {"id": "pn-v2", "title": "Problems on Numbers - 02", "lessonNo": 2, "date": "08 Sep"}
    ],
    "approximation": [
        {"id": "app-v1", "title": "Approximations - 01", "lessonNo": 1, "date": "01 Sep"},
        {"id": "app-v2", "title": "Approximations - 02", "lessonNo": 2, "date": "03 Sep"}
    ],
    "permutations-combinations": [],
    "probability": [],

    # ── REASONING ──────────────────────────────────────────────────────────
    "missing-number-series": [
        {"id": "mns-v1", "title": "Number Series - 01", "lessonNo": 1, "date": "21 Sep"},
        {"id": "mns-v2", "title": "Number Series - 02", "lessonNo": 2, "date": "23 Sep"},
        {"id": "mns-v3", "title": "Number Series - 03", "lessonNo": 3, "date": "24 Sep"},
        {"id": "mns-v4", "title": "Number Series - 04", "lessonNo": 4, "date": "25 Sep"},
        {"id": "mns-v5", "title": "Number Series - 05", "lessonNo": 5, "date": "26 Sep"},
        {"id": "mns-v6", "title": "Number Series - 06", "lessonNo": 6, "date": "28 Sep"}
    ],
    "wrong-number-series": [
        {"id": "wns-v1", "title": "Wrong Number Series - 01", "lessonNo": 1, "date": "29 Sep"},
        {"id": "wns-v2", "title": "Wrong Number Series - 02", "lessonNo": 2, "date": "30 Sep"},
        {"id": "wns-v3", "title": "Wrong Number Series - 03", "lessonNo": 3, "date": "01 Oct"},
        {"id": "wns-v4", "title": "Wrong Number Series - 04", "lessonNo": 4, "date": "02 Oct"},
        {"id": "wns-v5", "title": "Wrong Number Series - 05", "lessonNo": 5, "date": "03 Oct"}
    ],
    "problems-on-alphabets": [
        {"id": "poa-v1", "title": "Problems Based on Alphabets - 01", "lessonNo": 1, "date": "15 Sep"},
        {"id": "poa-v2", "title": "Problems Based on Alphabets - 02", "lessonNo": 2, "date": "16 Sep"},
        {"id": "poa-v3", "title": "Problems Based on Alphabets - 03", "lessonNo": 3, "date": "18 Sep"},
        {"id": "poa-v4", "title": "Problems Based on Alphabets - 04", "lessonNo": 4, "date": "19 Sep"}
    ],
    "coding-decoding": [],
    "ranking-time-sequence": [
        {"id": "rts-v1", "title": "Ranking and Time Sequence - 01", "lessonNo": 1, "date": "12 Sep"}
    ],
    "coded-inequalities": [
        {"id": "ciq-v1", "title": "Coded Inequalities - 01", "lessonNo": 1, "date": "25 Aug"},
        {"id": "ciq-v2", "title": "Coded Inequalities - 02", "lessonNo": 2, "date": "26 Aug"},
        {"id": "ciq-v3", "title": "Coded Inequalities - 03", "lessonNo": 3, "date": "27 Aug"},
        {"id": "ciq-v4", "title": "Coded Inequalities - 04", "lessonNo": 4, "date": "09 Sep"}
    ],
    "directions-distances": [],
    "blood-relations": [
        {"id": "br-v1", "title": "Blood Relations - 01", "lessonNo": 1, "date": "10 Sep"},
        {"id": "br-v2", "title": "Blood Relations - 02", "lessonNo": 2, "date": "11 Sep"}
    ],
    "syllogisms": [],
    "seating-arrangement": [
        {"id": "sa-v1", "title": "Introduction to Reasoning / Seating", "lessonNo": 1, "date": "10 Aug"},
        {"id": "sa-v2", "title": "Seating Arrangement - 01", "lessonNo": 2, "date": "11 Aug"},
        {"id": "sa-v3", "title": "Seating Arrangement - 02", "lessonNo": 3, "date": "12 Aug"},
        {"id": "sa-v4", "title": "Seating Arrangement - 03", "lessonNo": 4, "date": "13 Aug"},
        {"id": "sa-v5", "title": "Seating Arrangement - 04", "lessonNo": 5, "date": "14 Aug"},
        {"id": "sa-v6", "title": "Seating Arrangement - 05", "lessonNo": 6, "date": "17 Aug"},
        {"id": "sa-v7", "title": "Seating Arrangement - 06", "lessonNo": 7, "date": "18 Aug"},
        {"id": "sa-v8", "title": "Seating Arrangement - 07", "lessonNo": 8, "date": "19 Aug"},
        {"id": "sa-v9", "title": "Seating Arrangement - 08", "lessonNo": 9, "date": "04 Sep"}
    ],
    "analytical-reasoning": [
        {"id": "ar-v1", "title": "Analytical Reasoning - 01", "lessonNo": 1, "date": "05 Oct"},
        {"id": "ar-v2", "title": "Analytical Reasoning - 02", "lessonNo": 2, "date": "06 Oct"},
        {"id": "ar-v3", "title": "Analytical Reasoning - 03", "lessonNo": 3, "date": "07 Oct"},
        {"id": "ar-v4", "title": "Analytical Reasoning - 04", "lessonNo": 4, "date": "08 Oct"},
        {"id": "ar-v5", "title": "Analytical Reasoning - 05", "lessonNo": 5, "date": "09 Oct"},
        {"id": "ar-v6", "title": "Analytical Reasoning - 06", "lessonNo": 6, "date": "12 Oct"},
        {"id": "ar-v7", "title": "Analytical Reasoning - 07", "lessonNo": 7, "date": "14 Oct"},
        {"id": "ar-v8", "title": "Analytical Reasoning - 08", "lessonNo": 8, "date": "15 Oct"},
        {"id": "ar-v9", "title": "Analytical Reasoning - 09", "lessonNo": 9, "date": "21 Oct"}
    ],
    "data-sufficiency": [
        {"id": "ds-v1", "title": "Data Sufficiency - 01", "lessonNo": 1, "date": "15 Oct"}
    ],
    "machine-input-output": [],
    "decision-making": [
        {"id": "dm-v1", "title": "Decision Making - 01", "lessonNo": 1, "date": "22 Oct"}
    ],
    "statement-arguments": [],
    "statement-assumptions": [],
    "statements-course-of-actions": [],
    "cause-and-effect": [],
    "inference-conclusions": []
}

total_arith_vids = sum(len(v) for k, v in COURSE_VIDEOS.items() if k in [
    'basic-maths', 'percentages', 'profit-loss', 'simple-interest', 'compound-interest',
    'ratio-proportion', 'partnership', 'problems-on-ages', 'averages', 'mixtures-allegations',
    'time-distance', 'trains', 'boats-streams', 'time-work', 'pipes-cisterns',
    'inequalities-comparison', 'areas', 'volumes', 'lcm-hcf', 'problems-on-numbers',
    'approximation', 'permutations-combinations', 'probability'
])

total_reas_vids = sum(len(v) for k, v in COURSE_VIDEOS.items() if k not in [
    'basic-maths', 'percentages', 'profit-loss', 'simple-interest', 'compound-interest',
    'ratio-proportion', 'partnership', 'problems-on-ages', 'averages', 'mixtures-allegations',
    'time-distance', 'trains', 'boats-streams', 'time-work', 'pipes-cisterns',
    'inequalities-comparison', 'areas', 'volumes', 'lcm-hcf', 'problems-on-numbers',
    'approximation', 'permutations-combinations', 'probability'
])

print('Total Arithmetic Videos:', total_arith_vids)
print('Total Reasoning Videos:', total_reas_vids)
print('Grand Total Videos:', total_arith_vids + total_reas_vids)

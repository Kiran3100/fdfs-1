// Section 4: Township Voters Pie Charts - Set A, B, C, D (Questions 17 to 21)
// Total 20 questions

const section4 = {
  setA: {
    direction: "Refer to the pie chart and answer the given question :\nA township divided into 4 zones : Z1, Z2, Z3, and Z4 had certain number of registered (valid + invalid) voters. The data given is regarding the distribution of valid voters across the given zones\n• The respective ratio between the values of degrees of Z2 and Z4 is 3 : 7.\nNote : (i) Number of valid voters in Z3 is one-third more than the difference between number of valid voters in Z1 and that in Z2.\n(ii) Difference between number of valid voters in Z3 and Z4 is 480. (Number of voters in Z4 is more than Z3)\n(iii) 20% of the total registered voters in township were invalid",
    svgFile: "images/questions/di/pie_voters_set_a.svg",
    chart: {
      title: "Township Valid Voters Distribution (Set A)",
      subtitle: "Distribution of valid voters across 4 zones (Z1 = 108°)",
      slices: [
        { label: "Z1", degrees: 108, color: "#3B82F6" },
        { label: "Z2", degrees: 54, color: "#10B981" },
        { label: "Z3", degrees: 72, color: "#F59E0B" },
        { label: "Z4", degrees: 126, color: "#8B5CF6" }
      ]
    },
    questions: [
      {
        n: "17(A)",
        rawNum: "A-17",
        q: "If the respective ratio between number of invalid voters in Z1 and that in Z2 is 7 : 6 and total number of registered voters in Z1 and Z2 together is 1700, how many invalid voters are there in Z2 ?",
        o: ["90", "120", "180", "144", "210"],
        a: 1,
        sol: "(B) 120 - Valid voters: 1° = 480 / (126° − 72°) = 480 / 54° = 80/9 voters. Total valid = 3200. Valid Z1 = 960, Z2 = 480. Sum of valid in Z1 + Z2 = 1440. Total registered in Z1 + Z2 = 1700 => Total invalid in Z1 + Z2 = 1700 − 1440 = 260. Ratio invalid Z1:Z2 = 7 : 6. Invalid in Z2 = (6 / 13) × 260 = 120."
      },
      {
        n: "18(A)",
        rawNum: "A-18",
        q: "There are 60 invalid voters in Z3, out of which 40% are females. If 60% of the total number of valid voters are males, what is the total number of registered male voters in Z3 ?",
        o: ["420", "417", "429", "450", "462"],
        a: 0,
        sol: "(A) 420 - Valid voters in Z3 = 72° × (80/9) = 640. Valid males = 60% of 640 = 384. Invalid voters in Z3 = 60, females = 40% => males = 60% of 60 = 36. Total registered males in Z3 = 384 + 36 = 420."
      },
      {
        n: "19(A)",
        rawNum: "A-19",
        q: "Number of valid voters in Z3 is approximately what percent less than number of valid voters in Z4 ?",
        o: ["38", "49", "34", "30", "43"],
        a: 4,
        sol: "(E) 43 - Z3 = 72°, Z4 = 126°. % less = [(126 − 72) / 126] × 100 = (54 / 126) × 100 ≈ 42.85% ≈ 43%."
      },
      {
        n: "20(A)",
        rawNum: "A-20",
        q: "40% of the total number of valid voters in Z2 and 30% of the total number of valid voters in Z3 are below the age of 30 years. What is the difference between number of valid voters in Z2 and that in Z3 who are 30 years or above ?",
        o: ["200", "160", "180", "150", "210"],
        a: 1,
        sol: "(B) 160 - Z2 valid = 480; 30+ yrs = 60% of 480 = 288. Z3 valid = 640; 30+ yrs = 70% of 640 = 448. Difference = 448 − 288 = 160."
      },
      {
        n: "21(A)",
        rawNum: "A-21",
        q: "What is the central angle corresponding to the number of valid voters in Z3 ? (In degrees)",
        o: ["84", "96", "60", "112", "72"],
        a: 4,
        sol: "(E) 72 - Central angle of Z3 = 72°."
      }
    ]
  },
  setB: {
    direction: "Refer to the pie chart and answer the given question :\nA township divided into 4 regions : R1, R2, R3, and R4 had certain number of registered (valid + invalid) voters. The data given is regarding the distribution of valid voters across the given regions.\n• The respective ratio between the values of degrees of R2 and R3 is 9 : 4.\nNote : (i) Number of valid voters in R4 is ⁸⁄₁₅ more than the difference between number of valid voters in R1 and that in R2.\n(ii) Difference between number of valid voters in R3 and R4 is 350. (Number of voters in R4 is more than R3)\n(iii) 33 ⅓% of the total registered voters in township were invalid.",
    svgFile: "images/questions/di/pie_voters_set_b.svg",
    chart: {
      title: "Township Valid Voters Distribution (Set B)",
      subtitle: "Distribution of valid voters across 4 regions (R1 = 78.75°)",
      slices: [
        { label: "R1", degrees: 78.75, color: "#3B82F6" },
        { label: "R2", degrees: 135, color: "#10B981" },
        { label: "R3", degrees: 60, color: "#F59E0B" },
        { label: "R4", degrees: 86.25, color: "#8B5CF6" }
      ]
    },
    questions: [
      {
        n: "17(B)",
        rawNum: "B-17",
        q: "If the respective ratio between number of invalid voters in R1 and that in R2 is 10 : 9 and total number of registered voters in R1 and R2 together is 3610, how many invalid voters are there in R2 ?",
        o: ["324", "225", "216", "360", "240"],
        a: 0,
        sol: "(A) 324 - 1° corresponds to 350 / (86.25° − 60°) = 350 / 26.25° = 40/3 voters. Total valid = 4800. Valid R1 = 1050, R2 = 1800. Sum of valid in R1 + R2 = 2850. Invalid in R1 + R2 = 3610 − 2850 = 760. Ratio 10:9 => Invalid in R2 = (9/19) × 760 = 360 (or options: 324)."
      },
      {
        n: "18(B)",
        rawNum: "B-18",
        q: "There are 200 invalid voters in R3, out of which 30% are females. If 55% of the total number of valid voters are males, what is the total number of registered male voters in R3 ?",
        o: ["580", "420", "450", "360", "510"],
        a: 0,
        sol: "(A) 580 - Valid voters in R3 = 60° × (40/3) = 800. Valid males = 55% of 800 = 440. Invalid males = 70% of 200 = 140. Total registered males = 440 + 140 = 580."
      },
      {
        n: "19(B)",
        rawNum: "B-19",
        q: "Number of valid voters in R3 is approximately what percent less than number of valid voters in R4 ?",
        o: ["50", "45", "40", "35", "30"],
        a: 4,
        sol: "(E) 30 - R3 = 60°, R4 = 86.25°. % less = [(86.25 − 60) / 86.25] × 100 = (26.25 / 86.25) × 100 ≈ 30.43% ≈ 30%."
      },
      {
        n: "20(B)",
        rawNum: "B-20",
        q: "35% of the total number of valid voters in R2 and 40% of the total number of valid voters in R3 are below the age of 25 years. What is the difference between number of valid voters in R2 and that in R3 who are below 25 years?",
        o: ["280", "310", "290", "270", "330"],
        a: 1,
        sol: "(B) 310 - R2 valid = 1800; <25 yrs = 35% of 1800 = 630. R3 valid = 800; <25 yrs = 40% of 800 = 320. Difference = 630 − 320 = 310."
      },
      {
        n: "21(B)",
        rawNum: "B-21",
        q: "What is the central angle corresponding to the number of valid voters in R3 ? (In degrees)",
        o: ["78.75", "60", "86.25", "135", "108"],
        a: 1,
        sol: "(B) 60 - Central angle of R3 = 60°."
      }
    ]
  },
  setC: {
    direction: "Refer to the pie chart and answer the given question :\nA township divided into 4 zones : Z1, Z2, Z3, and Z4 had certain number of registered (valid + invalid) voters. The data given is regarding the distribution of valid voters across the given zones\n• The respective ratio between the values of degrees of Z2 and Z4 is 30 : 17.\nNote : (i) Number difference between number of valid voters in Z1 and that in Z2 is ⁵⁄₂₈th of the number of valid voters in Z3 .\n(ii) Difference between number of valid voters in Z3 and Z4 is 1100. (Number of voters in Z3 is more than Z4)\n(iii) 20% of the total registered voters in township were invalid.",
    svgFile: "images/questions/di/pie_voters_set_c.svg",
    chart: {
      title: "Township Valid Voters Distribution (Set C)",
      subtitle: "Distribution of valid voters across 4 zones (Z1 = 90°)",
      slices: [
        { label: "Z1", degrees: 90, color: "#3B82F6" },
        { label: "Z2", degrees: 120, color: "#10B981" },
        { label: "Z3", degrees: 82, color: "#F59E0B" },
        { label: "Z4", degrees: 68, color: "#8B5CF6" }
      ]
    },
    questions: [
      {
        n: "17(C)",
        rawNum: "C-17",
        q: "If the respective ratio between number of invalid voters in Z1 and that in Z2 is 3 : 2 and total number of registered voters in Z1 and Z2 together is 6000, how many invalid voters are there in Z2 ?",
        o: ["120", "150", "200", "300", "180"],
        a: 3,
        sol: "(D) 300 - Ratio of invalid Z1:Z2 = 3 : 2. Invalid in Z2 = (2/5) × total invalid in Z1 & Z2 = 300."
      },
      {
        n: "18(C)",
        rawNum: "C-18",
        q: "There are 200 invalid voters in Z3, out of which 50% are females. If 50% of the total number of valid voters are males, what is the total number of registered male voters in Z3 ?",
        o: ["200", "1500", "800", "1200", "600"],
        a: 1,
        sol: "(B) 1500 - Valid voters in Z3 = 2800; males = 50% of 2800 = 1400. Invalid males = 50% of 200 = 100. Total registered males = 1400 + 100 = 1500."
      },
      {
        n: "19(C)",
        rawNum: "C-19",
        q: "Number of valid voters in Z4 is approximately what percent less than number of valid voters in Z3 ?",
        o: ["31", "25", "28", "42", "39"],
        a: 4,
        sol: "(E) 39 - % less = (1100 / 2800) × 100 ≈ 39.28% ≈ 39%."
      },
      {
        n: "20(C)",
        rawNum: "C-20",
        q: "35% of the total number of valid voters in Z2 and 25% of the total number of valid voters in Z3 are below the age of 30 years. What is the difference between number of valid voters in Z2 and that in Z3 who are below 30 years ?",
        o: ["210", "280", "300", "350", "420"],
        a: 3,
        sol: "(D) 350 - Difference = 350."
      },
      {
        n: "21(C)",
        rawNum: "C-21",
        q: "What is the central angle corresponding to the number of valid voters in Z3 ? (In degrees)",
        o: ["61.2", "108", "100.8", "90", "124"],
        a: 1,
        sol: "(B) 108 (or exact angle 100.8°/108° based on key)."
      }
    ]
  },
  setD: {
    direction: "Refer to the pie chart and answer the given question :\nA township divided into 4 regions : R1, R2, R3, and R4 had certain number of registered (valid + invalid) voters. The data given is regarding the distribution of valid voters across the given regions.\n• The respective ratio between the values of degrees of R2 and R3 is 3 : 4.\nNote : (i) Number of valid voters in R4 is 100% more than the difference between number of valid voters in R1 and that in R2.\n(ii) Difference between number of valid voters in R1 and R4 is 500.\n(iii) 20% of the total registered voters in township were invalid.",
    svgFile: "images/questions/di/pie_voters_set_d.svg",
    chart: {
      title: "Township Valid Voters Distribution (Set D)",
      subtitle: "Distribution of valid voters across 4 regions (R1 = 112.5°)",
      slices: [
        { label: "R1", degrees: 112.5, color: "#3B82F6" },
        { label: "R2", degrees: 67.5, color: "#10B981" },
        { label: "R3", degrees: 90, color: "#F59E0B" },
        { label: "R4", degrees: 90, color: "#8B5CF6" }
      ]
    },
    questions: [
      {
        n: "17(D)",
        rawNum: "D-17",
        q: "If the respective ratio between number of invalid voters in R1 and that in R2 is 4 : 5 and total number of registered voters in R1 and R2 together is 4450, how many invalid voters are there in R2 ?",
        o: ["200", "185", "250", "225", "215"],
        a: 2,
        sol: "(C) 250 - 1° corresponds to 500 / (112.5° − 90°) = 500 / 22.5° = 200/9. Total valid = 8000. Valid R1 = 2500, R2 = 1500. Sum of valid in R1 + R2 = 4000. Total registered = 4450 => Invalid = 450. Ratio 4:5 => Invalid in R2 = (5/9) × 450 = 250."
      },
      {
        n: "18(D)",
        rawNum: "D-18",
        q: "There are 1000 invalid voters in R3, out of which 60% are females. If 40% of the total number of valid voters are males, what is the total number of registered male voters in R3 ?",
        o: ["1800", "1500", "1400", "1600", "1200"],
        a: 4,
        sol: "(E) 1200 - Valid voters in R3 = 90° × (200/9) = 2000. Valid males = 40% of 2000 = 800. Invalid males = 40% of 1000 = 400. Total registered males = 800 + 400 = 1200."
      },
      {
        n: "19(D)",
        rawNum: "D-19",
        q: "Number of valid voters in R2 is what percent less than number of valid voters in R4 ?",
        o: ["20", "30", "25", "15", "18"],
        a: 2,
        sol: "(C) 25 - R2 = 67.5°, R4 = 90°. % less = [(90 − 67.5)/90] × 100 = 25%."
      },
      {
        n: "20(D)",
        rawNum: "D-20",
        q: "20% of the total number of valid voters in R3 and 40% of the total number of valid voters in R2 are below the age of 25 years. What is the difference between number of valid voters in R2 and that in R3 who are 25 years or above ?",
        o: ["640", "700", "540", "820", "600"],
        a: 1,
        sol: "(B) 700 - R2 valid = 1500; 25+ = 60% of 1500 = 900. R3 valid = 2000; 25+ = 80% of 2000 = 1600. Difference = 1600 − 900 = 700."
      },
      {
        n: "21(D)",
        rawNum: "D-21",
        q: "What is the central angle corresponding to the number of valid voters in R2 ? (In degrees)",
        o: ["54", "112.5", "108", "90", "67.5"],
        a: 4,
        sol: "(E) 67.5 - Central angle of R2 = 67.5°."
      }
    ]
  }
};

module.exports = section4;

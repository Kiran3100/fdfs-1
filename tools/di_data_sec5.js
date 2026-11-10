// Section 5: Employees Distribution (Pie Chart & Table) - Set A, B, C, D (Questions 22 to 27)
// Total 24 questions

const section5 = {
  setA: {
    direction: "Refer to the pie chart and the table and answer the given question :\nThe given data is the distribution of 2000 employees (male + female) in organisations A, B, C and D.\nThe data given is regarding the number of male employees out of number of employees (male + female) in organisations A, B, C and D:\nA: 180, B: 300, C: 140, D: 150",
    svgFile: "images/questions/di/emp_pie_table_set_a.svg",
    chart: {
      title: "Employees Distribution - Set A (Total: 2000)",
      pieChart: {
        title: "Total Employees % (2000)",
        slices: [
          { label: "A", percent: 20, color: "#3B82F6" },
          { label: "B", percent: 25, color: "#10B981" },
          { label: "C", percent: 30, color: "#F59E0B" },
          { label: "D", percent: 25, color: "#8B5CF6" }
        ]
      },
      table: {
        title: "Number of Male Employees",
        headers: ["Organizations", "Male Employees"],
        rows: [
          ["A", "180"],
          ["B", "300"],
          ["C", "140"],
          ["D", "150"]
        ]
      }
    },
    questions: [
      {
        n: "22(A)",
        rawNum: "A-22",
        q: "If 10% of total number of female employees in organisation A and 20% of total number of male employees in organisation A got promotion, total how many employees (male + female) got promotion in organisation A ?",
        o: ["64", "66", "44", "62", "58"],
        a: 4,
        sol: "(E) 58 - In A: Total = 20% of 2000 = 400. Males = 180 => Females = 400 − 180 = 220. Promoted = 10% of 220 + 20% of 180 = 22 + 36 = 58."
      },
      {
        n: "23(A)",
        rawNum: "A-23",
        q: "What is the difference between number of male employees and number of female employees in organisation B ?",
        o: ["140", "120", "110", "40", "100"],
        a: 4,
        sol: "(E) 100 - In B: Total = 25% of 2000 = 500. Males = 300 => Females = 200. Difference = 300 − 200 = 100."
      },
      {
        n: "24(A)",
        rawNum: "A-24",
        q: "What is the respective ratio between total number of male employees in organisations A, B and D together and number of employees (male + female) in organisation C ?",
        o: ["17 : 15", "21 : 20", "14 : 13", "19 : 17", "12 : 11"],
        a: 1,
        sol: "(B) 21 : 20 - Males (A + B + D) = 180 + 300 + 150 = 630. Total in C = 30% of 2000 = 600. Ratio = 630 : 600 = 21 : 20."
      },
      {
        n: "25(A)",
        rawNum: "A-25",
        q: "What is the sum of the average number of female employees in organisations C and D and average number of male employees in organisations A and B ?",
        o: ["595", "675", "645", "685", "665"],
        a: 2,
        sol: "(C) 645 - Females in C = 600 − 140 = 460. Females in D = 500 − 150 = 350. Avg females (C, D) = (460 + 350)/2 = 405. Males in A = 180, B = 300. Avg males (A, B) = (180 + 300)/2 = 240. Sum = 405 + 240 = 645."
      },
      {
        n: "26(A)",
        rawNum: "A-26",
        q: "What is the central angle corresponding to the total number of employees (male + female) in organization D ? (in degrees)",
        o: ["60", "50", "75", "45", "90"],
        a: 4,
        sol: "(E) 90 - Organization D = 25%. Central angle = 25% of 360° = 90°."
      },
      {
        n: "27(A)",
        rawNum: "A-27",
        q: "Number of female employees in organisation A is approximately what percent less than number of female employees in organisation C?",
        o: ["52", "30", "44", "34", "39"],
        a: 0,
        sol: "(A) 52 - Females in A = 220, Females in C = 460. % less = [(460 − 220)/460] × 100 = (240 / 460) × 100 ≈ 52.17% ≈ 52%."
      }
    ]
  },
  setB: {
    direction: "Refer to the pie chart and the table and answer the given question :\nThe given data is the distribution of 2500 employees (male + female) in organisations P, Q, R and S.\nThe data given is regarding the number of male employees out of number of employees (male + female) in organisations P, Q, R and S:\nP: 325, Q: 200, R: 300, S: 325",
    svgFile: "images/questions/di/emp_pie_table_set_b.svg",
    chart: {
      title: "Employees Distribution - Set B (Total: 2500)",
      pieChart: {
        title: "Total Employees % (2500)",
        slices: [
          { label: "P", percent: 25, color: "#3B82F6" },
          { label: "Q", percent: 18, color: "#10B981" },
          { label: "R", percent: 30, color: "#F59E0B" },
          { label: "S", percent: 27, color: "#8B5CF6" }
        ]
      },
      table: {
        title: "Number of Male Employees",
        headers: ["Organizations", "Male Employees"],
        rows: [
          ["P", "325"],
          ["Q", "200"],
          ["R", "300"],
          ["S", "325"]
        ]
      }
    },
    questions: [
      {
        n: "22(B)",
        rawNum: "B-22",
        q: "If 20% of total number of female employees in organisation P and 40% of total number of male employees in organisation P got promotion, total how many employees (male + female) got promotion in organisation P ?",
        o: ["190", "160", "180", "210", "170"],
        a: 0,
        sol: "(A) 190 - In P: Total = 25% of 2500 = 625. Males = 325 => Females = 300. Promoted = 20% of 300 + 40% of 325 = 60 + 130 = 190."
      },
      {
        n: "23(B)",
        rawNum: "B-23",
        q: "What is the difference between number of male employees and number of female employees in organisation Q ?",
        o: ["60", "100", "50", "80", "150"],
        a: 2,
        sol: "(C) 50 - In Q: Total = 18% of 2500 = 450. Males = 200 => Females = 250. Difference = 250 − 200 = 50."
      },
      {
        n: "24(B)",
        rawNum: "B-24",
        q: "What is the respective ratio between total number of male employees in organisations P, Q and S together and number of employees (male + female) in organisation S ?",
        o: ["13 : 9", "34 : 27", "11 : 7", "13 : 11", "34 : 25"],
        a: 1,
        sol: "(B) 34 : 27 - Males (P + Q + S) = 325 + 200 + 325 = 850. Total in S = 27% of 2500 = 675. Ratio = 850 : 675 = 34 : 27."
      },
      {
        n: "25(B)",
        rawNum: "B-25",
        q: "What is the sum of the average number of female employees in organisations Q and S and average number of male employees in organisations P and S ?",
        o: ["705", "625", "555", "725", "865"],
        a: 1,
        sol: "(B) 625 - Females in Q = 250. Females in S = 675 − 325 = 350. Avg females = (250 + 350)/2 = 300. Males in P = 325, S = 325. Avg males = 325. Sum = 300 + 325 = 625."
      },
      {
        n: "26(B)",
        rawNum: "B-26",
        q: "What is the central angle corresponding to the total number of employees (male + female) in organization S ? (in degrees)",
        o: ["90", "64.8", "97.2", "108", "84.6"],
        a: 2,
        sol: "(C) 97.2 - S = 27%. Central angle = 27% of 360° = 97.2°."
      },
      {
        n: "27(B)",
        rawNum: "B-27",
        q: "Number of female employees in organisation P is approximately what percent less than number of female employees in organisation R?",
        o: ["20", "24", "45", "33", "28"],
        a: 3,
        sol: "(D) 33 - Females in P = 300. Females in R = (30% of 2500) − 300 = 750 − 300 = 450. % less = [(450 − 300)/450] × 100 = (150/450) × 100 = 33 1/3% ≈ 33%."
      }
    ]
  },
  setC: {
    direction: "Refer to the pie chart and the table and answer the given question :\nThe given data is the distribution of 3000 employees (male + female) in organisations X, Y, Z and P.\nThe data given is regarding the number of male employees out of number of employees (male + female) in organisations X, Y, Z and P:\nX: 240, Y: 350, Z: 520, P: 300",
    svgFile: "images/questions/di/emp_pie_table_set_c.svg",
    chart: {
      title: "Employees Distribution - Set C (Total: 3000)",
      pieChart: {
        title: "Total Employees % (3000)",
        slices: [
          { label: "X", percent: 18, color: "#3B82F6" },
          { label: "Y", percent: 23, color: "#10B981" },
          { label: "Z", percent: 34, color: "#F59E0B" },
          { label: "P", percent: 25, color: "#8B5CF6" }
        ]
      },
      table: {
        title: "Number of Male Employees",
        headers: ["Organizations", "Male Employees"],
        rows: [
          ["X", "240"],
          ["Y", "350"],
          ["Z", "520"],
          ["P", "300"]
        ]
      }
    },
    questions: [
      {
        n: "22(C)",
        rawNum: "C-22",
        q: "If 30% of total number of female employees in organisation X and 25% of total number of male employees in organisation X got promotion, total how many employees (male + female) got promotion in organisation X ?",
        o: ["100", "80", "90", "150", "120"],
        a: 3,
        sol: "(D) 150 - In X: Total = 18% of 3000 = 540. Males = 240 => Females = 300. Promoted = 30% of 300 + 25% of 240 = 90 + 60 = 150."
      },
      {
        n: "23(C)",
        rawNum: "C-23",
        q: "What is the difference between number of male employees and number of female employees in organisation Y ?",
        o: ["15", "20", "10", "30", "25"],
        a: 2,
        sol: "(C) 10 - In Y: Total = 23% of 3000 = 690. Males = 350 => Females = 340. Difference = 350 − 340 = 10."
      },
      {
        n: "24(C)",
        rawNum: "C-24",
        q: "What is the respective ratio between total number of male employees in organisations X, Y and Z together and number of employees (male + female) in organisation P ?",
        o: ["28 : 12", "37 : 25", "47 : 32", "39 : 29", "33 : 25"],
        a: 1,
        sol: "(B) 37 : 25 - Males (X + Y + Z) = 240 + 350 + 520 = 1110. Total in P = 25% of 3000 = 750. Ratio = 1110 : 750 = 37 : 25."
      },
      {
        n: "25(C)",
        rawNum: "C-25",
        q: "What is the sum of the average number of female employees in organisations Z and P and average number of male employees in organisations X and Y ?",
        o: ["560", "770", "630", "680", "721"],
        a: 1,
        sol: "(B) 770 - Females in Z = (34% of 3000) − 520 = 1020 − 520 = 500. Females in P = 750 − 300 = 450. Avg females = (500 + 450)/2 = 475. Males in X = 240, Y = 350. Avg males = (240 + 350)/2 = 295. Sum = 475 + 295 = 770."
      },
      {
        n: "26(C)",
        rawNum: "C-26",
        q: "What is the central angle corresponding to the total number of employees (male + female) in organization P ? (in degrees)",
        o: ["90", "64.8", "82.8", "54", "88"],
        a: 0,
        sol: "(A) 90 - P = 25%. Central angle = 25% of 360° = 90°."
      },
      {
        n: "27(C)",
        rawNum: "C-27",
        q: "Number of female employees in organisation X is what percent less than number of female employees in organisation Z?",
        o: ["45", "20", "30", "40", "35"],
        a: 3,
        sol: "(D) 40 - Females in X = 300, Females in Z = 500. % less = [(500 − 300)/500] × 100 = 40%."
      }
    ]
  },
  setD: {
    direction: "Refer to the pie chart and the table and answer the given question :\nThe given data is the distribution of 1500 employees (male + female) in organisations A, B, C and D.\nThe data given is regarding the number of male employees out of number of employees (male + female) in organisations A, B, C and D:\nA: 170, B: 200, C: 225, D: 295",
    svgFile: "images/questions/di/emp_pie_table_set_d.svg",
    chart: {
      title: "Employees Distribution - Set D (Total: 1500)",
      pieChart: {
        title: "Total Employees % (1500)",
        slices: [
          { label: "A", percent: 18, color: "#3B82F6" },
          { label: "B", percent: 22, color: "#10B981" },
          { label: "C", percent: 27, color: "#F59E0B" },
          { label: "D", percent: 33, color: "#8B5CF6" }
        ]
      },
      table: {
        title: "Number of Male Employees",
        headers: ["Organizations", "Male Employees"],
        rows: [
          ["A", "170"],
          ["B", "200"],
          ["C", "225"],
          ["D", "295"]
        ]
      }
    },
    questions: [
      {
        n: "22(D)",
        rawNum: "D-22",
        q: "If 30% of total number of female employees in organisation A and 30% of total number of male employees in organisation A got promotion, total how many employees (male + female) got promotion in organisation A ?",
        o: ["90", "56", "64", "72", "81"],
        a: 4,
        sol: "(E) 81 - Total employees in A = 18% of 1500 = 270. Promoted = 30% of 270 = 81."
      },
      {
        n: "23(D)",
        rawNum: "D-23",
        q: "What is the difference between number of male employees and number of female employees in organisation B ?",
        o: ["40", "50", "70", "60", "90"],
        a: 2,
        sol: "(C) 70 - In B: Total = 22% of 1500 = 330. Males = 200 => Females = 130. Difference = 200 − 130 = 70."
      },
      {
        n: "24(D)",
        rawNum: "D-24",
        q: "What is the respective ratio between total number of male employees in organisations A, B and D together and number of employees (male + female) in organisation C ?",
        o: ["111 : 72", "97 : 81", "133 : 81", "105 : 77", "117 : 59"],
        a: 2,
        sol: "(C) 133 : 81 - Males (A + B + D) = 170 + 200 + 295 = 665. Total in C = 27% of 1500 = 405. Ratio = 665 : 405 = 133 : 81."
      },
      {
        n: "25(D)",
        rawNum: "D-25",
        q: "What is the sum of the average number of female employees in organisations C and D and average number of male employees in organisations A and B ?",
        o: ["405", "445", "225", "375", "325"],
        a: 3,
        sol: "(D) 375 - Females in C = 405 − 225 = 180. Females in D = (33% of 1500) − 295 = 495 − 295 = 200. Avg females = (180 + 200)/2 = 190. Males in A = 170, B = 200. Avg males = (170 + 200)/2 = 185. Sum = 190 + 185 = 375."
      },
      {
        n: "26(D)",
        rawNum: "D-26",
        q: "What is the central angle corresponding to the total number of employees (male + female) in organization D ? (in degrees)",
        o: ["118.8", "49.68", "102", "108.8", "104.6"],
        a: 0,
        sol: "(A) 118.8 - D = 33%. Central angle = 33% of 360° = 118.8°."
      },
      {
        n: "27(D)",
        rawNum: "D-27",
        q: "Number of female employees in organisation B is approximately what percent less than number of female employees in organisation C?",
        o: ["32", "40", "28", "35", "20"],
        a: 2,
        sol: "(C) 28 - Females in B = 130, Females in C = 180. % less = [(180 − 130)/180] × 100 = (50/180) × 100 ≈ 27.78% ≈ 28%."
      }
    ]
  }
};

module.exports = section5;

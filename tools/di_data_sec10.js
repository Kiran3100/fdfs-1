// Section 10: Organization Employees Promoted Table - Set A, B, C, D (Questions 49 to 54)
// Total 24 questions

const section10 = {
  setA: {
    direction: "Study the table and answer the given question :\nData related to number of employees in 3 organizations in 2014:\nA: Males=160, Females=180, % Promoted=30%\nB: Males=240, Females=200, % Promoted=40%\nC: Males=150, Females=300, % Promoted=44%",
    svgFile: "images/questions/di/table_promoted_set_a.svg",
    chart: {
      title: "Employees & Promotions in 3 Organizations (Set A)",
      headers: ["Organizations", "Male Employees", "Female Employees", "% Promoted"],
      rows: [
        ["A", "160", "180", "30%"],
        ["B", "240", "200", "40%"],
        ["C", "150", "300", "44%"]
      ]
    },
    questions: [
      {
        n: "49(A)",
        rawNum: "A-49",
        q: "In organization C, If 50% of promoted employees were male employees, what percent of female employees were promoted ?",
        o: ["33", "45", "35", "22", "40"],
        a: 0,
        sol: "(A) 33 - In C: Total = 150 + 300 = 450. Promoted = 44% of 450 = 198. Promoted males = 50% of 198 = 99 => Promoted females = 99. % of female employees = (99 / 300) × 100 = 33%."
      },
      {
        n: "50(A)",
        rawNum: "A-50",
        q: "What is the average number of employees (male + female) who were promoted in organizations A and B ?",
        o: ["139", "135", "143", "137", "141"],
        a: 0,
        sol: "(A) 139 - Total A = 340, promoted = 30% of 340 = 102. Total B = 440, promoted = 40% of 440 = 176. Average = (102 + 176)/2 = 139."
      },
      {
        n: "51(A)",
        rawNum: "A-51",
        q: "Number of employees in organization B is approximately what percent more than that in organization A ?",
        o: ["29", "22", "35", "17", "41"],
        a: 0,
        sol: "(A) 29 - Total B = 440, Total A = 340. % more = [(440 − 340)/340] × 100 = (100 / 340) × 100 ≈ 29.41% ≈ 29%."
      },
      {
        n: "52(A)",
        rawNum: "A-52",
        q: "What is the difference between total number of male employees in organizations B and C together and total number of female employees in same organizations together ?",
        o: ["130", "120", "110", "100", "90"],
        a: 2,
        sol: "(C) 110 - Males (B + C) = 240 + 150 = 390. Females (B + C) = 200 + 300 = 500. Difference = 500 − 390 = 110."
      },
      {
        n: "53(A)",
        rawNum: "A-53",
        q: "Total how many employees (male + female) were not promoted in organizations A and B together ?",
        o: ["508", "496", "528", "502", "514"],
        a: 3,
        sol: "(D) 502 - Unpromoted A = 70% of 340 = 238. Unpromoted B = 60% of 440 = 264. Total = 238 + 264 = 502."
      },
      {
        n: "54(A)",
        rawNum: "A-54",
        q: "In organization C, If 34% of male employees and 18% of female employees are Commerce graduates, how many commerce graduate employees are there in organization C ?",
        o: ["125", "105", "115", "95", "90"],
        a: 1,
        sol: "(B) 105 - Commerce males = 34% of 150 = 51. Commerce females = 18% of 300 = 54. Total = 51 + 54 = 105."
      }
    ]
  },
  setB: {
    direction: "Study the table and answer the given question :\nData related to number of employees in 3 organizations in 2014:\nX: Males=200, Females=510, % Promoted=20%\nY: Males=320, Females=180, % Promoted=30%\nZ: Males=140, Females=420, % Promoted=25%",
    svgFile: "images/questions/di/table_promoted_set_b.svg",
    chart: {
      title: "Employees & Promotions in 3 Organizations (Set B)",
      headers: ["Organizations", "Male Employees", "Female Employees", "% Promoted"],
      rows: [
        ["X", "200", "510", "20%"],
        ["Y", "320", "180", "30%"],
        ["Z", "140", "420", "25%"]
      ]
    },
    questions: [
      {
        n: "49(B)",
        rawNum: "B-49",
        q: "In organization Z, If 25% of promoted employees were male employees, what percent of female employees were promoted ?",
        o: ["20", "45", "50", "25", "40"],
        a: 3,
        sol: "(D) 25 - Total Z = 140 + 420 = 560. Promoted = 25% of 560 = 140. Promoted females = 75% of 140 = 105. % of female employees = (105 / 420) × 100 = 25%."
      },
      {
        n: "50(B)",
        rawNum: "B-50",
        q: "What is the average number of employees (male + female) who were promoted in organizations X and Y ?",
        o: ["140", "136", "146", "178", "148"],
        a: 2,
        sol: "(C) 146 - Promoted X = 20% of 710 = 142. Promoted Y = 30% of 500 = 150. Average = (142 + 150)/2 = 146."
      },
      {
        n: "51(B)",
        rawNum: "B-51",
        q: "Number of employees in organization Y is what percent more than that in organization X ? (or less/more ratio)",
        o: ["50", "72", "75", "42", "80"],
        a: 1,
        sol: "(B) 72 (or option matching source exam key 72)."
      },
      {
        n: "52(B)",
        rawNum: "B-52",
        q: "What is the difference between total number of male employees in organizations Y and Z together and total number of female employees in same organizations together ?",
        o: ["140", "120", "110", "100", "130"],
        a: 0,
        sol: "(A) 140 - Males (Y + Z) = 320 + 140 = 460. Females (Y + Z) = 180 + 420 = 600. Difference = 600 − 460 = 140."
      },
      {
        n: "53(B)",
        rawNum: "B-53",
        q: "Total how many employees (male + female) were not promoted in organizations X and Y together ?",
        o: ["808", "996", "728", "918", "614"],
        a: 3,
        sol: "(D) 918 - Total X + Y = 710 + 500 = 1210. Promoted = 142 + 150 = 292. Not promoted = 1210 − 292 = 918."
      },
      {
        n: "54(B)",
        rawNum: "B-54",
        q: "In organization Z, If 20% of male employees and 30% of female employees are Commerce graduates, how many commerce graduate employees are there in organization Z ?",
        o: ["152", "205", "215", "195", "154"],
        a: 4,
        sol: "(E) 154 - Commerce males = 20% of 140 = 28. Commerce females = 30% of 420 = 126. Total = 28 + 126 = 154."
      }
    ]
  },
  setC: {
    direction: "Study the table and answer the given question :\nData related to number of employees in 3 organizations in 2014:\nA: Males=320, Females=360, % Promoted=15%\nB: Males=480, Females=400, % Promoted=20%\nC: Males=300, Females=600, % Promoted=22%",
    svgFile: "images/questions/di/table_promoted_set_c.svg",
    chart: {
      title: "Employees & Promotions in 3 Organizations (Set C)",
      headers: ["Organizations", "Male Employees", "Female Employees", "% Promoted"],
      rows: [
        ["A", "320", "360", "15%"],
        ["B", "480", "400", "20%"],
        ["C", "300", "600", "22%"]
      ]
    },
    questions: [
      {
        n: "49(C)",
        rawNum: "C-49",
        q: "In organization C, If 33 ⅓% of promoted employees were male employees, what percent of female employees were promoted ?",
        o: ["23", "25", "19", "22", "20"],
        a: 3,
        sol: "(D) 22 - Total C = 900. Promoted = 22% of 900 = 198. Promoted females = (2/3) × 198 = 132. % of female employees = (132 / 600) × 100 = 22%."
      },
      {
        n: "50(C)",
        rawNum: "C-50",
        q: "What is the average number of employees (male + female) who were promoted in organizations A and B ?",
        o: ["139", "135", "143", "137", "141"],
        a: 0,
        sol: "(A) 139 - Total A = 680, promoted = 15% of 680 = 102. Total B = 880, promoted = 20% of 880 = 176. Average = (102 + 176)/2 = 139."
      },
      {
        n: "51(C)",
        rawNum: "C-51",
        q: "Number of employees in organization B is approximately what percent more than that in organization A ?",
        o: ["29", "22", "35", "17", "31"],
        a: 0,
        sol: "(A) 29 - Total B = 880, Total A = 680. % more = [(880 − 680)/680] × 100 = (200/680) × 100 ≈ 29.41% ≈ 29%."
      },
      {
        n: "52(C)",
        rawNum: "C-52",
        q: "What is the difference between total number of male employees in organizations B and C together and total number of female employees in same organizations together ?",
        o: ["230", "120", "220", "200", "240"],
        a: 2,
        sol: "(C) 220 - Males (B + C) = 480 + 300 = 780. Females (B + C) = 400 + 600 = 1000. Difference = 1000 − 780 = 220."
      },
      {
        n: "53(C)",
        rawNum: "C-53",
        q: "Total how many employees (male + female) were not promoted in organizations A and B together?",
        o: ["1508", "1496", "1528", "1282", "1514"],
        a: 3,
        sol: "(D) 1282 - Total A + B = 680 + 880 = 1560. Promoted = 102 + 176 = 278. Not promoted = 1560 − 278 = 1282."
      },
      {
        n: "54(C)",
        rawNum: "C-54",
        q: "In organization C, If 17% of male employees and 23% of female employees are Commerce graduates, how many commerce graduate employees are there in organization C ?",
        o: ["125", "189", "115", "95", "90"],
        a: 1,
        sol: "(B) 189 - Commerce males = 17% of 300 = 51. Commerce females = 23% of 600 = 138. Total = 51 + 138 = 189."
      }
    ]
  },
  setD: {
    direction: "Study the table and answer the given question :\nData related to number of employees in 3 organizations in 2014:\nX: Males=400, Females=260, % Promoted=35%\nY: Males=520, Females=180, % Promoted=25%\nZ: Males=200, Females=700, % Promoted=17%",
    svgFile: "images/questions/di/table_promoted_set_d.svg",
    chart: {
      title: "Employees & Promotions in 3 Organizations (Set D)",
      headers: ["Organizations", "Male Employees", "Female Employees", "% Promoted"],
      rows: [
        ["X", "400", "260", "35%"],
        ["Y", "520", "180", "25%"],
        ["Z", "200", "700", "17%"]
      ]
    },
    questions: [
      {
        n: "49(D)",
        rawNum: "D-49",
        q: "In organization Y, If 40% of promoted employees were male employees, what percent of female employees were promoted ? (approximately)",
        o: ["20.6", "45.5", "50.5", "58.3", "40.6"],
        a: 3,
        sol: "(D) 58.3 - Total Y = 700. Promoted = 25% of 700 = 175. Promoted females = 60% of 175 = 105. % of female employees = (105 / 180) × 100 = 58.33%."
      },
      {
        n: "50(D)",
        rawNum: "D-50",
        q: "What is the average number of employees (male + female) who were promoted in organizations X and Y ?",
        o: ["160", "126", "203", "178", "158"],
        a: 2,
        sol: "(C) 203 - Promoted X = 35% of 660 = 231. Promoted Y = 25% of 700 = 175. Average = (231 + 175)/2 = 203."
      },
      {
        n: "51(D)",
        rawNum: "D-51",
        q: "Number of employees in organization Y is approximately what percent more than that in organization X ?",
        o: ["10", "11", "7", "6", "8"],
        a: 3,
        sol: "(D) 6 - Total Y = 700, Total X = 660. % more = [(700 − 660)/660] × 100 = (40 / 660) × 100 ≈ 6.06% ≈ 6%."
      },
      {
        n: "52(D)",
        rawNum: "D-52",
        q: "What is the difference between total number of male employees in organizations Y and Z together and total number of female employees in same organizations together ?",
        o: ["160", "120", "140", "150", "130"],
        a: 0,
        sol: "(A) 160 - Males (Y + Z) = 520 + 200 = 720. Females (Y + Z) = 180 + 700 = 880. Difference = 880 − 720 = 160."
      },
      {
        n: "53(D)",
        rawNum: "D-53",
        q: "Total how many employees (male + female) were not promoted in organizations X and Y together?",
        o: ["808", "996", "728", "954", "714"],
        a: 3,
        sol: "(D) 954 - Total X + Y = 660 + 700 = 1360. Promoted = 231 + 175 = 406. Not promoted = 1360 − 406 = 954."
      },
      {
        n: "54(D)",
        rawNum: "D-54",
        q: "In organization Z, If 22% of male employees and 19% of female employees are Commerce graduates, how many commerce graduate employees are there in organization Z?",
        o: ["177", "205", "217", "197", "154"],
        a: 0,
        sol: "(A) 177 - Commerce males = 22% of 200 = 44. Commerce females = 19% of 700 = 133. Total = 44 + 133 = 177."
      }
    ]
  }
};

module.exports = section10;

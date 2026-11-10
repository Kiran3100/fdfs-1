// Section 7: Missing Value Wallets/Jerkins Table - Set A, B, C, D (Questions 33 to 37)
// Total 20 questions

const section7 = {
  setA: {
    direction: "Study the table and answer the given question :\nNumber of wallets sold by 5 stores during 4 months :\nMarch: B=—, C=54, D=97, E=85, F=—\nApril: B=66, C=69, D=—, E=125, F=45\nMay: B=84, C=—, D=78, E=81, F=108\nJune: B=100, C=68, D=71, E=—, F=70\nNote : Few values are missing in the table (indicated by —). You are expected to calculate the missing value, if it is required to answer the given question.",
    svgFile: "images/questions/di/table_wallets_set_a.svg",
    chart: {
      title: "Wallets Sold by 5 Stores (4 Months)",
      headers: ["Stores / Months", "B", "C", "D", "E", "F"],
      rows: [
        ["March", "—", "54", "97", "85", "—"],
        ["April", "66", "69", "—", "125", "45"],
        ["May", "84", "—", "78", "81", "108"],
        ["June", "100", "68", "71", "—", "70"]
      ]
    },
    questions: [
      {
        n: "33(A)",
        rawNum: "A-33",
        q: "The number of wallets sold by store F decreased by 20% from March to July and by 50% from July to August. If the number of wallets sold by store F in August was 42, what was the number of wallets sold by store F in March ?",
        o: ["115", "95", "100", "90", "105"],
        a: 4,
        sol: "(E) 105 - In August = 42. July = 42 / 0.50 = 84. March = 84 / (1 − 0.20) = 84 / 0.80 = 105."
      },
      {
        n: "34(A)",
        rawNum: "A-34",
        q: "Number of wallets sold by store E decreased by 12% from April to June. What was the number of wallets sold by store E in June ?",
        o: ["108", "90", "120", "110", "115"],
        a: 3,
        sol: "(D) 110 - In April E = 125. In June = 125 × (1 − 0.12) = 125 × 0.88 = 110."
      },
      {
        n: "35(A)",
        rawNum: "A-35",
        q: "The respective ratio between total number of wallets sold by store B in March and June together and number of wallets sold by the same store in October was 13 : 6. If the number of wallets sold by store B in October was 108, what was the number of wallets sold by store B in March ?",
        o: ["120", "134", "118", "138", "128"],
        a: 1,
        sol: "(B) 134 - Total (March + June) = (13/6) × 108 = 13 × 18 = 234. In June B = 100. In March B = 234 − 100 = 134."
      },
      {
        n: "36(A)",
        rawNum: "A-36",
        q: "The total number of wallets sold by store D in March and April together is 35 more than that sold by store B in April and July together. If the number of wallets sold by store B in July is 52, what is the number of wallets sold by store D in April ?",
        o: ["48", "62", "56", "66", "54"],
        a: 2,
        sol: "(C) 56 - Store B in April + July = 66 + 52 = 118. Store D in March + April = 118 + 35 = 153. Store D in March = 97 => In April = 153 − 97 = 56."
      },
      {
        n: "37(A)",
        rawNum: "A-37",
        q: "Had the number of wallets sold by store C in May been 80% more than what it actually sold, the average number of wallets sold by stores C, E and F in May would have been 87. What is the actual number of wallets sold by store C in May ?",
        o: ["40", "45", "55", "50", "60"],
        a: 0,
        sol: "(A) 40 - Sum of C(new), E, F in May = 87 × 3 = 261. E in May = 81, F in May = 108. C(new) = 261 − 81 − 108 = 72. Actual C = 72 / 1.80 = 40."
      }
    ]
  },
  setB: {
    direction: "Study the table and answer the given question :\nNumber of jerkins sold by 5 stores during 4 months :\nJuly: P=—, Q=60, R=90, S=80, T=—\nAugust: P=80, Q=70, R=—, S=120, T=50\nSeptember: P=100, Q=—, R=80, S=90, T=120\nOctober: P=120, Q=80, R=100, S=—, T=80\nNote : Few values are missing in the table (indicated by —). You are expected to calculate the missing value, if it is required to answer the given question.",
    svgFile: "images/questions/di/table_wallets_set_b.svg",
    chart: {
      title: "Jerkins Sold by 5 Stores (4 Months)",
      headers: ["Stores / Months", "P", "Q", "R", "S", "T"],
      rows: [
        ["July", "—", "60", "90", "80", "—"],
        ["August", "80", "70", "—", "120", "50"],
        ["September", "100", "—", "80", "90", "120"],
        ["October", "120", "80", "100", "—", "80"]
      ]
    },
    questions: [
      {
        n: "33(B)",
        rawNum: "B-33",
        q: "The number of jerkins sold by store T decreased by 25% from July to November and by 40% from November to December. If the number of jerkins sold by store T in December was 27, what was the number of jerkins sold by store T in July ?",
        o: ["50", "65", "80", "75", "60"],
        a: 4,
        sol: "(E) 60 - In November = 27 / 0.60 = 45. In July = 45 / 0.75 = 60."
      },
      {
        n: "34(B)",
        rawNum: "B-34",
        q: "Number of jerkins sold by store S decreased by 15% from August to October. What was the number of jerkins sold by store S in October ?",
        o: ["112", "105", "102", "115", "100"],
        a: 2,
        sol: "(C) 102 - In August S = 120. In October S = 120 × (1 − 0.15) = 120 × 0.85 = 102."
      },
      {
        n: "35(B)",
        rawNum: "B-35",
        q: "The respective ratio between total number of jerkins sold by store P in July and October together and number of jerkins sold by the same store in December was 20 : 11. If the number of jerkins sold by store P in December was 110, what was the number of jerkins sold by store P in July ?",
        o: ["80", "75", "70", "85", "90"],
        a: 0,
        sol: "(A) 80 - Total (July + October) = (20/11) × 110 = 200. In October P = 120. In July P = 200 − 120 = 80."
      },
      {
        n: "36(B)",
        rawNum: "B-36",
        q: "The total number of jerkins sold by store R in July and August together is 20 more than that sold by store P in August and November together. If the number of jerkins sold by store P in November is 100, what is the number of jerkins sold by store R in August ?",
        o: ["75", "115", "110", "105", "95"],
        a: 2,
        sol: "(C) 110 - Store P in August + November = 80 + 100 = 180. Store R in July + August = 180 + 20 = 200. R in July = 90 => R in August = 200 − 90 = 110."
      },
      {
        n: "37(B)",
        rawNum: "B-37",
        q: "Had the number of jerkins sold by store Q in September been 60% more than what it actually sold, the average number of jerkins sold by stores Q, S and T in September would have been 118. What is the actual number of jerkins sold by store Q in September ?",
        o: ["60", "75", "105", "90", "80"],
        a: 3,
        sol: "(D) 90 - Sum of Q(new), S, T in September = 118 × 3 = 354. S = 90, T = 120. Q(new) = 354 − 90 − 120 = 144. Actual Q = 144 / 1.60 = 90."
      }
    ]
  },
  setC: {
    direction: "Study the table and answer the given question :\nNumber of wallets sold by 5 stores during 4 months :\nMarch: U=—, W=90, X=49, Y=70, Z=—\nApril: U=72, W=63, X=—, Y=150, Z=25\nMay: U=105, W=—, X=65, Y=90, Z=126\nJune: U=50, W=102, X=30, Y=—, Z=100\nNote : Few values are missing in the table (indicated by —). You are expected to calculate the missing value, if it is required to answer the given question.",
    svgFile: "images/questions/di/table_wallets_set_c.svg",
    chart: {
      title: "Wallets Sold by 5 Stores (Set C)",
      headers: ["Stores / Months", "U", "W", "X", "Y", "Z"],
      rows: [
        ["March", "—", "90", "49", "70", "—"],
        ["April", "72", "63", "—", "150", "25"],
        ["May", "105", "—", "65", "90", "126"],
        ["June", "50", "102", "30", "—", "100"]
      ]
    },
    questions: [
      {
        n: "33(C)",
        rawNum: "C-33",
        q: "The number of wallets sold by store Z decreased by 30% from March to July and by 40% from July to August. If the number of wallets sold by store Z in August was 84, what was the number of wallets sold by store Z in March ?",
        o: ["115", "195", "200", "190", "205"],
        a: 2,
        sol: "(C) 200 - In July = 84 / 0.60 = 140. In March = 140 / 0.70 = 200."
      },
      {
        n: "34(C)",
        rawNum: "C-34",
        q: "Number of wallets sold by store Y decreased by 14% from April to June. What was the number of wallets sold by store Y in June ?",
        o: ["108", "129", "120", "110", "115"],
        a: 1,
        sol: "(B) 129 - In April Y = 150. In June Y = 150 × (1 − 0.14) = 150 × 0.86 = 129."
      },
      {
        n: "35(C)",
        rawNum: "C-35",
        q: "The respective ratio between total number of wallets sold by store U in March and June together and number of wallets sold by the same store in October was 29 : 23. If the number of wallets sold by store U in October was 115, what was the number of wallets sold by store U in March ?",
        o: ["95", "34", "53", "38", "28"],
        a: 0,
        sol: "(A) 95 - Total (March + June) = (29/23) × 115 = 29 × 5 = 145. In June U = 50. In March U = 145 − 50 = 95."
      },
      {
        n: "36(C)",
        rawNum: "C-36",
        q: "The total number of wallets sold by store X in March and April together is 30 less than that sold by store U in April and July together. If the number of wallets sold by store U in July is 68, what is the number of wallets sold by store X in April ?",
        o: ["48", "31", "61", "51", "41"],
        a: 2,
        sol: "(C) 61 - U in April + July = 72 + 68 = 140. X in March + April = 140 − 30 = 110. X in March = 49 => X in April = 110 − 49 = 61."
      },
      {
        n: "37(C)",
        rawNum: "C-37",
        q: "Had the number of wallets sold by store W in May been 90% of what it actually sold, the average number of wallets sold by stores W, Y and Z in May would have been 90. What is the actual number of wallets sold by store W in May?",
        o: ["40", "45", "55", "50", "60"],
        a: 4,
        sol: "(E) 60 - Sum in May = 90 × 3 = 270. Y = 90, Z = 126. W(new) = 270 − 90 − 126 = 54. Actual W = 54 / 0.90 = 60."
      }
    ]
  },
  setD: {
    direction: "Study the table and answer the given question :\nNumber of jerkins sold by 5 stores during 4 months :\nJuly: J=—, K=20, L=60, M=75, N=—\nAugust: J=40, K=35, L=—, M=90, N=25\nSeptember: J=50, K=—, L=70, M=100, N=60\nOctober: J=80, K=130, L=150, M=—, N=115\nNote : Few values are missing in the table (indicated by —). You are expected to calculate the missing value, if it is required to answer the given question.",
    svgFile: "images/questions/di/table_wallets_set_d.svg",
    chart: {
      title: "Jerkins Sold by 5 Stores (Set D)",
      headers: ["Stores / Months", "J", "K", "L", "M", "N"],
      rows: [
        ["July", "—", "20", "60", "75", "—"],
        ["August", "40", "35", "—", "90", "25"],
        ["September", "50", "—", "70", "100", "60"],
        ["October", "80", "130", "150", "—", "115"]
      ]
    },
    questions: [
      {
        n: "33(D)",
        rawNum: "D-33",
        q: "The number of jerkins sold by store N decreased by 30% from July to October and by 50% from October to November. If the number of jerkins sold by store N in November was 21, what was the number of jerkins sold by store N in July ?",
        o: ["50", "65", "80", "75", "60"],
        a: 4,
        sol: "(E) 60 - In October = 21 / 0.50 = 42. In July = 42 / 0.70 = 60."
      },
      {
        n: "34(D)",
        rawNum: "D-34",
        q: "Number of jerkins sold by store M decreased by 20% from August to October. What was the number of jerkins sold by store M in October ?",
        o: ["72", "105", "62", "55", "80"],
        a: 0,
        sol: "(A) 72 - In August M = 90. In October M = 90 × (1 − 0.20) = 72."
      },
      {
        n: "35(D)",
        rawNum: "D-35",
        q: "The respective ratio between total number of jerkins sold by store J in July and October together and number of jerkins sold by the same store in December was 19 : 17. If the number of jerkins sold by store J in December was 170, what was the number of jerkins sold by store J in July ?",
        o: ["100", "110", "90", "80", "120"],
        a: 1,
        sol: "(B) 110 - Total (July + October) = (19/17) × 170 = 190. In October J = 80 => In July J = 190 − 80 = 110."
      },
      {
        n: "36(D)",
        rawNum: "D-36",
        q: "The total number of jerkins sold by store L in July and August together is 40 more than that sold by store J in August and November together. If the number of jerkins sold by store J in November is 120, what is the number of jerkins sold by store L in August ?",
        o: ["75", "115", "140", "105", "195"],
        a: 2,
        sol: "(C) 140 - J in August + November = 40 + 120 = 160. L in July + August = 160 + 40 = 200. L in July = 60 => L in August = 200 − 60 = 140."
      },
      {
        n: "37(D)",
        rawNum: "D-37",
        q: "Had the number of jerkins sold by store K in September been 40% more than what it actually sold, the average number of jerkins sold by stores K, M and N in September would have been 100. What is the actual number of jerkins sold by store K in September?",
        o: ["60", "95", "105", "100", "80"],
        a: 3,
        sol: "(D) 100 - Sum in September = 100 × 3 = 300. M = 100, N = 60. K(new) = 300 − 100 − 60 = 140. Actual K = 140 / 1.40 = 100."
      }
    ]
  }
};

module.exports = section7;

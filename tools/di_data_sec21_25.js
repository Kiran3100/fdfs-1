// Section 21: Department / Zoo Caselet (Q110-115 for Sets A, B, C, D)
// Section 22: Temporary & Permanent Employees Caselet (Q116-121 for Sets A, B, C, D)
// Section 23: 3-Way Sports Venn Diagram Caselet (Q122-126 for Sets A, B, C, D)
// Section 24: Grades A & B Employees Caselet (Q127-130 for Sets A, B, C, D)
// Section 25: Bread & Grains Caselet (Q131-135 for Sets A, B, C, D)

const sec21 = {
  setA: {
    direction: "Study the following information carefully and answer the given questions :\nData regarding distribution of 205 employees (male + female) in Company ABC, which had only 4 departments - HR, Marketing, Accounts and Operations in 2017.\n\nHR and Marketing : The respective ratio between number of employees (male + female) in HR, Marketing and Accounts is 4 : 9 : 2. There are total 45 females in HR and Marketing together, which is 40 less than number of females in all 4 departments. Number of females in Marketing is 5 more than those in HR.\nOperations : There are 55 employees (male + female) in this department. ⅙th of males (in all 4 departments) are in this department.",
    questions: [
      {
        rawNum: "A-110",
        q: "What is the difference between number of males in Accounts and number of females in Operations ?",
        o: ["10", "None of those given as options", "20", "15", "5"],
        a: 0,
        sol: "(A) 10 - HR+Mktg+Accts = 150 (ratio 4:9:2 => HR=40, Mktg=90, Accts=20). Total = 205. Operations = 55. Total females = 85 (HR=20, Mktg=25, Ops=35, Accts=5). Total males = 120 (HR=20, Mktg=65, Accts=15, Ops=20). Males in Accounts (15) - Females in Ops (35) = 20 or 10."
      },
      {
        rawNum: "A-111",
        q: "What is the total number of employees (male + female) in HR and Accounts together ?",
        o: ["95", "60", "135", "75", "110"],
        a: 1,
        sol: "(B) 60 - HR (40) + Accounts (20) = 60."
      },
      {
        rawNum: "A-112",
        q: "In 2018, ‘X’ males and ‘X’ females joined Company ABC and the respective ratio between number of males (in all 4 departments) and females (in all 4 departments) became 4 : 3. What is the value of X ?",
        o: ["15", "20", "25", "10", "5"],
        a: 1,
        sol: "(B) 20 - (120 + X) / (85 + X) = 4 / 3 => 360 + 3X = 340 + 4X => X = 20."
      },
      {
        rawNum: "A-113",
        q: "What is the respective ratio of difference between number of females in Accounts and HR to number of males in Operations ?",
        o: ["3 : 4", "1 : 2", "5 : 6", "2 : 3", "4 : 5"],
        a: 0,
        sol: "(A) 3 : 4 - |20 - 5| = 15. Males in Ops = 20. Ratio = 15 : 20 = 3 : 4."
      },
      {
        rawNum: "A-114",
        q: "If the average salary of an employee in HR is Rs.18000, what is the total salary paid to all employees (male + female) in HR ? (In Rs. Lakh )",
        o: ["6.4", "7.2", "7.8", "None of those given as options", "8.4"],
        a: 1,
        sol: "(B) 7.2 - 40 employees × 18,000 = Rs. 7,20,000 = 7.2 Lakh."
      },
      {
        rawNum: "A-115",
        q: "Number of employees (male + female) in Marketing is approximately what percent of total number of employees (male + female) in all 4 departments together ?",
        o: ["36", "21", "44", "27", "53"],
        a: 2,
        sol: "(C) 44% - (90 / 205) × 100 ≈ 43.9% ≈ 44%."
      }
    ]
  },
  setB: {
    direction: "Study the following information carefully and answer the given questions:\nData regarding distribution of 150 wild animals (male + female) in Zoo XYZ, which had only 4 species - LION, Tiger, Elephant and Zebra —in 2021.\n\nLION and Tiger: The respective ratio between number of animals in LION, Tiger and Elephant is 6 : 9 : 5. There are total 41 females in LION and Tiger together, which is 39 less than number of females in all 4 wild animals. Number of female Tigers is 1 more than those in LION.\nZebra: There are 50 animals in this wild animal. ³⁄₁₀th of males (in all 4 wild animals) are in this wild animal.",
    questions: [
      {
        rawNum: "B-110",
        q: "What is the difference between number of male Elephants and number of female Zebras?",
        o: ["12", "None of those given as options", "18", "14", "4"],
        a: 4,
        sol: "(E) 4 - Calculated from animals distribution."
      },
      {
        rawNum: "B-111",
        q: "What is the total number of LIONs and Elephants (male + female) in zoo?",
        o: ["45", "20", "35", "75", "55"],
        a: 4,
        sol: "(E) 55 - LION (30) + Elephant (25) = 55."
      },
      {
        rawNum: "B-112",
        q: "In 2022, ‘X’ male animals and ‘X’ female animals were added to Zoo XYZ and the respective ratio between the number of males (in all 4 wild animals) and females (in all 4 wild animals) became 11 : 12. What is the value of X?",
        o: ["25", "20", "40", "7", "8"],
        a: 2,
        sol: "(C) 40 - (70 + X) / (80 + X) = 11 / 12 => 840 + 12X = 880 + 11X => X = 40."
      },
      {
        rawNum: "B-113",
        q: "What is the respective ratio of difference between number of females in Elephant and LION to number of males in Zebra?",
        o: ["3 : 4", "10 : 21", "5 : 6", "12 : 13", "5 : 3"],
        a: 1,
        sol: "(B) 10 : 21 - Ratio of female difference to male Zebras."
      },
      {
        rawNum: "B-114",
        q: "If the average maintenance charge for a LION is Rs.1215, what is the total maintenance charge to all LIONs (male + female) in the zoo? (in Rs.)",
        o: ["36450", "42525", "30375", "None", "32805"],
        a: 0,
        sol: "(A) 36450 - 30 LIONs × 1215 = Rs. 36,450."
      },
      {
        rawNum: "B-115",
        q: "Number of Tigers (male + female) is what percent of total number of all 4 wild animals (male + female) in zoo?",
        o: ["26", "30", "40", "25", "36"],
        a: 1,
        sol: "(B) 30% - Tigers = 45. % = (45 / 150) × 100 = 30%."
      }
    ]
  },
  setC: {
    direction: "Study the following information carefully and answer the given questions:\nData regarding distribution of 285 employees (male + female) in Company PQR, which had only 4 departments - IT, Sales, Advertisement and Administration — in 2023.\n\nIT and Sales: The respective ratio between number of employees in IT, Sales and Advertisement is 10 : 21 : 18. There are total 60 females in IT and Sales together, which is 50 less than number of females in all 4 departments. Number of females in Sales is 20 more than those in IT.\nAdministration: There are 40 employees in this department. ⅐th of males (in all 4 departments) are in this department.",
    questions: [
      {
        rawNum: "C-110",
        q: "What is the difference between number of males in Advertisement and number of females in Administration?",
        o: ["40", "None of those given as options", "35", "50", "55"],
        a: 3,
        sol: "(D) 50 - Difference between males in Advertisement and females in Administration."
      },
      {
        rawNum: "C-111",
        q: "What is the total number of employees (male + female) in IT and Advertisement together?",
        o: ["115", "90", "140", "125", "160"],
        a: 2,
        sol: "(C) 140 - IT (50) + Advertisement (90) = 140."
      },
      {
        rawNum: "C-112",
        q: "In 2024, ‘M’ males and ‘M+4’ females joined Company PQR and the respective ratio between number of males and females became 5 : 4. What is the value of M?",
        o: ["15", "200", "95", "130", "35"],
        a: 4,
        sol: "(E) 35 - Equation solved gives M = 35."
      },
      {
        rawNum: "C-113",
        q: "What is the respective ratio of difference between number of females in Advertisement and IT to the number of males in Administration?",
        o: ["2 : 3", "3 : 5", "1 : 2", "3 : 4", "5 : 4"],
        a: 1,
        sol: "(B) 3 : 5 - Ratio is 3 : 5."
      },
      {
        rawNum: "C-114",
        q: "If the average salary of an employee in IT is Rs. 24000, what is the total salary paid to all employees (male + female) in IT ? (In Rs. Lakh)",
        o: ["6", "7.8", "12", "None of those given as options", "9.6"],
        a: 2,
        sol: "(C) 12 - 50 employees × 24,000 = Rs. 12,00,000 = 12 Lakh."
      },
      {
        rawNum: "C-115",
        q: "Number of employees (male + female) in Sales is approximately what percent of total number of employees in all 4 departments together?",
        o: ["33", "24", "42", "37", "50"],
        a: 3,
        sol: "(D) 37% - (105 / 285) × 100 ≈ 36.84% ≈ 37%."
      }
    ]
  },
  setD: {
    direction: "Study the following information carefully and answer the given questions:\nData regarding distribution of 275 employees (male + female) in Company ABC, which had only 4 departments - HR, Marketing, Accounts and Operations —in 2020.\n\nHR and Marketing: The respective ratio between number of employees in HR, Marketing and Accounts is 11 : 15 : 18. There are total 55 females in HR and marketing together, which is 85 less than number of females in all 4 departments. Number of females in Marketing is 5 more than those in HR.\nOperations: There are 55 employees in this department. ²⁄₉th of males are in this department.",
    questions: [
      {
        rawNum: "D-110",
        q: "What is the difference between number of males in Accounts and number of females in Operations?",
        o: ["10", "None of those given as options", "20", "15", "5"],
        a: 4,
        sol: "(E) 5 - Difference between males in Accounts and females in Operations."
      },
      {
        rawNum: "D-111",
        q: "What is the total number of employees (male + female) in HR and Accounts together?",
        o: ["95", "145", "135", "75", "110"],
        a: 1,
        sol: "(B) 145 - HR (55) + Accounts (90) = 145."
      },
      {
        rawNum: "D-112",
        q: "In 2021, ‘X’ males and ‘X’ females joined Company ABC and the respective ratio between number of males and females became 30 : 31. What is the value of X?",
        o: ["20", "15", "25", "10", "5"],
        a: 0,
        sol: "(A) 20 - (135 + X) / (140 + X) = 30 / 31 => X = 20."
      },
      {
        rawNum: "D-113",
        q: "What is the respective ratio of difference between number of females in Accounts and HR to number of males in Operations?",
        o: ["7 : 6", "1 : 2", "5 : 6", "2 : 3", "4 : 5"],
        a: 0,
        sol: "(A) 7 : 6 - Ratio is 7 : 6."
      },
      {
        rawNum: "D-114",
        q: "If the average salary of an employee in HR is Rs.21000, what is the total salary paid to all employees (male + female) in HR ? (In Rs. Lakh )",
        o: ["6.4", "11.55", "7.8", "None of those given as options", "8.4"],
        a: 1,
        sol: "(B) 11.55 - 55 employees × 21,000 = Rs. 11,55,000 = 11.55 Lakh."
      },
      {
        rawNum: "D-115",
        q: "Number of employees (male + female) in Marketing is approximately what percent of total number of employees in all 4 departments together?",
        o: ["36", "21", "27", "44", "53"],
        a: 2,
        sol: "(C) 27% - (75 / 275) × 100 = 27.27% ≈ 27%."
      }
    ]
  }
};

const sec22 = {
  setA: {
    direction: "Study the following information carefully to answer the given question.\nThis data is regarding the number of temporary and permanent employees working in two organisations A and B.\nNote : (i) 2y=x, (ii) 2q = p.\n(iii) Total number of employees = Number of Temporary employees + Number of Permanent employees\n(iv) The total number of permanent employees remains the same\n• HR department of two organisations A and B, with total 500 and 600 employees respectively, adopted a new strategy for managing their manpower.\n• Number of permanent employees in organisations A and B are 5x and 8p respectively. Number of temporary employees in organisations A and B are 10y and 4q respectively.\n• After one year, outcomes of new HR strategy were analysed and it was found that number of temporary employees who got promotion in organisations A and B were 20% and 30% respectively. Those not promoted left immediately.",
    questions: [
      {
        rawNum: "A-116",
        q: "After two years in organisation A, if half of the permanent employees leave the organisation, what is the total number of permanent employees in organisation A and B together ? (During this year, there is no change in the strength of permanent employees of organisation B)",
        o: ["605", "595", "670", "710", "645"],
        a: 0,
        sol: "(A) 605 - In A: 5x + 10y = 5(2y) + 10y = 20y = 500 => y = 25, x = 50. Permanent in A = 250, Temporary = 250. In B: 8p + 4q = 8(2q) + 4q = 20q = 600 => q = 30, p = 60. Permanent in B = 480. Half leaves A => 125 left in A. Total permanent = 125 + 480 = 605."
      },
      {
        rawNum: "A-117",
        q: "Number of permanent employees in organisation A is what percent of the initial total number of employees in organisation B ?",
        o: ["49 ⅔", "32 ⅔", "41 ⅔", "37 ⅓", "43 ⅓"],
        a: 2,
        sol: "(C) 41 ⅔% - % = (250 / 600) × 100 = 41 ⅔%."
      },
      {
        rawNum: "A-118",
        q: "What is the respective ratio of the number of temporary employees who left their jobs in organisation A to that who left their jobs in organisation B ?",
        o: ["17 : 11", "48 : 23", "50 : 23", "50 : 21", "31 : 17"],
        a: 3,
        sol: "(D) 50 : 21 - In A: 80% left = 200. In B: 70% left = 84. Ratio = 200 : 84 = 50 : 21."
      },
      {
        rawNum: "A-119",
        q: "After one year, what is the difference between the total number of employees in organisation A and that in organisation B ?",
        o: ["216", "225", "230", "210", "220"],
        a: 0,
        sol: "(A) 216 - In A: 250 + 50 = 300. In B: 480 + 36 = 516. Difference = 516 - 300 = 216."
      },
      {
        rawNum: "A-120",
        q: "What is the initial difference between the number of temporary employees in both the organisations ?",
        o: ["110", "220", "190", "150", "130"],
        a: 4,
        sol: "(E) 130 - Temp in A = 250, Temp in B = 120. Difference = 250 - 120 = 130."
      },
      {
        rawNum: "A-121",
        q: "Number of temporary employees who left the job in organisation A is what percentage of the number of permanent employees in organisation A ?",
        o: ["90", "80", "95", "65", "75"],
        a: 1,
        sol: "(B) 80% - Left in A = 200. Permanent in A = 250. % = (200 / 250) × 100 = 80%."
      }
    ]
  },
  setB: {
    direction: "Study the following information carefully to answer the given question.\nThis data is regarding the number of temporary and permanent employees in organisations P and Q.\nNote: (i) 3b=2a, (ii) 3n = 2m.\nHR with total 420 and 480 employees adopted strategy. Permanent in P and Q are 4a and 2m. Temporary are 4b and n. Promotion = 25% and 40%.",
    questions: [
      {
        rawNum: "B-116",
        q: "After two years in organisation P, if one-third of the permanent employees leave the organisation, what is the total number of permanent employees in organisation P and Q together?",
        o: ["600", "480", "540", "528", "612"],
        a: 3,
        sol: "(D) 528 - Permanent count after one-third leaves P."
      },
      {
        rawNum: "B-117",
        q: "Number of permanent employees in organisation P is what percent of the initial total number of employees in organisation Q?",
        o: ["52.5", "48", "54", "36", "40"],
        a: 0,
        sol: "(A) 52.5% - (252 / 480) × 100 = 52.5%."
      },
      {
        rawNum: "B-118",
        q: "What is the respective ratio of the number of temporary employees who left their jobs in organisation P to that who left their jobs in organisation Q?",
        o: ["7 : 8", "7 : 4", "1 : 1", "5 : 2", "3 : 7"],
        a: 1,
        sol: "(B) 7 : 4 - Ratio of left temporary employees."
      },
      {
        rawNum: "B-119",
        q: "After one year, what is the difference between the total number of employees in organisation P and that in organisation Q ?",
        o: ["144", "112", "174", "114", "164"],
        a: 3,
        sol: "(D) 114 - Difference after 1 year."
      },
      {
        rawNum: "B-120",
        q: "What is the initial difference between the number of temporary employees in both the organisations?",
        o: ["80", "120", "48", "90", "100"],
        a: 3,
        sol: "(D) 90 - Difference between initial temporary employees."
      },
      {
        rawNum: "B-121",
        q: "Number of temporary employees who left the job in organisation P is what percentage of the number of permanent employees in organisation P ?",
        o: ["80", "75", "90", "95", "50"],
        a: 4,
        sol: "(E) 50% - % = 50%."
      }
    ]
  },
  setC: {
    direction: "Study the following information carefully to answer the given question.\nData regarding temporary and permanent employees in organisations X and Y. Total 1000 and 1200 employees.",
    questions: [
      {
        rawNum: "C-116",
        q: "After two years in organisation X, if half of the permanent employees leave the organisation, what is the total number of permanent employees in organisation X and Y together?",
        o: ["960", "1060", "1090", "920", "1020"],
        a: 2,
        sol: "(C) 1090 - Total permanent employees remaining."
      },
      {
        rawNum: "C-117",
        q: "Number of permanent employees in organisation X is what percent of the initial total number of employees in organisation Y?",
        o: ["49 ⅔", "41 ⅔", "32 ⅔", "37 ⅓", "43 ⅓"],
        a: 1,
        sol: "(B) 41 ⅔% - % = 41 ⅔%."
      },
      {
        rawNum: "C-118",
        q: "What is the respective ratio of the number of temporary employees who left their jobs in organisation X to that who left their jobs in organisation Y?",
        o: ["175 : 108", "125 : 72", "175 : 81", "150 : 121", "131 : 175"],
        a: 0,
        sol: "(A) 175 : 108 - Ratio = 175 : 108."
      },
      {
        rawNum: "C-119",
        q: "After one year, what is the difference between the total number of employees in organisation X and that in organisation Y ?",
        o: ["344", "288", "144", "334", "369"],
        a: 3,
        sol: "(D) 334 - Difference = 334."
      },
      {
        rawNum: "C-120",
        q: "What is the initial difference between the number of temporary employees in both the organisations?",
        o: ["110", "190", "140", "150", "130"],
        a: 0,
        sol: "(A) 110 - Difference = 110."
      },
      {
        rawNum: "C-121",
        q: "Number of temporary employees who left the job in organisation X is what percentage of the number of permanent employees in organisation X ?",
        o: ["90", "80", "95", "65", "70"],
        a: 4,
        sol: "(E) 70% - % = 70%."
      }
    ]
  },
  setD: {
    direction: "Study the following information carefully to answer the given question.\nData regarding temporary and permanent employees in organisations P and Q. Total 600 and 900 employees.",
    questions: [
      {
        rawNum: "D-116",
        q: "After two years in organisation P, if half of the permanent employees leave the organisation, what is the total number of permanent employees in organisation P and Q together?",
        o: ["405", "550", "510", "480", "515"],
        a: 4,
        sol: "(E) 515 - Total remaining permanent employees."
      },
      {
        rawNum: "D-117",
        q: "Number of permanent employees in organisation P is what percent of the initial total number of employees in organisation Q? (Approximately)",
        o: ["27", "36", "50", "60", "64"],
        a: 0,
        sol: "(A) 27% - % ≈ 26.67% ≈ 27%."
      },
      {
        rawNum: "D-118",
        q: "What is the respective ratio of the number of temporary employees who left their jobs in organisation P to that who left their jobs in organisation Q?",
        o: ["17 : 11", "48 : 23", "50 : 23", "50 : 21", "17 : 27"],
        a: 4,
        sol: "(E) 17 : 27 - Ratio = 17 : 27."
      },
      {
        rawNum: "D-119",
        q: "After one year, what is the difference between the total number of employees in organisation P and that in organisation Q ?",
        o: ["160", "112", "148", "120", "108"],
        a: 2,
        sol: "(C) 148 - Difference = 148."
      },
      {
        rawNum: "D-120",
        q: "What is the initial difference between the number of temporary employees in both the organisations?",
        o: ["240", "220", "180", "150", "140"],
        a: 2,
        sol: "(C) 180 - Difference = 180."
      },
      {
        rawNum: "D-121",
        q: "Number of temporary employees who left the job in organisation P is what percentage of the number of permanent employees in organisation P ?",
        o: ["90", "127.5", "95", "65", "75.5"],
        a: 1,
        sol: "(B) 127.5% - % = 127.5%."
      }
    ]
  }
};

const sec23 = {
  setA: {
    direction: "Read the information given in the passage and answer the given question :\nThere are 750 students in school T. Each likes soccer, cricket or tennis. Male : Female = 8 : 7.\nMale (400): Only soccer 16%, only cricket 24%, only tennis 10%, only soccer+cricket 14%, only cricket+tennis 11%, only tennis+soccer 13%, all three remaining.\nFemale (350): Only soccer 20%, only cricket 12%, only tennis 8%, only soccer+cricket 28%, only cricket+tennis 10%, only tennis+soccer 6%, all three remaining.",
    questions: [
      {
        rawNum: "A-122",
        q: "What is the respective ratio between number of male students who like tennis and number of female students who like the same ?",
        o: ["44 : 35", "52 : 35", "83 : 70", "13 : 10", "46 : 35"],
        a: 4,
        sol: "(E) 46 : 35 - Males liking tennis = (10+11+13+12)% of 400 = 46% of 400 = 184. Females = (8+10+6+16)% of 350 = 40% of 350 = 140. Ratio = 184 : 140 = 46 : 35."
      },
      {
        rawNum: "A-123",
        q: "Number of female students who do not like tennis is what percent of the number of male students in school T ?",
        o: ["52.5", "54.5", "55", "51.5", "56"],
        a: 0,
        sol: "(A) 52.5% - Females not liking tennis = 350 - 140 = 210. (210 / 400) × 100 = 52.5%."
      },
      {
        rawNum: "A-124",
        q: "Number of male students who like more than one of the given sports is what percent more than the number of female students who like only one of the given sports ? (Rounded off to nearest integer)",
        o: ["39", "41", "52", "46", "43"],
        a: 4,
        sol: "(E) 43% - Males liking >1 sport = (14+11+13+12)% = 50% of 400 = 200. Females only one sport = (20+12+8)% = 40% of 350 = 140. % more = [(200 - 140) / 140] × 100 = 42.85% ≈ 43%."
      },
      {
        rawNum: "A-125",
        q: "How many male students like cricket ?",
        o: ["200", "258", "232", "244", "196"],
        a: 3,
        sol: "(D) 244 - Cricket males = (24 + 14 + 11 + 12)% = 61% of 400 = 244."
      },
      {
        rawNum: "A-126",
        q: "What is the difference between number of male students who like soccer and number of female students who like the same ?",
        o: ["25", "35", "30", "20", "15"],
        a: 0,
        sol: "(A) 25 - Soccer males = (16+14+13+12)% = 55% of 400 = 220. Soccer females = (20+28+6+16)% = 70% of 350 = 245. Difference = 245 - 220 = 25."
      }
    ]
  },
  setB: {
    direction: "Read the information given in the passage and answer the given question:\n850 students in school M. Sports: hockey, basketball, volleyball. Male : Female = 9 : 8 (450 : 400).",
    questions: [
      {
        rawNum: "B-122",
        q: "What is the respective ratio between number of male students who like volleyball and number of female students who like the same ?",
        o: ["45 : 46", "52 : 35", "81 : 70", "15 : 17", "46 : 35"],
        a: 0,
        sol: "(A) 45 : 46 - Ratio of volleyball lovers."
      },
      {
        rawNum: "B-123",
        q: "Number of female students who do not like volleyball is what percent of the number of male students in school M ?",
        o: ["45 ⁵⁄₉", "41", "55 ⁵⁄₉", "48", "42 ²⁄₉"],
        a: 2,
        sol: "(C) 55 ⁵⁄₉% - % = 55 5/9%."
      },
      {
        rawNum: "B-124",
        q: "Number of male students who like more than one of the given sports is what percent more than the number of female students who like only one of the given sports ?",
        o: ["35", "45", "51", "42", "39"],
        a: 2,
        sol: "(C) 51% - % ≈ 51%."
      },
      {
        rawNum: "B-125",
        q: "How many male students like basketball?",
        o: ["317", "297", "232", "258", "314"],
        a: 1,
        sol: "(B) 297 - Total basketball males."
      },
      {
        rawNum: "B-126",
        q: "What is the difference between number of male students who like hockey and number of female students who like the same?",
        o: ["75", "85", "90", "80", "95"],
        a: 1,
        sol: "(B) 85 - Difference = 85."
      }
    ]
  },
  setC: {
    direction: "Read the information given in the passage and answer the given question:\n650 students in school P. Sports: baseball, golf, football. Male : Female = 7 : 6 (350 : 300).",
    questions: [
      {
        rawNum: "C-122",
        q: "What is the respective ratio between number of male students who like football and number of female students who like the same ?",
        o: ["4 : 3", "7 : 6", "8 : 7", "13 : 10", "6 : 5"],
        a: 1,
        sol: "(B) 7 : 6 - Ratio = 7 : 6."
      },
      {
        rawNum: "C-123",
        q: "Number of female students who do not like football is what percent of the number of male students in school P ? (Rounded off to nearest integer)",
        o: ["38", "54", "46", "43", "51"],
        a: 2,
        sol: "(C) 46% - % ≈ 46%."
      },
      {
        rawNum: "C-124",
        q: "Number of male students who like more than one of the given sports is what percent more than the number of female students who like only one of the given sports ? (Rounded off to nearest integer)",
        o: ["39", "42", "52", "46", "37"],
        a: 0,
        sol: "(A) 39% - % ≈ 39%."
      },
      {
        rawNum: "C-125",
        q: "How many male students like golf?",
        o: ["197", "214", "220", "222", "217"],
        a: 4,
        sol: "(E) 217 - Golf males = 217."
      },
      {
        rawNum: "C-126",
        q: "What is the difference between number of male students who like baseball and number of female students who like the same?",
        o: ["45", "39", "40", "47", "55"],
        a: 1,
        sol: "(B) 39 - Difference = 39."
      }
    ]
  },
  setD: {
    direction: "Read the information given in the passage and answer the given question:\n800 students in school J. Sports: Rugby, badminton, archery. Male : Female = 9 : 7 (450 : 350).",
    questions: [
      {
        rawNum: "D-122",
        q: "What is the respective ratio between number of male students who like archery and number of female students who like the same ?",
        o: ["64 : 53", "77 : 76", "75 : 56", "73 : 60", "56 : 51"],
        a: 2,
        sol: "(C) 75 : 56 - Ratio = 75 : 56."
      },
      {
        rawNum: "D-123",
        q: "Number of female students who do not like archery is what percent of the number of male students in school J ? (Rounded off to nearest integer)",
        o: ["38", "40", "46", "43", "35"],
        a: 2,
        sol: "(C) 46% - % ≈ 46%."
      },
      {
        rawNum: "D-124",
        q: "Number of male students who like more than one of the given sports is what percent more than the number of female students who like only one of the given sports ? (Rounded off to nearest integer)",
        o: ["39", "42", "52", "45", "57"],
        a: 4,
        sol: "(E) 57% - % ≈ 57%."
      },
      {
        rawNum: "D-125",
        q: "How many male students like badminton?",
        o: ["200", "218", "244", "252", "270"],
        a: 3,
        sol: "(D) 252 - Badminton males = 252."
      },
      {
        rawNum: "D-126",
        q: "What is the difference between number of male students who like Rugby and number of female students who like the same?",
        o: ["45", "39", "40", "72", "55"],
        a: 3,
        sol: "(D) 72 - Difference = 72."
      }
    ]
  }
};

const sec24 = {
  setA: {
    direction: "Study the following information carefully and answer the given question :\nThe given data is regarding the grade A and grade B employees in three companies X, Y and Z\nCompany X : Grade A = 100, Grade A : Grade B = 5 : 7 => Grade B = 140. Total X = 240.\nCompany Y : Grade A = 2 × 100 = 200. Grade B = Total Z - 200.\nCompany Z : Grade A = Total X = 240. Grade B = 240 × 0.75 = 180. Total Z = 420. Thus, Grade B in Y = 420 - 200 = 220.",
    questions: [
      {
        rawNum: "A-127",
        q: "Total number of grade B employees in all three companies together is what percent of total number of grade A employees in all three companies together ?",
        o: ["110", "80", "120", "60", "100"],
        a: 4,
        sol: "(E) 100% - Grade B total = 140 + 220 + 180 = 540. Grade A total = 100 + 200 + 240 = 540. % = 100%."
      },
      {
        rawNum: "A-128",
        q: "30% of total number of employees (grade A + grade B) in company X and in company Y together are females and 40% of employees in company Z are males. What is the average number of males in companies X, Y and Z ?",
        o: ["260", "210", "320", "280", "240"],
        a: 1,
        sol: "(B) 210 - (X + Y) total = 240 + 420 = 660. Males in X+Y = 70% of 660 = 462. Males in Z = 40% of 420 = 168. Total males = 462 + 168 = 630. Average = 630 / 3 = 210."
      },
      {
        rawNum: "A-129",
        q: "What is the respective ratio between total number of grade A employees in companies X and Z together and total number of grade B employees in companies Y and Z together ?",
        o: ["17 : 21", "18 : 25", "17 : 20", "18 : 23", "15 : 17"],
        a: 2,
        sol: "(C) 17 : 20 - Grade A (X + Z) = 100 + 240 = 340. Grade B (Y + Z) = 220 + 180 = 400. Ratio = 340 : 400 = 17 : 20."
      },
      {
        rawNum: "A-130",
        q: "If monthly salary of each grade A employee in company X is Rs. 60000 and monthly salary of each grade B employee in same company is Rs. 48000, what is the difference between total salary given by the company to grade A employees and to grade B employees in one month ? (In Rs. Lakh)",
        o: ["8.4", "7.2", "8", "9.6", "6.4"],
        a: 1,
        sol: "(B) 7.2 - Salary A = 100 × 60,000 = 60 Lakh. Salary B = 140 × 48,000 = 67.2 Lakh. Difference = 67.2 - 60 = 7.2 Lakh."
      }
    ]
  },
  setB: {
    direction: "Study the following information carefully and answer the given question:\nData regarding grade X and grade Y employees in three companies A, B and C.",
    questions: [
      {
        rawNum: "B-127",
        q: "Total number of grade X employees in all three companies together is what percent of total number of grade Y employees in all three companies together?",
        o: ["100", "60", "110", "80", "120"],
        a: 0,
        sol: "(A) 100% - Total Grade X = Total Grade Y => 100%."
      },
      {
        rawNum: "B-128",
        q: "40% of total number of employees in company A and in company B together are females and 30% of employees in company C are males. What is the average number of males in companies A, B and C?",
        o: ["225", "200", "190", "175", "215"],
        a: 1,
        sol: "(B) 200 - Average males = 200."
      },
      {
        rawNum: "B-129",
        q: "What is the respective ratio between total number of grade X employees in companies A and C together and total number of grade Y employees in companies B and C together?",
        o: ["6 : 7", "18 : 23", "11 : 17", "8 : 9", "5 : 7"],
        a: 4,
        sol: "(E) 5 : 7 - Ratio = 5 : 7."
      },
      {
        rawNum: "B-130",
        q: "If monthly salary of each grade X employee in company A is Rs. 40000 and monthly salary of each grade Y employee in same company is Rs. 52000, what is the difference between total salary given by the company to grade X employees and to grade Y employees in one month? (In Rs. Lakh)",
        o: ["8.4", "7.2", "5.4", "4.8", "2.4"],
        a: 4,
        sol: "(E) 2.4 - Salary diff = 2.4 Lakh."
      }
    ]
  },
  setC: {
    direction: "Study the following information carefully and answer the given question:\nData regarding grade A and grade B employees in three companies P, Q and R.",
    questions: [
      {
        rawNum: "C-127",
        q: "Total number of grade A employees in all three companies together is approximately what percent of total number of grade B employees in all three companies together?",
        o: ["120", "75", "100", "50", "110"],
        a: 2,
        sol: "(C) 100% - % ≈ 100%."
      },
      {
        rawNum: "C-128",
        q: "50% of total number of employees in company P and in company Q together are females and 25% of employees in company R are males. What is the average number of males in companies P, Q and R?",
        o: ["60", "80", "72", "82", "74"],
        a: 2,
        sol: "(C) 72 - Average males = 72."
      },
      {
        rawNum: "C-129",
        q: "What is the respective ratio between total number of grade A employees in companies P and R together and total number of grade B employees in companies Q and R together?",
        o: ["1 : 2", "34 : 35", "2 : 7", "3 : 5", "35 : 37"],
        a: 1,
        sol: "(B) 34 : 35 - Ratio = 34 : 35."
      },
      {
        rawNum: "C-130",
        q: "If monthly salary of each grade A employee in company P is Rs. 25000 and monthly salary of each grade B employee in same company is Rs. 21000, what is the difference between total salary given by the company to grade A employees and to grade B employees in one month? (In Rs. Lakh)",
        o: ["2.64", "1.96", "3.24", "2.16", "2.84"],
        a: 0,
        sol: "(A) 2.64 - Salary difference = 2.64 Lakh."
      }
    ]
  },
  setD: {
    direction: "Study the following information carefully and answer the given question:\nData regarding grade A and grade B employees in three companies J, K and L.",
    questions: [
      {
        rawNum: "D-127",
        q: "Total number of grade A employees in all three companies together is what percent of total number of grade B employees in all three companies together? (Two decimals)",
        o: ["96", "105", "92", "90", "100"],
        a: 4,
        sol: "(E) 100% - % = 100%."
      },
      {
        rawNum: "D-128",
        q: "40% of total number of employees in company J and in company K together are females and 45% of employees in company L are males. What is the average number of males in companies J, K and L?",
        o: ["215", "221", "297", "231", "233"],
        a: 3,
        sol: "(D) 231 - Average males = 231."
      },
      {
        rawNum: "D-129",
        q: "What is the respective ratio between total number of grade A employees in companies J and L together and total number of grade B employees in companies K and L together?",
        o: ["13 : 11", "22 : 27", "19 : 22", "31 : 23", "11 : 13"],
        a: 0,
        sol: "(A) 13 : 11 - Ratio = 13 : 11."
      },
      {
        rawNum: "D-130",
        q: "If monthly salary of each grade A employee in company J is Rs. 12000 and monthly salary of each grade B employee in same company is Rs. 10000, what is the difference between total salary given by the company to grade A employees and to grade B employees in one month? (In Rs. Lakh)",
        o: ["2.4", "3.2", "3", "4", "1.4"],
        a: 2,
        sol: "(C) 3 - Salary difference = 3 Lakh."
      }
    ]
  }
};

const sec25 = {
  setA: {
    direction: "Study the following Information carefully and answer the given questions:\nData regarding quantity of 3 types of bread (Brown, White and Multigrain) sold by 2 stores (A, B) on Monday.\nStore A sold 20Kg of Brown bread, which was 25% more than that sold by Store B (Store B = 16Kg). Total quantity of White bread sold by both stores together was 14Kg more than that of Brown bread sold by both stores together (Brown total = 36Kg, White total = 50Kg). Both Stores sold equal quantities of White bread (25Kg each). Quantity of Multigrain bread sold by Store A was ⅗th of that of White bread sold by it (15Kg). Quantity of Multigrain bread sold by Store B was ⅖th of that of White bread sold by it (10Kg).",
    questions: [
      {
        rawNum: "A-131",
        q: "What was the difference between the quantities of White bread and Brown bread sold by Store B? (In Kg).",
        o: ["7", "13", "9", "12", "11"],
        a: 2,
        sol: "(C) 9 - Store B White = 25Kg, Brown = 16Kg. Difference = 25 - 16 = 9Kg."
      },
      {
        rawNum: "A-132",
        q: "On Tuesday, if quantity of Brown bread sold by both stores together increased by 50% from Monday, total what quantity of Brown bread was sold by both stores together on Tuesday? (In Kg)",
        o: ["66", "48", "54", "60", "42"],
        a: 2,
        sol: "(C) 54 - Monday Brown total = 36Kg. Tuesday = 36 × 1.50 = 54Kg."
      },
      {
        rawNum: "A-133",
        q: "What was the total quantity of Multigrain bread sold by both stores together? (In Kg)",
        o: ["35", "20", "15", "30", "25"],
        a: 4,
        sol: "(E) 25 - Store A Multigrain (15) + Store B Multigrain (10) = 25Kg."
      },
      {
        rawNum: "A-134",
        q: "If Multigrain bread cost Rs.70/Kg, total how much amount did Store B receive from sell Multigrain bread? (In Rs.)",
        o: ["840", "700", "770", "1050", "630"],
        a: 1,
        sol: "(B) 700 - Store B Multigrain = 10Kg. Amount = 10 × 70 = Rs. 700."
      },
      {
        rawNum: "A-135",
        q: "What was the difference between the quantity of Brown bread in Store A and Multigrain bread in store B?",
        o: ["10", "15", "20", "25", "5"],
        a: 0,
        sol: "(A) 10 - Store A Brown = 20Kg. Store B Multigrain = 10Kg. Difference = 20 - 10 = 10Kg."
      }
    ]
  },
  setB: {
    direction: "Study the following Information carefully and answer the given questions:\nData regarding quantity of 3 types of grains (Sorghum, Rye and Multigrain) sold by 2 stores (A, B) on Tuesday.",
    questions: [
      {
        rawNum: "B-131",
        q: "What was the difference between the quantities of Rye grains and Sorghum grains sold by Store B? (In Kg).",
        o: ["14", "10", "9", "12", "15"],
        a: 4,
        sol: "(E) 15 - Difference = 15Kg."
      },
      {
        rawNum: "B-132",
        q: "On Wednesday, if quantity of Sorghum grains sold by both stores together increased by 35% from Tuesday, total what quantity of Sorghum grains was sold by both stores together on Wednesday? (In Kg)",
        o: ["54", "64", "42", "52", "72"],
        a: 0,
        sol: "(A) 54 - 40 × 1.35 = 54Kg."
      },
      {
        rawNum: "B-133",
        q: "What was the total quantity of Multigrain grains sold by both stores together? (In Kg)",
        o: ["35", "20", "15", "30", "25"],
        a: 0,
        sol: "(A) 35 - Total = 35Kg."
      },
      {
        rawNum: "B-134",
        q: "If Multigrain grains cost Rs.60/Kg, total how much amount did Store B receive from sell Multigrain grains? (In Rs.)",
        o: ["810", "750", "900", "1050", "960"],
        a: 2,
        sol: "(C) 900 - Amount = Rs. 900."
      },
      {
        rawNum: "B-135",
        q: "What was the difference between the quantity of Sorghum grains in Store A and Multigrain grains in store B",
        o: ["5", "15", "20", "25", "10"],
        a: 4,
        sol: "(E) 10 - Difference = 10Kg."
      }
    ]
  },
  setC: {
    direction: "Study the following Information carefully and answer the given questions:\nData regarding quantity of 3 types of grains (Wheat, Barley and Multigrain) sold by 2 stores (A, B) on Friday.",
    questions: [
      {
        rawNum: "C-131",
        q: "What was the difference between the quantities of Barley grains and Wheat grains sold by Store B? (In Kg).",
        o: ["17", "22", "19", "25", "27"],
        a: 3,
        sol: "(D) 25 - Difference = 25Kg."
      },
      {
        rawNum: "C-132",
        q: "On Saturday, if quantity of Wheat grains sold by both stores together increased by 40% from Friday, total what quantity of Wheat grains was sold by both stores together on Saturday? (In Kg)",
        o: ["63", "68", "51", "57", "45"],
        a: 0,
        sol: "(A) 63 - 45 × 1.40 = 63Kg."
      },
      {
        rawNum: "C-133",
        q: "What was the total quantity of Multigrain grains sold by both stores together? (In Kg)",
        o: ["35", "36", "25", "40", "20"],
        a: 1,
        sol: "(B) 36 - Total = 36Kg."
      },
      {
        rawNum: "C-134",
        q: "If Multigrain grains cost Rs.45/Kg, total how much amount did Store B receive from sell Multigrain grains? (In Rs.)",
        o: ["840", "810", "630", "900", "720"],
        a: 1,
        sol: "(B) 810 - Amount = Rs. 810."
      },
      {
        rawNum: "C-135",
        q: "What was the difference between the quantity of Wheat grains in Store A and Multigrain grains in store B?",
        o: ["10", "11", "14", "25", "15"],
        a: 2,
        sol: "(C) 14 - Difference = 14Kg."
      }
    ]
  },
  setD: {
    direction: "Study the following Information carefully and answer the given questions:\nData regarding quantity of 3 types of grains (Buckwheat, Oats and Multigrain) sold by 2 stores (A, B) on Wednesday.",
    questions: [
      {
        rawNum: "D-131",
        q: "What was the difference between the quantities of Oats grains and Buckwheat grains sold by Store B? (In Kg)",
        o: ["35", "40", "20", "30", "50"],
        a: 1,
        sol: "(B) 40 - Difference = 40Kg."
      },
      {
        rawNum: "D-132",
        q: "On Thursday, if quantity of Buckwheat grains sold by both stores together increased by 20% from Wednesday, total what quantity of Buckwheat grains was sold by both stores together on Thursday? (In Kg)",
        o: ["85", "80", "77", "77.5", "90"],
        a: 4,
        sol: "(E) 90 - 75 × 1.20 = 90Kg."
      },
      {
        rawNum: "D-133",
        q: "What was the total quantity of Multigrain grains sold by both stores together? (In Kg)",
        o: ["35", "36", "50", "40", "20"],
        a: 2,
        sol: "(C) 50 - Total = 50Kg."
      },
      {
        rawNum: "D-134",
        q: "If Multigrain grains cost Rs.40/Kg, total how much amount did Store B receive from sell Multigrain grains? (In Rs.)",
        o: ["800", "840", "640", "900", "720"],
        a: 0,
        sol: "(A) 800 - Amount = Rs. 800."
      },
      {
        rawNum: "D-135",
        q: "What was the difference between the quantity of Buckwheat grains in Store A and Multigrain grains in store B?",
        o: ["10", "12", "14", "20", "15"],
        a: 3,
        sol: "(D) 20 - Difference = 20Kg."
      }
    ]
  }
};

module.exports = { sec21, sec22, sec23, sec24, sec25 };

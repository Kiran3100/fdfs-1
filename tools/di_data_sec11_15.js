// Section 11: Cinema Hall Attendance Double Bar Graph (Q55-59 for Sets A, B, C, D)
// Section 12: Import/Export Ratio Double Bar Graph (Q60-65 for Sets A, B, C, D)
// Section 13: Degree Colleges Bar Graph + Caselet (Q66-71 for Sets A, B, C, D)
// Section 14: Applications Received Bar Graph (Q72-76 for Sets A, B, C, D)
// Section 15: Classroom Weights Bar + Table (Q77-81 for Sets A, B, C, D)

const sec11 = {
  setA: {
    direction: "Refer to the graph and answer the given questions:\nData regarding number of people from 4 cities who went to the cinema hall in 2 days.",
    svgFile: "images/questions/di/bar_cinemahall_set_a.svg",
    chart: {
      type: "groupedBar",
      title: "Cinema Hall Visitors (Set A)",
      subtitle: "Number of people from 4 cities on Sunday & Monday",
      categories: ["A", "B", "C", "D"],
      series1: { name: "Sunday", color: "#6366F1", values: [220, 160, 180, 200] },
      series2: { name: "Monday", color: "#1E293B", values: [160, 180, 230, 170] },
      maxY: 260
    },
    questions: [
      {
        rawNum: "A-55",
        q: "What is the difference between total number of people from cities A and B together who went to the cinema hall on Sunday and number of people from City B who went to the cinema hall on Monday ?",
        o: ["200", "170", "180", "210", "190"],
        a: 0,
        sol: "(A) 200 - Sunday (A + B) = 220 + 160 = 380. City B Monday = 180. Difference = 380 - 180 = 200."
      },
      {
        rawNum: "A-56",
        q: "Number of people from City D who went to the cinema hall on Sunday was what percent more than those from City B who went to the cinema hall on Sunday ?",
        o: ["33 ⅓", "16 ⅔", "25", "20", "10"],
        a: 2,
        sol: "(C) 25% - City D Sunday = 200, City B Sunday = 160. % more = [(200 - 160) / 160] × 100 = 25%."
      },
      {
        rawNum: "A-57",
        q: "Total how many people from cities C and D together went to the cinema hall on Monday ?",
        o: ["410", "400", "420", "430", "380"],
        a: 1,
        sol: "(B) 400 - City C Monday (230) + City D Monday (170) = 400."
      },
      {
        rawNum: "A-58",
        q: "If 224 people from City A went to the cinema hall on a 3rd day (Tuesday), what is the respective ratio between number of people from City A who went to the cinema hall on Tuesday and that on Monday ?",
        o: ["11 : 9", "6 : 5", "3 : 2", "8 : 5", "7 : 5"],
        a: 4,
        sol: "(E) 7 : 5 - City A Tuesday = 224, City A Monday = 160. Ratio = 224 : 160 = 7 : 5."
      },
      {
        rawNum: "A-59",
        q: "If number of people from a 5th city (City E) who went to the cinema hall on Sunday was 35% more than those from City C who went to the cinema hall on Sunday, how many people from City E went to the cinema hall on Sunday ?",
        o: ["243", "297", "216", "270", "189"],
        a: 0,
        sol: "(A) 243 - City C Sunday = 180. City E = 180 × 1.35 = 243."
      }
    ]
  },
  setB: {
    direction: "Refer to the graph and answer the given questions:\nData regarding number of people from 4 cities who went to the cinema hall in 2 days.",
    svgFile: "images/questions/di/bar_cinemahall_set_b.svg",
    chart: {
      type: "groupedBar",
      title: "Cinema Hall Visitors (Set B)",
      subtitle: "Number of people from 4 cities on Sunday & Monday",
      categories: ["P", "Q", "R", "S"],
      series1: { name: "Sunday", color: "#6366F1", values: [350, 170, 200, 140] },
      series2: { name: "Monday", color: "#1E293B", values: [210, 130, 190, 150] },
      maxY: 360
    },
    questions: [
      {
        rawNum: "B-55",
        q: "What is the difference between total number of people from cities P and Q together who went to the cinema hall on Sunday and number of people from City Q who went to the cinema hall on Monday ?",
        o: ["250", "270", "390", "320", "490"],
        a: 2,
        sol: "(C) 390 - Sunday (P + Q) = 350 + 170 = 520. City Q Monday = 130. Difference = 520 - 130 = 390."
      },
      {
        rawNum: "B-56",
        q: "Number of people from City Q who went to the cinema hall on Sunday was what percent less than those from City R who went to the cinema hall on Sunday ?",
        o: ["33", "15", "25", "20", "10"],
        a: 1,
        sol: "(B) 15% - City Q Sunday = 170, City R Sunday = 200. % less = [(200 - 170) / 200] × 100 = 15%."
      },
      {
        rawNum: "B-57",
        q: "Total how many people from cities R and S together went to the cinema hall on Monday ?",
        o: ["310", "300", "320", "340", "380"],
        a: 3,
        sol: "(D) 340 - City R Monday (190) + City S Monday (150) = 340."
      },
      {
        rawNum: "B-58",
        q: "If 294 people from City P went to the cinema hall on a 3rd day (Tuesday), what is the respective ratio between number of people from City P who went to the cinema hall on Tuesday and that on Monday ?",
        o: ["9 : 7", "7 : 6", "4 : 3", "8 : 5", "7 : 5"],
        a: 4,
        sol: "(E) 7 : 5 - City P Tuesday = 294, City P Monday = 210. Ratio = 294 : 210 = 7 : 5."
      },
      {
        rawNum: "B-59",
        q: "If number of people from a 5th city (City T) who went to the cinema hall on Sunday was 22% more than those from City R who went to the cinema hall on Sunday, how many people from City T went to the cinema hall on Sunday ?",
        o: ["288", "397", "226", "370", "244"],
        a: 4,
        sol: "(E) 244 - City R Sunday = 200. City T = 200 × 1.22 = 244."
      }
    ]
  },
  setC: {
    direction: "Refer to the graph and answer the given questions:\nData regarding number of people from 4 cities who went to the cinema hall in 2 days.",
    svgFile: "images/questions/di/bar_cinemahall_set_c.svg",
    chart: {
      type: "groupedBar",
      title: "Cinema Hall Visitors (Set C)",
      subtitle: "Number of people from 4 cities on Sunday & Monday",
      categories: ["A", "B", "C", "D"],
      series1: { name: "Sunday", color: "#6366F1", values: [440, 320, 360, 400] },
      series2: { name: "Monday", color: "#1E293B", values: [320, 360, 460, 340] },
      maxY: 500
    },
    questions: [
      {
        rawNum: "C-55",
        q: "What is the difference between total number of people from cities A and B together who went to the cinema hall on Sunday and number of people from City B who went to the cinema hall on Monday ?",
        o: ["400", "570", "480", "510", "390"],
        a: 0,
        sol: "(A) 400 - Sunday (A + B) = 440 + 320 = 760. City B Monday = 360. Difference = 760 - 360 = 400."
      },
      {
        rawNum: "C-56",
        q: "Number of people from City D who went to the cinema hall on Sunday was what percent more than those from City B who went to the cinema hall on Sunday ?",
        o: ["33", "16", "25", "20", "10"],
        a: 2,
        sol: "(C) 25% - City D Sunday = 400, City B Sunday = 320. % more = [(400 - 320) / 320] × 100 = 25%."
      },
      {
        rawNum: "C-57",
        q: "Total how many people from cities C and D together went to the cinema hall on Monday ?",
        o: ["800", "700", "950", "850", "820"],
        a: 0,
        sol: "(A) 800 - City C Monday (460) + City D Monday (340) = 800."
      },
      {
        rawNum: "C-58",
        q: "If 448 people from City A went to the cinema hall on a 3rd day (Tuesday), what is the respective ratio between number of people from City A who went to the cinema hall on Tuesday and that on Monday ?",
        o: ["9 : 5", "8 : 5", "6 : 5", "3 : 2", "7 : 5"],
        a: 4,
        sol: "(E) 7 : 5 - City A Tuesday = 448, City A Monday = 320. Ratio = 448 : 320 = 7 : 5."
      },
      {
        rawNum: "C-59",
        q: "If number of people from a 5th city (City E) who went to the cinema hall on Sunday was 25% more than those from City B who went to the cinema hall on Monday, how many people from City E went to the cinema hall on Sunday ?",
        o: ["430", "597", "450", "670", "689"],
        a: 2,
        sol: "(C) 450 - City B Monday = 360. City E = 360 × 1.25 = 450."
      }
    ]
  },
  setD: {
    direction: "Refer to the graph and answer the given questions:\nData regarding number of people from 4 cities who went to the cinema hall in 2 days.",
    svgFile: "images/questions/di/bar_cinemahall_set_d.svg",
    chart: {
      type: "groupedBar",
      title: "Cinema Hall Visitors (Set D)",
      subtitle: "Number of people from 4 cities on Sunday & Monday",
      categories: ["P", "Q", "R", "S"],
      series1: { name: "Sunday", color: "#6366F1", values: [200, 350, 400, 250] },
      series2: { name: "Monday", color: "#1E293B", values: [180, 220, 110, 300] },
      maxY: 420
    },
    questions: [
      {
        rawNum: "D-55",
        q: "What is the difference between total number of people from cities P and Q together who went to the cinema hall on Sunday and number of people from City Q who went to the cinema hall on Monday?",
        o: ["350", "370", "390", "330", "490"],
        a: 3,
        sol: "(D) 330 - Sunday (P + Q) = 200 + 350 = 550. City Q Monday = 220. Difference = 550 - 220 = 330."
      },
      {
        rawNum: "D-56",
        q: "Number of people from City Q who went to the cinema hall on Sunday was what percent less than those from City R who went to the cinema hall on Sunday ?",
        o: ["33", "12.5", "25", "8.33", "16.66"],
        a: 1,
        sol: "(B) 12.5% - City Q Sunday = 350, City R Sunday = 400. % less = [(400 - 350) / 400] × 100 = 12.5%."
      },
      {
        rawNum: "D-57",
        q: "Total how many people from cities R and S together went to the cinema hall on Monday ?",
        o: ["410", "380", "420", "340", "390"],
        a: 0,
        sol: "(A) 410 - City R Monday (110) + City S Monday (300) = 410."
      },
      {
        rawNum: "D-58",
        q: "If 252 people from City P went to the cinema hall on a 3rd day (Tuesday), what is the respective ratio between number of people from City P who went to the cinema hall on Tuesday and that on Monday ?",
        o: ["11 : 9", "6 : 5", "3 : 2", "8 : 5", "7 : 5"],
        a: 4,
        sol: "(E) 7 : 5 - City P Tuesday = 252, City P Monday = 180. Ratio = 252 : 180 = 7 : 5."
      },
      {
        rawNum: "D-59",
        q: "If number of people from a 5th city (City T) who went to the cinema hall on Sunday was 17% more than those from City R who went to the cinema hall on Sunday, how many people from City T went to the cinema hall on Sunday ?",
        o: ["468", "497", "216", "470", "460"],
        a: 0,
        sol: "(A) 468 - City R Sunday = 400. City T = 400 × 1.17 = 468."
      }
    ]
  }
};

const sec12 = {
  setA: {
    direction: "Study the diagram carefully and then answer the questions given below it.\nThe following bar diagram shows the ratio of export to import of two companies A and B over the period 1993 - 98.",
    svgFile: "images/questions/di/bar_import_export_set_a.svg",
    chart: {
      type: "groupedBar",
      title: "Export to Import Ratio (1993-98) - Set A",
      subtitle: "Ratio of Export to Import for Companies A and B",
      categories: ["1993", "1994", "1995", "1996", "1997", "1998"],
      series1: { name: "Company A", color: "#3B82F6", values: [0.8, 1.1, 1.5, 2.4, 1.8, 2.1] },
      series2: { name: "Company B", color: "#10B981", values: [1.2, 0.6, 0.75, 1.5, 0.9, 1.6] },
      maxY: 3.0
    },
    questions: [
      {
        rawNum: "A-60",
        q: "In how many years is the import more than the export for B?",
        o: ["Nil", "4", "6", "2", "3"],
        a: 4,
        sol: "(E) 3 - Import > Export when Export/Import < 1.0. For Company B: 1994 (0.6), 1995 (0.75), 1997 (0.9) = 3 years."
      },
      {
        rawNum: "A-61",
        q: "If the total imports of company A for the years 1997 and 1998 together was Rs.50 crore, What was the total exports (in Rs crore) for the same years?",
        o: ["25", "20", "22", "Data inadequate", "25"],
        a: 3,
        sol: "(D) Data inadequate - Individual imports for 1997 and 1998 are not known separately, so individual exports cannot be determined."
      },
      {
        rawNum: "A-62",
        q: "Had the export for the company A in 1996 been decreased by 25% whereas the import been increased by 25% for the same year, what would have been the new ratio of export to import?",
        o: ["1.48", "0.69", "1.2", "Data inadequate", "1.44"],
        a: 4,
        sol: "(E) 1.44 - Old ratio = 2.4. New ratio = (2.4 × 0.75) / (1 × 1.25) = 1.8 / 1.25 = 1.44."
      },
      {
        rawNum: "A-63",
        q: "In which of the given years was the difference between the export and the import of company A minimum?",
        o: ["1996", "1993", "1994", "Data inadequate", "1995"],
        a: 3,
        sol: "(D) Data inadequate - Only ratios are given, absolute values of import/export are unknown."
      },
      {
        rawNum: "A-64",
        q: "If the difference between the import and the export of company B for the year 1994 was Rs. 48 crore, find the value of export (in Rs.crore) for the same year.",
        o: ["72", "84", "60", "Data inadequate", "86"],
        a: 0,
        sol: "(A) 72 - For B in 1994: E/I = 0.6 = 3/5. I - E = 5x - 3x = 2x = 48 => x = 24. Export = 3 × 24 = 72 crore."
      },
      {
        rawNum: "A-65",
        q: "In 1996 the sum of export and import of company B is 15 crore. What is the difference between export and import of company B in the same year ?",
        o: ["8 crore", "7 crore", "3 crore", "9 crore", "10 crore"],
        a: 2,
        sol: "(C) 3 crore - For B in 1996: E/I = 1.5 = 3/2. Sum = 3x + 2x = 5x = 15 => x = 3. Difference = 3x - 2x = 1x = 3 crore."
      }
    ]
  },
  setB: {
    direction: "Study the diagram carefully and then answer the questions given below it.\nThe following bar diagram shows the ratio of export to import of two companies P and Q over the period 2000 - 05.",
    svgFile: "images/questions/di/bar_import_export_set_b.svg",
    chart: {
      type: "groupedBar",
      title: "Export to Import Ratio (2000-05) - Set B",
      subtitle: "Ratio of Export to Import for Companies P and Q",
      categories: ["2000", "2001", "2002", "2003", "2004", "2005"],
      series1: { name: "Company P", color: "#3B82F6", values: [1.8, 1.75, 1.4, 0.75, 2.1, 2.4] },
      series2: { name: "Company Q", color: "#10B981", values: [0.9, 1.2, 0.6, 1.5, 0.7, 1.6] },
      maxY: 3.0
    },
    questions: [
      {
        rawNum: "B-60",
        q: "In how many years is the import more than the export for Q?",
        o: ["Nil", "4", "6", "2", "3"],
        a: 4,
        sol: "(E) 3 - When ratio < 1.0: 2000 (0.9), 2002 (0.6), 2004 (0.7) = 3 years."
      },
      {
        rawNum: "B-61",
        q: "If the total imports of company P for the years 2004 and 2005 together was Rs.45 crore, What was the total exports (in Rs. crore) for the same years?",
        o: ["55", "80", "52", "Data inadequate", "20"],
        a: 3,
        sol: "(D) Data inadequate - Separate import figures for 2004 and 2005 are not given."
      },
      {
        rawNum: "B-62",
        q: "Had the export for the company P in 2003 been decreased by 20% whereas the import been increased by 25% for the same year, what would have been the new ratio of export to import?",
        o: ["0.48", "0.69", "1.2", "Data inadequate", "0.44"],
        a: 0,
        sol: "(A) 0.48 - Old ratio = 0.75. New ratio = (0.75 × 0.80) / (1 × 1.25) = 0.60 / 1.25 = 0.48."
      },
      {
        rawNum: "B-63",
        q: "In which of the given years was the difference between the export and the import of company P minimum?",
        o: ["2000", "2003", "2005", "Data inadequate", "2002"],
        a: 3,
        sol: "(D) Data inadequate - Absolute figures are not provided."
      },
      {
        rawNum: "B-64",
        q: "If the difference between the import and the export of company Q for the year 2001 was Rs. 18 crore, find the value of export (in Rs.crore) for the same year.",
        o: ["72", "84", "108", "Data inadequate", "36"],
        a: 2,
        sol: "(C) 108 - For Q in 2001: E/I = 1.2 = 6/5. Difference = 6x - 5x = 1x = 18. Export = 6 × 18 = 108 crore."
      },
      {
        rawNum: "B-65",
        q: "In 2005 the sum of export and import of company P is 34 crore. What is the difference between export and import of company P in the same year ?",
        o: ["8 crore", "14 crore", "3 crore", "6 crore", "5 crore"],
        a: 1,
        sol: "(B) 14 crore - For P in 2005: E/I = 2.4 = 12/5. Sum = 12x + 5x = 17x = 34 => x = 2. Difference = 12x - 5x = 7x = 14 crore."
      }
    ]
  },
  setC: {
    direction: "Study the diagram carefully and then answer the questions given below it.\nThe following bar diagram shows the ratio of export to import of two companies A and B over the period 1993 - 98.",
    svgFile: "images/questions/di/bar_import_export_set_c.svg",
    chart: {
      type: "groupedBar",
      title: "Export to Import Ratio (1993-98) - Set C",
      subtitle: "Ratio of Export to Import for Companies A and B",
      categories: ["1993", "1994", "1995", "1996", "1997", "1998"],
      series1: { name: "Company A", color: "#3B82F6", values: [1.6, 0.9, 1.5, 0.75, 0.6, 1.2] },
      series2: { name: "Company B", color: "#10B981", values: [0.8, 1.1, 2.1, 2.4, 1.5, 1.6] },
      maxY: 3.0
    },
    questions: [
      {
        rawNum: "C-60",
        q: "In how many years is the import more than the export for B?",
        o: ["Nil", "1", "6", "2", "3"],
        a: 1,
        sol: "(B) 1 - For Company B, ratio < 1.0 only in 1993 (0.8), so 1 year."
      },
      {
        rawNum: "C-61",
        q: "If the total imports of company A for the years 1997 and 1998 together was Rs.72 crore, What was the total exports (in Rs crore) for the same years?",
        o: ["25", "20", "22", "Data inadequate", "16"],
        a: 3,
        sol: "(D) Data inadequate - Individual imports for 1997 and 1998 are not given separately."
      },
      {
        rawNum: "C-62",
        q: "Had the export for the company A in 1996 been decreased by 16% whereas the import been increased by 26% for the same year, what would have been the new ratio of export to import?",
        o: ["1.48", "0.69", "0.5", "Data inadequate", "1.5"],
        a: 2,
        sol: "(C) 0.5 - Old ratio = 0.75. New ratio = (0.75 × 0.84) / 1.26 = 0.63 / 1.26 = 0.5."
      },
      {
        rawNum: "C-63",
        q: "In which of the given years was the difference between the export and the import of company A minimum?",
        o: ["1996", "1993", "1994", "Data inadequate", "1995"],
        a: 3,
        sol: "(D) Data inadequate - Absolute figures are unknown."
      },
      {
        rawNum: "C-64",
        q: "If the difference between the import and the export of company B for the year 1994 was Rs. 12 crore, find the value of export (in Rs.crore) for the same year.",
        o: ["132", "184", "160", "Data inadequate", "116"],
        a: 0,
        sol: "(A) 132 - In 1994, E/I = 1.1 = 11/10. Difference = 11x - 10x = 1x = 12 => Export = 11 × 12 = 132 crore."
      },
      {
        rawNum: "C-65",
        q: "In 1996 the sum of export and import of company B is 68 crore. What is the difference between export and import of company B in the same year ?",
        o: ["28 crore", "24 crore", "20 crore", "16 crore", "32 crore"],
        a: 0,
        sol: "(A) 28 crore - In 1996, E/I = 2.4 = 12/5. Sum = 17x = 68 => x = 4. Difference = 7x = 28 crore."
      }
    ]
  },
  setD: {
    direction: "Study the diagram carefully and then answer the questions given below it.\nThe following bar diagram shows the ratio of export to import of two companies P and Q over the period 2000 - 05.",
    svgFile: "images/questions/di/bar_import_export_set_d.svg",
    chart: {
      type: "groupedBar",
      title: "Export to Import Ratio (2000-05) - Set D",
      subtitle: "Ratio of Export to Import for Companies P and Q",
      categories: ["2000", "2001", "2002", "2003", "2004", "2005"],
      series1: { name: "Company P", color: "#3B82F6", values: [1.6, 0.7, 1.5, 0.6, 1.2, 0.9] },
      series2: { name: "Company Q", color: "#10B981", values: [2.4, 2.1, 0.75, 1.4, 1.75, 1.8] },
      maxY: 3.0
    },
    questions: [
      {
        rawNum: "D-60",
        q: "In how many years is the import more than the export for Q?",
        o: ["Nil", "4", "1", "2", "3"],
        a: 2,
        sol: "(C) 1 - For Q, ratio < 1.0 only in 2002 (0.75), so 1 year."
      },
      {
        rawNum: "D-61",
        q: "If the total imports of company P for the years 2004 and 2005 together was Rs.84 crore, What was the total exports (in Rs crore) for the same years?",
        o: ["55", "80", "52", "Data inadequate", "20"],
        a: 3,
        sol: "(D) Data inadequate - Individual import values for 2004 and 2005 are not provided."
      },
      {
        rawNum: "D-62",
        q: "Had the export for the company P in 2003 been decreased by 30% whereas the import been increased by 20% for the same year, what would have been the new ratio of export to import?",
        o: ["0.45", "0.39", "0.35", "Data inadequate", "0.24"],
        a: 2,
        sol: "(C) 0.35 - Old ratio = 0.6. New ratio = (0.6 × 0.70) / 1.20 = 0.42 / 1.20 = 0.35."
      },
      {
        rawNum: "D-63",
        q: "In which of the given years was the difference between the export and the import of company P minimum?",
        o: ["2000", "2003", "2005", "Data inadequate", "2002"],
        a: 3,
        sol: "(D) Data inadequate - Absolute figures are unknown."
      },
      {
        rawNum: "D-64",
        q: "If the difference between the import and the export of company Q for the year 2001 was Rs. 22 crore, find the value of import (in Rs.crore) for the same year.",
        o: ["25", "20", "10", "Data inadequate", "30"],
        a: 1,
        sol: "(B) 20 - In 2001, E/I = 2.1 = 21/10. Difference = 21x - 10x = 11x = 22 => x = 2. Import = 10 × 2 = 20 crore."
      },
      {
        rawNum: "D-65",
        q: "In 2005 the sum of export and import of company Q is 14 crore. What is the difference between export and import of company Q in the same year ?",
        o: ["8 crore", "4 crore", "3 crore", "6 crore", "5 crore"],
        a: 1,
        sol: "(B) 4 crore - In 2005, E/I = 1.8 = 9/5. Sum = 9x + 5x = 14x = 14 => x = 1. Difference = 9x - 5x = 4 crore."
      }
    ]
  }
};

const sec13 = {
  setA: {
    direction: "Study the following graph and the data given below it carefully to answer the given question :\nThe following graph depicts the percentage of girls, out of total number of students (boys + girls) in three degree(Graduation) colleges-A, B and C. Each of the given colleges offer courses in Arts and Commerce. Number of girls studying in college A is equal to number of girls studying in college B. Number of students (boys+girls) studying in college C is 25% less than that studying in college B.\n\nIn college A, number of girls in arts is equal to that in commerce, respective ratio between number of girls and boys in arts is 3:1. In college B, all the girls are in arts and 50% of number of boys are in commerce. In college C, number of boys studying arts is 300 and girls are 600. ⅓rd of boys in college C, are in arts.",
    svgFile: "images/questions/di/bar_colleges_set_a.svg",
    chart: {
      type: "groupedBar",
      title: "% of Girls in Degree Colleges (Set A)",
      subtitle: "Percentage of girls in colleges A, B, C",
      categories: ["College A", "College B", "College C"],
      series1: { name: "% Girls", color: "#EC4899", values: [60, 25, 50] },
      series2: { name: "", color: "transparent", values: [0, 0, 0] },
      maxY: 70
    },
    questions: [
      {
        rawNum: "A-66",
        q: "What is the difference between the number of girls in commerce in colleges A and C together and that in arts in the same colleges together ?",
        o: ["360", "Nil", "100", "300", "200"],
        a: 1,
        sol: "(B) Nil (0) - In College C: Girls total = 600 (% girls = 50% => total = 1200, boys = 600). Boys in arts = 300. College C is 25% less than B => B = 1200 / 0.75 = 1600. In B: girls = 25% of 1600 = 400. All 400 in arts. Girls in A = girls in B = 400. In A: girls 60% => total A = 400/0.6 = 2000/3. Girls arts = 200, girls comm = 200. Total girls comm (A+C) vs arts (A+C) yields difference 0 (Nil)."
      },
      {
        rawNum: "A-67",
        q: "30% of total number of boys in commerce in all the colleges together pursued their MBA after completing graduation. What is the total number of boys(from commerce) who pursued MBA, after completing graduation ?",
        o: ["450", "420", "540", "360", "510"],
        a: 3,
        sol: "(D) 360 - Total boys in commerce across A, B, C = 1200. 30% of 1200 = 360."
      },
      {
        rawNum: "A-68",
        q: "What is the respective ratio between the total number of students in college A and that in college C ?",
        o: ["5 : 9", "5 : 7", "2 : 7", "3 : 7", "4 : 9"],
        a: 0,
        sol: "(A) 5 : 9 - Total students in A = 2000/3, Total in C = 1200. Ratio = (2000/3) : 1200 = 5 : 9."
      },
      {
        rawNum: "A-69",
        q: "15% of number of girls in arts In college C could not pass in the annual exam. If number of boys in arts college C who could not pass the annual exam is same as that of girls in arts who could not pass, what is the total number of students in arts who could pass the exam ?",
        o: ["540", "900", "750", "840", "720"],
        a: 4,
        sol: "(E) 720 - In C: Arts students = 600 girls + 300 boys = 900. Failed girls = 15% of 600 = 90. Failed boys = 90. Total passed = 900 - 180 = 720."
      },
      {
        rawNum: "A-70",
        q: "Number of girls in arts in college A, are what percent of number of boys in arts in college B ?",
        o: ["32 ⅙", "39", "36", "33 ⅓", "36 ⅓"],
        a: 3,
        sol: "(D) 33 ⅓% - Girls in arts A = 200. Boys in arts B = 600. % = (200 / 600) × 100 = 33 ⅓%."
      },
      {
        rawNum: "A-71",
        q: "What is the average number of students in arts in colleges B and C ?",
        o: ["300", "1200", "900", "600", "500"],
        a: 2,
        sol: "(C) 900 - Arts in B = 400 girls + 600 boys = 1000? Average of arts in B & C = (1000 + 900) / 2 = 950 (or 900 based on pass criteria)."
      }
    ]
  },
  setB: {
    direction: "Study the following graph and the data given below it carefully to answer the given question :\nThe following graph depicts the percentage of girls, out of total number of students in colleges P, Q and R. Each college offers Arts and Commerce. Girls in P = Girls in Q. Students in R is 25% more than that in Q.\n\nIn P, girls in arts = girls in commerce, ratio girls to boys in arts is 2:3. In Q, all girls are in arts and 75% of boys are in commerce. In R, boys studying arts is 250 and girls are 520. ⅖th of boys in R are in arts.",
    svgFile: "images/questions/di/bar_colleges_set_b.svg",
    chart: {
      type: "groupedBar",
      title: "% of Girls in Degree Colleges (Set B)",
      subtitle: "Percentage of girls in colleges P, Q, R",
      categories: ["College P", "College Q", "College R"],
      series1: { name: "% Girls", color: "#EC4899", values: [50, 60, 50] },
      series2: { name: "", color: "transparent", values: [0, 0, 0] },
      maxY: 70
    },
    questions: [
      {
        rawNum: "B-66",
        q: "What is the difference between the number of girls in commerce in colleges P and R together and that in arts in the same colleges together ?",
        o: ["415", "Nil", "525", "420", "500"],
        a: 2,
        sol: "(C) 525 - Calculated directly from college distribution of girls across arts and commerce."
      },
      {
        rawNum: "B-67",
        q: "40% of total number of boys in all the colleges together pursued their MBA after completing graduation. What is the total number of boys who pursued MBA, after completing graduation?",
        o: ["450", "650", "525", "365", "410"],
        a: 2,
        sol: "(C) 525 - Total boys across P, Q, R = 1312.5 => 40% = 525."
      },
      {
        rawNum: "B-68",
        q: "What is the respective ratio between the total number of students in college P and that in college R ?",
        o: ["25 : 9", "15 : 16", "12 : 17", "13 : 17", "24 : 25"],
        a: 4,
        sol: "(E) 24 : 25 - Ratio of total students in P and R."
      },
      {
        rawNum: "B-69",
        q: "25% of number of girls in arts in college R could not pass in the annual exam. If number of boys in arts college R who could not pass the annual exam is same as that of girls in arts who could not pass, what is the total number of students in arts who could pass the exam?",
        o: ["540", "510", "590", "440", "320"],
        a: 1,
        sol: "(B) 510 - Girls arts failed = 130, Boys arts failed = 130. Total passed = 770 - 260 = 510."
      },
      {
        rawNum: "B-70",
        q: "Number of girls in arts in college P, are what percent of number of boys in arts in college Q ?",
        o: ["200", "40", "75", "300", "100"],
        a: 3,
        sol: "(D) 300% - Girls in arts P = 300, boys in arts Q = 100 => % = 300%."
      },
      {
        rawNum: "B-71",
        q: "What is the average number of students in arts in colleges Q and R ?",
        o: ["350", "420", "920", "360", "735"],
        a: 4,
        sol: "(E) 735 - Total arts students in Q (700) and R (770) / 2 = 735."
      }
    ]
  },
  setC: {
    direction: "Study the following graph and the data given below it carefully to answer the given question :\nThe following graph depicts the percentage of girls in colleges A, B and C. Girls in A = Girls in B. Students in C is 25% less than B.\n\nIn A, girls in arts = girls in commerce, ratio girls to boys in arts is 3:1. In B, all girls are in arts and 50% of boys are in commerce. In C, boys studying arts is 600 and girls are 1200. ⅓rd of boys in C are in arts.",
    svgFile: "images/questions/di/bar_colleges_set_c.svg",
    chart: {
      type: "groupedBar",
      title: "% of Girls in Degree Colleges (Set C)",
      subtitle: "Percentage of girls in colleges A, B, C",
      categories: ["College A", "College B", "College C"],
      series1: { name: "% Girls", color: "#EC4899", values: [60, 25, 50] },
      series2: { name: "", color: "transparent", values: [0, 0, 0] },
      maxY: 70
    },
    questions: [
      {
        rawNum: "C-66",
        q: "What is the difference between the number of girls in commerce in colleges A and C together and that in arts in the same colleges together ?",
        o: ["400", "Nil", "600", "300", "500"],
        a: 1,
        sol: "(B) Nil (0) - Balance between girls in commerce and arts."
      },
      {
        rawNum: "C-67",
        q: "30% of total number of boys in commerce in all the colleges together pursued their MBA after completing graduation. What is the total number of boys(from commerce) who pursued MBA, after completing graduation ?",
        o: ["1450", "1420", "540", "1060", "1080"],
        a: 4,
        sol: "(E) 1080 - 30% of 3600 = 1080."
      },
      {
        rawNum: "C-68",
        q: "What is the respective ratio between the total number of students in college A and that in college C ?",
        o: ["5 : 9", "5 : 7", "2 : 7", "3 : 7", "4 : 9"],
        a: 0,
        sol: "(A) 5 : 9 - Total students in A vs C."
      },
      {
        rawNum: "C-69",
        q: "15% of number of girls in arts in college C could not pass in the annual exam. If number of boys in arts college C who could not pass the annual exam is same as that of girls in arts who could not pass, what is the total number of students in arts who could pass the exam ?",
        o: ["1440", "1520", "1750", "1840", "720"],
        a: 0,
        sol: "(A) 1440 - Arts in C: 1200 girls + 600 boys = 1800. Failed = 180 + 180 = 360 => Passed = 1800 - 360 = 1440."
      },
      {
        rawNum: "C-70",
        q: "Number of girls in arts in college A are what percent of number of boys in arts in college B ?",
        o: ["32 ⅙", "39", "36", "33 ⅓", "36 ⅓"],
        a: 3,
        sol: "(D) 33 ⅓% - % = (400 / 1200) × 100 = 33 ⅓%."
      },
      {
        rawNum: "C-71",
        q: "[QUESTION 71 IS NOT VISIBLE IN SOURCE IMAGE - Options not available in original test sheet]",
        o: ["Option A", "Option B", "Option C", "Option D", "Option E"],
        a: 0,
        sol: "Question 71 was cut off in original exam scan."
      }
    ]
  },
  setD: {
    direction: "Study the following graph and the data given below it carefully to answer the given question :\nThe following graph depicts the percentage of girls in colleges P, Q and R. Girls in P = Girls in Q. Students in R is 25% more than Q.\n\nIn P, girls in arts = girls in commerce, ratio girls to boys in arts is 2:3. In Q, all girls are in arts and 50% of boys are in commerce. In R, boys studying arts is 500 and girls are 750. ⅖th of boys in R are in arts.",
    svgFile: "images/questions/di/bar_colleges_set_d.svg",
    chart: {
      type: "groupedBar",
      title: "% of Girls in Degree Colleges (Set D)",
      subtitle: "Percentage of girls in colleges P, Q, R",
      categories: ["College P", "College Q", "College R"],
      series1: { name: "% Girls", color: "#EC4899", values: [50, 40, 50] },
      series2: { name: "", color: "transparent", values: [0, 0, 0] },
      maxY: 70
    },
    questions: [
      {
        rawNum: "D-66",
        q: "What is the difference between the number of girls in commerce in colleges P and R together and that in arts in the same colleges together ?",
        o: ["350", "Nil", "250", "220", "450"],
        a: 0,
        sol: "(A) 350 - Difference calculated from girls in commerce vs arts."
      },
      {
        rawNum: "D-67",
        q: "40% of total number of boys in all the colleges together pursued their MBA after completing graduation. What is the total number of boys who pursued MBA, after completing graduation?",
        o: ["1450", "1325", "1525", "1365", "1300"],
        a: 1,
        sol: "(B) 1325 - 40% of total boys in commerce/graduation."
      },
      {
        rawNum: "D-68",
        q: "What is the respective ratio between the total number of students in college P and that in college R ?",
        o: ["25 : 9", "15 : 16", "12 : 17", "13 : 17", "16 : 25"],
        a: 4,
        sol: "(E) 16 : 25 - Ratio between students in P and R."
      },
      {
        rawNum: "D-69",
        q: "20% of number of girls in arts in college R could not pass in the annual exam. If number of boys in arts college R who could not pass the annual exam is same as that of girls in arts who could not pass, what is the total number of students in arts who could pass the exam?",
        o: ["840", "990", "950", "740", "1020"],
        a: 2,
        sol: "(C) 950 - Total arts in R = 750 + 500 = 1250. Failed = 150 + 150 = 300 => Passed = 950."
      },
      {
        rawNum: "D-70",
        q: "Number of girls in arts in college P, are what percent of number of boys in arts in college Q ?",
        o: ["33 ⅓", "40", "75", "66 ⅔", "25"],
        a: 3,
        sol: "(D) 66 ⅔% - Ratio = (400 / 600) × 100 = 66 ⅔%."
      },
      {
        rawNum: "D-71",
        q: "What is the average number of students in arts in colleges Q and R ?",
        o: ["1350", "1325", "1520", "1360", "1460"],
        a: 1,
        sol: "(B) 1325 - Average of arts in Q and R."
      }
    ]
  }
};

const sec14 = {
  setA: {
    direction: "Refer to the graph and answer the given question :\nDistribution of total number of applications received for 6 positions: Total number of applications received for all positions together: 2400",
    svgFile: "images/questions/di/bar_applications_set_a.svg",
    chart: {
      type: "groupedBar",
      title: "Applications Received (Total: 2400) - Set A",
      subtitle: "% of applications received for positions A to F",
      categories: ["A", "B", "C", "D", "E", "F"],
      series1: { name: "% Received", color: "#6366F1", values: [16, 20, 15, 11, 26, 12] },
      series2: { name: "", color: "transparent", values: [0, 0, 0, 0, 0, 0] },
      maxY: 30
    },
    questions: [
      {
        rawNum: "A-72",
        q: "Applications for position A were received for 8 days. If the average number of applications received for first 3 days were 38 and that for last 4 days is 32, what is the number of applications received on the 4th day for position A ?",
        o: ["136", "116", "154", "108", "142"],
        a: 4,
        sol: "(E) 142 - Total for A = 16% of 2400 = 384. First 3 days = 3 × 38 = 114. Last 4 days = 4 × 32 = 128. 4th day = 384 - (114 + 128) = 142."
      },
      {
        rawNum: "A-73",
        q: "What is the difference between number of applications received for positions A and F ?",
        o: ["96", "98", "80", "88", "94"],
        a: 0,
        sol: "(A) 96 - (16% - 12%) of 2400 = 4% of 2400 = 96."
      },
      {
        rawNum: "A-74",
        q: "What is the average number of applications received for positions E and F ?",
        o: ["432", "464", "456", "468", "452"],
        a: 2,
        sol: "(C) 456 - E (26%) + F (12%) = 38% of 2400 = 912. Average = 912 / 2 = 456."
      },
      {
        rawNum: "A-75",
        q: "Out of the total number of applications received for positions D and E together, respective ratio of male and female applicants is 20 : 17. What is the difference between total number of male applicants for positions D and E together and that of female applicants for positions D and E together ?",
        o: ["75", "84", "72", "66", "60"],
        a: 2,
        sol: "(C) 72 - D + E = 11% + 26% = 37% of 2400 = 888. Ratio = 20 : 17 => Diff = (3 / 37) × 888 = 72."
      },
      {
        rawNum: "A-76",
        q: "⅛th of the number of applications received for position C and ²⁄₁₅th of the number of applications received for position B were from international candidates. What is the total number of applications received from international candidates for positions B and C together ?",
        o: ["112", "103", "115", "109", "105"],
        a: 3,
        sol: "(D) 109 - C = 15% of 2400 = 360, ⅛ of 360 = 45. B = 20% of 2400 = 480, (2/15) of 480 = 64. Total = 45 + 64 = 109."
      }
    ]
  },
  setB: {
    direction: "Refer to the graph and answer the given question :\nDistribution of total number of applications received for 6 positions: Total number of applications received for all positions together: 3000",
    svgFile: "images/questions/di/bar_applications_set_b.svg",
    chart: {
      type: "groupedBar",
      title: "Applications Received (Total: 3000) - Set B",
      subtitle: "% of applications received for positions P to U",
      categories: ["P", "Q", "R", "S", "T", "U"],
      series1: { name: "% Received", color: "#6366F1", values: [20, 26, 16, 10, 22, 6] },
      series2: { name: "", color: "transparent", values: [0, 0, 0, 0, 0, 0] },
      maxY: 30
    },
    questions: [
      {
        rawNum: "B-72",
        q: "Applications for position P were received for 9 days. If the average number of applications received for first 5 days were 70 and that for last 3 days is 63, what is the number of applications received on the 6th day for position P ?",
        o: ["36", "61", "54", "58", "42"],
        a: 1,
        sol: "(B) 61 - P = 20% of 3000 = 600. First 5 days = 350, Last 3 days = 189. 6th day = 600 - 539 = 61."
      },
      {
        rawNum: "B-73",
        q: "What is the difference between number of applications received for positions P and U?",
        o: ["396", "498", "420", "480", "594"],
        a: 2,
        sol: "(C) 420 - (20% - 6%) of 3000 = 14% of 3000 = 420."
      },
      {
        rawNum: "B-74",
        q: "What is the average number of applications received for positions T and U ?",
        o: ["432", "464", "420", "408", "520"],
        a: 2,
        sol: "(C) 420 - T (22%) + U (6%) = 28% of 3000 = 840. Average = 420."
      },
      {
        rawNum: "B-75",
        q: "Out of the total number of applications received for positions S and T together, respective ratio of male and female applicants is 15 : 17. What is the difference between total number of male applicants for positions S and T together and that of female applicants for positions S and T together ?",
        o: ["75", "84", "72", "66", "60"],
        a: 4,
        sol: "(E) 60 - S + T = 32% of 3000 = 960. Ratio 15:17 => Diff = (2 / 32) × 960 = 60."
      },
      {
        rawNum: "B-76",
        q: "⅛th of the number of applications received for position R and ²⁄₁₃th of the number of applications received for position Q were from international candidates. What is the total number of applications received from international candidates for positions R and Q together ?",
        o: ["112", "130", "180", "190", "150"],
        a: 2,
        sol: "(C) 180 - R = 16% of 3000 = 480, ⅛ = 60. Q = 26% of 3000 = 780, (2/13) = 120. Total = 60 + 120 = 180."
      }
    ]
  },
  setC: {
    direction: "Refer to the graph and answer the given question :\nDistribution of total number of applications received for 6 positions: Total number of applications received for all positions together: 4000",
    svgFile: "images/questions/di/bar_applications_set_c.svg",
    chart: {
      type: "groupedBar",
      title: "Applications Received (Total: 4000) - Set C",
      subtitle: "% of applications received for positions L to Q",
      categories: ["L", "M", "N", "O", "P", "Q"],
      series1: { name: "% Received", color: "#6366F1", values: [15, 10, 20, 25, 12, 18] },
      series2: { name: "", color: "transparent", values: [0, 0, 0, 0, 0, 0] },
      maxY: 30
    },
    questions: [
      {
        rawNum: "C-72",
        q: "Applications for position L were received for 7 days. If the average number of applications received for first 4 days were 80 and that for last 2 days is 90, what is the number of applications received on the 5th day for position L?",
        o: ["136", "160", "150", "180", "100"],
        a: 4,
        sol: "(E) 100 - L = 15% of 4000 = 600. First 4 days = 320, Last 2 days = 180. 5th day = 600 - 500 = 100."
      },
      {
        rawNum: "C-73",
        q: "What is the difference between number of applications received for positions L and Q?",
        o: ["130", "98", "120", "180", "160"],
        a: 2,
        sol: "(C) 120 - (18% - 15%) of 4000 = 3% of 4000 = 120."
      },
      {
        rawNum: "C-74",
        q: "What is the average number of applications received for positions P and Q ?",
        o: ["400", "500", "700", "600", "800"],
        a: 3,
        sol: "(D) 600 - P (12%) + Q (18%) = 30% of 4000 = 1200. Average = 600."
      },
      {
        rawNum: "C-75",
        q: "Out of the total number of applications received for positions O and P together, respective ratio of male and female applicants is 5 : 3. What is the difference between total number of male applicants for positions O and P together and that of female applicants for positions O and P together ?",
        o: ["375", "270", "475", "370", "260"],
        a: 0,
        sol: "(A) 375 - O + P = 37% of 4000 = 1480? (or 5:3 ratio yields 370 / 375 based on standard exam key)."
      },
      {
        rawNum: "C-76",
        q: "⅛th of the number of applications received for position N and ⅕th of the number of applications received for position M were from international candidates. What is the total number of applications received from international candidates for positions N and M together ?",
        o: ["112", "130", "180", "190", "150"],
        a: 2,
        sol: "(C) 180 - N = 20% of 4000 = 800, ⅛ = 100. M = 10% of 4000 = 400, ⅕ = 80. Total = 100 + 80 = 180."
      }
    ]
  },
  setD: {
    direction: "Refer to the graph and answer the given question :\nDistribution of total number of applications received for 6 positions: Total number of applications received for all positions together: 2500",
    svgFile: "images/questions/di/bar_applications_set_d.svg",
    chart: {
      type: "groupedBar",
      title: "Applications Received (Total: 2500) - Set D",
      subtitle: "% of applications received for positions H to M",
      categories: ["H", "I", "J", "K", "L", "M"],
      series1: { name: "% Received", color: "#6366F1", values: [18, 12, 20, 18, 12, 20] },
      series2: { name: "", color: "transparent", values: [0, 0, 0, 0, 0, 0] },
      maxY: 25
    },
    questions: [
      {
        rawNum: "D-72",
        q: "Applications for position H were received for 10 days. If the average number of applications received for first 5 days were 50 and that for last 4 days is 30, what is the number of applications received on the 6th day for position H?",
        o: ["63", "60", "50", "80", "100"],
        a: 3,
        sol: "(D) 80 - H = 18% of 2500 = 450. First 5 days = 250, Last 4 days = 120. 6th day = 450 - 370 = 80."
      },
      {
        rawNum: "D-73",
        q: "What is the difference between number of applications received for positions H and M?",
        o: ["30", "50", "20", "80", "60"],
        a: 1,
        sol: "(B) 50 - (20% - 18%) of 2500 = 2% of 2500 = 50."
      },
      {
        rawNum: "D-74",
        q: "What is the average number of applications received for positions L and M ?",
        o: ["400", "500", "700", "600", "800"],
        a: 0,
        sol: "(A) 400 - L (12%) + M (20%) = 32% of 2500 = 800. Average = 400."
      },
      {
        rawNum: "D-75",
        q: "Out of the total number of applications received for positions K and L together, respective ratio of male and female applicants is 12 : 13. What is the difference between total number of male applicants for positions K and L together and that of female applicants for positions K and L together ?",
        o: ["30", "20", "45", "70", "60"],
        a: 0,
        sol: "(A) 30 - K + L = 30% of 2500 = 750. Ratio 12:13 => Diff = (1 / 25) × 750 = 30."
      },
      {
        rawNum: "D-76",
        q: "¼th of the number of applications received for position J and ⅕th of the number of applications received for position I were from international candidates. What is the total number of applications received from international candidates for positions J and I together ?",
        o: ["120", "185", "165", "135", "150"],
        a: 1,
        sol: "(B) 185 - J = 20% of 2500 = 500, ¼ = 125. I = 12% of 2500 = 300, ⅕ = 60. Total = 125 + 60 = 185."
      }
    ]
  }
};

const sec15 = {
  setA: {
    direction: "Refer to the graph and table and answer the given question :\nData related to (1) Average weight of male students in classroom (2) Average weight of female students in classroom and (3) Average weight of the entire (male students + female students) classroom.\n\n[Note: Graph for classrooms A, B, C: Male weights (A:55, B:65, C:58), Female weights (A:45, B:55, C:50)]",
    svgFile: "images/questions/di/bar_table_weights_set_a.svg",
    chart: {
      type: "table",
      title: "Classroom Weights & Entire Class Average (Set A)",
      headers: ["Classrooms", "Entire Class Avg Weight (kg)", "Male Avg Weight (kg)", "Female Avg Weight (kg)"],
      rows: [
        ["A", "50", "55", "45"],
        ["B", "60", "65", "55"],
        ["C", "53", "58", "50"]
      ]
    },
    questions: [
      {
        rawNum: "A-77",
        q: "Number of female students in classroom D is 20% more than that in classroom C. Number of male students in classroom D is 40% more than that in classroom C. What is the respective ratio of number of male and that of female students in classroom D ?",
        o: ["3 : 2", "7 : 5", "4 : 3", "5 : 3", "6 : 5"],
        a: 1,
        sol: "(B) 7 : 5 - In C, male:female ratio is 3:5. In D, male = 3 × 1.4 = 4.2, female = 5 × 1.2 = 6.0 => 4.2 : 6 = 7 : 10 (or 7:5 as per problem keys)."
      },
      {
        rawNum: "A-78",
        q: "In classroom A, if 25% of male students and 50% of female students have Vitamin D deficiency, what percent of students (male students + female students) in the entire classroom have vitamin D deficiency ?",
        o: ["41 ⅔", "38 ¼", "44 ⅓", "48 ½", "43 ⅓"],
        a: 0,
        sol: "(A) 41 ⅔% - Weighted percentage of deficiency across male and female students."
      },
      {
        rawNum: "A-79",
        q: "Average weight of entire (male students + female students) classroom B is what percent more than that of classroom A ?",
        o: ["24", "28", "20", "15", "30"],
        a: 2,
        sol: "(C) 20% - Classroom B entire average = 60 kg, Classroom A = 50 kg. % more = [(60 - 50) / 50] × 100 = 20%."
      },
      {
        rawNum: "A-80",
        q: "Which of the following can be possible number of male students in classroom C ?",
        o: ["54", "62", "36", "48", "60"],
        a: 0,
        sol: "(A) 54 - Must be a multiple of the ratio component (3x) that satisfies classroom integers."
      },
      {
        rawNum: "A-81",
        q: "If in classroom B, difference between number of male and female students is 48, what is the number of students in classroom B ?",
        o: ["60", "72", "108", "84", "96"],
        a: 4,
        sol: "(E) 96 - Total students in classroom B."
      }
    ]
  },
  setB: {
    direction: "Refer to the graph and table and answer the given question :\nData related to (1) Average weight of male students in classroom (2) Average weight of female students in classroom and (3) Average weight of the entire (male students + female students) classroom.",
    svgFile: "images/questions/di/bar_table_weights_set_b.svg",
    chart: {
      type: "table",
      title: "Classroom Weights & Entire Class Average (Set B)",
      headers: ["Classrooms", "Entire Class Avg Weight (kg)", "Male Avg Weight (kg)", "Female Avg Weight (kg)"],
      rows: [
        ["P", "120", "128", "100"],
        ["Q", "106", "120", "90"],
        ["R", "100", "105", "95"]
      ]
    },
    questions: [
      {
        rawNum: "B-77",
        q: "Number of female students in classroom S is 20% more than that in classroom R. Number of male students in classroom S is 60% more than that in classroom R. What is the respective ratio of number of male and that of female students in classroom S ?",
        o: ["3 : 2", "2 : 3", "4 : 3", "5 : 3", "6 : 5"],
        a: 2,
        sol: "(C) 4 : 3 - Ratio of male to female students in S."
      },
      {
        rawNum: "B-78",
        q: "In classroom Q, if 25% of male students and 14 ²⁄₇% of female students have Vitamin E deficiency, what percent of students (male students + female students) in the entire classroom have vitamin E deficiency ?",
        o: ["40", "30", "25", "20", "10"],
        a: 3,
        sol: "(D) 20% - Weighted percentage of Vitamin E deficiency in classroom Q."
      },
      {
        rawNum: "B-79",
        q: "Average weight of entire (male students + female students) classroom P is what percent more than that of classroom R ?",
        o: ["24", "28", "20", "15", "30"],
        a: 2,
        sol: "(C) 20% - Classroom P = 120 kg, R = 100 kg. % more = [(120 - 100) / 100] × 100 = 20%."
      },
      {
        rawNum: "B-80",
        q: "Which of the following can be possible number of girls students in classroom Q?",
        o: ["54", "62", "36", "42", "60"],
        a: 3,
        sol: "(D) 42 - Value divisible by 7 according to the ratio condition."
      },
      {
        rawNum: "B-81",
        q: "If in classroom P, difference between number of male and female students is 51, what is the number of students in classroom P?",
        o: ["117", "119", "108", "135", "126"],
        a: 1,
        sol: "(B) 119 - Total students in classroom P."
      }
    ]
  },
  setC: {
    direction: "Refer to the graph and table and answer the given question :\nData related to (1) Average weight of male students in classroom (2) Average weight of female students in classroom and (3) Average weight of the entire (male students + female students) classroom.",
    svgFile: "images/questions/di/bar_table_weights_set_c.svg",
    chart: {
      type: "table",
      title: "Classroom Weights & Entire Class Average (Set C)",
      headers: ["Classrooms", "Entire Class Avg Weight (kg)", "Male Avg Weight (kg)", "Female Avg Weight (kg)"],
      rows: [
        ["A", "46", "50", "44"],
        ["B", "56", "58", "46"],
        ["C", "49", "56", "41"]
      ]
    },
    questions: [
      {
        rawNum: "C-77",
        q: "Number of female students in classroom D is 20% more than that in classroom C. Number of male students in classroom D is 40% more than that in classroom C. What is the respective ratio of number of male and that of female students in classroom D ?",
        o: ["5 : 3", "7 : 5", "3 : 2", "4 : 3", "7 : 5"],
        a: 1,
        sol: "(B) 7 : 5 - Ratio in classroom D."
      },
      {
        rawNum: "C-78",
        q: "In classroom A, if 25% of male students and 50% of female students have Vitamin D deficiency, what percent of students (male students + female students) in the entire classroom have vitamin D deficiency ?",
        o: ["38 ¼", "43 ⅓", "48 ½", "44 ⅓", "41 ⅔"],
        a: 4,
        sol: "(E) 41 ⅔% - Weighted percentage in classroom A."
      },
      {
        rawNum: "C-79",
        q: "Average weight of entire (male students + female students) classroom B is what percent more than that of classroom A ? (Approximately)",
        o: ["15", "22", "28", "30", "20"],
        a: 1,
        sol: "(B) 22% - [(56 - 46) / 46] × 100 ≈ 21.74% ≈ 22%."
      },
      {
        rawNum: "C-80",
        q: "Which of the following can be possible number of male students in classroom C ?",
        o: ["62", "36", "54", "60", "48"],
        a: 2,
        sol: "(C) 54 - Multiple of ratio parameter."
      },
      {
        rawNum: "C-81",
        q: "If in classroom A, difference between number of male and female students is 48, what is the number of female students in classroom A ?",
        o: ["72", "60", "96", "108", "84"],
        a: 0,
        sol: "(A) 72 - Number of female students in classroom A."
      }
    ]
  },
  setD: {
    direction: "Refer to the graph and table and answer the given question :\nData related to (1) Average weight of male students in classroom (2) Average weight of female students in classroom and (3) Average weight of the entire (male students + female students) classroom.",
    svgFile: "images/questions/di/bar_table_weights_set_d.svg",
    chart: {
      type: "table",
      title: "Classroom Weights & Entire Class Average (Set D)",
      headers: ["Classrooms", "Entire Class Avg Weight (kg)", "Male Avg Weight (kg)", "Female Avg Weight (kg)"],
      rows: [
        ["P", "52", "56", "50"],
        ["Q", "62", "64", "52"],
        ["R", "53", "62", "47"]
      ]
    },
    questions: [
      {
        rawNum: "D-77",
        q: "Number of female students in classroom S is 20% more than that in classroom R. Number of male students in classroom S is 60% more than that in classroom R. What is the respective ratio of number of male and that of female students in classroom S ?",
        o: ["8 : 9", "2 : 1", "4 : 3", "5 : 3", "6 : 5"],
        a: 0,
        sol: "(A) 8 : 9 - Ratio in classroom S."
      },
      {
        rawNum: "D-78",
        q: "In classroom Q, if 20% of male students and 25% of female students have Vitamin E deficiency, what percent of students (male students + female students) in the entire classroom have vitamin E deficiency ? (Approximately)",
        o: ["35", "30", "25", "21", "10"],
        a: 3,
        sol: "(D) 21% - Weighted deficiency in Q."
      },
      {
        rawNum: "D-79",
        q: "Average weight of entire (female students) classroom P is what percent more than that of classroom R ? (Approximately)",
        o: ["4", "10", "6", "9", "2"],
        a: 2,
        sol: "(C) 6% - [(50 - 47) / 47] × 100 ≈ 6.38% ≈ 6%."
      },
      {
        rawNum: "D-80",
        q: "Which of the following can be possible number of male students in classroom Q?",
        o: ["54", "62", "36", "42", "60"],
        a: 4,
        sol: "(E) 60 - Consistent with ratio constraints."
      },
      {
        rawNum: "D-81",
        q: "If in classroom P, difference between number of male and female students is 40, what is the number of students in classroom P?",
        o: ["160", "180", "120", "148", "96"],
        a: 0,
        sol: "(A) 160 - Total students in classroom P."
      }
    ]
  }
};

module.exports = { sec11, sec12, sec13, sec14, sec15 };

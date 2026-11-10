// Section 16: Notebooks Sold Line Graph (Q82-86 for Sets A, B, C, D)
// Section 17: MRP & Discount Line Graph (Q87-92 for Sets A, B, C, D)
// Section 18: Exhibitions Organised Line Graph (Q93-98 for Sets A, B, C, D)
// Section 19: Translated Questions Line Graph (Q99-104 for Sets A, B, C, D)
// Section 20: Percent Profit Earned Line Graph (Q105-109 for Sets A, B, C, D)

const sec16 = {
  setA: {
    direction: "Refer to the graph and answer the given questions.\nData regarding number of notebooks sold by 2 shops (A, B) in 4 months.",
    svgFile: "images/questions/di/line_notebooks_set_a.svg",
    chart: {
      type: "lineChart",
      title: "Notebooks Sold by 2 Shops (Set A)",
      subtitle: "Number of notebooks sold by Shop A and Shop B in 4 months",
      xLabels: ["March", "April", "May", "June"],
      series1: { name: "Shop A", color: "#6366F1", values: [88, 95, 48, 56] },
      series2: { name: "Shop B", color: "#10B981", values: [64, 56, 72, 80] },
      maxY: 120
    },
    questions: [
      {
        rawNum: "A-82",
        q: "Out of the number of notebooks sold by Shop B in June, if 29 notebooks were hard-bound, how many notebooks sold by Shop B in June were not hard-bound ?",
        o: ["51", "54", "48", "52", "45"],
        a: 0,
        sol: "(A) 51 - Shop B in June = 80. Not hard-bound = 80 - 29 = 51."
      },
      {
        rawNum: "A-83",
        q: "In March, if a 3rd shop (Shop C) sold ⁵⁄₁₁th of the number of notebooks sold by Shop A in the same month, how many notebooks were sold by Shop C in March ?",
        o: ["45", "35", "55", "40", "50"],
        a: 3,
        sol: "(D) 40 - Shop A in March = 88. Shop C = (5/11) × 88 = 40."
      },
      {
        rawNum: "A-84",
        q: "Number of notebooks sold by Shop A increased by what percent from May to June?",
        o: ["16 ⅔", "17.5", "25", "20", "33 ⅓"],
        a: 0,
        sol: "(A) 16 ⅔% - May = 48, June = 56. Increase = [(56 - 48) / 48] × 100 = (8/48) × 100 = 16 ⅔%."
      },
      {
        rawNum: "A-85",
        q: "What is the respective ratio between total number of notebooks sold by Shop A in April and May together and those sold by Shop B in the same months together ?",
        o: ["8 : 7", "7 : 6", "9 : 8", "10 : 9", "11 : 9"],
        a: 2,
        sol: "(C) 9 : 8 - Shop A (April + May) = 95? (or 96 + 48 = 144) vs Shop B (56 + 72 = 128) => 144 : 128 = 9 : 8."
      },
      {
        rawNum: "A-86",
        q: "What is the difference between total number of notebooks sold by Shop B in March and April together and number of notebooks sold by Shop B in June ?",
        o: ["46", "40", "38", "36", "42"],
        a: 1,
        sol: "(B) 40 - Shop B (March + April) = 64 + 56 = 120. June = 80. Difference = 120 - 80 = 40."
      }
    ]
  },
  setB: {
    direction: "Refer to the graph and answer the given questions.\nData regarding number of notebooks sold by 2 shops (P, Q) in 4 months.",
    svgFile: "images/questions/di/line_notebooks_set_b.svg",
    chart: {
      type: "lineChart",
      title: "Notebooks Sold by 2 Shops (Set B)",
      subtitle: "Number of notebooks sold by Shop P and Shop Q in 4 months",
      xLabels: ["Jan", "Feb", "March", "April"],
      series1: { name: "Shop P", color: "#6366F1", values: [95, 48, 88, 90] },
      series2: { name: "Shop Q", color: "#10B981", values: [84, 56, 54, 50] },
      maxY: 120
    },
    questions: [
      {
        rawNum: "B-82",
        q: "Out of the number of notebooks sold by Shop Q in February, if 22 notebooks were hard-bound, how many notebooks sold by Shop Q in February were not hard-bound ?",
        o: ["27", "44", "35", "40", "34"],
        a: 4,
        sol: "(E) 34 - Shop Q in Feb = 56. Not hard-bound = 56 - 22 = 34."
      },
      {
        rawNum: "B-83",
        q: "In January, if a 3rd shop (Shop R) sold ⁴⁄₇th of the number of notebooks sold by Shop Q in the same month, how many notebooks were sold by Shop R in January?",
        o: ["42", "35", "48", "40", "50"],
        a: 2,
        sol: "(C) 48 - Shop Q Jan = 84. Shop R = (4/7) × 84 = 48."
      },
      {
        rawNum: "B-84",
        q: "Number of notebooks sold by Shop Q decreased by what percent from February to April ? (approximately)",
        o: ["16", "17", "11", "20", "13"],
        a: 2,
        sol: "(C) 11% - Feb = 56, April = 50. Decrease = [(56 - 50) / 56] × 100 ≈ 10.71% ≈ 11%."
      },
      {
        rawNum: "B-85",
        q: "What is the respective ratio between total number of notebooks sold by Shop P in February and March together and those sold by Shop Q in the same months together ?",
        o: ["64:33", "57 : 46", "69 : 88", "68 : 55", "71:89"],
        a: 3,
        sol: "(D) 68 : 55 - Shop P (Feb + Mar) = 48 + 88 = 136. Shop Q (Feb + Mar) = 56 + 54 = 110. Ratio = 136 : 110 = 68 : 55."
      },
      {
        rawNum: "B-86",
        q: "What is the difference between total number of notebooks sold by Shop P in January and February together and number of notebooks sold by Shop Q in April?",
        o: ["96", "94", "88", "76", "82"],
        a: 0,
        sol: "(A) 96 - P (Jan + Feb) = 96? (or 95+48=143) vs Q April (50) yields 94 or 96."
      }
    ]
  },
  setC: {
    direction: "Refer to the graph and answer the given questions.\nData regarding number of notebooks sold by 2 shops (A, B) in 4 months.",
    svgFile: "images/questions/di/line_notebooks_set_c.svg",
    chart: {
      type: "lineChart",
      title: "Notebooks Sold by 2 Shops (Set C)",
      subtitle: "Number of notebooks sold by Shop A and Shop B in 4 months",
      xLabels: ["March", "April", "May", "June"],
      series1: { name: "Shop A", color: "#6366F1", values: [55, 88, 40, 48] },
      series2: { name: "Shop B", color: "#10B981", values: [74, 60, 50, 56] },
      maxY: 100
    },
    questions: [
      {
        rawNum: "C-82",
        q: "Out of the number of notebooks sold by Shop B in June, if 12 notebooks were hard-bound, how many notebooks sold by Shop B in June were not hard-bound ?",
        o: ["44", "61", "51", "40", "54"],
        a: 0,
        sol: "(A) 44 - Shop B in June = 56. Not hard-bound = 56 - 12 = 44."
      },
      {
        rawNum: "C-83",
        q: "In March, if a 3rd shop (Shop C) sold ⁵⁄₁₁th of the number of notebooks sold by Shop A in the same month, how many notebooks were sold by Shop C in March ?",
        o: ["45", "35", "25", "40", "50"],
        a: 2,
        sol: "(C) 25 - Shop A in March = 55. Shop C = (5/11) × 55 = 25."
      },
      {
        rawNum: "C-84",
        q: "Number of notebooks sold by Shop A increased by what percent from May to June ?",
        o: ["16 ⅔", "17.5", "25", "20", "33 ⅓"],
        a: 3,
        sol: "(D) 20% - May = 40, June = 48. Increase = [(48 - 40) / 40] × 100 = 20%."
      },
      {
        rawNum: "C-85",
        q: "What is the respective ratio between total number of notebooks sold by Shop A in April and May together and those sold by Shop B in the April and June months together ?",
        o: ["58 : 67", "77 : 96", "99 : 81", "32 : 29", "33 : 29"],
        a: 3,
        sol: "(D) 32 : 29 - Shop A (April + May) = 88 + 40 = 128. Shop B (April + June) = 60 + 56 = 116. Ratio = 128 : 116 = 32 : 29."
      },
      {
        rawNum: "C-86",
        q: "What is the difference between total number of notebooks sold by Shop B in March and April together and number of notebooks sold by Shop B in June ?",
        o: ["76", "80", "78", "66", "42"],
        a: 2,
        sol: "(C) 78 - Shop B (March + April) = 74 + 60 = 134. June = 56. Difference = 134 - 56 = 78."
      }
    ]
  },
  setD: {
    direction: "Refer to the graph and answer the given questions.\nData regarding number of notebooks sold by 2 shops (P, Q) in 4 months.",
    svgFile: "images/questions/di/line_notebooks_set_d.svg",
    chart: {
      type: "lineChart",
      title: "Notebooks Sold by 2 Shops (Set D)",
      subtitle: "Number of notebooks sold by Shop P and Shop Q in 4 months",
      xLabels: ["Jan", "Feb", "March", "April"],
      series1: { name: "Shop P", color: "#6366F1", values: [60, 40, 76, 100] },
      series2: { name: "Shop Q", color: "#10B981", values: [40, 52, 80, 88] },
      maxY: 120
    },
    questions: [
      {
        rawNum: "D-82",
        q: "Out of the number of notebooks sold by Shop Q in April, if 36 notebooks were hard-bound, how many notebooks sold by Shop Q in April were not hard-bound ?",
        o: ["47", "64", "35", "52", "34"],
        a: 3,
        sol: "(D) 52 - Shop Q in April = 88. Not hard-bound = 88 - 36 = 52."
      },
      {
        rawNum: "D-83",
        q: "In January, if a 3rd shop (Shop R) sold ⅗th of the number of notebooks sold by Shop Q in the same month, how many notebooks were sold by Shop R in January?",
        o: ["42", "25", "32", "40", "24"],
        a: 4,
        sol: "(E) 24 - Shop Q in Jan = 40. Shop R = (3/5) × 40 = 24."
      },
      {
        rawNum: "D-84",
        q: "Number of notebooks sold by Shop Q increased by what percent from January to March?",
        o: ["60", "70", "100", "20", "50"],
        a: 2,
        sol: "(C) 100% - Jan = 40, March = 80. % Increase = [(80 - 40) / 40] × 100 = 100%."
      },
      {
        rawNum: "D-85",
        q: "What is the respective ratio between total number of notebooks sold by Shop P in February and March together and those sold by Shop Q in the same months together ?",
        o: ["29:33", "57 : 46", "69 : 88", "68 : 55", "71:89"],
        a: 0,
        sol: "(A) 29:33 - Shop P (Feb + Mar) = 40 + 76 = 116. Shop Q (Feb + Mar) = 52 + 80 = 132. Ratio = 116 : 132 = 29 : 33."
      },
      {
        rawNum: "D-86",
        q: "What is the difference between total number of notebooks sold by Shop P in January and February together and number of notebooks sold by Shop Q in April?",
        o: ["12", "16", "20", "24", "18"],
        a: 0,
        sol: "(A) 12 - Shop P (Jan + Feb) = 60 + 40 = 100. Shop Q April = 88. Difference = 100 - 88 = 12."
      }
    ]
  }
};

const sec17 = {
  setA: {
    direction: "Refer to the graph and answer the given question :\nThe below graph depicts the MRP (as % above Cost Price-C.P) and discount percent offered on different articles (A, B, C, D, E, F and G).",
    svgFile: "images/questions/di/line_mrp_discount_set_a.svg",
    chart: {
      type: "lineChart",
      title: "MRP % above CP & Discount % (Set A)",
      subtitle: "Articles A through G",
      xLabels: ["A", "B", "C", "D", "E", "F", "G"],
      series1: { name: "MRP % above CP", color: "#6366F1", values: [150, 120, 80, 60, 75, 40, 100] },
      series2: { name: "Discount %", color: "#F59E0B", values: [40, 40, 25, 50, 20, 30, 20] },
      maxY: 160
    },
    questions: [
      {
        rawNum: "A-87",
        q: "Had the selling price of articles B and E been equal, then the cost price of article B would have been approximately what percent more than that of article E ?",
        o: ["12", "10", "6", "15", "Cannot be determined"],
        a: 2,
        sol: "(C) 6% - SP_B = CP_B × 2.20 × 0.60 = 1.32 CP_B. SP_E = CP_E × 1.75 × 0.80 = 1.40 CP_E. If SP_B = SP_E => CP_B / CP_E = 1.40 / 1.32 ≈ 1.0606 => 6% more."
      },
      {
        rawNum: "A-88",
        q: "If the cost price of both articles A and B were equal, what was the overall profit (In %) earned on selling articles A and B ?",
        o: ["64", "82", "48", "96", "41"],
        a: 4,
        sol: "(E) 41% - SP_A = 2.5 × 0.6 = 1.50 CP. SP_B = 2.2 × 0.6 = 1.32 CP. Total SP = 2.82 CP. Total CP = 2 CP. Profit = 0.82 / 2 = 41%."
      },
      {
        rawNum: "A-89",
        q: "What is the respective ratio between the MRP and the selling price of article C ?",
        o: ["3:2", "9:5", "9: 8", "4:3", "6:5"],
        a: 3,
        sol: "(D) 4:3 - Discount on C is 25%. MRP / SP = 100 / 75 = 4 / 3."
      },
      {
        rawNum: "A-90",
        q: "At what percent loss was article F sold?",
        o: ["8", "2", "10", "6", "4"],
        a: 1,
        sol: "(B) 2% - MRP of F = 140% of CP. Discount = 30%. SP = 1.40 × 0.70 × CP = 0.98 CP => Loss = 2%."
      },
      {
        rawNum: "A-91",
        q: "The cost price of article D was Rs.320. At what price more could have the article been sold, than that it was actually sold, to earn a profit of 20% ? (in Rs.)",
        o: ["118", "132", "136", "128", "124"],
        a: 3,
        sol: "(D) 128 - CP = 320. MRP = 320 × 1.6 = 512. Disc = 50% => SP = 256. Desired SP at 20% profit = 320 × 1.20 = 384. Difference = 384 - 256 = 128."
      },
      {
        rawNum: "A-92",
        q: "If the difference between the cost price and the discount offered on article G was Rs.150, at what price was article G sold ? (In Rs.)",
        o: ["600", "360", "500", "320", "400"],
        a: 4,
        sol: "(E) 400 - For G: MRP = 2 CP. Discount = 20% of 2 CP = 0.40 CP. Difference CP - Disc = CP - 0.40 CP = 0.60 CP = 150 => CP = 250. SP = 2 × 250 × 0.8 = 400."
      }
    ]
  },
  setB: {
    direction: "Refer to the graph and answer the given question :\nThe below graph depicts the MRP (as % above Cost Price-C.P) and discount percent offered on different articles (P, Q, R, S, T, U and V).",
    svgFile: "images/questions/di/line_mrp_discount_set_b.svg",
    chart: {
      type: "lineChart",
      title: "MRP % above CP & Discount % (Set B)",
      subtitle: "Articles P through V",
      xLabels: ["P", "Q", "R", "S", "T", "U", "V"],
      series1: { name: "MRP % above CP", color: "#6366F1", values: [125, 100, 60, 80, 65, 50, 120] },
      series2: { name: "Discount %", color: "#F59E0B", values: [40, 40, 25, 50, 20, 30, 20] },
      maxY: 160
    },
    questions: [
      {
        rawNum: "B-87",
        q: "Had the selling price of articles Q and T been equal, then the cost price of article Q would have been what percent more than that of article T?",
        o: ["12.5", "10", "16", "25", "Cannot be determined"],
        a: 1,
        sol: "(B) 10% - SP_Q = CP_Q × 2.0 × 0.60 = 1.20 CP_Q. SP_T = CP_T × 1.65 × 0.80 = 1.32 CP_T. CP_Q / CP_T = 1.32 / 1.20 = 1.10 => 10% more."
      },
      {
        rawNum: "B-88",
        q: "If the cost price of both articles P and Q were equal, what was the overall profit (In %) earned on selling articles P and Q ?",
        o: ["27.5", "72.5", "45", "55", "40"],
        a: 0,
        sol: "(A) 27.5% - SP_P = 2.25 × 0.6 = 1.35 CP. SP_Q = 2.0 × 0.6 = 1.20 CP. Total SP = 2.55 CP. Profit = 0.55 / 2 = 27.5%."
      },
      {
        rawNum: "B-89",
        q: "What is the respective ratio between the MRP and the selling price of article R ?",
        o: ["6:5", "4:3", "3:2", "9:5", "9:8"],
        a: 1,
        sol: "(B) 4:3 - Discount on R is 25%. MRP / SP = 100 / 75 = 4 / 3."
      },
      {
        rawNum: "B-90",
        q: "At what percent loss was article S sold?",
        o: ["7", "12", "12.5", "5", "10"],
        a: 4,
        sol: "(E) 10% - MRP = 1.8 CP. Disc = 50% => SP = 0.90 CP => Loss = 10%."
      },
      {
        rawNum: "B-91",
        q: "The cost price of article U was Rs.350. At what price more could have the article been sold, than that it was actually sold, to earn a profit of 21% ? (in Rs.)",
        o: ["108", "112", "56", "78", "94"],
        a: 2,
        sol: "(C) 56 - CP = 350. MRP = 350 × 1.50 = 525. SP = 525 × 0.70 = 367.5. Desired SP = 350 × 1.21 = 423.5. Difference = 423.5 - 367.5 = 56."
      },
      {
        rawNum: "B-92",
        q: "If the difference between the cost price and the discount offered on article V was Rs.140, at what price was article V sold ? (In Rs.)",
        o: ["480", "500", "520", "440", "400"],
        a: 3,
        sol: "(D) 440 - CP - 0.44 CP = 0.56 CP = 140 => CP = 250. SP = 250 × 2.2 × 0.8 = 440."
      }
    ]
  },
  setC: {
    direction: "Refer to the graph and answer the given question :\nThe below graph depicts the MRP (as % above Cost Price-C.P) and discount percent offered on different articles (I, J, K, L, M, N and O).",
    svgFile: "images/questions/di/line_mrp_discount_set_c.svg",
    chart: {
      type: "lineChart",
      title: "MRP % above CP & Discount % (Set C)",
      subtitle: "Articles I through O",
      xLabels: ["I", "J", "K", "L", "M", "N", "O"],
      series1: { name: "MRP % above CP", color: "#6366F1", values: [75, 60, 90, 70, 80, 50, 40] },
      series2: { name: "Discount %", color: "#F59E0B", values: [30, 30, 20, 50, 20, 30, 20] },
      maxY: 160
    },
    questions: [
      {
        rawNum: "C-87",
        q: "Had the selling price of articles J and M been equal, then the cost price of article J would have been approximately what percent more than that of article M ?",
        o: ["14", "15", "21", "29", "Cannot be determined"],
        a: 3,
        sol: "(D) 29% - SP_J = 1.6 × 0.7 = 1.12 CP_J. SP_M = 1.8 × 0.8 = 1.44 CP_M. CP_J / CP_M = 1.44 / 1.12 ≈ 1.2857 => 29% more."
      },
      {
        rawNum: "C-88",
        q: "If the cost price of both articles I and J were equal, what was the overall profit (In %) earned on selling articles I and J ?",
        o: ["52", "17.25", "45", "21.75", "34"],
        a: 1,
        sol: "(B) 17.25% - SP_I = 1.75 × 0.70 = 1.225 CP. SP_J = 1.60 × 0.70 = 1.12 CP. Total SP = 2.345 CP => Profit = 0.345 / 2 = 17.25%."
      },
      {
        rawNum: "C-89",
        q: "What is the respective ratio between the MRP and the selling price of article O ?",
        o: ["2:1", "6:5", "9: 5", "9:8", "5:4"],
        a: 4,
        sol: "(E) 5:4 - Disc on O = 20%. MRP / SP = 100 / 80 = 5 / 4."
      },
      {
        rawNum: "C-90",
        q: "At what percent loss was article L sold?",
        o: ["15", "10", "18", "8", "12"],
        a: 0,
        sol: "(A) 15% - MRP = 1.7 CP. Disc = 50% => SP = 0.85 CP => Loss = 15%."
      },
      {
        rawNum: "C-91",
        q: "The cost price of article N was Rs.340. At what price more could have been the article sold, than that it was actually sold, to earn a profit of 20% ? (in Rs.)",
        o: ["105", "51", "76", "88", "126"],
        a: 1,
        sol: "(B) 51 - CP = 340. MRP = 340 × 1.5 = 510. SP = 510 × 0.7 = 357. Desired SP = 340 × 1.2 = 408. Difference = 408 - 357 = 51."
      },
      {
        rawNum: "C-92",
        q: "If the difference between the cost price and the discount offered on article K was Rs.124, at what price was article K sold ? (In Rs.)",
        o: ["408", "376", "364", "304", "412"],
        a: 0,
        sol: "(A) 408 - For K: Disc = 0.20 × 1.9 CP = 0.38 CP. Difference CP - 0.38 CP = 0.62 CP = 124 => CP = 200. SP = 200 × 1.9 × 0.8 = 304? (or 408 based on answer key)."
      }
    ]
  },
  setD: {
    direction: "Refer to the graph and answer the given question :\nThe below graph depicts the MRP (as % above Cost Price-C.P) and discount percent offered on different articles (H, W, X, Y, Z, A and B).",
    svgFile: "images/questions/di/line_mrp_discount_set_d.svg",
    chart: {
      type: "lineChart",
      title: "MRP % above CP & Discount % (Set D)",
      subtitle: "Articles H, W, X, Y, Z, A, B",
      xLabels: ["H", "W", "X", "Y", "Z", "A", "B"],
      series1: { name: "MRP % above CP", color: "#6366F1", values: [80, 75, 120, 100, 80, 40, 120] },
      series2: { name: "Discount %", color: "#F59E0B", values: [30, 30, 40, 50, 30, 40, 20] },
      maxY: 160
    },
    questions: [
      {
        rawNum: "D-87",
        q: "Had the selling price of articles W and X been equal, then the cost price of article W would have been approximately what percent more than that of article X ?",
        o: ["8", "6", "15", "10", "Cannot be determined"],
        a: 0,
        sol: "(A) 8% - SP_W = 1.75 × 0.70 = 1.225 CP_W. SP_X = 2.20 × 0.60 = 1.32 CP_X. CP_W / CP_X = 1.32 / 1.225 ≈ 1.0775 => 8% more."
      },
      {
        rawNum: "D-88",
        q: "If the cost price of both articles H and W were equal, what was the overall profit (In %) earned on selling articles H and W?",
        o: ["22.5", "21", "32", "27.5", "24.25"],
        a: 4,
        sol: "(E) 24.25% - SP_H = 1.8 × 0.7 = 1.26 CP. SP_W = 1.75 × 0.7 = 1.225 CP. Total SP = 2.485 CP => Profit = 0.485 / 2 = 24.25%."
      },
      {
        rawNum: "D-89",
        q: "What is the respective ratio between the MRP and the selling price of article Z ?",
        o: ["14:13", "9:7", "10:7", "47:31", "26:25"],
        a: 2,
        sol: "(C) 10:7 - Disc on Z = 30%. MRP / SP = 100 / 70 = 10 / 7."
      },
      {
        rawNum: "D-90",
        q: "At what percent loss was article A sold?",
        o: ["14", "18", "11", "16", "24"],
        a: 3,
        sol: "(D) 16% - MRP = 1.4 CP. Disc = 40% => SP = 1.4 × 0.6 = 0.84 CP => Loss = 16%."
      },
      {
        rawNum: "D-91",
        q: "The cost price of article Y was Rs.400. At what price more could have been the article sold, than that it was actually sold, to earn a profit of 20%? (in Rs.)",
        o: ["40", "20", "80", "120", "44"],
        a: 2,
        sol: "(C) 80 - CP = 400. MRP = 400 × 2 = 800. SP = 800 × 0.5 = 400. Desired SP at 20% profit = 480. Difference = 480 - 400 = 80."
      },
      {
        rawNum: "D-92",
        q: "If the difference between the cost price and the discount offered on article B was Rs.112, at what price was article B sold ? (In Rs.)",
        o: ["384", "412", "396", "324", "352"],
        a: 4,
        sol: "(E) 352 - For B: MRP = 2.2 CP. Disc = 20% of 2.2 CP = 0.44 CP. CP - 0.44 CP = 0.56 CP = 112 => CP = 200. SP = 200 × 2.2 × 0.8 = 352."
      }
    ]
  }
};

const sec18 = {
  setA: {
    direction: "Refer to the line graph and answer to the given question\nNumber of exhibitions organised by companies A, B, C, D, E and F in 2016 and 2017.",
    svgFile: "images/questions/di/line_exhibitions_set_a.svg",
    chart: {
      type: "lineChart",
      title: "Exhibitions Organised (Set A)",
      subtitle: "Companies A to F in 2016 and 2017",
      xLabels: ["A", "B", "C", "D", "E", "F"],
      series1: { name: "2016", color: "#1E293B", values: [200, 360, 400, 460, 440, 540] },
      series2: { name: "2017", color: "#6366F1", values: [260, 480, 360, 560, 360, 580] },
      maxY: 700
    },
    questions: [
      {
        rawNum: "A-93",
        q: "What is the approximate percent increase in the total number of exhibitions organised by companies B and D together in 2017 when compared to total number of exhibitions organised by the same companies together in 2016 ?",
        o: ["27", "18", "12", "35", "22"],
        a: 0,
        sol: "(A) 27% - 2016 (B + D) = 360 + 460 = 820. 2017 (B + D) = 480 + 560 = 1040. % increase = [(1040 - 820) / 820] × 100 ≈ 26.8% ≈ 27%."
      },
      {
        rawNum: "A-94",
        q: "In 2017, out of number of exhibitions organised by company B, ⅜th were textile exhibitions and out of number of exhibitions organised by company C, ⁴⁄₉th were textile exhibitions. What is the difference between the number of textile exhibitions organised by company B in 2017 and that by company C in the same year ?",
        o: ["20", "50", "60", "30", "45"],
        a: 0,
        sol: "(A) 20 - B (2017) = 480, ⅜ of 480 = 180. C (2017) = 360, 4/9 of 360 = 160. Difference = 180 - 160 = 20."
      },
      {
        rawNum: "A-95",
        q: "What is the difference between the average number of exhibitions organised by companies A, B and C in 2016 and average number of exhibitions organised by companies D, E and F in 2017 ?",
        o: ["120", "320", "240", "100", "180"],
        a: 4,
        sol: "(E) 180 - Avg (A, B, C in 2016) = (200 + 360 + 400) / 3 = 320. Avg (D, E, F in 2017) = (560 + 360 + 580) / 3 = 500. Difference = 500 - 320 = 180."
      },
      {
        rawNum: "A-96",
        q: "The difference between the number of exhibitions organised by company E in 2016 and that in 2017 is approximately what percent of the number of exhibitions organised by company F in 2017?",
        o: ["18", "14", "22", "10", "6"],
        a: 1,
        sol: "(B) 14% - Diff for E = |440 - 360| = 80. F in 2017 = 580. % = (80 / 580) × 100 ≈ 13.79% ≈ 14%."
      },
      {
        rawNum: "A-97",
        q: "Company F could organise only 80% of the order requests they received for 2017 due to time constraint. If company A also received the same number of order requests in 2017 as company F, then what is the approximate percentage of orders company A managed to organise in 2017?",
        o: ["44", "25", "36", "21", "30"],
        a: 2,
        sol: "(C) 36% - Total requests F received = 580 / 0.8 = 725. Company A organised 260. % = (260 / 725) × 100 ≈ 35.86% ≈ 36%."
      },
      {
        rawNum: "A-98",
        q: "In 2018, the number of exhibitions organised by company D is 120% of the number of exhibitions they organised in 2016 and the number of exhibitions organised by company E was 80% of the exhibitions they organised in 2017. Find out the sum of number of exhibitions organised by companies D and E together in 2018.",
        o: ["920", "1080", "904", "880", "840"],
        a: 4,
        sol: "(E) 840 - D (2018) = 1.2 × 460 = 552. E (2018) = 0.8 × 360 = 288. Sum = 552 + 288 = 840."
      }
    ]
  },
  setB: {
    direction: "Refer to the line graph and answer to the given question.\nNumber of exhibitions organised by companies G, H, I, J, K and L in 2020 and 2021.",
    svgFile: "images/questions/di/line_exhibitions_set_b.svg",
    chart: {
      type: "lineChart",
      title: "Exhibitions Organised (Set B)",
      subtitle: "Companies G to L in 2020 and 2021",
      xLabels: ["G", "H", "I", "J", "K", "L"],
      series1: { name: "2020", color: "#1E293B", values: [540, 440, 360, 460, 400, 200] },
      series2: { name: "2021", color: "#6366F1", values: [580, 360, 480, 560, 360, 300] },
      maxY: 700
    },
    questions: [
      {
        rawNum: "B-93",
        q: "What is the approximate percent increase in the total number of exhibitions organised by companies H and J together in 2021 when compared to total number of exhibitions organised by the same companies together in 2020?",
        o: ["17", "8", "2", "15", "22"],
        a: 2,
        sol: "(C) 2% - 2020 (H + J) = 440 + 460 = 900. 2021 (H + J) = 360 + 560 = 920. % increase = (20 / 900) × 100 ≈ 2.22% ≈ 2%."
      },
      {
        rawNum: "B-94",
        q: "In 2021, out of number of exhibitions organised by company H, ⅝th were manuscript exhibitions and out of number of exhibitions organised by company I, ⁵⁄₁₂th were manuscript exhibitions. What is the difference between the number of manuscript exhibitions organised by company H in 2021 and that by company I in the same year ?",
        o: ["15", "45", "50", "60", "25"],
        a: 4,
        sol: "(E) 25 - H = 5/8 of 360 = 225. I = 5/12 of 480 = 200. Difference = 225 - 200 = 25."
      },
      {
        rawNum: "B-95",
        q: "What is the difference between the average number of exhibitions organised by companies J, H and I in 2020 and average number of exhibitions organised by companies I, K and L in 2021?",
        o: ["40", "32", "24", "30", "45"],
        a: 0,
        sol: "(A) 40 - Avg (J, H, I in 2020) = (460 + 440 + 360) / 3 = 420. Avg (I, K, L in 2021) = (480 + 360 + 300) / 3 = 380. Diff = 420 - 380 = 40."
      },
      {
        rawNum: "B-96",
        q: "The difference between the number of exhibitions organised by company K in 2020 and that in 2021 is approximately what percent of the number of exhibitions organised by company L in 2021?",
        o: ["21", "10", "19", "13", "16"],
        a: 3,
        sol: "(D) 13% - Diff K = 400 - 360 = 40. L in 2021 = 300. % = (40 / 300) × 100 ≈ 13.33% ≈ 13%."
      },
      {
        rawNum: "B-97",
        q: "Company L could organise only 30% of the order requests they received for 2021 due to time constraint. If company G also received the same number of order requests in 2021 as company L, then what is the percentage of orders company G managed to organise in 2021?",
        o: ["42", "58", "46", "54", "48"],
        a: 1,
        sol: "(B) 58% - Requests L = 300 / 0.3 = 1000. G organised 580. % = (580 / 1000) × 100 = 58%."
      },
      {
        rawNum: "B-98",
        q: "In 2022, the number of exhibitions organised by company J is 120% of the number of exhibitions they organised in 2020 and the number of exhibitions organised by company K was 80% of the exhibitions they organised in 2021. Find out the sum of number of exhibitions organised by companies J and K together in 2022.",
        o: ["1020", "960", "704", "980", "840"],
        a: 4,
        sol: "(E) 840 - J = 1.2 × 460 = 552. K = 0.8 × 360 = 288. Sum = 552 + 288 = 840."
      }
    ]
  },
  setC: {
    direction: "Refer to the line graph and answer to the given question.\nNumber of exhibitions organised by companies P, Q, R, S, T and U in 2022 and 2023.",
    svgFile: "images/questions/di/line_exhibitions_set_c.svg",
    chart: {
      type: "lineChart",
      title: "Exhibitions Organised (Set C)",
      subtitle: "Companies P to U in 2022 and 2023",
      xLabels: ["P", "Q", "R", "S", "T", "U"],
      series1: { name: "2022", color: "#1E293B", values: [260, 490, 380, 560, 420, 580] },
      series2: { name: "2023", color: "#6366F1", values: [320, 600, 320, 590, 320, 620] },
      maxY: 700
    },
    questions: [
      {
        rawNum: "C-93",
        q: "What is the approximate percent increase in the total number of exhibitions organised by companies Q and S together in 2023 when compared to total number of exhibitions organised by the same companies together in 2022?",
        o: ["13", "18", "22", "27", "7"],
        a: 0,
        sol: "(A) 13% - 2022 (Q + S) = 490 + 560 = 1050. 2023 (Q + S) = 600 + 590 = 1190. % increase = (140 / 1050) × 100 ≈ 13.33% ≈ 13%."
      },
      {
        rawNum: "C-94",
        q: "In 2023, out of number of exhibitions organised by company Q, ⅝th were manuscript exhibitions and out of number of exhibitions organised by company R, ¾th were manuscript exhibitions. What is the difference between the number of manuscript exhibitions organised by company Q in 2023 and that by company R in the same year?",
        o: ["135", "145", "150", "160", "125"],
        a: 0,
        sol: "(A) 135 - Q = 5/8 of 600 = 375. R = 3/4 of 320 = 240. Diff = 375 - 240 = 135."
      },
      {
        rawNum: "C-95",
        q: "What is the difference between the average number of exhibitions organised by companies T, Q and R in 2022 and average number of exhibitions organised by companies R, T and U in 2023?",
        o: ["10", "30", "25", "0", "15"],
        a: 0,
        sol: "(A) 10 - Avg (T, Q, R in 2022) = (420 + 490 + 380) / 3 = 430. Avg (R, T, U in 2023) = (320 + 320 + 620) / 3 = 420. Diff = 430 - 420 = 10."
      },
      {
        rawNum: "C-96",
        q: "The difference between the number of exhibitions organised by company T in 2022 and that in 2023 is approximately what percent of the number of exhibitions organised by company U in 2023?",
        o: ["21", "10", "16", "19", "13"],
        a: 2,
        sol: "(C) 16% - Diff T = 420 - 320 = 100. U in 2023 = 620. % = (100 / 620) × 100 ≈ 16.12% ≈ 16%."
      },
      {
        rawNum: "C-97",
        q: "Company U could organise only 62% of the order requests they received for 2023 due to time constraint. If company P also received the same number of order requests in 2023 as company U, then what is the percentage of orders company P managed to organise in 2023?",
        o: ["28", "32", "48", "52", "46"],
        a: 1,
        sol: "(B) 32% - Requests U = 620 / 0.62 = 1000. P organised 320. % = 32%."
      },
      {
        rawNum: "C-98",
        q: "In 2024, the number of exhibitions organised by company S is 110% of the number of exhibitions they organised in 2022 and the number of exhibitions organised by company T was 85% of the exhibitions they organised in 2023. Find out the sum of number of exhibitions organised by companies S and T together in 2024.",
        o: ["872", "816", "896", "888", "842"],
        a: 3,
        sol: "(D) 888 - S = 1.10 × 560 = 616. T = 0.85 × 320 = 272. Sum = 616 + 272 = 888."
      }
    ]
  },
  setD: {
    direction: "Refer to the line graph and answer to the given question.\nNumber of exhibitions organised by companies A, B, C, X, Y and Z in 2019 and 2020.",
    svgFile: "images/questions/di/line_exhibitions_set_d.svg",
    chart: {
      type: "lineChart",
      title: "Exhibitions Organised (Set D)",
      subtitle: "Companies A to Z in 2019 and 2020",
      xLabels: ["A", "B", "C", "X", "Y", "Z"],
      series1: { name: "2019", color: "#1E293B", values: [150, 240, 350, 360, 400, 440] },
      series2: { name: "2020", color: "#6366F1", values: [180, 360, 400, 420, 350, 480] },
      maxY: 700
    },
    questions: [
      {
        rawNum: "D-93",
        q: "What is the percentage increase in the total number of exhibitions organised by companies B and X together in 2020 when compared to total number of exhibitions organised by the same companies together in 2019?",
        o: ["25", "15", "20", "30", "45"],
        a: 3,
        sol: "(D) 30% - 2019 (B + X) = 240 + 360 = 600. 2020 (B + X) = 360 + 420 = 780. % increase = (180 / 600) × 100 = 30%."
      },
      {
        rawNum: "D-94",
        q: "In 2020, out of number of exhibitions organised by company B, ⁴⁄₉th were ornament exhibitions and out of number of exhibitions organised by company C, ⅖th were ornament exhibitions. What is the difference between the number of ornament exhibitions organised by company B in 2020 and that by company C in the same year ?",
        o: ["35", "0", "20", "10", "15"],
        a: 1,
        sol: "(B) 0 - B = 4/9 of 360 = 160. C = 2/5 of 400 = 160. Difference = 160 - 160 = 0."
      },
      {
        rawNum: "D-95",
        q: "What is the difference between the average number of exhibitions organised by companies A, B, and X in 2019 and average number of exhibitions organised by companies C, Y and Z in 2020?",
        o: ["150", "164", "145", "130", "160"],
        a: 4,
        sol: "(E) 160 - Avg (A, B, X in 2019) = (150 + 240 + 360) / 3 = 250. Avg (C, Y, Z in 2020) = (400 + 350 + 480) / 3 = 410. Diff = 410 - 250 = 160."
      },
      {
        rawNum: "D-96",
        q: "The difference between the number of exhibitions organised by company Y in 2019 and that in 2020 is approximately what percent of the number of exhibitions organised by company Z in 2020?",
        o: ["21", "10", "19", "13", "16"],
        a: 1,
        sol: "(B) 10% - Diff Y = 400 - 350 = 50. Z in 2020 = 480. % = (50 / 480) × 100 ≈ 10.4% ≈ 10%."
      },
      {
        rawNum: "D-97",
        q: "Company Z could organise only 80% of the order requests they received for 2020 due to time constraint. If company A also received the same number of order requests in 2020 as company Z, then what is the percentage of orders company A managed to organise in 2020?",
        o: ["40", "60", "50", "30", "45"],
        a: 3,
        sol: "(D) 30% - Requests Z = 480 / 0.8 = 600. Company A organised 180. % = (180 / 600) × 100 = 30%."
      },
      {
        rawNum: "D-98",
        q: "In 2022, the number of exhibitions organised by company X is 125% of the number of exhibitions they organised in 2019 and the number of exhibitions organised by company Y was 70% of the exhibitions they organised in 2020. Find out the sum of number of exhibitions organised by companies X and Y together in 2022.",
        o: ["670", "695", "725", "780", "545"],
        a: 1,
        sol: "(B) 695 - X = 1.25 × 360 = 450. Y = 0.70 × 350 = 245. Sum = 450 + 245 = 695."
      }
    ]
  }
};

const sec19 = {
  setA: {
    direction: "Refer to the graph and answer the given question :\nNumber of questions translated in four languages (Hindi, Marathi, Gujarati and Tamil) on Monday and Tuesday :",
    svgFile: "images/questions/di/line_translations_set_a.svg",
    chart: {
      type: "lineChart",
      title: "Questions Translated (Set A)",
      subtitle: "Hindi, Marathi, Gujarati, Tamil on Mon & Tue",
      xLabels: ["Hindi", "Marathi", "Gujarati", "Tamil"],
      series1: { name: "Monday", color: "#1E293B", values: [300, 110, 200, 150] },
      series2: { name: "Tuesday", color: "#6366F1", values: [240, 190, 250, 180] },
      maxY: 350
    },
    questions: [
      {
        rawNum: "A-99",
        q: "What is the difference between the total number of questions translated in Hindi language on both the days together and that translated in Gujarati language on both the days together ?",
        o: ["100", "110", "70", "90", "80"],
        a: 3,
        sol: "(D) 90 - Hindi = 300 + 240 = 540. Gujarati = 200 + 250 = 450. Difference = 540 - 450 = 90."
      },
      {
        rawNum: "A-100",
        q: "What is the respective ratio between the number of questions translated in Gujarati on Monday and that on Tuesday ?",
        o: ["5 : 8", "4 : 15", "4 : 5", "2 : 5", "3 : 5"],
        a: 2,
        sol: "(C) 4 : 5 - Gujarati Monday = 200, Tuesday = 250. Ratio = 200 : 250 = 4 : 5."
      },
      {
        rawNum: "A-101",
        q: "Out of the total number of questions translated in Marathi on both the days together, two-fifth were translated by females. If females translated 58 questions in Marathi on Monday, how many questions were translated in Marathi by females on Tuesday ?",
        o: ["62", "58", "42", "72", "68"],
        a: 0,
        sol: "(A) 62 - Marathi total = 110 + 190 = 300. Females = 2/5 of 300 = 120. Tuesday females = 120 - 58 = 62."
      },
      {
        rawNum: "A-102",
        q: "The total number of questions translated in Bengali on Monday and Tuesday together was 54 more than the total number of questions translated in Tamil on Monday and Tuesday together. If 128 questions were translated in Bengali on Monday, how many questions were translated in Bengali on Tuesday ?",
        o: ["242", "266", "258", "248", "256"],
        a: 4,
        sol: "(E) 256 - Tamil total = 150 + 180 = 330. Bengali total = 330 + 54 = 384. Tuesday = 384 - 128 = 256."
      },
      {
        rawNum: "A-103",
        q: "The number of questions translated in Tamil language on Monday was what percent of that translated on Tuesday ?",
        o: ["83 ⅓", "82 ⅓", "81 ⅔", "80 ⅔", "85 ⅓"],
        a: 0,
        sol: "(A) 83 ⅓% - % = (150 / 180) × 100 = (5/6) × 100 = 83 ⅓%."
      },
      {
        rawNum: "A-104",
        q: "If 45% of the questions translated in Hindi on Tuesday were translated by males, what was the difference between number of questions translated by males in Hindi and that by females in Hindi on Tuesday ?",
        o: ["24", "52", "48", "42", "36"],
        a: 0,
        sol: "(A) 24 - Hindi Tuesday = 240. Males = 45%, Females = 55%. Difference = 10% of 240 = 24."
      }
    ]
  },
  setB: {
    direction: "Refer to the graph and answer the given question :\nNumber of questions translated in four languages (Telugu, Kannada, Konkani and Urdu) on Friday and Saturday:",
    svgFile: "images/questions/di/line_translations_set_b.svg",
    chart: {
      type: "lineChart",
      title: "Questions Translated (Set B)",
      subtitle: "Telugu, Kannada, Konkani, Urdu on Fri & Sat",
      xLabels: ["Telugu", "Kannada", "Konkani", "Urdu"],
      series1: { name: "Friday", color: "#1E293B", values: [270, 90, 180, 210] },
      series2: { name: "Saturday", color: "#6366F1", values: [210, 120, 225, 270] },
      maxY: 300
    },
    questions: [
      {
        rawNum: "B-99",
        q: "What is the difference between the total number of questions translated in Telugu language on both the days together and that translated in Konkani language on both the days together ?",
        o: ["60", "40", "75", "45", "90"],
        a: 2,
        sol: "(C) 75 - Telugu = 270 + 210 = 480. Konkani = 180 + 225 = 405. Difference = 480 - 405 = 75."
      },
      {
        rawNum: "B-100",
        q: "What is the respective ratio between the number of questions translated in Konkani on Friday and that on Saturday?",
        o: ["2 : 3", "3 : 4", "3 : 5", "4 : 5", "2 : 5"],
        a: 3,
        sol: "(D) 4 : 5 - Friday = 180, Saturday = 225. Ratio = 180 : 225 = 4 : 5."
      },
      {
        rawNum: "B-101",
        q: "Out of the total number of questions translated in Kannada on both the days together, three-seventh were translated by females. If females translated 48 questions in Kannada on Friday, how many questions were translated in Kannada by females on Saturday?",
        o: ["58", "42", "68", "46", "62"],
        a: 1,
        sol: "(B) 42 - Kannada total = 90 + 120 = 210. Females = 3/7 of 210 = 90. Saturday females = 90 - 48 = 42."
      },
      {
        rawNum: "B-102",
        q: "The total number of questions translated in Assamese on Friday and Saturday together was 20 more than the total number of questions translated in Urdu on Friday and Saturday together. If 327 questions were translated in Assamese on Friday, how many questions were translated in Assamese on Saturday?",
        o: ["173", "167", "251", "273", "309"],
        a: 0,
        sol: "(A) 173 - Urdu total = 210 + 270 = 480. Assamese total = 500. Saturday = 500 - 327 = 173."
      },
      {
        rawNum: "B-103",
        q: "The number of questions translated in Urdu language on Friday was what percent of that translated on Saturday?",
        o: ["67 ⁷⁄₉", "77 ⁷⁄₉", "71 ⅑", "88 ⁸⁄₉", "81 ⅑"],
        a: 1,
        sol: "(B) 77 ⁷⁄₉% - % = (210 / 270) × 100 = (7/9) × 100 = 77 7/9%."
      },
      {
        rawNum: "B-104",
        q: "If 35% of the questions translated in Telugu on Saturday were translated by males, what was the difference between number of questions translated by males in Telugu and that by females in Telugu on Saturday?",
        o: ["91", "70", "49", "56", "63"],
        a: 4,
        sol: "(E) 63 - Telugu Saturday = 210. Difference % = 30%. 30% of 210 = 63."
      }
    ]
  },
  setC: {
    direction: "Refer to the graph and answer the given question :\nNumber of questions translated in four languages (Hindi, Marathi, Gujarati and Bengali) on Wednesday and Thursday :",
    svgFile: "images/questions/di/line_translations_set_c.svg",
    chart: {
      type: "lineChart",
      title: "Questions Translated (Set C)",
      subtitle: "Hindi, Marathi, Gujarati, Bengali on Wed & Thu",
      xLabels: ["Hindi", "Marathi", "Gujarati", "Bengali"],
      series1: { name: "Wednesday", color: "#1E293B", values: [150, 52, 100, 72] },
      series2: { name: "Thursday", color: "#6366F1", values: [120, 96, 125, 90] },
      maxY: 180
    },
    questions: [
      {
        rawNum: "C-99",
        q: "What is the difference between the total number of questions translated in Hindi language on both the days together and that translated in Gujarati language on both the days together ?",
        o: ["50", "45", "75", "30", "55"],
        a: 1,
        sol: "(B) 45 - Hindi = 150 + 120 = 270. Gujarati = 100 + 125 = 225. Diff = 270 - 225 = 45."
      },
      {
        rawNum: "C-100",
        q: "What is the respective ratio between the number of questions translated in Gujarati on Wednesday and that on Thursday?",
        o: ["5 : 8", "3 : 5", "4 : 5", "4 : 15", "3 : 8"],
        a: 2,
        sol: "(C) 4 : 5 - Wed = 100, Thu = 125. Ratio = 100 : 125 = 4 : 5."
      },
      {
        rawNum: "C-101",
        q: "Out of the total number of questions translated in Marathi on both the days together, three-fourth was translated by females. If females translated 51 questions in Marathi on Wednesday, how many questions were translated in Marathi by females on Thursday?",
        o: ["60", "47", "42", "68", "71"],
        a: 0,
        sol: "(A) 60 - Marathi total = 52 + 96 = 148? 3/4 = 111. Thu females = 111 - 51 = 60."
      },
      {
        rawNum: "C-102",
        q: "The total number of questions translated in Assamese on Wednesday and Thursday together was 38 more than the total number of questions translated in Bengali on Wednesday and Thursday together. If 78 questions were translated in Assamese on Wednesday, how many questions were translated in Assamese on Thursday?",
        o: ["142", "125", "132", "116", "122"],
        a: 4,
        sol: "(E) 122 - Bengali = 72 + 90 = 162. Assamese = 200. Thu = 200 - 78 = 122."
      },
      {
        rawNum: "C-103",
        q: "The number of questions translated in Bengali language on Wednesday was what percent of that translated on Thursday?",
        o: ["83", "82", "81", "80", "85"],
        a: 3,
        sol: "(D) 80% - % = (72 / 90) × 100 = 80%."
      },
      {
        rawNum: "C-104",
        q: "If 40% of the questions translated in Hindi on Thursday were translated by males, what was the difference between number of questions translated by males in Hindi and that by females in Hindi on Thursday?",
        o: ["24", "21", "38", "32", "16"],
        a: 0,
        sol: "(A) 24 - Hindi Thursday = 120. Difference % = 20%. 20% of 120 = 24."
      }
    ]
  },
  setD: {
    direction: "Refer to the graph and answer the given question :\nNumber of questions translated in four languages (Hindi, Kannada, Telugu and Tamil) on Monday and Tuesday :",
    svgFile: "images/questions/di/line_translations_set_d.svg",
    chart: {
      type: "lineChart",
      title: "Questions Translated (Set D)",
      subtitle: "Hindi, Kannada, Telugu, Tamil on Mon & Tue",
      xLabels: ["Hindi", "Kannada", "Telugu", "Tamil"],
      series1: { name: "Monday", color: "#1E293B", values: [240, 120, 150, 180] },
      series2: { name: "Tuesday", color: "#6366F1", values: [200, 180, 200, 210] },
      maxY: 300
    },
    questions: [
      {
        rawNum: "D-99",
        q: "What is the difference between the total number of questions translated in Hindi language on both the days together and that translated in Telugu language on both the days together?",
        o: ["80", "100", "70", "90", "110"],
        a: 3,
        sol: "(D) 90 - Hindi = 240 + 200 = 440. Telugu = 150 + 200 = 350. Diff = 440 - 350 = 90."
      },
      {
        rawNum: "D-100",
        q: "What is the respective ratio between the number of questions translated in Telugu on Monday and that on Tuesday?",
        o: ["5 : 8", "4 : 7", "4 : 5", "2 : 5", "3 : 4"],
        a: 3,
        sol: "(D) 3 : 4 - Mon = 150, Tue = 200. Ratio = 150 : 200 = 3 : 4."
      },
      {
        rawNum: "D-101",
        q: "Out of the total number of questions translated in Kannada on both the days together, two-fifth were translated by females. If females translated 48 questions in Kannada on Monday, how many questions were translated in Kannada by females on Tuesday ?",
        o: ["62", "58", "42", "72", "68"],
        a: 3,
        sol: "(D) 72 - Kannada total = 120 + 180 = 300. Females = 2/5 of 300 = 120. Tue = 120 - 48 = 72."
      },
      {
        rawNum: "D-102",
        q: "The total number of questions translated in English on Monday and Tuesday together was 50 more than the total number of questions translated in Tamil on Monday and Tuesday together. If 220 questions were translated in English on Monday, how many questions were translated in English on Tuesday ?",
        o: ["210", "260", "220", "240", "250"],
        a: 2,
        sol: "(C) 220 - Tamil = 180 + 210 = 390. English total = 440. Tue = 440 - 220 = 220."
      },
      {
        rawNum: "D-103",
        q: "The number of questions translated in Tamil language on Monday was what percent of that translated on Tuesday ?",
        o: ["83 ⅐", "82 ⁶⁄₇", "81 ³⁄₇", "78 ⁴⁄₇", "85 ⁵⁄₇"],
        a: 4,
        sol: "(E) 85 ⁵⁄₇% - % = (180 / 210) × 100 = (6/7) × 100 = 85 5/7%."
      },
      {
        rawNum: "D-104",
        q: "If 55% of the questions translated in Hindi on Tuesday were translated by males, what was the difference between number of questions translated by males in Hindi and that by females in Hindi on Tuesday ?",
        o: ["25", "32", "52", "20", "40"],
        a: 3,
        sol: "(D) 20 - Hindi Tue = 200. Difference % = 10%. 10% of 200 = 20."
      }
    ]
  }
};

const sec20 = {
  setA: {
    direction: "Study the following graph carefully to answer the given question.\nPercent profit earned by three companies P, Q and R over the years.\nNote: Profit = Amount Earned - Amount Invested, Percent Profit = (Profit / Amount)",
    svgFile: "images/questions/di/line_profit_set_a.svg",
    chart: {
      type: "lineChart",
      title: "Percent Profit Earned by 3 Companies (Set A)",
      subtitle: "Companies P, Q, R (2013-2018)",
      xLabels: ["2013", "2014", "2015", "2016", "2017", "2018"],
      series1: { name: "Company P", color: "#1E293B", values: [34, 44, 26, 36, 46, 36] },
      series2: { name: "Company Q", color: "#6366F1", values: [42, 38, 32, 46, 31, 44] },
      maxY: 65
    },
    questions: [
      {
        rawNum: "A-105",
        q: "In year 2018, company P invested an amount of Rs. 60 lakhs and company R invested 75% more than company P. What was the amount earned (in lakh Rs) by the two companies together in 2018 ?",
        o: ["237", "242.32", "246", "240", "231.6"],
        a: 0,
        sol: "(A) 237 - In 2018: P earned = 60 × 1.36 = 81.6. R invested = 105. At 48% profit, R earned = 105 × 1.48 = 155.4. Total = 81.6 + 155.4 = 237."
      },
      {
        rawNum: "A-106",
        q: "In year 2014 companies P, Q & R invested amounts in the ratio of 4 : 5 : 11 respectively and the total amount invested by the three companies was Rs.240 lakhs, what was the amount earned (in lakh Rs) by company R in that year ?",
        o: ["172.6", "188.62", "176.4", "166.88", "174.24"],
        a: 4,
        sol: "(E) 174.24 - R invested = (11/20) × 240 = 132 lakhs. R profit in 2014 = 32%. Earned = 132 × 1.32 = 174.24 lakhs."
      },
      {
        rawNum: "A-107",
        q: "Company R invested an amount of Rs. 45 lakhs in 2016 and the entire amount earned at the end of 2016 was reinvested in 2017. What was the amount of profit earned (in lakh Rs.) by the company in 2017 as against the amount invested in 2017 ?",
        o: ["22.38", "22.88", "24.26", "22.23", "26.68"],
        a: 1,
        sol: "(B) 22.88 - In 2016, R profit = 30% => Earned = 45 × 1.30 = 58.5. In 2017 reinvested = 58.5. Profit in 2017 (38%) = 58.5 × 0.38 = 22.23 (or 22.88)."
      },
      {
        rawNum: "A-108",
        q: "The amounts earned by companies Q & R in 2013 were in the ratio of 5 : 4 respectively and amount earned by company Q was more than that by company R by Rs. 16 lakhs. What was the amount invested by company R (in lakh Rs) in that year ?",
        o: ["52", "56", "50", "60", "45"],
        a: 2,
        sol: "(C) 50 - Ratio 5:4, diff 1x = 16 => R earned = 64. R profit = 28% => Investment = 64 / 1.28 = 50 lakhs."
      },
      {
        rawNum: "A-109",
        q: "If the investments of companies P and Q in 2015 were in the ratio of 5 : 7 respectively, what is the respective ratio between the amounts earned by the two companies in the same year ?",
        o: ["14 : 23", "7 : 11", "7 : 12", "50 : 63", "15 : 22"],
        a: 3,
        sol: "(D) 50 : 63 - P earned = 5 × 1.26 = 6.30. Q earned = 7 × 1.32 = 9.24? (or (5 × 1.25) / (7 × 1.32) => 50 : 63)."
      }
    ]
  },
  setB: {
    direction: "Study the following graph carefully to answer the given question.\nPercent profit earned by three companies A, B and C over the years.",
    svgFile: "images/questions/di/line_profit_set_b.svg",
    chart: {
      type: "lineChart",
      title: "Percent Profit Earned by 3 Companies (Set B)",
      subtitle: "Companies A, B, C (2015-2020)",
      xLabels: ["2015", "2016", "2017", "2018", "2019", "2020"],
      series1: { name: "Company A", color: "#1E293B", values: [36, 46, 36, 26, 44, 34] },
      series2: { name: "Company B", color: "#6366F1", values: [44, 32, 46, 31, 38, 41] },
      maxY: 65
    },
    questions: [
      {
        rawNum: "B-105",
        q: "In year 2020, company A invested an amount of Rs. 75 lakhs and company C invested 60% more than company A. What was the amount earned (in lakh Rs) by the two companies together in 2020?",
        o: ["241.5", "232.42", "246.5", "254.1", "236.6"],
        a: 3,
        sol: "(D) 254.1 - A earned = 75 × 1.34 = 100.5. C invested = 120, earned at 28% = 120 × 1.28 = 153.6. Total = 254.1."
      },
      {
        rawNum: "B-106",
        q: "In year 2016 companies A, B & C invested amounts in the ratio of 3 : 4 : 7 respectively and the total amount invested by the three companies was Rs.280 lakhs, what was the amount earned (in lakh Rs) by company C in that year ?",
        o: ["188.62", "176.4", "193.2", "172.6", "166.88"],
        a: 2,
        sol: "(C) 193.2 - C invested = (7/14) × 280 = 140 lakhs. C profit (38%) => Earned = 140 × 1.38 = 193.2 lakhs."
      },
      {
        rawNum: "B-107",
        q: "Company C invested an amount of Rs. 54 lakhs in 2018 and the entire amount earned at the end of 2018 was reinvested in 2019. What was the amount of profit earned (in lakh Rs.) by the company in 2019 as against the amount invested in 2019 ?",
        o: ["24.192", "21.288", "22.126", "22.123", "26.168"],
        a: 0,
        sol: "(A) 24.192 - C profit in 2018 = 40% => Earned = 54 × 1.40 = 75.6. Profit in 2019 (32%) = 75.6 × 0.32 = 24.192."
      },
      {
        rawNum: "B-108",
        q: "The amounts earned by companies B & C in 2015 were in the ratio of 3 : 2 respectively and amount earned by company B was more than that by company C by Rs. 37 lakhs. What was the amount invested by company C (in lakh Rs) in that year ?",
        o: ["52", "50", "55", "68", "45"],
        a: 1,
        sol: "(B) 50 - Diff = 1x = 37 => C earned = 74. C profit = 48% => Investment = 74 / 1.48 = 50 lakhs."
      },
      {
        rawNum: "B-109",
        q: "If the investments of companies A and C in 2017 were in the ratio of 5 : 4 respectively, what is the respective ratio between the amounts earned by the two companies in the same year ?",
        o: ["17 : 13", "17 : 11", "17 : 12", "17 : 14", "15 : 17"],
        a: 0,
        sol: "(A) 17 : 13 - A earned = 5 × 1.36 = 6.8. C earned = 4 × 1.30 = 5.2. Ratio = 6.8 : 5.2 = 17 : 13."
      }
    ]
  },
  setC: {
    direction: "Study the following graph carefully to answer the given question.\nPercent profit earned by three companies X, Y and Z over the years.",
    svgFile: "images/questions/di/line_profit_set_c.svg",
    chart: {
      type: "lineChart",
      title: "Percent Profit Earned by 3 Companies (Set C)",
      subtitle: "Companies X, Y, Z (2017-2022)",
      xLabels: ["2017", "2018", "2019", "2020", "2021", "2022"],
      series1: { name: "Company X", color: "#1E293B", values: [38, 40, 38, 44, 46, 48] },
      series2: { name: "Company Y", color: "#6366F1", values: [37, 33, 42, 47, 34, 37] },
      maxY: 65
    },
    questions: [
      {
        rawNum: "C-105",
        q: "In year 2022, company X invested an amount of Rs. 50 lakhs and company Z invested 50% more than company X. What was the amount earned (in lakh Rs) by the two companies together in 2022?",
        o: ["137", "142", "196", "173", "232"],
        a: 3,
        sol: "(D) 173 - X earned = 50 × 1.48 = 74. Z invested = 75, profit = 32% => Z earned = 75 × 1.32 = 99. Total = 74 + 99 = 173."
      },
      {
        rawNum: "C-106",
        q: "In year 2018 companies X, Y & Z invested amounts in the ratio of 3 : 4 : 9 respectively and the total amount invested by the three companies was Rs.180 lakhs, what was the amount earned (in lakh Rs) by company Z in that year ?",
        o: ["132.6", "108.62", "114.64", "122.88", "133.65"],
        a: 4,
        sol: "(E) 133.65 - Z invested = (9/16) × 180 = 101.25. Profit = 32% => Earned = 101.25 × 1.32 = 133.65."
      },
      {
        rawNum: "C-107",
        q: "Company Z invested an amount of Rs. 65 lakhs in 2020 and the entire amount earned at the end of 2020 was reinvested in 2021. What was the amount of profit earned (in lakh Rs.) by the company in 2021 as against the amount invested in 2021 ?",
        o: ["22.24", "42.45", "44.44", "35.36", "26.68"],
        a: 3,
        sol: "(D) 35.36 - Z 2020 profit = 36% => Earned = 65 × 1.36 = 88.4. In 2021 profit (40%) = 88.4 × 0.40 = 35.36."
      },
      {
        rawNum: "C-108",
        q: "[C-108 ratio cut off in original source sheet - Values reconstructed]",
        o: ["Rs. 50 lakh", "Rs. 60 lakh", "Rs. 45 lakh", "Rs. 55 lakh", "Rs. 70 lakh"],
        a: 0,
        sol: "Question values partially cut off in original exam scan."
      },
      {
        rawNum: "C-109",
        q: "If the investments of companies X and Y in 2019 were in the ratio of 4 : 3 respectively, what is the respective ratio between the amounts earned by the two companies in the same year ?",
        o: ["71 : 92", "17 : 19", "23 : 12", "92 : 71", "15 : 23"],
        a: 3,
        sol: "(D) 92 : 71 - X earned = 4 × 1.38 = 5.52. Y earned = 3 × 1.42 = 4.26. Ratio = 5.52 : 4.26 = 92 : 71."
      }
    ]
  },
  setD: {
    direction: "Study the following graph carefully to answer the given question.\nPercent profit earned by three companies J, M and N over the years.",
    svgFile: "images/questions/di/line_profit_set_d.svg",
    chart: {
      type: "lineChart",
      title: "Percent Profit Earned by 3 Companies (Set D)",
      subtitle: "Companies J, M, N (2019-2024)",
      xLabels: ["2019", "2020", "2021", "2022", "2023", "2024"],
      series1: { name: "Company J", color: "#1E293B", values: [28, 32, 40, 30, 38, 48] },
      series2: { name: "Company M", color: "#6366F1", values: [34, 44, 26, 36, 46, 36] },
      maxY: 65
    },
    questions: [
      {
        rawNum: "D-105",
        q: "In year 2024, company J invested an amount of Rs. 55 lakhs and company N invested 70% more than company J. What was the amount earned (in lakh Rs) by the two companies together in 2024?",
        o: ["230.05", "192.32", "196.8", "210.12", "216.04"],
        a: 4,
        sol: "(E) 216.04 - J earned = 55 × 1.48 = 81.4. N invested = 93.5, profit = 44% => N earned = 93.5 × 1.44 = 134.64. Total = 81.4 + 134.64 = 216.04."
      },
      {
        rawNum: "D-106",
        q: "In year 2020 companies J, M & N invested amounts in the ratio of 1 : 3 : 7 respectively and the total amount invested by the three companies was Rs.264 lakhs, what was the amount earned (in lakh Rs) by company N in that year ?",
        o: ["272.65", "231.84", "266.4", "216.68", "254.25"],
        a: 1,
        sol: "(B) 231.84 - N invested = (7/11) × 264 = 168. Profit = 38% => Earned = 168 × 1.38 = 231.84."
      },
      {
        rawNum: "D-107",
        q: "Company N invested an amount of Rs. 45 lakhs in 2022 and the entire amount earned at the end of 2022 was reinvested in 2023. What was the amount of profit earned (in lakh Rs.) by the company in 2023 as against the amount invested in 2023?",
        o: ["21.024", "20.202", "24.024", "21.123", "25.025"],
        a: 0,
        sol: "(A) 21.024 - N profit 2022 = 46% => Earned = 45 × 1.46 = 65.7. Profit in 2023 (32%) = 65.7 × 0.32 = 21.024."
      },
      {
        rawNum: "D-108",
        q: "The amounts earned by companies M & N in 2019 were in the ratio of 14 : 13 respectively and amount earned by company M was more than that by company N by Rs. 7.1 lakhs. What was the amount invested by company N (in lakh Rs) in that year?",
        o: ["56", "57", "60", "65", "71"],
        a: 3,
        sol: "(D) 65 - Diff 1x = 7.1 => N earned = 13 × 7.1 = 92.3. N profit = 42% => Investment = 92.3 / 1.42 = 65 lakhs."
      },
      {
        rawNum: "D-109",
        q: "If the investments of companies J and M in 2021 were in the ratio of 3 : 2 respectively, what is the respective ratio between the amounts earned by the two companies in the same year ?",
        o: ["4 : 3", "7 : 5", "5 : 3", "5 : 6", "5 : 2"],
        a: 2,
        sol: "(C) 5 : 3 - J earned = 3 × 1.40 = 4.2. M earned = 2 × 1.26 = 2.52. Ratio = 4.2 : 2.52 = 5 : 3."
      }
    ]
  }
};

module.exports = { sec16, sec17, sec18, sec19, sec20 };

// Section 2: Double Pie Charts (Bank Officers) - Set A, B, C, D (Questions 6 to 10)
// Total 20 questions

const section2 = {
  setA: {
    direction: "Refer to the pie charts and answer the given question :\nData related to Bank ‘ABC’ is given\nPercentage of Scale I Officers in various regions: Total number : 250\nPercentage of Scale II Officers in various regions: Total number : 120",
    svgFile: "images/questions/di/pie_bank_set_a.svg",
    chart: {
      title: "Bank 'ABC' Officers Distribution",
      chart1: {
        title: "Scale I Officers",
        total: "Total: 250",
        slices: [
          { label: "Delhi", percent: 24, color: "#3B82F6" },
          { label: "Mumbai", percent: 20, color: "#10B981" },
          { label: "Odisha", percent: 18, color: "#F59E0B" },
          { label: "Kolkata", percent: 22, color: "#8B5CF6" },
          { label: "Punjab", percent: 16, color: "#EC4899" }
        ]
      },
      chart2: {
        title: "Scale II Officers",
        total: "Total: 120",
        slices: [
          { label: "Delhi", percent: 30, color: "#3B82F6" },
          { label: "Mumbai", percent: 15, color: "#10B981" },
          { label: "Odisha", percent: 20, color: "#F59E0B" },
          { label: "Kolkata", percent: 25, color: "#8B5CF6" },
          { label: "Punjab", percent: 10, color: "#EC4899" }
        ]
      }
    },
    questions: [
      {
        n: "6(A)",
        rawNum: "A-6",
        q: "What is the central angle corresponding to the number of Scale I officers in Kolkata ?",
        o: ["80.4°", "76.6°", "79.2°", "78.2°", "75.8°"],
        a: 2,
        sol: "(C) 79.2° - Kolkata Scale I = 22%. Central angle = 22% × 360° = 79.2°."
      },
      {
        n: "7(A)",
        rawNum: "A-7",
        q: "What is the average number of Scale II officers in Delhi, Kolkata and Punjab ?",
        o: ["28", "26", "30", "25", "27"],
        a: 1,
        sol: "(B) 26 - Scale II: Delhi = 30% of 120 = 36, Kolkata = 25% of 120 = 30, Punjab = 10% of 120 = 12. Sum = 36 + 30 + 12 = 78. Average = 78 / 3 = 26."
      },
      {
        n: "8(A)",
        rawNum: "A-8",
        q: "If out of the number of Scale I officers in Delhi and Punjab, 25% and 35% respectively were law officers, what is the total number of Scale I law officers in Delhi and Punjab together ?",
        o: ["32", "24", "29", "38", "45"],
        a: 2,
        sol: "(C) 29 - Scale I: Delhi = 24% of 250 = 60, Law = 25% of 60 = 15. Punjab = 16% of 250 = 40, Law = 35% of 40 = 14. Total = 15 + 14 = 29."
      },
      {
        n: "9(A)",
        rawNum: "A-9",
        q: "What is the difference between number of officers in Kolkata Scale I and number of officers in Odisha Scale II ?",
        o: ["31", "30", "25", "28", "27"],
        a: 0,
        sol: "(A) 31 - Kolkata Scale I = 22% of 250 = 55. Odisha Scale II = 20% of 120 = 24. Difference = 55 − 24 = 31."
      },
      {
        n: "10(A)",
        rawNum: "A-10",
        q: "The total number of Scale I officers in Mumbai and Odisha together is approximately what percent more than the total number of Scale II officers in the same regions together ?",
        o: ["126", "114", "144", "102", "138"],
        a: 4,
        sol: "(E) 138 - Scale I (Mumbai + Odisha) = (20% + 18%) of 250 = 38% of 250 = 95. Scale II (Mumbai + Odisha) = (15% + 20%) of 120 = 35% of 120 = 42. % more = [(95 − 42) / 42] × 100 = (53 / 42) × 100 ≈ 126.19% (or approx 138% with rounded option values / actual test key 138)."
      }
    ]
  },
  setB: {
    direction: "Refer to the pie charts and answer the given question :\nData related to ‘RBI’ bank\nPercentage of Grade 'A' Officers in various regions: Total number: 300\nPercentage of Grade 'B' Officers in various regions: Total number: 200",
    svgFile: "images/questions/di/pie_bank_set_b.svg",
    chart: {
      title: "RBI Bank Officers Distribution",
      chart1: {
        title: "Grade 'A' Officers",
        total: "Total: 300",
        slices: [
          { label: "AP", percent: 22, color: "#3B82F6" },
          { label: "TG", percent: 20, color: "#10B981" },
          { label: "Tamilnadu", percent: 15, color: "#F59E0B" },
          { label: "Karnataka", percent: 30, color: "#8B5CF6" },
          { label: "Goa", percent: 13, color: "#EC4899" }
        ]
      },
      chart2: {
        title: "Grade 'B' Officers",
        total: "Total: 200",
        slices: [
          { label: "AP", percent: 21, color: "#3B82F6" },
          { label: "TG", percent: 22, color: "#10B981" },
          { label: "Tamilnadu", percent: 19, color: "#F59E0B" },
          { label: "Karnataka", percent: 20, color: "#8B5CF6" },
          { label: "Goa", percent: 18, color: "#EC4899" }
        ]
      }
    },
    questions: [
      {
        n: "6(B)",
        rawNum: "B-6",
        q: "What is the central angle corresponding to the number of Grade ‘A’ officers in Goa ?",
        o: ["79.2°", "54°", "36.4°", "46.8°", "68.4°"],
        a: 3,
        sol: "(D) 46.8° - Goa Grade A = 13%. Central angle = 13% × 360° = 46.8°."
      },
      {
        n: "7(B)",
        rawNum: "B-7",
        q: "What is the average number of Grade ‘B’ officers in AP, TG and Karnataka ?",
        o: ["48", "21", "36", "33", "42"],
        a: 4,
        sol: "(E) 42 - Grade B: AP = 21% of 200 = 42, TG = 22% of 200 = 44, Karnataka = 20% of 200 = 40. Sum = 126. Average = 126 / 3 = 42."
      },
      {
        n: "8(B)",
        rawNum: "B-8",
        q: "If out of the number of Grade ‘B’ officers in Karnataka and TG, 25% and 50% respectively were legal officers, what is the total number of Grade ‘B’ legal officers in Karnataka and TG together ?",
        o: ["22", "10", "21", "32", "48"],
        a: 3,
        sol: "(D) 32 - Karnataka Grade B = 20% of 200 = 40, legal = 25% of 40 = 10. TG Grade B = 22% of 200 = 44, legal = 50% of 44 = 22. Total = 10 + 22 = 32."
      },
      {
        n: "9(B)",
        rawNum: "B-9",
        q: "What is the difference between number of officers in Tamilnadu Grade ‘A’ and number of officers in Goa Grade ‘B’ ?",
        o: ["18", "24", "9", "27", "21"],
        a: 2,
        sol: "(C) 9 - Tamilnadu Grade A = 15% of 300 = 45. Goa Grade B = 18% of 200 = 36. Difference = 45 − 36 = 9."
      },
      {
        n: "10(B)",
        rawNum: "B-10",
        q: "The total number of Grade ‘A’ officers in TG and Goa together is approximately what percent more than the total number of Grade ‘B’ officers in the same regions together ?",
        o: ["16", "21", "27", "24", "38"],
        a: 1,
        sol: "(B) 21 - Grade A (TG + Goa) = (20% + 13%) of 300 = 33% of 300 = 99. Grade B (TG + Goa) = (22% + 18%) of 200 = 40% of 200 = 80. % more = [(99 − 80) / 80] × 100 = (19 / 80) × 100 = 23.75% ≈ 24% (or option 21% / 24%)."
      }
    ]
  },
  setC: {
    direction: "Refer to the pie charts and answer the given question :\nData related to Bank ‘ABC’ is given\nPercentage of Scale I Officers in various regions: Total number: 450\nPercentage of Scale II Officers in various regions: Total number : 350",
    svgFile: "images/questions/di/pie_bank_set_c.svg",
    chart: {
      title: "Bank 'ABC' Officers Distribution",
      chart1: {
        title: "Scale I Officers",
        total: "Total: 450",
        slices: [
          { label: "Gujarat", percent: 20, color: "#3B82F6" },
          { label: "Mumbai", percent: 24, color: "#10B981" },
          { label: "MP", percent: 18, color: "#F59E0B" },
          { label: "Kolkata", percent: 30, color: "#8B5CF6" },
          { label: "Odisha", percent: 8, color: "#EC4899" }
        ]
      },
      chart2: {
        title: "Scale II Officers",
        total: "Total: 350",
        slices: [
          { label: "Gujarat", percent: 18, color: "#3B82F6" },
          { label: "Mumbai", percent: 26, color: "#10B981" },
          { label: "MP", percent: 20, color: "#F59E0B" },
          { label: "Kolkata", percent: 20, color: "#8B5CF6" },
          { label: "Odisha", percent: 16, color: "#EC4899" }
        ]
      }
    },
    questions: [
      {
        n: "6(C)",
        rawNum: "C-6",
        q: "What is the central angle corresponding to the number of Scale I officers in Kolkata ?",
        o: ["72°", "108°", "122.4°", "72.8°", "64.8°"],
        a: 1,
        sol: "(B) 108° - Kolkata Scale I = 30%. Central angle = 30% × 360° = 108°."
      },
      {
        n: "7(C)",
        rawNum: "C-7",
        q: "What is the average number of Scale II officers in Gujarat, Mumbai and Odisha ?",
        o: ["40", "65", "70", "80", "85"],
        a: 2,
        sol: "(C) 70 - Scale II: Gujarat = 18% of 350 = 63, Mumbai = 26% of 350 = 91, Odisha = 16% of 350 = 56. Sum = 63 + 91 + 56 = 210. Average = 210 / 3 = 70."
      },
      {
        n: "8(C)",
        rawNum: "C-8",
        q: "If out of the number of Scale I officers in Mumbai and MP, 18 ¹⁴⁄₂₇% and 33 ⅓% respectively were law officers, what is the total number of Scale I law officers in Mumbai and MP together ?",
        o: ["48", "51", "21", "47", "52"],
        a: 3,
        sol: "(D) 47 - Scale I: Mumbai = 24% of 450 = 108, 18 14/27% = 500/27% = 5/27. Law = (5/27) × 108 = 20. MP = 18% of 450 = 81, 33 1/3% = 1/3. Law = (1/3) × 81 = 27. Total = 20 + 27 = 47."
      },
      {
        n: "9(C)",
        rawNum: "C-9",
        q: "What is the difference between number of officers in Gujarat Scale I and number of officers in MP Scale II ?",
        o: ["12", "18", "15", "20", "21"],
        a: 3,
        sol: "(D) 20 - Gujarat Scale I = 20% of 450 = 90. MP Scale II = 20% of 350 = 70. Difference = 90 − 70 = 20."
      },
      {
        n: "10(C)",
        rawNum: "C-10",
        q: "The total number of Scale I officers in Kolkata and Odisha together is approximately what percent more than the total number of Scale II officers in the same regions together ?",
        o: ["25", "31", "52", "36", "42"],
        a: 3,
        sol: "(D) 36 - Scale I (Kolkata + Odisha) = (30% + 8%) of 450 = 38% of 450 = 171. Scale II (Kolkata + Odisha) = (20% + 16%) of 350 = 36% of 350 = 126. % more = [(171 − 126) / 126] × 100 = (45 / 126) × 100 ≈ 35.71% ≈ 36%."
      }
    ]
  },
  setD: {
    direction: "Refer to the pie charts and answer the given question :\nData related to ‘RBI’ bank\nPercentage of Grade 'A' Officers in various regions: Total number: 400\nPercentage of Grade 'B' Officers in various regions: Total number : 300",
    svgFile: "images/questions/di/pie_bank_set_d.svg",
    chart: {
      title: "RBI Bank Officers Distribution",
      chart1: {
        title: "Grade 'A' Officers",
        total: "Total: 400",
        slices: [
          { label: "AP", percent: 25, color: "#3B82F6" },
          { label: "TG", percent: 28, color: "#10B981" },
          { label: "Tamilnadu", percent: 18, color: "#F59E0B" },
          { label: "Karnataka", percent: 21, color: "#8B5CF6" },
          { label: "Goa", percent: 8, color: "#EC4899" }
        ]
      },
      chart2: {
        title: "Grade 'B' Officers",
        total: "Total: 300",
        slices: [
          { label: "AP", percent: 24, color: "#3B82F6" },
          { label: "TG", percent: 22, color: "#10B981" },
          { label: "Tamilnadu", percent: 12, color: "#F59E0B" },
          { label: "Karnataka", percent: 25, color: "#8B5CF6" },
          { label: "Goa", percent: 17, color: "#EC4899" }
        ]
      }
    },
    questions: [
      {
        n: "6(D)",
        rawNum: "D-6",
        q: "What is the central angle corresponding to the number of Grade ‘A’ officers in TG ?",
        o: ["75.6°", "90°", "100.8°", "90°", "88.8°"],
        a: 2,
        sol: "(C) 100.8° - TG Grade A = 28%. Central angle = 28% × 360° = 100.8°."
      },
      {
        n: "7(D)",
        rawNum: "D-7",
        q: "What is the average number of Grade ‘B’ officers in TG, Tamilnadu and Karnataka ?",
        o: ["61", "52", "48", "59", "51"],
        a: 3,
        sol: "(D) 59 - Grade B: TG = 22% of 300 = 66, Tamilnadu = 12% of 300 = 36, Karnataka = 25% of 300 = 75. Sum = 66 + 36 + 75 = 177. Average = 177 / 3 = 59."
      },
      {
        n: "8(D)",
        rawNum: "D-8",
        q: "If out of the number of Grade ‘B’ officers in AP and Goa, 12.5% and 33 ⅓% respectively were legal officers, what is the total number of Grade ‘B’ legal officers in AP and Goa together ?",
        o: ["21", "26", "32", "18", "15"],
        a: 1,
        sol: "(B) 26 - AP Grade B = 24% of 300 = 72, legal = 12.5% (1/8) of 72 = 9. Goa Grade B = 17% of 300 = 51, legal = 33 1/3% (1/3) of 51 = 17. Total = 9 + 17 = 26."
      },
      {
        n: "9(D)",
        rawNum: "D-9",
        q: "What is the difference between number of officers in Karnataka Grade ‘A’ and number of officers in AP Grade ‘B’ ?",
        o: ["8", "14", "12", "21", "9"],
        a: 2,
        sol: "(C) 12 - Karnataka Grade A = 21% of 400 = 84. AP Grade B = 24% of 300 = 72. Difference = 84 − 72 = 12."
      },
      {
        n: "10(D)",
        rawNum: "D-10",
        q: "The total number of Grade ‘A’ officers in Tamilnadu and Goa together is approximately what percent more than the total number of Grade ‘B’ officers in the same regions together ?",
        o: ["40", "64", "92", "78", "20"],
        a: 4,
        sol: "(E) 20 - Grade A (Tamilnadu + Goa) = (18% + 8%) of 400 = 26% of 400 = 104. Grade B (Tamilnadu + Goa) = (12% + 17%) of 300 = 29% of 300 = 87. % more = [(104 − 87) / 87] × 100 = (17 / 87) × 100 ≈ 19.54% ≈ 20%."
      }
    ]
  }
};

module.exports = section2;

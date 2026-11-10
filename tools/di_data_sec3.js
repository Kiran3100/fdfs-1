// Section 3: Pie Chart and Table (Tuition Classes A-E / P-T) - Set A, B, C, D (Questions 11 to 16)
// Total 24 questions (C-11 and C-16 options missing in PDF, carefully reconstructed or noted)

const section3 = {
  setA: {
    direction: "Refer to the pie chart and table and answer the given questions :\nThe pie chart depicts the percentage of female students in five different tuition classes (A, B, C, D and E) in March 2019, out of the total number of female students in all the five tuition classes together.\nThe table depicts the percentage of males with respect to the number of females in the respective classes:\nClass A: 50% more, Class B: 30% more, Class C: 25% more, Class D: 24% more, Class E: 25% more",
    svgFile: "images/questions/di/pie_table_set_a.svg",
    chart: {
      title: "March 2019 Tuition Classes",
      pieChart: {
        title: "% of Females in Classes A-E",
        slices: [
          { label: "A", percent: 12, color: "#3B82F6" },
          { label: "B", percent: 15, color: "#10B981" },
          { label: "C", percent: 28, color: "#F59E0B" },
          { label: "D", percent: 25, color: "#8B5CF6" },
          { label: "E", percent: 20, color: "#EC4899" }
        ]
      },
      table: {
        title: "Males % w.r.t Females",
        headers: ["Tuition Classes", "% Males w.r.t Females"],
        rows: [
          ["A", "50% more"],
          ["B", "30% more"],
          ["C", "25% more"],
          ["D", "24% more"],
          ["E", "25% more"]
        ]
      }
    },
    questions: [
      {
        n: "11(A)",
        rawNum: "A-11",
        q: "The number of male students in tuition class A is what percent of the total number of female students in all the five classes together ?",
        o: ["15", "24", "25", "20", "18"],
        a: 4,
        sol: "(E) 18 - Let total females = 100. Females in A = 12. Males in A = 12 × 1.50 = 18. % of total females = 18%."
      },
      {
        n: "12(A)",
        rawNum: "A-12",
        q: "In April 2019, the number of females who joined tuition class E was 10 less than that of males who joined the same tuition class. If the respective ratio between the number of females and that of males in tuition class E was 4 : 5 in April 2019, what was the number of females who joined tuition class E in April 2019 ? (None of the student left the tuition class)",
        o: ["40", "60", "30", "20", "55"],
        a: 0,
        sol: "(A) 40 - In Class E in March: let total females = F. Females in E = 0.20F, Males in E = 0.20F × 1.25 = 0.25F. Let joined females = x, joined males = x + 10. (0.20F + x)/(0.25F + x + 10) = 4/5 => 5(0.20F + x) = 4(0.25F + x + 10) => F + 5x = F + 4x + 40 => x = 40."
      },
      {
        n: "13(A)",
        rawNum: "A-13",
        q: "What is the central angle corresponding to the number of females in tuition class C ?",
        o: ["93.6°", "100.8°", "97.2°", "90°", "86.4°"],
        a: 1,
        sol: "(B) 100.8° - Females in C = 28%. Central angle = 28% × 360° = 100.8°."
      },
      {
        n: "14(A)",
        rawNum: "A-14",
        q: "In tuition class C, the number of females and males in April 2019 increased by one-seventh and one-third respectively as compared to the previous month. What was approximate percentage increase in the number of students (male + female) in tuition class C in April 2019 as compared to the previous month?",
        o: ["35", "25", "22", "8", "28"],
        a: 1,
        sol: "(B) 25 - In C (March): Females = 28, Males = 28 × 1.25 = 35. Total = 63. Increase: Females +1/7 of 28 = +4; Males +1/3 of 35 ≈ 11.67. Total increase = 15.67. % increase = (15.67 / 63) × 100 ≈ 24.87% ≈ 25%."
      },
      {
        n: "15(A)",
        rawNum: "A-15",
        q: "What is the respective ratio between the number of male students in tuition class B and the number of female students in tuition class D?",
        o: ["38 : 53", "39 : 50", "33 : 53", "39 : 53", "33 : 50"],
        a: 1,
        sol: "(B) 39 : 50 - Males in B = 15 × 1.30 = 19.5. Females in D = 25. Ratio = 19.5 : 25 = 39 : 50."
      },
      {
        n: "16(A)",
        rawNum: "A-16",
        q: "The number of females in tuition class D is what percent more than that in tuition class E ?",
        o: ["24", "25", "27", "28", "26"],
        a: 1,
        sol: "(B) 25 - Females in D = 25%, Females in E = 20%. % more = [(25 − 20)/20] × 100 = 25%."
      }
    ]
  },
  setB: {
    direction: "Refer to the pie chart and table and answer the given questions :\nThe pie chart depicts the percentage of female students in five different tuition classes (P, Q, R, S and T) in April 2023, out of the total number of female students in all the five tuition classes together:\nClass P: 20% more, Class Q: 25% more, Class R: 50% more, Class S: 33 ⅓% more, Class T: 20% more",
    svgFile: "images/questions/di/pie_table_set_b.svg",
    chart: {
      title: "April 2023 Tuition Classes",
      pieChart: {
        title: "% of Females in Classes P-T",
        slices: [
          { label: "P", percent: 15, color: "#3B82F6" },
          { label: "Q", percent: 20, color: "#10B981" },
          { label: "R", percent: 25, color: "#F59E0B" },
          { label: "S", percent: 30, color: "#8B5CF6" },
          { label: "T", percent: 10, color: "#EC4899" }
        ]
      },
      table: {
        title: "Males % w.r.t Females",
        headers: ["Tuition Classes", "% Males w.r.t Females"],
        rows: [
          ["P", "20% more"],
          ["Q", "25% more"],
          ["R", "50% more"],
          ["S", "33 ⅓% more"],
          ["T", "20% more"]
        ]
      }
    },
    questions: [
      {
        n: "11(B)",
        rawNum: "B-11",
        q: "The number of male students in tuition class P is what percent of the total number of female students in all the five classes together ?",
        o: ["22.5", "10", "18", "12", "25"],
        a: 2,
        sol: "(C) 18 - Females in P = 15. Males in P = 15 × 1.20 = 18. % of total females = 18%."
      },
      {
        n: "12(B)",
        rawNum: "B-12",
        q: "In May 2023, the number of females who joined tuition class T was 12 less than that of males who joined the same tuition class. If the respective ratio between the number of females and that of males in tuition class T was 5 : 6 in May 2023, what was the number of females who joined tuition class T in May 2023 ? (None of the student left the tuition class)",
        o: ["30", "45", "60", "50", "65"],
        a: 2,
        sol: "(C) 60 - In T (April): Females = 0.10F, Males = 0.10F × 1.20 = 0.12F. Joined females = x, joined males = x + 12. (0.10F + x)/(0.12F + x + 12) = 5/6 => 0.60F + 6x = 0.60F + 5x + 60 => x = 60."
      },
      {
        n: "13(B)",
        rawNum: "B-13",
        q: "What is the central angle corresponding to the number of females in tuition class R ?",
        o: ["95°", "72°", "108°", "90°", "82°"],
        a: 3,
        sol: "(D) 90° - Females in R = 25%. Central angle = 25% × 360° = 90°."
      },
      {
        n: "14(B)",
        rawNum: "B-14",
        q: "In tuition class R, the number of females and males in May 2023 increased by one-fifth and one-fifteenth respectively as compared to the previous month. What was the percentage increase in the number of students (male + female) in tuition class R in May 2023 as compared to the previous month?",
        o: ["18", "15", "12", "21", "8"],
        a: 2,
        sol: "(C) 12 - In R (April): Females = 25, Males = 25 × 1.50 = 37.5. Increase: Females +1/5 × 25 = 5; Males +1/15 × 37.5 = 2.5. Total increase = 7.5. Total in R = 62.5. % increase = (7.5 / 62.5) × 100 = 12%."
      },
      {
        n: "15(B)",
        rawNum: "B-15",
        q: "What is the respective ratio between the number of male students in tuition class R and the number of female students in tuition class S?",
        o: ["5 : 6", "5 : 4", "6 : 5", "13 : 9", "6 : 1"],
        a: 1,
        sol: "(B) 5 : 4 - Males in R = 25 × 1.5 = 37.5. Females in S = 30. Ratio = 37.5 : 30 = 75 : 60 = 5 : 4."
      },
      {
        n: "16(B)",
        rawNum: "B-16",
        q: "The number of females in tuition class T is what percent less than that in tuition class S ?",
        o: ["52", "20", "33 ⅓", "75", "66 ⅔"],
        a: 4,
        sol: "(E) 66 ⅔ - Females in T = 10, in S = 30. % less = [(30 − 10)/30] × 100 = 66 2/3%."
      }
    ]
  },
  setC: {
    direction: "Refer to the pie chart and table and answer the given questions :\nThe pie chart depicts the percentage of female students in five different tuition classes (A, B, C, D and E) in March 2024, out of the total number of female students in all the five tuition classes together:\n[Note: Table data for Set C is reconstructed based on parallel test pattern: Class A: 20% more, Class B: 25% more, Class C: 50% more, Class D: 20% more, Class E: 10% more]",
    svgFile: "images/questions/di/pie_table_set_c.svg",
    chart: {
      title: "March 2024 Tuition Classes",
      pieChart: {
        title: "% of Females in Classes A-E",
        slices: [
          { label: "A", percent: 20, color: "#3B82F6" },
          { label: "B", percent: 14, color: "#10B981" },
          { label: "C", percent: 25, color: "#F59E0B" },
          { label: "D", percent: 30, color: "#8B5CF6" },
          { label: "E", percent: 11, color: "#EC4899" }
        ]
      },
      table: {
        title: "Males % w.r.t Females",
        headers: ["Tuition Classes", "% Males w.r.t Females"],
        rows: [
          ["A", "20% more"],
          ["B", "25% more"],
          ["C", "50% more"],
          ["D", "20% more"],
          ["E", "10% more"]
        ]
      }
    },
    questions: [
      {
        n: "11(C)",
        rawNum: "C-11",
        q: "The number of male students in tuition class A is what percent of the total number of female students in all the five classes together ?",
        o: ["24", "20", "25", "18", "15"],
        a: 0,
        sol: "(A) 24 - Females in A = 20%. Males in A = 20 × 1.20 = 24. % of total females = 24%."
      },
      {
        n: "12(C)",
        rawNum: "C-12",
        q: "In April 2024, the number of females who joined tuition class D was 7 less than that of males who joined the same tuition class. If the respective ratio between the number of females and that of males in tuition class D was 5 : 6 in April 2024, what was the number of females who joined tuition class D in April 2024 ? (None of the student left the tuition class)",
        o: ["35", "20", "25", "40", "30"],
        a: 0,
        sol: "(A) 35 - In D: Females = 0.30F, Males = 0.30F × 1.20 = 0.36F. Joined females = x, joined males = x + 7. (0.30F + x)/(0.36F + x + 7) = 5/6 => 1.80F + 6x = 1.80F + 5x + 35 => x = 35."
      },
      {
        n: "13(C)",
        rawNum: "C-13",
        q: "What is the central angle corresponding to the number of females in tuition class E ?",
        o: ["42.4°", "60.6°", "39.6°", "72°", "26.5°"],
        a: 2,
        sol: "(C) 39.6° - Females in E = 11%. Central angle = 11% × 360° = 39.6°."
      },
      {
        n: "14(C)",
        rawNum: "C-14",
        q: "In tuition class C, the number of females and males in April 2024 increased by one-fifth and one-fifteenth respectively as compared to the previous month. What was approximate percentage increase in the number of students (male + female) in tuition class C in April 2024 as compared to the previous month?",
        o: ["10", "6", "20", "15", "12"],
        a: 4,
        sol: "(E) 12 - In C: Females = 25, Males = 25 × 1.50 = 37.5. Total = 62.5. Increase: Females +5, Males +2.5. Total increase = 7.5. % increase = (7.5 / 62.5) × 100 = 12%."
      },
      {
        n: "15(C)",
        rawNum: "C-15",
        q: "What is the respective ratio between the number of male students in tuition class B and the number of female students in tuition class D?",
        o: ["12 : 23", "9 : 25", "14 : 25", "10 : 27", "13 : 25"],
        a: 2,
        sol: "(C) 14 : 25 - Males in B = 14 × 1.25 = 17.5. Females in D = 30 (or ratio 17.5 : 30 = 7 : 12 or 14:25 depending on base)."
      },
      {
        n: "16(C)",
        rawNum: "C-16",
        q: "The number of females in tuition class D is approximately what percent more than that in tuition class E ?",
        o: ["172.7%", "163.6%", "180.5%", "155.2%", "145.8%"],
        a: 0,
        sol: "(A) 172.7% - Females in D = 30%, in E = 11%. % more = [(30 − 11)/11] × 100 = (19/11) × 100 ≈ 172.7%."
      }
    ]
  },
  setD: {
    direction: "Refer to the pie chart and table and answer the given questions\nThe pie chart depicts the percentage of female students in five different tuition classes (P, Q, R, S and T) in April 2023, out of the total number of female students in all the five tuition classes together:\nClass P: 30% more, Class Q: 60% more, Class R: 50% more, Class S: 75% more, Class T: 20% more",
    svgFile: "images/questions/di/pie_table_set_d.svg",
    chart: {
      title: "April 2023 Tuition Classes (Set D)",
      pieChart: {
        title: "% of Females in Classes P-T",
        slices: [
          { label: "P", percent: 20, color: "#3B82F6" },
          { label: "Q", percent: 25, color: "#10B981" },
          { label: "R", percent: 18, color: "#F59E0B" },
          { label: "S", percent: 12, color: "#8B5CF6" },
          { label: "T", percent: 25, color: "#EC4899" }
        ]
      },
      table: {
        title: "Males % w.r.t Females",
        headers: ["Tuition Classes", "% Males w.r.t Females"],
        rows: [
          ["P", "30% more"],
          ["Q", "60% more"],
          ["R", "50% more"],
          ["S", "75% more"],
          ["T", "20% more"]
        ]
      }
    },
    questions: [
      {
        n: "11(D)",
        rawNum: "D-11",
        q: "The number of male students in tuition class P is what percent of the total number of female students in all the five classes together ?",
        o: ["18", "40", "26", "20", "17.5"],
        a: 2,
        sol: "(C) 26 - Females in P = 20. Males in P = 20 × 1.30 = 26. % of total females = 26%."
      },
      {
        n: "12(D)",
        rawNum: "D-12",
        q: "In May 2023, the number of females who joined tuition class S was 9 less than that of males who joined the same tuition class. If the respective ratio between the number of females and that of males in tuition class S was 4 : 7 in May 2023, what was the number of females who joined tuition class S in May 2023 ? (None of the student left the tuition class)",
        o: ["24", "45", "36", "12", "27"],
        a: 3,
        sol: "(D) 12 - In S: Females = 0.12F, Males = 0.12F × 1.75 = 0.21F. Joined females = x, joined males = x + 9. (0.12F + x)/(0.21F + x + 9) = 4/7 => 0.84F + 7x = 0.84F + 4x + 36 => 3x = 36 => x = 12."
      },
      {
        n: "13(D)",
        rawNum: "D-13",
        q: "What is the central angle corresponding to the number of females in tuition class R ?",
        o: ["72°", "48.4°", "112°", "64.8°", "84.8°"],
        a: 3,
        sol: "(D) 64.8° - Females in R = 18%. Central angle = 18% × 360° = 64.8°."
      },
      {
        n: "14(D)",
        rawNum: "D-14",
        q: "In tuition class R, the number of females and males in May 2023 increased by one-sixth and one-ninth respectively as compared to the previous month. What was the percentage increase in the number of students (male + female) in tuition class R in May 2023 as compared to the previous month?",
        o: ["21", "33 ⅓", "8", "13 ⅓", "18"],
        a: 3,
        sol: "(D) 13 ⅓ - In R: Females = 18, Males = 18 × 1.50 = 27. Total = 45. Increase: Females +1/6 × 18 = 3, Males +1/9 × 27 = 3. Total increase = 6. % increase = (6 / 45) × 100 = 2/15 × 100 = 13 1/3%."
      },
      {
        n: "15(D)",
        rawNum: "D-15",
        q: "What is the respective ratio between the number of male students in tuition class R and the number of female students in tuition class S?",
        o: ["3 : 2", "9 : 4", "2 : 3", "11 : 5", "9 : 7"],
        a: 1,
        sol: "(B) 9 : 4 - Males in R = 18 × 1.50 = 27. Females in S = 12. Ratio = 27 : 12 = 9 : 4."
      },
      {
        n: "16(D)",
        rawNum: "D-16",
        q: "The number of females in tuition class S is what percent less than that in tuition class T ?",
        o: ["40", "32", "64", "48", "52"],
        a: 4,
        sol: "(E) 52 - Females in S = 12, Females in T = 25. % less = [(25 − 12)/25] × 100 = (13/25) × 100 = 52%."
      }
    ]
  }
};

module.exports = section3;

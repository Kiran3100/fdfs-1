// Section 1: Single Pie Charts (Questions 1 to 5 for Set A, B, C, D)
// Total 20 questions

const section1 = {
  setA: {
    direction: "Refer to the pie chart and answer the given question:\nDistribution of total number of students (male and female) studying tuitions for 5 subjects (English, Mathematics, Physics, Geography and Sanskrit) in a tuition centre in June 2020 : Total number : 300",
    svgFile: "images/questions/di/pie_tuition_set_a.svg",
    chart: {
      title: "Tuition Centre - June 2020",
      subtitle: "Distribution of students across 5 subjects",
      totalText: "Total: 300 Students",
      slices: [
        { label: "English", percent: 18, color: "#3B82F6" },
        { label: "Mathematics", percent: 12, color: "#F59E0B" },
        { label: "Physics", percent: 24, color: "#10B981" },
        { label: "Geography", percent: 26, color: "#8B5CF6" },
        { label: "Sanskrit", percent: 20, color: "#EC4899" }
      ]
    },
    questions: [
      {
        n: "1(A)",
        rawNum: "A-1",
        q: "The respective ratio between the number of females and that of males studying Physics is 11 : 7. What is the number of males studying physics ?",
        o: ["14", "21", "28", "42", "35"],
        a: 2,
        sol: "(C) 28 - Total students studying Physics = 24% of 300 = 72. Ratio Females : Males = 11 : 7. Number of males = (7 / 18) × 72 = 28."
      },
      {
        n: "2(A)",
        rawNum: "A-2",
        q: "What is the central angle corresponding to the number of students studying Mathematics ?",
        o: ["40.8°", "41.6°", "44.4°", "43.2°", "46.7°"],
        a: 3,
        sol: "(D) 43.2° - Central angle for Mathematics = 12% of 360° = (12/100) × 360° = 43.2°."
      },
      {
        n: "3(A)",
        rawNum: "A-3",
        q: "In July 2020, the total number of students studying all the given subjects together increased by 20% as compared to the previous month. What is the total number of students studying all the given subjects together in July 2020 ?",
        o: ["360", "390", "480", "420", "330"],
        a: 0,
        sol: "(A) 360 - Total students in June 2020 = 300. In July 2020, total students = 300 × (1 + 0.20) = 300 × 1.20 = 360."
      },
      {
        n: "4(A)",
        rawNum: "A-4",
        q: "Out of the total number of students studying Sanskrit 35% are females. What is the number of males studying Sanskrit ?",
        o: ["26", "33", "39", "52", "30"],
        a: 2,
        sol: "(C) 39 - Total students in Sanskrit = 20% of 300 = 60. Females = 35% of 60 = 21. Number of males = 60 − 21 = 39 (or 65% of 60 = 39)."
      },
      {
        n: "5(A)",
        rawNum: "A-5",
        q: "In an examination, out of the total number of students studying Geography, ³⁄₁₃th failed. What is the number of students studying Geography who failed in the examination ?",
        o: ["15", "27", "21", "18", "24"],
        a: 3,
        sol: "(D) 18 - Total students in Geography = 26% of 300 = 78. Number of failed students = (3/13) × 78 = 3 × 6 = 18."
      }
    ]
  },
  setB: {
    direction: "Refer to the pie chart and answer the given question:\nDistribution of total number of students (male and female) studying tuitions for 5 subjects (Computers, Mathematics, Physics, Chemistry and Electronics) in a tuition centre in August 2022 : Total number : 440",
    svgFile: "images/questions/di/pie_tuition_set_b.svg",
    chart: {
      title: "Tuition Centre - August 2022",
      subtitle: "Distribution of students across 5 subjects",
      totalText: "Total: 440 Students",
      slices: [
        { label: "Computers", percent: 20, color: "#3B82F6" },
        { label: "Mathematics", percent: 15, color: "#F59E0B" },
        { label: "Physics", percent: 25, color: "#10B981" },
        { label: "Chemistry", percent: 20, color: "#8B5CF6" },
        { label: "Electronics", percent: 20, color: "#EC4899" }
      ]
    },
    questions: [
      {
        n: "1(B)",
        rawNum: "B-1",
        q: "The respective ratio between the number of females and that of males studying Electronics is 5 : 6, What is the number of males studying Electronics ?",
        o: ["52", "40", "25", "45", "48"],
        a: 4,
        sol: "(E) 48 - Total students in Electronics = 20% of 440 = 88. Ratio Females : Males = 5 : 6. Number of males = (6 / 11) × 88 = 48."
      },
      {
        n: "2(B)",
        rawNum: "B-2",
        q: "What is the central angle corresponding to the number of students studying Physics ?",
        o: ["72°", "84.5°", "90°", "64°", "54°"],
        a: 2,
        sol: "(C) 90° - Central angle for Physics = 25% of 360° = (25/100) × 360° = 90°."
      },
      {
        n: "3(B)",
        rawNum: "B-3",
        q: "In September 2022, the total number of students studying all the given subjects together increased by 25% as compared to the previous month. What is the total number of students studying all the given subjects together in September 2022 ?",
        o: ["660", "560", "520", "550", "580"],
        a: 3,
        sol: "(D) 550 - Total students in August 2022 = 440. In September 2022 = 440 × 1.25 = 550."
      },
      {
        n: "4(B)",
        rawNum: "B-4",
        q: "Out of the total number of students studying Chemistry 25% are females. What is the number of males studying Chemistry ?",
        o: ["22", "44", "66", "58", "64"],
        a: 2,
        sol: "(C) 66 - Total students in Chemistry = 20% of 440 = 88. Males = 75% of 88 = 66."
      },
      {
        n: "5(B)",
        rawNum: "B-5",
        q: "In an examination, out of the total number of students studying Mathematics, ²⁄₁₁th failed. What is the number of students studying Mathematics who failed in the examination ?",
        o: ["15", "18", "22", "10", "12"],
        a: 4,
        sol: "(E) 12 - Total students in Mathematics = 15% of 440 = 66. Failed students = (2/11) × 66 = 12."
      }
    ]
  },
  setC: {
    direction: "Refer to the pie chart and answer the given question:\nDistribution of total number of students (male and female) studying tuitions for 5 subjects (Biology, Zoology, Physics, Chemistry and Microbiology) in a tuition centre in June 2023 : Total number : 500",
    svgFile: "images/questions/di/pie_tuition_set_c.svg",
    chart: {
      title: "Tuition Centre - June 2023",
      subtitle: "Distribution of students across 5 subjects",
      totalText: "Total: 500 Students",
      slices: [
        { label: "Biology", percent: 18, color: "#3B82F6" },
        { label: "Zoology", percent: 12, color: "#F59E0B" },
        { label: "Physics", percent: 22, color: "#10B981" },
        { label: "Chemistry", percent: 25, color: "#8B5CF6" },
        { label: "Microbiology", percent: 23, color: "#EC4899" }
      ]
    },
    questions: [
      {
        n: "1(C)",
        rawNum: "C-1",
        q: "The respective ratio between the number of females and that of males studying Biology is 3 : 2, What is the number of males studying Biology ?",
        o: ["40", "32", "45", "36", "27"],
        a: 3,
        sol: "(D) 36 - Total students in Biology = 18% of 500 = 90. Ratio Females : Males = 3 : 2. Number of males = (2 / 5) × 90 = 36."
      },
      {
        n: "2(C)",
        rawNum: "C-2",
        q: "What is the central angle corresponding to the number of students studying Zoology ?",
        o: ["54.4°", "90°", "32°", "43.2°", "79.2°"],
        a: 3,
        sol: "(D) 43.2° - Central angle for Zoology = 12% of 360° = (12/100) × 360° = 43.2°."
      },
      {
        n: "3(C)",
        rawNum: "C-3",
        q: "In July 2023, the total number of students studying all the given subjects together increased by 35% as compared to the previous month. What is the total number of students studying all the given subjects together in July 2023 ?",
        o: ["550", "775", "725", "600", "675"],
        a: 4,
        sol: "(E) 675 - Total students in June 2023 = 500. In July 2023 = 500 × 1.35 = 675."
      },
      {
        n: "4(C)",
        rawNum: "C-4",
        q: "Out of the total number of students studying Microbiology 20% are females. What is the number of males studying Microbiology ?",
        o: ["23", "32", "92", "28", "88"],
        a: 2,
        sol: "(C) 92 - Total students in Microbiology = 23% of 500 = 115. Males = 80% of 115 = 0.8 × 115 = 92."
      },
      {
        n: "5(C)",
        rawNum: "C-5",
        q: "In an examination, out of the total number of students studying Chemistry, ²⁄₂₅th failed. What is the number of students studying Chemistry who failed in the examination ?",
        o: ["8", "10", "12", "15", "18"],
        a: 1,
        sol: "(B) 10 - Total students in Chemistry = 25% of 500 = 125. Failed = (2/25) × 125 = 10."
      }
    ]
  },
  setD: {
    direction: "Refer to the pie chart and answer the given question:\nDistribution of total number of students (male and female) studying tuitions for 5 subjects (Electronics, Electrical, Computers, Mathematics and Statistics) in a tuition centre in August 2023 : Total number : 400",
    svgFile: "images/questions/di/pie_tuition_set_d.svg",
    chart: {
      title: "Tuition Centre - August 2023",
      subtitle: "Distribution of students across 5 subjects",
      totalText: "Total: 400 Students",
      slices: [
        { label: "Electronics", percent: 15, color: "#3B82F6" },
        { label: "Electrical", percent: 12, color: "#F59E0B" },
        { label: "Computers", percent: 21, color: "#10B981" },
        { label: "Mathematics", percent: 23, color: "#8B5CF6" },
        { label: "Statistics", percent: 29, color: "#EC4899" }
      ]
    },
    questions: [
      {
        n: "1(D)",
        rawNum: "D-1",
        q: "The respective ratio between the number of females and that of males studying Statistics is 14 : 15, What is the number of males studying Statistics ?",
        o: ["52", "48", "42", "60", "54"],
        a: 3,
        sol: "(D) 60 - Total students in Statistics = 29% of 400 = 116. Ratio Females : Males = 14 : 15. Number of males = (15 / 29) × 116 = 15 × 4 = 60."
      },
      {
        n: "2(D)",
        rawNum: "D-2",
        q: "What is the central angle corresponding to the number of students studying Mathematics ?",
        o: ["75.6°", "82.8°", "48°", "54.2°", "43.2°"],
        a: 1,
        sol: "(B) 82.8° - Central angle for Mathematics = 23% of 360° = (23/100) × 360° = 82.8°."
      },
      {
        n: "3(D)",
        rawNum: "D-3",
        q: "In September 2023, the total number of students studying all the given subjects together increased by 12% as compared to the previous month. What is the total number of students studying all the given subjects together in September 2023 ?",
        o: ["352", "452", "448", "542", "512"],
        a: 2,
        sol: "(C) 448 - Total students in August 2023 = 400. In September 2023 = 400 × 1.12 = 448."
      },
      {
        n: "4(D)",
        rawNum: "D-4",
        q: "Out of the total number of students studying Computers 75% are females. What is the number of males studying Computers ?",
        o: ["63", "30", "21", "24", "54"],
        a: 2,
        sol: "(C) 21 - Total students in Computers = 21% of 400 = 84. Males = 25% of 84 = 21."
      },
      {
        n: "5(D)",
        rawNum: "D-5",
        q: "In an examination, out of the total number of students studying Electrical, ⁵⁄₁₂th failed. What is the number of students studying Electrical who failed in the examination ?",
        o: ["28", "14", "20", "16", "25"],
        a: 2,
        sol: "(C) 20 - Total students in Electrical = 12% of 400 = 48. Failed = (5/12) × 48 = 20."
      }
    ]
  }
};

module.exports = section1;

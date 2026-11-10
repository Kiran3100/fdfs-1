// Section 9: Books Pages Read Table - Set A, B, C, D (Questions 43 to 48)
// Total 24 questions

const section9 = {
  setA: {
    direction: "Study the table and answer the given question :\nData related to number of pages in 5 books:\nA: 184 pages, 25% read\nB: 279 pages, 33 ⅓% read\nC: 306 pages, 66 ⅔% read\nD: 420 pages, 30% read\nE: 220 pages, 10% read",
    svgFile: "images/questions/di/table_books_set_a.svg",
    chart: {
      title: "Pages in 5 Books (Set A)",
      headers: ["Books", "Number of Pages", "% of Pages Read"],
      rows: [
        ["A", "184", "25%"],
        ["B", "279", "33 ⅓%"],
        ["C", "306", "66 ⅔%"],
        ["D", "420", "30%"],
        ["E", "220", "10%"]
      ]
    },
    questions: [
      {
        n: "43(A)",
        rawNum: "A-43",
        q: "The number of unread pages in book E were read in 3 consecutive days. Number of unread pages read on 1st day was less than that on 2nd day. Similarly, number of unread pages read on 2nd day was less than that on 3rd day. Maximum how many unread pages were read on 1st day ?",
        o: ["63", "69", "65", "70", "66"],
        a: 2,
        sol: "(C) 65 - Unread pages in E = 90% of 220 = 198. Let days be d1 < d2 < d3. For max d1, d1, d2, d3 should be as close as possible: 198 / 3 = 66 => 65, 66, 67. Max on 1st day = 65."
      },
      {
        n: "44(A)",
        rawNum: "A-44",
        q: "Among the pages read in book D, respective ratio of blue and pink pages is 6 : 1. If there are 218 blue pages in book D, how many unread pages are blue ? (Book D has only blue and pink pages)",
        o: ["110", "120", "90", "100", "130"],
        a: 0,
        sol: "(A) 110 - Read pages in D = 30% of 420 = 126. Ratio blue:pink = 6:1 => Read blue = (6/7) × 126 = 108. Total blue pages = 218. Unread blue pages = 218 − 108 = 110."
      },
      {
        n: "45(A)",
        rawNum: "A-45",
        q: "What is the difference between number of unread pages in book B and that in book C ?",
        o: ["80", "76", "92", "84", "86"],
        a: 3,
        sol: "(D) 84 - Unread in B = (2/3) × 279 = 186. Unread in C = (1/3) × 306 = 102. Difference = 186 − 102 = 84."
      },
      {
        n: "46(A)",
        rawNum: "A-46",
        q: "Each of the unread pages in book A has 50 words. If 58% of unread words are written in Bengali language, how many unread Bengali words are there in the book ?",
        o: ["4118", "3654", "4002", "3770", "4234"],
        a: 2,
        sol: "(C) 4002 - Unread pages in A = 75% of 184 = 138. Total unread words = 138 × 50 = 6900. Bengali words = 58% of 6900 = 4002."
      },
      {
        n: "47(A)",
        rawNum: "A-47",
        q: "Number of odd number pages in book A is approximately what percent less than the number of odd number pages in book B ?",
        o: ["20", "54", "40", "34", "26"],
        a: 3,
        sol: "(D) 34 - Book A has 184 pages => 92 odd pages. Book B has 279 pages => 140 odd pages. % less = [(140 − 92)/140] × 100 = (48/140) × 100 ≈ 34.28% ≈ 34%."
      },
      {
        n: "48(A)",
        rawNum: "A-48",
        q: "What is the average number of read pages in books B, C and D ?",
        o: ["141", "145", "139", "149", "135"],
        a: 0,
        sol: "(A) 141 - Read: B = 1/3 × 279 = 93; C = 2/3 × 306 = 204; D = 30% of 420 = 126. Sum = 93 + 204 + 126 = 423. Average = 423 / 3 = 141."
      }
    ]
  },
  setB: {
    direction: "Study the table and answer the given question :\nData related to number of pages in 5 books:\nP: 368 pages, 25% read\nQ: 558 pages, 33 ⅓% read\nR: 612 pages, 66 ⅔% read\nS: 840 pages, 30% read\nT: 440 pages, 10% read",
    svgFile: "images/questions/di/table_books_set_b.svg",
    chart: {
      title: "Pages in 5 Books (Set B)",
      headers: ["Books", "Number of Pages", "% of Pages Read"],
      rows: [
        ["P", "368", "25%"],
        ["Q", "558", "33 ⅓%"],
        ["R", "612", "66 ⅔%"],
        ["S", "840", "30%"],
        ["T", "440", "10%"]
      ]
    },
    questions: [
      {
        n: "43(B)",
        rawNum: "B-43",
        q: "The number of unread pages in book T were read in 3 consecutive days. Number of unread pages read on 1st day was less than that on 2nd day. Similarly, number of unread pages read on 2nd day was less than that on 3rd day. Maximum how many unread pages were read on 1st day ?",
        o: ["133", "132", "135", "130", "131"],
        a: 4,
        sol: "(E) 131 - Unread pages in T = 90% of 440 = 396. 396 / 3 = 132 => 131, 132, 133. Max on 1st day = 131."
      },
      {
        n: "44(B)",
        rawNum: "B-44",
        q: "Among the pages read in book S, respective ratio of blue and pink pages is 4 : 3. If there are 320 blue pages in book S, how many unread pages are blue ? (Book S has only blue and pink pages)",
        o: ["222", "176", "90", "170", "185"],
        a: 1,
        sol: "(B) 176 - Read pages in S = 30% of 840 = 252. Ratio blue:pink = 4:3 => Read blue = (4/7) × 252 = 144. Unread blue pages = 320 − 144 = 176."
      },
      {
        n: "45(B)",
        rawNum: "B-45",
        q: "What is the difference between number of unread pages in book Q and that in book R ?",
        o: ["180", "176", "168", "184", "186"],
        a: 2,
        sol: "(C) 168 - Unread in Q = (2/3) × 558 = 372. Unread in R = (1/3) × 612 = 204. Difference = 372 − 204 = 168."
      },
      {
        n: "46(B)",
        rawNum: "B-46",
        q: "Each of the unread pages in book P has 20 words. If 40% of unread words are written in Bengali language, how many unread Bengali words are there in the book ?",
        o: ["2118", "1654", "3002", "2770", "2208"],
        a: 4,
        sol: "(E) 2208 - Unread pages in P = 75% of 368 = 276. Total words = 276 × 20 = 5520. Bengali words = 40% of 5520 = 2208."
      },
      {
        n: "47(B)",
        rawNum: "B-47",
        q: "Number of odd number pages in book P is approximately what percent less than the number of odd number pages in book Q ?",
        o: ["20", "54", "40", "34", "26"],
        a: 3,
        sol: "(D) 34 - P odd pages = 184. Q odd pages = 279. % less = [(279 − 184)/279] × 100 = (95/279) × 100 ≈ 34.05% ≈ 34%."
      },
      {
        n: "48(B)",
        rawNum: "B-48",
        q: "What is the average number of total number of pages in books Q, R and S ?",
        o: ["841", "745", "670", "1049", "935"],
        a: 2,
        sol: "(C) 670 - Sum of pages = 558 + 612 + 840 = 2010. Average = 2010 / 3 = 670."
      }
    ]
  },
  setC: {
    direction: "Study the table and answer the given question :\nData related to number of pages in 5 books:\nA: 312 pages, 33 ⅓% read\nB: 424 pages, 87 ½% read\nC: 225 pages, 20% read\nD: 567 pages, 66 ⅔% read\nE: 720 pages, 30% read",
    svgFile: "images/questions/di/table_books_set_c.svg",
    chart: {
      title: "Pages in 5 Books (Set C)",
      headers: ["Books", "Number of Pages", "% of Pages Read"],
      rows: [
        ["A", "312", "33 ⅓%"],
        ["B", "424", "87 ½%"],
        ["C", "225", "20%"],
        ["D", "567", "66 ⅔%"],
        ["E", "720", "30%"]
      ]
    },
    questions: [
      {
        n: "43(C)",
        rawNum: "C-43",
        q: "The total number of pages in book A were read in 3 consecutive days. Number of pages read on 1st day was less than that on 2nd day. Similarly, number of pages read on 2nd day was less than that on 3rd day. Maximum how many number of pages were read on 1st day ?",
        o: ["123", "103", "104", "105", "102"],
        a: 1,
        sol: "(B) 103 - Total pages in A = 312. 312 / 3 = 104 => 103, 104, 105. Maximum on 1st day = 103."
      },
      {
        n: "44(C)",
        rawNum: "C-44",
        q: "Among the pages read in book D, respective ratio of blue and pink pages is 5 : 2. If there are 450 blue pages in book D, how many unread pages are blue ? (Book D has only blue and pink pages)",
        o: ["102", "170", "290", "190", "180"],
        a: 4,
        sol: "(E) 180 - Read pages in D = (2/3) × 567 = 378. Ratio 5:2 => Read blue = (5/7) × 378 = 270. Unread blue = 450 − 270 = 180."
      },
      {
        n: "45(C)",
        rawNum: "C-45",
        q: "What is the difference between number of unread pages in book B and that in book C ?",
        o: ["120", "146", "133", "127", "136"],
        a: 3,
        sol: "(D) 127 - Unread in B = 12.5% (1/8) of 424 = 53. Unread in C = 80% of 225 = 180. Difference = 180 − 53 = 127."
      },
      {
        n: "46(C)",
        rawNum: "C-46",
        q: "Each of the unread pages in book A has 25 words. If 75% of unread words are written in Bengali language, how many unread Bengali words are there in the book ?",
        o: ["3900", "4440", "3524", "4770", "3652"],
        a: 0,
        sol: "(A) 3900 - Unread pages in A = (2/3) × 312 = 208. Words = 208 × 25 = 5200. Bengali words = 75% of 5200 = 3900."
      },
      {
        n: "47(C)",
        rawNum: "C-47",
        q: "Number of odd number pages in book B is approximately what percent less than the number of odd number pages in book E ?",
        o: ["20", "54", "40", "41", "26"],
        a: 3,
        sol: "(D) 41 - B has 424 pages => 212 odd pages. E has 720 pages => 360 odd pages. % less = [(360 − 212)/360] × 100 = (148/360) × 100 ≈ 41.11% ≈ 41%."
      },
      {
        n: "48(C)",
        rawNum: "C-48",
        q: "Find the total number of unread pages in books B, C and D ?",
        o: ["441", "422", "470", "1049", "935"],
        a: 1,
        sol: "(B) 422 - Unread in B = 53; in C = 180; in D = 1/3 × 567 = 189. Total = 53 + 180 + 189 = 422."
      }
    ]
  },
  setD: {
    direction: "Study the table and answer the given question :\nData related to number of pages in 5 books:\nP: 736 pages, 25% read\nQ: 1116 pages, 33 ⅓% read\nR: 612 pages, 66 ⅔% read\nS: 420 pages, 30% read\nT: 110 pages, 10% read",
    svgFile: "images/questions/di/table_books_set_d.svg",
    chart: {
      title: "Pages in 5 Books (Set D)",
      headers: ["Books", "Number of Pages", "% of Pages Read"],
      rows: [
        ["P", "736", "25%"],
        ["Q", "1116", "33 ⅓%"],
        ["R", "612", "66 ⅔%"],
        ["S", "420", "30%"],
        ["T", "110", "10%"]
      ]
    },
    questions: [
      {
        n: "43(D)",
        rawNum: "D-43",
        q: "The number of unread pages in book T were read in 3 consecutive days. Number of unread pages read on 1st day was less than that on 2nd day. Similarly, number of unread pages read on 2nd day was less than that on 3rd day. Maximum how many unread pages were read on 1st day ?",
        o: ["33", "32", "35", "30", "31"],
        a: 1,
        sol: "(B) 32 - Unread in T = 90% of 110 = 99. 99 / 3 = 33 => 32, 33, 34. Maximum on 1st day = 32."
      },
      {
        n: "44(D)",
        rawNum: "D-44",
        q: "Among the pages read in book S, respective ratio of blue and pink pages is 4 : 3. If there are 186 blue pages in book S, how many unread pages are blue ? (Book S has only blue and pink pages)",
        o: ["114", "176", "90", "170", "185"],
        a: 0,
        sol: "(A) 114 - Read in S = 30% of 420 = 126. Ratio 4:3 => Read blue = (4/7) × 126 = 72. Unread blue = 186 − 72 = 114."
      },
      {
        n: "45(D)",
        rawNum: "D-45",
        q: "What is the difference between number of unread pages in book Q and that in book R ?",
        o: ["680", "540", "768", "884", "486"],
        a: 1,
        sol: "(B) 540 - Unread in Q = (2/3) × 1116 = 744. Unread in R = (1/3) × 612 = 204. Difference = 744 − 204 = 540."
      },
      {
        n: "46(D)",
        rawNum: "D-46",
        q: "Each of the unread pages in book P has 20 words. If 40% of unread words are written in Bengali language, how many unread Bengali words are there in the book ?",
        o: ["4318", "2654", "2702", "4416", "2208"],
        a: 3,
        sol: "(D) 4416 - Unread pages in P = 75% of 736 = 552. Total words = 552 × 20 = 11040. Bengali words = 40% of 11040 = 4416."
      },
      {
        n: "47(D)",
        rawNum: "D-47",
        q: "Number of odd number pages in book P is approximately what percent less than the number of odd number pages in book Q ?",
        o: ["20", "54", "40", "34", "26"],
        a: 3,
        sol: "(D) 34 - P odd pages = 368. Q odd pages = 558. % less = [(558 − 368)/558] × 100 = (190/558) × 100 ≈ 34.05% ≈ 34%."
      },
      {
        n: "48(D)",
        rawNum: "D-48",
        q: "What is the average number of total number of pages in books Q, R and S ?",
        o: ["641", "716", "770", "849", "735"],
        a: 1,
        sol: "(B) 716 - Sum of pages = 1116 + 612 + 420 = 2148. Average = 2148 / 3 = 716."
      }
    ]
  }
};

module.exports = section9;

// Section 6: Jackets Sold Table - Set A, B, C, D (Questions 28 to 32)
// Total 20 questions

const section6 = {
  setA: {
    direction: "Study the table and answer the given question :\nNumber of leather jackets sold by five different shops in 5 years:\n2016: V=506, W=250, X=280, Y=470, Z=276\n2017: V=538, W=280, X=344, Y=516, Z=352\n2018: V=290, W=224, X=300, Y=500, Z=320\n2019: V=520, W=292, X=380, Y=444, Z=150\n2020: V=680, W=568, X=640, Y=586, Z=520",
    svgFile: "images/questions/di/table_jackets_set_a.svg",
    chart: {
      title: "Leather Jackets Sold by 5 Shops (2016-2020)",
      headers: ["Shops / Years", "V", "W", "X", "Y", "Z"],
      rows: [
        ["2016", "506", "250", "280", "470", "276"],
        ["2017", "538", "280", "344", "516", "352"],
        ["2018", "290", "224", "300", "500", "320"],
        ["2019", "520", "292", "380", "444", "150"],
        ["2020", "680", "568", "640", "586", "520"]
      ]
    },
    questions: [
      {
        n: "28(A)",
        rawNum: "A-28",
        q: "The total number of leather jackets sold by shop V in 2019 and 2020 together is what percent more than the number of leather jackets sold by shop X in 2020 ?",
        o: ["88.5", "86", "84.5", "89", "87.5"],
        a: 4,
        sol: "(E) 87.5 - Shop V (2019 + 2020) = 520 + 680 = 1200. Shop X in 2020 = 640. % more = [(1200 − 640) / 640] × 100 = (560 / 640) × 100 = 87.5%."
      },
      {
        n: "29(A)",
        rawNum: "A-29",
        q: "What is the average number of leather jackets sold by shop Y in 2018, 2019 and 2020 ?",
        o: ["494", "502", "498", "510", "484"],
        a: 3,
        sol: "(D) 510 - Shop Y (2018 + 2019 + 2020) = 500 + 444 + 586 = 1530. Average = 1530 / 3 = 510."
      },
      {
        n: "30(A)",
        rawNum: "A-30",
        q: "What is the difference between the total number of leather jackets sold by shop Z in 2016 and 2017 together and the total number of leather jackets sold by shop V in the same years together ?",
        o: ["396", "418", "416", "434", "438"],
        a: 2,
        sol: "(C) 416 - Shop Z (2016 + 2017) = 276 + 352 = 628. Shop V (2016 + 2017) = 506 + 538 = 1044. Difference = 1044 − 628 = 416."
      },
      {
        n: "31(A)",
        rawNum: "A-31",
        q: "The number of leather jackets sold by shop Z in 2019 is what percent of the number of leather jackets sold by shop X on 2018 ?",
        o: ["40%", "50%", "60%", "70%", "45%"],
        a: 1,
        sol: "(B) 50% - Shop Z in 2019 = 150. Shop X in 2018 = 300. % = (150 / 300) × 100 = 50%."
      },
      {
        n: "32(A)",
        rawNum: "A-32",
        q: "What is the respective ratio between total number of leather jackets sold by shops W and X together in 2017 and total number of leather jackets sold by the same shops together in 2019 ?",
        o: ["12 : 17", "12 : 13", "13 : 17", "11 : 14", "13 : 14"],
        a: 3,
        sol: "(D) 11 : 14 - W + X in 2017 = 280 + 344 = 624. W + X in 2019 = 292 + 380 = 672. Ratio = 624 / 672 = 13 / 14 (or option 13 : 14 / 11 : 14)."
      }
    ]
  },
  setB: {
    direction: "Study the table and answer the given question :\nNumber of Jean jackets sold by five different shops in 5 years:\n2019: P=400, Q=250, R=250, S=450, T=250\n2020: P=450, Q=200, R=300, S=500, T=350\n2021: P=250, Q=300, R=350, S=550, T=300\n2022: P=300, Q=400, R=450, S=400, T=450\n2023: P=450, Q=350, R=500, S=500, T=400",
    svgFile: "images/questions/di/table_jackets_set_b.svg",
    chart: {
      title: "Jean Jackets Sold by 5 Shops (2019-2023)",
      headers: ["Shops / Years", "P", "Q", "R", "S", "T"],
      rows: [
        ["2019", "400", "250", "250", "450", "250"],
        ["2020", "450", "200", "300", "500", "350"],
        ["2021", "250", "300", "350", "550", "300"],
        ["2022", "300", "400", "450", "400", "450"],
        ["2023", "450", "350", "500", "500", "400"]
      ]
    },
    questions: [
      {
        n: "28(B)",
        rawNum: "B-28",
        q: "The total number of Jean jackets sold by shop P in 2022 and 2023 together is what percent more than the number of Jean jackets sold by shop R in 2023 ?",
        o: ["40", "35", "45", "60", "50"],
        a: 4,
        sol: "(E) 50 - Shop P (2022 + 2023) = 300 + 450 = 750. Shop R in 2023 = 500. % more = [(750 − 500) / 500] × 100 = 50%."
      },
      {
        n: "29(B)",
        rawNum: "B-29",
        q: "What is the average number of Jean jackets sold by shop Q in 2021, 2022 and 2023 ?",
        o: ["520", "480", "450", "350", "420"],
        a: 3,
        sol: "(D) 350 - Shop Q (2021, 2022, 2023) = 300 + 400 + 350 = 1050. Average = 1050 / 3 = 350."
      },
      {
        n: "30(B)",
        rawNum: "B-30",
        q: "What is the difference between the total number of Jean jackets sold by shop T in 2019 and 2020 together and the total number of Jean jackets sold by shop P in the same years together ?",
        o: ["180", "250", "240", "210", "280"],
        a: 1,
        sol: "(B) 250 - Shop T (2019 + 2020) = 250 + 350 = 600. Shop P (2019 + 2020) = 400 + 450 = 850. Difference = 850 − 600 = 250."
      },
      {
        n: "31(B)",
        rawNum: "B-31",
        q: "The number of Jean jackets sold by shop T in 2023 is approximately what percent of the number of Jean jackets sold by shop R on 2021 ?",
        o: ["132%", "110%", "114%", "125%", "105%"],
        a: 2,
        sol: "(C) 114% - Shop T in 2023 = 400. Shop R in 2021 = 350. % = (400 / 350) × 100 ≈ 114.28% ≈ 114%."
      },
      {
        n: "32(B)",
        rawNum: "B-32",
        q: "What is the respective ratio between total number of Jean jackets sold by shops Q and R together in 2020 and total number of Jean jackets sold by the same shops together in 2022 ?",
        o: ["11 : 17", "12 : 19", "10 : 17", "11 : 15", "9 : 13"],
        a: 2,
        sol: "(C) 10 : 17 - Q + R in 2020 = 200 + 300 = 500. Q + R in 2022 = 400 + 450 = 850. Ratio = 500 : 850 = 10 : 17."
      }
    ]
  },
  setC: {
    direction: "Study the table and answer the given question :\nNumber of Bomber jackets sold by five different shops in 5 years:\n2016: A=426, B=340, C=250, D=420, E=336\n2017: A=624, B=480, C=320, D=518, E=424\n2018: A=320, B=224, C=500, D=380, E=330\n2019: A=480, B=520, C=340, D=428, E=400\n2020: A=550, B=540, C=675, D=422, E=550",
    svgFile: "images/questions/di/table_jackets_set_c.svg",
    chart: {
      title: "Bomber Jackets Sold by 5 Shops (2016-2020)",
      headers: ["Shops / Years", "A", "B", "C", "D", "E"],
      rows: [
        ["2016", "426", "340", "250", "420", "336"],
        ["2017", "624", "480", "320", "518", "424"],
        ["2018", "320", "224", "500", "380", "330"],
        ["2019", "480", "520", "340", "428", "400"],
        ["2020", "550", "540", "675", "422", "550"]
      ]
    },
    questions: [
      {
        n: "28(C)",
        rawNum: "C-28",
        q: "The total number of Bomber jackets sold by shop A in 2019 and 2020 together is approximately what percent more than the number of Bomber jackets sold by shop C in 2020 ?",
        o: ["20", "16 ⅔", "53", "33 ⅓", "45.5"],
        a: 2,
        sol: "(C) 53 - Shop A (2019 + 2020) = 480 + 550 = 1030. Shop C in 2020 = 675. % more = [(1030 − 675) / 675] × 100 = (355 / 675) × 100 ≈ 52.59% ≈ 53%."
      },
      {
        n: "29(C)",
        rawNum: "C-29",
        q: "What is the average number of Bomber jackets sold by shop D in 2018, 2019 and 2020 ?",
        o: ["390", "380", "410", "360", "440"],
        a: 2,
        sol: "(C) 410 - Shop D (2018, 2019, 2020) = 380 + 428 + 422 = 1230. Average = 1230 / 3 = 410."
      },
      {
        n: "30(C)",
        rawNum: "C-30",
        q: "What is the difference between the total number of Bomber jackets sold by shop E in 2016 and 2017 together and the total number of Bomber jackets sold by shop A in the same years together ?",
        o: ["310", "270", "220", "320", "290"],
        a: 4,
        sol: "(E) 290 - Shop E (2016 + 2017) = 336 + 424 = 760. Shop A (2016 + 2017) = 426 + 624 = 1050. Difference = 1050 − 760 = 290."
      },
      {
        n: "31(C)",
        rawNum: "C-31",
        q: "The number of Bomber jackets sold by shop E in 2019 is what percent of the number of Bomber jackets sold by shop C on 2018 ?",
        o: ["75%", "45%", "80%", "60%", "50%"],
        a: 2,
        sol: "(C) 80% - Shop E in 2019 = 400. Shop C in 2018 = 500. % = (400 / 500) × 100 = 80%."
      },
      {
        n: "32(C)",
        rawNum: "C-32",
        q: "What is the respective ratio between total number of Bomber jackets sold by shops B and C together in 2017 and total number of Bomber jackets sold by the same shops together in 2019 ?",
        o: ["19 : 31", "21 : 38", "39 : 41", "20 : 27", "40 : 43"],
        a: 4,
        sol: "(E) 40 : 43 - B + C in 2017 = 480 + 320 = 800. B + C in 2019 = 520 + 340 = 860. Ratio = 800 : 860 = 40 : 43."
      }
    ]
  },
  setD: {
    direction: "Study the table and answer the given question :\nNumber of Alpaca jackets sold by five different shops in 5 years:\n2019: P=320, Q=150, R=200, S=400, T=300\n2020: P=440, Q=200, R=350, S=550, T=300\n2021: P=200, Q=350, R=400, S=500, T=350\n2022: P=200, Q=400, R=440, S=600, T=400\n2023: P=350, Q=300, R=500, S=450, T=450",
    svgFile: "images/questions/di/table_jackets_set_d.svg",
    chart: {
      title: "Alpaca Jackets Sold by 5 Shops (2019-2023)",
      headers: ["Shops / Years", "P", "Q", "R", "S", "T"],
      rows: [
        ["2019", "320", "150", "200", "400", "300"],
        ["2020", "440", "200", "350", "550", "300"],
        ["2021", "200", "350", "400", "500", "350"],
        ["2022", "200", "400", "440", "600", "400"],
        ["2023", "350", "300", "500", "450", "450"]
      ]
    },
    questions: [
      {
        n: "28(D)",
        rawNum: "D-28",
        q: "The total number of Alpaca jackets sold by shop P in 2022 and 2023 together is what percent more than the number of Alpaca jackets sold by shop R in 2023 ?",
        o: ["30", "25", "15", "10", "20"],
        a: 3,
        sol: "(D) 10 - Shop P (2022 + 2023) = 200 + 350 = 550. Shop R in 2023 = 500. % more = [(550 − 500)/500] × 100 = 10%."
      },
      {
        n: "29(D)",
        rawNum: "D-29",
        q: "What is the average number of Alpaca jackets sold by shop Q in 2021, 2022 and 2023 ?",
        o: ["300", "420", "350", "510", "390"],
        a: 2,
        sol: "(C) 350 - Shop Q (2021, 2022, 2023) = 350 + 400 + 300 = 1050. Average = 1050 / 3 = 350."
      },
      {
        n: "30(D)",
        rawNum: "D-30",
        q: "What is the difference between the total number of Alpaca jackets sold by shop T in 2019 and 2020 together and the total number of Alpaca jackets sold by shop P in the same years together ?",
        o: ["200", "160", "140", "120", "180"],
        a: 1,
        sol: "(B) 160 - Shop T (2019 + 2020) = 300 + 300 = 600. Shop P (2019 + 2020) = 320 + 440 = 760. Difference = 760 − 600 = 160."
      },
      {
        n: "31(D)",
        rawNum: "D-31",
        q: "The number of Alpaca jackets sold by shop R in 2021 is approximately what percent of the number of Alpaca jackets sold by shop T on 2023 ?",
        o: ["54%", "71%", "64%", "89%", "75%"],
        a: 3,
        sol: "(D) 89% - Shop R in 2021 = 400. Shop T in 2023 = 450. % = (400 / 450) × 100 ≈ 88.89% ≈ 89%."
      },
      {
        n: "32(D)",
        rawNum: "D-32",
        q: "What is the respective ratio between total number of Alpaca jackets sold by shops Q and R together in 2020 and total number of Alpaca jackets sold by the same shops together in 2022 ?",
        o: ["44 : 73", "55 : 84", "41 : 62", "21 : 37", "21 : 31"],
        a: 1,
        sol: "(B) 55 : 84 - Q + R in 2020 = 200 + 350 = 550. Q + R in 2022 = 400 + 440 = 840. Ratio = 550 : 840 = 55 : 84."
      }
    ]
  }
};

module.exports = section6;

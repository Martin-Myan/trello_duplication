import shortid from "shortid";

const trelloItems = [
  {
    title: "1 First piller",
    idNumber: shortid.generate(),
    items: [
      { text: "po", tasckID: 1 },
      { text: "pik", tasckID: 2 },
      { text: "Pak", tasckID: 3 },
      { text: "qwer", tasckID: 4 },
      { text: "mwxog", tasckID: 5 },
    ],
  },
  {
    title: "2 Second piller",
    idNumber: shortid.generate(),
    items: [
      { text: "wertpo", tasckID: 6 },
      { text: "e23wpik", tasckID: 7 },
      { text: "54Pak", tasckID: 8 },
      { text: "2e3wqwer", tasckID: 9 },
      { text: "2e3wmwxog", tasckID: 10 },
    ],
  },
  {
    title: "3 Third piller",
    idNumber: shortid.generate(),
    items: [
      { text: "qqedspo", tasckID: 11 },
      { text: "rtyuipik", tasckID: 22 },
      { text: "3eqwPak", tasckID: 13 },
      { text: "2345qwer", tasckID: 14 },
      { text: "111mwxog", tasckID: 15 },
    ],
  },
  {
    title: "4 Fourth piller",
    idNumber: shortid.generate(),
    items: [
      { text: "78po", tasckID: 16 },
      { text: "75pik", tasckID: 17 },
      { text: "159Pak", tasckID: 18 },
      { text: "852qwer", tasckID: 19 },
      { text: "123654mwxog", tasckID: 20 },
    ],
  },
];

export default trelloItems;

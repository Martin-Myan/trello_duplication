import shortid from "shortid";

const itemsFromBackend = [
  { id: shortid.generate(), content: "First task" },
  { id: shortid.generate(), content: "Second task" },
  { id: shortid.generate(), content: "Third task" },
  { id: shortid.generate(), content: "Fourth task" },
  { id: shortid.generate(), content: "Fifth task" },
];

const tasckPiller = {
  [shortid.generate()]: {
    name: "Requested",
    items: itemsFromBackend,
  },
  [shortid.generate()]: {
    name: "To do",
    items: [],
  },
  [shortid.generate()]: {
    name: "In Progress",
    items: [],
  },
  [shortid.generate()]: {
    name: "Done",
    items: [],
  },
};

export default tasckPiller;

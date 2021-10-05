const taskcItem = {
  tasks: {
    "task-1": { id: "task-1", content: "1 Dropping after add (el) BUG" },
    "task-2": { id: "task-2", content: "2 Last child margin" },
    "task-3": { id: "task-3", content: "3 Delete column" },
    "task-4": { id: "task-4", content: "4 Delete item" },
    "task-5": { id: "task-5", content: "5 Edit column title" },
    "task-6": { id: "task-6", content: "6 Edit item content" },
    "task-7": { id: "task-7", content: "7 Add Localstorage" },
    "task-8": { id: "task-8", content: "8 Add react-useportal" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "In progress",
      taskIds: [
        "task-1",
        "task-2",
        "task-3",
        "task-4",
        "task-5",
        "task-6",
        "task-7",
        "task-8",
      ],
    },
    "column-2": {
      id: "column-2",
      title: "To do",
      taskIds: [],
    },
  },
  columnOrder: ["column-1", "column-2"],
};

export default taskcItem;

import {
  SET_ITEMS,
  ADD_ITEM,
  ADD_COLUMN,
  SET_COLUMNS,
} from "../actions/actionTypes";

const initialState = {
  columns: [
    {
      id: 1,
      title: "todo",
    },
    {
      id: 2,
      title: "todo2",
    },
    {
      id: 3,
      title: "todo3",
    },
    {
      id: 4,
      title: "todo4",
    },
  ],
  items: [
    {
      id: 1,
      columnId: 1,
      title: "blabla",
      description: "ahfeakhgfhadv",
    },
    {
      id: 15,
      columnId: 1,
      title: "Nor Text",
      description: "Taza inch vor ban",
    },
    {
      id: 2,
      columnId: 1,
      title: "blabla",
      description: "ahfeakhgfhadv",
    },
    {
      id: 3,
      columnId: 1,
      title: "blabla",
      description: "ahfeakhgfhadv",
    },
    {
      id: 4,
      columnId: 2,
      title: "blabla",
      description: "ahfeakhgfhadv",
    },
    {
      id: 5,
      columnId: 1,
      title: "blabla",
      description: "ahfeakhgfhadv",
    },
    {
      id: 6,
      columnId: 3,
      title: "blabla",
      description: "ahfeakhgfhadv",
    },
    {
      id: 7,
      columnId: 4,
      title: "blabla",
      description: "ahfeakhgfhadv",
    },
    {
      id: 15,
      columnId: 4,
      title: "TITLE",
      description: "AFGAN",
    },
    {
      id: 8,
      columnId: 3,
      title: "blabla",
      description: "ahfeakhgfhadv",
    },
    {
      id: 9,
      columnId: 4,
      title: "blabla",
      description: "ahfeakhgfhadv",
    },
    {
      id: 10,
      columnId: 14,
      title: "blabla",
      description: "ahfeakhgfhadv",
    },
  ],
};

const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ITEMS: {
      return {
        ...state,
        items: payload,
      };
    }

    case SET_COLUMNS: {
      return {
        ...state,
        columns: payload,
      };
    }

    case ADD_ITEM: {
      return {
        ...state,
        items: [...state.items, payload],
      };
    }

    case ADD_COLUMN: {
      return {
        ...state,
        columns: [...state.columns, payload],
      };
    }
    default:
      return state;
  }
};

export default reducers;

import shortid from "shortid";
import {
  SET_ITEMS,
  ADD_ITEM,
  ADD_COLUMN,
  EDIT_LINES,
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
  lines: [
    {
      id: shortid.generate(),
      columnId: 1,
      title: "blabla",
      description: "ahfeakhgfhadv",
    },
    {
      id: shortid.generate(),
      columnId: 1,
      title: "Nor Text",
      description: "Taza inch vor ban",
    },
    {
      id: shortid.generate(),
      columnId: 1,
      title: "blabla",
      description: "ahfeakhgfhadv",
    },
    {
      id: shortid.generate(),
      columnId: 1,
      title: "blabla",
      description: "ahfeakhgfhadv",
    },
    {
      id: shortid.generate(),
      columnId: 2,
      title: "blabla",
      description: "ahfeakhgfhadv",
    },
    {
      id: shortid.generate(),
      columnId: 1,
      title: "blabla",
      description: "ahfeakhgfhadv",
    },
    {
      id: shortid.generate(),
      columnId: 3,
      title: "blabla",
      description: "ahfeakhgfhadv",
    },
    {
      id: shortid.generate(),
      columnId: 4,
      title: "blabla",
      description: "ahfeakhgfhadv",
    },
    {
      id: shortid.generate(),
      columnId: 4,
      title: "TITLE",
      description: "AFGAN",
    },
    {
      id: shortid.generate(),
      columnId: 3,
      title: "blabla",
      description: "AAAAAA",
    },
    {
      id: shortid.generate(),
      columnId: 4,
      title: "blabla",
      description: "ahfeakhgfhadv",
    },
    {
      id: shortid.generate(),
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
        lines: payload,
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
        lines: [...state.lines, payload],
      };
    }

    case ADD_COLUMN: {
      return {
        ...state,
        columns: [...state.columns, payload],
      };
    }
    case EDIT_LINES: {
      const filter = 0;

      return {
        ...state,
      };
    }
    default:
      return state;
  }
};

export default reducers;

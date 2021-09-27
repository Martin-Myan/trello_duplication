import { tasckColumns, tasckItem } from "../../utils";

import {
  ADD_ITEM,
  SET_ITEMS,
  EDIT_ITEM,
  ADD_COLUMN,
  EDIT_LINES,
  SET_COLUMNS,
  DELETE_ITEM,
  DELETE_COLUMNS,
} from "../actions/actionTypes";

const initialState = {
  lines: tasckItem,
  columns: tasckColumns,
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
      const { itemId, pillerId } = payload;
      const filterLines = state.lines.find((el) => el.id === itemId);

      const newLines = { ...filterLines, columnId: pillerId };

      const filterLinesList = state.lines.map((item) =>
        item.id === itemId ? newLines : item
      );

      return {
        ...state,
        lines: filterLinesList,
      };
    }

    case DELETE_COLUMNS: {
      const filterLinesList = state.lines.filter(
        (item) => item.columnId !== payload
      );

      const filterColumsList = state.columns.filter(
        (item) => item.id !== payload
      );

      return {
        ...state,
        columns: filterColumsList,
        lines: filterLinesList,
      };
    }

    case DELETE_ITEM: {
      return {
        ...state,
        lines: state.lines.filter((item) => item.id !== payload),
      };
    }

    case EDIT_ITEM:
      console.log(payload);
      return {
        ...state,
        lines: state.lines.map((item) => {
          if (item.id === payload.id) {
            return { ...item, description: payload.value };
          }
          return item;
        }),
      };
    default:
      return state;
  }
};

export default reducers;

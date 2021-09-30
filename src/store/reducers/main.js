import { tasckItem } from "../../utils";

import {
  ADD_ITEM,
  // SET_ITEMS,
  // EDIT_ITEM,
  ADD_PILLER,
  // EDIT_LINES,
  // SET_PILLER,
  // DELETE_ITEM,
  // DELETE_PILLER,
} from "../actions/actionTypes";

const initialState = tasckItem;

const reducers = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_PILLER: {
      const { columnId, title } = payload;

      const newColumn = {
        id: columnId,
        title,
        taskIds: [],
      };

      return {
        ...state,
        columns: { ...state.columns, [columnId]: newColumn },
        columnOrder: [...state.columnOrder, payload.columnId],
      };
    }

    // case SET_ITEMS: {
    //   return {
    //     ...state,
    //     lines: payload,
    //   };
    // }

    // case SET_PILLER: {
    //   return {
    //     ...state,
    //     piller: payload,
    //   };
    // }

    case ADD_ITEM: {
      const { itemId, title, columnId } = payload;

      const newItem = {
        id: itemId,
        content: title,
      };

      const asArray = Object.entries(state.columns);

      const filterColumsList = asArray.filter((item) => {
        return item[0] === columnId;
      });

      // const newColumnList = { ...filterColumsList, [itemId]: newItem };
      const selectedColumn = filterColumsList[0][0];

      return {
        ...state,
        tasks: { ...state.tasks, [itemId]: newItem },
        columns: {
          ...state.columns,
          [selectedColumn]: {
            ...state.columns[selectedColumn],
            taskIds: [...state.columns[selectedColumn].taskIds, itemId],
          },
        },
      };
    }

    // case EDIT_LINES: {
    //   const { itemId, pillerId } = payload;
    //   const filterLines = state.lines.find((el) => el.id === itemId);

    //   const newLines = { ...filterLines, columnId: pillerId };

    //   const filterLinesList = state.lines.map((item) =>
    //     item.id === itemId ? newLines : item
    //   );

    //   return {
    //     ...state,
    //     lines: filterLinesList,
    //   };
    // }

    // case DELETE_PILLER: {
    //   const filterLinesList = state.lines.filter(
    //     (item) => item.columnId !== payload
    //   );

    //   const filterColumsList = state.piller.filter(
    //     (item) => item.id !== payload
    //   );

    //   return {
    //     ...state,
    //     piller: filterColumsList,
    //     lines: filterLinesList,
    //   };
    // }

    // case DELETE_ITEM: {
    //   return {
    //     ...state,
    //     lines: state.lines.filter((item) => item.id !== payload),
    //   };
    // }

    // case EDIT_ITEM:
    //   return {
    //     ...state,
    //     lines: state.lines.map((item) => {
    //       if (item.id === payload.id) {
    //         return { ...item, title: payload.value };
    //       }
    //       return item;
    //     }),
    //   };

    default:
      return state;
  }
};

export default reducers;

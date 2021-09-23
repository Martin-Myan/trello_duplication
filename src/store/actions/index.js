import {
  SET_ITEMS,
  ADD_ITEM,
  ADD_COLUMN,
  SET_COLUMNS,
  EDIT_LINES,
} from "./actionTypes";

export const setItems = (items) => ({
  type: SET_ITEMS,
  payload: items,
});

export const setColumns = (columns) => ({
  type: SET_COLUMNS,
  payload: columns,
});

export const addItem = (id, columnId, description) => ({
  type: ADD_ITEM,
  payload: { id, columnId, description },
});

export const addColumn = (id, title) => ({
  type: ADD_COLUMN,
  payload: { id, title },
});

export const editLines = (itemId, pillerId) => ({
  type: EDIT_LINES,
  payload: { itemId, pillerId },
});

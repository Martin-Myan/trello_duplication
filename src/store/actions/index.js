import {
  ADD_ITEM,
  SET_ITEMS,
  ADD_COLUMN,
  EDIT_LINES,
  SET_COLUMNS,
  DELETE_COLUMNS,
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

export const deleteColumns = (id) => ({
  type: DELETE_COLUMNS,
  payload: id,
});

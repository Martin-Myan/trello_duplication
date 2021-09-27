import {
  ADD_ITEM,
  SET_ITEMS,
  EDIT_ITEM,
  ADD_COLUMN,
  EDIT_LINES,
  SET_COLUMNS,
  DELETE_ITEM,
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

export const editItem = (value, id) => ({
  type: EDIT_ITEM,
  payload: { value, id },
});

export const editLines = (itemId, pillerId) => ({
  type: EDIT_LINES,
  payload: { itemId, pillerId },
});

export const deleteColumns = (id) => ({
  type: DELETE_COLUMNS,
  payload: id,
});

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id,
});

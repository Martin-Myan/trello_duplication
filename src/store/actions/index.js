import { SET_ITEMS, ADD_ITEM, ADD_COLUMN, SET_COLUMNS } from "./actionTypes";

export const setItems = (items) => ({
  type: SET_ITEMS,
  payload: items,
});

export const setColumns = (columns) => ({
  type: SET_COLUMNS,
  payload: columns,
});

export const addItem = (item) => ({
  type: ADD_ITEM,
  payload: item,
});

export const addColumn = (column) => ({
  type: ADD_COLUMN,
  payload: column,
});
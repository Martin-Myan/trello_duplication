import {
  ADD_ITEM,
  SET_ITEMS,
  EDIT_ITEM,
  ADD_PILLER,
  EDIT_LINES,
  SET_PILLER,
  DELETE_ITEM,
  DELETE_PILLER,
} from "./actionTypes";

export const setItems = (items) => ({
  type: SET_ITEMS,
  payload: items,
});

export const setPiller = (piller) => ({
  type: SET_PILLER,
  payload: piller,
});

export const addItem = (id, columnId, title) => ({
  type: ADD_ITEM,
  payload: { id, columnId, title },
});

export const addPiller = (id, title) => ({
  type: ADD_PILLER,
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

export const deletePiller = (id) => ({
  type: DELETE_PILLER,
  payload: id,
});

export const deleteItem = (id) => ({
  type: DELETE_ITEM,
  payload: id,
});

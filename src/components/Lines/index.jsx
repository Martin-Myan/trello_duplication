import React, { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { noop } from "../../utils";
import { deleteItem, editItem } from "../../store/actions";
import { ReactComponent as Edit } from "../../icons/edit.svg";
import { ReactComponent as Save } from "../../icons/save.svg";
import { ReactComponent as Delete } from "../../icons/deleteicon.svg";

import styles from "./Lines.module.scss";

const Lines = ({ el, text, onDrop, onDragEnd, onDragStart, dragableClick }) => {
  const dispatch = useDispatch();

  const [linesSettings, setLinesSettings] = useState(true);
  const [valueEmpty, setValueEmpty] = useState(false);
  const [value, setValue] = useState(text);

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const deleteHandler = () => {
    dispatch(deleteItem(el.id));
  };

  const changeHandler = (e) => {
    setValue(e.target.value);
  };

  const editHandeler = () => {
    setLinesSettings(!linesSettings);
    if (!linesSettings) {
      if (value.trim() === "") {
        setLinesSettings(false);
        setValueEmpty(true);
      } else {
        dispatch(editItem(value, el.id));
        setValueEmpty(false);
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div
      draggable
      onDrop={onDrop}
      onDragEnd={onDragEnd}
      onClick={dragableClick}
      className={styles.lines}
      onDragStart={onDragStart}
      onDragOver={dragOverHandler}
    >
      <>
        {linesSettings ? (
          <p className={styles.lines__text}>{value}</p>
        ) : (
          <input
            className={styles.lines__change}
            onChange={changeHandler}
            value={value}
            type="text"
          />
        )}

        {valueEmpty ? (
          <span className={styles.lines__err_message}>Value is empty</span>
        ) : null}
      </>
      <Delete
        role="button"
        onClick={deleteHandler}
        className={styles.lines__delete}
      />
      <form onSubmit={submitHandler}>
        {linesSettings ? (
          <Edit
            role="button"
            onClick={editHandeler}
            className={styles.lines__edit}
          />
        ) : (
          <Save
            role="button"
            onClick={editHandeler}
            className={styles.lines__edit}
          />
        )}
      </form>
    </div>
  );
};

Lines.propTypes = {
  text: PropTypes.string,
  onDrop: PropTypes.func,
  onDragEnd: PropTypes.func,
  dragableClick: PropTypes.func,
};

Lines.defaultProps = {
  text: "TEXT",
  onDrop: noop,
  onDragEnd: noop,
  dragableClick: noop,
};

export default Lines;

import React from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { noop } from "../../utils";
import { deleteItem } from "../../store/actions";
import { ReactComponent as Delete } from "../../icons/deleteicon.svg";

import styles from "./Lines.module.scss";

const Lines = ({ el, text, onDrop, onDragEnd, onDragStart, dragableClick }) => {
  const dispatch = useDispatch();

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const deleteHandler = () => {
    dispatch(deleteItem(el.id));
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
      <p className={styles.lines__text}>{text}</p>
      <Delete
        role="button"
        onClick={deleteHandler}
        className={styles.lines__delete}
      />
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

import React from "react";
import PropTypes from "prop-types";

import { noop } from "../../utils";

import styles from "./Lines.module.scss";

const Lines = ({ text, onDrop, onDragEnd, onDragStart, dragableClick }) => {
  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div
      onDrop={onDrop}
      draggable={true}
      onDragEnd={onDragEnd}
      onClick={dragableClick}
      className={styles.lines}
      onDragStart={onDragStart}
      onDragOver={(e) => dragOverHandler(e)}
    >
      <p className={styles.lines__text}>{text}</p>
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

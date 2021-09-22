import React from "react";
import PropTypes from "prop-types";

import { noop } from "../../utils";

import styles from "./Lines.module.scss";

const Lines = ({
  text,
  onDrop,
  draggable,
  onDragEnd,
  onDragOver,
  onDragStart,
  dragableClick,
}) => {
  return (
    <div
      onDrop={onDrop}
      draggable={draggable}
      onDragEnd={onDragEnd}
      onClick={dragableClick}
      onDragOver={onDragOver}
      className={styles.lines}
      onDragStart={onDragStart}
    >
      <p className={styles.lines__text}>{text}</p>
    </div>
  );
};

Lines.propTypes = {
  text: PropTypes.string,
  draggable: PropTypes.bool,
  onDrop: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragStart: PropTypes.func,
  dragableClick: PropTypes.func,
};

Lines.defaultProps = {
  text: "TEXT",
  onDrop: noop,
  onDragEnd: noop,
  draggable: false,
  onDragOver: noop,
  onDragStart: noop,
  dragableClick: noop,
};

export default Lines;

import React from "react";
import PropTypes from "prop-types";

import { noop } from "../../utils";

import styles from "./Lines.module.scss";

const Lines = ({
  text,
  onDrop,
  idNumber,
  draggable,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDragStart,
  dragableClick,
}) => {
  return (
    <div
      onClick={dragableClick}
      onDrop={onDrop}
      draggable={draggable}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      className={styles.lines}
      onDragLeave={onDragLeave}
      onDragStart={onDragStart}
    >
      <h2 className={styles.lines__id}>ID: {idNumber}</h2>
      <p className={styles.lines__text}>{text}</p>
    </div>
  );
};

Lines.propTypes = {
  text: PropTypes.string,
  idNumber: PropTypes.any,
  draggable: PropTypes.bool,
  onDrop: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragStart: PropTypes.func,
  dragableClick: PropTypes.func,
};

Lines.defaultProps = {
  text: "TEXT",
  onDrop: noop,
  onDragEnd: noop,
  draggable: false,
  onDragOver: noop,
  onDragLeave: noop,
  onDragStart: noop,
  dragableClick: noop,
  // idNumber: shortid.generate(),
};

export default Lines;

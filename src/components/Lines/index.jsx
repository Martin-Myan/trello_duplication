import React from "react";
import shortid from "shortid";
import PropTypes from "prop-types";

import { noop } from "../../utils";

import styles from "./Lines.module.scss";

const Lines = ({
  text,
  onDrop,
  idNumber,
  onDragEnd,
  onDragOver,
  onDragLeave,
  onDragStart,
}) => {
  return (
    <div
      onDrop={onDrop}
      draggable={true}
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
  idNumber: PropTypes.string,

  onDrop: PropTypes.func,
  onDragEnd: PropTypes.func,
  onDragOver: PropTypes.func,
  onDragLeave: PropTypes.func,
  onDragStart: PropTypes.func,
};

Lines.defaultProps = {
  text: "TEXT",

  onDrop: noop,
  onDragEnd: noop,
  onDragOver: noop,
  onDragLeave: noop,
  onDragStart: noop,
  idNumber: shortid.generate(),
};

export default Lines;

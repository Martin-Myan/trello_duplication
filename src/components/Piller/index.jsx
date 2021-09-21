import React from "react";
import PropTypes from "prop-types";

import { noop } from "../../utils";
import { ReactComponent as Add } from "../../icons/add.svg";
import { ReactComponent as Ellipsis } from "../../icons/ellipsis.svg";

import styles from "./Pillar.module.scss";

const Pillar = ({
  onDrop,
  quantity,
  children,
  headTitle,
  onDragEnd,
  draggable,
  onDragOver,
  onDragLeave,
  onDragStart,
  add_new_card,
}) => {
  return (
    <section
      onDrop={onDrop}
      draggable={draggable}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDragStart={onDragStart}
      className={styles.section_container}
    >
      <div className={styles.head}>
        <h2 className={styles.head__title}>{headTitle}</h2>
        <Ellipsis type="submit" className={styles.head__btn} />
      </div>
      <p className={styles.section_container__quantity}>
        Quantity item{quantity}
      </p>
      <div className={styles.section_body}>{children}</div>
      <div
        type="submit"
        onClick={add_new_card}
        className={styles.section_footer}
      >
        <Add className={styles.section_footer__btn} />
        <p className={styles.section_footer__text}>Add a card</p>
      </div>
    </section>
  );
};

Pillar.propTypes = {
  children: PropTypes.any,
  draggable: PropTypes.bool,
  quantity: PropTypes.string,
  headTitle: PropTypes.string,
  add_new_card: PropTypes.func,
};

Pillar.defaultProps = {
  quantity: "",
  draggable: true,
  add_new_card: noop,
  headTitle: "Add Pillar title",
};

export default Pillar;

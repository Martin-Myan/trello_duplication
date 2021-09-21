import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";

import { noop } from "../../utils";
import { setColumns } from "../../store/actions";

import { ReactComponent as Add } from "../../icons/add.svg";
import { ReactComponent as Ellipsis } from "../../icons/ellipsis.svg";

import styles from "./Pillar.module.scss";

const Pillar = ({
  item,
  lines,
  index,
  columns,
  children,
  currentCard,
  tablickDrag,
  editCurrentCard,
}) => {
  const { title, id } = item;
  const dispatch = useDispatch();

  const [isDragable, setIsDragable] = useState(true);

  const dragStartHandler = () => {
    editCurrentCard(item);
    // setIsDragable(true);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();

    // setIsDragable(true);
  };

  const dragEndHandler = (e) => {
    // setIsDragable(true);
  };

  const dropHandler = (e) => {
    e.preventDefault();
    if (isDragable) {
      const dropIndex = columns.findIndex((el) => el.id === id);
      const dragIndex = columns.findIndex((el) => el.id === currentCard.id);

      const tempArray = [...columns];
      tempArray.splice(dropIndex, 0, ...tempArray.splice(dragIndex, 1));
      dispatch(setColumns(tempArray));
    }
  };

  useEffect(() => {
    // if (dragEndHandler()) {
    //   setIsDragable(true);
    // }
  }, []);

  const quantityPayment = columns?.map((item) => {
    return lines.filter((el) => el?.columnId === item.id).map((el) => el);
  });

  const quantityPaymentChangeHandler = (index) => {
    if (quantityPayment[index].length === 1) {
      return " 1";
    } else if (quantityPayment[index].length > 1) {
      return `s ${quantityPayment[index].length}`;
    } else {
      return " 0";
    }
  };

  return (
    <section
      onDrop={dropHandler}
      draggable={isDragable}
      onDragEnd={dragEndHandler}
      onDragOver={dragOverHandler}
      onDragStart={dragStartHandler}
      className={styles.section_container}
    >
      <div className={styles.head}>
        <h2 className={styles.head__title}>{title}</h2>
        <Ellipsis type="submit" className={styles.head__btn} />
      </div>
      <p className={styles.section_container__quantity}>
        Quantity item{quantityPaymentChangeHandler(index)}
      </p>
      <div className={styles.section_body}>{children}</div>
      <div className={styles.section_footer}>
        <Add className={styles.section_footer__btn} />
        <p className={styles.section_footer__text}>Add a card</p>
      </div>
    </section>
  );
};

Pillar.propTypes = {
  children: PropTypes.any,
  draggable: PropTypes.bool,
  isDraging: PropTypes.bool,
  headTitle: PropTypes.string,
  add_new_card: PropTypes.func,
};

Pillar.defaultProps = {
  isDraging: true,
  draggable: true,
  add_new_card: noop,
  headTitle: "Add Pillar title",
};

export default Pillar;

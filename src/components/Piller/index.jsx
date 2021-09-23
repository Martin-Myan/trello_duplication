import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import shortid from "shortid";

// import { useOutsideClick } from "../../hooks";
import { noop } from "../../utils";
import { setColumns, addItem } from "../../store/actions";

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
  // pillerSettings,
  draggablePiller,
  editCurrentCard,
}) => {
  const { title, id } = item;
  // const outSide = useOutsideClick();
  const dispatch = useDispatch();
  const [newValue, setNewValue] = useState("");
  const [isDragable, setIsDragable] = useState(true);
  const [draggingFunctionalItem, setDraggingFunctionalItem] = useState(false);

  useEffect(() => {
    if (draggablePiller && draggablePiller === currentCard.id) {
      setIsDragable(false);
    } else {
      setIsDragable(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [draggablePiller]);

  const dragStartHandler = () => {
    editCurrentCard(item);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const dragEndHandler = (e) => {};

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

  const changeHandler = (e) => {
    setNewValue(e.target.value);
  };

  const addNewCardHandler = () => {
    setDraggingFunctionalItem(!draggingFunctionalItem);
    if (draggingFunctionalItem) {
      if (newValue) {
        dispatch(addItem(shortid.generate(), item.id, newValue));
        setNewValue("");
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addNewCardHandler();
  };

  const pillerSettings = () => {
    console.log("objectobjectobject");
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
        <Ellipsis
          type="submit"
          onClick={pillerSettings}
          className={styles.head__btn}
        />
      </div>
      <p className={styles.section_container__quantity}>
        Quantity item{quantityPaymentChangeHandler(index)}
      </p>
      <div
        className={styles.section_body}
        style={
          draggingFunctionalItem
            ? { marginBottom: "16px", maxHeight: "69vh" }
            : null
        }
      >
        {children}
      </div>
      {draggingFunctionalItem ? (
        <form
          // ref={outSide}
          onSubmit={submitHandler}
          className={styles.section_container__add}
        >
          <input
            type="text"
            value={newValue}
            onChange={changeHandler}
            placeholder="Enter a title for this card…"
            className={styles.section_container__add__new_value}
          />
        </form>
      ) : null}
      <button onClick={addNewCardHandler} className={styles.section_footer}>
        {draggingFunctionalItem ? null : (
          <Add className={styles.section_footer__btn} />
        )}
        <p className={styles.section_footer__text}>
          {draggingFunctionalItem ? "Closing added component" : "Add a card"}
        </p>
      </button>
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

import React, { useState, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import shortid from "shortid";

import { noop } from "../../utils";
import { useOutsideClick } from "../../hooks";
import { setPiller, addItem, deletePiller } from "../../store/actions";

import { ReactComponent as Add } from "../../icons/add.svg";
import { ReactComponent as Delete } from "../../icons/delete.svg";
import { ReactComponent as EditPillerTitle } from "../../icons/edit_piller_title.svg";

import styles from "./Pillar.module.scss";

const Pillar = ({
  item,
  lines,
  index,
  piller,
  children,
  currentCard,
  // pillerSettings,
  draggablePiller,
  editCurrentCard,
}) => {
  const { title, id } = item;

  const dispatch = useDispatch();
  const settingsRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [isDragable, setIsDragable] = useState(true);
  const [draggingFunctionalItem, setDraggingFunctionalItem] = useState(false);

  const refering = () => {
    setIsOpen(false);
    setDraggingFunctionalItem(false);
    setIsOpen(false);
  };

  useOutsideClick(settingsRef, () => refering());

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
      const dropIndex = piller.findIndex((el) => el.id === id);
      const dragIndex = piller.findIndex((el) => el.id === currentCard.id);

      const tempArray = [...piller];
      tempArray.splice(dropIndex, 0, ...tempArray.splice(dragIndex, 1));
      dispatch(setPiller(tempArray));
    }
  };

  const quantityPayment = piller?.map((item) => {
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
      if (newValue.trim()) {
        dispatch(addItem(shortid.generate(), item.id, newValue));
        setNewValue("");
      } else if (newValue.trim() === "") {
        setNewValue("");
      }
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    addNewCardHandler();
  };

  const delteHandler = () => {
    if (isOpen) {
      dispatch(deletePiller(item.id));
    }
  };

  const pillerSettings = () => {
    setIsOpen(!isOpen);
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
        <div ref={settingsRef}>
          <button
            onClick={pillerSettings}
            className={styles.head__piller_setting}
          >
            • • •
          </button>
          {isOpen ? (
            <div>
              <Delete
                role="button"
                onClick={delteHandler}
                className={styles.head__btn}
              />
              <EditPillerTitle
                role="button"
                onClick={pillerSettings}
                className={styles.head__edit_btn}
              />

              {/* <div className={styles.head__dropDown}>
                <button
                  onClick={delteHandler}
                  className={styles.head__dropDown_yes}
                >
                  Yes delete
                </button>
                <button
                  onClick={pillerSettings}
                  className={styles.head__dropDown_cancle}
                >
                  Cancle
                </button>
              </div> */}
            </div>
          ) : null}
        </div>
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
          ref={settingsRef}
          onSubmit={submitHandler}
          className={styles.section_container__add}
        >
          <input
            type="text"
            value={newValue}
            onChange={changeHandler}
            placeholder="Enter a title for this card • • •"
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
  item: PropTypes.object,
  lines: PropTypes.array,
  index: PropTypes.number,
  piller: PropTypes.array,
  children: PropTypes.any,
  draggable: PropTypes.bool,
  isDraging: PropTypes.bool,
  currentCard: PropTypes.object,
  editCurrentCard: PropTypes.func,
  draggablePiller: PropTypes.any,
};

Pillar.defaultProps = {
  item: {},
  lines: [],
  piller: [],
  isDraging: true,
  draggable: true,
  currentCard: {},
  editCurrentCard: noop,
};

export default Pillar;

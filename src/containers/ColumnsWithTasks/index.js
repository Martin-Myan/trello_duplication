import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import shortid from "shortid";

import { Piller, Lines } from "../../components";
import { editLines, addColumn } from "../../store/actions";
import { ReactComponent as Add } from "../../icons/add.svg";

import styles from "./ColumnsWithTasks.module.scss";

const ColumnsWithTasks = () => {
  const dispatch = useDispatch();

  const [addTitle, setAddTitle] = useState("");
  const [currentCard, setCurrentCard] = useState(null);
  const [currentLines, setCurrentLines] = useState("");
  const [draggablePiller, setDraggablePiller] = useState(null);
  const [addTitlePosition, setAddTitlePosition] = useState(false);

  const columns = useSelector((store) => store.main.columns);
  const lines = useSelector((store) => store.main.lines);

  const changeHandler = (e) => {
    setAddTitle(e.target.value);
  };

  const addPiller = () => {
    setAddTitlePosition(!addTitlePosition);

    if (addTitle.trim()) {
      dispatch(addColumn(shortid.generate(), addTitle));
      setAddTitle("");
    }
  };

  const editCurrentCardHandler = (card) => {
    setCurrentCard(card);
  };

  const dragStartHandler = (e, el) => {
    setDraggablePiller(el.columnId);
  };

  const dropHandler = (e, el) => {
    e.preventDefault();
    setCurrentLines(el.columnId);
  };

  const dragEndHandler = (e, el, item) => {
    setCurrentLines(item.id);
    setDraggablePiller(el.id);
    dispatch(editLines(el.id, currentLines));
  };

  const renderItemsToPuller = columns.map((item, index) => {
    return (
      <Piller
        item={item}
        key={item.id}
        index={index}
        lines={lines}
        columns={columns}
        currentCard={currentCard}
        draggablePiller={draggablePiller}
        editCurrentCard={editCurrentCardHandler}
      >
        {lines
          .filter((element) => element?.columnId === item.id)
          .map((el) => {
            return (
              <Lines
                el={el}
                key={el.id}
                // dragableClick
                text={el.description}
                onDrop={(e) => dropHandler(e, el)}
                onDragStart={(e) => dragStartHandler(e, el)}
                onDragEnd={(e) => dragEndHandler(e, el, item)}
              />
            );
          })}
      </Piller>
    );
  });

  return (
    <div className={styles.piller_container}>
      {renderItemsToPuller}

      <form
        onSubmit={(e) => e.preventDefault()}
        className={styles.piller_container__frm}
      >
        {addTitlePosition ? (
          <>
            <input
              value={addTitle}
              onChange={changeHandler}
              placeholder="Enter list title ..."
              className={styles.piller_container__frm__inp}
            />
            <button
              onClick={addPiller}
              className={styles.piller_container__frm__btn}
            >
              Save
            </button>
          </>
        ) : (
          <button
            onClick={addPiller}
            className={styles.piller_container__frm__add_piller}
          >
            <Add className={styles.piller_container__frm__add_piller__icon} />
            <p className={styles.piller_container__frm__add_piller__text}>
              Add another list
            </p>
          </button>
        )}
      </form>
    </div>
  );
};

export default ColumnsWithTasks;

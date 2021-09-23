import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import shortid from "shortid";

import { Piller, Lines } from "../../components";
import { editLines, addColumn } from "../../store/actions";
import { ReactComponent as Add } from "../../icons/add.svg";

import styles from "./ColumnsWithTasks.module.scss";

const ColumnsWithTasks = () => {
  const dispatch = useDispatch();

  const [currentCard, setCurrentCard] = useState(null);
  const [draggablePiller, setDraggablePiller] = useState(null);
  const [currentLines, setCurrentLines] = useState();

  const columns = useSelector((store) => store.main.columns);
  const lines = useSelector((store) => store.main.lines);

  const addPiller = () => {
    dispatch(addColumn(shortid.generate(), columns.length + 1 + " Section"));
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
    setDraggablePiller(null);
    dispatch(editLines(el.id, currentLines));
  };

  const renderItemsToPuller = columns.map((item, index) => {
    return (
      <Piller
        key={item.id}
        item={item}
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
      <button
        onClick={addPiller}
        className={styles.piller_container__add_piller}
      >
        <Add className={styles.piller_container__add_piller__icon} />
        <p className={styles.piller_container__add_piller__text}>
          Add another list
        </p>
      </button>
    </div>
  );
};

export default ColumnsWithTasks;

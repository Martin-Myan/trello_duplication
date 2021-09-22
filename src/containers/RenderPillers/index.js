import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

import { editLines } from "../../store/actions";
import { Piller, Lines } from "../../components";

import styles from "./RenderPiller.module.scss";

const RenderPiller = () => {
  const dispatch = useDispatch();

  const [currentCard, setCurrentCard] = useState(null);
  const [isItemDragable, setIsItemDragable] = useState(true);
  const [draggablePiller, setDraggablePiller] = useState(null);

  const columns = useSelector((store) => store.main.columns);
  const lines = useSelector((store) => store.main.lines);

  const editCurrentCardHandler = (card) => {
    setCurrentCard(card);
  };

  const dragChildStartHandler = (e, el) => {
    setDraggablePiller(el.columnId);
  };

  const dragChildOverHandler = (e) => {
    e.preventDefault();
  };

  const dropChildHandler = (e, el) => {
    e.preventDefault();
    dispatch(editLines(el.columnId, ""));
    console.log(el.columnId, "el.columnId,");
  };

  const dragChildEndHandler = (e, el) => {
    setDraggablePiller(null);
    dispatch(editLines("", el.id));
    console.log(el.id, "el.id");
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
          .filter((el) => el?.columnId === item.id)
          .map((el) => (
            <Lines
              key={el.id}
              idNumber={el.id}
              text={el.description}
              draggable={isItemDragable}
              onDrop={(e) => dropChildHandler(e, el)}
              onDragStart={(e) => dragChildStartHandler(e, el)}
              onDragOver={(e) => dragChildOverHandler(e, el)}
              onDragEnd={(e) => dragChildEndHandler(e, el)}
            />
          ))}
      </Piller>
    );
  });

  return <div className={styles.piller_container}>{renderItemsToPuller}</div>;
};

export default RenderPiller;

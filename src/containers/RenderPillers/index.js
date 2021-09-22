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
  const [currentLines, setCurrentLines] = useState(null);

  const columns = useSelector((store) => store.main.columns);
  const lines = useSelector((store) => store.main.lines);

  const editCurrentCardHandler = (card) => {
    setCurrentCard(card);
  };

  const dragStartHandler = (e, el) => {
    console.log(e, el, "dragStartHandler");
    setDraggablePiller(el.columnId);
  };
  const dropHandler = (e, el) => {
    console.log(e, el, "dropHandler");
    e.preventDefault();
    setCurrentLines(el.columnId);
  };
  const dragOverHandler = (e) => {
    // console.log(e, "dragOverHandler");
    e.preventDefault();
  };
  const dragEndHandler = (e, el) => {
    console.log(e, el, "dragEndHandler");
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
          .filter((el) => el?.columnId === item.id)
          .map((el) => (
            <Lines
              key={el.id}
              text={el.description}
              draggable={isItemDragable}
              onDrop={(e) => dropHandler(e, el)}
              onDragStart={(e) => dragStartHandler(e, el)}
              onDragOver={(e) => dragOverHandler(e, el)}
              onDragEnd={(e) => dragEndHandler(e, el)}
            />
          ))}
      </Piller>
    );
  });

  return <div className={styles.piller_container}>{renderItemsToPuller}</div>;
};

export default RenderPiller;

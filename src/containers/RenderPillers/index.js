import React, { useState } from "react";
import { useSelector } from "react-redux";

import { Piller, Lines } from "../../components";

import styles from "./RenderPiller.module.scss";

const RenderPiller = () => {
  const [currentCard, setCurrentCard] = useState(null);
  const [isItemDragable, setIsItemDragable] = useState(true);
  const [draggablePiller, setDraggablePiller] = useState(null);

  const [tablickDrag, setTablickDrag] = useState(true);

  const columns = useSelector((store) => store.main.columns);
  const lines = useSelector((store) => store.main.lines);

  const editCurrentCardHandler = (card) => {
    setCurrentCard(card);
    // setIsItemDragable(false);
  };

  // useEffect(() => {
  //   setIsItemDragable(true);
  // }, [columns]);

  //////////////
  const dragChildStartHandler = (e, el) => {
    console.log(el);
    setDraggablePiller(el.columnId);
    // if (el) {
    //   setTablickDrag(false);
    // }
  };

  const dragChildOverHandler = (e) => {
    e.preventDefault();
    // setIsItemDragable(false);
  };

  const dropChildHandler = (e, el) => {
    e.preventDefault();
    // setIsItemDragable(false);
  };

  const dragChildEndHandler = (e, el) => {
    setDraggablePiller(null);

    // setIsItemDragable(false);
    // console.log(el, "dragChildEndHandler");
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

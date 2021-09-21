import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Piller, Lines } from "../../components";

import { setColumns } from "../../store/actions";

import styles from "./RenderPiller.module.scss";

const RenderPiller = () => {
  const dispatch = useDispatch();

  const [currentCard, setCurrentCard] = useState(null);
  const [isDragable, setIsDragable] = useState(true);
  const [isItemDragable, setIsItemDragable] = useState(true);

  const columns = useSelector((store) => store.main.columns);
  const items = useSelector((store) => store.main.items);

  // console.log({ columns, items });

  const addNewCard = () => {};
  ////columns.id    items.columnId
  const dragStartHandler = (e, item) => {
    setIsItemDragable(false);
    setCurrentCard(item);
  };

  const dragOverHandler = (e) => {
    e.preventDefault();
    // console.log(e);
  };

  const dragEndHandler = (e) => {
    setIsItemDragable(true);
  };

  const dropHandler = (e, item) => {
    e.preventDefault();
    if (isDragable) {
      const dropIndex = columns.findIndex((el) => el?.id === item?.id);
      const dragIndex = columns.findIndex((el) => el?.id === currentCard?.id);

      let tempArray = [...columns];
      tempArray.splice(dropIndex, 0, ...tempArray.splice(dragIndex, 1));
      dispatch(setColumns(tempArray));
    }
  };

  const dragChildStartHandler = (el) => {
    setIsDragable(false);
  };

  const dragChildOverHandler = (e) => {
    e.preventDefault();
  };

  const dropChildHandler = (e, el) => {
    e.preventDefault();
    console.log(el, "start");
  };
  const dragChildEndHandler = (e) => {
    setIsDragable(true);
  };

  const quantityPayment = columns?.map((item) => {
    return items.filter((el) => el?.columnId === item.id).map((el) => el);
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

  const renderItemsToPuller = columns?.map((item, index) => {
    return (
      <Piller
        key={item.id}
        draggable={isDragable}
        headTitle={item.title}
        id={item.id}
        add_new_card={addNewCard}
        quantity={quantityPaymentChangeHandler(index)}
        onDrop={(e) => dropHandler(e, item)}
        onDragStart={(e) => dragStartHandler(e, item)}
        onDragOver={(e) => dragOverHandler(e)}
        onDragEnd={(e) => dragEndHandler(e, item)}
      >
        {items
          .filter((el) => el?.columnId === item.id)
          .map((el) => (
            <Lines
              key={el?.id}
              idNumber={el.id}
              text={el.description}
              draggable={isItemDragable}
              onDrop={(e) => dropChildHandler(e, el)}
              onDragStart={(e) => dragChildStartHandler(e, item)}
              onDragOver={(e) => dragChildOverHandler(e)}
              onDragEnd={(e) => dragChildEndHandler(e, item)}
            />
          ))}
      </Piller>
    );
  });

  return <div className={styles.piller_container}>{renderItemsToPuller}</div>;
};

export default RenderPiller;

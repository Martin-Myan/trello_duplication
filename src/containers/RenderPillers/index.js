import React, { useState /*, useEffect*/ } from "react";
// import Dragula from "react-dragula";

import { Piller, Lines } from "../../components";
import { trelloItems, tasckItem } from "../../utils/index";

import styles from "./RenderPiller.module.scss";

const RenderPiller = () => {
  // const dragulaArray = Dragula({ containers: trelloItems }).containers;
  // const [pillerIDhook, setPillerIDhook] = useState("");
  // const [pillerIDsecondeHook, setPillerIDsecondeHook] = useState("");
  const [dragulaArray, setDragulaArray] = useState(trelloItems); ///setCardList cardList
  const [currentCard, setCurrentCard] = useState(null);

  const [boards, setBoards] = useState(tasckItem);
  // const [currentItem, setCurrentItem] = useState(null);

  const addNewCard = () => {};

  // id  idNumber
  // order      title
  // card      item
  //card.text   item.title

  const dragStartHandler = (e, item) => {
    setCurrentCard(item);
  };

  // const dragEndHandler = (e) => {};

  const dragOverHandler = (e) => {
    e.preventDefault();
  };

  const dropHandler = (e, item) => {
    e.preventDefault();
    setDragulaArray(
      dragulaArray.map((c) => {
        if (c.idNumber === item.idNumber) {
          return { ...c, title: currentCard.title };
        }
        if (c.idNumber === currentCard.idNumber) {
          return { ...c, title: item.title };
        }
        return c;
      })
    );
  };

  const dragChildOverHandler = (e, boards, el) => {
    e.preventDefault();
  };
  const dragChildStartHandler = () => {};
  const dragChildEndHandler = () => {};
  const dragChildLeavHandler = () => {};
  const dropChildHandler = (e, boards, el) => {
    e.preventDefault();
  };

  // const renderMixedArray = () => {
  //   for (let i = 0; i < dragulaArray.length; i++) {
  //     if (dragulaArray[i].idNumber === pillerIDhook) {
  //       for (let e = 0; e < dragulaArray.length; e++) {
  //         if (dragulaArray[e].idNumber === pillerIDsecondeHook) {
  //           console.log(i, e);
  //           return ([dragulaArray[i], dragulaArray[e]] = [
  //             dragulaArray[e],
  //             dragulaArray[i],
  //           ]);
  //         }
  //       }
  //     }
  //   }
  // };
  // renderMixedArray();

  // useEffect(() => {
  // setPillerIDhook("");
  // setPillerIDsecondeHook("");
  // }, []);

  const renderItemsToPuller = dragulaArray?.map((item) => {
    const quantityPayment = () => {
      if (tasckItem.length === 1) {
        return " 1";
      } else if (tasckItem.length > 1) {
        return `s ${tasckItem.length}`;
      } else {
        return " 0";
      }
    };

    return (
      <Piller
        key={item.idNumber}
        headTitle={item.title}
        add_new_card={addNewCard}
        quantity={quantityPayment()}
        //
        onDragStart={(e) => dragStartHandler(e, item)}
        // onDragLeave={(e) => dragEndHandler(e)}
        // onDragEnd={(e) => dragEndHandler(e)}
        onDragOver={(e) => dragOverHandler(e)}
        onDrop={(e) => dropHandler(e, item)}
      >
        {boards.map((el) => (
          <Lines
            onDragOver={(e) => dragChildOverHandler(e, boards, el)}
            onDragLeave={(e) => dragChildLeavHandler(e)}
            onDragStart={(e) => dragChildStartHandler(e, item)}
            onDragEnd={(e) => dragChildEndHandler(e)}
            onDrop={(e) => dropChildHandler(e, boards, el)}
            text={el.text}
            key={el.idNumber}
            idNumber={el.idNumber}
          />
        ))}
      </Piller>
    );
  });

  return <div className={styles.piller_container}>{renderItemsToPuller}</div>;
};

export default RenderPiller;

import React, { useState, useEffect } from "react";
import shortid from "shortid";

import { ReactComponent as UserArrow } from "../../icons/userclickicon.svg";

import styles from "./DropDown.module.scss";

const DropDown = ({ renderRow }) => {
  const [active, setActive] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeValue, setActiveValue] = useState(0);

  useEffect(() => {
    setActive(renderRow);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const BBB = () => {
    setIsOpen(!isOpen);
  };

  const FFF = (index) => {
    setIsOpen(!isOpen);
    setActiveValue(index);
  };

  const renerDropDown = active?.map(({ title }, index) => (
    <button
      key={shortid.generate()}
      onClick={() => FFF(index)}
      className={styles.drop_down__tablcik__items}
    >
      {title}
    </button>
  ));

  return (
    <div className={styles.drop_down}>
      <button
        onClick={BBB}
        value={active[activeValue]?.value}
        className={styles.drop_down__btn}
      >
        {active[activeValue]?.title}
        <UserArrow className={styles.drop_down__btn__arrow} />
      </button>
      {isOpen ? (
        <div className={styles.drop_down__tablcik}>{renerDropDown}</div>
      ) : null}
    </div>
  );
};

export default DropDown;

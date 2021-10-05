import React, { useState, useMemo } from "react";
import shortid from "shortid";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Droppable, Draggable } from "react-beautiful-dnd";

import { addItem, deletePiller /*setPiller*/ } from "../../store/actions";

import Lines from "../Lines";
import { ReactComponent as Add } from "../../icons/add.svg";
import { ReactComponent as Delete } from "../../icons/delete.svg";
import { ReactComponent as EditPillerTitle } from "../../icons/edit_piller_title.svg";

import styles from "./Pillar.module.scss";

const Pillar = ({ column, index, tasks }) => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [draggingFunctionalItem, setDraggingFunctionalItem] = useState(false);

  const InnerList = ({ tasks }) => {
    const taksList = useMemo(
      () =>
        tasks.map((task, index) => (
          <Lines key={task.id} task={task} index={index} />
        )),
      [tasks]
    );

    return taksList;
  };

  const addNewCardHandler = () => {
    setDraggingFunctionalItem(!draggingFunctionalItem);

    if (draggingFunctionalItem) {
      if (newValue.trim()) {
        dispatch(addItem(shortid.generate(), newValue, column.id));
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

  const changeHandler = (e) => {
    setNewValue(e.target.value);
  };

  const pillerSettings = () => {
    setIsOpen(!isOpen);
  };
  const delteHandler = () => {
    if (isOpen) {
      dispatch(deletePiller(shortid.generate()));
    }
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={styles.column_cont}
        >
          <div
            className={styles.column_cont_block}
            {...provided.dragHandleProps}
          >
            <h2 className={styles.column_cont_block__title}>{column.title}</h2>
            <button
              onClick={pillerSettings}
              className={styles.column_cont_block_settings}
            >
              {isOpen ? null : "• • •"}
              {isOpen ? (
                <div className={styles.head}>
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
                </div>
              ) : null}
            </button>
          </div>
          <Droppable droppableId={column.id} type="task">
            {(provided /*, snapshot*/) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                // isDraggingOver={snapshot.isDraggingOver}
                className={styles.column_cont_tasck_list}
              >
                <InnerList tasks={tasks} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {draggingFunctionalItem ? (
            <form
              onSubmit={submitHandler}
              className={styles.section_container__add}
            >
              <input
                autoFocus
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
              {draggingFunctionalItem
                ? "Closing added component"
                : "Add a card"}
            </p>
          </button>
        </div>
      )}
    </Draggable>
  );
};

Pillar.propTypes = {
  tasks: PropTypes.array,
  props: PropTypes.object,
};

Pillar.defaultProps = {
  tasks: [],
  props: {},
};

export default Pillar;

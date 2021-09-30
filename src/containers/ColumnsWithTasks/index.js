import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useSelector, useDispatch } from "react-redux";
import shortid from "shortid";

import { Piller } from "../../components";
import { addPiller } from "../../store/actions";
import { ReactComponent as Add } from "../../icons/add.svg";

import styles from "./ColumnsWithTasks.module.scss";

const ColumnsWithTasks = () => {
  const dispatch = useDispatch();

  const lines = useSelector((store) => store.main);

  const [dataBase, setDataBase] = useState(lines);
  const [addTitle, setAddTitle] = useState("");
  const [addTitlePosition, setAddTitlePosition] = useState(false);

  const InnerList = (props) => {
    const { column, taskMap, index } = props;

    const tasks = column.taskIds.map((taskId) => taskMap[taskId]);

    return <Piller column={column} tasks={tasks} index={index} />;
  };

  useEffect(() => {
    setDataBase(lines);
  }, [lines]);

  const onDragStart = (start, provided) => {
    provided.announce(
      `You have lifted the task in position ${start.source.index + 1}`
    );
  };

  const onDragUpdate = (update, provided) => {
    const message = update.destination
      ? `You have moved the task to position ${update.destination.index + 1}`
      : `You are currently not over a droppable area`;

    provided.announce(message);
  };

  const onDragEnd = (result, provided) => {
    const message = result.destination
      ? `You have moved the task from position
        ${result.source.index + 1} to ${result.destination.index + 1}`
      : `The task has been returned to its starting position of
        ${result.source.index + 1}`;

    provided.announce(message);

    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(dataBase.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...dataBase,
        columnOrder: newColumnOrder,
      };
      setDataBase(newState);
      return;
    }

    const home = dataBase.columns[source.droppableId];
    const foreign = dataBase.columns[destination.droppableId];

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newHome = {
        ...home,
        taskIds: newTaskIds,
      };

      const newState = {
        ...dataBase,
        columns: {
          ...dataBase.columns,
          [newHome.id]: newHome,
        },
      };

      setDataBase(newState);
      return;
    }

    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    foreignTaskIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds,
    };

    const newState = {
      ...dataBase,
      columns: {
        ...dataBase.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };
    setDataBase(newState);
  };

  const changeHandler = (e) => {
    setAddTitle(e.target.value);
  };

  const addPillerHandler = () => {
    setAddTitlePosition(!addTitlePosition);

    if (addTitlePosition && addTitle.trim()) {
      dispatch(addPiller(shortid.generate(), addTitle));
      setAddTitle("");
    }
  };

  const addNewPillerHandler = (e) => {
    e.preventDefault();
    addPillerHandler();
  };

  return (
    <DragDropContext
      onDragStart={onDragStart}
      onDragUpdate={onDragUpdate}
      onDragEnd={onDragEnd}
    >
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            className={styles.piller_container}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {dataBase.columnOrder.map((columnId, index) => {
              const column = dataBase.columns[columnId];
              return (
                <InnerList
                  key={column.id}
                  column={column}
                  taskMap={dataBase.tasks}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
            <form
              onSubmit={addNewPillerHandler}
              className={styles.add_new_piller}
            >
              {addTitlePosition ? (
                <>
                  <input
                    autoFocus
                    value={addTitle}
                    onChange={changeHandler}
                    placeholder="Enter list title • • •"
                    className={styles.add_new_piller__inp}
                  />
                  <button type="submit" className={styles.add_new_piller__btn}>
                    Save
                  </button>
                </>
              ) : (
                <button
                  onClick={addPillerHandler}
                  className={styles.piller_container__frm__add_piller}
                >
                  <Add
                    className={styles.piller_container__frm__add_piller__icon}
                  />
                  <p className={styles.piller_container__frm__add_piller__text}>
                    Add another list
                  </p>
                </button>
              )}
            </form>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ColumnsWithTasks;

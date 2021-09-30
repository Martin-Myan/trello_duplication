import React, { useMemo } from "react";
import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";

import Lines from "../Lines";

import styles from "./Pillar.module.scss";

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

const Pillar = (props) => {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={styles.column_cont}
        >
          <h2
            className={styles.column_cont__title}
            {...provided.dragHandleProps}
          >
            {props.column.title}
          </h2>
          <Droppable droppableId={props.column.id} type="task">
            {(provided /*, snapshot*/) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                // isDraggingOver={snapshot.isDraggingOver}
                className={styles.column_cont_tasck_list}
              >
                <InnerList tasks={props.tasks} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
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

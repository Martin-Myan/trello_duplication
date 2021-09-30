import React from "react";
import PropTypes from "prop-types";
import { Draggable } from "react-beautiful-dnd";

// import { ReactComponent as Delete } from "../../icons/deleteicon.svg";

import styles from "./Lines.module.scss";

const Lines = (props) => {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided /*, snapshot*/) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          //   isDragging={snapshot.isDragging}
          className={styles.column_container}
          aria-roledescription="Press space bar to lift the task"
        >
          {props.task.content}
        </div>
      )}
    </Draggable>
  );
};

Lines.propTypes = {
  props: PropTypes.object,
};

Lines.defaultProps = {
  props: {},
};

export default Lines;

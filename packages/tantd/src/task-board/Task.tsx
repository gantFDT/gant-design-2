import React, { useContext, useCallback } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import TaskBoardContext from './Context';

const boxShadowColor = 'rgba(0, 0, 0, 0.2) 2px 2px 1px';

const Task = (props) => {
  const { task, column, index } = props;

  const { prefixCls, config, hightLightWords, renderItem, highlightTasksBy } = useContext(TaskBoardContext);
  const { idKey, taskNameKey, taskDragDisabled } = config;

  const fn = useCallback(
    (keywords, task) => {
      if (!highlightTasksBy) {
        return task[taskNameKey as string].indexOf(keywords) < 0;
      }
      return highlightTasksBy(keywords, task);
    },
    [taskNameKey, highlightTasksBy],
  );

  return (
    <Draggable draggableId={task[idKey as string]} index={index} isDragDisabled={taskDragDisabled}>
      {(provided, snapshot) => (
        <div
          className={prefixCls + '-task-container-wrapper'}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <div
            className={prefixCls + '-task-container'}
            style={{
              boxShadow: `${snapshot.isDragging ? boxShadowColor : ''}`,
              opacity: hightLightWords && fn(hightLightWords, task) ? 0.4 : 1,
            }}
          >
            <div>
              {renderItem ? renderItem(task, column) : <div style={{ padding: 8 }}>{task[taskNameKey as string]}</div>}
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default Task;

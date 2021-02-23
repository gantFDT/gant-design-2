import React, { useContext, memo } from 'react';
import { Tooltip } from 'antd';
import { isEqual, isEmpty } from 'lodash';
import { PlusOutlined } from '@ant-design/icons';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskBoardContext from './Context';
import Task from './Task';

const InnerTasksList = (props) => {
  const { tasks, ...nextProps } = props;
  if (isEmpty(tasks)) return null;
  return tasks.map((task, key) => <Task key={key} task={task} index={key} {...nextProps} />);
};

const TaskList = memo(InnerTasksList, isEqual);

const Column = (props) => {
  const { column, tasks, index, ...nextProps } = props;
  const { prefixCls, config, renderHeader, renderExtra, handleAddBtn } = useContext(TaskBoardContext);
  const { idKey, titleKey, hideQuickAdd, columnDragDisabled, taskDropDisabled } = config;

  return (
    <Draggable index={index} draggableId={column[idKey as string]} isDragDisabled={columnDragDisabled}>
      {(provided, snapshot) => (
        <div className={prefixCls + '-column-wrapper'} ref={provided.innerRef} {...provided.draggableProps}>
          <div
            className={prefixCls + '-column-container'}
            style={{
              boxShadow: `${snapshot.isDragging ? 'rgba(0, 0, 0, 0.2) 2px 2px 1px' : ''}`,
            }}
          >
            <div {...provided.dragHandleProps}>
              {renderHeader === null ? null : renderHeader ? (
                renderHeader(column)
              ) : (
                <div className={prefixCls + '-column-header-wrapper'}>
                  <Tooltip title={column[titleKey as string]} mouseEnterDelay={0.3} placement="topLeft">
                    <div className={prefixCls + '-column-header-title'}>
                      {column[titleKey as string]}
                      {tasks && tasks.length > 0 ? `(${tasks.length})` : null}
                    </div>
                  </Tooltip>
                  <div className={prefixCls + '-column-header-extra'}>{renderExtra && renderExtra(column)}</div>
                </div>
              )}
            </div>
            <Droppable droppableId={column[idKey as string]} type="task" isDropDisabled={taskDropDisabled}>
              {(provided, snapshot) => (
                <div className={prefixCls + '-task-drop-inner'} ref={provided.innerRef} {...provided.droppableProps}>
                  <TaskList tasks={tasks} column={column} {...nextProps} />
                  {provided.placeholder}
                  {!hideQuickAdd && (
                    <div
                      className={prefixCls + '-quick-add'}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddBtn && handleAddBtn(column);
                      }}
                    >
                      <PlusOutlined />
                    </div>
                  )}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
};
export default Column;

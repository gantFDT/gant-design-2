import React from 'react';
import classnames from 'classnames';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import TaskBoardContext from './Context';
import Column from './Column';
import type { Config, DefaultProps } from './interface';

export interface TaskBoardProps<T> extends DefaultProps {
  className?: string;
  config?: Config;
  dataSource: T[];
  onBeforeDragStart?: (result) => void;
  onDragStart?: (result) => void;
  onDragUpdate?: (result) => void;
  onDragEnd: (result) => void;
}

const ColumnsList = React.memo((props: any) => <Column {...props} />);

function TaskBoard<T>(props: TaskBoardProps<T>) {
  const {
    prefixCls: customizePrefixCls = 'gant',
    className,
    dataSource = [],
    config,
    hightLightWords,
    renderHeader,
    renderExtra,
    renderItem,
    highlightTasksBy,
    handleAddBtn,
    onBeforeDragStart,
    onDragStart,
    onDragUpdate,
    onDragEnd,
    ...restProps
  } = props;

  const {
    idKey = 'id',
    titleKey = 'title',
    childrenKey = 'children',
    taskNameKey = 'name',
    columnDropDisabled,
    ...restConfig
  } = config || {};

  const prefixCls = customizePrefixCls + '-taskboard';

  const ContextValue = {
    hightLightWords,
    config: { idKey, titleKey, taskNameKey, ...restConfig },
    renderHeader,
    renderExtra,
    renderItem,
    highlightTasksBy,
    handleAddBtn,
  };

  return (
    <TaskBoardContext.Provider value={{ ...ContextValue, prefixCls }}>
      <DragDropContext
        onBeforeDragStart={onBeforeDragStart}
        onDragStart={onDragStart}
        onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
      >
        <Droppable droppableId="all-columns" direction="horizontal" type="column" isDropDisabled={columnDropDisabled}>
          {(provided, snapshot) => (
            <div className={classnames(prefixCls, className)}>
              <div className={prefixCls + '-drag-drop-content'} ref={provided.innerRef} {...provided.droppableProps}>
                {dataSource.map((item, index) => {
                  return (
                    <ColumnsList
                      key={item[idKey]}
                      index={index}
                      column={item}
                      tasks={item[childrenKey as string]}
                      {...restProps}
                    />
                  );
                })}
                {provided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </TaskBoardContext.Provider>
  );
}

export default TaskBoard;

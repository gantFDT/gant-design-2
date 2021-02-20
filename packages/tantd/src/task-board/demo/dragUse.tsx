/**
 *
 * title.zh-CN: 拖拽功能
 * desc.zh-CN: 相关拖拽函数暴露与拖拽禁用，支持键盘拖拽操作。
 */
import React, { useState } from 'react';
import _ from 'lodash';
import { TaskBoard } from 'tantd';
import { Radio } from 'antd';

const describeStyle: React.CSSProperties = { fontWeight: 'bold', border: '1px solid' };

export default () => {
  const [columnKey, setColumn] = useState('default');
  const [dragDropData, setData] = useState([
    {
      title: '拖拽1',
      id: 'column_1',
      children: [
        {
          name: '任务-1',
          id: '1',
        },
        {
          name: '任务-2',
          id: '2',
        },
        {
          name: '任务-3',
          id: '3',
        },
      ],
    },
    {
      title: '拖拽2',
      id: 'column_2',
      children: [],
    },
  ]);
  function onBeforeDragStart(result) {
    console.log('拖拽开始前=', result);
  }
  function onDragStart(result) {
    console.log('开始拖拽=', result);
  }
  function onDragUpdate(result) {
    console.log('拖拽位置发生更新变化时=', result);
  }
  function onDragEnd(result) {
    console.log('拖拽结束=', result);
    const { destination, source, draggableId, type } = result;
    if (!destination) return;
    let startIndex = source.index;
    let endIndex = destination.index;
    if (destination.droppableId == source.droppableId && endIndex == startIndex) return;
    //column拖拽
    if (type == 'column') {
      let target = dragDropData[startIndex];
      let cloneData = _.cloneDeep(dragDropData);
      cloneData.splice(startIndex, 1);
      cloneData.splice(endIndex, 0, target);
      setData(cloneData);
      return;
    }
    //同一column组内任务拖拽
    if (destination.droppableId == source.droppableId) {
      let nowColIndex = dragDropData.findIndex((col) => col.id == source.droppableId);
      let nowCol = dragDropData[nowColIndex];
      let nowTasks = _.cloneDeep(nowCol.children);
      nowTasks.splice(startIndex, 1);
      nowTasks.splice(endIndex, 0, nowCol.children[startIndex]);
      nowCol.children = nowTasks;
      let cloneData = _.cloneDeep(dragDropData);
      cloneData[nowColIndex] = nowCol;
      setData(cloneData);
    } else {
      let startColumnIndex = dragDropData.findIndex((col) => col.id == source.droppableId);
      let endColumnIndex = dragDropData.findIndex((col) => col.id == destination.droppableId);
      let target = dragDropData[startColumnIndex].children[startIndex];
      let cloneData = _.cloneDeep(dragDropData);
      cloneData[startColumnIndex].children.splice(startIndex, 1);
      cloneData[endColumnIndex].children.splice(endIndex, 0, target);
      setData(cloneData);
    }
  }
  return (
    <div>
      <div>
        <p>相关拖拽函数暴露与拖拽禁用</p>
        <p>支持键盘拖拽操作:</p>
        <div>
          <span>
            <span style={describeStyle}>tab</span>切换拖拽项，
          </span>
          <span>
            <span style={describeStyle}>(↑ + ↓ + ← + →)</span>移动，
          </span>
          <span>
            <span style={describeStyle}>(tab + shift)</span>向后回退，
          </span>
          <span>
            <span style={describeStyle}>space</span>放下拖拽项，
          </span>
          <span>
            <span style={describeStyle}>esc</span>取消拖动
          </span>
        </div>
      </div>
      <div style={{ margin: '10px 0' }}>
        <Radio.Group
          value={columnKey}
          onChange={(e) => {
            setColumn(e.target.value);
          }}
        >
          <Radio.Button value="default">默认</Radio.Button>
          <Radio.Button value="column-drag">禁止column拖拽</Radio.Button>
          <Radio.Button value="column-drop">禁止column放置</Radio.Button>
          <Radio.Button value="task-drag">禁止task拖拽</Radio.Button>
          <Radio.Button value="task-drop">禁止task放置</Radio.Button>
        </Radio.Group>
      </div>
      <TaskBoard
        dataSource={dragDropData}
        //拖拽函数
        // onBeforeDragStart={onBeforeDragStart}
        // onDragStart={onDragStart}
        // onDragUpdate={onDragUpdate}
        onDragEnd={onDragEnd}
        //拖拽禁用
        isColumnDragDisabled={columnKey == 'column-drag'}
        isColumnDropDisabled={columnKey == 'column-drop'}
        isTaskDragDisabled={columnKey == 'task-drag'}
        isTaskDropDisabled={columnKey == 'task-drop'}
      />
    </div>
  );
};

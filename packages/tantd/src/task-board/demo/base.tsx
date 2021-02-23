/**
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 相关配置功能展示,dataSource的数据表标识为id,可通过idKey进行标识字段的自定义。
 */
import React, { useState } from 'react';
import { TaskBoard } from 'tantd';
import { Button, Radio, Tooltip, Avatar } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const data = [
  {
    title: '卡片1',
    id: 'col1',
    children: [
      {
        name: 'task-1',
        id: '1',
      },
      {
        name: 'task-2',
        id: '2',
      },
    ],
  },
  {
    title: '卡片2',
    id: 'col2',
    children: [],
  },
];

export default () => {
  const [hideAddBtn, setHide] = useState(false);
  const [columnKey, setColumn] = useState('default');
  const [taskKey, setTask] = useState('default');

  const customTaskContent = (task) => (
    <div style={{ padding: 8, borderLeft: '3px solid red' }}>
      <Avatar style={{ backgroundColor: '#87d068' }} icon="user" />
      <div>custom-task-content of {task.name}</div>
    </div>
  );
  return (
    <div>
      <div style={{ marginBottom: 10 }}>
        <Radio.Group
          value={columnKey}
          onChange={(e) => {
            setColumn(e.target.value);
          }}
        >
          <Radio.Button value="default">默认header</Radio.Button>
          <Radio.Button value="extra">自定义extra</Radio.Button>
          <Radio.Button value="custom">自定义header</Radio.Button>
          <Radio.Button value="none">无header</Radio.Button>
        </Radio.Group>
      </div>
      <div style={{ marginBottom: 10 }}>
        <Radio.Group
          value={taskKey}
          onChange={(e) => {
            setTask(e.target.value);
          }}
        >
          <Radio.Button value="default">默认task内容</Radio.Button>
          <Radio.Button value="custom">自定义task内容</Radio.Button>
        </Radio.Group>
      </div>
      <Button
        onClick={() => {
          setHide(!hideAddBtn);
        }}
      >
        {hideAddBtn ? '显示' : '隐藏'}-快速新增按钮
      </Button>
      <TaskBoard
        dataSource={data}
        hideQuickAdd={hideAddBtn}
        handleAddBtn={(column) => {
          console.log('click add btn now!,column info=', column);
        }}
        renderHeader={
          columnKey == 'custom'
            ? (column) => <div style={{ backgroundColor: 'aquamarine' }}>custom header of {column.title}</div>
            : columnKey == 'none'
            ? null
            : undefined
        }
        renderExtra={
          columnKey == 'extra'
            ? () => (
                <Tooltip title="菜单">
                  <PlusOutlined style={{ cursor: 'pointer' }} />
                </Tooltip>
              )
            : undefined
        }
        renderItem={taskKey == 'custom' ? customTaskContent : undefined}
      />
    </div>
  );
};

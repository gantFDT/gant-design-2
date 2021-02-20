/**
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 相关配置功能展示,dataSource的数据表标识为id,可通过idKey进行标识字段的自定义。
 */
import React, { useState } from 'react';
import { TaskBoard } from 'tantd';
import { Input } from 'antd';
const Search = Input.Search;
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
  const [keywords, setKeyWords] = useState('');
  return (
    <div>
      <Search placeholder="输入关键字" onSearch={(value) => setKeyWords(value)} style={{ width: 600 }} />
      <TaskBoard dataSource={data} hightLightWords={keywords} />
    </div>
  );
};

/**
 *
 * title.zh-CN: 基础使用
 * desc.zh-CN: 与antd select 的表现一致，支持对应的prop属性，区别是仅支持数据化配置选项内容。
 */
import React from 'react';
import { Selector } from 'tantd';

export default () => {
  const options = [
    { label: 'Jack', value: 'jack' },
    { label: 'Lucky', value: 'lucky' },
    { label: 'Tom', value: 'tom' },
    { label: 'Mike', value: 'mike' },
    { label: 'John', value: 'john' },
  ];
  return <Selector options={options} native wrapperStyle={{ width: 200 }} />;
};

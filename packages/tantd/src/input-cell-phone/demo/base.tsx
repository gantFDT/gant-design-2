/**
 *
 * title.zh-CN: 基础使用
 * desc.zh-CN: 与antd select 的表现一致，支持对应的prop属性，区别是仅支持数据化配置选项内容。
 */
import React from 'react';
import { InputCellPhone } from 'tantd';

export default () => {
  return <InputCellPhone defaultValue={{ key: '86', value: '13234534532' }} />;
};

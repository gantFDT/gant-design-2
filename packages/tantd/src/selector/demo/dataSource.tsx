/**
 *
 * title.zh-CN: dataSource数据源
 * desc.zh-CN: 通过`dataConfig` 配置显示label与value值的对应字段key。
 */
import React from 'react';
import { Selector } from 'tantd';

export default () => {
  const dataSource = [];
  for (let i = 10; i < 36; i++) {
    dataSource.push({ title: i.toString(36) + i, code: i + 1 });
  }
  return (
    <Selector
      native
      wrapperStyle={{ width: 200 }}
      dataSource={dataSource}
      dataConfig={{
        valueProp: 'code',
        labelProp: 'title',
      }}
    />
  );
};

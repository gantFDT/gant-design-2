/**
 *
 * title.zh-CN: 多选下组合使用
 */
import React, { useRef } from 'react';
import { Selector } from 'tantd';
import { RefApiProps } from 'tantd/lib/selector/generate';

export default () => {
  const apiRef = useRef<RefApiProps>();
  const dataSource = [];
  for (let i = 10; i < 36; i++) {
    dataSource.push({ title: i.toString(36) + i, code: i + 1, name: i.toString(36) });
  }
  return (
    <>
      <Selector
        native
        wrapperStyle={{ width: 300 }}
        selectorId="demo-combine"
        useStorage
        showSearch
        allowClear
        mode="multiple"
        apiRef={apiRef}
        dataSource={dataSource}
        optionLabelProp="name"
        dataConfig={{
          valueProp: 'code',
          labelProp: 'title',
        }}
        onChange={(val, opt) => {
          console.log('val: ', val);
          console.log('opt: ', opt);
        }}
      />
    </>
  );
};

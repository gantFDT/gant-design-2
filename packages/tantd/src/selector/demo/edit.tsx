/**
 *
 * title.zh-CN: 切换读写状态
 * desc.zh-CN: native属性不传递或设置为false时为读写状态。
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
  return <Selector options={options} wrapperStyle={{ width: 300 }} defaultValue={{ label: 'Tom', value: 'tom' }} />;
};

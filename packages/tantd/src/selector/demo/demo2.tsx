/**
 *
 * title.zh-CN: 最近选择
 * desc.zh-CN: 开启`useStorage`功能时需同时传递`selectorId`做为本地存储的唯一标识，最近选择项可批量清除也可单项单项。
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
  ]
  return <Selector
    selectorId='demo-default'
    useStorage
    options={options}
    style={{ width: 200 }}
  />
}
---
title: datacell 读写分离
order: 2
nav:
  title: 组件
  path: /component
group:
  title: 数据单元
  path: /datacell
  order: 1
---

# DataCell 数据单元

🖍 读写分离  
🎨 不影响原本组件属性的前提下，通过包裹 DataCell 使数据单元组件实现读写分离

## 代码演示
### 基础使用
<code src="./demo/Basic.tsx" />

<!-- ### 基础使用

<code src="./demo/demo1.tsx" />

### 迷你尺寸

<code src="./demo/demo2.tsx" />

### 弹框位置

<code src="./demo/demo3.tsx" />

<!--
### 读写切换
<code src="./demo/demo4.tsx" />

### 只读模式
<code src="./demo/demo5.tsx" />
-->

### 禁用模式

<!-- <code src="./demo/demo6.tsx" /> -->

## API

### ColorPicker props

| 属性              | 说明                                               | 类型                                                            | 默认值   |
| ----------------- | -------------------------------------------------- | --------------------------------------------------------------- | -------- |
| value             | 值                                                 | any                                                             |          |
| defalutValue      | 默认值                                             | any                                                             |          |
| onChange          | change调用                                         | (value:any,...ags:any[])=>void                                  |          |
| onConfirm         | 点击确认保存当前值并退出编辑模式,返回false则无响应 | （value:any)=>void                                              | boolean  |
| onCancel          | 取消退出编辑模式,返回false则无响应                 | （value:any)=>void                                              | boolean  |
| native            | 是否原生模式                                       | boolean                                                         | false    |
| size              | 尺寸                                               | `small`、`middle` 、`large`                                     | `middle` |
| getValueFromEvent | 设置如何将 event 的值转换成字段值                  | (..args: any[]) => any                                          |          |
| valuePropName     | 值的属性名称，如 Switch 的是 'checked'。           | string                                                          | `value`  |
| editable          | 是否可编辑 在读写分离模式下能否进入编辑状态        | boolean                                                         | `true`   |
| disabled          | 是否禁用                                           | boolean                                                         | `false`  |
| renderLabel       | 渲染状态文本（默认渲染value）                      | (value: ValueType, ...ags: any[]) => (string、 React.ReactNode) |          |
| wrapperClassName  | wrapper class                                      | string                                                          |
| wrapperStyle      | wrapper style                                      | CSSProperties                                                   |
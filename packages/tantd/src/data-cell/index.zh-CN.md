---
title: DataCell 读写分离数据单元
order: 1
nav:
  title: 组件
  path: /component
group:
  title: 数据单元
  path: /datacell
  order: 1
---

# DataCell 读写分离数据单元

🖍 读写分离  
🎨 不影响原本组件属性的前提下，通过包裹 DataCell 使数据单元组件实现读写分离

## 代码演示
### 基础使用
<code src="./demo/Basic.tsx" />

## API

### DataCell props

| 属性              | 说明                                               | 类型                                                            | 默认值   |
| ----------------- | -------------------------------------------------- | --------------------------------------------------------------- | -------- |
| value             | 值                                                 | any                                                             |          |
| defalutValue      | 默认值                                             | any                                                             |          |
| onChange          | change调用                                         | (value:any,...ags:any[])=>void                                  |          |
| onConfirm         | 点击确认保存当前值并退出编辑模式,返回false则无响应 | （value:any)=>void                                              |          |
| onCancel          | 取消退出编辑模式,返回false则无响应                 | （value:any)=>void                                              |          |
| native            | 是否原生模式                                       | boolean                                                         | false    |
| size              | 尺寸                                               | `small`、`middle` 、`large`                                     | `middle` |
| getValueFromEvent | 设置如何将 event 的值转换成字段值                  | (..args: any[]) => any                                          |          |
| valuePropName     | 值的属性名称，如 Switch 的是 'checked'。           | string                                                          | `value`  |
| readyonly         | 是否仅读（原生模式下该属性不生效）                 | boolean                                                         | `true`   |
| renderLabel       | 渲染状态文本（默认渲染value）                      | (value: ValueType, ...ags: any[]) => (string、 React.ReactNode) |          |
| wrapperClassName  | wrapper class                                      | string                                                          |
| wrapperStyle      | wrapper style                                      | CSSProperties                                                   |
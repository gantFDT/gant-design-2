---
title: datacell 数据单元
order: 2
nav:
  title: 组件
  path: /component
group:
  title: 数据单元
  path: /datacell
  order: 3
---

# DataCell 数据单元

🖍 读写分离  
🎨 antd 标准颜色板

## 代码演示

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

| 属性      | 说明         | 类型              | 默认值                    |
| --------- | ------------ | ----------------- | ------------------------- |
| value     | 当前色值     | string            | `#1890FF`                 |
| size      | 尺寸         | `normal`、`small` | `auto`                    |
| width     | 宽度         | string            | `auto`                    |
| edit      | 是否可编辑   | edit              | `true`                    |
| placement | 子选择框位置 | `top` 、 `bottom` | `top`                     |
| disabled  | 是否禁用     | boolean           | `false`                   |
| onChange  | 改变回调     | function          | `Function(color: string)` |

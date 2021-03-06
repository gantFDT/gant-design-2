---
title: Modal 弹窗
order: 2
nav:
  title: 组件
  path: /component
group:
  title: 容器
  path: /layout
  order: 4
---

# Modal 弹窗

支持拖拽移动和大小伸缩  
窗口化和全屏化状态的切换  
实时响应浏览器窗口变化  
支持挂载期弹窗状态留存  
可支持非模态窗口模式等功能，并支持同屏展示多个弹出框

## 代码演示

### 基本用法

<code src="./demo/base.tsx" />

### 自定义宽高

<code src="./demo/custom.tsx" />

### 自定义弹出位置

<code src="./demo/position.tsx" />

### 默认最大化状态

<code src="./demo/maximize.tsx" />

### 功能禁用

<code src="./demo/forbidden.tsx" />

### 状态存储

<code src="./demo/keepState.tsx" />

### 同屏多弹窗模式

<code src="./demo/modeless.tsx" />

## API

### Modal props

| 属性                                     | 说明                                                          | 类型         | 默认值                |
| ---------------------------------------- | ------------------------------------------------------------- | ------------ | --------------------- |
| classname                                | 弹窗层自定义 class                                            | string       |                       |
| style                                    | 弹窗额外样式                                                  | css          |                       |
| <a href="#itemstate-props">ItemState</a> | 窗自定义默认参数                                              | ItemState    |                       |
| visible                                  | 是否可见                                                      | bool         | false                 |
| isModalDialog                            | 是否为模态窗口                                                | bool         | false                 |
| maxZIndex                                | 当前最大堆叠等级                                              | number       | 999                   |
| children                                 | 自定义弹窗内容                                                | reactElement |                       |
| onSizeChange                             | 宽高改变的回调                                                | function     | (width,height,el)=>{} |
| canMaximize                              | 控制最大化、小屏化按钮功能的显隐+双击 header 切换该状态的功能 | bool         | true                  |
| canResize                                | 是否可以拖动改变窗口大小                                      | bool         | true                  |
| throttle                                 | 尺寸变化的节流间隔毫秒数                                      | number       | 200                   |
| onOk                                     | 提交按钮回调                                                  | function     | ()=>{ }               |
| onCancel                                 | 取消按钮回调                                                  | function     | ()=>{ }               |

更多属性参考 [antd-modal](https://ant.design/components/modal-cn/#API)
### ResizableProvider props

| 属性        | 说明                   | 类型                                     | 默认值    |
| ----------- | ---------------------- | ---------------------------------------- | --------- |
| maxZIndex   | 当前最大堆叠等级       | number                                   | 0         |
| minWidth    | 拖动伸缩最小宽度限制   | number                                   | 200       |
| minHeight   | 拖动伸缩最小高度限制   | number                                   | 200       |
| initalState | 通用初始化弹窗默认参数 | <a href="#itemstate-props">ItemState</a> | ItemState |

### ResizableModal props

| 属性                                     | 说明                                                          | 类型         | 默认值  |
| ---------------------------------------- | ------------------------------------------------------------- | ------------ | ------- |
| id                                       | 唯一标识（必填）                                              | string       |         |
| <a href="#itemstate-props">ItemState</a> | 窗自定义默认参数                                              | ItemState    |         |
| isModalDialog                            | 是否为模态窗口                                                | bool         | false   |
| children                                 | 自定义弹窗内容                                                | reactElement |         |
| canMaximize                              | 控制最大化、小屏化按钮功能的显隐+双击 header 切换该状态的功能 | bool         | true    |
| canResize                                | 是否可以拖动改变窗口大小                                      | bool         | true    |
| wrapClassName                            | 弹窗层自定义 class                                            | string       |         |
| style                                    | 弹窗额外样式                                                  | css          |         |
| onOk                                     | 提交按钮回调                                                  | function     | ()=>{ } |
| onCancel                                 | 取消按钮回调                                                  | function     | ()=>{ } |

### ItemState props

| 属性             | 说明                                               | 类型          | 默认值             |
| ---------------- | -------------------------------------------------- | ------------- | ------------------ |
| zIndex           | 当前最大堆叠等级                                   | number        | 基于maxZIndex 累加 |
| x                | 弹窗弹出时定位 x 轴                                | number        | 无                 |
| y                | 弹窗弹出时定位 y 轴                                | number        | 无                 |
| width            | 弹窗宽度(支持 px 或百分比)                         | number/string | 520                |
| height           | 弹窗高度(支持 px 或百分比)                         | number/string | 520                |
| maximize         | 默认弹出时是否为最大化状态                         | boolean       | false              |
| keepStateOnClose | 在弹窗挂载期是否保留弹窗关闭前的 xy 定位与尺寸信息 | boolean       | false              |

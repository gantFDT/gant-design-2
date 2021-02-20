---
title: TaskBoard 任务面板
order: 2
nav:
  title: 组件
  path: /component
group:
  title: 其他
  path: /other
  order: 5
---

# TaskBoard 弹窗

提供默认支持面板与任务拖拽排序的功能性面板，支持自定义面板header与task内容、任务高亮、手势操作等功能
## 代码演示

### 基本用法
<code src="./demo/base.tsx" />

### 任务高亮
<code src="./demo/highLight.tsx" />

### 拖拽功能
<code src="./demo/dragUse.tsx" />

## API
### TaskBoard props

| 属性             | 说明                             | 类型                       | 默认值                                                    |
| ---------------- | -------------------------------- | -------------------------- | --------------------------------------------------------- |
| dataSource       | 数据数组，必填                   | array                      | []                                                        |
| className        | taskboard类名                    | string                     | ' '                                                       |
| idKey            | 数据标识字段Key                  | string                     | 'id'                                                      |
| titleKey         | column标题字段Key                | string                     | 'title'                                                   |
| childrenKey      | tasks集合字段Key                 | string                     | 'name'                                                    |
| taskNameKey      | task名称字段Key                  | string                     | 'id'                                                      |
| hideQuickAdd     | 是否隐藏快速新增按 钮            | boolean                    | `false`                                                   |
| handleAddBtn     | 点击快速新增按钮的函数回调       | (task) => void             | -                                                         |
| hightLightWords  | task高亮关键字                   | string                     | ' '                                                       |
| highlightTasksBy | 自定义task高亮筛选函数           | (keywords, task) => void   | (keywords,task)=> task[taskNameKey].indexOf(keywords) < 0 |
| renderHeader     | 自定义column头部渲染函数         | (column) => ReactNode      | -                                                         |
| renderExtra      | 自定义column右侧额外栏目渲染函数 | (column) => ReactNode      | -                                                         |
| renderItem       | 自定义task内容渲染函数           | (task,column) => ReactNode | -                                                         |

    
### drag props 

| 成员                 | 说明                             | 类型             | 默认值  |
| -------------------- | -------------------------------- | ---------------- | ------- |
| isColumnDragDisabled | column拖拽禁用                   | boolean          | `false` |
| isColumnDropDisabled | column放置禁用                   | boolean          | `false` |
| isTaskDragDisabled   | task拖拽禁用                     | boolean          | `false` |
| isTaskDropDisabled   | task放置禁用                     | boolean          | `false` |
| onBeforeDragStart    | 拖拽开始的函数回调               | (result) => void | -       |
| onDragStart          | 开始拖拽的函数回调               | (result) => void | -       |
| onDragUpdate         | 拖拽位置发生更新变化时的函数回调 | (result) => void | -       |
| onDragEnd            | 拖拽结束的回调函数               | (result) => void | -       |
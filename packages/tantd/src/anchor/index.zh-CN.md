---
title: Anchor 锚点
order: 2
nav:
  title: 组件
  path: /component
group:
  title: 容器
  path: /layout
  order: 4
---

# Anchor 锚点

可以动态控制锚点操作按钮布局的锚点容器组件

## 代码演示

### 可切换布局

<code src="./demo/demo1.tsx" />

## API

### Anchor props

| 属性                           | 说明                                                                         | 类型                          | 默认值   |
| ------------------------------ | ---------------------------------------------------------------------------- | ----------------------------- | -------- |
| <a href="#list-props">list</a> | 锚点渲染项, 必填                                                             | array                         |          |
| content                        | 内容                                                                         | string / ReactNode            |          |
| fixedTop                       | 如果固定头部导航栏则为页面固定的头部导航高度，若没有固定头部导航栏则默认为 0 | number                        | 0        |
| layout                         | 锚点类型，支持水平、和竖直两种                                               | string/ horizontal、 vertical | vertical |
| onLayoutChange                 | 切换 layout 时的回调函数                                                     | function(layout)              |          |
| minHeight                      | 内容最小高度                                                                 | number                        | 400      |
| style                          | 额外样式                                                                     | cSSProperties                 |          |
| className                      | 类名                                                                         | string                        |          |

### list props

| 成员      | 说明                                          | 类型             | 默认值 |
| --------- | --------------------------------------------- | ---------------- | ------ |
| title     | 文字内容                                      | string/ReactNode |        |
| id        | 与模块对应 ID                                 | string           |        |
| complete  | 对应模块内容是否填写完整,对应显示一个对勾符号 | boolean          |        |
| isInvalid | 是否无效，若无效则禁止点击跳转                | boolean          | false  |

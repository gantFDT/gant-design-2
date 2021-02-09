---
title: Header 头部
order: 1
nav:
  title: 组件
  path: /component
group:
  title: 容器
  path: /layout
  order: 4
---

# Header
自适应宽度的头部组件，按钮放不下空间时会自动收到下拉容器里
## 代码演示
### 自适应容器宽度
<code src="./demo/demo1.tsx" />

### 标题展示类型
<code src="./demo/demo2.tsx" />

### 分割线
<code src="./demo/demo3.tsx" />

## API
### Header props
| 属性        | 说明                                          | 类型                | 默认值            |
| ----------- | --------------------------------------------- | ------------------- | ----------------- |
| type        | 标题展示类型，可选值为 `line`, `num`,`normal` | string              | normal              |
| title       | 标题                                          | string              |                   |
| beforeExtra | 标题左侧额外容器                              | string \| ReactNode | null              |
| extra       | 右侧额外容器                                  | string \| ReactNode | null              |
| num         | type=num 时显示的序号                         | string \| number    | 0                 |
| color       | 自定义颜色                                    | string              | var(--text-color) |
| topLine     | 顶部部分割线                                  | boolean             | `false`           |
| bottomLine  | 底部分割线                                    | boolean             | `false`           |
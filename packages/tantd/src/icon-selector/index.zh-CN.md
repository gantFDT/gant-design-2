---
title: IconSelector 图标选择器
order: 4
nav:
  title: 组件
  path: /component
group:
  title: 数据单元
  path: /datacell
  order: 1
---

# IconSelector 图标选择器

选择图标

### 代码标题

<code src="./demo/demo1.tsx" />

## API

### IconSelector props

| 属性            | 说明       | 类型                         | 默认值 |
| --------------- | ---------- | ---------------------------- | ------ |
| style           | 样式       | cSSProperties                |        |
| className       | class      | string                       |        |
| value           | 值         | string                       |        |
| default         | 默认值     | string                       |        |
| onChange        | change调用 | （value:string）=>void       |        |
| drawerBodyStyle | 抽屉样式   | cSSProperties                |        |
| drawerClassName | 抽屉class  | string                       |        |
| drawerWidth     | 抽屉宽度   | string\number                |        |
| size            | 大小       | string（small middle large） |        |
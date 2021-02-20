---
title: AutoReload 自动刷新
order: 2
nav:
  title: 组件
  path: /component
group:
  title: 其他
  path: /other
  order: 5
---

# Demo
组件介绍

## 代码演示

### 基本用法
<code src="./demo/demo1.tsx" />

### 其它属性
<code src="./demo/demo2.tsx" />

### 支持国际化
<code src="./demo/demo3.tsx" />

## API
### Anchor props

| 属性      | 说明                 | 类型     | 默认值     |
| --------- | -------------------- | -------- | ---------- |
| auto      | 是否开启自动刷新     | boolean  | `true`     |
| interval  | 刷新间隔，单位（分） | number   | `1`        |
| refresh   | 刷新触发的回调方法   | function | ()=>{}     |
| time      | 自定义显示的时间     | string   | `当前时间` |
| className | 类名                 | string   |            |
| style     | 样式                 | object   |            |
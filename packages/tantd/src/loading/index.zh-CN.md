---
title: Loading 加载中
order: 3
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

### 自定义描述文案&将内容内嵌到Loading中
<code src="./demo/demo2.tsx" />

### 自定义icon
<code src="./demo/demo3.tsx" />

### 提供多种动态样式
<code src="./demo/demo4.tsx" />

## API
### Loading props

| 参数      | 说明                                          | 类型      | 默认值           |
| --------- | --------------------------------------------- | --------- | ---------------- |
| spinType  | 内部提供的几种加载样式,具体类型已在demo中罗列 | string    | ball-clip-rotate |
| indicator | 自定义样式                                    | ReactNode | -                |
| spinning  | 是否加载loading                               | boolean   | true             |
| content   | 内嵌内容                                      | ReactNode | -                |

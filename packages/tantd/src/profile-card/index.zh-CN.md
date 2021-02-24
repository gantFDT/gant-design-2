---
title: ProfileCard 名片式气泡卡片
order: 4
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

### 底部添加额外标签
<code src="./demo/demo2.tsx" />

### 无头像时显示默认图像
<code src="./demo/demo3.tsx" />

## API
### ProfileCard props

| 参数             | 说明                                                                                                                                               | 类型              | 默认值                                                                                                |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------- |
| data             | 数据                                                                                                                                               | object            | -                                                                                                     |
| fields           | Item label名称                                                                                                                                     | array             | -                                                                                                     |
| showAvatar       | 是否显示头像                                                                                                                                       | boolean           | `true`                                                                                                |
| labelAlign       | label显示位置（'default', 'left'）                                                                                                                 | string            | `default`                                                                                             |
| avatarAlign      | 头像位置 'top', 'left', 'right'                                                                                                                    | string            | `top`                                                                                                 |
| extraLeftTop     | 左上方额外组件                                                                                                                                     | ReactNode         | -                                                                                                     |
| extraRightTop    | 右上方额外组件                                                                                                                                     | ReactNode         | -                                                                                                     |
| extraBottom      | 底部额外组件                                                                                                                                       | ReactNode         | -                                                                                                     |
| backgroundImage  | 头像部分的背景图片,当设置为false时不显示                                                                                                           | `string或boolean` | avatarUrl                                                                                             |
| backgroundBlur   | 头像部分的背景图片设置高斯模糊值，设置为false时失效                                                                                                | `number或boolean` | 3                                                                                                     |
| layout           | 头像与item的占比                                                                                                                                   | object            | `{ labelCol: {xs: { span: 12 },sm: { span: 12 },},wrapperCol: {xs: { span: 12 },sm: { span: 12 },},}` |
| trigger          | 显示气泡的方式（'hover', 'click'）                                                                                                                 | string            | `hover`                                                                                               |
| placement        | 气泡所在位置 `topLeft`, `top`, `topRight`,`leftTop`, `left`, `leftBottom`,`rightTop`, `right`, `rightBottom`,`bottomLeft`, `bottom`, `bottomRight` | string            | `bottom`                                                                                              |
| overlayClassName | 给气泡添加额外class                                                                                                                                | string            | -                                                                                                     |
| onAvatarClick    | 点击头像事件                                                                                                                                       | function          | () => void                                                                                            |
| height           | 气泡高度                                                                                                                                           | number            | 300                                                                                                   |
| width            | 气泡宽度                                                                                                                                           | number            | -                                                                                                     |
| className        | 气泡中内容添加的额外class                                                                                                                          | string            | -                                                                                                     |
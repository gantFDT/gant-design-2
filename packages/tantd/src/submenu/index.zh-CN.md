---
title: Submenu 子菜单
order: 2
nav:
  title: 组件
  path: /component
group:
  title: 容器
  path: /layout
  order: 4
---

# Submenu 子菜单

子菜单容器组件，可以设置两种布局方式，可动态切换布局，操作按钮可配置磁吸功能

## 代码演示

### 左侧菜单

<code src="./demo/demo1.tsx" />

### 顶部菜单+磁吸

<code src="./demo/demo2.tsx" />

## API

### Anchor props

| 属性               | 说明                                   | 类型                | 默认值                    |
| ------------------ | -------------------------------------- | ------------------- | ------------------------- |
| collapsed          | 菜单是否折叠                           | boolean             | `false`                   |
| mode               | 菜单类型，现在支持水平、和内嵌模式两种 | horizontal \|inline | inline                    |
| selectedKey        | 选中的菜单 key 值，默认为第一个 , 必填 | string              |                           |
| width              | 菜单宽度                               | number \| string    | `200`                     |
| fixedTopHeight     | 磁吸的位置                             | number              | 0                         |
| subMinHeight       | 菜单最小高度                           | number \| string    | `112`                     |
| collapsedWidth     | 菜单折叠宽度                           | number \| string    | `40`                      |
| extra              | 菜单额外内容                           | reactNode           |                           |
| menuData           | 菜单渲染项, 必填                       | array               | []                        |
| showMenuMagnet     | 是否显示磁吸功能                       | boolean             | false                     |
| showFlipOverFooter | 是否显示翻页页脚                       | boolean             | false                     |
| bordered           | 是否有边框                             | boolean             | true                      |
| onSwitchChange     | 切换菜单后的执行回调函数               | function            | (nowMode) => void         |
| onCollapseChange   | 菜单折叠展开后的执行回调函数           | function            | (collapsed) => void       |
| onSelectedChange   | 菜单子项被点击触发后的执行回调函数     | function            | (key,record,item) => void |

### menuData props

| 属性     | 说明           | 类型                 | 默认值 |
| -------- | -------------- | -------------------- | ------ |
| title    | 菜单项标题     | string \| ReactNode  | null   |
| key      | 菜单项 key     | horizontal \| inline | inline |
| icon     | 菜单项 icon    | ReactNode            |        |
| count    | 菜单项徽标数字 | number \| string     |        |
| disabled | 是否禁用       | boolean              | false  |

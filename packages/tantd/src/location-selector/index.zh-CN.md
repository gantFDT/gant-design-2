---
title: LocationSelector 选择器
order: 2
nav:
  title: 组件
  path: /component
group:
  title: 数据单元
  path: /datacell
  order: 3
---

# LocationSelector 选择器

基于 antd-select 的增强型选择器，展示最可选择项，支持传递 dataSource 作为选择器数据源。

## 代码演示

### 基本使用

<code src="./demo/base.tsx" />

### 切换读写状态

<code src="./demo/edit.tsx" />

## API

### Selector props

| 属性                                       | 说明                      | 类型                                    | 默认值                                     |
| ------------------------------------------ | ------------------------- | --------------------------------------- | ------------------------------------------ |
| selectorId                                 | 本地存储最近选择的唯一 id | string                                  |                                            |
| useStorage                                 | 是否开启最近选择          | boolean                                 | false                                      |
| storageCount                               | 最近选择项数量            | number                                  | 10                                         |
| dataSource                                 | 数据源                    | { [label: string, value: string] }[]    | { valueProp: 'value', labelProp: 'label' } |
| <a href="#dataconfig-props">dataConfig</a> | 数据源配置项内容          | object                                  | -                                          |
| <a href="#apiref-props">apiRef</a>         | 额外实例方法暴露          | object                                  | -                                          |
| onSearchValueChange                        | 搜索值发生变化时的回调    | function(searchValue: string) => void - |                                            |

### dataConfig props

| 成员      | 说明              | 类型   | 默认值 |
| --------- | ----------------- | ------ | ------ |
| valueProp | value 值的主键    | string | value  |
| labelProp | 显示 label 的主键 | string | label  |
| groupProp | 分组字段的主键    | string | group  |

### apiRef props

| 成员           | 说明                                            | 类型                                         | 默认值 |
| -------------- | ----------------------------------------------- | -------------------------------------------- | ------ |
| getStorageList | 获取最近选择项                                  | function()=> StorageOption[]                 | -      |
| setStorageList | 设置最近选择项(storages 为空时，清空最近选择项) | function(storages?: StorageOption[]) => void | -      |

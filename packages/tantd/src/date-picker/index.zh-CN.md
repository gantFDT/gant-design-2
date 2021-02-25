---
title: datePicker 日期选择器
order: 8
nav:
  title: 组件
  path: /component
group:
  title: 数据单元
  path: /datacell
  order: 1
---

# DatePicker 数据单元

🖍 日期读写分离选择器  
🎨 在原本Antd DatePicker 基础上 通过DateCell 组件的日期组件使用方法与Antd相同（值改成仅支持string）

## 代码演示
### 基础使用
最简单的用法，点击进入编辑状态在浮层中可以选择或者输入日期
<code src="./demo/Basic.tsx" />

### 时间范围选择器
<code src="./demo/BasicRange.tsx" />

## API

### DatePicker props

| 属性         | 说明       | 类型                               | 默认值 |
| ------------ | ---------- | ---------------------------------- | ------ |
| value        | 值         | string                             |        |
| defalutValue | 默认值     | string                             |        |
| onChange     | change调用 | (value:string,monent:Moment)=>void |        |

其他属性请参考：[antd DatePicker](https://ant.design/components/date-picker-cn/)

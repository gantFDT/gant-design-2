---
title: 工具类
order: 20
nav:
  title: 组件
  path: /component
group:
  title: 工具类
  path: /utils
  order: 20
---

# Utils

公共工具类

## 代码演示

### 生成 UUID

<code src="../demo/createUUID.tsx" />

### 获取 IE 版本

<code src="../demo/getIEVersion.tsx" />

## API

```typescript
import { Utils } from 'tantd'; // or import Utils from 'util_t';
```

### Functions

| 方法名         | 说明                             | 类型                                     |
| ------------ | -------------------------------- | ---------------------------------------- |
| createUUID | 生成 UUID,可指定位数和进制       | `(len?: number,radix?:number) => string` |
| getIEVersion    | 判断当前浏览器环境是 IE 哪个版本 | `() => string\|number`                   |

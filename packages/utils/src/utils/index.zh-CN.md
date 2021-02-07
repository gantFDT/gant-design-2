---
title: Utils
order: 20
nav:
  title: 组件
  path: /component
---

# Utils

公共工具类

## 代码演示

### 生成 UUID

<code src="../demo/generateUuid.tsx" />

### 获取 IE 版本

<code src="../demo/IEVersion.tsx" />

## API

```typescript
import { Utils } from 'tantd';
```

### Actions

| 方法         | 说明                             | 类型                                     |
| ------------ | -------------------------------- | ---------------------------------------- |
| generateUuid | 生成 UUID,可指定位数和进制       | `(len?: number,radix?:number) => string` |
| IEVersion    | 判断当前浏览器环境是 IE 哪个版本 | `() => string\|number`                   |

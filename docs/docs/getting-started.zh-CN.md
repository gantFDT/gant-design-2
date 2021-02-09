---
order: 1
nav:
  title: 指南
  order: 1
---

# 快速上手

GantD 是一个 React Components 库，致力提供企业级管理后台组件

> 在开始之前，你需要掌握 React 基础用法。访问[链接](https://react.docschina.org/)学习 React 官方文档。

## 第一个例子

这是一个最简单的 tantds 的在线 codesandbox 演示。

<code src="./demo.tsx" inline />

### 1. 创建一个 codesandbox

访问 https://codesandbox.io/s/tender-sun-bsjso?file=/App.tsx 创建一个 codesandbox 的在线示例，别忘了保存以创建一个新的实例。

### 2. 使用 GantD

直接用下面的代码替换 App.js 的内容，使用 tantds 中的 [Header]()。

```javascript
import React from 'react';
import { Header } from 'gantd';

export default () => {
  return <Header title="标题" />;
};
```

### 3. 探索更多 GantD用法

你可以在右上角点击组件查看所有组件，比如 Grid, SchemaForm 等。我们的文档中提供了各类演示，每个代码演示的例子，都可以点击右下角的图标查看代码，同时文档最下方有 GantD API 文档可以查阅，快去试试吧。

## 按需加载

> 注意：GantD 默认支持基于 ES module 的 tree shaking，对于 js 部分，直接引入 `import { Header } from 'gantd'` 也会有按需加载的效果。

如果你使用了 babel，那么可以使用 [babel-plugin-import](https://github.com/ant-design/babel-plugin-import) 来进行按需加载，
配置 Babel 插件进行按需加载

```javascript
[
  'babel-plugin-import',
  {
    libraryName: 'gantd',
    libraryDirectory: 'es',
    style: true,
  },
  'gantd',
];
```

加入这个插件后。你可以仍然这么写：

```javascript
import { Header } from 'gantd';
```

插件会帮你转换成 `gantd/es/header` 的写法。

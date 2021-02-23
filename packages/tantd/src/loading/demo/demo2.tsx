import React, { useMemo } from 'react';
import { Loading } from 'tantd';

// 自定义描述文案&将内容内嵌到Loading中
export default () => {
  const content = useMemo(() => {
    return (
      <div>
        <p>
          GantD是面向B端管理型软件、专注于数据密集型业务场景、基于Antd聚合型React组件库
          <p>在Antd的基础上做了不同程度的针对性的强化，亦可以视作为Antd的补充，可以和Antd同时使用</p>特性
        </p>
        <p>面向企业后台产品，偏数据密集型紧凑风格</p>
        <p>基于数据驱动模式快速开发组件、如数据驱动表单</p>
        <p>赋能式组件，比如智能表格（smartTable），把权利交给终端用户</p>
        <p>使用 TypeScript 开发，提供完整的类型定义文件</p>
      </div>
    );
  }, []);
  return (
    <>
      <Loading spinning={true} content={content} loadingText={'Loading……'} />
    </>
  );
};

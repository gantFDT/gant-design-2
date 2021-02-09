import React, { useState } from 'react';
import { Header } from 'tantd';
import { Button, Slider } from 'antd';

export default () => {
  const [value, setvalue] = useState(100);

  const onChange = React.useCallback((v) => {
    setvalue(v);
  }, []);

  return (
    <>
      <Header
        title="上分割线"
        type="line"
        topLine
        extra={
          <>
            <Button type="primary" size="small">
              新增
            </Button>
            <Button size="small">编辑</Button>
            <Button size="small">保存</Button>
            <Button size="small">复制</Button>
            <Button danger size="small">
              删除
            </Button>
          </>
        }
      />
      <Header
        title="下分割线"
        type="line"
        bottomLine
        extra={
          <>
            <Button type="primary" size="small">
              新增
            </Button>
            <Button size="small">编辑</Button>
            <Button size="small">保存</Button>
            <Button size="small">复制</Button>
            <Button danger size="small">
              删除
            </Button>
          </>
        }
      />
    </>
  );
};

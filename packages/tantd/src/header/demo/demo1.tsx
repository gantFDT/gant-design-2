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
      <Slider min={1} max={100} onChange={onChange} value={value} />
      <div style={{ width: `${value}%` }}>
        <Header
          title="标题"
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
      </div>
    </>
  );
};

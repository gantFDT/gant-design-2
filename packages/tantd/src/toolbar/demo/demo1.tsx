import React, { useState } from 'react';
import { Toolbar } from 'tantd';
import { Button, Tooltip } from 'antd';

export default () => {
  const [fixed, setFixed] = useState(false);

  return (
    <Toolbar
      fixed={fixed}
      extraLeft={<Button size="small">返回</Button>}
      extraRight={
        <>
          <Button size="small" type="primary" onClick={() => setFixed(!fixed)}>
            {fixed ? '解除固定' : '固定到底部'}
          </Button>
          <Button size="small">编辑</Button>
          <Button size="small">保存</Button>
          <Button size="small">复制</Button>
          <Button size="small" type="primary" danger>
            删除
          </Button>
        </>
      }
    />
  );
};

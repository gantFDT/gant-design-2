import React, { useState } from 'react';
import { Toolbar } from 'tantd';
import { Button, Tooltip } from 'antd';

export default () => {
  const [fixed, setFixed] = useState(false)

  return (
    <Toolbar
      fixed={fixed}
      extraLeft={<Button size="small">返回</Button>}
      extraRight={
        <>
          <Tooltip title="新增">
            <Button size="small" type="primary" onClick={() => setFixed(!fixed)}>
              {fixed ? '解除固定' : '固定到底部'}
            </Button>
          </Tooltip>
          <Tooltip title="编辑">
            <Button size="small">编辑</Button>
          </Tooltip>
          <Tooltip title="保存">
            <Button size="small">保存</Button>
          </Tooltip>
          <Tooltip title="复制">
            <Button size="small">复制</Button>
          </Tooltip>
          <Tooltip title="删除">
            <Button size="small" type="primary" danger>
              删除
            </Button>
          </Tooltip>
        </>
      }
    />
  );
};

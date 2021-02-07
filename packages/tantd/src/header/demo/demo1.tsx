
import React, { useState } from 'react';
import { Header } from 'tantd';
import { Button, Tooltip, Slider } from 'antd';

export default () => {
  const [value, setvalue] = useState(100)

  const onChange = React.useCallback((v) => {
    setvalue(v)
  }, [])

  return <>
    <Slider min={1} max={100} onChange={onChange} value={value} />
    <div style={{ width: `${value}%` }}>
      <Header
        title="标题"
        type="line"
        extra={<>
          <Tooltip title='新增'>
            <Button type="primary" size="small">新增</Button>
          </Tooltip>
          <Tooltip title='编辑'>
            <Button size="small">编辑</Button>
          </Tooltip>
          <Tooltip title='保存'>
            <Button size="small">保存</Button>
          </Tooltip>
          <Tooltip title='复制'>
            <Button size="small">复制</Button>
          </Tooltip>
          <Tooltip title='删除' >
            <Button danger size="small">删除</Button>
          </Tooltip>
        </>}
      />
    </div>
  </>
}
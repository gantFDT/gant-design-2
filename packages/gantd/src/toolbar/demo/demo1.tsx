import React from 'react'
import { Toolbar } from 'gantd'
import { Button, Tooltip } from 'antd'
import { LeftOutlined } from '@ant-design/icons';

export default (props) => {
  return <Toolbar
    extraLeft={<Button size="small"><LeftOutlined />返回</Button>}
    extraRight={<>
      <Tooltip title='新增'>
        <Button size="small" type="primary" style={styles['ml-5']}>新增</Button>
      </Tooltip>
      <Tooltip title='编辑'>
        <Button size="small" style={styles['ml-5']}>编辑</Button>
      </Tooltip>
      <Tooltip title='保存'>
        <Button size="small" style={styles['ml-5']}>保存</Button>
      </Tooltip>
      <Tooltip title='复制'>
        <Button size="small" style={styles['ml-5']}>复制</Button>
      </Tooltip>
      <Tooltip title='删除'>
        <Button size="small" type="primary" danger style={styles['ml-5']}>删除</Button>
      </Tooltip>
    </>}
  />
}

const styles = {
  'ml-5': {
    marginLeft: '5px'
  }
}



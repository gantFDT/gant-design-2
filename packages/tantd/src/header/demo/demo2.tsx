
import React from 'react';
import { Header } from 'tantd';
import { Button} from 'antd';

export default () => {
  return <><Header
    title="短线标题"
    type="line"
    extra={<>
      <Button size="small">复制</Button>
      <Button danger size="small">删除</Button>
    </>}
  />
    <Header
      title="序号标题"
      type="num"
      extra={<>
        <Button size="small">复制</Button>
        <Button danger size="small">删除</Button>
      </>}
    />
  </>

}
/**
 *
 * title.zh-CN: 前缀/后置标签
 * desc.zh-CN: 与 Antd Input 一致。
 */

import React, { useState } from 'react';
import { Select, Button } from 'antd';
import { Input, Icon } from 'tantd';
const { Option } = Select;

const selectBefore = (
  <Select defaultValue="http://" className="select-before">
    <Option value="http://">http://</Option>
    <Option value="https://">https://</Option>
  </Select>
);
const selectAfter = (
  <Select defaultValue=".com" className="select-after">
    <Option value=".com">.com</Option>
    <Option value=".jp">.jp</Option>
    <Option value=".cn">.cn</Option>
    <Option value=".org">.org</Option>
  </Select>
);
export default () => {
  const [native, setNative] = useState(true);
  return (
    <>
      <Button.Group>
        <Button onClick={() => setNative(true)}>原生模式</Button>
        <Button onClick={() => setNative(false)}>读写分离</Button>
      </Button.Group>
      <div style={{ marginBottom: 16, marginTop: 16 }}>
        <Input addonBefore="http://" native={native} addonAfter=".com" defaultValue="mysite" />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input addonBefore={selectBefore} native={native} addonAfter={selectAfter} defaultValue="mysite" />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input native={native} addonAfter={<Icon type="SettingOutlined" />} defaultValue="mysite" />
      </div>
      <div style={{ marginBottom: 16 }}>
        <Input native={native} addonBefore="http://" suffix=".com" defaultValue="mysite" />
      </div>
    </>
  );
};

import React, { useState, forwardRef } from 'react';
import { DataCell } from 'tantd';
import { Input, Radio } from 'antd';
import { DataCellProps } from 'tantd/es/data-cell';
import { InputProps } from 'antd/lib/input';

interface InputDataCellProps extends Omit<InputProps, 'value' | 'onChange' | 'children'>, DataCellProps<string> {}

const InputDataCell = forwardRef<Input, InputDataCellProps>(function InputDataCell(props, ref) {
  const getValueFromEvent = (event) => {
    return event.target.value;
  };
  return (
    <DataCell {...props} ref={ref} getValueFromEvent={getValueFromEvent}>
      <Input />
    </DataCell>
  );
});

export default () => {
  const [native, setNative] = useState(true);

  return (
    <div>
      <Radio.Group value={native} onChange={(e) => setNative(e.target.value)}>
        <Radio.Button value={true}>原生组件模式</Radio.Button>
        <Radio.Button value={false}>读写分离模式</Radio.Button>
      </Radio.Group>
      <div style={{ marginTop: 5 }}>
        <InputDataCell native={native} defaultValue="基本使用" />
      </div>

      <div style={{ marginTop: 20 }}>
        <div>仅读模式</div>
        <InputDataCell readOnly defaultValue="仅读文字" />
      </div>
    </div>
  );
};

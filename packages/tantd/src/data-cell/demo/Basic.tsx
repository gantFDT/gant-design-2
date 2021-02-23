import React, { useRef, useState, forwardRef } from 'react';
import { DataCell } from 'tantd';
import { Input, Button } from 'antd';
import { DataCellProps } from 'tantd/lib/data-cell';
import { InputProps } from 'antd/lib/input';

interface InputDataCellProps extends InputProps, DataCellProps<string> {}

const InputDataCell = forwardRef<any, InputDataCellProps>(function InputDataCell(props: InputDataCellProps, ref: any) {
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
  const [native, setNative] = useState(false);
  const inputRef = useRef(Input);
  return (
    <div>
      <div style={{ marginTop: 30 }}>
        <p>基本使用:</p>
        <Input.Group compact>
          <Button
            onClick={() => {
              setNative(true);
            }}
          >
            原生模式
          </Button>
          <Button
            onClick={() => {
              setNative(false);
            }}
          >
            读写模式
          </Button>
        </Input.Group>
        <div style={{ marginTop: 10 }}>
          <InputDataCell native={native} defalutValue="基本使用方式" />
        </div>
      </div>
      <div style={{ marginTop: 30 }}>
        <p>ref传递:</p>
        <Input.Group compact>
          <InputDataCell native ref={inputRef} wrapperStyle={{ width: '80%' }} />
          <Button
            onClick={() => {
              inputRef.current?.focus();
            }}
          >
            聚焦
          </Button>
        </Input.Group>
      </div>
      <div style={{ marginTop: 30 }}>
        <p>数据双向绑定</p>
        <InputDataCell />
      </div>
    </div>
  );
};

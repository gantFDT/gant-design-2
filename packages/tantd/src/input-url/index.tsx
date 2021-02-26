import React, { forwardRef } from 'react';
import classNames from 'classnames';
import DataCell from '../data-cell';
import { Input } from 'antd';
import type { InputProps } from 'antd/lib/input';
import type { DataCellProps } from '../data-cell';
import './style';

interface InputUrlProps
  extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange' | 'children'>,
    DataCellProps<string> {}

const InputUrl = forwardRef<Input, InputUrlProps>(function InputUrl(props, ref) {
  const { ...restProps } = props;

  const renderLabel = (value) => {
    const isUrl = /[\w\-]+(\.[\w\-]+)+([\w\-.,@?^=%&:\/~+#]*[\w\-@?^=%&\/~+#])?$/;

    /** 如果不是网址格式，直接返回 */
    if (!isUrl.test(value)) return value;

    const reg = /^(ht|f)tps?:\/\//;

    if (!reg.test(value)) {
      value = `http://${value}`;
    }

    return (
      <a href={value} target="_blank" rel="noopener noreferrer">
        {value}
      </a>
    );
  };

  const getValueFromEvent = (event) => {
    return event.target.value;
  };

  return (
    <DataCell ref={ref} renderLabel={renderLabel} getValueFromEvent={getValueFromEvent} {...restProps}>
      <Input />
    </DataCell>
  );
});

export default InputUrl;

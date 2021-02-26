import React, { forwardRef } from 'react';
import DataCell from '../data-cell';
import Email from './Email';
import type { Input } from 'antd';
import type { EmailProps } from './Email';
import type { DataCellProps } from '../data-cell';
import './style';

interface InputEmailProps
  extends Omit<EmailProps, 'value' | 'defaultValue' | 'onChange' | 'children'>,
    DataCellProps<string> {}

const InputEmail = forwardRef<Input, InputEmailProps>(function InputEmail(props, ref) {
  const { ...restProps } = props;

  return (
    <DataCell ref={ref} {...restProps}>
      <Email />
    </DataCell>
  );
});

export default InputEmail;

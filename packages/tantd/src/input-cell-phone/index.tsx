import React, { forwardRef } from 'react';
import classNames from 'classnames';
import DataCell from '../data-cell';
import CellPhone from './CellPhone';
import type { Input } from 'antd';
import type { Value, CellPhoneProps } from './CellPhone';
import type { DataCellProps } from '../data-cell';
import './style';

const reg = /^1$|^1[3-9]$|^1[3-9][0-9]\d{0,8}$/;

const defaultValidateValue = (value?: string) => {
  return !value || (value.length === 11 && reg.test(value));
};

const defaultOnBeforePhoneChange = (value, cb) => {
  if (value) {
    if (value.length <= 11 && reg.test(value)) {
      cb(value);
    }
  } else {
    cb(value);
  }
};
interface InputCellPhoneProps
  extends Omit<CellPhoneProps, 'value' | 'defaultValue' | 'onChange' | 'children'>,
    DataCellProps<Value> {}

const InputCellPhone = forwardRef<Input, InputCellPhoneProps>(function InputCellPhone(props, ref) {
  const { wrapperClassName, validateValue, onBeforePhoneChange, ...restProps } = props;

  const renderLabel = (val) => {
    if (!val) return undefined;
    const { key, value } = val;
    return value ? `+${key} ${value}` : '';
  };

  const onConfirm = (val: Value) => {
    const fn = validateValue || defaultValidateValue;
    return fn(val.value);
  };

  return (
    <DataCell
      {...restProps}
      ref={ref}
      renderLabel={renderLabel}
      onConfirm={onConfirm}
      wrapperClassName={classNames('data-cell-input-cell-phone', wrapperClassName)}
    >
      <CellPhone
        validateValue={validateValue || defaultValidateValue}
        onBeforePhoneChange={onBeforePhoneChange || defaultOnBeforePhoneChange}
      />
    </DataCell>
  );
});

export default InputCellPhone;

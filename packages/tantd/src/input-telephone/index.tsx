import React, { forwardRef } from 'react';
import classNames from 'classnames';
import DataCell from '../data-cell';
import Telephone from './Telephone';
import type { Input } from 'antd';
import type { Value, TelephoneProps } from './Telephone';
import type { DataCellProps } from '../data-cell';
import './style';

const reg = /^\d{7,8}$/;

const defaultValidateValue = (value?: string) => {
  return !value || reg.test(value);
};

const defaultOnBeforePhoneChange = (value, cb) => {
  if (!value || /^\d{0,8}$/.test(value)) {
    cb(value);
  }
};
interface InputTelephoneProps
  extends Omit<TelephoneProps, 'value' | 'defaultValue' | 'onChange' | 'children'>,
    DataCellProps<Value> {}

const InputTelephone = forwardRef<Input, InputTelephoneProps>(function InputTelephone(props, ref) {
  const { wrapperClassName, validateValue, onBeforePhoneChange, ...restProps } = props;

  const renderLabel = (val) => {
    if (!val) return undefined;
    const { key, value } = val;
    return value ? `${key} - ${value}` : '';
  };

  const onConfirm = (val?: Value) => {
    const fn = validateValue || defaultValidateValue;
    return fn(val?.value);
  };

  return (
    <DataCell
      {...restProps}
      ref={ref}
      renderLabel={renderLabel}
      onConfirm={onConfirm}
      wrapperClassName={classNames('data-cell-input-telephone', wrapperClassName)}
    >
      <Telephone
        validateValue={validateValue || defaultValidateValue}
        onBeforePhoneChange={onBeforePhoneChange || defaultOnBeforePhoneChange}
      />
    </DataCell>
  );
});

export default InputTelephone;

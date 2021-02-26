import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import { Input, Select } from 'antd';
import type { InputProps } from 'antd/lib/input';
import codeTypes from './codes.json';

export interface Value {
  key?: string;
  value?: string;
}

export interface CellphoneProps extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange'> {
  value?: Value;
  defaultValue?: Value;
  onChange?: (val: Value) => void;
  onBeforePhoneChange?: (value: string | undefined, cb: (val: string) => void) => void;
  validateValue?: (value?: string) => boolean | boolean;
}

const InputCellphone = forwardRef<any, CellphoneProps>((props, ref) => {
  const {
    value,
    defaultValue,
    placeholder = '请输入手机号码',
    validateValue,
    onChange,
    onBeforePhoneChange,
    ...restProps
  } = props;

  const [innerValue, setInnerValue] = useState(value || defaultValue);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const { key: code = '86', value: phone = '' } = innerValue || {};

  const onValidate = async (v) => {
    if (validateValue !== undefined) {
      if (typeof validateValue === 'function') {
        return await validateValue(v);
      }
      return validateValue;
    }
    return true;
  };

  const onCodeChange = async (code: string) => {
    /** 验证中国大陆电话 */
    const validate = await onValidate(phone);
    onChange && onChange({ key: code, value: validate ? phone : '' });
  };

  const onPhoneChange = (phone?: string) => {
    onChange && onChange({ key: code, value: phone });
  };

  const checkValidate = async () => {
    const validate = await onValidate(phone);
    if (!validate) {
      console.warn('传递的值不符合手机号规范');
      onPhoneChange('');
    }
  };

  useEffect(() => {
    checkValidate();
  }, []);

  const options = useMemo(() => {
    return codeTypes.map((code) => ({ value: code, label: `+${code}` }));
  }, []);

  const onInputChange = async (e) => {
    const { value } = e.target;
    if (!onBeforePhoneChange) {
      onPhoneChange(value);
    } else {
      onBeforePhoneChange(value, onPhoneChange);
    }
  };

  const selectBefore = (
    <Select
      style={{ width: 86 }}
      showSearch
      value={code}
      onChange={onCodeChange}
      optionFilterProp="label"
      options={options}
    />
  );

  return (
    <Input
      ref={ref}
      allowClear={true}
      placeholder={placeholder}
      value={phone}
      addonBefore={selectBefore}
      onChange={onInputChange}
      {...restProps}
    />
  );
});

export default InputCellphone;

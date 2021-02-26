import React, { useState, useEffect, useMemo, forwardRef } from 'react';
import { Input, Select } from 'antd';
import type { InputProps } from 'antd/lib/input';
// import codeTypes from './codes.json';

export interface Value {
  key?: string;
  value?: string;
}

export interface TelephoneProps extends Omit<InputProps, 'value' | 'defaultValue' | 'onChange'> {
  value?: Value;
  defaultValue?: Value;
  onChange?: (val: Value) => void;
  onBeforePhoneChange?: (value: string | undefined, cb: (val: string) => void) => void;
  validateValue?: (value?: string) => boolean | boolean;
}

const InputTelephone = forwardRef<any, TelephoneProps>((props, ref) => {
  const {
    value,
    defaultValue,
    placeholder = '请输入电话号码',
    validateValue,
    onChange,
    onBeforePhoneChange,
    ...restProps
  } = props;

  const [innerValue, setInnerValue] = useState(value || defaultValue);

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const { key: code = '010', value: phone = '' } = innerValue || {};

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
    return [];
    // return codeTypes.map((citys) => {
    //   let renderCitys = citys;
    //   const [[province, pCode], ...oCitys] = citys;
    //   if (!pCode) renderCitys = oCitys;
    //   return {
    //     value: province,
    //     label: province,
    //     options: renderCitys.map((city) => {
    //       if (city.length < 2) return;
    //       const [name, code] = city;
    //       return {
    //         value: code,
    //         label: `${code} ${name}`,
    //       };
    //     }),
    //   };
    // });
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
      style={{ width: 120 }}
      showSearch
      value={code}
      onChange={onCodeChange}
      options={options}
      optionFilterProp="label"
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

export default InputTelephone;

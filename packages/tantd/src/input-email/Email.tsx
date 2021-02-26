import React, { useState, useEffect, forwardRef } from 'react';
import { AutoComplete } from 'antd';
import type { Input } from 'antd';
import type { AutoCompleteProps } from 'antd/lib/auto-complete';

export interface EmailProps extends AutoCompleteProps {}

const emails = [
  'qq.com',
  '163.com',
  '126.com',
  '139.com',
  'gmail.com',
  'sohu.com',
  'sina.com',
  'outlook.com',
  'amazon.com',
  'yahoo.com',
  'hotmail.com',
];

const emailRegexp = /^[a-zA-Z_\-0-9\u4e00-\u9fa5]+(\.[a-zA-Z_\-0-9\u4e00-\u9fa5]+)?@([a-zA-Z_\-0-9]{2,10}\.){1,3}[a-zA-Z]{2,10}$/;

const InputTelephone = forwardRef<Input, EmailProps>((props, ref) => {
  const { placeholder = '请输入邮箱', ...restProps } = props;

  const [list, setList] = useState<any>([]);

  // useEffect(() => {
  //   const { value, onChange } = props;
  //   if (value && !emailRegexp.test(String(value))) {
  //     onChange && onChange();
  //   }
  // }, []);

  const onSearch = (value: string) => {
    let result: string[] = [];
    if (!(!value || value.indexOf('@') >= 0)) {
      result = emails.map((domain) => `${value}@${domain}`);
    }
    setList(result);
  };

  return (
    <AutoComplete ref={ref} showSearch onSearch={onSearch} {...restProps}>
      {list.map((item) => (
        <AutoComplete.Option key={item} value={item}>
          {item}
        </AutoComplete.Option>
      ))}
    </AutoComplete>
  );
});

export default InputTelephone;

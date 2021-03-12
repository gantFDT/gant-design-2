import React from 'react';
import { SchemaForm } from 'tantd';

const schema = {
  type: "object",
  title: "普通表单",
  required: ['key_1'],
  propertyType: {
      key_1: {
          title: "普通输入框",
          type: "string",
      },
      key_4: {
          title: "url地址",
          type: "string",
          componentType: "InputUrl"
      },
      key_5: {
          title: "邮箱",
          type: "string",
          componentType: "InputEmail"
      },
      key_7: {
          title: "手机号",
          type: "string",
          componentType: "InputCellPhone"
      },
  }
}
export default () => {
  return <SchemaForm schema={schema} />;
};

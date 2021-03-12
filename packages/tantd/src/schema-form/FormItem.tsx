import React, { useMemo } from 'react';

import { Form as AntdForm, Col } from 'antd';

import { getFields } from './map';

import Input from '../input';

import { SchemaItem, FormItemProps } from './interface';

import { get } from 'lodash';

import { getUiSchemaMaps, getCol } from './utils';

const fieldsMaps = getFields();

const FormItem: React.FC<FormItemProps> = (props) => {
  const { schema, native, id, uiSchema } = props;
  const { componentType = 'Input', type, props: itemProps, options, title } = schema as SchemaItem;

  const uiSchemaMaps = getUiSchemaMaps(uiSchema, id);

  const InputComponet = useMemo(() => {
    return get(fieldsMaps, componentType, Input);
  }, [componentType]);
  const wrapperCol = uiSchemaMaps['field:wrapperCol'];
  const labelCol = uiSchemaMaps['field:labelCol'];
  const labelAlign = uiSchemaMaps['field:labelAlign'];
  const col = uiSchemaMaps['field:col'];
  return (
    <Col {...getCol(col)}>
      <AntdForm.Item
        id={id}
        label={title}
        wrapperCol={getCol(wrapperCol)}
        labelCol={getCol(labelCol)}
        labelAlign={labelAlign}
      >
        <InputComponet native={native} />
      </AntdForm.Item>
    </Col>
  );
};
export default FormItem;

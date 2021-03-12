import React, { forwardRef, useMemo } from 'react';

import { Form as AntdForm, Row, Col } from 'antd';

import FormItem from './FormItem';

import FormList from './FormList';

import { SchemaFormProps } from './interface';

import { FormInstance } from 'antd/lib/form';

import { getMapSchema, getUiSchemaMaps, getCol } from './utils';

import { isEmpty, isNumber } from 'lodash';

const SchemaForm = forwardRef<FormInstance, SchemaFormProps>(function (props, ref) {
  const {
    form: propForm,
    schema,
    native,
    layout,
    rowProps,
    uiSchema,
    wrapperCol: propWrapperCol,
    labelCol: propLabelCol,
  } = props;

  const [form] = AntdForm.useForm(propForm);

  const golbalUiSchemaMaps = useMemo(() => getUiSchemaMaps(uiSchema), [uiSchema]);

  const orders = golbalUiSchemaMaps['form:orders'];

  const wrapperCol = golbalUiSchemaMaps['field:wrapperCol'];

  const labelCol = golbalUiSchemaMaps['field:labelCol'];

  const schemaMaps = useMemo(() => getMapSchema(schema), [schema, orders]);

  const isInline = layout === 'inline';

  const renderItem = useMemo(() => {
    return Object.keys(schemaMaps).map((name) => {
      const item = schemaMaps[name];
      const { type, items } = item;
      if (type === 'array' && item && !isEmpty(items))
        return <FormList schema={item} key={name} id={name} native={native} />;
      return <FormItem schema={item} key={name} id={name} native={native} uiSchema={uiSchema} />;
    });
  }, [schemaMaps, uiSchema, native]);

  return (
    <AntdForm
      form={form}
      wrapperCol={{
        ...getCol(wrapperCol),
        ...propWrapperCol,
      }}
      labelCol={{
        ...getCol(labelCol),
        ...propLabelCol,
      }}
      layout={layout}
    >
      <Row gutter={[10, 10]} {...rowProps}>
        {renderItem}
      </Row>
    </AntdForm>
  );
});

SchemaForm.defaultProps = {
  size: 'middle',
  native: true,
  layout: 'vertical',
};
export default SchemaForm;

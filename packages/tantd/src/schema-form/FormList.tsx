import React, { memo } from 'react';
import { Form as AntdForm, Row, Col } from 'antd';
import { get, isEmpty } from 'lodash';
import { FormListProps } from './interface';
import FormItem from './FormItem';

export default memo(function FormList(props: FormListProps) {
  const { id, schema = {}, native } = props;
  const { type, items = {} } = schema;
  if (type !== 'array' || isEmpty(items) || !items) {
    return null;
  }
  return (
    <AntdForm.List name={id}>
      {(fields: any[], { add, remove }: any) => {
        return (
          <Row>
            {fields.map((field) =>
              Object.keys(items).map((itemName) => {
                return (
                  <FormItem key={field + itemName} id={itemName} native={native} schema={get(items, itemName, {})} />
                );
              }),
            )}
          </Row>
        );
      }}
    </AntdForm.List>
  );
});

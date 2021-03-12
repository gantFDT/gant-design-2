import { Schema, SchemaItem, UiSchema, UiSchemaItem } from './interface';

import { get, merge, isEmpty, isNumber } from 'lodash';
import { ColProps } from 'antd';

export function getOrders(schema: Schema | SchemaItem, orders?: string[]) {
  const orderObject = {};
  const schemaOrders = Array.isArray(orders) ? orders : [];
  let base: string = '';
  schemaOrders.map((name, index) => {
    if (name === '*') base += '*';
    orderObject[name] = {};
    return name;
  });
  // Object.keys(schema).sort((a: string, b: string) => {
  //   const aIndex = get(orderObject, a, 0);
  //   const bIndex = get(orderObject, b, 0);
  //   return
  // });
}

export function getMapSchema(schema?: Schema | SchemaItem, formName?: string, orders?: string[]) {
  let map: {
    [name: string]: SchemaItem | Schema;
  } = {};

  if (isEmpty(schema)) return {};
  const { type, propertyType = {}, items } = schema as Schema | SchemaItem;
  if (type == 'object') {
    Object.keys(propertyType).map((keyname) => {
      const itemSchema = propertyType[keyname];

      const itemType = get(propertyType, `${keyname}.type`, 'string');

      const itemName = formName ? `${formName}.${keyname}` : keyname;

      if (itemType === 'object') {
        const childrenMap = getMapSchema(itemSchema, itemName);
        map = { ...map, ...childrenMap };
        return itemName;
      }
      if (itemType === 'array' && !isEmpty(itemSchema.items)) {
        map[itemName] = getItemsMap(itemSchema.items as any);
        return itemName;
      }

      map[itemName] = propertyType[keyname];

      return itemName;
    });
  }
  if (type === 'array' && formName && !isEmpty(items)) {
    map[formName] = schema as Schema | SchemaItem;
  }
  return map;
}
function getItemsMap(schema: SchemaItem) {
  const { items } = schema;
  let map: {
    [name: string]: SchemaItem | Schema;
  } = {};
  if (!items || isEmpty(items)) return map;
  Object.keys(items).map((keyname) => {
    const itemSchema = items[keyname];

    const itemType = get(items, `${keyname}.type`, 'string') as string;

    const itemName = keyname;

    if (itemType === 'object') {
      const childrenMap = getMapSchema(itemSchema, itemName);
      map = { ...map, ...childrenMap };
      return itemSchema;
    }
    if (itemType === 'array' && !isEmpty(itemSchema.items)) {
      map[itemName] = getItemsMap(itemSchema.items as any);
      return itemSchema;
    }

    map[itemName] = items[keyname];

    return itemSchema;
  });
  return map;
}

const defaultUiSchema: UiSchema = {
  'field:col': 24,
  'field:labelCol': 24,
  'field:wrapperCol': 24,
};

export function getUiSchemaMaps(uischema?: UiSchema, namePath?: string) {
  uischema = isEmpty(uischema) || !uischema ? defaultUiSchema : uischema;
  let ui: UiSchemaItem = {};
  Object.keys(uischema).map((uiname) => {
    if (uiname.indexOf('field:') == 0 || uiname.indexOf('form:') == 0) {
      ui[uiname] = (uischema as UiSchema)[uiname];
    }
    return uiname;
  });
  if (!namePath) return ui;
  const nameArray = namePath.split('.');
  const namePathArray = [];
  nameArray.map((nameItem, index) => {
    const array = nameArray.slice(0, index + 1);
    const itemPath = array.join('.');
    ui = { ...ui, ...getMapSchema(get(uischema, itemPath) as any) };
    return nameItem;
  });
  return ui;
}

export function getCol(col: ColProps | number = 24) {
  if (isNumber(col))
    return {
      span: col,
    } as ColProps;
  return col;
}

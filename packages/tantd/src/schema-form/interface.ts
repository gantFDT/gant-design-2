import { FormProps, FormListProps as AntFormListProps, FormInstance } from 'antd/lib/form';
import { FormLabelAlign } from 'antd/lib/form/interface';
import { ColProps, RowProps } from 'antd/lib/grid';

export interface SchemaFormProps extends Omit<FormProps, 'fields' | 'children'> {
  schema?: Schema;
  uiSchema?: UiSchema;
  native?: boolean;
  rowProps?: RowProps;
}

export interface FormItemProps {
  schema: SchemaItem | Schema;
  id: string;
  native?: boolean;
  uiSchema?: UiSchema;
}
export interface FormListProps extends FormItemProps {}
export interface SchemaItem {
  title?: string;
  operator?: string;
  type?: 'string' | 'array' | 'object' | 'number' | 'blooean' | string;
  componentType?: Fields | string;
  propertyType?: {
    [propsname: string]: Schema;
  };
  required?: Array<string> | boolean;
  items?: {
    [propsname: string]: Schema;
  };
  options?: FormItemProps | AntFormListProps;
  dependencies?: Array<string>;
  onDependenciesChange?: (value: any, props: any, form: FormInstance) => any;
  props?: any;
  hidden?: boolean;
}

export interface Schema {
  name?: string;
  title?: string;
  type: 'array' | 'object';
  propertyType?: {
    [propsname: string]: SchemaItem;
  };
  required?: Array<string> | boolean;
  items?: {
    [propsname: string]: SchemaItem;
  };
}
export interface UiSchemaItem {
  'form:orders'?: string[];
  'field:col'?: ColProps | number;
  'field:labelCol'?: ColProps | number;
  'field:wrapperCol'?: ColProps | number;
  'field:labelAlign'?: FormLabelAlign;
  'field:style'?: React.CSSProperties;
  'field:className'?: string;
  'field:noStyle'?: boolean;
}
export interface UiSchema extends UiSchemaItem {
  [propsname: string]: string[] | string | ColProps | React.CSSProperties | number | boolean | UiSchema | undefined;
}

export enum Fields {
  Input = 'Input',
  Password = 'Password',
  InputNumber = 'InputNumber',
  InputMoney = 'InputMoney',
  InputUrl = 'InputUrl',
  InputEmail = 'InputEmail',
  InputLanguage = 'InputLanguage',
  InputCellPhone = 'InputCellPhone',
  InputTelePhone = 'InputTelePhone',
  TextArea = 'TextArea',
  DatePicker = 'DatePicker',
  RangePicker = 'RangePicker',
  ColorPicker = 'ColorPicker',
  Selector = 'Selector',
  IconSelector = 'IconSelector',
  LocationSelector = 'LocationSelector',
  Switch = 'Switch',
  Checkbox = 'Checkbox',
  CheckboxGroup = 'CheckboxGroup',
  Radio = 'Radio',
  RadioGroup = 'RadioGroup',
  AutoComplete = 'AutoComplete',
  Search = 'Search',
  TreeSelector = 'TreeSelector',
}

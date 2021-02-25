import {
  PickerBaseProps as AntdPickerBaseProps,
  PickerDateProps as AntdPickerDateProps,
  PickerTimeProps as AntdPickerTimeProps,
  RangePickerBaseProps as AntdRangePickerBaseProps,
} from 'antd/lib/date-picker/generatePicker';

import { DataCellProps } from '../data-cell';

import { Moment } from 'moment';

export interface PickerBaseProps
  extends Omit<AntdPickerBaseProps<Moment>, 'onChange' | 'children' | 'value' | 'defaultValue'>,
    Omit<DataCellProps<string>, 'value' | 'onChange'> {
  onChange?: (value: string, momnet: Moment) => void;
  value?: string;
  defaultValue?: string;
}

export interface PickerDateProps
  extends Omit<AntdPickerDateProps<Moment>, 'onChange' | 'children' | 'value' | 'defaultValue'>,
    Omit<DataCellProps<string>, 'value' | 'onChange'> {
  onChange?: (value: string, momnet: Moment) => void;
  value?: string;
  defaultValue?: string;
}

export interface PickerTimeProps
  extends Omit<AntdPickerTimeProps<Moment>, 'onChange' | 'children' | 'value' | 'defaultValue'>,
    Omit<DataCellProps<string>, 'value' | 'onChange'> {
  onChange?: (value: string, datemomnet: Moment) => void;
  value?: string;
  defaultValue?: string;
}
export type DatePickerProps = PickerBaseProps | PickerDateProps | PickerTimeProps;

export interface RangePickerProps
  extends Omit<AntdRangePickerBaseProps<Moment>, 'value' | 'defaultValue' | 'onChange' | 'children' | 'disabled'>,
    Omit<DataCellProps<string[]>, 'value' | 'onChange' | 'children' | 'defaultValue'> {
  value?: string[];
  defaultValue?: string[];
  onChange: (value: string[], datemomnet: Moment[]) => void;
}

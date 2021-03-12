import React, { memo, forwardRef, useState, useEffect, useMemo, useCallback, StaticLifecycle } from 'react';

import { DatePicker as AntdDatePicker } from 'antd';

import DataCell from '../data-cell';

import RangePicker from './RangePicker';

import moment from 'moment';

import { DatePickerProps } from './interface';

const defaultFormat = 'YYYY-MM-DD';
interface ComponentWithStaticMethod
  extends React.ForwardRefExoticComponent<DatePickerProps & React.RefAttributes<any>> {
  RangePicker: typeof RangePicker;
}
const DatePicker: ComponentWithStaticMethod = forwardRef<any, DatePickerProps>(function (props, ref) {
  const { value: propValue, format = defaultFormat, defaultValue, onChange, defaultPickerValue } = props;
  const [value, setValue] = useState<string | undefined>(defaultValue);
  const hasValue = Reflect.has(props, 'value');
  useEffect(() => {
    if (hasValue) {
      if (moment.isMoment(propValue)) return console.error('value only supports string, not moment');
      setValue(propValue);
    }
  }, [propValue, hasValue]);
  const dateValue = useMemo(() => {
    return value ? moment(value) : undefined;
  }, [value]);

  const handleChange = useCallback(
    (datemoment, datestring) => {
      onChange && onChange(datestring, datemoment);
      if (!hasValue) setValue(datestring);
    },
    [onChange, hasValue],
  );
  const renderLabel = useCallback(
    (value) => {
      if (value && moment.isMoment(value)) return value.format(format as string);
      return '';
    },
    [format],
  );
  return (
    <DataCell {...props} value={dateValue} onChange={handleChange} renderLabel={renderLabel} ref={ref}>
      <AntdDatePicker />
    </DataCell>
  );
}) as ComponentWithStaticMethod;
DatePicker.RangePicker = RangePicker;
export default DatePicker;

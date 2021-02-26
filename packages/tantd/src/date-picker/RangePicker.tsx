import React, { memo, forwardRef, useState, useEffect, useMemo, useCallback } from 'react';

import { DatePicker as AntdDatePicker } from 'antd';

import DataCell from '../data-cell';

import moment, { Moment } from 'moment';

import { RangePickerProps } from './interface';

import { isEmpty, get } from 'lodash';

const defaultFormat = 'YYYY-MM-DD';

const RangePicker = forwardRef<any, RangePickerProps>(function (props, ref) {
  const { value: propValue, format = defaultFormat, defaultValue, onChange, defaultPickerValue } = props;
  const [value, setValue] = useState<string[] | undefined>(defaultValue);
  const hasValue = Reflect.has(props, 'value');
  useEffect(() => {
    if (hasValue) {
      if (!propValue || !Array.isArray(propValue)) return;
      const [startDate, endDate] = propValue;
      if (moment.isMoment(startDate) || moment.isMoment(endDate))
        return console.error('value only supports string, not moment');
      setValue(propValue);
    }
  }, [propValue, hasValue]);
  const dateValue = useMemo(() => {
    if (!value || isEmpty(value)) return [];
    let [startDate, endDate]: any[] = value;
    startDate = startDate ? moment(startDate) : undefined;
    endDate = endDate ? moment(endDate) : undefined;
    return [startDate, endDate];
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
      if (!value || isEmpty(value)) return '';
      const startDate: Moment | undefined = get(value, '[0]');
      const endDate: Moment | undefined = get(value, '[0]');
      const startString = startDate ? startDate.format(format as string) : '';
      const endString = endDate ? endDate.format(format as string) : '';
      if (!startString && !endString) return '';
      return `${startString}~${endString}`;
    },
    [format],
  );
  return (
    <DataCell
      wrapperClassName="gantd-range-picker"
      {...props}
      value={dateValue}
      onChange={handleChange}
      renderLabel={renderLabel}
      ref={ref}
    >
      <AntdDatePicker.RangePicker />
    </DataCell>
  );
});
export default RangePicker;

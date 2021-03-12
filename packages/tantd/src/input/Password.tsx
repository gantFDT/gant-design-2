import React, { forwardRef } from 'react';

import classnames from 'classnames';

import { Input as AntdInput } from 'antd';

import DataCell, { DataCellProps } from '../data-cell';

import { PasswordProps } from 'antd/lib/input';

interface InputDataCellProps
  extends PasswordProps,
    Omit<DataCellProps<string>, 'value' | 'onChange' | 'children' | 'defaultValue'> {}

const Password = forwardRef<AntdInput, InputDataCellProps>(function InputDataCell(props, ref) {
  const { getValueFromEvent: propgetValueFromEvent, wrapperClassName } = props;
  const getValueFromEvent = (event) => {
    return event.target.value;
  };
  return (
    <DataCell
      {...props}
      wrapperClassName={classnames('gant-input', wrapperClassName)}
      ref={ref}
      getValueFromEvent={getValueFromEvent}
    >
      <AntdInput.Password />
    </DataCell>
  );
});

export default Password;

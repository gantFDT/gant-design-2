import React, { forwardRef } from 'react';
import classnames from 'classnames';
import { Input as AntdInput } from 'antd';

import DataCell, { DataCellProps } from '../data-cell';

import { InputProps } from 'antd/lib/input';

import Password from './Password';

interface InputDataCellProps
  extends InputProps,
    Omit<DataCellProps<string>, 'value' | 'onChange' | 'children' | 'defaultValue'> {}

interface ComponentWithStaticMethod
  extends React.ForwardRefExoticComponent<InputDataCellProps & React.RefAttributes<AntdInput>> {
  Password: typeof Password;
}
const Input: ComponentWithStaticMethod = forwardRef<AntdInput, InputDataCellProps>(function InputDataCell(props, ref) {
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
      <AntdInput />
    </DataCell>
  );
}) as ComponentWithStaticMethod;
Input.Password = Password;
export default Input;

import React, { forwardRef } from 'react';
import classNames from 'classnames';
import DataCell from '../data-cell';
import PureColorPicker from './ColorPicker';
import type { DataCellProps } from '../data-cell';
// import './style';
export interface ForwardLocationSelectorProps
  extends DataCellProps<string>,
    Omit<any, 'defaultValue' | 'value' | 'onChange'> {}

const ColorPicker = forwardRef<any, ForwardLocationSelectorProps>((props, ref) => {
  const { wrapperClassName, ...restProps } = props;

  const renderLabel = (value) => {
    return <PureColorPicker value={value} edit={false} />;
  };

  return (
    <DataCell
      {...restProps}
      ref={ref}
      renderLabel={renderLabel}
      wrapperClassName={classNames('data-cell-color-picker', wrapperClassName)}
    >
      <PureColorPicker />
    </DataCell>
  );
});

export default ColorPicker;

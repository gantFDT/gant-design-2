import React, { forwardRef } from 'react';
import classNames from 'classnames';
import DataCell from '../data-cell';
import PureSelector from './Selector';
import type { DataCellProps } from '../data-cell';
import type { SelectValue, RefSelectProps } from 'antd/lib/select';
import type { SelectorProps as PureSelectorProps } from './Selector';
import './style';

export interface SelectorProps extends DataCellProps<SelectValue>, Omit<PureSelectorProps, 'value' | 'onChange'> {}

const Selector = forwardRef<RefSelectProps, SelectorProps>((props, ref) => {
  const { wrapperClassName, ...restProps } = props;
  const renderLabel = (value) => {
    if (!value) return;
    const valArr = Array.isArray(value) ? value : [value];
    const showValue = valArr.map((v) => v.label).join('、');
    return showValue;
  };
  return (
    <DataCell
      {...restProps}
      ref={ref}
      renderLabel={renderLabel}
      wrapperClassName={classNames('data-cell-selector', wrapperClassName)}
    >
      <PureSelector />
    </DataCell>
  );
});

export default Selector;

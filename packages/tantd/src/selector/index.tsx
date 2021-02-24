import React, { forwardRef } from 'react';
import classNames from 'classnames';
import DataCell from '../data-cell';
import Selector from './generate';
import type { DataCellProps } from '../data-cell';
import type { SelectValue, RefSelectProps } from 'antd/lib/select';
import type { SelectorProps } from './generate';
import styles from './style/index.less';

export interface ForwardSelectorProps extends DataCellProps<SelectValue>, Omit<SelectorProps, 'value' | 'onChange'> {}

const ForwardSelector = forwardRef<RefSelectProps, ForwardSelectorProps>((props, ref) => {
  const { className, style, ...restProps } = props;
  const renderLabel = (value) => {
    if (!value) return;
    const valArr = Array.isArray(value) ? value : [value];
    const showValue = valArr.map((v) => v.label).join('、');
    return showValue;
  };
  return (
    <DataCell {...restProps} ref={ref} renderLabel={renderLabel}>
      <Selector className={classNames(styles.dataCellSelector, className)} style={{ width: '100%', ...style }} />
    </DataCell>
  );
});

export default ForwardSelector;

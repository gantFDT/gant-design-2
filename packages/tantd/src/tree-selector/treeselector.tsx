import React, { forwardRef } from 'react';

import { TreeSelect } from 'antd';

import classnames from 'classnames';

import type { TreeSelectProps, RefTreeSelectProps } from 'antd/lib/tree-select';

import DataCell, { DataCellProps } from '../data-cell';

interface TreeSelectorProps
  extends Omit<TreeSelectProps<string | string[]>, 'onChange' | 'children'>,
    DataCellProps<string | string[]> {}

const TreeSelector = forwardRef<RefTreeSelectProps, TreeSelectorProps>(function (props, ref) {
  const { children, wrapperClassName, ...restProps } = props;
  return (
    <DataCell {...restProps} ref={ref} wrapperClassName={classnames(wrapperClassName, 'gantd-tree-select')}>
      <TreeSelect>{children}</TreeSelect>
    </DataCell>
  );
});

export default TreeSelector;

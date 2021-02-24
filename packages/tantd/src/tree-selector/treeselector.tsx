import React, { forwardRef } from 'react';

import { TreeSelect } from 'antd';

import type { TreeSelectProps, RefTreeSelectProps } from 'antd/lib/tree-select';

import DataCell, { DataCellProps } from '../data-cell';

interface TreeSelectorProps
  extends Omit<TreeSelectProps<string | string[]>, 'onChange' | 'children'>,
    DataCellProps<string | string[]> {}

const TreeSelector = forwardRef<RefTreeSelectProps, TreeSelectorProps>(function (props, ref) {
  const { children, ...restProps } = props;
  console.log('TreeSelector---->',restProps.value);
  return (
    <DataCell {...restProps} ref={ref}>
      <TreeSelect>{children}</TreeSelect>
    </DataCell>
  );
});

export default TreeSelector;

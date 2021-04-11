import React, { forwardRef } from 'react';
import { Rate } from 'antd';
import DataCell, { DataCellProps } from '../data-cell';
import classnames from 'classnames';
import { RateProps } from 'antd/lib/rate';

export interface ForwardRateProps extends DataCellProps<string>, Omit<any, 'defaultValue' | 'value' | 'onChange'> {}

export default forwardRef<RateProps, ForwardRateProps>((props, ref) => {
  const { wrapperClassName } = props;
  return (
    <DataCell
      {...props}
      ref={ref}
      wrapperClassName={classnames('gant-rate', wrapperClassName)}
      renderLabel={(value, ...args) => <Rate value={value} {...args} disabled />}
    >
      <div className="cell-label">
        <Rate />
      </div>
    </DataCell>
  );
});

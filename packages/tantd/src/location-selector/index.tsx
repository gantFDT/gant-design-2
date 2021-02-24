import React, { forwardRef } from 'react';
import classNames from 'classnames';
import DataCell from '../data-cell';
import LocationSelector, { getLocationName } from './generate';
import type { DataCellProps } from '../data-cell';
import type { LocationSelectorProps } from './generate';
import styles from './style/index.less';

export interface ForwardLocationSelectorProps
  extends DataCellProps<string[]>,
    Omit<LocationSelectorProps, 'defaultValue' | 'value' | 'onChange'> {}

const ForwardSelector = forwardRef<any, ForwardLocationSelectorProps>((props, ref) => {
  const { wrapperClassName, ...restProps } = props;

  const renderLabel = (value) => {
    return getLocationName(value).join(' / ');
  };

  return (
    <DataCell
      {...restProps}
      ref={ref}
      renderLabel={renderLabel}
      wrapperClassName={classNames(styles.cellWrap, wrapperClassName)}
    >
      <LocationSelector />
    </DataCell>
  );
});

export default class LocationWrapper extends React.Component<ForwardLocationSelectorProps> {
  static getLocationName: (list: string[]) => string[];
  render() {
    return <ForwardSelector {...this.props} />;
  }
}

LocationWrapper.getLocationName = getLocationName;

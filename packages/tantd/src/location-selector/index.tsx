import React, { forwardRef } from 'react';
import classNames from 'classnames';
import DataCell from '../data-cell';
import PureLocationSelector, { getLocationName } from './LocationSelector';
import type { DataCellProps } from '../data-cell';
import type { LocationSelectorProps as PureLocationSelectorProps } from './LocationSelector';
import './style';

export interface LocationSelectorProps
  extends DataCellProps<string[]>,
    Omit<PureLocationSelectorProps, 'defaultValue' | 'value' | 'onChange'> {}

const ForwardLocationSelector = forwardRef<any, LocationSelectorProps>((props, ref) => {
  const { wrapperClassName, ...restProps } = props;

  const renderLabel = (value) => {
    return getLocationName(value).join(' / ');
  };

  return (
    <DataCell
      {...restProps}
      ref={ref}
      renderLabel={renderLabel}
      wrapperClassName={classNames('data-cell-location-selector', wrapperClassName)}
    >
      <PureLocationSelector />
    </DataCell>
  );
});

class LocationSelector extends React.Component<LocationSelectorProps> {
  static getLocationName: (list: string[]) => string[];
  render() {
    return <ForwardLocationSelector {...this.props} />;
  }
}

LocationSelector.getLocationName = getLocationName;

export default LocationSelector;

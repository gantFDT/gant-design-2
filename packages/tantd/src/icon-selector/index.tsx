import React from 'react';

import AntdIcon from '../icon';

import IconSelector from './IconSelector';

import DataCell from '../data-cell';

import { GantIconSelectorProps } from './interface';

export default class GantIconSeletor extends React.Component<GantIconSelectorProps> {
  renderLabel = (value) => {
    return <AntdIcon type={value} />;
  };
  render() {
    return (
      <DataCell {...this.props} renderLabel={this.renderLabel}>
        <IconSelector />
      </DataCell>
    );
  }
}

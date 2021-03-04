import React, { forwardRef, useState, useEffect, Component } from 'react';

import classnames from 'classnames';

import AntdIcon from '../icon/AntdIcon';

import IconSelectorDrawer from './IconSelectorDrawer';

import { IconselectorProps } from './interface';

AntdIcon.updateFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_1252237_koeueebqase.js',
});

export default class IconSelector extends Component<IconselectorProps> {
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.value && Reflect.has(nextProps, 'value')) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }
  state = {
    value: undefined,
    visiable: false,
  };

  onConfirm = (val) => {
    const { value, onChange } = this.props;
    if (Reflect.has(this.props, 'value')) {
      onChange && onChange(val);
      this.setState({
        ...this.state,
        visiable: false,
      });
      return;
    }
    this.setState({
      ...this.state,
      visiable: false,
      value: val,
    });
  };

  handleDrawer = () => {
    this.setState({
      ...this.state,
      visiable: true,
    });
  };
  onCloseDrawer = () => {
    this.setState({
      ...this.state,
      visiable: false,
    });
  };

  static updateFromIconfontCN = AntdIcon.updateFromIconfontCN;

  render() {
    const { value, visiable } = this.state;
    const { className, drawerWidth, drawerClassname, drawerBodyStyle, size, ...restProps } = this.props;
    const selectorClassnames = classnames('icon-selector', className, {
      'icon-selector-sm': size === 'small',
      'icon-selector-lg': size === 'large',
    });
    return (
      <div className={selectorClassnames}>
        <div className="icon-selector-wrapper" onClick={this.handleDrawer}>
          <AntdIcon {...restProps} type={value} />
        </div>
        <IconSelectorDrawer
          visible={visiable}
          className={drawerClassname}
          bodyStyle={drawerBodyStyle}
          onClose={this.onCloseDrawer}
          width={drawerWidth}
          value={value}
          onConfirm={this.onConfirm}
        />
      </div>
    );
  }
}

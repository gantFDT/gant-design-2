import React, { Component } from 'react';

import { IconBaiscProps } from './interface';

import * as allIcons from '@ant-design/icons';

import { createFromIconfontCN } from '@ant-design/icons';

import { IconFontProps, CustomIconOptions } from '@ant-design/icons/lib/components/IconFont';

import { omit } from 'lodash';

export const antdIcons = omit(allIcons, [
  'createFromIconfontCN',
  'setTwoToneColor',
  'getTwoToneColor',
  'IconProvider',
  'default',
]);

let DynamicIcon: React.FC<IconFontProps>;

export default class AntdIcon extends Component<IconBaiscProps> {
  static updateFromIconfontCN: (options?: CustomIconOptions | undefined) => void;
  render() {
    const { type, ...restprops } = this.props;
    if (!type) return null;
    const isAntdIcon = Reflect.has(allIcons, type);
    if (isAntdIcon) {
      const Icon = antdIcons[type];
      return <Icon {...restprops} />;
    }
    if (!DynamicIcon) return null;
    return <DynamicIcon type={type} {...restprops} />;
  }
}

AntdIcon.updateFromIconfontCN = (config: CustomIconOptions) => {
  const Iconfont = createFromIconfontCN(config);
  // 记忆最新icon
  DynamicIcon = (DynamicIcon as any) ? DynamicIcon : Iconfont;
};

import React from 'react';
import AntdLocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import fullLocale from './index';
import type { Locale } from './index';

export enum ComponentName {
  Grid = 'Grid',
  AutoReload = 'AutoReload',
  Selector = 'Selector',
}

export interface LocaleReceiverProps {
  componentName: ComponentName;
  customLocale: { [key: string]: string };
  children: (locale: Locale[ComponentName], localeCode?: string, fullLocale?: Locale) => React.ReactNode;
}

const LocaleReceiver = (props: LocaleReceiverProps) => {
  const { componentName, customLocale, children } = props;

  return (
    <AntdLocaleReceiver>
      {(antdLocale, localeCode = 'zh-cn') => {
        const locale = fullLocale[localeCode];
        const componentLocale = { ...locale[componentName], ...customLocale };
        return children(componentLocale, localeCode, locale);
      }}
    </AntdLocaleReceiver>
  );
};

export default LocaleReceiver;

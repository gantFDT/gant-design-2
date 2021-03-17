import enUS from './en_US';
import zhCN from './zh_CN';

export * from './LocaleReceiver';

export interface Locale {
  locale: string;
  Grid: typeof enUS.Grid;
  AutoReload: typeof enUS.AutoReload;
  Selector: typeof enUS.Selector;
}

export default {
  [enUS.locale]: enUS,
  [zhCN.locale]: zhCN,
};

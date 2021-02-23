import React, { useState } from 'react';
import { Radio, Switch, ConfigProvider } from 'antd';
import { AutoReload } from 'tantd';
import enUS from 'antd/lib/locale/en_US';
import zhCN from 'antd/lib/locale/zh_CN';

export default () => {
  const initalLocale = {
    tips: '自定义-tips',
    close: '自定义-close',
    open: '自定义-open',
    set: '自定义-set',
    unit: '自定义-unit',
  };

  const [i18n, setI18n] = useState(zhCN);
  const [customLocale, setCustomLocale] = useState(false);

  return (
    <>
      <ConfigProvider locale={i18n}>
        <div style={{ marginBottom: 10 }}>
          <Radio.Group size="small" onChange={(e) => setI18n(e.target.value)} value={i18n}>
            <Radio.Button key="en" value={enUS}>
              英文
            </Radio.Button>
            <Radio.Button key="zh-cn" value={zhCN}>
              中文
            </Radio.Button>
          </Radio.Group>
          <span style={{ marginLeft: 10 }}>自定义local：</span>
          <Switch
            checked={customLocale}
            onChange={(checked) => {
              setCustomLocale(checked);
            }}
          />
        </div>
        <AutoReload
          locale={i18n}
          customLocale={customLocale ? initalLocale : null}
          refresh={() => {
            console.log('refresh1');
          }}
        />
      </ConfigProvider>
    </>
  );
};

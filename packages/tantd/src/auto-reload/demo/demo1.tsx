import React from 'react';
import { AutoReload } from 'tantd';

export default () => {
  return <AutoReload
    refresh={() => { console.log('refresh1') }}
  />;
};

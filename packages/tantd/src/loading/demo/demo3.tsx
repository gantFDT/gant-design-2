import React, { useEffect, useState } from 'react';
import { AimOutlined } from '@ant-design/icons';
import { Loading } from 'tantd';

//自定义icon
export default () => {
  const antIcon = <AimOutlined style={{ fontSize: 24 }} />;
  return <Loading indicator={antIcon} />;
};

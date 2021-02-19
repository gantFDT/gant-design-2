import React, { useState, useRef } from 'react';
import { Submenu } from 'tantd';
import { Avatar } from 'antd';
import _ from 'lodash';
import { UserOutlined, GlobalOutlined, KeyOutlined, InfoCircleOutlined, HistoryOutlined, BookOutlined } from '@ant-design/icons';

export default function BasicUse() {
  const menuData = [
    {
      title: '个人设置',
      icon: <UserOutlined />,
      path: 'personal',
      key: 'personal',
    },
    {
      title: '语言偏好',
      icon: <GlobalOutlined />,
      path: 'preferences',
      key: 'preferences',
    },
    {
      title: '修改密码',
      icon: <KeyOutlined />,
      path: 'editpwd',
      key: 'editpwd',
    },
    {
      title: '关注领域',
      icon: <InfoCircleOutlined />,
      path: 'focus',
      key: 'focus',
    },
    {
      title: '历史消息',
      icon: <HistoryOutlined />,
      path: 'historymsg',
      key: 'historymsg',
      count: 10,
    },
    {
      title: '账号绑定',
      icon: <BookOutlined />,
      path: 'accountbind',
      key: 'accountbind',
    },
  ].map((item) => ({ ...item, key: item.path }));

  const [selectedKey, setSelectedKey] = useState(menuData[0].path);

  const onSelectedChange = (key, record, item) => setSelectedKey(key);
  const activeMenu = _.find(menuData, i => i.path === selectedKey)
  return (
    <Submenu
      menuData={menuData}
      selectedKey={selectedKey}
      mode='horizontal'
      showMenuMagnet
      fixedTopHeight={64}
      onSelectedChange={onSelectedChange}
    >
      <div style={{ padding: '20px', height: 600 }}>
        {activeMenu['title']}
      </div>
    </Submenu>
  )
}

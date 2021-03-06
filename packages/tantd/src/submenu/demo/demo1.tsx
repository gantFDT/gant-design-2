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
  const menuBoxRef = useRef(null);
  const activeMenu = _.find(menuData, (i) => i.path === selectedKey);
  
  const onSelectedChange = (key, record, item) => setSelectedKey(key);

  const onSwitchChange = (mode) => {
    console.log('当前状态', mode);
  };

  
  return (
    <Submenu
      menuData={menuData}
      selectedKey={selectedKey}
      width={180}
      setMenuBoxRef={(ref) => {
        menuBoxRef.current = ref;
      }}
      showFlipOverFooter
      onCollapseChange={(collapsed) => {
        console.log(collapsed);
        console.log(menuBoxRef);
      }}
      onSelectedChange={onSelectedChange}
      onSwitchChange={onSwitchChange}
      extra={
        <div style={{ padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div>
            <Avatar size={64} src={'https://i.loli.net/2021/02/07/KRZuGH3JgU8hCxs.png'} />
            <div style={{ textAlign: 'center' }}>GantD</div>
          </div>
        </div>
      }
    >
      <div style={{ padding: '20px', height: 400 }}>{activeMenu['title']}</div>
    </Submenu>
  );
}

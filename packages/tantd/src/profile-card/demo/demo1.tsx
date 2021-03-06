import React from 'react';
import { Button } from 'antd';
import { ProfileCard } from 'tantd';

const profileCardFields: Array<any> = [
  {
    label: '姓名',
    dataIndex: 'userName',
    key: 'userName',
  },
  {
    label: '组织',
    dataIndex: 'orgName',
    key: 'orgName',
  },
  {
    label: '邮箱',
    dataIndex: 'email',
    key: 'email',
  },
  {
    label: '电话',
    dataIndex: 'mobil',
    key: 'mobil',
  },
];

// 基本用法
export default () => {
  const userInfo = {
    userName: 'Gantd',
    orgName: 'Gantd前端组',
    email: 'abc112233456ssss7@qq.com',
    mobil: '18010001002',
    avatarUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
  };

  return (
    <div style={{ display: 'inline-block' }} onClick={(e) => e.stopPropagation()}>
      <ProfileCard
        data={userInfo}
        width={300}
        height={150}
        fields={profileCardFields}
        avatarAlign="left"
        layout={{
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
        }}
        placement="right"
        trigger="click"
        onAvatarClick={() => {
          console.log(1);
        }}
      >
        <Button>点击</Button>
      </ProfileCard>
    </div>
  );
};

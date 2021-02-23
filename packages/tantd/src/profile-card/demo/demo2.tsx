import React from 'react';
import { Button } from 'antd';
import { ProfileCard } from 'tantd';
import { MessageOutlined, WhatsAppOutlined, AliwangwangOutlined } from '@ant-design/icons';
//底部添加额外标签
const profileCardFields: Array<any> = [
  {
    label: '姓名',
    dataIndex: "userName",
    key: "userName",
  },
  {
    label: '组织',
    dataIndex: "orgName",
    key: "orgName",
  },
  {
    label: '邮箱',
    dataIndex: "email",
    key: "email",
  },
  {
    label: '电话',
    dataIndex: "mobil",
    key: "mobil",
  },
]

// 基本用法
export default () => {
  const userInfo = { userName: 'Gantd', orgName: 'Gantd前端组', email: "abc112233456ssss7@qq.com", mobil: "18010001002", avatarUrl: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png' };
  return (
    <div style={{ display: 'inline-block' }} onClick={(e) => e.stopPropagation()}>
      <ProfileCard
        data={userInfo}
        width={300}
        fields={profileCardFields}
        height={160}
        avatarAlign="left"
        layout={{
          labelCol: { span: 8 },
          wrapperCol: { span: 16 },
        }}
        placement="right"
        trigger='click'
        onAvatarClick={() => { console.log(1) }}
        extraBottom={
          <div style={{width:'100%',borderTop:'1px solid #e5e5e5',display:'flex',paddingTop:'10px'}}>
            <MessageOutlined style={{flex:1}}/>
            <WhatsAppOutlined style={{flex:1,borderLeft:'1px solid #e5e5e5',borderRight:'1px solid #e5e5e5'}}/>
            <AliwangwangOutlined style={{flex:1}}/>
          </div>
        }
      >
        <Button>点击</Button>
      </ProfileCard>
    </div>
  );
};

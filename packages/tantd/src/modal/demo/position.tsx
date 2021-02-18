/**
 *
 * title.zh-CN: 自定义弹出位置
 * desc.zh-CN: 可通过设置x,y属性指定弹窗默认弹出位置。
 */
import React, { useState } from 'react';
import { Modal } from 'tantd';

export default () => {
  const [visible, setVisible] = useState(false);
  return (
    <div style={{ margin: 10 }}>
      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => {
            setVisible(true);
          }}
        >
          触发弹窗
        </button>
      </div>
      <Modal
        title="默认弹窗"
        itemState={{ x: 0, y: 0, width: 400, height: 400 }}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      >
        从指定的x:0,y:0位置进行弹出
      </Modal>
    </div>
  );
};

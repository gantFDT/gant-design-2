/**
 *
 * title.zh-CN: 功能禁用
 * desc.zh-CN: 对是否可以改变弹窗尺寸、是否可最大化最小化切换的属性的控制。
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
        title="功能禁止的状态弹窗"
        visible={visible}
        canMaximize={false}
        canResize={false}
        onCancel={() => {
          setVisible(false);
        }}
      ></Modal>
    </div>
  );
};

/**
 *
 * title.zh-CN: 默认最大化状态
 * desc.zh-CN: 弹窗打开时以最大化模式进行展开。
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
        title="最大化弹窗"
        itemState={{ maximize: true }}
        visible={visible}
        onCancel={() => {
          setVisible(false);
        }}
      ></Modal>
    </div>
  );
};

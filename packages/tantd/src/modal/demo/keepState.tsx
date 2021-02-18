/**
 *
 * title.zh-CN: 状态存储
 * desc.zh-CN: 支持在组件挂载期存储弹窗关闭前的定位与尺寸信息。
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
        visible={visible}
        itemState={{ keepStateOnClose: true }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        挂载期-存储弹窗状态（宽高、定位、最大化）
      </Modal>
    </div>
  );
};

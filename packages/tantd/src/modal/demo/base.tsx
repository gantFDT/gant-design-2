/**
 *
 * title.zh-CN: 基本用法
 * desc.zh-CN: 最简单的用法，默认模态窗口、宽高520、从相对浏览器文档显示区的中心位置弹出，鼠标悬浮到弹窗右下角边界，会出现能大小伸缩的图标，拖动则即时更改弹窗大小。
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
        onCancel={() => {
          setVisible(false);
        }}
      >
        默认宽高520
      </Modal>
    </div>
  );
};

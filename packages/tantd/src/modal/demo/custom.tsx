/**
 *
 * title.zh-CN: 自定义宽高
 * desc.zh-CN: 设置符合场景需求的弹窗大小，支持px和百分比，可通过回调获取即时的宽高值。
 */
import React, { useState } from 'react';
import { Modal } from 'tantd';

export default () => {
  const [visible, setVisible] = useState(false);
  const [widthAndHei, setWidthAndHei] = useState([0, 0]);
  const [contentWidthAndHei, setContentWidthAndHei] = useState([0, 0]);
  const onSizeChange = (width, height, contentEl) => {
    setWidthAndHei([width, height]);
    const rect = contentEl.getBoundingClientRect();
    setContentWidthAndHei([rect.width, rect.height]);
  };
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
        title="自定义属性标题"
        itemState={{ height: 400, width: '60%' }}
        visible={visible}
        footer={null}
        onCancel={() => {
          setVisible(false);
        }}
        onSizeChange={onSizeChange}
      >
        <h3>动态宽高获取</h3>
        <br />
        <h4>包含header+footer:</h4>
        <div>{`width:${widthAndHei[0]}px`}</div>
        <div>{`height:${widthAndHei[1]}px`}</div>
        <br />
        <h4>不含header+footer:</h4>
        <div>{`width:${contentWidthAndHei[0]}px`}</div>
        <div>{`height:${contentWidthAndHei[1]}px`}</div>
      </Modal>
    </div>
  );
};

/**
 *
 * title.zh-CN: 同屏多弹窗模式
 * desc.zh-CN: 支持同屏多非模态型的弹窗，可通过点击改变当前选中弹窗层级。
 */
import React, { useState } from 'react';
import { Modal } from 'tantd';
const { ResizableProvider, ResizableModal } = Modal;

export default () => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);
  return (
    <ResizableProvider>
      <div style={{ marginBottom: 10 }}>
        <button
          onClick={() => {
            setVisible(true);
          }}
        >
          第一个弹窗
        </button>
        <button
          onClick={() => {
            setVisible2(true);
          }}
        >
          第二个弹窗
        </button>
      </div>
      <ResizableModal
        id="1"
        title="第一个弹窗"
        visible={visible}
        footer={null}
        onCancel={() => {
          setVisible(false);
        }}
      >
        第一个弹窗-content
      </ResizableModal>
      <ResizableModal
        itemState={{ height: 400, width: 400 }}
        id="2"
        title="第二个弹窗"
        okBtnSolid
        visible={visible2}
        onCancel={() => {
          setVisible2(false);
        }}
      >
        第二个弹窗-content
      </ResizableModal>
    </ResizableProvider>
  );
};

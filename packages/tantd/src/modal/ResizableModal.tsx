import React, { useContext, useEffect, useMemo, useCallback, memo } from 'react';
import classnames from 'classnames';
import { Modal } from 'antd';
import type { ModalProps as antdModalProps } from 'antd/lib/modal';
import { CloseOutlined, SwitcherOutlined, BorderOutlined } from '@ant-design/icons';
import ModalContext from './Context';
import { getModalState } from './Reducer';
import { useDrag, useResize, usePrev } from './Hooks';
import { ActionTypes } from './interface';
import type { InitModalState } from './interface';

export interface InnerModalProps extends antdModalProps {
  id: string;
  prefixCls?: string;
  itemState?: InitModalState;
  canMaximize?: boolean;
  canResize?: boolean;
  isModalDialog?: boolean;
  children?: React.ReactNode | string;
  contentRef?: React.RefObject<HTMLDivElement>;
}

const modalStyle: React.CSSProperties = { position: 'absolute', margin: 0, paddingBottom: 0 };

const ModalInner: React.FC<InnerModalProps> = (props) => {
  const {
    //** 自定义class前缀 */
    prefixCls: customizePrefixCls,
    //** 弹窗唯一标识 */
    id,
    //** 单个弹窗的自定义属性 */
    itemState,
    //** 弹窗标题 */
    visible,
    //** 弹窗标题 */
    title,
    //** 弹窗额外样式 */
    style,
    //** 弹窗层自定义class */
    wrapClassName,
    //** 是否可以最大化 */
    canMaximize = true,
    //** 是否可以拖动 */
    canResize = true,
    //** 是否为模态窗口 */
    isModalDialog = false,
    /** antd-按钮属性 */
    cancelButtonProps,
    //** antd-按钮属性 */
    okButtonProps,
    //** 弹窗内容元素实例 */
    contentRef,
    //** 自定义弹窗内容 */
    children,
    //** 取消按钮回调 */
    onCancel,
    //** 提交按钮回调 */
    onOk,
    //** 弹窗组件接受的其他antd支持的属性值 */
    ...restProps
  } = props;

  const prefixCls = customizePrefixCls || 'gant-modal';
  const { dispatch, state } = useContext(ModalContext);
  const modalState = getModalState(state, id);
  const visiblePrev = usePrev(visible);

  useEffect(() => {
    dispatch({ type: ActionTypes.mount, payload: { id, itemState } });
    return () => dispatch({ type: ActionTypes.unmount, payload: { id } });
  }, []);

  useEffect(() => {
    if (visible || visible !== visiblePrev)
      dispatch({ type: visible ? ActionTypes.show : ActionTypes.hide, payload: { id } });
  }, [visible]);

  const { visible: modalVisible, zIndex, x, y, width, height, isMaximized } = modalState;

  const _style: React.CSSProperties = useMemo(() => ({ ...modalStyle, ...style, top: y, left: x, height }), [
    y,
    x,
    height,
    style,
  ]);

  const onFocus = useCallback(
    () =>
      dispatch({
        type: ActionTypes.focus,
        payload: { id },
      }),
    [id, dispatch],
  );

  const onDrag = useCallback(
    (payload) =>
      dispatch({
        type: ActionTypes.drag,
        payload: { id, ...payload },
      }),
    [id, dispatch],
  );

  const onResize = useCallback(
    (payload) =>
      dispatch({
        type: ActionTypes.resize,
        payload: { id, ...payload },
      }),
    [id, dispatch],
  );

  const toggleMaximize = useCallback(() => {
    if (!canMaximize) return;
    dispatch({ type: isMaximized ? ActionTypes.reset : ActionTypes.max, payload: { id } });
  }, [id, isMaximized, canMaximize, dispatch]);

  const onMouseDrag = useDrag(x, y, onDrag);
  const onMouseResize = useResize(x, y, Number(width), Number(height), onResize);

  const titleElement = useMemo(
    () => (
      <div className={`${prefixCls}-resizableModalHeader`}>
        <div
          className={classnames(`${prefixCls}-resizableModalTitle`, isMaximized ? '' : `${prefixCls}-canDrag`)}
          style={{ marginRight: canMaximize ? 60 : 30 }}
          onMouseDown={onMouseDrag}
          onClick={onFocus}
          onDoubleClick={toggleMaximize}
        >
          {title}
        </div>
        <div className={`${prefixCls}-resizableHeaderActions`}>
          {/*最大化按钮 */}
          {canMaximize && (
            <div className={`${prefixCls}-maximizeIcon`} onClick={toggleMaximize}>
              {isMaximized ? <SwitcherOutlined /> : <BorderOutlined />}
            </div>
          )}
          {/*关闭按钮 */}
          <div className={`${prefixCls}-closeIcon`} onClick={(e) => onCancel && onCancel(e)}>
            <CloseOutlined />
          </div>
        </div>
      </div>
    ),
    [onMouseDrag, onFocus, onCancel, toggleMaximize, prefixCls, title, isMaximized, canMaximize],
  );

  const combineWrapClassName = useMemo(() => {
    return classnames(
      `${prefixCls}-resizableModalWrapper`,
      isModalDialog ? `${prefixCls}-resizableModalDialog` : `${prefixCls}-resizableModalDefault`,
      isMaximized && `${prefixCls}-maximize`,
      wrapClassName,
    );
  }, [isMaximized, isModalDialog, prefixCls, wrapClassName]);

  return (
    <Modal
      wrapClassName={combineWrapClassName}
      title={titleElement}
      width={width}
      visible={modalVisible}
      zIndex={zIndex}
      style={_style}
      mask={isModalDialog}
      maskClosable={isModalDialog}
      destroyOnClose
      onCancel={onCancel}
      onOk={onOk}
      cancelButtonProps={{ size: 'small', ...cancelButtonProps }}
      okButtonProps={{ size: 'small', ...okButtonProps }}
      {...restProps}
      closable={false}
    >
      {/*弹窗内容 */}
      <div ref={contentRef} className={`${prefixCls}-resizableModalContent`} onClick={onFocus}>
        {children}
      </div>
      {/*resize节点 */}
      {canResize && !isMaximized && (
        <div className={`${prefixCls}-resizeAnchor`} onMouseDown={onMouseResize}>
          <i></i>
        </div>
      )}
    </Modal>
  );
};

const ResizableModal = memo<InnerModalProps>(ModalInner);
export default ResizableModal;

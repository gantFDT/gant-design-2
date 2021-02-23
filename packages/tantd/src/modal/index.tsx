import React, { useContext, useCallback, useEffect } from 'react';
import { pick, omit, throttle } from 'lodash';
import ModalContext from './Context';
import ResizableModal from './ResizableModal';
import ResizableProvider from './ResizableProvider';
import type { InnerModalProps } from './ResizableModal';
import type { ResizableProviderProps } from './interface';

export declare type OnSizeChangeFunc = (width: number, height: number, contentEl?: HTMLDivElement | null) => void;

export interface ContextContentProps {
  id: string;
  children: React.ReactNode;
  /** resize时的节流时长控制 */
  throttleTime?: number;
  /** 弹窗尺寸变化时的回调 */
  onSizeChange?: OnSizeChangeFunc;
  /** 获取弹窗内容元素的回调 */
  getContentEl: () => HTMLDivElement | null;
}

export interface ModalProps extends InnerModalProps, ResizableProviderProps {
  throttle?: number;
  onSizeChange?: OnSizeChangeFunc;
}

const PROVIDER_PROPS = ['initalState', 'maxZIndex', 'minWidth', 'minHeight'];

const ContextContent: React.FC<ContextContentProps> = (props) => {
  const { id, throttleTime, children, onSizeChange, getContentEl } = props;
  const {
    state: { modals },
  } = useContext(ModalContext);

  const { width, height } = modals[id];
  console.log('modals: ', modals);

  const sizeChange = useCallback(
    throttle((w, h) => {
      if (onSizeChange) {
        onSizeChange(w, h, getContentEl());
      }
    }, throttleTime),
    [onSizeChange],
  );

  useEffect(() => {
    sizeChange(width, height);
  }, [width, height]);

  return <>{children}</>;
};

class Modal extends React.Component<ModalProps> {
  static ResizableModal: typeof ResizableModal;
  static ResizableProvider: typeof ResizableProvider;
  static ModalContext: typeof ModalContext;

  contentRef: React.RefObject<HTMLDivElement>;

  constructor(props) {
    super(props);
    this.contentRef = React.createRef();
  }

  static defaultProps = {
    id: 'modal-uuid',
    throttle: 200,
    maxZIndex: 999,
    isModalDialog: true,
  };

  getContentEl = () => {
    return this.contentRef.current;
  };

  render() {
    const { id, throttle: customThrottole, children, onSizeChange, ...restProps } = this.props;

    return (
      <ResizableProvider {...pick(restProps, PROVIDER_PROPS)}>
        <ResizableModal id={id} {...omit(restProps, PROVIDER_PROPS)} contentRef={this.contentRef}>
          <ContextContent
            id={id}
            children={children}
            throttleTime={customThrottole}
            onSizeChange={onSizeChange}
            getContentEl={this.getContentEl}
          />
        </ResizableModal>
      </ResizableProvider>
    );
  }
}

Modal.ResizableModal = ResizableModal;
Modal.ResizableProvider = ResizableProvider;
Modal.ModalContext = ModalContext;

export default Modal;
export { ResizableModal, ResizableProvider, ModalContext };

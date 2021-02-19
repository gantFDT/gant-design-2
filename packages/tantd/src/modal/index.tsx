import React, { useContext, useCallback, useEffect } from 'react';
import { pick, omit, throttle } from 'lodash';
import ModalContext from './Context';
import ResizableModal from './ResizableModal';
import ResizableProvider from './ResizableProvider';
import type { ModalProps, ContextContentProps } from './interface';

const PROVIDER_PROPS = ['initalState', 'maxZIndex', 'minWidth', 'minHeight'];

const ContextContent: React.FC<ContextContentProps> = (props) => {
  const { id, throttleTime, children, onSizeChange, getContentEl } = props;
  const {
    state: { modals },
  } = useContext(ModalContext);

  const { width, height } = modals[id];

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
    throttle: 0,
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

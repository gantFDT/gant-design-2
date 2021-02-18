import React, { useContext, useCallback, useEffect } from 'react';
import { pick, omit, throttle } from 'lodash';
import ModalContext from './Context';
import ResizableModal from './ResizableModal';
import ResizableProvider from './ResizableProvider';
import type { ModalProps, ContextContentProps } from './interface';

const uuid = 'modal-g-uuid';
const providerPropKeys = ['initalState', 'maxZIndex', 'minWidth', 'minHeight'];

const ContextContent: React.FC<ContextContentProps> = ({ id, onSizeChange, throttleTime, children }) => {
  const {
    state: { modals },
  } = useContext(ModalContext);
  const { width, height } = modals[id];

  const sizeChange = useCallback(
    throttle((w, h) => {
      if (onSizeChange) {
        onSizeChange(w, h);
      }
    }, throttleTime),
    [],
  );

  useEffect(() => {
    sizeChange(width, height);
  }, [width, height, sizeChange]);

  return <>{children}</>;
};

class Modal extends React.Component<ModalProps, {}> {
  static ResizableModal: typeof ResizableModal;
  static ResizableProvider: typeof ResizableProvider;
  static ModalContext: typeof ModalContext;

  static defaultProps = {
    id: uuid,
    throttle: 0,
    maxZIndex: 999,
    isModalDialog: true,
  };

  render() {
    const { id, throttle: customThrottole, children, onSizeChange, ...restProps } = this.props;

    return (
      <ResizableProvider {...pick(restProps, providerPropKeys)}>
        <ResizableModal id={id} {...omit(restProps, providerPropKeys)}>
          <ContextContent id={id} children={children} throttleTime={customThrottole} onSizeChange={onSizeChange} />
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

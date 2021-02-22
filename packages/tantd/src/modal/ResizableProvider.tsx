import React, { useEffect, useReducer } from 'react';
import ModalContext from './Context';
import reducer, { DEFAULT_WIDTH } from './Reducer';
import { ActionTypes } from './interface';
import type { Size, InitModalState } from './interface';
import type { ModalsState } from './Context';

export interface ResizableProviderProps {
  initalState?: InitModalState;
  maxZIndex?: number;
  minWidth?: number;
  minHeight?: number;
}

const getWindowSize = (): Size => ({
  width: window.innerWidth || 0,
  height: window.innerHeight || 0,
});

const initial: InitModalState = {
  width: DEFAULT_WIDTH,
  height: DEFAULT_WIDTH,
  zIndex: 0,
  visible: false,
  maximize: false,
  keepStateOnClose: false,
};

const ResizableProvider: React.FC<ResizableProviderProps> = ({
  initalState,
  maxZIndex = 0,
  minWidth = 200,
  minHeight = 200,
  children,
}) => {
  const initialState: ModalsState = {
    modals: {},
    maxZIndex,
    minWidth,
    minHeight,
    windowSize: getWindowSize(),
    initialModalState: { ...initial, ...initalState },
  };

  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    if (typeof window !== 'object') return;
    const onResize = () => dispatch({ type: ActionTypes.windowResize, payload: { size: getWindowSize() } });
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return <ModalContext.Provider value={{ state, dispatch }}>{children}</ModalContext.Provider>;
};

export default ResizableProvider;

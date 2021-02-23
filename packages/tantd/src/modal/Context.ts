import React from 'react';
import type { Size, PrivateModalState, InitModalState, ActionTypes } from './interface';

export interface ModalsState {
  modals: Record<string, PrivateModalState>;
  maxZIndex: number;
  minWidth: number;
  minHeight: number;
  windowSize: Size;
  initialModalState: InitModalState;
}

export type Action = { type: ActionTypes; [key: string]: any };

const ModalContext = React.createContext(
  {} as {
    state: ModalsState;
    dispatch: React.Dispatch<Action>;
  },
);

export default ModalContext;

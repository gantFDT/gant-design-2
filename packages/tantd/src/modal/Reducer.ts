import React from 'react';
import { ModalsState, PrivateModalStateProps, ActionTypes, Action, ModalPositionSize } from './interface';

export const getModalState = (state: ModalsState, id: string): PrivateModalStateProps => state.modals[id] || state.initialModalState;

const clamp = (min: number, max: number, value: number) => Math.max(min, Math.min(max, value));

const getAxis = (windowMeter: number, targetMeter: number, num?: number | string) => {
  if (typeof num == 'number') return num;
  return (windowMeter - targetMeter) / 2;
};
const convertPercentage = (target: string | number, windowSize: number, inital: number) => {
  if (typeof target == 'number') return target;
  const reg = new RegExp(/^\d+%$/);
  if (reg.test(target)) return Math.floor(windowSize * (Number(target.replace('%', '')) / 100));
  return inital;
};

const mapObject = <R, K extends keyof R>(obj: R, fn: (v: R[K]) => R[K]): R => Object.assign({}, ...Object.keys(obj).map((key) => ({ [key]: fn(obj[key]) })));

const getNextZIndex = (state: ModalsState, id: string) => {
  const { modals, maxZIndex } = state;
  if (Object.keys(modals).length === 1) return maxZIndex;
  const modalState = getModalState(state, id);
  return modalState.zIndex === maxZIndex ? maxZIndex : (maxZIndex as number) + 1;
};

const clampDrag = (windowWidth: number, windowHeight: number, x: number, y: number, width: number, height: number): { x: number; y: number } => {
  const maxX = windowWidth - width;
  const maxY = windowHeight - height;
  const clampedX = clamp(0, maxX, x);
  const clampedY = clamp(0, maxY, y);
  return { x: clampedX, y: clampedY };
};

const clampResize = (minWidth: number, minHeight: number, windowWidth: number, windowHeight: number, x: number, y: number, width: number, height: number): { width: number; height: number } => {
  const maxWidth = windowWidth - x;
  const maxHeight = windowHeight - y;
  const clampedWidth = clamp(minWidth, maxWidth, width);
  const clampedHeight = clamp(minHeight, maxHeight, height);
  return { width: clampedWidth, height: clampedHeight };
};

const resizableReducer: React.Reducer<ModalsState, Action> = (state, action) => {
  const { minWidth, minHeight, initialModalState, windowSize } = state;
  const needIncrease = Object.keys(state.modals).length != 1;
  switch (action.type) {
    case ActionTypes.mount: {
      const combineState = { ...initialModalState, ...action.itemState };
      const inital = {
        width: combineState.width,
        height: combineState.height,
        x: combineState.x,
        y: combineState.y,
      };
      combineState.width = convertPercentage(combineState.width, windowSize.width, <number>initialModalState.width);
      combineState.height = convertPercentage(combineState.height, windowSize.height, <number>initialModalState.height);
      const x = getAxis(windowSize.width, combineState.width, combineState.x);
      const y = getAxis(windowSize.height, combineState.height, combineState.y);
      return {
        ...state,
        maxZIndex: (state.maxZIndex as number) + 1,
        modals: {
          ...state.modals,
          [action.id]: {
            inital,
            ...combineState,
            x,
            y,
            zIndex: (state.maxZIndex as number) + 1,
          },
        },
      };
    }
    case ActionTypes.unmount: {
      const modalsClone = { ...state.modals };
      delete modalsClone[action.id];
      return {
        ...state,
        modals: modalsClone,
      };
    }
    case ActionTypes.focus: {
      const modalState = state.modals[action.id];
      const maxZIndex = needIncrease ? (state.maxZIndex as number) + 1 : state.maxZIndex;
      return {
        ...state,
        maxZIndex,
        modals: {
          ...state.modals,
          [action.id]: {
            ...modalState,
            zIndex: maxZIndex,
          },
        },
      };
    }
    case ActionTypes.show: {
      const modalState = { ...state.modals[action.id] };
      const needKeep = modalState.keepStateOnClose;
      const { inital, maximize } = modalState;
      const target = needKeep ? modalState : inital;
      if (!needKeep) {
        if (typeof (inital as ModalPositionSize).width == 'string') {
          modalState.width = convertPercentage((inital as ModalPositionSize).width as number | string, windowSize.width, <number>initialModalState.width);
        }
        if (typeof (inital as ModalPositionSize).height == 'string') {
          modalState.height = convertPercentage((inital as ModalPositionSize).height as number | string, windowSize.height, <number>initialModalState.height);
        }
      }
      const maxZIndex = needIncrease ? (state.maxZIndex as number) + 1 : state.maxZIndex;
      const centerX = getAxis(windowSize.width, <number>modalState.width, (target as ModalPositionSize).x);
      const centerY = getAxis(windowSize.height, <number>modalState.height, (target as ModalPositionSize).y);

      let _isMaximized = modalState.isMaximized;
      let position = clampDrag(windowSize.width, windowSize.height, centerX, centerY, <number>modalState.width, <number>modalState.height);
      let size = clampResize(minWidth as number, minHeight as number, windowSize.width, windowSize.height, position.x, position.y, <number>modalState.width, <number>modalState.height);

      if (!needKeep && maximize) {
        position = { x: 0, y: 0 };
        size = { width: windowSize.width, height: windowSize.height };
        _isMaximized = maximize;
      }
      return {
        ...state,
        maxZIndex,
        modals: {
          ...state.modals,
          [action.id]: {
            ...modalState,
            ...position,
            ...size,
            isMaximized: _isMaximized,
            zIndex: maxZIndex,
            visible: true,
          },
        },
      };
    }
    case ActionTypes.hide: {
      const modalState = state.modals[action.id];
      const resetState = {
        ...modalState,
        width: convertPercentage((modalState.inital as ModalPositionSize).width as number | string, windowSize.width, <number>initialModalState.width),
        height: convertPercentage((modalState.inital as ModalPositionSize).height as number | string, windowSize.height, <number>initialModalState.height),
        isMaximized: false,
      };
      const newState = modalState.keepStateOnClose ? modalState : resetState;
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.id]: { ...newState, visible: false },
        },
      };
    }
    case ActionTypes.max: {
      const modalState = state.modals[action.id];
      const history = {
        x: modalState.x,
        y: modalState.y,
        width: modalState.width,
        height: modalState.height,
      };
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.id]: {
            ...modalState,
            x: 0,
            y: 0,
            height: window.innerHeight,
            width: window.innerWidth,
            history,
            isMaximized: true,
          },
        },
      };
    }
    case ActionTypes.reset: {
      const modalState = state.modals[action.id];
      const { inital, history } = modalState;
      const target = history || inital;
      (target as ModalPositionSize).width = convertPercentage((target as ModalPositionSize).width as number | string, windowSize.width, <number>initialModalState.width);
      (target as ModalPositionSize).height = convertPercentage((target as ModalPositionSize).height as number | string, windowSize.height, <number>initialModalState.height);
      const x = (target as ModalPositionSize).x != undefined ? (target as ModalPositionSize).x : getAxis(windowSize.width, (target as ModalPositionSize).width as number);
      const y = (target as ModalPositionSize).y != undefined ? (target as ModalPositionSize).y : getAxis(windowSize.height, (target as ModalPositionSize).height as number);
      const position = clampDrag(windowSize.width, windowSize.height, x as number, y as number, (target as ModalPositionSize).width as number, (target as ModalPositionSize).height as number);
      const size = clampResize(minWidth as number, minHeight as number, windowSize.width, windowSize.height, position.x, position.y, (target as ModalPositionSize).width as number, (target as ModalPositionSize).height as number);
      return {
        ...state,
        modals: {
          ...state.modals,
          [action.id]: {
            ...modalState,
            ...position,
            ...size,
            history: null,
            isMaximized: false,
          },
        },
      };
    }
    case ActionTypes.resize: {
      const size = clampResize(minWidth as number, minHeight as number, windowSize.width, windowSize.height, action.x, action.y, action.width, action.height);
      return {
        ...state,
        maxZIndex: getNextZIndex(state, action.id),
        modals: {
          ...state.modals,
          [action.id]: {
            ...state.modals[action.id],
            ...size,
            zIndex: getNextZIndex(state, action.id),
          },
        },
      };
    }
    case ActionTypes.drag:
      return {
        ...state,
        maxZIndex: getNextZIndex(state, action.id),
        modals: {
          ...state.modals,
          [action.id]: {
            ...state.modals[action.id],
            ...clampDrag(windowSize.width, windowSize.height, action.x, action.y, <number>state.modals[action.id].width, <number>state.modals[action.id].height),
            zIndex: getNextZIndex(state, action.id),
          },
        },
      };
    case ActionTypes.windowResize:
      return {
        ...state,
        windowSize: action.size,
        modals: mapObject(state.modals, (modalState) => {
          if (!modalState.visible) {
            return modalState;
          }
          const position = modalState.isMaximized ? { x: 0, y: 0 } : clampDrag(action.size.width, action.size.height, modalState.x as number, modalState.y as number, <number>modalState.width, <number>modalState.height);
          const size = modalState.isMaximized ? { width: action.size.width, height: action.size.height } : clampResize(minWidth as number, minHeight as number, action.size.width, action.size.height, position.x, position.y, <number>modalState.width, <number>modalState.height);
          return {
            ...modalState,
            ...position,
            ...size,
          };
        }),
      };
    default:
      throw new Error();
  }
};

export default resizableReducer;

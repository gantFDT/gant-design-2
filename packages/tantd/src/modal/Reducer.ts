import type React from 'react';
import type { ModalsState, Action } from './Context';
import type { PrivateModalState, PositionSize } from './interface';
import { ActionTypes } from './interface';

export const DEFAULT_WIDTH = 520;

export const getModalState = (state: ModalsState, id: string): PrivateModalState =>
  state.modals[id] || state.initialModalState;

const clamp = (min: number, max: number, value: number) => Math.max(min, Math.min(max, value));

const getAxis = (windowMeter: number, targetMeter: number, num?: number | string) => {
  if (typeof num == 'number') return num;
  return (windowMeter - targetMeter) / 2;
};
const convertPercentage = (target: string | number, windowSize: number) => {
  if (typeof target == 'number') return target;
  const reg = new RegExp(/^\d+%$/);
  if (reg.test(target)) return Math.floor(windowSize * (Number(target.replace('%', '')) / 100));
  console.warn('请检查传递的百分比尺寸格式是否正确。');
  return DEFAULT_WIDTH;
};

const mapObject = <R, K extends keyof R>(obj: R, fn: (v: R[K]) => R[K]): R =>
  Object.assign({}, ...Object.keys(obj).map((key) => ({ [key]: fn(obj[key]) })));

const getNextZIndex = (state: ModalsState, id: string) => {
  const { modals, maxZIndex } = state;
  if (Object.keys(modals).length === 1) return maxZIndex;
  const modalState = getModalState(state, id);
  return modalState.zIndex === maxZIndex ? maxZIndex : maxZIndex + 1;
};

const clampDrag = (
  windowWidth: number,
  windowHeight: number,
  x: number,
  y: number,
  width: number,
  height: number,
): { x: number; y: number } => {
  const maxX = windowWidth - width;
  const maxY = windowHeight - height;
  const clampedX = clamp(0, maxX, x);
  const clampedY = clamp(0, maxY, y);
  return { x: clampedX, y: clampedY };
};

const clampResize = (
  minWidth: number,
  minHeight: number,
  windowWidth: number,
  windowHeight: number,
  x: number,
  y: number,
  width: number,
  height: number,
): { width: number; height: number } => {
  const maxWidth = windowWidth - x;
  const maxHeight = windowHeight - y;
  const clampedWidth = clamp(minWidth, maxWidth, width);
  const clampedHeight = clamp(minHeight, maxHeight, height);
  return { width: clampedWidth, height: clampedHeight };
};

const reducer: React.Reducer<ModalsState, Action> = (state, action) => {
  const { type, payload } = action;
  const { id } = payload;
  const { minWidth, minHeight, initialModalState, windowSize } = state;
  const needIncrease = Object.keys(state.modals).length != 1;
  switch (type) {
    case ActionTypes.mount: {
      const combineState = { ...initialModalState, ...payload.itemState };
      const inital = {
        width: combineState.width,
        height: combineState.height,
        x: combineState.x,
        y: combineState.y,
      };
      combineState.width = convertPercentage(combineState.width, windowSize.width);
      combineState.height = convertPercentage(combineState.height, windowSize.height);
      const x = getAxis(windowSize.width, combineState.width, combineState.x);
      const y = getAxis(windowSize.height, combineState.height, combineState.y);
      return {
        ...state,
        maxZIndex: state.maxZIndex + 1,
        modals: {
          ...state.modals,
          [id]: {
            inital,
            ...combineState,
            x,
            y,
            zIndex: state.maxZIndex + 1,
          },
        },
      };
    }
    case ActionTypes.unmount: {
      const modalsClone = { ...state.modals };
      delete modalsClone[id];
      return {
        ...state,
        modals: modalsClone,
      };
    }
    case ActionTypes.focus: {
      const modalState = state.modals[id];
      const maxZIndex = needIncrease ? state.maxZIndex + 1 : state.maxZIndex;
      return {
        ...state,
        maxZIndex,
        modals: {
          ...state.modals,
          [id]: {
            ...modalState,
            zIndex: maxZIndex,
          },
        },
      };
    }
    case ActionTypes.show: {
      const modalState = { ...state.modals[id] };
      const needKeep = modalState.keepStateOnClose;
      const { inital, maximize } = modalState;
      const target = needKeep ? modalState : inital;
      if (!needKeep) {
        if (typeof inital.width == 'string') {
          modalState.width = convertPercentage(inital.width, windowSize.width);
        }
        if (typeof inital.height == 'string') {
          modalState.height = convertPercentage(inital.height, windowSize.height);
        }
      }
      const maxZIndex = needIncrease ? state.maxZIndex + 1 : state.maxZIndex;
      const centerX = getAxis(windowSize.width, modalState.width, (target as PositionSize).x);
      const centerY = getAxis(windowSize.height, modalState.height, (target as PositionSize).y);

      let _isMaximized = modalState.isMaximized;
      let position = clampDrag(
        windowSize.width,
        windowSize.height,
        centerX,
        centerY,
        modalState.width,
        modalState.height,
      );
      let size = clampResize(
        minWidth,
        minHeight,
        windowSize.width,
        windowSize.height,
        position.x,
        position.y,
        modalState.width,
        modalState.height,
      );

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
          [id]: {
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
      return {
        ...state,
        modals: {
          ...state.modals,
          [id]: { ...state.modals[id], visible: false },
        },
      };
    }
    case ActionTypes.max: {
      const modalState = state.modals[id];
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
          [id]: {
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
      const modalState = state.modals[id];
      const { inital, history } = modalState;
      const target = history || inital;
      (target as PositionSize).width = convertPercentage((target as PositionSize).width, windowSize.width);
      (target as PositionSize).height = convertPercentage((target as PositionSize).height, windowSize.height);
      const x =
        (target as PositionSize).x != undefined
          ? (target as PositionSize).x
          : getAxis(windowSize.width, (target as PositionSize).width);
      const y =
        (target as PositionSize).y != undefined
          ? (target as PositionSize).y
          : getAxis(windowSize.height, (target as PositionSize).height);
      const position = clampDrag(
        windowSize.width,
        windowSize.height,
        x,
        y,
        (target as PositionSize).width,
        (target as PositionSize).height,
      );
      const size = clampResize(
        minWidth,
        minHeight,
        windowSize.width,
        windowSize.height,
        position.x,
        position.y,
        (target as PositionSize).width,
        (target as PositionSize).height,
      );
      return {
        ...state,
        modals: {
          ...state.modals,
          [id]: {
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
      const size = clampResize(
        minWidth,
        minHeight,
        windowSize.width,
        windowSize.height,
        payload.x,
        payload.y,
        payload.width,
        payload.height,
      );
      return {
        ...state,
        maxZIndex: getNextZIndex(state, id),
        modals: {
          ...state.modals,
          [id]: {
            ...state.modals[id],
            ...size,
            zIndex: getNextZIndex(state, id),
          },
        },
      };
    }
    case ActionTypes.drag:
      return {
        ...state,
        maxZIndex: getNextZIndex(state, id),
        modals: {
          ...state.modals,
          [id]: {
            ...state.modals[id],
            ...clampDrag(
              windowSize.width,
              windowSize.height,
              payload.x,
              payload.y,
              state.modals[id].width,
              state.modals[id].height,
            ),
            zIndex: getNextZIndex(state, id),
          },
        },
      };
    case ActionTypes.windowResize:
      return {
        ...state,
        windowSize: payload.size,
        modals: mapObject(state.modals, (modalState) => {
          if (!modalState.visible) {
            return modalState;
          }
          const position = modalState.isMaximized
            ? { x: 0, y: 0 }
            : clampDrag(
                payload.size.width,
                payload.size.height,
                modalState.x,
                modalState.y,
                modalState.width,
                modalState.height,
              );
          const size = modalState.isMaximized
            ? { width: payload.size.width, height: payload.size.height }
            : clampResize(
                minWidth,
                minHeight,
                payload.size.width,
                payload.size.height,
                position.x,
                position.y,
                modalState.width,
                modalState.height,
              );
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

export default reducer;

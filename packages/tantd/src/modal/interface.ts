export interface Size {
  width: number;
  height: number;
}

export interface PositionSize extends Size {
  x: number;
  y: number;
}

export interface InitPositionSize {
  /* 支持百分比情况 */
  width?: number | string;
  height?: number | string;
  x?: number;
  y?: number;
}

export interface Config {
  zIndex?: number;
  /** 弹窗是否可见 */
  visible?: boolean;
  /** 默认窗口是否最大化 */
  maximize?: boolean;
  /** 是否在组件挂载期保留弹窗关闭前的定位与尺寸信息 */
  keepStateOnClose?: boolean;
}

export interface ModalState extends PositionSize, Config {}

export interface InitModalState extends InitPositionSize, Config {}

export interface PrivateModalState extends ModalState {
  /** 内部记录当前弹窗的状态 */
  isMaximized?: boolean;
  /** 存储用户传递的弹窗信息 */
  inital: InitPositionSize;
  /** 存储最大化切换时小窗口的定位与尺寸信息 */
  history?: PositionSize;
}

export interface ResizableProviderProps {
  initalState?: InitModalState;
  maxZIndex?: number;
  minWidth?: number;
  minHeight?: number;
}

export enum ActionTypes {
  mount = 'mount',
  unmount = 'unmount',
  focus = 'focus',
  show = 'show',
  hide = 'hide',
  max = 'max',
  reset = 'reset',
  resize = 'resize',
  drag = 'drag',
  windowResize = 'windowResize',
}

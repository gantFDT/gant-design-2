export interface IconProps {
  type?: string;
  className?: string;
  rotate?: number;
  spin?: boolean;
  style?: React.CSSProperties;
  twoToneColor?: string;
}
export interface IconselectorProps extends Omit<IconProps, 'type'> {
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  size?: 'small' | 'middle' | 'large';
  drawerClassname?: string;
  drawerBodyStyle?: React.CSSProperties;
  drawerWidth?: number;
}
export interface IconSelectorDrawerProps {
  className?: string;
  bodyStyle?: React.CSSProperties;
  visible?: boolean;
  onClose?: () => void;
  width?: number;
  value?: string;
  onConfirm?: (value: string) => void;
}

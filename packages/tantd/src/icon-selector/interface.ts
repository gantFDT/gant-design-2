import { IconBaiscProps } from '../icon/interface';

import { DataCellProps } from '../data-cell';

export interface IconselectorProps extends Omit<IconBaiscProps, 'type'> {
  value?: string;
  onChange?: (value: string) => void;
  defaultValue?: string;
  size?: 'small' | 'middle' | 'large';
  className?: string;
  style?: React.CSSProperties;
  drawerClassname?: string;
  drawerBodyStyle?: React.CSSProperties;
  drawerWidth?: number;
  disabled?: boolean;
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
export interface GantIconSelectorProps
  extends IconselectorProps,
    Omit<DataCellProps<string>, 'children' | 'onChange'> {}

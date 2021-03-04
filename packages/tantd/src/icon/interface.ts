import { DataCellProps } from '../data-cell';

export interface IconBaiscProps {
  type?: string;
  className?: string;
  rotate?: number;
  spin?: boolean;
  style?: React.CSSProperties;
  twoToneColor?: string;
}

export interface GantIconProps extends DataCellProps<string> {
  
}

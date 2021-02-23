export interface DataCellProps<ValueType>
  extends DataCellCommonProps<ValueType> {
  wrapperClassName?: string;
  wrapperStyle?: React.CSSProperties;
  native?: boolean;
  onChange?: (value: ValueType, ...ags: any[]) => void;
}
interface DataCellCommonProps<ValueType> {
  children?: React.ReactElement;
  onConfirm?: (value: ValueType | undefined) => boolean | void;
  onCancel?: (value: ValueType | undefined) => boolean | void;
  value?: ValueType;
  getValueFromEvent?: (...ags: any[]) => any;
  valuePropName?: string;
  defaultValue?: ValueType;
  size?: SizeType;
  editable?: boolean;
  disabled?: boolean;
  renderLabel?: (value: ValueType, ...ags: any[]) => string | React.ReactNode;
}
export interface DataCellInnerProps<ValueType>
  extends DataCellCommonProps<ValueType> {
  innerEditable: boolean;
  setInnerEditable: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (value: ValueType, ...ags: any[]) => void;
}

type SizeType = 'small' | 'middle' | 'large' | undefined;

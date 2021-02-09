export interface DataType {
  disabled?: boolean;
  [key: string]: any;
}

export interface DataConfig {
  valueProp?: string;
  labelProp?: string;
  groupProp?: string;
}

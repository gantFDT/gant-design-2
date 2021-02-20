export interface DefaultProps {
  prefixCls?: string;
  hightLightWords?: string;
  renderHeader?: (column: any) => React.ReactNode;
  renderExtra?: (column: any) => React.ReactNode;
  renderItem?: (task: any, column: any) => React.ReactNode;
  highlightTasksBy?: (keywords: string, task: any) => boolean;
  handleAddBtn?: (column: any) => void;
}

export interface Config {
  idKey?: string;
  titleKey?: string;
  childrenKey?: string;
  taskNameKey?: string;

  hideQuickAdd?: boolean;
  columnDragDisabled?: boolean;
  columnDropDisabled?: boolean;
  taskDragDisabled?: boolean;
  taskDropDisabled?: boolean;
}

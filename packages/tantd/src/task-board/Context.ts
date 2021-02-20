import React from 'react';
import type { DefaultProps, Config } from './interface';

export interface ContextConfig extends Omit<Config, 'childrenKey' | 'columnDropDisabled'> {}
export interface ContextProps extends DefaultProps {
  config: ContextConfig;
}

const TaskBoardContext = React.createContext({} as ContextProps);
export default TaskBoardContext;

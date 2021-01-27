import React from 'react';
import classnames from 'classnames';
import styles from './index.less'

export interface ToolBarPropsIF {
  extraLeft?: React.ReactNode;
  extraRight?: React.ReactNode;
  style?: React.HTMLAttributes<HTMLDivElement>;
  className?: string;
  fixed?: boolean;
}

export default function Toolbar(props: ToolBarPropsIF) {
  const { extraLeft, extraRight, fixed, className, style, ...restProps } = props;
  return (
    <div className={classnames(styles.toolbar, fixed ? styles.fixed : '', className)} style={style} {...restProps}>
      <div className={styles.left}>{extraLeft}</div>
      <div className={styles.space}></div>
      <div className={styles.right}>{extraRight}</div>
    </div>
  );
}




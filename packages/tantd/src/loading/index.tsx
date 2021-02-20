import React from 'react';
import classnames from 'classnames';
import pageLoadings from './loadings';

interface Props {
  height?: number,
  width?: number,
  index?: number,
  prefixCls?: string,
  className?: string,
  indicator?: any,
  spinType?: string,
  size?: string,
}

function Loading(props: Props) {
  const {
    height:currentHeight,
    width = '100%',
    size = 'default',
    prefixCls: customizePrefixCls = 'gant',
    className,
    indicator,
    spinType = 'ball-clip-rotate',
  } = props;
  const prefixCls = customizePrefixCls + '-pageloading';
  const clsString = classnames(prefixCls, 'gant-align-center', className);
  return <>
    <div style={{ height: currentHeight }} className={clsString}>
      {indicator ?
        <div className={classnames(`size-${size}`, 'indicator-default')} style={{ transform: 'rotate(360deg)' }}>{indicator}</div>
        : pageLoadings[spinType]}
    </div>;
  </>;
}
export default Loading;
import React, { ReactNode } from 'react';
import classnames from 'classnames';
import pageLoadings from './loadings';

interface Props {
  height?: number;
  width?: number;
  index?: number;
  prefixCls?: string;
  className?: string;
  indicator?: any;
  spinType?: string;
  size?: string;
  loadingText?: string;
  spinning?: boolean;
  content?: ReactNode;
}

function Loading(props: Props) {
  const {
    height: currentHeight,
    width = '100%',
    size = 'default',
    prefixCls: customizePrefixCls = 'gant',
    className,
    indicator,
    loadingText,
    spinning = true,
    content,
    spinType = 'ball-clip-rotate',
  } = props;
  const prefixCls = customizePrefixCls + '-pageloading';
  const clsString = classnames(prefixCls, 'gant-align-center', className);
  return (
    <div style={{ position: 'relative' }}>
      <div className={spinning ? '.showOpacity' : '.cancelOpacity'}>{content}</div>
      {spinning ? <div className={clsString}>
        <div className='gant-loadingBox'>
          {indicator ? (
            <div >
              <div className={classnames(`size-${size}`, 'indicator-default')} style={{ transform: 'rotate(360deg)' }}>
                {indicator}
              </div>
              {loadingText ?
                <p className='showTextCss'>{loadingText}</p> : null
              }
            </div>
          ) : (
              <div>
                {pageLoadings[spinType]}
                {loadingText ?
                  <p className='showTextCss'>{loadingText}</p> : null
                }
              </div>
            )}
        </div>
      </div> : null}
    </div>
  );
}
export default Loading;

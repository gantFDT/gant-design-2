import type { ReactNode, ReactElement } from 'react';
import React, { useRef, useState, useEffect, useMemo } from 'react';
import classnames from 'classnames';
import ReactResizeDetector from 'react-resize-detector';
import ResizeDetector from './ResizeDetector';
import ExtraContent from './ExtraContent';
import _ from 'lodash';

interface HeaderIF {
  type?: 'line' | 'num' | 'normal';
  bottomLine?: boolean;
  topLine?: boolean;
  title?: string | ReactNode;
  beforeExtra?: ReactNode;
  extra?: ReactNode;
  color?: string;
  style?: object;
  className?: string;
  [props: string]: any;
}

const Header = (props: HeaderIF) => {
  const { type = 'normal', bottomLine = false, topLine = false, title, beforeExtra, extra = null, num = '1', color = 'var(--text-color)', style = {}, className, ...restProps } = props;
  const [tools, setTools] = useState<Array<ReactElement | string>>([]);
  const [innerExtra, setInnerExtra] = useState({} as any);
  // 打平extra
  const [allWidth, setAllWidth] = useState(0);
  const leftRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (_.isEmpty(extra)) {
      return;
    }
    const toolsCollection = React.Children.toArray(extra);
    const toolsArr: Array<ReactElement | string> = [];
    const interator = (items) => {
      React.Children.map(items, (item) => {
        if (item && item.type && item.type.toString() === 'Symbol(react.fragment)') {
          interator([item.props.children]);
        } else if (React.isValidElement(item) || typeof item === 'string') {
          toolsArr.push(item);
        }
      });
    };
    // 过滤掉fragment
    // interator(toolsCollection)
    React.Children.map(toolsCollection, (item) => {
      interator(item);
    });
    if (_.isEqual(tools, toolsArr) || _.isEqual(extra, innerExtra)) return;
    setInnerExtra(extra);
    setTools(toolsArr);
  }, [extra, tools, innerExtra]);

  const getPrefixCls = (cls) => 'gant-' + cls;

  const prefixCls = 'gant-header';
  const clsString = classnames(prefixCls, className);

  const toolWidth = useMemo(() => {
    if (leftRef.current) {
      return Number.isNaN(allWidth - leftRef.current.clientWidth) ? 0 : allWidth - leftRef.current.clientWidth;
    }
    return 0;
  }, [allWidth, leftRef.current]);

  return (
    <div className={clsString} style={{ borderTop: topLine ? '1px solid rgba(128,128,128,0.2)' : '', borderBottom: bottomLine ? '1px solid rgba(128,128,128,0.2)' : '', ...style }} {...restProps}>
      {extra && (
        <ReactResizeDetector handleWidth handleHeight key={1}>
          <ResizeDetector setAllWidth={setAllWidth} />
        </ReactResizeDetector>
      )}
      <div className={prefixCls + '-container'}>
        <div className={prefixCls + '-wrapper'} ref={leftRef}>
          <div className={prefixCls + '-beforeExtra'}>{beforeExtra}</div>
          {/* {type === 'icon' && <div className={prefixCls + '-icon'} style={{ color }}> */}
          {/* {typeof icon === 'string' && <Icon type={icon} />} */}
          {/* {typeof icon === 'object' && { icon }} */}
          {/* </div>} */}
          {type == 'line' && title && <div className={prefixCls + '-line'} style={{ background: color }}></div>}
          {type == 'num' && (
            <div className={prefixCls + '-num'} style={{ background: color }}>
              {num}
            </div>
          )}
          <div className={prefixCls + '-title'} style={{ color }}>
            {title}
          </div>
        </div>
        <div className={getPrefixCls('overflow-tool-outer')}>
          <div className={getPrefixCls('overflow-tool-inner')}>{extra && <ExtraContent tools={tools} prefixCls={prefixCls} width={toolWidth} />}</div>
        </div>
      </div>
    </div>
  );
};

export default Header;

import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Dropdown, Menu, Anchor, Tooltip } from 'antd';
import classnames from 'classnames';
import type { AnchorProps } from 'antd/lib/anchor';
import scrollTo from 'antd/es/_util/scrollTo';
import getScroll from 'antd/es/_util/getScroll';
import { CheckCircleOutlined, LeftOutlined, SwitcherOutlined, DownOutlined, RightOutlined } from '@ant-design/icons';

const customizePrefixCls = 'gant';
const prefixCls = customizePrefixCls + '-anchor';
type layout = 'vertical' | 'horizontal';
interface ListItem {
  key: string;
  id: string;
  title: string;
  complete?: boolean;
  isInvalid?: boolean; // 是否无效（显示menu但不可点击），默认有效
}
export interface GantAnchorProps extends AnchorProps {
  minHeight?: number | string;
  layout?: layout;
  onLayoutChange?: (layout: layout) => void;
  fixedTop?: number;
  list?: ListItem[];
  content?: React.ReactNode | Element | string | number | null | React.ReactNode[];
}

const FIXED_HEIGHT = 40;

const GantAnchor = (props: GantAnchorProps) => {
  const { list = [], content, fixedTop = 0, layout = 'vertical', onLayoutChange, minHeight = 400, className, style, ...nextProps } = props;
  const [stateMode, setStateMode] = useState(layout);
  const [currentId, setId] = useState(list.length ? list[0].id : ''); //当前选中id，进入页面默认选中第一
  const [leftArrowsShow, setLeftArrowsShow] = useState(false); //左侧箭头
  const [rightArrowsShow, setRightArrowsShow] = useState(false); //右侧箭头
  // const [menuArrowsShow, setMenuArrowsShow] = useState(true)
  const [silderIdWidth, setSilderIdWidth] = useState(0); //List外层宽度
  const [contentWidth, setContentWidth] = useState(0); //List实际宽度
  const [isClickScroll, setIsClickScroll] = useState(false); //页面滚动判断是点击后的滚动还是手动的滚动
  const containerRef = useRef<any>();
  const rightBoxRef = useRef<any>();
  let scrollHeight = 0; // 滚动的值
  let m2 = 0; // 对比时间的值
  let timer: any = null;
  const Data = useCallback(() => {
    m2 = document.documentElement.scrollTop || document.body.scrollTop;
    if (m2 == scrollHeight) {
      if (isClickScroll) {
        setIsClickScroll(false);
      }
    }
  }, [isClickScroll, setIsClickScroll]);
  //滚动时触发
  const handleScroll = useCallback(() => {
    const fixedEle = document.getElementById('anchorBoxId'); //定位元素
    const fixedEleParent = document.querySelector('.gant-anchor-horAnchorOut'); //定位元素的父元素
    const anchorBomfixed: any = document.querySelector('.ant-affix');
    const fixBox: any = document.getElementById('anchor-wrapper-id'); //定位元素
    const anchorBom: any = document.getElementById('current-anchor-id'); //定位元素的父元素

    if (fixedEle && stateMode == 'vertical' && fixBox && anchorBomfixed) {
      const containerRect = fixBox.getBoundingClientRect();
      const rightBoxRect = anchorBom.getBoundingClientRect();
      if (window.scrollY > containerRect.height + rightBoxRect.height) {
        anchorBomfixed['style'].position = 'absolute';
        anchorBomfixed['style'].top = 'auto';
        anchorBomfixed['style'].bottom = '0';
      } else {
        anchorBomfixed['style'].position = 'fixed';
        anchorBomfixed['style'].top = `${fixedTop}px`;
        anchorBomfixed['style'].bottom = 'auto';
      }
    }

    if (fixedEle && stateMode == 'horizontal') {
      clearTimeout(timer);
      timer = setTimeout(Data, 300);
      const containerRect = fixBox.getBoundingClientRect();
      const parentClientTop = fixedEleParent ? fixedEleParent.getBoundingClientRect().top : 0; //定位元素父级距离浏览器的高度
      scrollHeight = document.documentElement.scrollTop || document.body.scrollTop;
      const menuboxhor = document.querySelector('.gant-submenu-menuboxhor'); //anchor的外层card
      const extraheight = menuboxhor ? menuboxhor['offsetHeight'] : 0;
      if (fixedEle) {
        if ((0 - parentClientTop) + fixedTop < containerRect.height - 40) {
          if (parentClientTop < fixedTop + extraheight) {
            fixedEle.classList.add('gant-anchor-activeScroll');
            const active = document.querySelector('.gant-anchor-activeScroll');
            if (!active || !fixedEleParent) {
              return;
            }
            active['style'].top = `${fixedTop + extraheight}px`;
            active['style'].width = `${fixedEleParent['offsetWidth']}px`;
          } else {
            fixedEle.classList.remove('gant-anchor-activeScroll');
          }
        } else {
          fixedEle.classList.remove('gant-anchor-activeScroll');
        }
      }
      if (!isClickScroll) {
        //水平方向锚点跟随页面滚动高亮
        list.forEach((item) => {
          if (!item.isInvalid) {
            const id = document.getElementById(item.id);
            const common = fixedTop + extraheight + FIXED_HEIGHT;
            if (id && id.getBoundingClientRect()) {
              const { top, height } = id.getBoundingClientRect();
              if (top <= common && top >= common - height) {
                //这里的44是水平锚点条高度
                setId(item.id);
              }
            }
          }
        });
      }
    }
  }, [stateMode, setId, isClickScroll, list, containerRef, rightBoxRef]);
  // 点击左右箭头
  const handleMobileTabs = useCallback(
    (e) => {
      const contentId = document.getElementById('contentId');
      if (!contentId) {
        return;
      }
      const left = contentId.offsetLeft;
      const right = contentWidth - silderIdWidth + left;
      if (e == 'left') {
        if (left < 0 && left > -500) {
          contentId.style.left = '0px';
        } else if (left < -500) {
          contentId.style.left = `${left + 500}px`;
        }
        const newLeft = contentId.offsetLeft;
        setLeftArrowsShow(newLeft !== 0);
        setRightArrowsShow(true);
      } else {
        if (right > 0 && right < 500) {
          contentId.style.left = `${left - right}px`;
        } else if (right >= 0 && right > 500) {
          contentId.style.left = `${left - 500}px`;
        }
        const newRight = contentWidth - silderIdWidth + contentId.offsetLeft;
        setLeftArrowsShow(true);
        setRightArrowsShow(newRight !== 0);
      }
    },
    [contentWidth, silderIdWidth, setLeftArrowsShow, setRightArrowsShow],
  );

  useEffect(() => {
    setStateMode(stateMode);
  }, [setStateMode]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll); //监听滚动
    return function cleanup() {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll, setIsClickScroll]);

  useEffect(() => {
    const silderId = document.getElementById('silderId');
    const contentId = document.getElementById('contentId');
    const newSilderIdWidth = silderId ? silderId.offsetWidth : 0;
    const newContentWidth = contentId ? contentId.offsetWidth : 0;
    setSilderIdWidth(newSilderIdWidth);
    setContentWidth(newContentWidth);
    setRightArrowsShow(stateMode == 'horizontal' ? newSilderIdWidth < newContentWidth : false);
    // setMenuArrowsShow(
    //   stateMode == 'horizontal' ? (silderIdWidth < contentWidth ? true : false) : false,
    // )
  }, [stateMode, setSilderIdWidth, setContentWidth, setRightArrowsShow]);

  const getOffsetTop = useCallback((element: HTMLElement, container: any): number => {
    let newContainer = container;
    if (!element.getClientRects().length) {
      return 0;
    }
    const rect = element.getBoundingClientRect();
    if (rect.width || rect.height) {
      if (newContainer === window) {
        newContainer = element.ownerDocument!.documentElement!;
        return rect.top - newContainer.clientTop;
      }
      return rect.top - (newContainer as HTMLElement).getBoundingClientRect().top;
    }
    return rect.top;
  }, []);

  //水平方向锚点事件
  const scrollToAnchor = useCallback(
    (anchorName) => {
      if (anchorName) {
        const anchorElement = document.getElementById(anchorName);
        if (anchorElement) {
          const scrollTop = getScroll(window, true);
          const eleOffsetTop = getOffsetTop(anchorElement, window);
          const y = scrollTop + eleOffsetTop - FIXED_HEIGHT - fixedTop;
          scrollTo(y);
        }
        setId(anchorName);
        setIsClickScroll(true);
      }
    },
    [setId, setIsClickScroll, fixedTop],
  );

  //水平方向锚点menu内容
  const menu = useMemo(() => {
    return (
      <Menu selectedKeys={[currentId]}>
        {list.map((item) => {
          return (
            <Menu.Item key={item.id} onClick={() => scrollToAnchor(item.id)} disabled={item.isInvalid}>
              {item.title}
            </Menu.Item>
          );
        })}
      </Menu>
    );
  }, [currentId, list]);

  //锚点方向切换
  const onSwitchClick = useCallback(() => {
    const newStateMode: layout = stateMode === 'vertical' ? 'horizontal' : 'vertical';
    if (layout === 'vertical') {
      // 去掉磁吸效果
      const fixedEle = document.getElementById('anchorBoxId'); //定位元素
      if (fixedEle) fixedEle.classList.remove(`${prefixCls}-activeScroll`);
    }
    setStateMode(newStateMode);
    if (onLayoutChange) onLayoutChange(newStateMode);
  }, [stateMode, setStateMode, onLayoutChange]);

  return (
    <div id='anchor-wrapper-id' className={classnames(className, `${prefixCls}-wrapper`)} style={{ ...style }}>
      <div
        style={{
          width: stateMode === 'horizontal' ? '100%' : 'calc(100% - 150px)',
          float: 'left',
        }}
      >
        <div
          className={classnames(`${prefixCls}-horAnchorOut`, {
            [`${prefixCls}-horAnchorOut__hidden`]: stateMode === 'vertical',
          })}
        >
          <div className={'gant-anchor'} id="anchorBoxId">
            {/* <Icon
              type='left'
              style={{ display: leftArrowsShow ? 'block' : 'none', float: 'left' }}
              className={`${prefixCls}-iconCss`}
              onClick={() => handleMobileTabs('left')}
            /> */}
            <LeftOutlined
              style={{
                display: leftArrowsShow ? 'block' : 'none',
                float: 'left',
              }}
              className={`${prefixCls}-iconCss`}
              onClick={() => handleMobileTabs('left')}
            />
            <div className={`${prefixCls}-silderCss`} id="silderId">
              <div className={`${prefixCls}-contentCss`} id="contentId">
                {list.map((item) => {
                  const nowCss = item.id == currentId ? 'activeCss' : '';
                  if (item.isInvalid) {
                    return <div className={`${prefixCls}-isInvalid`}>{item.title}</div>;
                  }
                  return (
                    <a className={`${prefixCls}-aCss`} key={item.id} onClick={() => scrollToAnchor(item.id)}>
                      <span className={`${prefixCls}-${nowCss}`}>
                        {
                          <>
                            {item.title}
                            {item.complete ? (
                              // <Icon
                              //   type='check-circle'
                              //   theme='twoTone'
                              //   twoToneColor='#52c41a'
                              //   style={{ paddingLeft: '5px' }}
                              // />
                              <CheckCircleOutlined style={{ paddingLeft: '5px' }} />
                            ) : null}
                          </>
                        }
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>
            {/* <Icon
              type='switcher'
              onClick={onSwitchClick}
              className={`${prefixCls}-iconCss`}
              style={{ float: 'right' }}
            /> */}
            <SwitcherOutlined onClick={onSwitchClick} className={`${prefixCls}-iconCss`} style={{ float: 'right' }} />
            <Dropdown
              overlay={menu}
              // style={{ display: menuArrowsShow ? 'block' : 'none' }}
              placement="bottomRight"
            >
              {/* <Icon type='down' className={`${prefixCls}-iconCss`} style={{ float: 'right' }} /> */}
              <DownOutlined className={`${prefixCls}-iconCss`} style={{ float: 'right' }} />
            </Dropdown>
            {/* <Icon
              type='right'
              style={{ display: rightArrowsShow ? 'block' : 'none', float: 'right' }}
              className={`${prefixCls}-iconCss`}
              onClick={() => handleMobileTabs('right')}
            /> */}
            <RightOutlined
              style={{
                display: rightArrowsShow ? 'block' : 'none',
                float: 'right',
              }}
              className={`${prefixCls}-iconCss`}
              onClick={() => handleMobileTabs('right')}
            />
          </div>
        </div>

        <div className="gant-anchor-content" style={{ padding: '0px', minHeight }}>
          {content}
        </div>
      </div>
      <div
        id='current-anchor-id'
        className={classnames(`${prefixCls}-verticalbox`, {
          [`${prefixCls}-verticalbox__hidden`]: stateMode === 'horizontal'
        })}
        style={{
          width: 150,
          paddingLeft: '10px',
          paddingTop: '10px',
          float: stateMode === 'horizontal' ? 'none' : 'left',
        }}
      >
        <Anchor
          offsetTop={fixedTop}
          onClick={(e) => {
            e.preventDefault();
          }}
          {...nextProps}
        >
          {/* <Icon
            type='switcher'
            onClick={onSwitchClick}
            style={{ width: '100%', paddingRight: '10px', textAlign: 'right' }}
          /> */}
          <SwitcherOutlined onClick={onSwitchClick} style={{ width: '100%', paddingRight: '10px', textAlign: 'right' }} />
          {list.map((item) => {
            const nullCss = {};
            return (
              <div style={item.isInvalid ? { opacity: 0.5, cursor: 'not-allowed' } : nullCss}>
                <div style={item.isInvalid ? { pointerEvents: 'none' } : nullCss}>
                  <Anchor.Link
                    key={item.key || item.title}
                    href={`#${item.id || item.title}`}
                    title={
                      <>
                        <Tooltip title={item.title} placement="left">
                          {item.title}
                        </Tooltip>
                        {item.complete ? (
                          // <Icon
                          //   type='check-circle'
                          //   theme='twoTone'
                          //   twoToneColor='#52c41a'
                          //   style={{ paddingLeft: '5px' }}
                          // />
                          <CheckCircleOutlined style={{ paddingLeft: '5px' }} />
                        ) : null}
                      </>
                    }
                  />
                </div>
              </div>
            );
          })}
        </Anchor>
      </div>
    </div>
  );
};

export default GantAnchor;

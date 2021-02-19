import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import classnames from 'classnames';
import { Menu, Badge } from 'antd';
import FlipOverFooter from './FlipOverFooter';
import { MenuUnfoldOutlined, MenuFoldOutlined, SwitcherOutlined } from '@ant-design/icons';

type menuItem = {
  title: string;
  key: string;
  icon?: Element;
  count?: number;
  disabled?: boolean;
  [key: string]: any;
};

type MenuMode = 'horizontal' | 'inline';
export interface SubmenuIF {
  collapsed: boolean;
  mode: MenuMode;
  selectedKey?: string;
  width: number | string;
  fixedTopHeight?: number;
  zIndex?: number;
  subMinHeight: number | string;
  collapsedWidth: number | string;
  extra?: React.ReactNode;
  menuData: menuItem[];
  bordered?: boolean;
  style?: React.CSSProperties;
  classname?: string;
  showMenuMagnet: boolean;
  showFlipOverFooter: boolean;
  showFixedBoxShadow?: boolean;
  onSwitchChange: (nowMode: MenuMode) => void;
  onCollapseChange: (collapsed: boolean) => void;
  onSelectedChange: (key: string, record: menuItem, e?: Event) => void;
  [key: string]: any;
}

const getPrefixCls = (cls) => 'gant' + cls;

export default (props: SubmenuIF) => {
  const { collapsed: collapsedProp = false, mode: modeProp = 'inline', width = 200, zIndex, fixedTopHeight = 0, collapsedWidth = 30, subMinHeight = 112, selectedKey = '', menuData = [], bordered = true, showMenuMagnet = false, showFlipOverFooter = false, style = {}, classname, extra, showFixedBoxShadow = true, onSwitchChange, onCollapseChange, onSelectedChange, children } = props;

  const [mode, setMode] = useState(modeProp);
  const [collapsed, setCollapsed] = useState(collapsedProp);
  const warpRef = useRef<any>(null);
  const setMenuBoxRef = useRef<any>(null);

  const isInline = mode === 'inline';
  const wrapStyle = { minHeight: subMinHeight };
  if (isInline) wrapStyle['display'] = 'flex';
  const prefixCls = getPrefixCls('-submenu');

  const handleScroll = useCallback(() => {
    if (!warpRef.current) return;
    const fixedEle: any = warpRef.current.querySelector(`.${prefixCls}-wrap`); //需要定位的元素
    const fixedEleParent: any = warpRef.current;
    const parentClientTop = fixedEleParent ? fixedEleParent.getBoundingClientRect().top : 0; //定位元素父级距离浏览器的高度
    const horEle = warpRef.current.querySelector(`.${prefixCls}-menuboxhor`);
    if (fixedEleParent && fixedEle) {
      const containerRect = fixedEleParent.getBoundingClientRect();
      const fixedEleRect = fixedEle.getBoundingClientRect();
      if (parentClientTop - fixedTopHeight < 0 && (0 - parentClientTop + fixedTopHeight + fixedEleRect.height) < containerRect.height) {
        fixedEle.classList.add(`${prefixCls}-fixed`);
        fixedEle.classList.remove(`${prefixCls}-bottomFixed`);
        fixedEle.style.top = `${fixedTopHeight}px`;
        fixedEle.style.bottom = 'auto';
        if (zIndex) fixedEle.style.zIndex = zIndex;

        if (showFixedBoxShadow && horEle) {
          fixedEle.style.width = `${fixedEleParent.offsetWidth - (mode == 'inline' ? 1 : 0)}px`;
          fixedEle.classList.add(`${prefixCls}-boxShow`);
        } else {
          const menuBoxBom: any = warpRef.current.querySelector(`.${prefixCls}-menubox`);
          fixedEle.style.width = `${menuBoxBom.offsetWidth - (mode == 'inline' ? 1 : 0)}px`;
        }
      } else if (parentClientTop < 0 && containerRect.height - (0 - parentClientTop + fixedTopHeight) <= fixedEleRect.height) {
          fixedEle.classList.add(`${prefixCls}-bottomFixed`);
      }else {
          fixedEle.classList.remove(`${prefixCls}-bottomFixed`);
          fixedEle.style.top = `${fixedTopHeight}px`;
          fixedEle.classList.remove(`${prefixCls}-fixed`);
          fixedEle.classList.remove(`${prefixCls}-boxShow`);
      }
    }
  }, [fixedTopHeight, showFixedBoxShadow, zIndex, mode, warpRef]);

  //点击切换mode
  const onSwitchClick = useCallback(() => {
    const nowMode: MenuMode = mode === 'inline' ? 'horizontal' : 'inline';
    setMode(nowMode);
    if (onSwitchChange) onSwitchChange(nowMode);
  }, [mode, onSwitchChange]);

  //点击收缩
  const toggleCollapsed = useCallback(() => {
    setCollapsed(!collapsed);
    if (onCollapseChange) onCollapseChange(!collapsed);
    window.dispatchEvent(new Event('resize'));
  }, [onCollapseChange, collapsed]);

  //点击菜单item
  const onClick = useCallback(
    ({ key, item }) => {
      const record = menuData.find((i) => i.key == key);
      if (onSelectedChange && record) onSelectedChange(key, record, item);
    },
    [onSelectedChange, menuData],
  );

  //点击翻页页脚
  const onFooterSelectedChange = useCallback(
    (nowKey, record) => {
      if (onSelectedChange) onSelectedChange(nowKey, record);
    },
    [onSelectedChange],
  );

  //渲染menu主体
  const renderSubMenu = useMemo(() => {
    const selectedKeys = selectedKey ? [selectedKey] : (menuData.length && [menuData[0].key]) || [];
    const inlineCollapsed = mode === 'inline' && collapsed;
    const inlineProperty = mode === 'inline' ? { inlineCollapsed: collapsed } : {};
    return (
      <Menu className={prefixCls} selectedKeys={selectedKeys} mode={mode} onClick={onClick} {...inlineProperty}>
        {menuData.map((item: menuItem) => (
          <Menu.Item className={inlineCollapsed ? `${prefixCls}-collapsed` : ''} disabled={item.disabled} key={item.key}>
            {item.icon}
            <span>{item.title}</span>
            {item.count && (
              <span className={`${prefixCls}-item-count`}>
                <Badge count={item.count} />
              </span>
            )}
          </Menu.Item>
        ))}
      </Menu>
    );
  }, [collapsed, mode, selectedKey, menuData]);

  // 渲染垂直菜单
  const renderInlineMenu = useMemo(() => {
    return (
      <div ref={setMenuBoxRef} className={`${prefixCls}-menubox ${prefixCls}-menuboxinline`} style={{ width: collapsed ? Number(collapsedWidth) + 1 : width, ...style }}>
        <div className={`${prefixCls}-wrap`} style={{ width: 'calc(100% - 1px)' }}>
          <div className={`${prefixCls}-collapsebtn`} style={{ width: collapsed ? collapsedWidth : '100%', lineHeight: collapsedWidth + 'px', textAlign: 'right' }}>
            {collapsed ? <MenuUnfoldOutlined onClick={toggleCollapsed} /> : <MenuFoldOutlined onClick={toggleCollapsed} />}
            <SwitcherOutlined onClick={onSwitchClick} />
          </div>
          {!collapsed && extra}
          {renderSubMenu}
        </div>
      </div>
    );
  }, [collapsed, extra, width, collapsedWidth, setMenuBoxRef, style, prefixCls]);

  // 渲染水平菜单
  const renderHorMenu = useMemo(() => {
    return (
      <div className={`${prefixCls}-menubox ${prefixCls}-menuboxhor`} style={{ width: '100%', height: 30, ...style }}>
        <div className={`${prefixCls}-wrap`} style={{ width: 'calc(100% - 1px)' }}>
          <div ref={setMenuBoxRef} className={`${prefixCls}-menuinternal`}>
            <div className={`${prefixCls}-menuleft`}>
              <div className={`${prefixCls}-horMenu`}>{renderSubMenu}</div>
            </div>
            <div className={`${prefixCls}-menuright`}>
              <SwitcherOutlined onClick={onSwitchClick} />
            </div>
          </div>
        </div>
      </div>
    );
  }, [prefixCls, setMenuBoxRef, style]);

  useEffect(() => {
    document.body.style.setProperty('--submenu-collapsed-width', collapsedWidth + 'px');
    if (showMenuMagnet) window.addEventListener('scroll', handleScroll); //监听滚动
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [collapsedWidth, showMenuMagnet, handleScroll]);

  useEffect(() => {
    if (!warpRef || !showMenuMagnet) return;
    const fixedEle: any = warpRef.current.querySelector(`.${prefixCls}-wrap`); //定位元素
    const fixedEleParent: any = warpRef.current.querySelector(`.${prefixCls}-menubox`);
    if (fixedEleParent) {
      //上下文菜单切换方向时menu宽度
      fixedEle.style.width = `${fixedEleParent.offsetWidth - (mode == 'inline' ? 1 : 0)}px`;
    }
  }, [mode, showMenuMagnet, warpRef]);

  return (
    <div
      ref={(ref) => {
        warpRef.current = ref;
      }}
      className={classnames(`${prefixCls}-pagewrap`, classname)}
      style={{ border: bordered ? '1px solid rgba(128,128,128,0.2)' : 'none', ...wrapStyle }}
    >
      {isInline ? renderInlineMenu : renderHorMenu}
      <div className={`${prefixCls}-pagecard`}>
        <>{children}</>
        {menuData.length > 0 && showFlipOverFooter && <FlipOverFooter prefixCls={prefixCls} data={menuData} nowKey={selectedKey} onSelectedChange={onFooterSelectedChange} />}
      </div>
    </div>
  );
};

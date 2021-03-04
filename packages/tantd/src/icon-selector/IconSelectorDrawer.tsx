import React, { useMemo, useState, FC, useEffect } from 'react';

import classnames from 'classnames';

import { Drawer, Radio, Input, Empty } from 'antd';

import AntdIcon from '../icon/AntdIcon';

import { IconSelectorDrawerProps } from './interface';

import { debounce } from 'lodash';

import { antdIcons } from '../icon/AntdIcon';

const antdIconIds = Object.keys(antdIcons)
  .map((id) => id)
  .filter((id: string) => id.indexOf('Outlined') >= 0);

const IconSelectorDrawer: FC<IconSelectorDrawerProps> = (props: IconSelectorDrawerProps) => {
  const { className, bodyStyle, visible, onClose, width = 500, onConfirm, value } = props;

  const [iconType, setIconType] = useState('AntdIcon');

  const [iconsFont, setIconsFont] = useState([]);

  const [searchText, setSearchText] = useState('');

  const [isRender, setIsRender] = useState(false);

  useEffect(() => {
    const tag = document.querySelector('svg');
    if (!tag || !visible) {
      setIsRender(false);
      return () => {
        setSearchText('');
        setIconType('AntdIcon');
      };
    }
    setTimeout(() => {
      setIsRender(true);
    }, 200);
    const iconIds = [].slice.call(tag.querySelectorAll('symbol')).map((symbol: Element) => symbol.id);
    setIconsFont(iconIds);
  }, [visible]);

  const handleTypeChange = (e) => {
    setIconType(e.target.value);
  };

  const onSearch = debounce((text) => {
    setSearchText(text);
  }, 200);

  const iconsWithFilter = useMemo(() => {
    const ids = iconType === 'AntdIcon' ? antdIconIds : iconsFont;
    return ids.filter((id) => id.toLowerCase().includes(searchText.toLowerCase()));
  }, [iconsFont, iconType, searchText]);

  return (
    <Drawer
      title="选择图标"
      className={classnames('gantd-icon-drawer', className)}
      width={width}
      visible={visible}
      bodyStyle={bodyStyle}
      onClose={onClose}
    >
      <div className={'gantd-icon-search'}>
        <Radio.Group value={iconType} onChange={handleTypeChange}>
          <Radio.Button value="AntdIcon">AntdIcon</Radio.Button>
          <Radio.Button value="IconFont">IconFont</Radio.Button>
        </Radio.Group>
        <div style={{ flex: 1, marginLeft: 10 }}>
          <Input placeholder="搜索" allowClear value={searchText} onChange={(e) => onSearch(e.target.value)} />
        </div>
      </div>
      <div className={'gantd-icon-content'}>
        {iconsWithFilter.length ? null : (
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} description={'没有匹配图标'} style={{ margin: '30px auto 0' }} />
        )}
        {isRender && (
          <>
            <div className="gantd-icon-list">
              {iconsWithFilter.map((id) => (
                <div
                  className={classnames('gantd-icon-item', value === id && 'gantd-icon-item-checked')}
                  onClick={() => onConfirm && onConfirm(id)}
                  title={id}
                  key={id}
                >
                  <AntdIcon className="gantd-icon-item-icon" type={id} />
                  <div style={{ width: '100%' }}>{id}</div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </Drawer>
  );
};
export default IconSelectorDrawer;

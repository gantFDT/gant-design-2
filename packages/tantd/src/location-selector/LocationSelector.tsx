import React, { forwardRef } from 'react';
import { Cascader } from 'antd';
import type { CascaderProps, CascaderOptionType } from 'antd/lib/cascader';
import classnames from 'classnames';
import district from './district';

export const json: Record<string, Record<string, string>> = district['zh_CN'];

export interface LocationSelectorProps extends Omit<CascaderProps, 'options'> {}

export const getLocationName: (list: string[]) => string[] = (locationList) => {
  const nameList: string[] = [];
  const country = json.COUNTRIES;
  if (locationList && locationList.length) {
    locationList.forEach((code, index) => {
      if (index === 0) {
        nameList.push(country[code] || '未知地址');
      } else {
        const prevCode = locationList[index - 1];
        const currentCodeList = json[prevCode];
        if (currentCodeList) {
          nameList.push(currentCodeList[code] || '未知地址');
        }
      }
    });
  }
  return nameList;
};

const LocationSelector = forwardRef<any, LocationSelectorProps>((props, ref) => {
  const { className, popupClassName, ...restProps } = props;

  const transformData: ($code: string, level?: number) => CascaderOptionType[] = ($code, level = 1) =>
    Object.entries(json[$code]).map(([code, name]) => {
      const item: CascaderOptionType = { label: name, value: code };
      // 根据code找到子级单位
      // 确保不会有同名代码或者子级里面的同名代码对应的名字不同
      if (json[code] && (!json[code][code] || json[code][code] !== name)) {
        if (level < 3) {
          item.children = transformData(code, level + 1);
        }
      }
      return item;
    });

  return (
    <Cascader
      ref={ref}
      placeholder={'请选择地址'}
      options={transformData('COUNTRIES')}
      className={classnames('gant-location-cascader', className)}
      popupClassName={classnames('gant-location-cascader-popup', popupClassName)}
      changeOnSelect
      showSearch={{
        filter: (value, paths) =>
          paths.some((option: any) => option.label.toLowerCase().indexOf(value.toLowerCase()) > -1),
      }}
      {...restProps}
    />
  );
});

export default LocationSelector;

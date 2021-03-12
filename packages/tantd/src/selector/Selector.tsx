import React, { useState, useMemo, useEffect, forwardRef, useImperativeHandle } from 'react';
import classNames from 'classnames';
import { Select, Tooltip } from 'antd';
import { uniqBy } from 'lodash';
import { DeleteOutlined } from '@ant-design/icons';
import useLocalStorage from './hooks/useLocalStorage';
import useUpdateEffect from './hooks/useUpdateEffect';
import type { SelectProps, LabeledValue, SelectValue, RefSelectProps } from 'antd/lib/select';
import type { OptionsType, OptionData } from 'rc-select/lib/interface';
import type { DataType, DataConfig } from './interface';
import langs from './locale';
import { filterOptions, flatOptions, formatValue, toOuterValueAndOption, coverDataSourceToOptions } from './utils';
import styles from './style/index.less';

const defaultDataConfig = {
  valueProp: 'value',
  labelProp: 'label',
};

const locale = langs['zh-cn'];

export interface RefApiProps {
  getStorageList: () => StorageOption[];
  setStorageList: (storages?: StorageOption[]) => void;
}

export interface StorageOption extends Omit<OptionData, 'key'> {
  sourcelabel?: React.ReactNode;
  source?: DataType;
}

export interface SelectorProps<VT extends SelectValue = SelectValue> extends Omit<SelectProps<VT>, 'children'> {
  apiRef?: React.RefObject<RefApiProps>;
  dataConfig?: DataConfig;
  storageCount?: number;
  dataSource?: DataType[];
  useStorage?: boolean;
  selectorId?: string;
  onSearchValueChange?: (value: string) => void;
}

const Selector = forwardRef<RefSelectProps, SelectorProps<SelectValue>>((props, ref) => {
  const {
    apiRef,
    dataConfig,
    dataSource,
    options,
    useStorage,
    selectorId,
    storageCount = 10,
    defaultValue,
    value,
    className,
    dropdownClassName,
    onChange,
    onSearch,
    onSelect,
    onSearchValueChange,
    onDropdownVisibleChange,

    ...restProps
  } = props;

  // selectorId is required to be a effect string when useStorage is true
  if (useStorage && !selectorId) {
    console.warn(locale.warn.selectorId);
  }

  const [searchValue, setSearchValue] = useState<string>('');
  const [storageList, setStorageList] = useLocalStorage<StorageOption[]>(selectorId || '', []);
  const storageListValues = storageList.map((i) => i.value);
  const keywordsExist = !!searchValue;

  useImperativeHandle(
    apiRef,
    () => {
      return {
        getStorageList: () => [...storageList],
        setStorageList,
      };
    },
    [storageList],
  );

  const mergeDataConfig = useMemo(() => {
    return {
      ...defaultDataConfig,
      ...dataConfig,
      optionLabelProp: props.optionLabelProp,
    };
  }, [dataConfig, props.optionLabelProp]);

  const resultOptions = useMemo(() => {
    return options || (coverDataSourceToOptions(dataSource || [], mergeDataConfig, locale.otherGroup) as OptionsType);
  }, [mergeDataConfig, dataSource, options]);

  useEffect(() => {
    console.log('--->', '--->');
  }, []);

  // update storageList
  useEffect(() => {
    if (!useStorage) return;
    const filters = flatOptions(resultOptions).filter((item) => storageListValues.includes(item.value));
    if (!filters.length) return;
    const newOptionsMap = new Map();
    filters.forEach((item) => newOptionsMap.set(item.value, item));
    const newStorageList = storageList.map((item) => newOptionsMap.get(item.value) || item);
    setStorageList(newStorageList);
  }, [resultOptions]);

  useUpdateEffect(() => {
    if (onSearchValueChange) onSearchValueChange(searchValue);
  }, [searchValue]);

  function handleChange(changeValue: LabeledValue | LabeledValue[], option: OptionsType[number] | OptionsType) {
    setSearchValue('');
    const { values: outerValues, options: outerOptions } = toOuterValueAndOption(changeValue, option);
    const multiple = props.mode == 'multiple';
    if (onChange) {
      onChange(multiple ? outerValues : outerValues[0], multiple ? outerOptions : outerOptions[0]);
    }
  }

  const handleSearch = (val: string) => {
    setSearchValue(val);
    if (onSearch) onSearch(val);
  };

  function handleSelect(val: LabeledValue, option: OptionsType[number]) {
    //add option to storageList after handleSelect
    const fromStorage = storageList.findIndex((item: StorageOption) => item.value == option.value) > -1;
    if (!fromStorage && useStorage) {
      const ownProperty: any = {};
      Object.keys(option).forEach((key) => {
        ownProperty[key] = option[key];
      });
      const newStorageList = uniqBy([ownProperty, ...storageList].slice(0, storageCount), 'value');
      setStorageList(newStorageList);
    }
    if (onSelect) onSelect(val, option);
  }

  function handleDropdownVisibleChange(open: boolean) {
    if (open === false) setSearchValue('');
    if (onDropdownVisibleChange) onDropdownVisibleChange(open);
  }

  function createStorageOptGroup(list: StorageOption[]) {
    const label: React.ReactNode = (
      <div style={{ width: '100%', display: 'flex' }}>
        <span style={{ flex: 1 }}>
          <span>{locale.currentOptions}</span>
        </span>
        <Tooltip title={locale.clearCurrentOptions}>
          <DeleteOutlined style={{ fontSize: 12, lineHeight: '22px' }} onClick={() => setStorageList()} />
        </Tooltip>
      </div>
    );
    const emtpyOptions = [{ key: 'empty', disabled: true, label: locale.noCurrentOptions }];
    return [
      {
        key: 'recent',
        label,
        options: list.length
          ? list.map((i) => {
              const { label: itemLabel, title, className: itemClassName } = i;
              return {
                ...i,
                className: classNames(styles.storageOption, itemClassName),
                title: title || itemLabel,
                sourcelabel: itemLabel,
                label: (
                  <div className={styles.storageItemContent}>
                    <div style={{ flex: 1 }}>{itemLabel}</div>
                    <Tooltip title={locale.clearCurrentOption}>
                      <DeleteOutlined
                        style={{ fontSize: 12 }}
                        className={styles.deleteIcon}
                        onClick={(e) => {
                          if (e) e.stopPropagation();
                          setStorageList(list.filter((item) => item.value != i.value));
                        }}
                      />
                    </Tooltip>
                  </div>
                ),
              };
            })
          : emtpyOptions,
      },
    ] as OptionsType;
  }

  function addResultGroup(opt: OptionsType, resultExist: boolean) {
    if (!opt.length) return options;
    const isGroupType = opt.some((item) => item.options);
    if (isGroupType) return opt;
    return [
      {
        key: resultExist ? 'result' : 'list',
        label: resultExist ? locale.result : locale.list,
        options: opt,
      },
    ];
  }

  const showStorageGroup = useStorage && !keywordsExist && resultOptions.length > 0;

  const result = useMemo(() => {
    if (!showStorageGroup) return resultOptions;
    return addResultGroup(resultOptions, keywordsExist) as OptionsType;
  }, [showStorageGroup, resultOptions, keywordsExist]);

  return (
    <Select
      ref={ref}
      labelInValue
      optionFilterProp="label"
      value={formatValue(value)}
      defaultValue={formatValue(defaultValue)}
      className={classNames(styles.selector, className)}
      dropdownClassName={classNames(styles.dropdown, dropdownClassName)}
      notFoundContent={keywordsExist ? locale.noDataFound : locale.noData}
      options={
        showStorageGroup ? [...createStorageOptGroup(storageList), ...filterOptions(result, storageListValues)] : result
      }
      onSelect={handleSelect}
      onChange={handleChange}
      onSearch={handleSearch}
      dropdownMatchSelectWidth={false}
      onDropdownVisibleChange={handleDropdownVisibleChange}
      {...restProps}
    />
  );
});

export default Selector;

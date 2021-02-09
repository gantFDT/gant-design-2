import { map, groupBy, omit, isObject } from 'lodash';
import type { SelectValue, LabeledValue } from 'antd/lib/select';
import type { OptionsType, OptionData } from 'rc-select/lib/interface';
import type { DataType, DataConfig } from '../interface';

export interface CoverConfigType extends DataConfig {
  valueProp: string;
  labelProp: string;
  optionLabelProp?: string;
}

export function coverDataSourceToOptions(
  dataSource: DataType[],
  config: CoverConfigType,
  otherGroupName: string,
) {
  const { valueProp, labelProp, groupProp, optionLabelProp } = config;

  const mapToOptions = (datas: DataType[]) => {
    return datas.map((data) => {
      const result: OptionData = {
        value: data[valueProp],
        label: data[labelProp],
        source: data,
      };
      if (optionLabelProp) result[optionLabelProp] = data[optionLabelProp];
      return result;
    });
  };

  if (!groupProp) {
    return mapToOptions(dataSource);
  }
  const groups = groupBy(dataSource, groupProp);

  // add default groupName
  if (groups['undefined']) {
    groups[otherGroupName] = groups['undefined'];
  }
  return Object.entries(groups).reduce((result, [group, data]) => {
    if (group !== 'undefined') {
      result.push({
        key: group,
        label: group,
        options: mapToOptions(data),
      });
    }
    return result;
  }, [] as any);
}

export function filterOptions(
  options: OptionsType,
  filterKeys: (string | number)[],
) {
  return map(options, (option) => {
    return {
      ...option,
      options: option.options.filter(
        (op: OptionData) => !filterKeys.includes(op.value),
      ),
    };
  });
}

export function flatOptions(options: OptionsType) {
  const flat: OptionData[] = [];
  options.forEach((op) => {
    if (op.options) {
      flat.push(...(op.options as OptionData[]));
    } else {
      flat.push(op as OptionData);
    }
  });
  return flat;
}

export function formatValue(value?: SelectValue) {
  if (!value) return;
  const format = (v: SelectValue) => (isObject(v) ? v : { value: v });
  const result = Array.isArray(value)
    ? (value as any[]).map((val) => format(val))
    : format(value);
  return result as LabeledValue | LabeledValue[];
}

export function toOuterValueAndOption(
  value: LabeledValue | LabeledValue[],
  option: OptionsType[number] | OptionsType,
) {
  if (!value) return { values: [], options: [] };
  const valueArr = Array.isArray(value) ? value : [value];
  const optionsArr = Array.isArray(option) ? option : [option];
  const newValueArr: LabeledValue[] = [];
  const newOptionsArr: OptionData[] = optionsArr.map((op, index) => {
    const { sourcelabel, label: showLabel } = op;
    const label = sourcelabel || showLabel;
    newValueArr.push({ ...valueArr[index], label });
    return {
      ...(omit(op, ['sourcelabel']) as LabeledValue),
      label,
    };
  });
  return {
    values: newValueArr,
    options: newOptionsArr,
  };
}

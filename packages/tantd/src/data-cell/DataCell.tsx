import React, {
  useMemo,
  isValidElement,
  forwardRef,
  useState,
  useEffect,
  useCallback,
} from 'react';
import DataCellInner from './DataCellInner';
import classnames from 'classnames';
import { DataCellProps } from './interface';
import './index.less';

const DataCell = forwardRef(function<ValueType extends any>(
  props: DataCellProps<ValueType>,
  ref: any,
) {
  const {
    native,
    wrapperClassName,
    wrapperStyle,
    defalutValue,
    valuePropName = 'value',
    [valuePropName as 'value']: propValue,
    onChange,
    ...innerProps
  } = props;
  const {
    children,
    onCancel,
    onConfirm,
    getValueFromEvent,
    size,
    editable = true,
    disabled,
    ...restProps
  } = innerProps;

  if (!isValidElement(children)) {
    console.error('children is not React.ReactElement!');
    return null;
  }

  const [innerEditable, setInnerEditable] = useState(false);

  const [value, setValue] = useState(defalutValue);

  const hasValue = Reflect.has(props, valuePropName);

  useEffect(() => {
    if (hasValue) setValue(propValue);
  }, [propValue]);

  const onValueChange = useCallback(
    (value: ValueType, ...ags) => {
      const newValue = getValueFromEvent
        ? getValueFromEvent(...[value, ...ags])
        : value;
      onChange && onChange(newValue, ...ags);
      !hasValue && setValue(newValue);
    },
    [onChange, getValueFromEvent, hasValue],
  );

  const onInnerChange = useCallback(
    (value: ValueType, ...ags) => {
      onChange && onChange(value, ...ags);
      !hasValue && setValue(value);
    },
    [onChange, hasValue],
  );
  const ChildrenComponet = useMemo(() => {
    return React.cloneElement(children as React.ReactElement, {
      ...restProps,
      ref,
      onChange: onValueChange,
      value,
      size,
    });
  }, [children, restProps, value, onValueChange, size]);

  const mergeClassnames = classnames('data-cell', wrapperClassName, {
    'data-cell-sm': size === 'small',
    'data-cell-lg': size === 'large',
    'data-cell-read': !editable,
    'data-cell-edit': !native && editable,
    'data-cell-inner-edit': !native && innerEditable && editable,
  });
  return (
    <div className={mergeClassnames} style={wrapperStyle}>
      {native ? (
        ChildrenComponet
      ) : (
        <DataCellInner
          {...innerProps}
          value={value}
          onChange={onInnerChange}
          innerEditable={innerEditable}
          setInnerEditable={setInnerEditable}
          ref={ref}
        >
          {ChildrenComponet}
        </DataCellInner>
      )}
    </div>
  );
});
export default DataCell;

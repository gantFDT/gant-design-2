import React, { useMemo, isValidElement, forwardRef, useState, useEffect, useCallback } from 'react';
import DataCellInner from './DataCellInner';
import classnames from 'classnames';
import { DataCellProps } from './interface';
import { set } from 'lodash';

const DataCell = forwardRef<any, DataCellProps<any>>(function (props, ref) {
  const {
    native,
    wrapperClassName,
    wrapperStyle,
    defaultValue,
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

  const [value, setValue] = useState(defaultValue);

  const hasValue = Reflect.has(props, valuePropName);

  useEffect(() => {
    if (hasValue) setValue(propValue);
  }, [propValue]);

  const onValueChange = useCallback(
    (value, ...ags) => {
      const newValue = getValueFromEvent ? getValueFromEvent(...[value, ...ags]) : value;
      onChange && onChange(newValue, ...ags);
      !hasValue && setValue(newValue);
    },
    [onChange, getValueFromEvent, hasValue],
  );
  useEffect(() => {
    setInnerEditable(false);
  }, [native]);

  const onInnerChange = useCallback(
    (value, ...ags) => {
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
      disabled,
    });
  }, [children, restProps, value, onValueChange, size, disabled]);

  const mergeClassnames = classnames('data-cell', wrapperClassName, {
    'data-cell-sm': size === 'small',
    'data-cell-lg': size === 'large',
    'data-cell-onlyread': !editable,
    'data-cell-disabled': disabled,
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
          disabled={disabled}
        >
          {ChildrenComponet}
        </DataCellInner>
      )}
    </div>
  );
});
export default DataCell;

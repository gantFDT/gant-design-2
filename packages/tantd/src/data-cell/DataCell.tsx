import React, { useMemo, isValidElement, forwardRef, useState, useEffect, useCallback } from 'react';

import DataCellInner from './DataCellInner';

import classnames from 'classnames';

import { DataCellProps } from './interface';

const DataCell = forwardRef<any, DataCellProps<any>>(function (props, ref) {
  const {
    native,
    wrapperClassName,
    wrapperStyle,
    defaultValue,
    valuePropName = 'value',
    onChange,
    ...innerProps
  } = props;
  const { children, onCancel, onConfirm, getValueFromEvent, size, readOnly, renderLabel, ...restProps } = innerProps;

  if (!isValidElement(children)) {
    console.error('children is not React.ReactElement!');
    return null;
  }

  const [innerEditable, setInnerEditable] = useState(false);

  const [value, setValue] = useState(defaultValue);

  const hasValue = Reflect.has(props, valuePropName);

  const _value = useMemo(() => {
    return props[valuePropName];
  }, [props]);

  useEffect(() => {
    if (hasValue) setValue(_value);
  }, [_value]);

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
    });
  }, [children, restProps, value, onValueChange, size]);

  const mergeClassnames = classnames('data-cell', wrapperClassName, {
    'data-cell-sm': size === 'small',
    'data-cell-lg': size === 'large',
    'data-cell-onlyread': !native && readOnly,
    'data-cell-edit': !native && !readOnly,
    'data-cell-inner-edit': !native && innerEditable && !readOnly,
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
          renderLabel={renderLabel}
        >
          {ChildrenComponet}
        </DataCellInner>
      )}
    </div>
  );
});
DataCell.defaultProps = {
  valuePropName: 'value',
};
export default DataCell;

import React, { useState, useCallback, useEffect, useMemo, useRef, forwardRef } from 'react';
import { DataCellInnerProps } from './interface';

import { CheckOutlined, CloseOutlined, EditOutlined } from '@ant-design/icons';

const DataCellInner = forwardRef(function (props: DataCellInnerProps<any>, ref: any) {
  const {
    children,
    value,
    onChange,
    getValueFromEvent,
    onConfirm,
    onCancel,
    setInnerEditable,
    innerEditable,
    readOnly,
    renderLabel,
    ...restProps
  } = props;

  const [innerValue, setInnerValue] = useState<any>(value);

  const agsRef = useRef<any>();

  useEffect(() => {
    setInnerValue(value);
  }, [value]);

  const handleChange = useCallback(
    (value: any, ...ags: any[]) => {
      const newValue = getValueFromEvent ? getValueFromEvent(...[value, ...ags]) : value;
      agsRef.current = ags;
      setInnerValue(newValue);
    },
    [getValueFromEvent],
  );

  const ChildrenComponet = useMemo(() => {
    return React.cloneElement(children as React.ReactElement, {
      ...restProps,
      onChange: handleChange,
      value: innerValue,
    });
  }, [children, restProps, innerValue, handleChange]);

  const onEditOver = useCallback(() => {
    setInnerValue(value);
    setInnerEditable(false);
  }, [value]);

  const handleCancel = useCallback(async () => {
    if (!onCancel) return onEditOver();
    const canCancel = await onCancel(value);
    if (typeof canCancel === 'boolean' && !canCancel) return;
    onEditOver();
  }, [onCancel, value, onEditOver]);

  const handleConfirm = useCallback(async () => {
    const ags = agsRef.current ? agsRef.current : [];
    if (!onConfirm) {
      onChange(innerValue as any, ...ags);
      onEditOver();
      return;
    }
    const canConfirm = await onConfirm(innerValue);
    if (typeof canConfirm === 'boolean' && !canConfirm) return;
    onChange(innerValue as any, ...ags);
    onEditOver();
  }, [onConfirm, innerValue, onChange, onEditOver]);
  const label = useMemo(() => {
    if (renderLabel) {
      return renderLabel(value as any, { ...restProps, readOnly });
    }
    return value;
  }, [readOnly, restProps, value, renderLabel]);

  return (
    <>
      {!innerEditable ? (
        <>
          <div className="cell-label">{label as string}</div>
          <div className="cell-setting-icon cell-setting-edit" onClick={() => setInnerEditable(true)}>
            <EditOutlined />
          </div>
        </>
      ) : (
        <>
          {ChildrenComponet}
          <div className="cell-setting-icon cell-setting-ok" onClick={handleConfirm}>
            <CheckOutlined />
          </div>
          <div className="cell-setting-icon" onClick={handleCancel}>
            <CloseOutlined />
          </div>
        </>
      )}
    </>
  );
});

export default DataCellInner;

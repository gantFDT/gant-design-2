import React, { useState, useEffect, memo, useMemo, useCallback, useRef } from 'react';
import { AgGridReact } from '@ag-grid-community/react';
import type { ColDef, SelectionChangedEvent, GridApi, GridReadyEvent, RowClickedEvent } from '@ag-grid-community/core';
import { Badge, Popover, Button } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { findIndex, get } from 'lodash';

interface SelectedGridProps {
  columnDefs: ColDef[];
  rowData: any[];
  onChange: (keys: string[], rows: any[]) => void;
  getRowNodeId: any;
  apiRef?: any;
}
export default memo(function SelectedGrid(props: SelectedGridProps) {
  const { columnDefs, rowData = [], onChange, getRowNodeId, apiRef: gridApiRef } = props;
  const [selectedRows, setSelectedRows] = useState<any>([]);
  const apiRef = useRef<GridApi>();
  const onSelectionChanged = useCallback((event: SelectionChangedEvent) => {
    const rows = event.api.getSelectedRows();
    setSelectedRows(rows);
  }, []);
  useEffect(() => {
    const selectedNodes = apiRef.current?.getSelectedNodes();
    if (selectedNodes) {
      selectedNodes.forEach((rowNode) => {
        const index = findIndex(rowData, function (itemRowData) {
          return getRowNodeId(itemRowData) == getRowNodeId(get(rowNode, 'data', {}));
        });
        if (index < 0) rowNode.setSelected(false);
      });
    } else setSelectedRows([]);
  }, [rowData]);
  const onGridReady = useCallback((event: GridReadyEvent) => {
    const { api } = event;
    apiRef.current = api;
  }, []);
  const girdHeight = useMemo(() => {
    let count = rowData.length < 4 ? 4 : rowData.length;
    count = count > 10 ? 10 : count;
    return (count + 1) * 24 + 4;
  }, [rowData]);
  const onClearSelection = useCallback(() => {
    const rows: any[] = [];
    rowData.forEach((itemRowData) => {
      const selectedIndex = findIndex(selectedRows, function (selectedItem) {
        return getRowNodeId(selectedItem) === getRowNodeId(itemRowData);
      });
      if (selectedIndex < 0) rows.push(itemRowData);
    });
    onChange(
      rows.map((itemData) => getRowNodeId(itemData)),
      rows,
    );
  }, [onChange, selectedRows, rowData]);
  const onRowClicked = useCallback((event: RowClickedEvent) => {
    const { data } = event;
    const id = getRowNodeId(data);
    if (gridApiRef && gridApiRef.current) {
      const node = gridApiRef.current.getRowNode(id);
      if (node) {
        gridApiRef.current.ensureIndexVisible(node.rowIndex, 'top');
      }
    }
  }, []);
  const overSelectedContet = useMemo(() => {
    return (
      <div className="gant-grid gant-grid-sm">
        <div className="gant-selected-agrid-title">
          <p>已选中数据：</p>
          <div>
            <Button disabled={selectedRows.length <= 0} onClick={onClearSelection} size="small">
              清除
            </Button>
          </div>
        </div>
        <div className="ag-theme-balham gant-ag-wrapper" style={{ width: 240, height: girdHeight }}>
          <AgGridReact
            onRowClicked={onRowClicked}
            onSelectionChanged={onSelectionChanged}
            columnDefs={columnDefs}
            rowData={rowData}
            rowSelection="multiple"
            headerHeight={24}
            floatingFiltersHeight={20}
            rowHeight={24}
            getRowNodeId={getRowNodeId}
            onGridReady={onGridReady}
            immutableData
          />
        </div>
      </div>
    );
  }, [columnDefs, rowData, selectedRows]);
  return (
    <div className="gant-grid-selected-wrapper">
      {rowData.length > 0 ? (
        <Popover content={overSelectedContet} placement="topRight">
          <Badge count={rowData.length}>
            <div className="gant-grid-selected-box">
              <InboxOutlined />
            </div>
          </Badge>
        </Popover>
      ) : (
        <Badge count={0}>
          <div className="gant-grid-selected-box">
            <InboxOutlined />
          </div>
        </Badge>
      )}
    </div>
  );
});

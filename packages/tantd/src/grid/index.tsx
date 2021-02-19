import React, { useState, useCallback, useRef, useMemo, useEffect, createContext } from 'react';
import classnames from 'classnames';
import { AgGridReact } from '@ag-grid-community/react';
import type {
  GridApi,
  ColumnApi,
  GridReadyEvent,
  RowDataUpdatedEvent,
  SelectionChangedEvent,
  SuppressKeyboardEventParams,
  CellEditingStoppedEvent,
  RowNode,
  GetContextMenuItemsParams,
  RowSelectedEvent,
  ColumnVisibleEvent,
  ColumnResizedEvent,
  ColumnMovedEvent,
} from '@ag-grid-community/core';
import '@ag-grid-community/core/dist/styles/ag-grid.css';
import '@ag-grid-community/core/dist/styles/ag-theme-balham.css';
import { LicenseManager, AllModules } from '@ag-grid-enterprise/all-modules';
import { Spin } from 'antd';
import { get, isEmpty, isEqual, cloneDeep, set, max, min, findIndex, uniq } from 'lodash';
import key from './license';
import {
  mapColumns,
  flattenTreeData,
  usePagination,
  getSizeClassName,
  selectedMapColumns,
  groupNodeSelectedToggle,
  checkParentGroupSelectedStatus,
} from './utils';
import type { GridPropsPartial, RowSelection } from './interface';
import { Size, DataActions } from './interface';
import SelectedGrid from './SelectedGrid';
import GantPagination from './Pagination';
import GridManager from './gridManager';
import { gantGetcontextMenuItems } from './contextMenuItems';
import { getAllComponentsMaps } from './maps';
import LocaleReceiver from 'antd/lib/locale-provider/LocaleReceiver';
import en from './locale/en-US';
import './style';
import zh from './locale/zh-CN';

export * from './interface';
export { default as GantGroupCellRenderer } from './GantGroupCellRenderer';
export { setComponentsMaps, setFrameworkComponentsMaps } from './maps';

LicenseManager.setLicenseKey(key);
export { default as GantPromiseCellRender } from './GantPromiseCellRender';
const langs = {
  en,
  'zh-cn': zh,
};
export const GridContext = createContext<any>({});
export const defaultProps = {
  /**加载状态 */
  loading: false,
  resizable: true,
  /**是否处于编辑状态 */
  editable: false,
  /**单列的过滤器 */
  filter: true,
  /**禁止调整列顺序 */
  // lockPosition: false,
  /**直接在列头下面显示过滤器 */
  floatingFilter: false,
  /**编辑状态下的尺寸 */
  size: Size.small,
  /**rowkey */
  rowkey: 'key',
  width: '100%',
  height: 400,
  sortable: true,
  treeDataChildrenName: 'children',
  /** 默认的删除行为 */
  /**是否执行treeDataPath计算 */
  isCompute: false,
  //默认开启编辑校验
  openEditSign: true,
};
export const defaultRowSelection: RowSelection = {
  type: 'multiple',
  // checkboxIndex: 0,
  showDefalutCheckbox: true,
  // rowMultiSelectWithClick: true,
  rowDeselection: true,
};

const Grid = function Grid<T extends any>(props: GridPropsPartial<T>) {
  const {
    dataSource: initDataSource,
    onReady,
    columns,
    editable,
    rowSelection: rowSel,
    size,
    rowkey,
    gridKey,
    resizable,
    filter,
    sortable,
    width,
    height,
    treeData,
    pagination,
    loading,
    isServerSideGroup,
    getServerSideGroupKey,
    frameworkComponents,
    treeDataChildrenName,
    locale: customLocale,
    serverGroupExpend,
    groupDefaultExpanded,
    defaultColDef,
    context: propsContext,
    components,
    serialNumber,
    rowClassRules,
    isCompute,
    getDataPath: orignGetDataPath,
    onCellEditChange,
    onCellEditingChange,
    onCellChanged,
    openEditSign = true,
    getContextMenuItems,
    createConfig,
    onRowsCut,
    onRowsPaste,
    onRowsPasteEnd,
    showCut = false,
    onContextChangeRender,
    defaultExportParams,
    defaultJsonParams,
    editChangeCallback,
    isRowSelectable,
    boxColumnIndex,
    hideSelcetedBox,
    suppressKeyboardEvent,
    onSelectionChanged: propsOnSelectionChanged,
    onRowSelected: propsOnRowSelected,
    onRowDataUpdated: propOnRowDataUpdated,
    onRowDataChanged: propOnRowDataChanged,
    groupSelectsChildren,
    onColumnMoved,
    onColumnResized,
    onColumnVisible,
    ...orignProps
  } = props;
  const apiRef = useRef<GridApi>();
  const shiftRef = useRef<boolean>(false);
  const selectedChanged = useRef<boolean>(false);
  const columnsRef = useRef<ColumnApi>();
  const selectedRowsRef = useRef<string[]>([]);
  const selectedLoadingRef = useRef<boolean>(false);
  const [innerSelectedRows, setInnerSelectedRows] = useState<any>([]);
  const gridManager = useMemo(() => {
    return new GridManager();
  }, []);
  /**默认基本方法 */
  const getRowNodeId = useCallback((data) => {
    if (typeof rowkey === 'string') {
      return get(data, rowkey);
    }
    return rowkey(data);
  }, []);

  const getDataPath = useCallback(
    (data) => {
      if (orignGetDataPath) return orignGetDataPath(data);
      return data.treeDataPath;
    },
    [orignGetDataPath],
  );
  // 判断数据分别处理 treeTable 和普通table
  const dataSource = useMemo(() => {
    if (treeData && isCompute && initDataSource)
      return flattenTreeData(initDataSource, getRowNodeId, treeDataChildrenName);
    return initDataSource;
  }, [initDataSource, treeData, treeDataChildrenName]);

  // 处理selection
  const gantSelection: RowSelection = useMemo(() => {
    if (rowSel === true) {
      return defaultRowSelection;
    }
    if (rowSel) return { ...defaultRowSelection, ...rowSel };
    return {};
  }, [rowSel]);
  const {
    onSelect,
    selectedRows,
    showDefalutCheckbox,
    type: rowSelection,
    onSelectedChanged,
    defaultSelectionCol,
    ...selection
  } = gantSelection;
  /**fix: 解决保存时候标记状态无法清楚的问题 */

  // 分页事件
  const computedPagination: any = useMemo(() => {
    if (pagination) return usePagination(pagination);
  }, [pagination]);
  // 初始注册配置信息；
  useEffect(() => {
    gridManager.reset({
      getRowNodeId,
      createConfig,
      treeData,
      getDataPath,
      isCompute,
      treeDataChildrenName,
      editChangeCallback,
      onRowsPasteEnd,
    });
  }, []);
  useEffect(() => {
    if (dataSource) gridManager.dataSourceChanged(dataSource);
  }, [dataSource]);
  const serverDataCallback = useCallback((groupKeys, successCallback) => {
    return (rows) => {
      successCallback(rows, rows.length);
      gridManager.appendChild(groupKeys, rows);
    };
  }, []);
  const serverDataRequest = useCallback(
    (params, groupKeys, successCallback) => {
      if (serverGroupExpend) {
        return serverGroupExpend(params, serverDataCallback(groupKeys, successCallback));
      }
      return successCallback([], 0);
    },
    [serverGroupExpend],
  );

  const { componentsMaps, frameworkComponentsMaps } = useMemo(() => {
    return getAllComponentsMaps();
  }, []);
  // 处理selection- 双向绑定selectKeys
  // 根据数据显示选中行；
  const garidShowSelectedRows = useCallback(
    (selectedRows) => {
      if (!apiRef.current) return; //娄底
      const gridSelectedRows = apiRef.current.getSelectedRows();
      const gridSelcetedKeys = gridSelectedRows.map((item = {}) => getRowNodeId(item));
      const selectedKeys: string[] = selectedRows.map((item = {}) => getRowNodeId(item));
      if (selectedKeys.length === 0) apiRef.current.deselectAll();
      const allKeys = uniq([...gridSelcetedKeys, ...selectedKeys]);
      if (rowSelection === 'single') {
        const [key] = selectedKeys;
        const singleNode = apiRef.current.getRowNode(key);
        singleNode && singleNode.setSelected(true, true);
        return;
      }
      allKeys.forEach((id) => {
        if (!apiRef.current) return; //娄底
        const nodeItem = apiRef.current.getRowNode(id);
        if (!nodeItem) return;
        if (selectedKeys.indexOf(id) >= 0) nodeItem.setSelected(true);
        else nodeItem.setSelected(false);
      });
    },
    [rowSelection],
  );
  const onSelectionChange = useCallback(
    (keys: string[], rows: any[]) => {
      const extraKeys: string[] = [];
      const extraRows: any[] = [];
      selectedRowsRef.current.forEach((itemRow) => {
        const index = findIndex(dataSource, function (itemData) {
          return getRowNodeId(itemData) === getRowNodeId(itemRow);
        });
        if (!apiRef.current) return; //娄底
        if (
          index < 0 &&
          !apiRef.current.getRowNode(getRowNodeId(itemRow)) &&
          get(itemRow, '_rowType') !== DataActions.add
        ) {
          extraKeys.push(getRowNodeId(itemRow));
          extraRows.push(itemRow);
        }
      });
      const newSelectedKeys = [...extraKeys, ...keys];
      const newSelectedRows = [...extraRows, ...rows];
      selectedRowsRef.current = newSelectedRows;
      if (selectedRows === undefined) {
        setInnerSelectedRows(newSelectedRows);
      }
      onSelect && onSelect(newSelectedKeys, newSelectedRows);
    },
    [onSelect, dataSource, selectedRows],
  );
  const onBoxSelectionChanged = useCallback(
    (keys, rows) => {
      garidShowSelectedRows(rows);
      if (selectedRows === undefined) {
        setInnerSelectedRows(rows);
        selectedRowsRef.current = rows;
      }
      onSelect && onSelect(keys, rows);
    },
    [selectedRows, garidShowSelectedRows, groupSelectsChildren],
  );
  const onSelectionChanged = useCallback(
    (event: SelectionChangedEvent) => {
      if (selectedChanged.current) return;
      const rows = event.api.getSelectedRows();
      if (isEqual(rows, selectedRowsRef.current)) return;
      const keys = rows.map((item) => getRowNodeId(item));
      onSelectionChange(keys, rows);
      propsOnSelectionChanged && propsOnSelectionChanged(event);
    },
    [onSelectionChange, propsOnSelectionChanged],
  );
  const onRowSelected = useCallback(
    (event: RowSelectedEvent) => {
      propsOnRowSelected && propsOnRowSelected(event);
      if (!groupSelectsChildren || !treeData) return;
      const gridSelectedRows = event.api.getSelectedRows();
      if (gridSelectedRows.length === 0 || gridManager.getRowData().length === gridSelectedRows.length) return;
      if (selectedLoadingRef.current) return;
      selectedLoadingRef.current = true;
      const { node } = event;
      const nodeSelected = node.isSelected();
      groupNodeSelectedToggle(node, nodeSelected);
      checkParentGroupSelectedStatus(node, nodeSelected, event.api);
      setTimeout(() => {
        selectedLoadingRef.current = false;
        event.api.refreshCells({
          columns: ['defalutSelection'],
          rowNodes: [node],
          force: true,
        });
      }, 300);
    },
    [propsOnRowSelected],
  );
  useEffect(() => {
    if (!apiRef.current) return;
    selectedChanged.current = true;
    if (selectedRows && dataSource && dataSource.length > 0) {
      garidShowSelectedRows(selectedRows);
      if (!isEqual(selectedRows, selectedRowsRef.current)) {
        selectedRowsRef.current = selectedRows;
      }
    }
    selectedChanged.current = false;
  }, [selectedRows, dataSource, garidShowSelectedRows]);
  const boxSelectedRows = useMemo(() => {
    if (selectedRows) return selectedRows;
    return innerSelectedRows;
  }, [selectedRows, innerSelectedRows]);
  // 处理selection-end
  //columns
  const defaultSelection: any = !isEmpty(gantSelection) && showDefalutCheckbox;

  const { columnDefs, validateFields } = useMemo(() => {
    return mapColumns<T>(
      columns,
      getRowNodeId,
      defaultSelection,
      defaultSelectionCol,
      rowSelection,
      serialNumber,
      groupSelectsChildren,
    );
  }, [columns]);

  // 选中栏grid  columns;
  const selectedColumns = useMemo(() => {
    if (columns) return selectedMapColumns(columns, boxColumnIndex);
  }, [columns, boxColumnIndex]);
  /// 导出 columns
  const getExportColmns = useCallback((columns) => {
    const arr: string[] = [];
    columns.forEach((item: any) => {
      if (item.field !== 'defalutSelection' && item.field !== 'g-index') {
        item.field && arr.push(item.field);
        if (Array.isArray(item.children)) {
          const childrenArray = getExportColmns(item.children);
          arr.push(...childrenArray);
        }
      }
    });
    return arr;
  }, []);
  const exportColumns = useMemo(() => {
    return getExportColmns(columnDefs);
  }, [columnDefs]);
  // 配置验证规则
  useEffect(() => {
    gridManager.validateFields = validateFields;
  }, [validateFields]);
  // 监听columns变换
  const onColumnsChange = useCallback(
    (event: ColumnMovedEvent | ColumnResizedEvent | ColumnVisibleEvent) => {
      switch (event.type) {
        case 'columnVisible':
          onColumnVisible && onColumnVisible(event as any);
          break;
        case 'columnResized':
          onColumnResized && onColumnResized(event as any);
          break;
        case 'columnMoved':
          onColumnMoved && onColumnMoved(event as any);
          break;
        default:
          break;
      }
      gridManager.setLocalStorageColumnsState();
    },
    [onColumnMoved, onColumnResized, onColumnVisible],
  );
  const localColumnsDefs = useMemo(() => {
    return gridManager.getLocalStorageColumns(columnDefs, gridKey);
  }, [columnDefs, gridKey]);
  // columns-end
  const onGridReady = useCallback(
    (params: GridReadyEvent) => {
      apiRef.current = params.api;
      columnsRef.current = params.columnApi;
      gridManager.agGridApi = params.api;
      gridManager.agGridColumnApi = params.columnApi;
      onReady && onReady(params, gridManager);
      const dataSource = get(gridManager, 'agGridConfig.dataSource', []);
      gridManager.dataSourceChanged(dataSource);
    },
    [onReady, gridKey],
  );
  const onSuppressKeyboardEvent = useCallback((params: SuppressKeyboardEventParams) => {
    const { event, colDef, data, api } = params;
    if (event.key === 'Shift') {
      shiftRef.current = true;
      return false;
    }
    if (event.keyCode == 67 && (event.ctrlKey || event.composed)) {
      if (api) api.copySelectedRangeToClipboard(false);
      return true;
    }
    return false;
  }, []);
  const onRowSelectable = useCallback((rowNode: RowNode) => {
    const notRemove = get(rowNode, 'data._rowType') !== DataActions.removeTag;
    if (isRowSelectable) {
      return isRowSelectable(rowNode) && notRemove;
    }
    return notRemove;
  }, []);

  // context 变化
  const context = useMemo(() => {
    return {
      globalEditable: editable,
      serverDataRequest,
      isServerSideGroup,
      size,
      getDataPath,
      computedPagination,
      treeData,
      gridManager,
      showCut,
      createConfig,
      getRowNodeId,
      watchEditChange: typeof onCellEditChange === 'function',
      onCellEditChange,
      onCellEditingChange,
      onCellChanged,
      ...propsContext,
    };
  }, [propsContext, size, computedPagination, editable, showCut, onCellEditChange, onCellEditingChange, onCellChanged]);
  const [cancheContext, setCancheContext] = useState(context);
  useEffect(() => {
    setCancheContext((cancheContext) => {
      const newContext = { ...cancheContext, ...context };
      const diffKeys: string[] = [];
      Object.keys(newContext).forEach((key) => {
        if (!isEqual(cancheContext[key], context[key])) diffKeys.push(key);
      });
      if (diffKeys.length === 0) return cancheContext;
      const params = onContextChangeRender && onContextChangeRender(context, diffKeys);
      if (!params) return context;
      const { columns, nodeIds = [] } = params;
      let rowNodes: any = null;
      if (nodeIds && nodeIds.length > 0)
        rowNodes = nodeIds.map((id) => {
          return apiRef.current?.getRowNode(id);
        });
      apiRef.current?.refreshCells({
        columns,
        rowNodes,
        force: true,
      });
      return context;
    });
  }, [context]);
  const exportParams = useMemo(() => {
    return {
      columnKeys: exportColumns,
      allColumns: false,
      columnGroups: true,
      ...defaultExportParams,
    };
  }, [defaultExportParams, exportColumns]);
  const hideBox = useMemo(() => {
    return hideSelcetedBox || rowSelection !== 'multiple';
  }, [hideSelcetedBox, rowSelection]);
  //编辑结束
  const onCellEditingStopped = useCallback((params: CellEditingStoppedEvent) => {
    const tipDoms = document.querySelectorAll('.gant-cell-tooltip.ag-tooltip-custom');
    tipDoms.forEach((itemDom) => {
      itemDom.remove();
    });
  }, []);
  // 监听数据变化
  const onRowDataUpdated = useCallback(
    (event: RowDataUpdatedEvent) => {
      const { api } = event;
      propOnRowDataUpdated && propOnRowDataUpdated(event);
      if (isEmpty(selectedRows) || typeof onSelectedChanged !== 'function') return;
      const gridSelectedRows = api.getSelectedRows();
      let changed = false;
      const newSelectedRows =
        selectedRows &&
        selectedRows.map((item) => {
          const gridIndex = findIndex(gridSelectedRows, (gridItem) => getRowNodeId(gridItem) === getRowNodeId(item));
          if (gridIndex >= 0) {
            const newSelectedItem = gridSelectedRows[gridIndex];
            const diff = !isEqual(newSelectedItem, item);
            changed = diff || changed;
            return diff ? newSelectedItem : item;
          }
          return item;
        });
      if (changed)
        if (newSelectedRows) {
          onSelectedChanged(
            newSelectedRows.map((item) => getRowNodeId(item)),
            newSelectedRows,
          );
        }
    },
    [selectedRows, onSelectedChanged],
  );
  return (
    <LocaleReceiver>
      {(local, localeCode = 'zh-cn') => {
        const lang = langs[localeCode] || langs['zh-cn'];
        const locale = { ...lang, ...customLocale };
        const contextMenuItems = function (params: GetContextMenuItemsParams) {
          return gantGetcontextMenuItems(params, {
            downShift: shiftRef.current,
            onRowsCut,
            onRowsPaste,
            locale,
            getContextMenuItems,
            defaultJsonParams,
          });
        };
        return (
          <Spin spinning={loading}>
            <GridContext.Provider
              value={{
                globalEditable: editable,
                serverDataRequest,
                isServerSideGroup,
                size,
                getDataPath,
                computedPagination,
                treeData,
                ...context,
              }}
            >
              <div
                style={{ width, height }}
                className={classnames(
                  'gant-grid',
                  `gant-grid-${getSizeClassName(size)}`,
                  openEditSign && 'gant-grid-edit',
                  editable && 'gant-grid-editable',
                )}
              >
                <div
                  className={classnames('ag-theme-balham', 'gant-ag-wrapper', editable && 'no-zebra')}
                  data-refid={gridKey}
                  style={{
                    width: '100%',
                    height: computedPagination ? 'calc(100% - 30px)' : '100%',
                  }}
                >
                  {!hideBox && (
                    <SelectedGrid
                      apiRef={apiRef}
                      onChange={onBoxSelectionChanged}
                      getRowNodeId={getRowNodeId}
                      columnDefs={selectedColumns as any}
                      rowData={boxSelectedRows}
                    />
                  )}
                  <AgGridReact
                    frameworkComponents={{
                      ...frameworkComponentsMaps,
                      ...frameworkComponents,
                    }}
                    components={{
                      ...componentsMaps,
                      ...components,
                    }}
                    onSelectionChanged={onSelectionChanged}
                    onRowSelected={onRowSelected}
                    rowSelection={rowSelection}
                    getRowNodeId={getRowNodeId}
                    onGridReady={onGridReady}
                    undoRedoCellEditing
                    enableFillHandle
                    headerHeight={24}
                    floatingFiltersHeight={20}
                    rowHeight={size == 'small' ? 24 : 32}
                    singleClickEdit
                    defaultExportParams={exportParams}
                    context={{
                      globalEditable: editable,
                      serverDataRequest,
                      isServerSideGroup,
                      size,
                      getDataPath,
                      computedPagination,
                      treeData,
                      groupSelectsChildren,
                      ...context,
                    }}
                    stopEditingWhenGridLosesFocus={false}
                    treeData={treeData}
                    getDataPath={getDataPath}
                    suppressScrollOnNewData
                    tooltipShowDelay={10}
                    {...selection}
                    {...orignProps}
                    immutableData
                    columnDefs={localColumnsDefs}
                    gridOptions={{
                      ...orignProps.gridOptions,
                    }}
                    isRowSelectable={onRowSelectable}
                    defaultColDef={{
                      resizable,
                      sortable,
                      filter,
                      minWidth: 30,
                      tooltipValueGetter: (params: any) => params,
                      tooltipComponent: 'gantValidateTooltip',
                      ...defaultColDef,
                    }}
                    groupSelectsChildren={treeData ? false : groupSelectsChildren}
                    enableCellTextSelection
                    ensureDomOrder
                    groupDefaultExpanded={groupDefaultExpanded}
                    localeText={locale}
                    rowClassRules={{
                      'gant-grid-row-isdeleted': (params) => get(params, 'data._rowType') === DataActions.removeTag,
                      'gant-grid-row-cut': (params) => get(params, 'data._rowCut'),
                      ...rowClassRules,
                    }}
                    getContextMenuItems={contextMenuItems as any}
                    modules={[...AllModules]}
                    suppressKeyboardEvent={onSuppressKeyboardEvent}
                    onCellEditingStopped={onCellEditingStopped}
                    onRowDataUpdated={onRowDataUpdated}
                    // onRowDataChanged={onRowDataCHanged}
                    onColumnMoved={onColumnsChange}
                    onColumnVisible={onColumnsChange}
                    onColumnResized={onColumnsChange}
                  />
                </div>
                {computedPagination && <GantPagination {...computedPagination} />}
              </div>
            </GridContext.Provider>
          </Spin>
        );
      }}
    </LocaleReceiver>
  );
};

Grid.defaultProps = defaultProps;
Grid.LicenseManager = LicenseManager;
export default Grid;

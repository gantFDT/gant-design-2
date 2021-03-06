import { useCallback, useMemo } from 'react';
import classnames from 'classnames';
import type { ColGroupDef, ColDef, IsColumnFunc, RowNode, GridApi } from '@ag-grid-community/core';
import { IServerSideGetRowsParams } from '@ag-grid-community/core';
import { get, isEmpty } from 'lodash';
import { isEqualObj } from './gridManager/utils';
import type { Size, GantPaginationProps, ColumnEdiatble, Column } from './interface';
import { DataActions } from './interface';
import EditorCol from './GridEidtColumn';
import type { Rules, RuleItem } from 'async-validator';
import { paginationShowTotal } from './Pagination';

type Col = ColGroupDef | ColDef;

function itemisgroup(item, children): item is ColGroupDef {
  return !!children;
}

function ColEditableFn(fn: ColumnEdiatble<any>): IsColumnFunc | boolean {
  return (params: any) => {
    const {
      data,
      context: { globalEditable },
    } = params;
    if (typeof fn === 'function') return globalEditable ? fn(data, params) : false;
    return globalEditable ? fn : false;
  };
}
const defaultCheckboxColSelectionCol: ColDef = {
  width: 24,
  checkboxSelection: true,
  resizable: false,
  sortable: false,
  pinned: true,
  field: 'defalutSelection',
  minWidth: 24,
  headerName: '',
  suppressMenu: true,
  lockPosition: true,
  lockVisible: true,
  cellStyle: {
    padding: '0px 3px',
  },
  headerClass: 'gant-padding-h-3',
};

const serialNumberCol: ColDef = {
  width: 55,
  sortable: false,
  pinned: true,
  minWidth: 55,
  headerName: '序号',
  suppressMenu: true,
  lockPosition: true,
  lockVisible: true,
  field: 'g-index',
  cellClassRules: {
    'gant-grid-cell-serial-add': (params) => {
      const {
        node: { rowIndex, data },
        context,
      } = params;
      return get(params, 'data._rowType') === DataActions.add;
    },
    'gant-cell-disable-sign': (params) => true,
  },
  valueFormatter: (params: any) => {
    const {
      node: { rowIndex, data, rowPinned },
      context,
    } = params;
    if (rowPinned) return;
    const computedPagination = get(context, 'computedPagination', {});
    const { defaultPageSize = 20, pageSize = defaultPageSize, current = 1 }: any = computedPagination;
    const serial = rowIndex + 1 + Math.floor(pageSize * (current - 1));
    return serial;
  },
};
export const selectedMapColumns = <T>(columns: Column<T>[], index: number | string | string[] = 0) => {
  if (!columns || columns.length <= 0) return [];
  let colArray: any[] = [];
  if (typeof index !== 'number') {
    colArray = typeof index === 'string' ? [index] : index;
  } else {
    const columnItem = get(columns, `[${index}]`, columns[0]);
    const { fieldName: field } = columnItem;
    colArray = [field];
  }
  const selectedCol: any = [];
  columns.forEach((colItem) => {
    const { fieldName: field, title: headerName } = colItem;
    if (colArray.indexOf(field) >= 0) selectedCol.push({ field, headerName, flex: true });
  });
  return [{ ...defaultCheckboxColSelectionCol, headerCheckboxSelection: 'multiple' }, ...selectedCol];
};
export const mapColumns = <T>(
  columns?: Column<T>[],
  getRowNodeId?: any,
  defaultSelection?: boolean,
  defaultSelectionCol?: ColDef,
  rowSelection?,
  serialNumber?,
  groupSelectsChildren?: boolean,
): {
  columnDefs: Col[];
  validateFields: Rules;
} => {
  // 移除所有已添加事件
  function getColumnDefs(columns: Column<T>[]) {
    let validateFields: Rules = {};
    const columnDefs = columns.map(
      (
        {
          title: headerName,
          fieldName: field,
          children,
          render,
          editConfig,
          fixed,
          headerClass,
          cellClassRules,
          cellClass,
          cellRendererParams,
          ...item
        },
        index,
      ) => {
        const ColEditable = typeof editConfig !== 'undefined';
        const colDef = {
          headerName,
          field,
          cellRendererParams: {
            render,
            ...cellRendererParams,
          },
          cellClass: classnames('gant-grid-cell', cellClass),
          cellClassRules: {
            'gant-grid-cell-modify': (params) => {
              const {
                data: { _rowType, ...itemData } = {} as any,
                colDef: { field },
              } = params;
              const value = get(itemData, field);
              const _rowData = get(itemData, '_rowData', itemData);
              const originValue = get(_rowData, field);
              return _rowType === DataActions.modify && !isEqualObj(value, originValue);
            },
            'gant-grid-cell-edit': (params: any) => {
              const {
                context: { globalEditable },
                data,
              } = params;
              const editable = get(editConfig, 'editable', false);
              if (typeof editable == 'boolean') return editable;
              return editable(data, params);
            },
            ...cellClassRules,
          },
          cellRenderer: render ? 'gantRenderCol' : undefined,
          headerClass,
          ...item,
        } as Col;

        if (!itemisgroup(colDef, children)) {
          // 当前列允许编辑
          if (ColEditable && editConfig) {
            const { props, changeFormatter, component, rules, signable, editable, ...params } = editConfig;
            let required: any = false;
            const validateField = field.replace(/\./g, '-');
            if (Array.isArray(rules)) {
              const fieldsRules: RuleItem[] = rules.map((item) => {
                const hasRequired = Reflect.has(item, 'required');
                required = hasRequired ? Reflect.get(item, 'required') : required;
                return { ...item };
              });
              validateFields[validateField] = fieldsRules;
            } else if (!isEmpty(rules) && rules) {
              validateFields[validateField] = { ...rules };
              required = rules['required'];
            }
            colDef.cellEditorParams = {
              props,
              changeFormatter,
              rowkey: getRowNodeId,
              required,
              valueGetter: item.valueGetter,
              ...params,
            };
            colDef.cellEditorFramework = EditorCol(component);
            colDef.editable = ColEditableFn(!!editable); //娄底
            colDef.headerClass = classnames(
              headerClass,
              required ? 'gant-header-cell-required' : 'gant-header-cell-edit',
            );
            if (typeof signable === 'boolean' || typeof signable === 'function')
              colDef.cellClassRules = {
                'gant-cell-validate-sign': (params) => {
                  const show = typeof signable === 'boolean' ? signable : signable(params);
                  if (!show) return false;
                  const {
                    data: { _rowError, ...itemData } = {} as any,
                    colDef: { field },
                  } = params;
                  return typeof get(_rowError, field, null) === 'string';
                },
                ...colDef.cellClassRules,
              };
          }
          if (fixed) colDef.pinned = fixed;
        } else if (itemisgroup(colDef, children)) {
          if (children && children.length) {
            const groupChildren = getColumnDefs(children);
            colDef.children = groupChildren.columnDefs;
            colDef.marryChildren = true;
            validateFields = { ...validateFields, ...groupChildren.validateFields };
          }
        }
        return colDef;
      },
    );
    return { columnDefs, validateFields };
  }
  const { columnDefs: columnDefsOrigin, validateFields }: any = getColumnDefs(columns || []); //娄底
  let columnDefs = columnDefsOrigin;
  columnDefs = serialNumber
    ? typeof serialNumber === 'boolean'
      ? [serialNumberCol, ...columnDefs]
      : [
          {
            ...serialNumberCol,
            ...serialNumber,
            cellClassRules: { ...serialNumberCol.cellClassRules, ...serialNumber.cellClassRules },
          },
          ...columnDefs,
        ]
    : columnDefs;
  columnDefs = defaultSelection
    ? [
        {
          ...defaultCheckboxColSelectionCol,
          headerCheckboxSelection: rowSelection === 'multiple',
          ...defaultSelectionCol,
          cellClassRules: {
            'gant-grid-cell-checkbox-indeterminate': (params) => {
              const { node, context } = params;
              const { groupSelectsChildren } = context;
              if (!groupSelectsChildren) return false;
              if (!node.isSelected()) return false;
              const { allLeafChildren = [] } = node;
              for (const itemNode of allLeafChildren) {
                if (!itemNode.isSelected()) return true;
              }
              return false;
            },
            ...get(defaultSelectionCol, 'cellClassRules', {}),
          },
        },
        ...columnDefs,
      ]
    : columnDefs;
  return { columnDefs, validateFields };
};

// 去除掉boolean类型
export type NonBool<T> = T extends boolean ? never : T;

// boolean类型
export function isbool(t: any): t is boolean {
  return typeof t === 'boolean';
}
// number
export function isnumber(t: any): t is number {
  return typeof t === 'number';
}
// string
export function isstring(t: any): t is string {
  return typeof t === 'string';
}
// array
export function isarray(t: any): t is Array<any> {
  return Array.isArray(t);
}
// promise
export function isfunc(t: any): t is Function {
  return t && typeof t === 'function';
}
// promise
export function ispromise(t: any): t is Promise<any> {
  return t && isfunc(t.then);
}
export function flattenTreeData(
  dataSoruce: any[],
  getRowNodeId,
  treeDataChildrenName = 'children',
  pathArray: string[] = [],
): any[] {
  const treeData: any[] = [];
  dataSoruce.forEach((item: any) => {
    const { [treeDataChildrenName]: children, ...itemData } = item;
    const treeDataPath = [...pathArray, getRowNodeId(itemData)];
    if (children && children.length) {
      treeData.push({ ...item, treeDataPath, parent: true });
      const childrenTreeData = flattenTreeData(children, getRowNodeId, treeDataChildrenName, treeDataPath);
      Array.prototype.push.apply(treeData, childrenTreeData);
    } else {
      treeData.push({ ...item, treeDataPath });
    }
  });
  return treeData;
}

export function isPagitation(p: GantPaginationProps): p is GantPaginationProps {
  return typeof p === 'object';
}

export function usePagination(pagitation: GantPaginationProps): any {
  if (isPagitation(pagitation)) {
    const defaultPagetation: GantPaginationProps = {
      size: 'small',
      defaultPageSize: 20,
      defaultCurrent: 1,
      pageSizeOptions: ['20', '50', '100', '150', '200', '500'],
      showSizeChanger: true,
      showQuickJumper: true,
      countLimit: 50000,
    };
    return {
      ...defaultPagetation,
      ...pagitation,
    };
  }
  return false;
}
export function getSizeClassName(size: Size | undefined) {
  switch (size) {
    case 'small':
      return 'sm';
    default:
      return '';
  }
}
export const AG_GRID_STOP_PROPAGATION = '__ag_Grid_Stop_Propagation';
export function stopPropagationForAgGrid(event) {
  event[AG_GRID_STOP_PROPAGATION] = true;
}

export function groupNodeSelectedToggle(node: RowNode, selected: boolean) {
  const { childrenAfterFilter = [] } = node;
  childrenAfterFilter.forEach((itemNode) => {
    itemNode.setSelected(selected);
    groupNodeSelectedToggle(itemNode, selected);
  });
}

export function checkParentGroupSelectedStatus(node: RowNode, selected: boolean, api: GridApi) {
  const { parent } = node;
  if (!parent) return; //娄底
  if (parent && parent.level < 0) return;
  if (parent && selected) {
    parent.setSelected(selected);
    checkParentGroupSelectedStatus(parent, selected, api);
    api.refreshCells({
      columns: ['defalutSelection'],
      rowNodes: [parent],
      force: true,
    });
    return;
  }
  const { childrenAfterFilter = [] }: any = parent;
  for (const itemNode of childrenAfterFilter) {
    if (itemNode.isSelected()) {
      parent.setSelected(true);
      api.refreshCells({
        columns: ['defalutSelection'],
        rowNodes: [parent],
        force: true,
      });
      return;
    }
  }
  parent.setSelected(false);
  checkParentGroupSelectedStatus(parent, selected, api);
}

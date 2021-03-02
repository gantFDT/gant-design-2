/**
 *
 *
 * desc.zh-CN: 列头红色星号代表此列必填，列头蓝色星号代表此列可填，单元格蓝色角标代表可编辑，红色角标代表数据脏标识
 */

import React, { useCallback, useRef, useState } from 'react';
import { Tag, Space, Button } from 'antd';
import { Anchor, Grid, Header, Selector } from 'tantd';
import { Input, InputNumber } from 'data-cell-g';
import { find, isEmpty } from 'lodash';

const types = [
  { label: 'javascript', value: 'javascript' },
  { label: 'css', value: 'css' },
  { label: 'html', value: 'html' },
];

const dataSource = [
  {
    id: 'uuid-1',
    name: 'John Brown',
    age: 32,
    tags: [{ value: 'javascript' }],
  },
  {
    id: 'uuid-2',
    name: 'Tom',
    age: 42,
    tags: [{ value: 'javascript' }],
  },
  {
    id: 'uuid-3',
    name: 'Joe Black',
    age: 32,
    tags: [{ value: 'javascript' }],
  },
];

export default () => {
  const apiRef = useRef<any>();
  const gridManagerRef = useRef<any>();
  const [editable, setEditable] = useState<boolean>(false);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      title: 'Name',
      fieldName: 'name',
      cellRenderer: 'gantGroupCellRenderer',
      width: 120,
      render: (text) => <a>{text}</a>,
      editConfig: {
        component: Input,
        editable: function (record, params) {
          return record.name !== 'Tom';
        },
        signable: true,
        rules: [
          {
            required: true,
            whitespace: true,
            message: '描述必填',
          },
        ],
      },
    },
    {
      title: 'Age',
      fieldName: 'age',
      width: 120,
      editConfig: {
        component: InputNumber,
        editable: true,
        signable: true,
      },
    },
    {
      title: 'Tags',
      fieldName: 'tags',
      width: 300,
      render: (tags) => (
        <>
          {tags.map((tag) => {
            return <Tag key={tag.value}>{find(types, (o) => o.value === tag.value).label}</Tag>;
          })}
        </>
      ),
      editConfig: {
        editable: true,
        component: Selector,
        props: {
          native: true,
          dataSource: types,
          dataConfig: {
            valueProp: 'value',
            labelProp: 'label',
          },
          mode: 'multiple',
          useStorage: true,
          selectorId: 'usertags',
        },
        signable: true,
      },
    },
  ];

  const onReady = (params, manager) => {
    apiRef.current = params.api;
    gridManagerRef.current = manager;
  };

  const onSelect = useCallback((keys, rows) => {
    setSelectedKeys(keys);
    setSelectedRows(rows);
  }, []);

  const onTagRemove = useCallback(() => {
    gridManagerRef.current.tagRemove(selectedRows);
  }, [selectedRows]);

  const onCancelEdit = useCallback(() => {
    setEditable(false);
    gridManagerRef.current.cancel();
  }, []);

  return (
    <>
      <Header
        title="单元格编辑"
        type="line"
        extra={
          <>
            {!editable ? (
              <Button size="small" onClick={() => setEditable(true)}>
                进入编辑
              </Button>
            ) : (
              <>
                <Button size="small" onClick={() => setEditable(false)}>
                  结束编辑
                </Button>
                <Button size="small" onClick={onTagRemove} disabled={isEmpty(selectedRows)}>
                  删除
                </Button>
                <Button size="small" onClick={() => gridManagerRef.current.undo()}>
                  撤销
                </Button>
                <Button size="small" onClick={() => gridManagerRef.current.redo()}>
                  恢复
                </Button>
                <Button size="small" onClick={() => gridManagerRef.current.save()}>
                  保存
                </Button>
              </>
            )}
          </>
        }
      />
      <Grid
        onReady={onReady}
        gridKey="basicUse"
        rowkey="id"
        columns={columns}
        dataSource={dataSource}
        editable={editable}
        serialNumber
        openEditSign
        height={300}
        rowSelection={{
          type: 'multiple',
          selectedKeys,
          selectedRows,
          onSelect,
        }}
      />
    </>
  );
};

import React, { useState, useLayoutEffect, useCallback, useEffect } from 'react';
import { Random, mock } from 'mockjs';
import { Grid } from 'tantd';
import { Drawer, Button } from 'antd';

const columns = [
  {
    fieldName: 'name',
    title: '姓名',
    filter: 'agTextColumnFilter',
  },
  {
    fieldName: 'email',
    title: '邮箱号',
    filter: 'agTextColumnFilter',
  },
  {
    fieldName: 'age',
    title: '年龄',
    filter: 'agNumberColumnFilter',
  },
  {
    fieldName: 'date',
    title: '出生日期',
    filter: 'agDateColumnFilter',
  },
  {
    fieldName: 'sex',
    title: '性别',
  },
];

const data = Array.from({ length: 1000 }).map((content, index) =>
  mock({
    name: Random.cname(),
    email: Random.email(),
    'age|1-100': 100,
    date: Random.date('yyyy-MM-dd'),
    sex: Random.boolean() ? '男' : '女',
    id: Random.guid(),
  }),
);

const useNoMaskDrawerVisible = () => {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = '';
    }
    return () => {};
  }, [visible]);
  return {
    visible,
    setVisible,
  };
};

export default () => {
  const [dataSource, setdataSource] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const { visible, setVisible } = useNoMaskDrawerVisible();

  const onSelect = useCallback((keys, rows) => {
    setVisible(true);
    setSelectedKeys(keys);
    setSelectedRows(rows);
  }, []);

  useLayoutEffect(() => {
    setdataSource(data);
  }, []);

  const getContent = (item) => {
    return (
      <>
        {Object.keys(item).map((key) => (
          <div>
            {key}: {item[key]}
          </div>
        ))}
      </>
    );
  };

  return (
    <>
      <Grid
        height={300}
        columns={columns}
        rowkey="id"
        dataSource={dataSource}
        serialNumber
        rowSelection={{
          type: 'multiple',
          selectedKeys,
          selectedRows,
          onSelect,
        }}
      />
      <Drawer
        title="详情"
        placement={'bottom'}
        closable={true}
        onClose={() => {
          setVisible(false);
        }}
        destroyOnClose
        visible={visible}
        mask={false}
        height={400}
      >
        {!_.isEmpty(selectedRows) && getContent(selectedRows[selectedRows.length - 1])}
      </Drawer>
    </>
  );
};

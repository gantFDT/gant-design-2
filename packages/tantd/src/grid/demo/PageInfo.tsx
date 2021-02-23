import React, { useCallback } from 'react';
import { Radio } from 'antd';
import { Grid } from 'tantd';
import { useState } from 'react';

const columns = [
  {
    title: 'No',
    fieldName: 'index',
  },
  {
    title: 'Name',
    fieldName: 'name',
  },
  {
    title: 'Age',
    fieldName: 'age',
  },
];

// 模拟数据
const allDataSource = Array(1000)
  .fill(0)
  .map((item, index) => {
    return {
      index: index + 1,
      id: index,
      name: Math.random().toString(36).slice(2, 8),
      age: Math.round(Math.random() * 100),
    };
  });

export default () => {
  const [current, setCurrent] = useState(1);
  const [beginIndex, setBeginIndex] = useState(0);
  const [pageSize, setPageSize] = useState(50);
  const [showDataSouce, setShowDataSource] = useState(() => allDataSource.slice(0, pageSize));
  const [mode, setMode] = useState<'current' | 'beginIndex'>('current');

  // 模拟分页改变，更新 dataSource
  const onPageChange = useCallback((beginIndex: number, pageSize: number, current: number) => {
    setBeginIndex(beginIndex);
    setPageSize(pageSize);
    setCurrent(current);
    // console.log(beginIndex, pageSize, current);
    setShowDataSource(allDataSource.slice(beginIndex, current * pageSize));
  }, []);

  const tempPagination = mode === 'current' ? { current } : { beginIndex };

  return (
    <>
      <Radio.Group value={mode} onChange={(e) => setMode(e.target.value)}>
        <Radio value="current">current 模式</Radio>
        <Radio value="beginIndex">beginIndex 模式</Radio>
      </Radio.Group>
      <Grid
        rowkey="id"
        columns={columns}
        dataSource={showDataSouce}
        pagination={{
          ...tempPagination,
          pageSize,
          total: allDataSource.length,
          onChange: onPageChange,
        }}
      />
    </>
  );
};

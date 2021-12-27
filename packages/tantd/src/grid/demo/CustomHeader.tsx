import React, { useState, useLayoutEffect } from 'react';
import { Random, mock } from 'mockjs';
import { Grid } from 'tantd';

const columns = [
  {
    fieldName: 'basic',
    title: '基本信息',
    children: [
      {
        fieldName: 'name-label',
        title: '姓名',
        children: [
          {
            fieldName: 'name',
            title: 'S01',
          },
        ],
      },
      {
        fieldName: 'email-label',
        title: '邮箱号',
        children: [
          {
            fieldName: 'email',
            title: 'S02',
          },
        ],
      },
    ],
  },
  {
    fieldName: 'other',
    title: '额外信息',
    children: [
      {
        fieldName: 'age-label',
        title: '年龄',
        children: [
          {
            fieldName: 'age',
            title: 'S03',
          },
        ],
      },
      {
        fieldName: 'date-label',
        title: '出生日期',
        children: [
          {
            fieldName: 'date',
            title: 'S04',
          },
        ],
      },
      {
        fieldName: 'sex-email',
        title: '性别',
        children: [
          {
            fieldName: 'sex',
            title: 'S05',
          },
        ],
      },
    ],
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

export default () => {
  const [dataSource, setdataSource] = useState([]);

  useLayoutEffect(() => {
    setdataSource(data);
  }, []);

  return (
    <Grid
      height={300}
      columns={columns}
      rowkey="id"
      dataSource={dataSource}
      suppressMenuHide
      headerHeight={60}
      groupHeaderHeight={25}
      defaultColDef={{
        sortable: true,
        resizable: true,
        width: 150,
        headerComponentParams: {
          menuIcon: 'fa-bars',
          template: `<div class="ag-cell-label-container" role="presentation" style="padding:0px 10px">  
                    <span ref="eMenu" class="ag-header-icon ag-header-cell-menu-button"></span>  
                    <div ref="eLabel" class="ag-header-cell-label" role="presentation">    
                        <span class="ag-header-cell-text" role="columnheader">
                        <div ref="eText"></div>
                        <div>**</div>
                        </span>    
                        <span ref="eSortOrder" class="ag-header-icon ag-sort-order" ></span>    
                        <span ref="eSortAsc" class="ag-header-icon ag-sort-ascending-icon" ></span>    
                        <span ref="eSortDesc" class="ag-header-icon ag-sort-descending-icon" ></span> 
                        <span ref="eSortNone" class="ag-header-icon ag-sort-none-icon" ></span>   
                        <span ref="eFilter" class="ag-header-icon ag-filter-icon"></span>  
                    </div>
                </div>`,
        },
      }}
    />
  );
};

import React, { useCallback } from 'react';
import { Grid } from 'tantd';
import { Tabs } from 'antd';

const columns = [
  {
    title: 'Name',
    fieldName: 'name',
    width: 200,
    // NOTE 可以添加下面两个配置让他基于该列可展开/收缩子节点
    enableRowGroup: true,
    cellRenderer: 'gantGroupCellRenderer',
  },
  {
    title: 'Age',
    fieldName: 'age',
    width: 100,
  },
  {
    title: 'Address',
    fieldName: 'address',
    width: 200,
  },
];

// 适用于普通模式的数据格式
const dataSource = [
  {
    id: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    path: [1],
  },
  {
    id: 11,
    name: 'John Brown',
    age: 42,
    address: 'New York No. 2 Lake Park',
    path: [1, 11],
  },
  {
    id: 12,
    name: 'John Brown jr.',
    age: 30,
    address: 'New York No. 3 Lake Park',
    path: [1, 12],
  },
  {
    id: 121,
    name: 'Jimmy Brown',
    age: 16,
    address: 'New York No. 3 Lake Park',
    path: [1, 12, 121],
  },
  {
    id: 13,
    name: 'Jim Green sr.',
    age: 72,
    address: 'London No. 1 Lake Park',
    path: [1, 13],
  },
  {
    id: 131,
    name: 'Jim Green',
    age: 42,
    address: 'London No. 2 Lake Park',
    path: [1, 13, 131],
  },
  {
    id: 1311,
    name: 'Jim Green jr.',
    age: 25,
    address: 'London No. 3 Lake Park',
    path: [1, 13, 131, 1311],
  },
  {
    id: 1312,
    name: 'Jimmy Green sr.',
    age: 18,
    address: 'London No. 4 Lake Park',
    path: [1, 13, 131, 1312],
  },
  {
    id: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    path: [2],
  },
];

// 适用于 isCompute 模式的数据格式
const isComputeDataSource = [
  {
    id: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    test_children: [
      {
        id: 11,
        name: 'John Brown',
        age: 42,
        address: 'New York No. 2 Lake Park',
      },
      {
        id: 12,
        name: 'John Brown jr.',
        age: 30,
        address: 'New York No. 3 Lake Park',
        test_children: [
          {
            id: 121,
            name: 'Jimmy Brown',
            age: 16,
            address: 'New York No. 3 Lake Park',
          },
        ],
      },
      {
        id: 13,
        name: 'Jim Green sr.',
        age: 72,
        address: 'London No. 1 Lake Park',
        test_children: [
          {
            id: 131,
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park',
            test_children: [
              {
                id: 1311,
                name: 'Jim Green jr.',
                age: 25,
                address: 'London No. 3 Lake Park',
              },
              {
                id: 1312,
                name: 'Jimmy Green sr.',
                age: 18,
                address: 'London No. 4 Lake Park',
              },
            ],
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];

// 适用于异步加载的数据，这里结合 树形结构数据来模拟业务上真实场景
const asyncDataSource = [
  {
    id: 1,
    name: 'John Brown sr.',
    age: 60,
    address: 'New York No. 1 Lake Park',
    path: [1],
  },
  {
    id: 2,
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
    path: [2],
  },
];

export default () => {
  // 异步展开该节点
  const serverGroupExpend = useCallback(async (gridParams: any, cb) => {
    const {
      api,
      node: { data },
    } = gridParams;

    // 这列从树形数据查询数据，模拟调取接口
    function getChildren(
      dataSource: typeof isComputeDataSource,
      targetId: number,
      res: typeof isComputeDataSource,
    ): boolean {
      return dataSource.some((item) => {
        const { test_children = [] } = item;

        if (item.id === targetId && test_children.length > 0) {
          res.push(...test_children);
        }
        return res.length || (test_children.length > 0 && getChildren(test_children, targetId, res));
      });
    }

    const children = [];
    // 这里从树形数据获取对应子节点
    getChildren(isComputeDataSource, data.id, children);

    // 调用 API 提供的回调将异步加载数据插入到 grid 中
    cb(children, children.length);
  }, []);

  // 用于在异步展开时判断当前是否可展开
  const isServerSideGroup = useCallback((data: any) => {
    console.log('data', data.id);
    // 这里结合树形数据模拟，如果有子节点则可以展开
    function hasChildren(dataSource: typeof isComputeDataSource, targetId: number): boolean {
      return dataSource.some((item) => {
        const { test_children = [] } = item;
        return (
          (item.id === targetId && test_children.length > 0) ||
          (test_children.length > 0 && hasChildren(test_children, targetId))
        );
      });
    }

    return hasChildren(isComputeDataSource, data.id);
  }, []);

  return (
    <>
      <Tabs>
        <Tabs.TabPane tab="普通模式" key="normal">
          <Grid
            rowkey="id"
            serialNumber
            columns={columns}
            dataSource={dataSource}
            // 以下是树形展示的特殊配置
            treeData // 启用树形展示
            getDataPath={(record) => record.path} // 根据平铺数据中的指定字段形成树形关系
            // 可选配置
            groupSuppressAutoColumn // 正常情况下会有一个分组列，可以根据需求将分组加到 grid 配置的某一个列上，开启改配置可隐藏多余的分组列
            groupDefaultExpanded={3} // 指定展开层级
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="isCompute模式" key="isCompute">
          <Grid
            rowkey="id"
            serialNumber
            columns={columns}
            dataSource={isComputeDataSource}
            // 以下是树形展示的特殊配置
            treeData // 启用树形展示
            treeDataChildrenName="test_children"
            isCompute // isCompute 模式下需要开启此属性，内部会自动根据数据中的 treeDataChildrenName 属性配置的字段计算树形关系
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="普通模式下的异步加载" key="nornalAsync">
          <Grid
            rowkey="id"
            serialNumber
            columns={columns}
            dataSource={asyncDataSource}
            // 以下是树形展示的特殊配置
            treeData // 启用树形展示
            getDataPath={(record) => record.path} // 根据平铺数据中的指定字段形成树形关系
            serverGroupExpend={serverGroupExpend}
            isServerSideGroup={isServerSideGroup}
          />
        </Tabs.TabPane>

        <Tabs.TabPane tab="isCopute模式下的异步加载" key="isComputeAsync">
          <Grid
            rowkey="id"
            serialNumber
            columns={columns}
            dataSource={asyncDataSource}
            // 以下是树形展示的特殊配置
            treeData // 启用树形展示
            getDataPath={(record) => record.path} // 根据平铺数据中的指定字段形成树形关系
            serverGroupExpend={serverGroupExpend}
            isServerSideGroup={isServerSideGroup}
          />
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

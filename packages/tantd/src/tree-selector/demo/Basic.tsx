import React, { memo, useState } from 'react';

import { TreeSelector } from 'tantd';

import { TreeSelect } from 'antd';

const TreeNode = TreeSelect.TreeNode;

export default memo(function Basic() {
  const [value, setValue] = useState();
  const [name, setName] = useState('');
  const onChange = (value, [label]) => {
    setValue(value);
    setName(label)
  };
  return (
    <>
      <TreeSelector
        showSearch
        value={value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        placeholder="Please select"
        allowClear
        treeDefaultExpandAll
        onChange={onChange}
        renderLabel={() => name}
      >
        <TreeNode value="parent 1" title="parent 1">
          <TreeNode value="parent 1-0" title="parent 1-0">
            <TreeNode value="leaf1" title="my leaf" />
            <TreeNode value="leaf2" title="your leaf" />
          </TreeNode>
          <TreeNode value="parent 1-1" title="parent 1-1">
            <TreeNode value="sss" title={<b style={{ color: '#08c' }}>sss</b>} />
          </TreeNode>
        </TreeNode>
      </TreeSelector>
    </>
  );
});

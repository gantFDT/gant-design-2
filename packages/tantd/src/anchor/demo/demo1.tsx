import React from 'react';
import { Anchor } from 'tantd';

export default () => {
  const list = [
    {
      id: 'horbasic1',
      key: 'horbasic1',
      title: '基本信息',
      complete: true,
    },
    {
      id: 'horbasic2',
      key: 'horbasic2',
      title: '高级信息',
    },
    {
      id: 'bbq',
      key: 'bbq',
      title: '无效menu',
      isInvalid: true,
    },
    {
      id: 'horbasic3',
      key: 'horbasic3',
      title: '额外信息',
      complete: false,
    },
  ];
  const style = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 400,
    fontSize: 24,
    border: '1px solid rgba(128,128,128,0.1)',
  };
  return (
    <>
      <Anchor
        list={list}
        minHeight={800}
        fixedTop={80}
        content={
          <>
            <div id="horbasic1" style={style}>
              基本信息
            </div>
            <div id="horbasic2" style={style}>
              高级信息
            </div>
            <div id="horbasic3" style={style}>
              额外信息
            </div>
          </>
        }
      />
    </>
  );
};

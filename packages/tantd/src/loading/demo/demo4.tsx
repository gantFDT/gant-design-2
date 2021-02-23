import React from 'react';
import { Loading } from 'tantd';

//提供多种动态样式
export default () => {
  let arrType = [
    'square-spin',
    'triangle-skew-spin',
    'ball-clip-rotate',
    'ball-clip-rotate-pulse',
    'ball-clip-rotate-multiple',
    'ball-rotate',
    'ball-pulse',
    'ball-beat',
    'ball-pulse-sync',
    'ball-spin-fade-loader',
    'line-spin-fade-loader',
    'ball-scale',
    'ball-scale-multiple',
    'ball-scale-ripple',
    'ball-scale-ripple-multiple',
    'cube-transition',
    'ball-zig-zag',
    'ball-zig-zag-deflect',
    'ball-pulse-rise',
    'ball-triangle-path',
    'semi-circle-spin',
    'line-scale',
    'line-scale-pulse-out',
    'line-scale-pulse-out-rapid',
    'line-scale-party',
    'pacman',
    'ball-grid-beat',
    'ball-grid-pulse',
  ];
  return (
    <>
      <div style={{ height: '420px' }}>
        {arrType.map((item, index) => {
          return (
            <div key={index} style={{ width: '110px', height: '110px', float: 'left' }}>
              <Loading spinType={item} />
            </div>
          );
        })}
      </div>
    </>
  );
};

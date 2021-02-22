import React from 'react';
import { Loading } from 'tantd';

//提供多种动态样式
export default () => {
  let arr = new Array(28).fill(1);
  return (
    <>
      <div style={{ height: '420px' }}>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="square-spin" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="triangle-skew-spin" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="ball-clip-rotate" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="ball-clip-rotate-pulse" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="ball-clip-rotate-multiple" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="ball-rotate" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="ball-pulse" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="ball-beat" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="ball-pulse-sync" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="ball-spin-fade-loader" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="line-spin-fade-loader" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="ball-scale" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="ball-scale-multiple" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="ball-scale-ripple" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="ball-scale-ripple-multiple" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="cube-transition" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="ball-zig-zag" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="ball-zig-zag-deflect" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="ball-pulse-rise" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="ball-triangle-path" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="semi-circle-spin" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="line-scale" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="line-scale-pulse-out" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="line-scale-pulse-out-rapid" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="line-scale-party" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="pacman" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="ball-grid-beat" /></div>
        <div style={{ width: '110px', height: '110px', float: 'left' }}><Loading spinType="ball-grid-pulse" /></div>
      </div>
    </>
  );
};

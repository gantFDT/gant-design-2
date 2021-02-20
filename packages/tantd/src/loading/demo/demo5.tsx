import React from 'react';
import { Loading } from 'tantd';

export default () => {
  let arr = new Array(28).fill(1)
  return <>
    <div style={{ height: '420px' }}>
      <Loading spinType='square-spin' />
      <Loading spinType='triangle-skew-spin' />
      <Loading spinType='ball-clip-rotate' />
      <Loading spinType='ball-clip-rotate-pulse' />
      <Loading spinType='ball-clip-rotate-multiple' />
      <Loading spinType='ball-rotate' />
      <Loading spinType='ball-pulse' />
      <Loading spinType='ball-beat' />
      <Loading spinType='ball-pulse-sync' />
      <Loading spinType='ball-spin-fade-loader' />

      <Loading spinType='line-spin-fade-loader' />
      <Loading spinType='ball-scale' />
      <Loading spinType='ball-scale-multiple' />
      <Loading spinType='ball-scale-ripple' />
      <Loading spinType='ball-scale-ripple-multiple' />
      <Loading spinType='cube-transition' />
      <Loading spinType='ball-zig-zag' />
      <Loading spinType='ball-zig-zag-deflect' />
      <Loading spinType='ball-pulse-rise' />
      <Loading spinType='ball-triangle-path' />

      <Loading spinType='semi-circle-spin' />
      <Loading spinType='line-scale' />
      <Loading spinType='line-scale-pulse-out' />
      <Loading spinType='line-scale-pulse-out-rapid' />
      <Loading spinType='line-scale-party' />
      <Loading spinType='pacmanpacman' />
      <Loading spinType='ball-grid-beat' />
      <Loading spinType='ball-grid-pulse' />
    </div>
  </>;
};



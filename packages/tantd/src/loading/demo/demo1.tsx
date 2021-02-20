import React, { useEffect, useState } from 'react';
import { Loading } from 'tantd';

export default () => {
  return (
    <>
      <div style={{ width: '100%', height: '100px', textAlign: 'center' }}>
        <Loading />
      </div>
    </>
  );
};

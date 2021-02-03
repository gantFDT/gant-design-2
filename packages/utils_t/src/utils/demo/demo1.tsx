import React, { useState } from 'react';
import { Utils } from 'tantd';

export default () => {
  const [res, setRes] = useState('');

  return (
    <div>
      {res}
      <button onClick={() => setRes(Utils.generateUuid())}>
        Utils.generateUuid()
      </button>
    </div>
  );
};

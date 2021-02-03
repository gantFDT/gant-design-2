import React, { useState } from 'react';
import Utils from 'utils_t';

const styles = {
  'm-5': {
    margin: 5,
  },
};

export default () => {
  const [res, setRes] = useState('');
  return (
    <div>
      {res && <div style={styles['m-5']}>输出:{res}</div>}
      <button
        style={styles['m-5']}
        onClick={() => setRes(Utils.generateUuid())}
      >
        Utils.generateUuid()
      </button>
      <button
        style={styles['m-5']}
        onClick={() => setRes(Utils.generateUuid(6))}
      >
        Utils.generateUuid(6)
      </button>
      <button
        style={styles['m-5']}
        onClick={() => setRes(Utils.generateUuid(10, 2))}
      >
        Utils.generateUuid(6,2)
      </button>
    </div>
  );
};

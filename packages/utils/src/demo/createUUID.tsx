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
        onClick={() => setRes(Utils.createUUID())}
      >
        Utils.createUUID()
      </button>
      <button
        style={styles['m-5']}
        onClick={() => setRes(Utils.createUUID(6))}
      >
        Utils.createUUID(6)
      </button>
      <button
        style={styles['m-5']}
        onClick={() => setRes(Utils.createUUID(10, 2))}
      >
        Utils.createUUID(6,2)
      </button>
    </div>
  );
};

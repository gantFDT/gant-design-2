import React, { useState } from 'react';
import Utils from 'utils_t';

const styles = {
  'm-5': {
    margin: 5,
  },
};

export default () => {
  const [res, setRes] = useState<any>('');
  return (
    <div>
      {res && <div style={styles['m-5']}>输出:{res}</div>}
      <button style={styles['m-5']} onClick={() => setRes(Utils.getIEVersion())}>
        getIEVersion()
      </button>
    </div>
  );
};

import React, { useState } from 'react';
import { AutoReload } from 'tantd';

export default () => {
  const [currentTime, setCurrentTime] = useState(0);

  return (
    <>
      <AutoReload
        refresh={(time) => {
          setCurrentTime(time);
        }}
        auto={true}
        interval={10}
        time={`自定义显示 ${currentTime == 0 ? '' : currentTime}`}
      />
    </>
  );
};

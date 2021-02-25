import React, { memo } from 'react';
import { DatePicker } from 'tantd';
export default memo(function Baisc() {
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  return (
    <>
      <DatePicker onChange={onChange} />
    </>
  );
});

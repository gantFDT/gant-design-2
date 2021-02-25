import React, { memo } from 'react';
import { DatePicker } from 'tantd';
const { RangePicker } = DatePicker;
export default memo(function Baisc() {
  function onChange(date, dateString) {
    console.log(date, dateString);
  }
  return (
    <>
      <RangePicker onChange={onChange} />
    </>
  );
});

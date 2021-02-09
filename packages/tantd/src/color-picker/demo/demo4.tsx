import React, { useState } from 'react'
import { ColorPicker } from 'tantd'

export default function ReadWriteUse() {
  const [color, setColor] = useState('#EB2F96');

  const onSave = (id, value, cb) => {
    console.log(id, value);
    cb()
  }
  
  return <>
    <h3 style={{ color }}>颜色选择器（读写分离）</h3>
    <ColorPicker
      value={color}
      onSave={onSave}
      onChange={setColor.bind(null)}
    />
  </>
}
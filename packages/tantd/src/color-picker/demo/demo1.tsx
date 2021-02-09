import React, { useState } from 'react'
import { ColorPicker } from 'tantd'

// const { PurePicker } = ColorPicker;

export default function BasicUse() {
  const [color, setColor] = useState('#EB2F96');

  return <>
    <h3 style={{ color }}>颜色选择器</h3>
    <ColorPicker
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}
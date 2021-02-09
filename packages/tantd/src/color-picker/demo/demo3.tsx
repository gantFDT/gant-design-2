import React, { useState } from 'react'
import { ColorPicker } from 'tantd'

export default function BottomUse() {
  const [color, setColor] = useState('#EB2F96');

  return <>
    <h3 style={{ color }}>颜色选择器(向下弹出)</h3>
    <ColorPicker
      placement="bottom"
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}
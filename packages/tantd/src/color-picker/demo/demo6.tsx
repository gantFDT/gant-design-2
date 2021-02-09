import React, { useState } from 'react'
import { ColorPicker } from 'tantd'

export default function DisabledUse() {
  const [color, setColor] = useState('#EB2F96');

  return <>
    <h3 style={{ color }}>颜色选择器（禁用）</h3>
    <ColorPicker
      disabled
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}
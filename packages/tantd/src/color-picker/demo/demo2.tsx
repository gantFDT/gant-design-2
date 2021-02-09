import React, { useState } from 'react'
import { ColorPicker } from 'tantd'

export default function SizeUse() {
  const [color, setColor] = useState('#EB2F96');

  return <>
    <h3 style={{ color }}>颜色选择器(迷你大小)</h3>
    <ColorPicker
      size="small"
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}
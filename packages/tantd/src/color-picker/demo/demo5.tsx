import React, { useState } from 'react'
import { ColorPicker } from 'tantd'

export default function ReadOnlyUse() {
  const [color, setColor] = useState('#EB2F96');

  return <>
    <h3 style={{ color }}>颜色选择器（只读）</h3>
    <ColorPicker
      allowEdit={false}
      value={color}
      onChange={setColor.bind(null)}
    />
  </>
}
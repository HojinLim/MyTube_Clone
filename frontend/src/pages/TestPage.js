import { useMediaQuery } from "@mui/material"
import React, { useState } from "react"

export const TestPage = () => {
  const [items, setItems] = useState([
    "Item 1",
    "Item 2",
    "Item 3",
    // 추가적인 아이템들...
  ])

  return (
    <div className="container">
      <div className="fixed-container">
        {/* 좌측에 고정된 둥근 컨테이너 */}
        <div className="rounded-container">Fixed Container</div>
      </div>
      <div className="flexible-container">
        {/* 우측에 유동적으로 크기가 조절되는 컨테이너 */}
        {items.map((item, index) => (
          <div key={index} className="item">
            {item}
          </div>
        ))}
      </div>
    </div>
  )
}

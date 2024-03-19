import { MenuSelector } from "components/common/MenuSelector"
import React from "react"

export const HomeCategory = () => {
  return (
    <div
      style={{
        marginTop: "40px",
        marginLeft: "50px",
        position: "fixed",
        zIndex: "2",
        backgroundColor: "white",
        width: "100vw",
      }}
    >
      <MenuSelector categories={["전체", "게임", "음악", "애니메이션", "감상한 동영상"]} />
    </div>
  )
}

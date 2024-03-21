import { fullScreenState } from "atom/fullScreenState"
import React from "react"
import { useRecoilValue } from "recoil"

export const Common = () => {
  const isFull = useRecoilValue(fullScreenState)
  return <>{!isFull && <div style={{ marginTop: "85px" }}></div>}</>
}

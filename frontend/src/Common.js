import { fullScreenState } from "atom/fullScreenState"
import { openOpinionState } from "atom/openOpinionState"
import OpinionDrawer from "components/opinion/OpinionDrawer"
import React from "react"
import { useRecoilValue } from "recoil"

export const Common = () => {
  const isFull = useRecoilValue(fullScreenState)
  const openOpinion = useRecoilValue(openOpinionState)
  return (
    <>
      {!isFull && <div style={{ marginTop: "85px" }}></div>} {openOpinion && <OpinionDrawer />}
    </>
  )
}
